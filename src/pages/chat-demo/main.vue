<template>
    <div class="debate-arena-app">
        <!-- 顶部竞技台横幅 -->
        <header class="arena-header">
            <div class="header-content">
                <div class="arena-title">
                    <div class="title-icon">⚔️</div>
                    <h1>超级辩论大师</h1>
                    <div class="title-subtitle">思辨竞技场</div>
                </div>
                <div class="arena-stats">
                    <div class="stat-badge victory">
                        <div class="badge-icon">🏆</div>
                        <div class="badge-info">
                            <span class="number">12,847</span>
                            <span class="label">胜利</span>
                        </div>
                    </div>
                    <div class="stat-badge winrate">
                        <div class="badge-icon">📈</div>
                        <div class="badge-info">
                            <span class="number">96%</span>
                            <span class="label">胜率</span>
                        </div>
                    </div>
                    <div class="stat-badge online">
                        <div class="badge-icon">🟢</div>
                        <div class="badge-info">
                            <span class="number">在线</span>
                            <span class="label">状态</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- 主竞技区域 -->
        <main class="debate-main">
            <!-- 左侧对手信息面板 -->
            <aside class="opponent-panel">
                <div class="panel-title">
                    <span class="title-icon">🎯</span>
                    对手分析
                </div>
                <div class="opponent-card">
                    <div class="opponent-avatar">
                        <CommonHeader/>
                    </div>
                </div>
                <div class="argument-tools">
                    <div class="tool-section">
                        <h3>🧠 论证工具</h3>
                        <div class="tool-item">
                            <span class="tool-icon">📊</span>
                            <span class="tool-name">数据分析</span>
                        </div>
                        <div class="tool-item">
                            <span class="tool-icon">🔍</span>
                            <span class="tool-name">逻辑检验</span>
                        </div>
                        <div class="tool-item">
                            <span class="tool-icon">💡</span>
                            <span class="tool-name">反驳策略</span>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- 中央辩论舞台 -->
            <section class="debate-stage">
                <!-- 舞台顶部控制栏 -->
                <div class="stage-controls">
                    <button class="control-btn active">
                        <span class="btn-icon">⚡</span>
                        实时对战
                    </button>
                    <button class="control-btn">
                        <span class="btn-icon">📚</span>
                        训练模式
                    </button>
                    <button class="control-btn">
                        <span class="btn-icon">🎥</span>
                        回放分析
                    </button>
                </div>

                <!-- 辩论对话区 -->
                <div class="debate-conversation">
                    <ClientChat @send="onSendQuestion" />
                </div>

                <!-- 底部战斗输入区 -->
                <div class="battle-input-zone">
                    <div class="input-header">
                        <span class="round-indicator">第 1 轮</span>
                        <div class="timer">⏱️ 03:45</div>
                    </div>
                    <QuestionInput @send="onSendQuestion" />
                    <div class="quick-actions">
                        <button class="quick-btn">🎯 精准反击</button>
                        <button class="quick-btn">🛡️ 防御论证</button>
                        <button class="quick-btn">⚡ 闪电攻击</button>
                    </div>
                </div>
            </section>

            <!-- 右侧实时战况面板 -->
            <aside class="battle-status-panel">
                <div class="panel-title">
                    <span class="title-icon">📊</span>
                    实时战况
                </div>
                
                <div class="score-board">
                    <div class="score-item user">
                        <div class="score-label">您</div>
                        <div class="score-value">85</div>
                    </div>
                    <div class="vs-indicator">VS</div>
                    <div class="score-item ai">
                        <div class="score-label">AI</div>
                        <div class="score-value">78</div>
                    </div>
                </div>

                <div class="performance-metrics">
                    <div class="metric">
                        <span class="metric-icon">🎯</span>
                        <span class="metric-label">论证强度</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 75%"></div>
                        </div>
                    </div>
                    <div class="metric">
                        <span class="metric-icon">🧠</span>
                        <span class="metric-label">逻辑连贯</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 85%"></div>
                        </div>
                    </div>
                    <div class="metric">
                        <span class="metric-icon">💬</span>
                        <span class="metric-label">表达清晰</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 90%"></div>
                        </div>
                    </div>
                </div>

                <div class="recent-moves">
                    <h4>🎯 最近招式</h4>
                    <div class="move-item">
                        <span class="move-type attack">反击</span>
                        <span class="move-desc">数据驳斥</span>
                    </div>
                    <div class="move-item">
                        <span class="move-type defense">防守</span>
                        <span class="move-desc">逻辑补强</span>
                    </div>
                    <div class="move-item">
                        <span class="move-type special">绝技</span>
                        <span class="move-desc">因果论证</span>
                    </div>
                </div>
            </aside>
        </main>

        <!-- 底部状态栏 -->
        <footer class="arena-footer">
            <div class="footer-content">
                <div class="session-info">
                    <span>🎮 对战模式</span>
                    <span>•</span>
                    <span>⏰ 已进行 12:34</span>
                    <span>•</span>
                    <span>🎯 当前回合: 第3轮论证</span>
                </div>
                <div class="network-status">
                    <div class="status-indicator online"></div>
                    <span>连接稳定</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import './utils/sse';
import './utils/ClientData';
import CommonHeader from './components/common-header';
import ClientChat from './components/client-chat';
import QuestionInput from './components/question-input';
import { MESSAGE_TYPE, ACCESS_TYPE } from '@/constants';

export default {
    name: 'DebateArena',
    components: {
        CommonHeader,
        ClientChat,
        QuestionInput
    },
    data () {
        return {
            currentRound: 1,
            timeElapsed: '12:34',
            userScore: 85,
            aiScore: 78
        };
    },
    mounted () {
        console.log('【init debate arena------>】', ACCESS_TYPE);
        // 初始化数据
        if (ACCESS_TYPE === 'ws') {
            this.$clientData.init();
        } else {
            this.$SseCls.init();
        }
    },
    created () {
        // 监听用户端ws事件
        this.listenDebateEvents();
    },
    methods: {
        // 监听辩论事件
        listenDebateEvents () {
            // 监听配置信息，获取机器人和问答库可用状态
            this.$eventHub.$on('client_configChange', (res) => {
                this.isAvailable = res.is_available;
            });
            // 监听历史记录拉取成功事件
            this.$eventHub.$on('client_msgContentChange', (res) => {
                const { chatsContent, type } = res;
                if (type === MESSAGE_TYPE.ANSWER && chatsContent.length > 0) {
                    this.isWeclome = false;
                }
                if (type === MESSAGE_TYPE.HISTORY && chatsContent.length > 0) {
                    this.isWeclome = false;
                }
            });
        },
        // 发送辩论观点
        onSendQuestion (question) {
            console.log('onSendQuestion', question);
            if (ACCESS_TYPE === 'ws') {
                this.$clientData.triggerSendMsg(question);
            } else {
                this.$SseCls.sseSendMsg(question);
            }
        }
    }
};
</script>

<style lang="less">
.debate-arena-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%);
  color: #ffffff;
  font-family: 'Orbitron', 'Microsoft YaHei', sans-serif;
  overflow: hidden;
}

// 顶部竞技场横幅
.arena-header {
  background: linear-gradient(135deg, #8b0000 0%, #dc143c 50%, #ff0000 100%);
  padding: 15px 30px;
  border-bottom: 3px solid #ff4500;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .arena-title {
      display: flex;
      align-items: center;
      gap: 15px;
      
      .title-icon {
        font-size: 32px;
        filter: drop-shadow(0 0 10px #ff0000);
        animation: battlePulse 2s ease-in-out infinite;
      }
      
      h1 {
        font-size: 24px;
        font-weight: 900;
        margin: 0;
        text-shadow: 0 0 10px #ff0000;
        letter-spacing: 2px;
      }
      
      .title-subtitle {
        font-size: 12px;
        opacity: 0.8;
        font-weight: 300;
      }
    }
    
    .arena-stats {
      display: flex;
      gap: 20px;
      
      .stat-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 15px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        .badge-icon {
          font-size: 18px;
        }
        
        .badge-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .number {
            font-size: 14px;
            font-weight: bold;
          }
          
          .label {
            font-size: 10px;
            opacity: 0.7;
          }
        }
      }
    }
  }
}

// 主辩论区域
.debate-main {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  flex: 1;
  overflow: hidden;
}

// 左侧对手面板
.opponent-panel {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  border-right: 2px solid #ff4500;
  padding: 20px;
  overflow-y: auto;
  
  .panel-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ff4500;
  }
  
  .opponent-card {
    background: rgba(255, 69, 0, 0.1);
    border: 1px solid #ff4500;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .argument-tools {
    .tool-section {
      h3 {
        color: #ff4500;
        font-size: 14px;
        margin-bottom: 15px;
      }
      
      .tool-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        margin-bottom: 8px;
        background: rgba(255, 69, 0, 0.05);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 69, 0, 0.15);
          transform: translateX(5px);
        }
        
        .tool-icon {
          font-size: 16px;
        }
        
        .tool-name {
          font-size: 12px;
        }
      }
    }
  }
}

// 中央辩论舞台
.debate-stage {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .stage-controls {
    display: flex;
    gap: 10px;
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #ff4500;
    
    .control-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 15px;
      background: transparent;
      border: 1px solid rgba(255, 69, 0, 0.3);
      border-radius: 20px;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 12px;
      
      &.active {
        background: #ff4500;
        box-shadow: 0 0 15px rgba(255, 69, 0, 0.5);
      }
      
      &:hover {
        border-color: #ff4500;
        box-shadow: 0 0 10px rgba(255, 69, 0, 0.3);
      }
    }
  }
  
  .debate-conversation {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    position: relative;
    z-index: 1;
  }
  
  .battle-input-zone {
    background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
    padding: 20px;
    border-top: 2px solid #ff4500;
    
    .input-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      
      .round-indicator {
        font-weight: bold;
        color: #ff4500;
      }
      
      .timer {
        font-family: 'Courier New', monospace;
        color: #00ff00;
        font-weight: bold;
      }
    }
    
    .quick-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      justify-content: center;
      
      .quick-btn {
        padding: 8px 12px;
        background: linear-gradient(135deg, #ff4500 0%, #ff6500 100%);
        border: none;
        border-radius: 15px;
        color: white;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 69, 0, 0.4);
        }
      }
    }
  }
}

// 右侧战况面板
.battle-status-panel {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
  border-left: 2px solid #ff4500;
  padding: 20px;
  overflow-y: auto;
  
  .panel-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ff4500;
  }
  
  .score-board {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 69, 0, 0.1);
    border: 1px solid #ff4500;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 20px;
    
    .score-item {
      text-align: center;
      
      .score-label {
        font-size: 12px;
        opacity: 0.8;
      }
      
      .score-value {
        font-size: 24px;
        font-weight: bold;
        color: #ff4500;
      }
    }
    
    .vs-indicator {
      font-weight: bold;
      font-size: 14px;
      color: #ffffff;
    }
  }
  
  .performance-metrics {
    margin-bottom: 20px;
    
    .metric {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      
      .metric-icon {
        font-size: 14px;
      }
      
      .metric-label {
        font-size: 11px;
        min-width: 60px;
      }
      
      .progress-bar {
        flex: 1;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        
        .progress {
          height: 100%;
          background: linear-gradient(90deg, #ff4500 0%, #ff6500 100%);
          border-radius: 3px;
          transition: width 0.5s ease;
        }
      }
    }
  }
  
  .recent-moves {
    h4 {
      color: #ff4500;
      font-size: 14px;
      margin-bottom: 10px;
    }
    
    .move-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      padding: 8px;
      background: rgba(255, 69, 0, 0.05);
      border-radius: 8px;
      
      .move-type {
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
        
        &.attack {
          background: #ff0000;
          color: white;
        }
        
        &.defense {
          background: #0080ff;
          color: white;
        }
        
        &.special {
          background: #ffd700;
          color: black;
        }
      }
      
      .move-desc {
        font-size: 11px;
        opacity: 0.9;
      }
    }
  }
}

// 底部状态栏
.arena-footer {
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  padding: 10px 30px;
  border-top: 1px solid #ff4500;
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .session-info {
      display: flex;
      gap: 15px;
      font-size: 11px;
      opacity: 0.8;
    }
    
    .network-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      
      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        
        &.online {
          background: #00ff00;
          box-shadow: 0 0 5px #00ff00;
        }
      }
    }
  }
}

// 动画效果
@keyframes battlePulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px #ff0000);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px #ff0000);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .debate-main {
    grid-template-columns: 250px 1fr 280px;
  }
}

@media (max-width: 968px) {
  .debate-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .opponent-panel,
  .battle-status-panel {
    display: none;
  }
}
</style>