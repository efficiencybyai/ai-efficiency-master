<template>
    <div class="ai-opponent-card">
        <div class="opponent-header">
            <div class="opponent-avatar">
                <img v-if="robotAvatar" :src="robotAvatar" alt="AI辞论对手" />
                <div v-else class="default-avatar">
                    <div class="avatar-icon">🤖</div>
                    <div class="power-glow"></div>
                </div>
            </div>
            <div class="opponent-info">
                <h3 class="opponent-name">{{ robotName || 'AI辞论大师' }}</h3>
                <div class="opponent-level">
                    <span class="level-badge">Lv.99</span>
                    <span class="ai-type">超级智能</span>
                </div>
                <div class="battle-status">
                    <div class="status-dot charging"></div>
                    <span class="status-text">准备应战</span>
                </div>
            </div>
        </div>
        
        <div class="ai-capabilities">
            <div class="capability-title">🧠 核心能力</div>
            <div class="capability-list">
                <div class="capability-item">
                    <span class="capability-icon">💡</span>
                    <span class="capability-name">逻辑推理</span>
                    <div class="power-bar">
                        <div class="power-fill" style="width: 95%"></div>
                    </div>
                </div>
                <div class="capability-item">
                    <span class="capability-icon">📊</span>
                    <span class="capability-name">数据分析</span>
                    <div class="power-bar">
                        <div class="power-fill" style="width: 98%"></div>
                    </div>
                </div>
                <div class="capability-item">
                    <span class="capability-icon">🎯</span>
                    <span class="capability-name">反驳精度</span>
                    <div class="power-bar">
                        <div class="power-fill" style="width: 92%"></div>
                    </div>
                </div>
                <div class="capability-item">
                    <span class="capability-icon">⚡</span>
                    <span class="capability-name">反应速度</span>
                    <div class="power-bar">
                        <div class="power-fill" style="width: 99%"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="battle-history">
            <div class="history-title">⚔️ 战绩统计</div>
            <div class="stats-grid">
                <div class="stat-box victories">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">12,847</div>
                    <div class="stat-label">胜利</div>
                </div>
                <div class="stat-box winrate">
                    <div class="stat-icon">📈</div>
                    <div class="stat-value">96%</div>
                    <div class="stat-label">胜率</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonHeader',
    components: {
    },
    props: {
    },
    data () {
        return {
            robotName: '',
            robotAvatar: ''
        };
    },
    created () {
        // 监听配置信息，获取机器人名称
        this.$eventHub.$on('client_configChange', (res) => {
            this.robotName = res.name;
            this.robotAvatar = res.avatar;
        });
    },
    methods: {
    }
};
</script>

<style lang="less">
.ai-opponent-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border: 2px solid #ff4500;
  border-radius: 20px;
  padding: 0;
  color: #ffffff;
  box-shadow: 0 8px 32px rgba(255, 69, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 69, 0, 0.05) 0%, rgba(255, 69, 0, 0.02) 100%);
    pointer-events: none;
  }
  
  .opponent-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 69, 0, 0.3);
    position: relative;
    
    .opponent-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #ff4500;
        box-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
      }
      
      .default-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff4500 0%, #ff6500 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 3px solid #ffffff;
        box-shadow: 
          0 0 20px rgba(255, 69, 0, 0.6),
          inset 0 2px 10px rgba(255, 255, 255, 0.2);
        animation: aiGlow 3s ease-in-out infinite;
        
        .avatar-icon {
          font-size: 36px;
          color: #ffffff;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          z-index: 2;
        }
        
        .power-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          animation: powerPulse 2s ease-in-out infinite;
        }
      }
    }
    
    .opponent-info {
      text-align: center;
      
      .opponent-name {
        font-size: 18px;
        font-weight: 900;
        margin: 0 0 8px 0;
        background: linear-gradient(135deg, #ffffff 0%, #ffdddd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
      }
      
      .opponent-level {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        
        .level-badge {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #000;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
        }
        
        .ai-type {
          font-size: 11px;
          color: #ff4500;
          font-weight: 600;
        }
      }
      
      .battle-status {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          
          &.charging {
            background: #00ff00;
            animation: chargePulse 1.5s ease-in-out infinite;
            box-shadow: 0 0 10px #00ff00;
          }
        }
        
        .status-text {
          font-size: 12px;
          color: #00ff00;
          font-weight: 600;
        }
      }
    }
  }
  
  .ai-capabilities {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 69, 0, 0.3);
    
    .capability-title {
      font-size: 13px;
      font-weight: bold;
      color: #ff4500;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .capability-list {
      .capability-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .capability-icon {
          font-size: 12px;
          width: 16px;
        }
        
        .capability-name {
          font-size: 10px;
          min-width: 50px;
          color: #dddddd;
        }
        
        .power-bar {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          
          .power-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff4500 0%, #ffd700 100%);
            border-radius: 2px;
            transition: width 0.5s ease;
            box-shadow: 0 0 4px rgba(255, 69, 0, 0.6);
          }
        }
      }
    }
  }
  
  .battle-history {
    padding: 15px 20px;
    
    .history-title {
      font-size: 13px;
      font-weight: bold;
      color: #ff4500;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      
      .stat-box {
        text-align: center;
        padding: 10px;
        background: rgba(255, 69, 0, 0.1);
        border: 1px solid rgba(255, 69, 0, 0.3);
        border-radius: 8px;
        
        .stat-icon {
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: bold;
          color: #ffd700;
          margin-bottom: 2px;
        }
        
        .stat-label {
          font-size: 9px;
          color: #cccccc;
          opacity: 0.8;
        }
      }
    }
  }
}

// 动画效果
@keyframes aiGlow {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 69, 0, 0.6),
      inset 0 2px 10px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 69, 0, 0.8),
      0 0 40px rgba(255, 69, 0, 0.4),
      inset 0 2px 10px rgba(255, 255, 255, 0.3);
  }
}

@keyframes powerPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes chargePulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 10px #00ff00;
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
    box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00;
  }
}
</style>
