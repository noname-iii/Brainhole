// AI 助手功能
const AI = {
  // 发送消息到AI
  async sendMessage(message, context = '') {
    const settings = Storage.getSettings();
    
    if (!settings.apiKey || !settings.apiUrl) {
      return {
        success: false,
        message: '请先在设置中配置 AI API 地址和密钥'
      };
    }

    try {
      const response = await fetch(settings.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
          model: settings.model || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `你是一个友好的OI（信息学竞赛）学习助手，专门帮助初中学生学习算法和编程。请用生动、有趣、易懂的语言回答问题。如果涉及代码，请使用C++并添加详细注释。当前学习的内容：${context}`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.choices[0].message.content
      };
    } catch (error) {
      return {
        success: false,
        message: `AI 请求失败: ${error.message}`
      };
    }
  },

  // 分析用户思路
  async analyzeThinking(userThinking, problemContext) {
    const prompt = `
学生正在解决一道OI题目，请分析学生的思路：

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

请用生动、鼓励的语言回答，适合初中学生理解。
`;

    return await this.sendMessage(prompt, problemContext);
  },

  // 帮助debug
  async helpDebug(code, errorMsg) {
    const prompt = `
学生在写代码时遇到了问题，请帮助debug：

代码：
${code}

错误信息（如果有）：
${errorMsg || '无'}

请：
1. 找出代码中的问题
2. 解释为什么会出现这个问题
3. 给出修正后的代码
4. 用简单易懂的语言解释

请用生动、耐心的语言回答。
`;

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


// AI助手面板交互（供app.js调用）
const AIAssistant = {
  init() {
    console.log('AI助手初始化完成');
    this.bindEvents();
  },
  bindEvents() {
    const fab = document.getElementById('aiFab');
    const panel = document.getElementById('aiPanel');
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
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = '<div class="chat-bubble">' + text + '</div>';
    messages.appendChild(userMsg);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    const result = await AI.sendMessage(text);
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-message assistant';
    const bubbleContent = result.success ? marked.parse(result.message) : result.message;
    aiMsg.innerHTML = '<div class="chat-bubble">' + bubbleContent + '</div>';
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
  }
};
