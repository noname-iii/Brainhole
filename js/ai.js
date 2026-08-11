// AI 助手功能
const AI = {
  // 各厂商 API URL 映射
  providerUrls: {
    openai: 'https://api.openai.com/v1/chat/completions',
    anthropic: 'https://api.anthropic.com/v1/messages',
    google: 'https://generativelanguage.googleapis.com/v1beta/models',
    deepseek: 'https://api.deepseek.com/v1/chat/completions',
    zhipu: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    qwen: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    baidu: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat',
    moonshot: 'https://api.moonshot.cn/v1/chat/completions',
    yi: 'https://api.lingyiwanwu.com/v1/chat/completions',
    minimax: 'https://api.minimax.chat/v1/text/chatcompletion_pro',
    siliconflow: 'https://api.siliconflow.cn/v1/chat/completions'
  },

  // 获取系统提示词
  getSystemPrompt(context) {
    const settings = Storage.getSettings();
    const aiName = settings.aiName || 'AI 学习助手';
    return `你是一位热情洋溢、充满活力的 OI 学习助手，名字叫"${aiName}"，专门帮助初二学生学习算法和编程。

## 你的核心特点

**用户画像**
- 用户是一位初二学生，正在学习信息学竞赛（OI）
- 学生可能刚接触算法不久，对复杂概念需要循序渐进的讲解
- 学生可能会遇到困难和挫折，需要你的鼓励和支持

**回答风格**
- 热情生动：用充满活力的语言，让学习变得有趣
- 准确严谨：保证知识的正确性，但用通俗易懂的方式表达
- 灵活调整：不要过于坚持自己的想法，要根据学生的实际情况调整思路
- 多鼓励少批评：让学生保持学习热情，建立信心

**代码规范**
- 如果涉及代码，使用 C++ 并添加详细注释
- 解释代码时要逐行或逐块说明，确保学生能理解
- 给出代码前先解释思路，让学生知道为什么要这样写

**当前学习的内容**
${context || '学生正在学习 OI 相关知识'}`;
  },

  // 获取服务商 API URL
  getProviderUrl(provider) {
    return this.providerUrls[provider] || this.providerUrls.openai;
  },

  // 发送到指定提供商
  async sendToProvider(provider, message, context, apiKey, model, isValidation = false) {
    const systemPrompt = this.getSystemPrompt(context);
    const apiUrl = this.getProviderUrl(provider);

    switch (provider) {
      case 'anthropic':
        return await this.sendToAnthropic(message, systemPrompt, apiKey, apiUrl, model, isValidation);
      case 'google':
        return await this.sendToGoogle(message, systemPrompt, apiKey, apiUrl, model, isValidation);
      case 'baidu':
        return await this.sendToBaidu(message, systemPrompt, apiKey, apiUrl, model, isValidation);
      default:
        return await this.sendToOpenAICompatible(message, systemPrompt, apiKey, apiUrl, model, provider, isValidation);
    }
  },

  // 通用超时包装器（Promise.race 安全网）
  async _withTimeout(promise, timeoutMs) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new DOMException('整体操作超时', 'TimeoutError')), timeoutMs);
    });
    try {
      const result = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timeoutId);
      return result;
    } catch (e) {
      clearTimeout(timeoutId);
      throw e;
    }
  },

  // 发送到 OpenAI 兼容接口
  async sendToOpenAICompatible(message, systemPrompt, apiKey, apiUrl, model, provider, isValidation) {
    const fetchTimeout = isValidation ? 12000 : 45000;  // 验证12s，正常45s
    const totalTimeout = fetchTimeout + 5000;            // 整体多5s缓冲
    const operation = async () => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: isValidation ? 50 : 2000
        }),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (!content) {
        console.warn('API 返回空内容，完整响应:', JSON.stringify(data));
        throw new Error('AI 返回了空内容，请检查模型是否可用或API Key是否有效');
      }
      return { success: true, message: content };
    };

    try {
      return await this._withTimeout(operation(), totalTimeout);
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return { success: false, message: '请求超时，请稍后重试（可缩短思路或换用更快的模型）' };
      }
      console.error('API 请求异常:', error);
      return { success: false, message: `AI 请求失败: ${error.message}` };
    }
  },

  // 发送到 Anthropic (Claude)
  async sendToAnthropic(message, systemPrompt, apiKey, apiUrl, model, isValidation) {
    const fetchTimeout = isValidation ? 12000 : 45000;
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: model,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }],
          max_tokens: isValidation ? 50 : 2000
        }),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const content = data.content && data.content[0] && data.content[0].text;
      if (!content) {
        console.warn('Anthropic 返回空内容:', JSON.stringify(data));
        throw new Error('Claude 返回了空内容，请检查模型配置');
      }
      return { success: true, message: content };
    };

    try {
      return await this._withTimeout(operation(), totalTimeout);
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return { success: false, message: '请求超时，请稍后重试（可缩短思路或换用更快的模型）' };
      }
      return { success: false, message: `AI 请求失败: ${error.message}` };
    }
  },

  // 发送到 Google (Gemini)
  async sendToGoogle(message, systemPrompt, apiKey, apiUrl, model, isValidation) {
    const fetchTimeout = isValidation ? 12000 : 45000;
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const url = `${apiUrl}/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\n用户问题：${message}` }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: isValidation ? 50 : 2000
          }
        }),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const content = data.candidates && data.candidates[0] && data.candidates[0].content &&
                      data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
                      data.candidates[0].content.parts[0].text;
      if (!content) {
        console.warn('Gemini 返回空内容:', JSON.stringify(data));
        throw new Error('Gemini 返回了空内容，请检查模型配置');
      }
      return { success: true, message: content };
    };

    try {
      return await this._withTimeout(operation(), totalTimeout);
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return { success: false, message: '请求超时，请稍后重试（可缩短思路或换用更快的模型）' };
      }
      return { success: false, message: `AI 请求失败: ${error.message}` };
    }
  },

  // 发送到百度文心一言
  async sendToBaidu(message, systemPrompt, apiKey, apiUrl, model, isValidation) {
    const fetchTimeout = isValidation ? 12000 : 45000;
    const totalTimeout = fetchTimeout + 8000;  // 百度需要额外获取token，多给缓冲
    const operation = async () => {
      const signal = AbortSignal.timeout(fetchTimeout);

      // 获取 access_token
      const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=`;
      const tokenRes = await fetch(tokenUrl, { signal });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        throw new Error('百度 access_token 获取失败，请检查 API Key');
      }

      const chatUrl = `${apiUrl}/${model}?access_token=${tokenData.access_token}`;
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ]
        }),
        signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      if (!data.result) {
        throw new Error('百度返回为空，请检查模型配置');
      }
      return { success: true, message: data.result };
    };

    try {
      return await this._withTimeout(operation(), totalTimeout);
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return { success: false, message: '请求超时，请稍后重试（可缩短思路或换用更快的模型）' };
      }
      return { success: false, message: `AI 请求失败: ${error.message}` };
    }
  },

  // 发送消息到AI（主入口）
  async sendMessage(message, context = '') {
    const settings = Storage.getSettings();

    if (!settings.apiKey) {
      return { success: false, message: '请先在设置中配置 AI API 密钥' };
    }
    if (!settings.model) {
      return { success: false, message: '请先在设置中选择 AI 模型' };
    }

    const provider = settings.provider || 'openai';
    return await this.sendToProvider(provider, message, context, settings.apiKey, settings.model, false);
  },

  // 分析用户思路
  async analyzeThinking(userThinking, problemContext) {
    const prompt = `学生正在解决一道OI题目，请分析学生的思路：

题目背景：
${problemContext}

学生的思路：
${userThinking}

请：
1. 分析学生思路的正确性
2. 指出可能的问题或遗漏
3. 给出改进建议
4. 如果思路可行，详细解释如何完善
5. 如果思路不可行，温和地引导到正确方向

请用生动、鼓励的语言回答，适合初中学生理解。`;
    return await this.sendMessage(prompt, problemContext);
  },

  // 帮助debug
  async helpDebug(code, errorMsg) {
    const prompt = `学生在写代码时遇到了问题，请帮助debug：

代码：
${code}

错误信息（如果有）：
${errorMsg || '无'}

请：
1. 找出代码中的问题
2. 解释为什么会出现这个问题
3. 给出修正后的代码
4. 用简单易懂的语言解释

请用生动、耐心的语言回答。`;
    return await this.sendMessage(prompt);
  },

  // 解释算法
  async explainAlgorithm(algorithmName) {
    const prompt = `请详细解释一下${algorithmName}这个算法，包括：
1. 它解决什么问题
2. 核心思想是什么
3. 如何实现
4. 时间复杂度是多少

请用生动有趣的例子，适合初中学生理解。`;
    return await this.sendMessage(prompt);
  }
};


// AI助手面板交互
const AIAssistant = {
  init() {
    this.bindEvents();
    this.restoreAiName();
  },

  // 恢复AI名称
  restoreAiName() {
    const settings = Storage.getSettings();
    if (settings.aiName) {
      this.updateTitle(settings.aiName);
    }
  },

  // 更新面板标题
  updateTitle(aiName) {
    const panelHeader = document.querySelector('.ai-panel-header h3');
    if (panelHeader) {
      const svg = panelHeader.querySelector('svg');
      if (svg) {
        panelHeader.innerHTML = svg.outerHTML + ' ' + (aiName || 'AI 学习助手');
      }
    }
    const welcomeEl = document.querySelector('.ai-welcome p:first-child');
    if (welcomeEl) {
      welcomeEl.textContent = '你好！我是' + (aiName || '你的 OI 学习助手');
    }
  },

  bindEvents() {
    const fab = document.getElementById('aiFab');
    const closeBtn = document.getElementById('aiClose');
    const sendBtn = document.getElementById('aiSend');
    const input = document.getElementById('aiInput');
    if (fab) fab.addEventListener('click', () => this.toggle());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (sendBtn) sendBtn.addEventListener('click', () => this.send());
    if (input) input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    });
  },

  toggle() {
    const panel = document.getElementById('aiPanel');
    if (panel) panel.classList.toggle('active');
  },

  close() {
    const panel = document.getElementById('aiPanel');
    if (panel) panel.classList.remove('active');
  },

  async send() {
    const input = document.getElementById('aiInput');
    const messages = document.getElementById('aiMessages');
    if (!input || !messages) return;
    const text = input.value.trim();
    if (!text) return;

    // 添加用户消息
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = '<div class="chat-bubble">' + this.escapeHtml(text) + '</div>';
    messages.appendChild(userMsg);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // 添加加载指示器
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'chat-message assistant';
    loadingMsg.innerHTML = '<div class="chat-bubble"><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>';
    messages.appendChild(loadingMsg);
    messages.scrollTop = messages.scrollHeight;

    const result = await AI.sendMessage(text);
    loadingMsg.remove();

    // 添加AI回复
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-message assistant';
    if (result.success) {
      const formatted = this.formatMarkdown(result.message);
      aiMsg.innerHTML = '<div class="chat-bubble">' + formatted + '</div>';
    } else {
      aiMsg.innerHTML = '<div class="chat-bubble" style="color:var(--error-color)">' + result.message + '</div>';
    }
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // 格式化Markdown（兼容异步版本marked）
  formatMarkdown(text) {
    if (!text) return '';
    try {
      const result = marked.parse(text);
      if (result && typeof result.then === 'function') {
        // marked >=12 异步版本，用简单替换兜底
        return text
          .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]*)`/g, '<code>$1</code>');
      }
      return String(result);
    } catch(e) {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    }
  }
};
