<template>
    <div class="client-chat" style="height: 100%">
        <v-popper ref="first" clazz="pop-demo" :use-arrow="true">
            <div class="pop-demo-list" v-for="pop in popperList" :key="pop.id">
                <v-button type="link" kind="primary" @click="openSearchUrl(pop, pop.id)">
                    {{ pop.id }}.{{ pop.name }}
                    <v-icon remote name="arrow_right_line" size="12" valign="-1"></v-icon>
                </v-button>
            </div>
        </v-popper>
        <div class="qa-item" v-for="(item, index) in msgList" :key="index">
            <!-- 时间戳 -->
            <div class="timestamp"
                 v-if="index === 0 || (index !== 0 && item.timestamp && (Number(item.timestamp) - Number(msgList[index - 1].timestamp)) > timestampGap)">
                {{ moment(new Date(String(item.timestamp).length === 10 ? item.timestamp * 1000 :
                Number(item.timestamp))).format('MM-DD HH:mm') }}
            </div>

            <!-- 问题 -->
            <div class="question-item" v-if="item.is_from_self">
                <v-spinner status="default" class="qs-loading" v-if="item.is_loading"></v-spinner>
                <div class="question-bubble">
                    <VueMarkdown class="question-text" :source="item.content"
                                 :anchorAttributes="{ target: '_blank' }" :linkify="false" />
                </div>
            </div>
            <!-- 答案 -->
            <div class="answer-item" v-if="!item.is_from_self">
                <!-- 头像 -->
                <div class="answer-avatar">
                    <img class="robot-avatar" :src="item.from_avatar" />
                </div>

                <!-- 答案信息 -->
                <div class="answer-info" :ref="item.record_id">
                    <div v-if="item.agent_thought && item.agent_thought.procedures && item.agent_thought.procedures.length > 0">
                        <!-- 思考部分   -->
                        <MsgThought
                            v-for="(thought, index) in item.agent_thought.procedures"
                            :key="index"
                            :content="thought.debugging.content"
                            :title="thought.title"
                            :titleIcon="thought.icon"
                            :nodeName="thought.name"
                            :status="thought.status"
                            :elapsed="thought.elapsed"
                            :detailVisible="thought.detailVisible"
                        />
                    </div>
                    <div class="loading" v-if="item.loading_message">AI正在分析战情，准备反击...</div>
                    <!-- 回复主体 -->
                    <MsgContent :showTags="true"
                                :recordId="item.record_id"
                                :isReplaceLinks="true"
                                :loadingMessage="item.loading_message"
                                :content="item.content"
                                :isFinal="item.is_final"
                                :isMdExpand="item.isMdExpand"
                                @littleTagClick="littleTagClick"
                    />
                    <!-- 参考来源 -->
                    <Reference v-if="item.references && item.references.length>0" :references-list="item.references"/>
                    <!-- 重新回答按钮 -->
                    <div class="regenerate-button" v-if="item.is_final && !item.is_from_self">
                        <v-button type="text" size="small" @click="regenerateAnswer(item)">
                            <v-icon name="basic_refresh_line" size="14" remote></v-icon>
                            重新回答
                        </v-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import clone from 'clone';
import VueMarkdown from 'vue-markdown';
import elementResizeDetectorMaker from 'element-resize-detector';
import { scrollToBottom } from '@/utils/util';
import { MESSAGE_TYPE, ACCESS_TYPE } from '@/constants';
import Reference from './reference-component.vue';

export default {
    name: 'ClientChat',
    components: {
        VueMarkdown,
        Reference
    },
    data () {
        return {
            popperList: [],
            oldPopDemo: null,
            loading: false,
            historyLoading: false,
            timestampGap: 5 * 60, // 两次问题间隔大于5min，则展示时间戳（接口侧返回的时间戳是秒级）
            msgList: [], // 对话消息列表
            robotName: '', // 机器人名称
            chatBoxHeight: document.body.clientHeight,
            jsScrolling: false,
            userScrolling: false
        };
    },
    created () {
    // 监听用户端/管理端体验侧的ws事件
        this.listenClientAndManageEvent();
        // 监听公共的ws事件
        this.listenCommonEvent();
    },
    mounted () {
        const erd = elementResizeDetectorMaker();
        const bodyDom = document.body;

        erd.listenTo(bodyDom, (element) => {
            this.chatBoxHeight = element.clientHeight - 113; // 57+56 头部的高度
        });

        document.addEventListener('click', this.handleOutsideClick);

        const sDom = document.querySelector('.client-chat');
        sDom.addEventListener('scroll', () => {
            if (this.msgList[this.msgList.length - 1].is_final === false && !this.jsScrolling) {
                this.userScrolling = true;
            } else {
                this.jsScrolling = false;
            }
        });
    },
    beforeDestroy () {
        // 移除全局事件监听器
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        openSearchUrl (refer, index) {
            window.open(refer.url);
        },
        // 监听用户端/管理端体验侧的ws事件
        listenClientAndManageEvent () {
            // 从缓存获取机器人信息
            let cachedConfig = null;
            if (ACCESS_TYPE === 'ws') {
                cachedConfig = this.$clientData.getConfigInfo();
            } else {
                cachedConfig = this.$SseCls.sseQueryConfigInfo();
            }
            if (cachedConfig) {
                this.robotName = cachedConfig.name;
            }

            // 监听答案消息队列变更事件
            this.$eventHub.$on('client_msgContentChange', (res) => {
                const { chatsContent, type } = res;

                // PS：若新消息不属于当前机器人，则在 $clientData 中监听到ws消息后判断并屏蔽。不在此处判断和屏蔽
                this.renderMsgList(chatsContent, type);
            });
        },
        // 监听公共的ws事件
        listenCommonEvent () {
            this.$eventHub.$on('data_history', () => {
                this.historyLoading = false;
            });

            this.$eventHub.$on('data_historyError', () => {
                this.historyLoading = false;
            });
        },
        // 渲染消息会话页面
        renderMsgList (data, type) {
            // 无需滚动至底部的ws事件：用户端拉取历史记录、用户端停止生成、坐席端取历史记录、点赞点踩
            const noScrollEvt = [MESSAGE_TYPE.HISTORY, MESSAGE_TYPE.STOP, MESSAGE_TYPE.WORKBENCH_HISTORY, MESSAGE_TYPE.FEEDBACK];
            const list = data.map(el => {
                return { ...el, showPop: true };
            });
            this.msgList = clone(list);
            // console.log('=======更新消list========', clone(list));

            // 对话框滚动至底部（部分ws事件类型无需执行滚动）
            this.$nextTick(() => {
                const sDom = document.querySelector('.client-chat');

                if (!sDom) return;

                if (!this.userScrolling && (!noScrollEvt.includes(type))) {
                    this.jsScrolling = true;
                    scrollToBottom(sDom, sDom.scrollHeight);
                }
                if (this.msgList.length > 0 && this.msgList[this.msgList.length - 1].is_final === true) {
                    this.userScrolling = false;
                }
            });
        },
        handleOutsideClick (event) {
            if (!this.oldPopDemo) { return; };
            const firstElement = document.getElementsByClassName('pop-demo')[0];
            if (this.oldPopDemo.contains(event.target) || firstElement.contains(event.target)) {
            } else {
                if (this.oldPopDemo) {
                    this.$refs['first'] && this.$refs['first'].unbindTrigger(this.oldPopDemo);
                }
                // 调用你想要执行的方法
                this.$refs['first'] && this.$refs['first'].hide();
                this.oldPopDemo = null;
            }
        },
        littleTagClick (e, r) {
            const findMsg = this.$clientData.getMsgById(r);
            let innerDome = e.querySelectorAll('.little-tags');
            let outerTextArr = [];
            if (innerDome && innerDome.length > 0) {
                innerDome.forEach(dom => {
                    outerTextArr.push(dom.outerText);
                });
            }
            this.popperList = findMsg.references.filter(e => outerTextArr.includes(e.id));
            if (e) {
                this.$refs['first'] && this.$refs['first'].bindTrigger(e, 'manual');
                this.$refs['first'] && this.$refs['first'].update();
                this.$refs['first'] && this.$refs['first'].show();
                this.oldPopDemo = e;
            }
        },
        regenerateAnswer (item) {
            // 找到对应的问题
            const msgIndex = this.msgList.findIndex(msg => msg.record_id === item.record_id);
            if (msgIndex > 0) {
                // 找到前一条消息（通常是用户的问题）
                const prevMsg = this.msgList[msgIndex - 1];
                if (prevMsg && prevMsg.is_from_self) {
                    // 发送重新回答事件
                    this.$emit('send', prevMsg.content);
                }
            }
        }
    }
};
</script>

<style lang="less">
.client-chat::-webkit-scrollbar {
  display: none;
}
.pop-demo{
  // background-color: pink;
  padding: 10px;
  display: flex;
  min-width: var(--size-l);
  padding: var(--spacing-base);
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  gap: var(--spacing-tight);

  border-radius: var(--radius-normal);
  border: 0.5px solid var(--color-border-normal);

  background: var(--color-bg-2);
  /* shadow/--shadow-medium */
  box-shadow: var(--shadow-medium-x-1) var(--shadow-medium-y-2) var(--shadow-medium-blur-1) var(--shadow-medium-spread-1) var(--shadow-medium-color-1), var(--shadow-medium-x-2) var(--shadow-medium-y-2) var(--shadow-medium-blur-2) var(--shadow-medium-spread-2) var(--shadow-medium-color-2), var(--shadow-medium-x-3) var(--shadow-medium-y-3) var(--shadow-medium-blur-3) var(--shadow-medium-spread-3) var(--shadow-medium-color-3);

  .v-popper__arrow{
    display: block;
  }
  .pop-demo-list{
    color: var(--color-link-normal);
    /* caption/--caption-regular */
    font-family: var(--font-family-normal);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    .v-button {
      text-decoration: none;
      text-align: left;
    }
  }
}
.client-chat {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: overlay;
  padding: 0 12px;
  background: transparent;

  .loading {
    margin: 1em 0;
    width: 200px;
    color: #ff6500;
    font-weight: 600;
    font-size: 13px;

    &:after {
      content: ".";
      animation: ellipsis 1.5s steps(1, end) infinite;
    }
  }

  @keyframes ellipsis {
    0% {
      content: ".";
    }

    33% {
      content: "..";
    }

    66% {
      content: "...";
    }

    100% {
      content: ".";
    }
  }

  .qa-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    color: var(--color-text-primary);
    animation: messageSlideIn 0.6s ease-out;

    .timestamp {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: var(--color-text-caption);
      margin: 16px 0;
    }

    .question-item {
      display: flex;
      align-items: center;
      width: fit-content;
      text-align: center;
      align-self: flex-end;
      padding-left: 44px;

      .qs-error {
        min-width: 16px;
        margin-right: 10px;
        color: var(--color-error-normal);
      }

      .qs-loading {
        margin-right: 10px;
      }

      .question-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 18px;
        padding: 8px 16px;
        text-align: left;
        word-break: break-all;
        word-wrap: break-word;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 2s infinite;
        }

        &:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        code {
          white-space: break-spaces;
        }

        img {
          max-width: 80%;
        }
      }
    }

    .summary-item {
      align-self: center;
      margin: 12px 0;
    }

    .answer-item {
      display: flex;

      .contacter-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .answer-avatar {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        
        .robot-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #ff4500;
          box-shadow: 0 0 15px rgba(255, 69, 0, 0.5);
          object-fit: cover;
          animation: aiAvatarGlow 3s ease-in-out infinite;
        }
      }

      .answer-info {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 20px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        width: calc(100% - 67px);
        border: 1px solid rgba(59, 130, 246, 0.1);
        box-shadow: 
          0 8px 32px rgba(59, 130, 246, 0.08),
          0 4px 16px rgba(0, 0, 0, 0.04);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        overflow: hidden;
        animation: messageSlideIn 0.5s ease-out;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8, #3b82f6);
          background-size: 200% 100%;
          animation: borderFlow 4s linear infinite;
          border-radius: 16px 16px 0 0;
        }

        &:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 12px 40px rgba(59, 130, 246, 0.12),
            0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .answer-expand {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 44px;
          height: 24px;
          margin-bottom: 12px;
          background: var(--color-bg-2);
          box-shadow: var(--shadow-small-light);
          border-radius: 16px;
          align-self: center;
        }

        .stop-ws {
          color: var(--color-text-caption);
          margin-left: 5px;
        }

        .answer-source {
          margin: 12px 0;
          font-size: 14px;
          color: var(--color-text-caption);
          text-align: left;

          .v-button {
            text-decoration: none;
            text-align: left;
          }
        }
      }
    }
  }

  .question-item {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    
    .question-bubble {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 20px 20px 8px 20px;
      max-width: 70%;
      box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
      animation: messageSlideIn 0.4s ease-out;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color: #991b1b;
        border-right-color: #991b1b;
        transform: rotate(135deg);
        margin-right: -4px;
        margin-bottom: -4px;
      }
      
      .question-text {
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
        
        p {
          margin: 0;
        }
      }
    }
    
    .qs-loading {
      margin-right: 12px;
      align-self: flex-end;
    }
  }

  .qa-item:last-child {
    padding-bottom: 40px;
  }
}

.regenerate-button {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;

  .v-button {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #dc2626;
    font-size: 13px;
    padding: 8px 12px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.1);
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      background: rgba(59, 130, 246, 0.1);
      color: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }

    .v-icon {
      transition: transform 0.3s ease;
    }

    &:hover .v-icon {
      transform: rotate(180deg);
    }
  }
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes borderFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

@keyframes typing {
  0%, 20% {
    content: "";
  }
  40% {
    content: ".";
  }
  60% {
    content: "..";
  }
  80%, 100% {
    content: "...";
  }
}

@keyframes aiAvatarGlow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 69, 0, 0.8), 0 0 35px rgba(255, 69, 0, 0.3);
  }
}
</style>
