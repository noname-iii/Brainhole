// 主应用逻辑
const App = {
  // 初始化应用
  init() {
    console.log('OI练习助手启动中...');
    
    // 初始化存储
    Storage.init();
    
    // 初始化地图视图
    MapView.init();
    
    // 初始化课程视图
    LessonView.init();
    
    // 初始化AI助手
    AIAssistant.init();
    
    // 绑定全局事件
    this.bindGlobalEvents();
    
    // 更新全局进度
    this.updateGlobalProgress();
    
    console.log('应用初始化完成');
  },

  // 绑定全局事件
  bindGlobalEvents() {
    // 设置按钮
    const btnSettings = document.getElementById('btnSettings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        this.showSettings();
      });
    }

    // 统计按钮
    const btnStats = document.getElementById('btnStats');
    if (btnStats) {
      btnStats.addEventListener('click', () => {
        this.showStats();
      });
    }

    // 返回按钮（由LessonView处理）
    // 这里不再重复绑定
  },

  // 显示地图视图
  showMap() {
    document.getElementById('mapView').classList.add('active');
    document.getElementById('lessonView').classList.remove('active');
    document.getElementById('btnBack').style.display = 'none';
    
    // 重新渲染地图以更新进度
    MapView.renderMap();
    this.updateGlobalProgress();
  },

  // 显示课程视图
  showLesson() {
    document.getElementById('mapView').classList.remove('active');
    document.getElementById('lessonView').classList.add('active');
    document.getElementById('btnBack').style.display = 'block';
  },

  // 显示设置弹窗
  showSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.add('active');
    
    // 加载当前设置
    const settings = Storage.getSettings();
    document.getElementById('settingApiUrl').value = settings.apiUrl || '';
    document.getElementById('settingApiKey').value = settings.apiKey || '';
    document.getElementById('settingModel').value = settings.model || 'gpt-3.5-turbo';
    document.getElementById('settingLuoguUser').value = settings.luoguUser || '';
    
    // 保存按钮
    const saveBtn = document.getElementById('btnSaveSettings');
    saveBtn.onclick = () => {
      const newSettings = {
        apiUrl: document.getElementById('settingApiUrl').value.trim(),
        apiKey: document.getElementById('settingApiKey').value.trim(),
        model: document.getElementById('settingModel').value.trim(),
        luoguUser: document.getElementById('settingLuoguUser').value.trim()
      };
      
      Storage.saveSettings(newSettings);
      modal.classList.remove('active');
      LessonView.showToast('设置已保存！', 'success');
    };
    
    // 关闭按钮
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
      modal.classList.remove('active');
    };
  },

  // 显示统计弹窗
  showStats() {
    const modal = document.getElementById('statsModal');
    const body = document.getElementById('statsBody');
    
    // 计算统计数据
    const stats = this.calculateStats();
    
    body.innerHTML = `
      <div class="stats-content">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <div class="stat-value">${stats.totalChapters}</div>
            <div class="stat-label">总章节数</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <div class="stat-value">${stats.completedChapters}</div>
            <div class="stat-label">已完成章节</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-value">${stats.totalModules}</div>
            <div class="stat-label">总关卡数</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <div class="stat-value">${stats.completedModules}</div>
            <div class="stat-label">已完成关卡</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <div class="stat-value">${stats.completionRate}%</div>
            <div class="stat-label">完成率</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-info">
            <div class="stat-value">${stats.studyTime}h</div>
            <div class="stat-label">学习时长</div>
          </div>
        </div>
      </div>
    `;
    
    modal.classList.add('active');
    
    // 关闭按钮
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
      modal.classList.remove('active');
    };
  },

  // 计算统计数据
  calculateStats() {
    let totalModules = 0;
    let completedModules = 0;
    
    CHAPTERS.forEach(chapter => {
      chapter.modules.forEach(module => {
        totalModules++;
        const progress = Storage.getModuleProgress(module.id);
        if (progress && progress.status === 'completed') {
          completedModules++;
        }
      });
    });

    const completedChapters = CHAPTERS.filter(chapter => {
      const progress = MapView.calculateChapterProgress(chapter);
      return progress.completed === progress.total;
    }).length;

    // 计算学习时长（从localStorage读取）
    const studyTime = Storage.getStudyTime() || 0;

    return {
      totalChapters: CHAPTERS.length,
      completedChapters,
      totalModules,
      completedModules,
      completionRate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      studyTime: Math.round(studyTime / 60) // 转换为小时
    };
  },

  // 更新全局进度
  updateGlobalProgress() {
    const stats = this.calculateStats();
    const progressFill = document.getElementById('globalProgress');
    const progressText = document.getElementById('globalProgressText');
    
    progressFill.style.width = `${stats.completionRate}%`;
    progressText.textContent = `${stats.completionRate}%`;
  }
};

// 页面加载完成后初始化应用
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
