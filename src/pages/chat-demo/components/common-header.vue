<template>
    <div class="ai-assistant-card">
        <div class="assistant-header">
            <div class="assistant-avatar">
                <img v-if="robotAvatar" :src="robotAvatar" alt="AI办公助手" />
                <div v-else class="default-avatar">
                    <div class="avatar-icon">🤖</div>
                    <div class="status-indicator"></div>
                </div>
            </div>
            <div class="assistant-info">
                <h3 class="assistant-name">{{ robotName || 'AI办公助手' }}</h3>
                <div class="assistant-role">
                    <span class="role-badge">专业版</span>
                    <span class="ai-version">v2.1</span>
                </div>
                <div class="online-status">
                    <div class="status-dot online"></div>
                    <span class="status-text">在线服务</span>
                </div>
            </div>
        </div>
        
        <div class="efficiency-overview">
            <div class="overview-title">🚀 效率指数</div>
            <div class="efficiency-score">
                <div class="score-number">96.8</div>
                <div class="score-label">效率评分</div>
                <div class="score-trend">↗️ +12%</div>
            </div>
        </div>
        
        <div class="assistant-capabilities">
            <div class="capabilities-title">💡 核心能力</div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <div class="capability-icon">📝</div>
                    <div class="capability-name">文档处理</div>
                    <div class="capability-level">95%</div>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">📊</div>
                    <div class="capability-name">数据分析</div>
                    <div class="capability-level">98%</div>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">📧</div>
                    <div class="capability-name">邮件编写</div>
                    <div class="capability-level">92%</div>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">⏰</div>
                    <div class="capability-name">时间管理</div>
                    <div class="capability-level">89%</div>
                </div>
            </div>
        </div>
        
        <div class="productivity-stats">
            <div class="stats-title">📊 生产力统计</div>
            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-value">1,247</div>
                    <div class="stat-label">任务完成</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">32.5h</div>
                    <div class="stat-label">节省时间</div>
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
.ai-assistant-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0;
  color: #1e293b;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 10px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  .assistant-header {
    padding: 20px;
    border-bottom: 1px solid #f1f5f9;
    position: relative;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    
    .assistant-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }
      
      .default-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 2px solid #ffffff;
        box-shadow: 
          0 4px 12px rgba(59, 130, 246, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        
        .avatar-icon {
          font-size: 28px;
          color: #ffffff;
          z-index: 2;
        }
        
        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          background: #10b981;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
    
    .assistant-info {
      text-align: center;
      
      .assistant-name {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #1e293b;
      }
      
      .assistant-role {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        
        .role-badge {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
        
        .ai-version {
          font-size: 10px;
          color: #64748b;
          font-weight: 500;
        }
      }
      
      .online-status {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          
          &.online {
            background: #10b981;
            animation: statusPulse 2s ease-in-out infinite;
            box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
          }
        }
        
        .status-text {
          font-size: 11px;
          color: #10b981;
          font-weight: 500;
        }
      }
    }
  }
  
  .efficiency-overview {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    text-align: center;
    
    .overview-title {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 12px;
      opacity: 0.9;
    }
    
    .efficiency-score {
      .score-number {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 4px;
      }
      
      .score-label {
        font-size: 10px;
        opacity: 0.8;
        margin-bottom: 4px;
      }
      
      .score-trend {
        font-size: 10px;
        color: #34d399;
        font-weight: 600;
      }
    }
  }
  
  .assistant-capabilities {
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    
    .capabilities-title {
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .capabilities-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      
      .capability-card {
        text-align: center;
        padding: 8px;
        background: #f8fafc;
        border-radius: 6px;
        border: 1px solid #f1f5f9;
        transition: all 0.2s ease;
        
        &:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }
        
        .capability-icon {
          font-size: 16px;
          margin-bottom: 4px;
          color: #3b82f6;
        }
        
        .capability-name {
          font-size: 9px;
          color: #64748b;
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .capability-level {
          font-size: 8px;
          color: #10b981;
          font-weight: 600;
        }
      }
    }
  }
  
  .productivity-stats {
    padding: 16px 20px;
    
    .stats-title {
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 12px;
      text-align: center;
    }
    
    .stats-row {
      display: flex;
      gap: 16px;
      
      .stat-item {
        flex: 1;
        text-align: center;
        padding: 12px;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        
        .stat-value {
          font-size: 16px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 9px;
          color: #64748b;
          font-weight: 500;
        }
      }
    }
  }
}

// 动画效果
@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ai-assistant-card {
  animation: slideUp 0.5s ease-out;
  
  .assistant-header,
  .efficiency-overview,
  .assistant-capabilities,
  .productivity-stats {
    animation: slideUp 0.6s ease-out;
  }
}
</style>
