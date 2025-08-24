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
                        @keydown.native="onPressEnter($event)" :placeholder="disableInput[currentVisitorId] ? '战斗已结束' : '输入您的辞论观点，发起挑战...'"
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
    margin-bottom: 10px;

    button {
      background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%) !important;
      color: white !important;
      border: 2px solid #ff4500 !important;
      border-radius: 15px !important;
      padding: 8px 15px !important;
      font-weight: bold !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
      box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4) !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(255, 0, 0, 0.6) !important;
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
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
    border: 2px solid #ff4500;
    border-radius: 20px;
    padding: 16px 20px;
    max-width: 100%;
    width: 100%;
    box-shadow: 
      0 8px 32px rgba(255, 69, 0, 0.3),
      0 4px 16px rgba(255, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    transition: all 0.3s ease;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #ff4500, #ff6500, #ff0000, #ff4500);
      border-radius: 22px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      background-size: 200% 200%;
      animation: battleGlow 3s ease infinite;
    }

    .v-textarea--default {
      border-radius: var(--radius-large);
    }

    &.inputFocus {
      transform: translateY(-3px);
      box-shadow: 
        0 12px 40px rgba(255, 69, 0, 0.4),
        0 6px 20px rgba(255, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border-color: #ff6500;
        
      &::before {
        opacity: 1;
      }
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
        font-family: 'Orbitron', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif !important;
        line-height: 1.5;
        padding: 0;
        resize: none;
        color: #ffffff !important;
        background: transparent !important;
        font-weight: 500;
      }
      
      .v-textarea__placeholder {
        color: #ff9070 !important;
        font-weight: 400;
        opacity: 0.8;
      }
    }

    .v-textarea--focus {
      border: none;
      
      .v-textarea__txt {
        color: #ffffff !important;
      }
    }
    
    // 确保所有状态下文本颜色正确
    .v-textarea {
      color: #ffffff !important;
      
      textarea {
        color: #ffffff !important;
        background: transparent !important;
        
        &::placeholder {
          color: #ff9070 !important;
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
        background: linear-gradient(135deg, #ff4500 0%, #ff6500 100%);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(255, 69, 0, 0.4);

        .v-icon {
          color: white;
        }

        &:hover {
          background: linear-gradient(135deg, #ff6500 0%, #ff8500 100%);
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 69, 0, 0.6);
        }

        &.disabled {
          background: #333;
          cursor: not-allowed;
          box-shadow: none;

          .v-icon {
            color: #666;
          }
        }

      }
    }
  }
}

@keyframes battleGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
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
