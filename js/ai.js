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

  // 构建 OpenAI 兼容请求体（处理 DeepSeek V4 思考模式）
  _buildOpenAIBody(model, messages, provider, isValidation) {
    const body = {
      model: model,
      messages: messages,
      max_tokens: isValidation ? 50 : 2000
    };
    if (provider === 'deepseek') {
      // DeepSeek V4 默认开启思考模式，思维链会占用 max_tokens 导致 content 为空，
      // 这里显式关闭思考，让最终答案直接输出到 content 字段。
      body.thinking = { type: 'disabled' };
    } else {
      body.temperature = 0.7;
    }
    return body;
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
        body: JSON.stringify(this._buildOpenAIBody(model, [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ], provider, isValidation)),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      let content = msg && msg.content;
      // DeepSeek V4 兜底：思考模式下 content 可能为空，答案在 reasoning_content
      if (!content && msg && msg.reasoning_content) {
        content = msg.reasoning_content;
      }
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

  // 分析用户思路（苏格拉底式引导 - 不直接给答案）
  async analyzeThinking(userThinking, problemContext) {
    const prompt = `你是一位OI奥赛金牌教练，正在辅导一位初二学生。学生正在解决一道OI题目。你的任务不是直接告诉学生答案，而是像苏格拉底一样，通过提问一步步引导学生自己发现正解。

## 题目背景
${problemContext}

## 学生的思路
${userThinking}

## 你的辅导原则（非常重要！务必遵守！）
1. **永远不要直接给出完整解法或代码** —— 你的目标是让学生自己想出来
2. **先肯定学生的正确部分** —— 指出思路中哪些地方是对的，让学生建立信心
3. **精准定位卡点** —— 学生的思路中哪里不完整/有漏洞/方向偏了？聚焦那个点
4. **每次只引导一步** —— 提出1-2个启发式问题，让学生思考下一步
5. **用比喻降低门槛** —— 用生活中的例子类比抽象概念
6. **以一个问题结束** —— 每次回复最后必须抛出一个具体的、可回答的问题，引导学生继续思考

## 不同情况的处理策略
- **学生思路方向正确但不完整**：肯定思路 + 指出缺失的环节 + 提问引导补全
- **学生思路方向错误**：不要直接否定！先让学生解释为什么这样想，再通过反例引导他自己发现矛盾
- **学生完全不知道怎么做（空白/混乱）**：从最简单的特例入手，引导学生观察规律
- **学生思路已经接近正解**：肯定进步 + 提出一个更深入的边界情况让他考虑

## 回复格式
- 第1段：热情肯定学生的努力和思路中有价值的点
- 第2段：一次只指出一个最关键的问题/缺口（不要罗列多个）
- 第3段：用一个**具体的、可操作的引导性问题**结束，让学生思考后可以回复你

请用热情、鼓励的口吻回答，像一位耐心的大哥哥/大姐姐教练。回复长度控制在200-400字以内，不要长篇大论。`;
    return await this.sendMessage(prompt, problemContext);
  },

  // 多轮对话（带对话历史）
  async sendConversation(message, context, history) {
    const settings = Storage.getSettings();
    if (!settings.apiKey) {
      return { success: false, message: '请先在设置中填入 API Key' };
    }
    if (settings.provider === 'custom' && settings.customApiUrl) {
      settings._customUrl = settings.customApiUrl;
    }

    const provider = settings.provider || 'openai';
    const systemPrompt = this.getSystemPrompt(context);
    const apiUrl = this.getProviderUrl(provider);

    // 构建消息数组：system + history + current message
    const messages = [{ role: 'system', content: systemPrompt }];
    if (history && history.length > 0) {
      for (const h of history) {
        messages.push({ role: h.role, content: h.content });
      }
    }
    messages.push({ role: 'user', content: message });

    // 发送多轮对话（支持OpenAI兼容格式）
    return await this._sendMessages(messages, apiUrl, settings.apiKey, settings.model, provider, false);
  },

  // 发送消息数组（多轮对话底层实现）
  async _sendMessages(messages, apiUrl, apiKey, model, provider, isValidation) {
    const fetchTimeout = isValidation ? 12000 : 45000;
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(this._buildOpenAIBody(model, messages, provider, isValidation)),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      let content = msg && msg.content;
      // DeepSeek V4 兜底：思考模式下 content 可能为空，答案在 reasoning_content
      if (!content && msg && msg.reasoning_content) {
        content = msg.reasoning_content;
      }
      if (!content) {
        throw new Error('AI 返回了空内容，请检查模型是否可用');
      }
      return { success: true, message: content };
    };

    try {
      return await this._withTimeout(operation(), totalTimeout);
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return { success: false, message: '请求超时，请稍后重试' };
      }
      return { success: false, message: `AI 请求失败: ${error.message}` };
    }
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
