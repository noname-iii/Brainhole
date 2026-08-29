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
    minimax: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
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

**引导式回答原则（非常重要！务必遵守！）**
1. **不要直接给出最终答案** —— 当用户提出问题时，先弄清用户目前已经理解到哪里、卡在什么地方，然后一步步引导他自己得到结果
2. **每次只推进一小步** —— 每次回复只讲解/引导一个关键点，不要一次性把整个解题过程、完整结论或完整代码全部倒出来
3. **以引导性问题结尾** —— 每次回复的最后抛出一个具体的、学生可以直接回答的问题，让他思考后继续对话，再进行下一步引导
4. **先肯定再引导** —— 发现用户思考中有价值的部分先肯定，再针对卡点提问
5. **可以用提示和类比** —— 用生活中的例子类比抽象概念；可以给方向性提示（如"考虑一下复杂度""试试小数据"），但不直接揭晓答案
6. **用户明确要求时才给完整答案** —— 仅当用户明确说"直接告诉我答案/完整代码"，或经过多轮引导后用户仍无法推进时，才给出完整解答；给答案时要附上一步步的推导过程

**例外场景（不受上述引导原则限制）**
- 题目翻译任务：只输出翻译结果
- 用户明确要求完整代码修正的 Debug 任务：按用户要求执行
- 概念性科普提问（如"什么是时间复杂度"）：可直接讲解概念，但讲解后可以引导学生把概念用到他当前的问题上

**代码规范**
- 如果涉及代码，使用 C++ 并添加详细注释
- 解释代码时要逐行或逐块说明，确保学生能理解
- 引导阶段尽量只给伪代码或代码片段提示，完整代码留到用户自己尝试之后

**当前学习的内容**
${context || '学生正在学习 OI 相关知识'}`;
  },

  // 获取服务商 API URL
  getProviderUrl(provider) {
    return this.providerUrls[provider] || this.providerUrls.openai;
  },

  // 发送到指定提供商（支持深度思考，失败自动回退普通模式）
  async sendToProvider(provider, message, context, apiKey, model, isValidation = false, deepThinking = false) {
    const systemPrompt = this.getSystemPrompt(context);
    const apiUrl = this.getProviderUrl(provider);

    const dispatch = (dt) => {
      switch (provider) {
        case 'anthropic':
          return this.sendToAnthropic(message, systemPrompt, apiKey, apiUrl, model, isValidation, dt);
        case 'google':
          return this.sendToGoogle(message, systemPrompt, apiKey, apiUrl, model, isValidation, dt);
        case 'baidu':
          return this.sendToBaidu(message, systemPrompt, apiKey, apiUrl, model, isValidation, dt);
        default:
          return this.sendToOpenAICompatible(message, systemPrompt, apiKey, apiUrl, model, provider, isValidation, dt);
      }
    };

    let result = await dispatch(deepThinking);
    // 厂商/模型不支持思考参数时会报错，自动降级为普通模式重试一次（认证/配额错误除外）
    if (!result.success && deepThinking && !isValidation && this._shouldFallbackToPlain(result)) {
      console.warn('深度思考请求失败，自动回退为普通模式重试:', result.message);
      result = await dispatch(false);
    }
    return result;
  },

  // 判断是否应回退为普通模式重试（认证/配额类错误与思考参数无关，无需重试）
  _shouldFallbackToPlain(result) {
    const m = String((result && result.message) || '');
    return !/401|403|429|api\s*key|密钥|quota|余额|欠费/i.test(m);
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

  // 构建 OpenAI 兼容请求体（支持深度思考模式）
  _buildOpenAIBody(model, messages, provider, isValidation, deepThinking = false) {
    // 开启思考后思维链会占用输出额度，需大幅提高 max_tokens，
    // 否则推理耗尽额度会导致 content 为空或回答被截断。
    const body = {
      model: model,
      messages: messages,
      max_tokens: isValidation ? 50 : (deepThinking ? 8192 : 2000)
    };
    if (!deepThinking || isValidation) {
      if (provider === 'deepseek') {
        // deepseek-chat (V3.1+) 开启思考后思维链会占用 max_tokens 导致 content 为空，
        // 普通模式显式关闭思考，让最终答案直接输出到 content 字段；
        // deepseek-reasoner (R1) 始终输出推理、不接受 thinking 参数，故跳过。
        if (!/reasoner|\br1\b/i.test(model)) {
          body.thinking = { type: 'disabled' };
        }
      } else {
        // o 系列推理模型 (o1/o3/o4-mini) 不支持 temperature 参数，跳过避免报错
        if (!/^o\d/i.test(model)) {
          body.temperature = 0.7;
        }
      }
      return body;
    }
    // 深度思考模式：仅为支持思考参数的厂商/模型携带对应参数，
    // 其余厂商 (openai/moonshot/yi/minimax/custom) 直接以默认配置请求，
    // o3/o4-mini/MiniMax-M1 等推理模型本身就会输出推理，无需额外参数。
    // 若某模型不支持对应参数导致报错，上层会自动回退为普通模式重试。
    switch (provider) {
      case 'qwen':
      case 'siliconflow':
        body.enable_thinking = true;
        break;
      case 'deepseek':
        // deepseek-chat 需显式开启思考；reasoner 已自带推理，不传该参数
        if (!/reasoner|\br1\b/i.test(model)) {
          body.thinking = { type: 'enabled' };
        }
        break;
      case 'zhipu':
        body.thinking = { type: 'enabled' };
        break;
    }
    return body;
  },

  // 发送到 OpenAI 兼容接口
  async sendToOpenAICompatible(message, systemPrompt, apiKey, apiUrl, model, provider, isValidation, deepThinking = false) {
    // 深度思考耗时明显更长，超时时间相应放宽
    const fetchTimeout = isValidation ? 12000 : (deepThinking ? 120000 : 45000);
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
        ], provider, isValidation, deepThinking)),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      let content = msg && msg.content;
      const reasoning = (msg && msg.reasoning_content) || '';
      // 思考模式兜底：content 可能为空，答案在 reasoning_content
      if (!content && reasoning) {
        content = reasoning;
      }
      if (!content) {
        console.warn('API 返回空内容，完整响应:', JSON.stringify(data));
        throw new Error('AI 返回了空内容，请检查模型是否可用或API Key是否有效');
      }
      return { success: true, message: content, reasoning };
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
  async sendToAnthropic(message, systemPrompt, apiKey, apiUrl, model, isValidation, deepThinking = false) {
    const fetchTimeout = isValidation ? 12000 : (deepThinking ? 180000 : 45000);
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const body = {
        model: model,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }],
        max_tokens: isValidation ? 50 : (deepThinking ? 8000 : 2000)
      };
      if (deepThinking && !isValidation) {
        // 扩展思考：budget_tokens 必须小于 max_tokens，且不可与 temperature 同用
        body.thinking = { type: 'enabled', budget_tokens: 4000 };
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify(body),
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
  async sendToGoogle(message, systemPrompt, apiKey, apiUrl, model, isValidation, deepThinking = false) {
    const fetchTimeout = isValidation ? 12000 : (deepThinking ? 180000 : 45000);
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const url = `${apiUrl}/${model}:generateContent?key=${apiKey}`;
      const generationConfig = {
        temperature: 0.7,
        maxOutputTokens: isValidation ? 50 : 2000
      };
      if (deepThinking && !isValidation) {
        generationConfig.maxOutputTokens = 8000;
        // thinkingBudget: -1 表示动态思考；includeThoughts 返回思考摘要
        generationConfig.thinkingConfig = { thinkingBudget: -1, includeThoughts: true };
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\n用户问题：${message}` }]
          }],
          generationConfig
        }),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const parts = data.candidates && data.candidates[0] && data.candidates[0].content &&
                    data.candidates[0].content.parts;
      let content = '';
      let reasoning = '';
      if (parts) {
        for (const p of parts) {
          if (!p || !p.text) continue;
          if (p.thought) reasoning += p.text;   // 思考摘要片段
          else content += p.text;               // 正式回答片段
        }
      }
      if (!content && reasoning) content = reasoning;
      if (!content) {
        console.warn('Gemini 返回空内容:', JSON.stringify(data));
        throw new Error('Gemini 返回了空内容，请检查模型配置');
      }
      return { success: true, message: content, reasoning };
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
  async sendToBaidu(message, systemPrompt, apiKey, apiUrl, model, isValidation, deepThinking = false) {
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
          ],
          ...(deepThinking && !isValidation ? { enable_thinking: true } : {})
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
    // 深度思考默认开启（历史设置无此字段时视为开启）
    const deepThinking = settings.deepThinking !== false;
    return await this.sendToProvider(provider, message, context, settings.apiKey, settings.model, false, deepThinking);
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

    // 发送多轮对话（支持OpenAI兼容格式），深度思考默认开启
    const deepThinking = settings.deepThinking !== false;
    return await this._sendMessages(messages, apiUrl, settings.apiKey, settings.model, provider, false, deepThinking);
  },

  // 发送消息数组（多轮对话底层实现，含深度思考失败自动回退）
  async _sendMessages(messages, apiUrl, apiKey, model, provider, isValidation, deepThinking = false) {
    let result = await this._postChatCompletions(messages, apiUrl, apiKey, model, provider, isValidation, deepThinking);
    if (!result.success && deepThinking && !isValidation && this._shouldFallbackToPlain(result)) {
      console.warn('深度思考请求失败，自动回退为普通模式重试:', result.message);
      result = await this._postChatCompletions(messages, apiUrl, apiKey, model, provider, isValidation, false);
    }
    return result;
  },

  // 调用 Chat Completions 接口（多轮对话实际请求）
  async _postChatCompletions(messages, apiUrl, apiKey, model, provider, isValidation, deepThinking = false) {
    // 深度思考耗时明显更长，超时时间相应放宽
    const fetchTimeout = isValidation ? 12000 : (deepThinking ? 120000 : 45000);
    const totalTimeout = fetchTimeout + 5000;
    const operation = async () => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(this._buildOpenAIBody(model, messages, provider, isValidation, deepThinking)),
        signal: AbortSignal.timeout(fetchTimeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      let content = msg && msg.content;
      const reasoning = (msg && msg.reasoning_content) || '';
      // 思考模式兜底：content 可能为空，答案在 reasoning_content
      if (!content && reasoning) {
        content = reasoning;
      }
      if (!content) {
        throw new Error('AI 返回了空内容，请检查模型是否可用');
      }
      return { success: true, message: content, reasoning };
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

  // 检测文本是否以英文为主（拉丁字母显著多于中文，用于识别英文题面）
  isEnglishDominant(text) {
    if (!text) return false;
    const latin = (text.match(/[A-Za-z]/g) || []).length;
    const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    // 至少有一定篇幅的英文，且明显多于中文才判定为英文题面
    return latin >= 200 && latin > cjk * 2;
  },

  // 将英文题面翻译为中文（保留 Markdown 与 LaTeX 结构）
  async translateToChinese(text) {
    const settings = Storage.getSettings();
    if (!settings.apiKey) {
      return { success: false, message: '请先在设置中配置 AI API 密钥后再翻译' };
    }
    if (!settings.model) {
      return { success: false, message: '请先在设置中选择 AI 模型后再翻译' };
    }
    const prompt = `请将下面的 OI 竞赛题目题面完整翻译成简体中文。要求：
1. 严格保留所有 Markdown 格式（标题、加粗、列表、图片、链接等）和 LaTeX 公式（$...$、$$...$$）原样不变
2. 题目中的变量名、函数名、代码片段保持原样不翻译
3. 使用"题目描述""输入格式""输出格式""说明/提示"等中文标准小节表述
4. 只输出翻译结果，不要添加任何解释或前后缀

原文：
${text}`;
    // 翻译任务不需要深度思考，直接用普通模式调用以保证速度
    const provider = settings.provider || 'openai';
    return await this.sendToProvider(provider, prompt, '', settings.apiKey, settings.model, false, false);
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

    // 添加加载指示器（深度思考模式给出更明确的等待提示）
    const deepThinking = Storage.getSettings().deepThinking !== false;
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'chat-message assistant';
    loadingMsg.innerHTML = '<div class="chat-bubble"><div class="thinking-status">' +
      (deepThinking ? '<span class="thinking-emoji">🤔</span>正在深度思考，请稍候…' : '正在输入…') +
      '</div><div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>';
    messages.appendChild(loadingMsg);
    messages.scrollTop = messages.scrollHeight;

    const result = await AI.sendMessage(text);
    loadingMsg.remove();

    // 添加AI回复
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-message assistant';
    if (result.success) {
      let inner = '';
      // 展示思维链（若服务商返回 reasoning 内容）
      if (result.reasoning) {
        inner += '<details class="reasoning-block"><summary>🤔 思考过程（点击展开）</summary>' +
          '<div class="reasoning-content">' + this.escapeHtml(result.reasoning) + '</div></details>';
      }
      inner += '<div class="chat-bubble">' + this.formatMarkdown(result.message) + '</div>';
      aiMsg.innerHTML = inner;
    } else {
      aiMsg.innerHTML = '<div class="chat-bubble" style="color:var(--error-color)">' + result.message + '</div>';
    }
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
    // 渲染代码高亮
    this.highlightCode(aiMsg);
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
      if (typeof marked === 'undefined' || !marked.parse) return this.simpleMarkdown(text);
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
  },

  // 简单Markdown解析（无 marked 时的兜底，支持代码块/标题/列表等）
  simpleMarkdown(text) {
    if (!text) return '';
    // 用字符码构造转义串，避免源码中出现实体字面量
    const A = String.fromCharCode(38);
    const esc = (s) => s.replace(/[&<>]/g, (ch) =>
      ch === '&' ? A + 'amp;' : ch === '<' ? A + 'lt;' : A + 'gt;');
    // 先抽出围栏代码块，避免内部被行内规则误处理
    const codeBlocks = [];
    let src = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
      codeBlocks.push('<pre><code class="language-' + (lang || 'cpp') + '">' + esc(code.replace(/\n$/, '')) + '</code></pre>');
      return '\u0000CODE' + (codeBlocks.length - 1) + '\u0000';
    });
    src = esc(src);
    src = src
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(new RegExp('^' + A + 'gt; (.*)$', 'gm'), '<blockquote>$1</blockquote>')
      .replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*?<\/li>)(\n|$)/g, (m) => '<ul>' + m.trim() + '</ul>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
    // 回填代码块
    src = src.replace(/\u0000CODE(\d+)\u0000/g, (m, i) => codeBlocks[+i] || '');
    return src;
  },

  // 对容器内的代码块做高亮（hljs 可用时）
  highlightCode(container) {
    if (container && typeof hljs !== 'undefined') {
      try {
        container.querySelectorAll('pre code:not(.hljs)').forEach((el) => hljs.highlightElement(el));
      } catch(e) { /* 高亮失败不影响内容展示 */ }
    }
  }
};
