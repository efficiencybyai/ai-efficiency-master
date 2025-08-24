<template>
    <div class="office-efficiency-app">
        <!-- 现代办公顶部导航栏 -->
        <header class="office-header">
            <div class="header-container">
                <div class="brand-section">
                    <div class="logo-icon">💼</div>
                    <div class="brand-info">
                        <h1 class="brand-title">AI办公提效大师</h1>
                        <span class="brand-tagline">智能助手，提升效率</span>
                    </div>
                </div>
                
                <nav class="nav-menu">
                    <div class="nav-item active">
                        <span class="nav-icon">🏠</span>
                        <span class="nav-text">工作台</span>
                    </div>
                    <div class="nav-item">
                        <span class="nav-icon">📊</span>
                        <span class="nav-text">数据分析</span>
                    </div>
                    <div class="nav-item">
                        <span class="nav-icon">⚙️</span>
                        <span class="nav-text">设置</span>
                    </div>
                </nav>
                
                <div class="user-section">
                    <div class="productivity-stats">
                        <div class="stat-item">
                            <span class="stat-value">1,247</span>
                            <span class="stat-label">任务完成</span>
                        </div>
                        <div class="stat-separator"></div>
                        <div class="stat-item">
                            <span class="stat-value">98.5%</span>
                            <span class="stat-label">效率提升</span>
                        </div>
                    </div>
                    <div class="user-avatar">
                        <div class="avatar-circle">👤</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- 主工作区域 -->
        <main class="office-main">
            <!-- 左侧功能面板 -->
            <aside class="feature-sidebar">
                <div class="ai-assistant-card">
                    <CommonHeader/>
                </div>
                
                <div class="efficiency-tools">
                    <div class="tool-category">
                        <h3 class="category-title">
                            <span class="category-icon">🚀</span>
                            效率工具
                        </h3>
                        <div class="tool-grid">
                            <div class="tool-card">
                                <div class="tool-icon">📝</div>
                                <span class="tool-name">文档生成</span>
                            </div>
                            <div class="tool-card">
                                <div class="tool-icon">📊</div>
                                <span class="tool-name">数据分析</span>
                            </div>
                            <div class="tool-card">
                                <div class="tool-icon">📧</div>
                                <span class="tool-name">邮件助手</span>
                            </div>
                            <div class="tool-card">
                                <div class="tool-icon">⏰</div>
                                <span class="tool-name">时间管理</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <h3 class="category-title">
                            <span class="category-icon">⚡</span>
                            快速操作
                        </h3>
                        <div class="action-list">
                            <div class="action-item">
                                <span class="action-icon">📋</span>
                                <span class="action-text">制作PPT大纲</span>
                            </div>
                            <div class="action-item">
                                <span class="action-icon">📈</span>
                                <span class="action-text">生成工作报告</span>
                            </div>
                            <div class="action-item">
                                <span class="action-icon">🎯</span>
                                <span class="action-text">制定计划方案</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- 中央智能对话工作区 -->
            <section class="chat-workspace">
                <!-- 工作区顶部工具栏 -->
                <div class="workspace-toolbar">
                    <div class="toolbar-left">
                        <button class="mode-btn active">
                            <span class="btn-icon">💬</span>
                            智能对话
                        </button>
                        <button class="mode-btn">
                            <span class="btn-icon">📄</span>
                            文档协作
                        </button>
                        <button class="mode-btn">
                            <span class="btn-icon">🔍</span>
                            智能搜索
                        </button>
                    </div>
                    
                    <div class="toolbar-right">
                        <button class="tool-btn">
                            <span class="btn-icon">💾</span>
                            保存对话
                        </button>
                        <button class="tool-btn">
                            <span class="btn-icon">📤</span>
                            导出报告
                        </button>
                    </div>
                </div>

                <!-- 智能对话区域 -->
                <div class="conversation-area">
                    <ClientChat @send="onSendQuestion" />
                </div>

                <!-- 底部智能输入区 -->
                <div class="smart-input-area">
                    <div class="input-controls">
                        <div class="session-info">
                            <span class="session-label">当前会话</span>
                            <span class="session-time">⏰ 进行中 25:12</span>
                        </div>
                        <div class="input-stats">
                            <span class="words-count">字数统计: 0</span>
                        </div>
                    </div>
                    <QuestionInput @send="onSendQuestion" />
                    <div class="input-suggestions">
                        <button class="suggestion-btn">📊 生成数据报告</button>
                        <button class="suggestion-btn">📝 起草工作邮件</button>
                        <button class="suggestion-btn">📋 制作会议纪要</button>
                        <button class="suggestion-btn">🎯 制定项目计划</button>
                    </div>
                </div>
            </section>

            <!-- 右侧效率监控面板 -->
            <aside class="efficiency-dashboard">
                <div class="dashboard-title">
                    <span class="title-icon">📈</span>
                    效率监控
                </div>
                
                <div class="productivity-overview">
                    <div class="overview-card">
                        <div class="card-header">
                            <span class="card-icon">⚡</span>
                            <span class="card-title">今日效率</span>
                        </div>
                        <div class="efficiency-score">92%</div>
                        <div class="efficiency-trend">↗️ +8% 较昨日</div>
                    </div>
                </div>

                <div class="performance-metrics">
                    <div class="metrics-header">📊 性能指标</div>
                    <div class="metric-item">
                        <div class="metric-header">
                            <span class="metric-icon">📝</span>
                            <span class="metric-name">文档处理</span>
                        </div>
                        <div class="metric-progress">
                            <div class="metric-bar">
                                <div class="bar-fill" style="width: 88%"></div>
                            </div>
                            <span class="metric-value">88%</span>
                        </div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-header">
                            <span class="metric-icon">💡</span>
                            <span class="metric-name">创意生成</span>
                        </div>
                        <div class="metric-progress">
                            <div class="metric-bar">
                                <div class="bar-fill" style="width: 95%"></div>
                            </div>
                            <span class="metric-value">95%</span>
                        </div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-header">
                            <span class="metric-icon">🎯</span>
                            <span class="metric-name">任务完成</span>
                        </div>
                        <div class="metric-progress">
                            <div class="metric-bar">
                                <div class="bar-fill" style="width: 92%"></div>
                            </div>
                            <span class="metric-value">92%</span>
                        </div>
                    </div>
                </div>

                <div class="recent-activities">
                    <div class="activities-header">📋 最近活动</div>
                    <div class="activity-item">
                        <div class="activity-type success">✅</div>
                        <div class="activity-content">
                            <div class="activity-title">完成工作报告</div>
                            <div class="activity-time">2分钟前</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-type processing">⏳</div>
                        <div class="activity-content">
                            <div class="activity-title">生成PPT大纲</div>
                            <div class="activity-time">5分钟前</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-type completed">📊</div>
                        <div class="activity-content">
                            <div class="activity-title">数据分析完成</div>
                            <div class="activity-time">12分钟前</div>
                        </div>
                    </div>
                </div>
                
                <div class="quick-insights">
                    <div class="insights-header">💡 智能洞察</div>
                    <div class="insight-card">
                        <div class="insight-icon">🔥</div>
                        <div class="insight-text">您今天的工作效率比平均水平高出15%</div>
                    </div>
                </div>
            </aside>
        </main>

        <!-- 底部信息栏 -->
        <footer class="office-footer">
            <div class="footer-container">
                <div class="workspace-info">
                    <span class="info-item">
                        <span class="info-icon">💼</span>
                        智能办公模式
                    </span>
                    <span class="info-separator">•</span>
                    <span class="info-item">
                        <span class="info-icon">⏰</span>
                        工作时长: 2小时31分
                    </span>
                    <span class="info-separator">•</span>
                    <span class="info-item">
                        <span class="info-icon">📊</span>
                        已处理: 15个任务
                    </span>
                </div>
                <div class="system-status">
                    <div class="status-indicator online"></div>
                    <span class="status-text">AI助手运行正常</span>
                    <span class="version-info">v2.1.0</span>
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
.office-efficiency-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  color: #1e293b;
  font-family: 'Inter', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
}

/* 现代办公顶部导航栏 */
.office-header {
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  padding: 16px 32px;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .brand-section {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .logo-icon {
        font-size: 28px;
        color: #3b82f6;
        filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
      }
      
      .brand-info {
        .brand-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .brand-tagline {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }
      }
    }
    
    .nav-menu {
      display: flex;
      gap: 8px;
      
      .nav-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #64748b;
        font-weight: 500;
        
        &.active {
          background: #3b82f6;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        &:not(.active):hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        
        .nav-icon {
          font-size: 16px;
        }
        
        .nav-text {
          font-size: 13px;
        }
      }
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .productivity-stats {
        display: flex;
        align-items: center;
        gap: 16px;
        
        .stat-item {
          text-align: center;
          
          .stat-value {
            font-size: 16px;
            font-weight: 700;
            color: #3b82f6;
            line-height: 1;
          }
          
          .stat-label {
            font-size: 10px;
            color: #64748b;
            font-weight: 500;
            margin-top: 2px;
          }
        }
        
        .stat-separator {
          width: 1px;
          height: 24px;
          background: #e2e8f0;
        }
      }
      
      .user-avatar {
        .avatar-circle {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      }
    }
  }
}

/* 主工作区域 */
.office-main {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  flex: 1;
  overflow: hidden;
  gap: 1px;
  background: #e2e8f0;
}

/* 左侧功能面板 */
.feature-sidebar {
  background: #ffffff;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid #e2e8f0;
  
  .ai-assistant-card {
    margin-bottom: 24px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid #e2e8f0;
  }
  
  .efficiency-tools {
    .tool-category {
      margin-bottom: 24px;
      
      .category-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #1e293b;
        
        .category-icon {
          font-size: 16px;
          color: #3b82f6;
        }
      }
      
      .tool-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        
        .tool-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          
          &:hover {
            background: #3b82f6;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          .tool-icon {
            font-size: 20px;
          }
          
          .tool-name {
            font-size: 11px;
            font-weight: 500;
            text-align: center;
          }
        }
      }
    }
    
    .quick-actions {
      .category-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #1e293b;
        
        .category-icon {
          font-size: 16px;
          color: #10b981;
        }
      }
      
      .action-list {
        .action-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 8px;
          background: #f8fafc;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #f1f5f9;
          
          &:hover {
            background: #e2e8f0;
            border-color: #cbd5e1;
            transform: translateX(4px);
          }
          
          .action-icon {
            font-size: 16px;
            color: #10b981;
          }
          
          .action-text {
            font-size: 13px;
            font-weight: 500;
            color: #374151;
          }
        }
      }
    }
  }
}

/* 中央智能对话工作区 */
.chat-workspace {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: relative;
  
  .workspace-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    
    .toolbar-left {
      display: flex;
      gap: 8px;
      
      .mode-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        color: #64748b;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 13px;
        font-weight: 500;
        
        &.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        
        &:not(.active):hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        
        .btn-icon {
          font-size: 14px;
        }
      }
    }
    
    .toolbar-right {
      display: flex;
      gap: 8px;
      
      .tool-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        color: #64748b;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 12px;
        
        &:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #1e293b;
        }
        
        .btn-icon {
          font-size: 14px;
        }
      }
    }
  }
  
  .conversation-area {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    position: relative;
    background: #fefefe;
  }
  
  .smart-input-area {
    background: #f8fafc;
    padding: 20px 24px;
    border-top: 1px solid #e2e8f0;
    
    .input-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .session-info {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .session-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }
        
        .session-time {
          font-size: 12px;
          color: #10b981;
          font-weight: 600;
        }
      }
      
      .input-stats {
        .words-count {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }
      }
    }
    
    .input-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
      justify-content: center;
      
      .suggestion-btn {
        padding: 6px 12px;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        color: #64748b;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;
        
        &:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
      }
    }
  }
}

/* 右侧效率监控面板 */
.efficiency-dashboard {
  background: #ffffff;
  border-left: 1px solid #e2e8f0;
  padding: 24px;
  overflow-y: auto;
  
  .dashboard-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #1e293b;
    
    .title-icon {
      font-size: 18px;
      color: #3b82f6;
    }
  }
  
  .productivity-overview {
    margin-bottom: 24px;
    
    .overview-card {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 12px;
      padding: 20px;
      color: white;
      text-align: center;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      
      .card-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 12px;
        
        .card-icon {
          font-size: 16px;
        }
        
        .card-title {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
        }
      }
      
      .efficiency-score {
        font-size: 36px;
        font-weight: 800;
        margin-bottom: 8px;
      }
      
      .efficiency-trend {
        font-size: 12px;
        opacity: 0.8;
        font-weight: 500;
      }
    }
  }
  
  .performance-metrics {
    margin-bottom: 24px;
    
    .metrics-header {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    
    .metric-item {
      margin-bottom: 16px;
      
      .metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        
        .metric-icon {
          font-size: 14px;
          color: #10b981;
        }
        
        .metric-name {
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          flex: 1;
        }
      }
      
      .metric-progress {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .metric-bar {
          flex: 1;
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          
          .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
            border-radius: 3px;
            transition: width 0.5s ease;
          }
        }
        
        .metric-value {
          font-size: 11px;
          font-weight: 600;
          color: #10b981;
          min-width: 32px;
        }
      }
    }
  }
  
  .recent-activities {
    margin-bottom: 24px;
    
    .activities-header {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #f1f5f9;
      
      .activity-type {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        
        &.success {
          background: #10b981;
          color: white;
        }
        
        &.processing {
          background: #f59e0b;
          color: white;
        }
        
        &.completed {
          background: #3b82f6;
          color: white;
        }
      }
      
      .activity-content {
        flex: 1;
        
        .activity-title {
          font-size: 12px;
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 2px;
        }
        
        .activity-time {
          font-size: 10px;
          color: #64748b;
        }
      }
    }
  }
  
  .quick-insights {
    .insights-header {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 16px;
    }
    
    .insight-card {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      
      .insight-icon {
        font-size: 16px;
        color: #f59e0b;
        flex-shrink: 0;
      }
      
      .insight-text {
        font-size: 12px;
        color: #92400e;
        line-height: 1.5;
        font-weight: 500;
      }
    }
  }
}

/* 底部信息栏 */
.office-footer {
  background: #f8fafc;
  padding: 12px 32px;
  border-top: 1px solid #e2e8f0;
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .workspace-info {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .info-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: #64748b;
        font-weight: 500;
        
        .info-icon {
          font-size: 12px;
          color: #3b82f6;
        }
      }
      
      .info-separator {
        color: #cbd5e1;
        font-size: 10px;
      }
    }
    
    .system-status {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        
        &.online {
          background: #10b981;
          box-shadow: 0 0 4px rgba(16, 185, 129, 0.5);
        }
      }
      
      .status-text {
        font-size: 11px;
        color: #64748b;
        font-weight: 500;
      }
      
      .version-info {
        font-size: 10px;
        color: #94a3b8;
        font-weight: 400;
      }
    }
  }
}

/* 动画效果 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes progressGrow {
  from {
    width: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* 全局动画 */
.office-efficiency-app {
  animation: fadeIn 0.5s ease-out;
  
  .feature-sidebar,
  .chat-workspace,
  .efficiency-dashboard {
    animation: slideInUp 0.6s ease-out;
  }
  
  .bar-fill {
    animation: progressGrow 1s ease-out;
  }
  
  .status-indicator.online {
    animation: pulse 2s ease-in-out infinite;
  }
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .office-main {
    grid-template-columns: 280px 1fr 280px;
  }
}

@media (max-width: 1200px) {
  .office-main {
    grid-template-columns: 260px 1fr 260px;
  }
  
  .office-header {
    .nav-menu {
      .nav-item {
        .nav-text {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 968px) {
  .office-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
  
  .feature-sidebar,
  .efficiency-dashboard {
    display: none;
  }
  
  .office-header {
    padding: 12px 20px;
    
    .nav-menu,
    .productivity-stats {
      display: none;
    }
  }
}

@media (max-width: 640px) {
  .office-header {
    .brand-section {
      .brand-info {
        .brand-title {
          font-size: 16px;
        }
        
        .brand-tagline {
          font-size: 10px;
        }
      }
    }
    
    .user-section {
      .user-avatar {
        .avatar-circle {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  
  .chat-workspace {
    .workspace-toolbar {
      padding: 12px 16px;
      
      .toolbar-right {
        display: none;
      }
    }
    
    .conversation-area {
      padding: 16px;
    }
    
    .smart-input-area {
      padding: 16px;
      
      .input-suggestions {
        .suggestion-btn {
          font-size: 10px;
          padding: 4px 8px;
        }
      }
    }
  }
}
</style>