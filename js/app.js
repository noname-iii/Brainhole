// 主应用逻辑
const App = {
  // 初始化应用
  init() {
    console.log('OI练习助手启动中...');
    
    // 初始化存储
    Storage.init();

    // 应用主题色
    this.applyTheme();
    
    // 应用代码背景色
    this.applyCodeTheme();
    
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

  // 应用主题色
  applyTheme(color) {
    const themeColor = color || Storage.getSettings().themeColor || '#6366f1';
    const root = document.documentElement;
    root.style.setProperty('--primary-color', themeColor);
    // 自动生成衍生色
    const darker = this.adjustColor(themeColor, -20);
    const lighter = this.adjustColor(themeColor, 30);
    root.style.setProperty('--primary-dark', darker);
    root.style.setProperty('--primary-light', lighter);
  },

  // 调整颜色亮度
  adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // 应用代码背景色主题
  applyCodeTheme(color) {
    const codeBg = color || Storage.getSettings().codeBg || '#282c34';
    const root = document.documentElement;
    root.style.setProperty('--hljs-bg', codeBg);

    // 基于HSL计算衍生色
    const hsl = this.hexToHsl(codeBg);

    // --code-header-bg: 亮度降低4%
    root.style.setProperty('--code-header-bg', this.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 4)));

    // --code-border: 亮度降低8%
    root.style.setProperty('--code-border', this.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 8)));

    // --code-btn-border: 亮度增加9%
    root.style.setProperty('--code-btn-border', this.hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 9)));

    // --code-text-dim: 深色背景用浅色字，浅色背景用深色字
    const textDim = hsl.l > 50
      ? this.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 50))
      : this.hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 52));
    root.style.setProperty('--code-text-dim', textDim);

    return codeBg;
  },

  // hex转hsl
  hexToHsl(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  },

  // hsl转hex
  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, '0');
    };
    return '#' + f(0) + f(8) + f(4);
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

    // 弹窗关闭：事件委托绑定在 init 时（不依赖 showSettings 是否执行成功）
    document.querySelectorAll('.modal').forEach(modal => {
      // 点击 × 按钮关闭
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
      // 点击遮罩区域关闭（点到弹窗本体不关闭）
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // ESC 键关闭最上层的已打开弹窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          activeModal.classList.remove('active');
        }
      }
    });

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

    // 关闭按钮（提前绑定，保证即使下方加载出错也能关闭弹窗）
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
      };
    }

    const providerSelect = document.getElementById('settingProvider');
    const modelSelect = document.getElementById('settingModel');

    // 服务商切换事件（提前绑定，保证即使下方加载出错也能正常刷新模型列表）
    providerSelect.onchange = () => {
      this.updateModelList(providerSelect.value);
    };

    // 加载当前设置（容错：即使数据异常也不影响弹窗交互）
    try {
    const settings = Storage.getSettings() || {};
    const aiNameInput = document.getElementById('settingAiName');

    // 设置AI昵称
    aiNameInput.value = settings.aiName || '';

    // 设置服务商（默认openai）
    providerSelect.value = settings.provider || 'openai';

    // 填充模型列表
    this.updateModelList(providerSelect.value);

    // 设置已保存的模型（updateModelList 为同步填充，直接赋值即可）
    if (settings.model) {
      modelSelect.value = settings.model;
    }

    document.getElementById('settingApiKey').value = settings.apiKey || '';
    document.getElementById('settingLuoguUser').value = settings.luoguUser || '';

    // 深度思考开关（历史设置无此字段时默认开启）
    document.getElementById('settingDeepThinking').checked = settings.deepThinking !== false;

    // 设置主题色
    const themeColorInput = document.getElementById('settingThemeColor');
    const themeHexSpan = document.getElementById('settingThemeHex');
    themeColorInput.value = settings.themeColor || '#6366f1';
    themeHexSpan.textContent = settings.themeColor || '#6366f1';
    themeColorInput.oninput = () => {
      themeHexSpan.textContent = themeColorInput.value;
      this.applyTheme(themeColorInput.value);
    };
    document.getElementById('btnResetColor').onclick = () => {
      themeColorInput.value = '#6366f1';
      themeHexSpan.textContent = '#6366f1';
      this.applyTheme('#6366f1');
    };

    // 设置代码背景色
    const codeBgInput = document.getElementById('settingCodeBg');
    const codeBgHexSpan = document.getElementById('settingCodeBgHex');
    codeBgInput.value = settings.codeBg || '#282c34';
    codeBgHexSpan.textContent = settings.codeBg || '#282c34';
    codeBgInput.oninput = () => {
      codeBgHexSpan.textContent = codeBgInput.value;
      this.applyCodeTheme(codeBgInput.value);
    };
    document.getElementById('btnResetCodeBg').onclick = () => {
      codeBgInput.value = '#282c34';
      codeBgHexSpan.textContent = '#282c34';
      this.applyCodeTheme('#282c34');
    };

    // 保存按钮
    const saveBtn = document.getElementById('btnSaveSettings');
    saveBtn.onclick = async () => {
      const newSettings = {
        aiName: aiNameInput.value.trim(),
        provider: providerSelect.value,
        apiKey: document.getElementById('settingApiKey').value.trim(),
        model: modelSelect.value.trim(),
        luoguUser: document.getElementById('settingLuoguUser').value.trim(),
        themeColor: document.getElementById('settingThemeColor').value,
        codeBg: document.getElementById('settingCodeBg').value,
        deepThinking: document.getElementById('settingDeepThinking').checked
      };

      // 如果有API配置，验证连接
      if (newSettings.apiKey && newSettings.model) {
        saveBtn.disabled = true;
        saveBtn.textContent = '验证中...';
        
        const valid = await this.validateApiConnection(newSettings);
        
        if (!valid) {
          saveBtn.disabled = false;
          saveBtn.textContent = '保存设置';
          LessonView.showToast('API 连接失败，请检查配置', 'error');
          return;
        }
        
        saveBtn.disabled = false;
        saveBtn.textContent = '保存设置';
      }

      Storage.saveSettings(newSettings);
      
      // 更新AI面板标题
      this.updateAiPanelTitle(newSettings.aiName);
      
      modal.classList.remove('active');
      LessonView.showToast('设置已保存', 'success');
    };
    } catch (err) {
      console.error('加载设置时出错:', err);
    }
  },

  // 验证API连接
  async validateApiConnection(settings) {
    const providerConfig = {
      openai: { url: 'https://api.openai.com/v1/chat/completions' },
      anthropic: { url: 'https://api.anthropic.com/v1/messages' },
      google: { url: 'https://generativelanguage.googleapis.com/v1beta/models' },
      deepseek: { url: 'https://api.deepseek.com/v1/chat/completions' },
      zhipu: { url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions' },
      qwen: { url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions' },
      baidu: { url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat' },
      moonshot: { url: 'https://api.moonshot.cn/v1/chat/completions' },
      yi: { url: 'https://api.lingyiwanwu.com/v1/chat/completions' },
      minimax: { url: 'https://api.minimax.chat/v1/text/chatcompletion_v2' },
      siliconflow: { url: 'https://api.siliconflow.cn/v1/chat/completions' }
    };

    const config = providerConfig[settings.provider];
    if (!config) return false;

    try {
      // 发送测试消息
      const testMessage = 'Hi';
      const result = await AI.sendToProvider(settings.provider, testMessage, '', settings.apiKey, settings.model, true);
      return result.success;
    } catch (error) {
      console.error('API验证失败:', error);
      return false;
    }
  },

  // 更新AI面板标题
  updateAiPanelTitle(aiName) {
    const panelHeader = document.querySelector('.ai-panel-header h3');
    if (panelHeader) {
      const svg = panelHeader.querySelector('svg').outerHTML;
      panelHeader.innerHTML = svg + ' ' + (aiName || 'AI 学习助手');
    }
    
    // 更新欢迎消息
    const welcomeDiv = document.querySelector('.ai-welcome');
    if (welcomeDiv) {
      const name = aiName || '你的 OI 学习助手';
      welcomeDiv.innerHTML = `<p>你好！我是${name}</p><p>有任何问题都可以问我哦！</p>`;
    }
  },

  // 根据服务商更新模型列表
  updateModelList(provider) {
    const modelSelect = document.getElementById('settingModel');

    const providerModels = {
      openai: [
        { value: 'gpt-5.6-sol', label: 'GPT-5.6 Sol (旗舰)' },
        { value: 'gpt-5.6-terra', label: 'GPT-5.6 Terra (均衡)' },
        { value: 'gpt-5.6-luna', label: 'GPT-5.6 Luna (高性价比)' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
      ],
      anthropic: [
        { value: 'claude-fable-5', label: 'Claude 5 Fable (最强)' },
        { value: 'claude-opus-4-8', label: 'Claude Opus 4.8 (复杂编程)' },
        { value: 'claude-sonnet-5', label: 'Claude Sonnet 5 (速度与智能均衡)' },
        { value: 'claude-opus-4-7', label: 'Claude Opus 4.7' },
        { value: 'claude-haiku-4-5', label: 'Claude Haiku 4 (最快)' }
      ],
      google: [
        { value: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash (快速)' },
        { value: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro Preview' },
        { value: 'gemini-3-ultra', label: 'Gemini 3 Ultra (旗舰)' },
        { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' }
      ],
      deepseek: [
        { value: 'deepseek-v4-pro', label: 'DeepSeek v4 Pro (强推理)' },
        { value: 'deepseek-v4-flash', label: 'DeepSeek v4 Flash (高性价比)' },
        { value: 'deepseek-v2', label: 'DeepSeek-V2' },
        { value: 'deepseek-coder', label: 'DeepSeek-Coder (代码专用)' }
      ],
      zhipu: [
        { value: 'glm-5.2-max', label: 'GLM-5.2 (max, 旗舰)' },
        { value: 'glm-5.2', label: 'GLM-5.2' },
        { value: 'chatglm3-6b', label: 'ChatGLM3' }
      ],
      qwen: [
        { value: 'qwen3.7-max', label: 'Qwen3.7 Max (旗舰)' },
        { value: 'qwen3.5', label: 'Qwen3.5' },
        { value: 'qwen2.5-72b-instruct', label: 'Qwen2.5 (72B)' },
        { value: 'qwen2-72b-instruct', label: 'Qwen2 (72B)' }
      ],
      baidu: [
        { value: 'ernie-4.5-8k-preview', label: '文心一言 4.5 (8K, Preview)' },
        { value: 'ernie-4.5-turbo-128k', label: '文心 4.5 Turbo (128K)' },
        { value: 'ernie-x1-turbo-128k', label: '文心 X1 Turbo (128K, 深度推理)' },
        { value: 'ernie-speed-pro-128k', label: '文心 Speed Pro (128K, 免费)' },
        { value: 'ernie-4.0-turbo-8k', label: '文心 4.0 Turbo (8K)' }
      ],
      moonshot: [
        { value: 'kimi-k3', label: 'Kimi K3 (旗舰, 2.8T参数)' },
        { value: 'kimi-k2.6', label: 'Kimi K2.6' },
        { value: 'kimi-k2-thinking', label: 'K2 Think (深度思考)' }
      ],
      yi: [
        { value: 'yi-large', label: 'Yi Large (旗舰)' },
        { value: 'yi-medium', label: 'Yi Medium' },
        { value: 'yi-lightning', label: 'Yi Lightning (高性价比)' }
      ],
      minimax: [
        { value: 'MiniMax-M3', label: 'Minimax-M3 (旗舰)' },
        { value: 'MiMo-V2.5-Pro', label: 'MiMo-V2.5-Pro' }
      ],
      siliconflow: [
        { value: 'deepseek-ai/DeepSeek-V3.1', label: 'DeepSeek V3.1 (235B)' },
        { value: 'deepseek-ai/DeepSeek-R1', label: 'DeepSeek R1 (推理)' },
        { value: 'Qwen/Qwen3-235B-A22B', label: 'Qwen3 235B (开源旗舰)' },
        { value: 'Qwen/QwQ-32B', label: 'QwQ 32B (推理)' },
        { value: 'Qwen/Qwen2.5-72B-Instruct', label: 'Qwen 2.5 72B' },
        { value: 'zhipuai/GLM-4.6', label: 'GLM-4.6' }
      ],
      custom: []
    };

    const models = providerModels[provider] || [];
    modelSelect.innerHTML = '';
    
    if (models.length === 0) {
      modelSelect.innerHTML = '<option value="">自定义模型</option>';
    } else {
      models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = model.label;
        modelSelect.appendChild(option);
      });
    }
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
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
          <div class="stat-info">
            <div class="stat-value">${stats.totalChapters}</div>
            <div class="stat-label">总章节数</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
          <div class="stat-info">
            <div class="stat-value">${stats.completedChapters}</div>
            <div class="stat-label">已完成章节</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></div>
          <div class="stat-info">
            <div class="stat-value">${stats.totalModules}</div>
            <div class="stat-label">总关卡数</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg></div>
          <div class="stat-info">
            <div class="stat-value">${stats.completedModules}</div>
            <div class="stat-label">已完成关卡</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>
          <div class="stat-info">
            <div class="stat-value">${stats.completionRate}%</div>
            <div class="stat-label">完成率</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
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
