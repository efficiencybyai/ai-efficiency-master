<template>
    <div class="question-input">
        <!-- 停止生成 -->
        <div class="stop-button" v-if="isGeneratingReply">
            <v-button icon="basic_stop_line" remote @click="onStopStream">停止生成</v-button>
        </div>
        <div v-if="disableInput[currentVisitorId]" class="question-mask"></div>
        <div :class="['question-input-inner', { 'inputFocus': inputFocus, 'disabled': isGeneratingReply || isThinking }]">
            <v-textarea @focus="updateFocus(true)" @blur="updateFocus(false)"
                        :readonly="disableInput[currentVisitorId] || isGeneratingReply || isThinking" v-model="question"
                        @keydown.native="onPressEnter($event)" :placeholder="disableInput[currentVisitorId] ? '会话已结束' : '请输入您的办公需求，AI助手为您服务...'"
                        :autofocus="true" :autoheight="true" class="question-input-inner__textarea"></v-textarea>
            <div class="question-input-inner__toolbar">
                <div :class="['send-icon', { 'disabled': isSendIconDisabled || disableInput[currentVisitorId] }]">
                    <v-icon name="basic_send_fill" size="16" @click="onSendQuestion" v-tip:sendMsg.hover remote></v-icon>
                    <v-tip ref="sendMsg" size="small" placement="top">发送</v-tip>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector';
import { scrollToBottom, escapeUserInput } from '@/utils/util';
import { MESSAGE_TYPE, ACCESS_TYPE } from '@/constants';

export default {
    name: 'QuestionInput',
    components: {
    },
    props: {
        currentVisitorId: {
            msgData: {
                type: Number,
                default: 0
            }
        }
    },
    data () {
        return {
            isSendIconDisabled: true,
            questionInputWith: 360,
            questionInputBottom: 0,
            question: '',
            inputFocus: false,
            disableInput: {},
            isGeneratingReply: false, // 是否生成回答中
            isThinking: false // 是否思考中
        };
    },
    created () {
    // 监听答案消息队列变更事件, 判断是否正在思考/正在生成答案
        this.$eventHub.$on('client_msgContentChange', (res) => {
            const { chatsContent, type } = res;
            if (type !== MESSAGE_TYPE.ANSWER) return;
            // this.isGeneratingReply = !!chatsContent.find(r => r.is_final === false);
            this.isGeneratingReply = !!chatsContent.find(r => {
                if (r.loading_message) {
                    return r.agent_thought && r.is_final === false && !r.is_connection_error;
                } else {
                    return r.is_final === false && !r.is_connection_error;
                }
            });
            this.isThinking = chatsContent.length > 0 && res.chatsContent[res.chatsContent.length - 1].loading_message;
        });
    },
    mounted () {
        const erd = elementResizeDetectorMaker();
        const questionInputParentDom = document.querySelector('.question-input').parentElement;

        // 输入框宽度
        erd.listenTo(questionInputParentDom, (element) => {
            this.questionInputWith = element.clientWidth;
        });

        // 输入框bootom间距（坐席端置底无需处理，用户端需计算）
        if (this.webIMSource === 'client') {
            const bodyDom = document.body;
            const chatWrapperDom = document.querySelector('.chat-wrap__main');

            erd.listenTo(bodyDom, () => {
                this.questionInputBottom = bodyDom.clientHeight > chatWrapperDom.clientHeight ? (bodyDom.clientHeight - chatWrapperDom.clientHeight) / 2 : 0;
            });
        }
    },
    methods: {
        updateFocus (isFocus) {
            // console.log('updateFocus', isFocus);
            this.inputFocus = isFocus;
        },
        // 回车键
        onPressEnter (event) {
            if (event.keyCode === 13) {
                if (!event.metaKey) {
                    event.preventDefault();
                    this.onSendQuestion();
                } else {
                    this.question = this.question + '\n';
                }
            }
        },
        // 发送问题
        onSendQuestion () {
            if (this.disableInput[this.currentVisitorId]) return;
            if (!this.question.trim()) {
                return;
            }
            this.$emit('send', escapeUserInput(this.question));
            this.question = '';

            // 问题发出后，对话框立即滚动至底部
            this.$nextTick(() => {
                const sDom = document.querySelector('.client-chat');
                if (!sDom) return;
                scrollToBottom(sDom, sDom.scrollHeight);
            });
        },
        // 停止生成
        onStopStream () {
            if (ACCESS_TYPE === 'ws') {
                this.$clientData.stopGeneration();
            } else {
                this.$SseCls.stopGeneration();
            }

            this.isGeneratingReply = false;
        }
    },
    watch: {
        question (val) {
            if (val.trim()) {
                this.isSendIconDisabled = false;
            } else {
                this.isSendIconDisabled = true;
            }
        }
    }
};
</script>

<style lang="less">
.question-input {
  position: relative;
  background: transparent;
  padding: 0;
  z-index: 1000;
  max-width: 100%;
  display: flex;
  justify-content: center;

  .toolbar-info {
    display: inline-block;
    font-weight: 400;
    font-size: 12px;
    color: var(--color-text-caption);

    .red-txt {
      color: red;
    }
  }

  .stop-button {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;

    button {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
      color: white !important;
      border: 1px solid #ef4444 !important;
      border-radius: 8px !important;
      padding: 8px 16px !important;
      font-weight: 500 !important;
      font-size: 13px !important;
      box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3) !important;
      transition: all 0.2s ease !important;
      
      &:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4) !important;
      }
    }
  }

  .question-mask {
    width: 100%;
    height: 110px;
    position: absolute;
    z-index: 200;
    background: rgba(255, 255, 255, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
  }

  &-inner {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px 20px;
    max-width: 100%;
    width: 100%;
    box-shadow: 
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 2px 4px rgba(0, 0, 0, 0.03);
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      border-color: #cbd5e1;
      box-shadow: 
        0 6px 12px rgba(0, 0, 0, 0.08),
        0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .v-textarea--default {
      border-radius: var(--radius-large);
    }

    &.inputFocus {
      border-color: #3b82f6;
      box-shadow: 
        0 0 0 3px rgba(59, 130, 246, 0.1),
        0 6px 12px rgba(59, 130, 246, 0.15),
        0 4px 6px rgba(0, 0, 0, 0.05);
    }

    &.disabled {
      background-color: var(--color-fill-disable);
      border-color: var(--color-border-disable) !important;

      .v-textarea__placeholder {
        color: var(--color-text-disable);
      }
    }

    &__textarea {
      flex: 1;
      border: none;
      background: none;
      min-height: 24px;
      max-height: 120px;

      .v-textarea__txt {
        font-size: 14px;
        font-family: 'Inter', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif !important;
        line-height: 1.5;
        padding: 0;
        resize: none;
        color: #1e293b !important;
        background: transparent !important;
        font-weight: 400;
      }
      
      .v-textarea__placeholder {
        color: #94a3b8 !important;
        font-weight: 400;
        opacity: 1;
      }
    }

    .v-textarea--focus {
      border: none;
      
      .v-textarea__txt {
        color: #1e293b !important;
      }
    }
    
    // 确保所有状态下文本颜色正确
    .v-textarea {
      color: #1e293b !important;
      
      textarea {
        color: #1e293b !important;
        background: transparent !important;
        
        &::placeholder {
          color: #94a3b8 !important;
        }
      }
    }

    &__toolbar {
      display: flex;
      align-items: center;
      margin-left: 8px;

      .send-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);

        .v-icon {
          color: white;
        }

        &:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
        }

        &.disabled {
          background: #e2e8f0;
          cursor: not-allowed;
          box-shadow: none;

          .v-icon {
            color: #94a3b8;
          }
        }

      }
    }
  }
}

@keyframes focusGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

@keyframes inputFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
