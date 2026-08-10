// 本地存储管理
const Storage = {
  // 初始化存储
  init() {
    console.log('Storage 初始化完成');
  },

  // 保存进度
  saveProgress(moduleId, status) {
    const progress = this.getProgress();
    progress[moduleId] = status;
    localStorage.setItem('oi_progress', JSON.stringify(progress));
  },

  // 获取进度
  getProgress() {
    const data = localStorage.getItem('oi_progress');
    return data ? JSON.parse(data) : {};
  },

  // 获取单个模块进度（供app.js调用）
  getModuleProgress(moduleId) {
    const progress = this.getProgress();
    if (progress[moduleId]) {
      return { status: progress[moduleId] };
    }
    return null;
  },

  // 检查模块是否完成
  isCompleted(moduleId) {
    const progress = this.getProgress();
    return progress[moduleId] === 'completed';
  },

  // 标记模块完成
  completeModule(moduleId) {
    this.saveProgress(moduleId, 'completed');
  },

  // 保存设置
  saveSettings(settings) {
    localStorage.setItem('oi_settings', JSON.stringify(settings));
  },

  // 获取设置
  getSettings() {
    const data = localStorage.getItem('oi_settings');
    return data ? JSON.parse(data) : {
      aiName: '',
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4o-mini',
      luoguUser: '',
      themeColor: '#6366f1'
    };
  },

  // 保存AI对话历史
  saveChatHistory(moduleId, messages) {
    const key = `oi_chat_${moduleId}`;
    localStorage.setItem(key, JSON.stringify(messages));
  },

  // 获取AI对话历史
  getChatHistory(moduleId) {
    const key = `oi_chat_${moduleId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  // 获取学习时长（分钟）
  getStudyTime() {
    return parseInt(localStorage.getItem('oi_study_time') || '0');
  },

  // 增加学习时长
  addStudyTime(minutes) {
    const current = this.getStudyTime();
    localStorage.setItem('oi_study_time', (current + minutes).toString());
  },

  // 清除所有数据
  clearAll() {
    localStorage.clear();
  },

  // 获取统计数据
  getStats() {
    const progress = this.getProgress();
    const total = CHAPTERS.reduce((sum, ch) => sum + ch.modules.length, 0);
    const completed = Object.values(progress).filter(s => s === 'completed').length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
};
