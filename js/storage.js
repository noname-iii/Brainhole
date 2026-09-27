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

  // 获取进度（损坏时自动回退为空对象，避免整体瘫痪）
  getProgress() {
    try {
      const data = localStorage.getItem('oi_progress');
      const parsed = data ? JSON.parse(data) : {};
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch (e) {
      console.warn('oi_progress 数据损坏，已重置', e);
      try { localStorage.removeItem('oi_progress'); } catch (e2) {}
      return {};
    }
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
    const DEFAULTS = {
      aiName: '',
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4.1-mini',
      luoguUser: '',
      themeColor: '#6366f1',
      deepThinking: true
    };
    try {
      const data = localStorage.getItem('oi_settings');
      if (!data) return DEFAULTS;
      const parsed = JSON.parse(data);
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed))
        ? Object.assign({}, DEFAULTS, parsed) : DEFAULTS;
    } catch (e) {
      console.warn('oi_settings 数据损坏，已重置为默认设置', e);
      try { localStorage.removeItem('oi_settings'); } catch (e2) {}
      return DEFAULTS;
    }
  },

  // 保存AI对话历史
  saveChatHistory(moduleId, messages) {
    const key = `oi_chat_${moduleId}`;
    localStorage.setItem(key, JSON.stringify(messages));
  },

  // 获取AI对话历史（损坏时自动回退为空数组）
  getChatHistory(moduleId) {
    const key = `oi_chat_${moduleId}`;
    try {
      const data = localStorage.getItem(key);
      const parsed = data ? JSON.parse(data) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('对话历史数据损坏，已重置', e);
      try { localStorage.removeItem(key); } catch (e2) {}
      return [];
    }
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

  // 保存初赛 quiz 答题记录（按模块 id 分档）
  saveQuizAnswers(moduleId, records) {
    try {
      localStorage.setItem('oi_quiz_' + moduleId, JSON.stringify(records || {}));
    } catch (e) {}
  },

  // 读取初赛 quiz 答题记录
  getQuizAnswers(moduleId) {
    try {
      const data = localStorage.getItem('oi_quiz_' + moduleId);
      return data ? JSON.parse(data) : {};
    } catch (e) { return {}; }
  },

  // ============ 知识点/专项/复习题的作答记录（交互式答题） ============
  // 全部记录存于一个键：{ [nbKey]: { a: 用户答案, ok: 0|1, t: 时间戳 } }
  _kpAnswerStore() {
    try {
      const data = localStorage.getItem('kp_answers_v1');
      const parsed = data ? JSON.parse(data) : {};
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch (e) {
      try { localStorage.removeItem('kp_answers_v1'); } catch (e2) {}
      return {};
    }
  },
  saveKpAnswer(nbKey, rec) {
    try {
      const all = this._kpAnswerStore();
      all[nbKey] = Object.assign({ t: Date.now() }, rec || {});
      localStorage.setItem('kp_answers_v1', JSON.stringify(all));
    } catch (e) {}
  },
  getKpAnswer(nbKey) {
    return this._kpAnswerStore()[nbKey] || null;
  },
  clearKpAnswer(nbKey) {
    try {
      const all = this._kpAnswerStore();
      delete all[nbKey];
      localStorage.setItem('kp_answers_v1', JSON.stringify(all));
    } catch (e) {}
  },

  // ============ OI 答题记录清理（只影响 OI 部分，其他学科数据不动） ============
  // OI 的答题记录包含两类：
  //   1. oi_progress —— 各关卡完成状态（题目做完标记 completed）
  //   2. oi_quiz_<模块id> —— 初赛 quiz 的逐题作答记录
  // 其他学科（数学/物理/化学/生物/语文）使用 kp_answers_v1 / kp_progress_* 等键，均不触碰。

  // 清空全部 OI 答题记录
  clearOIAnswers() {
    try {
      // 1) 清关卡完成进度
      localStorage.removeItem('oi_progress');
      // 2) 清所有模块的 quiz 答题记录（oi_quiz_ 前缀的键）
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('oi_quiz_') === 0) toRemove.push(k);
      }
      toRemove.forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      return true;
    } catch (e) {
      console.warn('清空 OI 答题记录失败', e);
      return false;
    }
  },

  // 清除某一章节的 OI 答题记录（chapterId 如 'ch3_1'）
  clearOIChapter(chapterId) {
    try {
      const chapter = (typeof CHAPTERS !== 'undefined' ? CHAPTERS : [])
        .find(ch => ch.id === chapterId);
      if (!chapter) return false;
      const moduleIds = chapter.modules.map(m => m.id);

      // 1) 从 oi_progress 中删掉该章节所有模块的进度
      const progress = this.getProgress();
      let changed = false;
      moduleIds.forEach(id => {
        if (id in progress) { delete progress[id]; changed = true; }
      });
      if (changed) localStorage.setItem('oi_progress', JSON.stringify(progress));

      // 2) 删掉该章节所有模块的 quiz 记录
      moduleIds.forEach(id => {
        try { localStorage.removeItem('oi_quiz_' + id); } catch (e) {}
      });
      return true;
    } catch (e) {
      console.warn('清除章节答题记录失败', e);
      return false;
    }
  },

  // 统计当前 OI 答题记录情况（供设置界面展示）
  getOIAnswerStats() {
    let completedModules = 0, quizModules = 0, quizQuestions = 0;
    try {
      const progress = this.getProgress();
      Object.values(progress).forEach(s => {
        if (s === 'completed') completedModules++;
      });
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('oi_quiz_') === 0) {
          quizModules++;
          try {
            const rec = JSON.parse(localStorage.getItem(k) || '{}');
            quizQuestions += Object.keys(rec).length;
          } catch (e) {}
        }
      }
    } catch (e) {}
    return { completedModules, quizModules, quizQuestions };
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
