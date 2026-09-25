// 课程视图
const LessonView = {
  currentModule: null,
  currentChapter: null,
  conversationHistory: null, // 多轮对话历史

  // 初始化（供App调用）
  init() {
    // 绑定返回按钮
    const btnBack = document.getElementById('btnBack');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        this.back();
      });
    }
    console.log('LessonView 初始化完成');
  },

  // 打开课程
  open(module, chapter) {
    this.currentModule = module;
    this.currentChapter = chapter;

    document.getElementById('lessonTitle').textContent = `${chapter.title} - ${module.title}`;

    const btnBack = document.getElementById('btnBack');
    if (btnBack) btnBack.textContent = '← 返回「' + chapter.title + '」';

    if (module.type === 'intro') {
      this.renderIntro(module);
    } else if (module.type === 'problem') {
      this.renderProblem(module);
    } else if (module.type === 'quiz') {
      this.renderQuiz(module);
    }

    this.showView('lessonView');
  },

  // 渲染介绍内容
  renderIntro(module) {
    const content = document.getElementById('lessonContent');
    const lessonData = LESSON_CONTENT[module.id];

    if (!lessonData) {
      content.innerHTML = `
        <div class="lesson-card">
          <h3>${module.title}</h3>
          <p>内容正在准备中，请稍后再来...</p>
        </div>
      `;
      return;
    }

    const codeCard = lessonData.code ? `
      <div class="lesson-card">
        <h3>D. 代码实现</h3>
        ${this.createCodeBlock(lessonData.code, 'cpp')}
      </div>` : '';

    content.innerHTML = `
      <div class="lesson-card">
        <h3>A. 这个知识点解决什么问题</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.problemDesc)}</div>
      </div>

      <div class="lesson-card">
        <h3>B. 这个知识点是怎么想的</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.idea)}</div>
      </div>

      <div class="lesson-card">
        <h3>C. 推导与详解</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.derivation)}</div>
      </div>

      ${codeCard}

      <div class="lesson-card">
        <h3>完成学习</h3>
        <p>恭喜你完成了这个知识点的学习！接下来让我们通过真题演练来巩固吧！</p>
        <button class="btn-primary" onclick="LessonView.completeIntro()">完成学习，开始做题 →</button>
      </div>
    `;

    // 高亮代码 + 渲染 LaTeX 公式（初赛讲解含大量 $...$ 数学式）
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
      this.renderLatex(content);
    }, 100);
  },

  // 渲染题目
  async renderProblem(module) {
    const content = document.getElementById('lessonContent');
    content.innerHTML = `
      <div class="lesson-card">
        <div class="loading"></div>
        <p>正在加载题目...</p>
      </div>
    `;

    const problem = await Luogu.getProblem(module.luoguId);
    const diffLabel = this.getDifficultyLabel(problem.difficulty);
    
    const problemCardId = 'problemCard_' + module.id;

    // 直接显示本地缓存数据，不尝试网络加载
    content.innerHTML = `
      <div class="problem-card" id="${problemCardId}">
        <div class="problem-header">
          <div class="problem-title">${problem.title}</div>
          <div class="problem-meta">
            <span class="problem-difficulty difficulty-${problem.difficulty}" title="难度等级">${diffLabel}</span>
            <span class="problem-id">${problem.id}</span>
          </div>
        </div>

        <div class="problem-section">
          <h4>题目描述</h4>
          <div class="lesson-content-text">
            <p>请前往洛谷查看题目描述：</p>
            <a href="https://www.luogu.com.cn/problem/${module.luoguId}" target="_blank" class="btn-primary" style="display:inline-block;margin-top:8px;">
              在洛谷查看原题
            </a>
          </div>
        </div>

        ${problem.samples && problem.samples.length > 0 ? `
        <div class="problem-section">
          <h4>样例</h4>
          ${problem.samples.map((sample, i) => `
            <div class="sample-block">
              <div class="sample-label">样例输入 ${i + 1}</div>
              <div class="sample-content">${sample.input}</div>
            </div>
            <div class="sample-block">
              <div class="sample-label">样例输出 ${i + 1}</div>
              <div class="sample-content">${sample.output}</div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${problem.constraints && problem.constraints !== '详见洛谷题目页面' ? `
        <div class="problem-section">
          <h4>数据范围与提示</h4>
          <div class="lesson-content-text">${this.formatMarkdown(problem.constraints)}</div>
        </div>
        ` : ''}

        <div style="margin-top:12px;text-align:right;">
          <a href="https://www.luogu.com.cn/problem/${module.luoguId}" target="_blank" class="btn-link" style="color:var(--primary-color);font-size:13px;">
            在洛谷查看原题
          </a>
        </div>
      </div>

      <div class="thinking-area">
        <h4>你的思路</h4>
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          在写代码之前，先写下你的想法吧！可以是完整的思路，也可以是部分分的策略。
        </p>
        <textarea class="thinking-textarea" id="thinkingInput" placeholder="写下你的思路..."></textarea>
        <div class="thinking-actions">
          <button class="btn-primary" onclick="LessonView.analyzeThinking()">分析思路</button>
          <button class="btn-secondary" onclick="Luogu.submitCode('${problem.id}', '')">去洛谷提交</button>
        </div>
      </div>

      <div id="aiResponseArea"></div>

      <div class="lesson-card">
        <h3>完成关卡</h3>
        <p>如果你在洛谷上成功AC了这道题，点击下方按钮完成关卡！</p>
        <button class="btn-ac" id="btnAC" onclick="LessonView.markAC()">
          <span>我AC了！</span>
        </button>
      </div>
    `;

    // 渲染 LaTeX 数学公式
    this.renderLatex(content);

    // 英文题面自动翻译为中文（结果缓存，翻译一次即可）
    this.autoTranslateProblem(problem, problemCardId);

    // 恢复用户思路草稿
    this.restoreThinkingDraft(module.id);

    // 恢复AI分析回复
    this.restoreAiResponse(module.id);

    // 渲染 LaTeX 数学公式
    this.renderLatex(content);
  },

  // 获取难度标签（与洛谷官方一致的颜色标签系统）
  // 洛谷难度：1=入门(灰), 2=普及-(红), 3=普及(橙), 4=普及+(黄), 5=提高-(绿), 6=提高(蓝), 7=省选/NOI(紫)
  getDifficultyLabel(diff) {
    const labels = {
      0: '未评定',
      1: '入门',
      2: '普及-',
      3: '普及',
      4: '普及+',
      5: '提高-',
      6: '提高',
      7: '省选'
    };
    return labels[diff] || '未知';
  },

  // 重试加载题目
  async retryProblem(moduleId, problemId) {
    const card = document.querySelector(`#${CSS.escape('problemCard_' + moduleId)} .fetch-notice`);
    if (card) {
      card.innerHTML = '<div class="loading" style="width:20px;height:20px;display:inline-block;margin-right:8px;"></div><p>正在加载...</p>';
    }
    const result = await Luogu.retryLoad(problemId);
    if (result.success && result.problem && result.problem.description) {
      this.updateProblemCard('problemCard_' + moduleId, result.problem);
    } else {
      if (card) {
        card.innerHTML = `
          <p style="color:var(--error-color);">加载失败，请稍后重试或直接前往洛谷查看</p>
          <button class="btn-secondary btn-retry" onclick="LessonView.retryProblem('${moduleId}', '${problemId}')">重新加载</button>
          <a href="https://www.luogu.com.cn/problem/${problemId}" target="_blank" class="btn-link" style="margin-left:8px;color:var(--primary-color);">去洛谷查看</a>
        `;
      }
    }
  },

  // 更新题目卡片内容（后台获取成功后刷新）
  updateProblemCard(cardId, problem) {
    const card = document.getElementById(cardId);
    if (!card) return;

    // 更新难度
    const diffEl = card.querySelector('.problem-difficulty');
    if (diffEl) {
      diffEl.textContent = this.getDifficultyLabel(problem.difficulty);
      diffEl.className = 'problem-difficulty difficulty-' + problem.difficulty;
    }

    // 更新数据范围
    const constraintsSection = card.querySelector('.problem-section:last-child p');
    if (constraintsSection && problem.constraints && problem.constraints !== '详见洛谷题目页面') {
      constraintsSection.textContent = problem.constraints;
    }
  },

  // 检测并自动翻译英文题面（结果缓存到本地）
  async autoTranslateProblem(problem, cardId) {
    if (!AI.isEnglishDominant(problem.description || '')) return;
    const card = document.getElementById(cardId);
    if (!card) return;
    const descEl = card.querySelector('.problem-section .lesson-content-text');
    if (!descEl) return;

    const cacheKey = 'oi_translation_' + problem.id;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        this.applyTranslation(cardId, JSON.parse(cached));
        return;
      } catch(e) { localStorage.removeItem(cacheKey); }
    }

    descEl.innerHTML = '<div class="translating-notice"><span class="loading" style="width:16px;height:16px;display:inline-block;margin-right:8px;vertical-align:middle;"></span>检测到英文题面，正在翻译成中文…</div>';

    // 描述与数据范围合并为一次翻译请求，用分隔符区分
    const SEP = '\n\n=====数据范围与提示=====\n';
    const combined = problem.description +
      (problem.constraints && problem.constraints !== '详见洛谷题目页面' ? SEP + problem.constraints : '');
    const result = await AI.translateToChinese(combined);

    // 翻译期间用户可能已离开该页面
    if (!document.getElementById(cardId)) return;

    if (!result.success) {
      descEl.innerHTML = '<div class="translating-notice">翻译失败：' + this.escapeHtml(result.message) +
        '。可稍后重试，或 <a href="https://www.luogu.com.cn/problem/' + problem.id +
        '" target="_blank" style="color:var(--primary-color);">在洛谷查看原题</a></div>';
      return;
    }

    let zhDesc = result.message.trim();
    let zhConstraints = '';
    const idx = zhDesc.indexOf('=====数据范围与提示=====');
    if (idx >= 0) {
      zhConstraints = zhDesc.substring(idx + '=====数据范围与提示====='.length).trim();
      zhDesc = zhDesc.substring(0, idx).trim();
    }
    const parts = { description: zhDesc, constraints: zhConstraints };
    try { localStorage.setItem(cacheKey, JSON.stringify(parts)); } catch(e) { /* 忽略缓存写入失败 */ }
    this.applyTranslation(cardId, parts);
  },

  // 将翻译后的题面应用到题目卡片
  applyTranslation(cardId, parts) {
    const card = document.getElementById(cardId);
    if (!card || !parts) return;
    if (parts.description) {
      const descEl = card.querySelector('.problem-section .lesson-content-text');
      if (descEl) {
        descEl.outerHTML = '<div class="lesson-content-text">' + this.formatMarkdown(parts.description) + '</div>';
      }
    }
    if (parts.constraints) {
      const sections = card.querySelectorAll('.problem-section');
      const last = sections[sections.length - 1];
      if (last) {
        const cEl = last.querySelector('.lesson-content-text');
        if (cEl) {
          cEl.outerHTML = '<div class="lesson-content-text">' + this.formatMarkdown(parts.constraints) + '</div>';
        } else {
          last.insertAdjacentHTML('beforeend', '<div class="lesson-content-text">' + this.formatMarkdown(parts.constraints) + '</div>');
        }
      }
    }
    // 重新渲染数学公式
    this.renderLatex(document.getElementById('lessonContent'));
  },

  // 保存思路草稿
  saveThinkingDraft(moduleId, text) {
    if (text.trim()) {
      localStorage.setItem('oi_thinking_' + moduleId, text);
    } else {
      localStorage.removeItem('oi_thinking_' + moduleId);
    }
  },

  // 恢复思路草稿
  restoreThinkingDraft(moduleId) {
    const saved = localStorage.getItem('oi_thinking_' + moduleId);
    const textarea = document.getElementById('thinkingInput');
    if (textarea && saved) {
      textarea.value = saved;
    }
    // 绑定自动保存事件
    if (textarea) {
      // 移除旧监听器（通过克隆替换）
      const newTextarea = textarea.cloneNode(true);
      textarea.parentNode.replaceChild(newTextarea, textarea);
      newTextarea.addEventListener('input', () => {
        this.saveThinkingDraft(moduleId, newTextarea.value);
      });
    }
  },

  // 分析用户思路（苏格拉底式引导，支持多轮对话）
  async analyzeThinking() {
    const thinking = document.getElementById('thinkingInput').value.trim();
    if (!thinking) {
      this.showToast('请先写下你的思路！', 'error');
      return;
    }

    const responseArea = document.getElementById('aiResponseArea');
    responseArea.innerHTML = `
      <div class="ai-response">
        <div class="loading"></div>
        <p>AI 正在分析你的思路...</p>
      </div>
    `;

    const problem = await Luogu.getProblem(this.currentModule.luoguId);
    const context = `${this.currentChapter.title} - ${problem.title}\n${problem.description}`;

    // 初始化对话历史
    this.conversationHistory = [
      { role: 'user', content: thinking }
    ];

    const result = await AI.analyzeThinking(thinking, context);

    if (result.success) {
      // 保存AI回复到对话历史
      this.conversationHistory.push({ role: 'assistant', content: result.message });

      responseArea.innerHTML = `
        <div class="ai-response">
          <h4>AI 助手的引导</h4>
          <div class="ai-response-content">${this.formatMarkdown(result.message)}</div>
        </div>

        <div class="followup-area">
          <h4>继续思考</h4>
          <textarea class="followup-input" id="followupInput" placeholder="回答AI的问题，或者提出新的疑问..."></textarea>
          <div class="followup-actions">
            <button class="btn-primary" onclick="LessonView.askFollowup()">回复AI</button>
            <button class="btn-secondary" onclick="LessonView.requestDebug()">帮我Debug</button>
          </div>
        </div>
      `;
      this.saveAiResponse(this.currentModule.id);
    } else {
      responseArea.innerHTML = `
        <div class="ai-response">
          <h4>分析失败</h4>
          <p>${result.message}</p>
        </div>
      `;
    }
  },

  // 保存AI分析回复到localStorage
  saveAiResponse(moduleId) {
    const area = document.getElementById('aiResponseArea');
    if (area && area.innerHTML.trim()) {
      localStorage.setItem('oi_ai_response_' + moduleId, area.innerHTML);
    }
    // 也保存对话历史
    if (this.conversationHistory && this.conversationHistory.length > 0) {
      localStorage.setItem('oi_conv_history_' + moduleId, 
        JSON.stringify(this.conversationHistory));
    }
  },

  // 恢复AI分析回复
  restoreAiResponse(moduleId) {
    // 恢复对话历史
    const savedHistory = localStorage.getItem('oi_conv_history_' + moduleId);
    if (savedHistory) {
      try {
        this.conversationHistory = JSON.parse(savedHistory);
      } catch (e) {
        this.conversationHistory = null;
      }
    } else {
      this.conversationHistory = null;
    }

    const saved = localStorage.getItem('oi_ai_response_' + moduleId);
    const area = document.getElementById('aiResponseArea');
    if (area && saved) {
      area.innerHTML = saved;
      this.renderLatex(area);
    }
  },

  // 追问（多轮对话 - 传递完整对话历史）
  async askFollowup() {
    const question = document.getElementById('followupInput').value.trim();
    if (!question) {
      this.showToast('请输入你的问题！', 'error');
      return;
    }

    const responseArea = document.getElementById('aiResponseArea');
    const followupArea = responseArea.querySelector('.followup-area');

    // 显示用户的问题（保留在对话流中）
    const userMsg = document.createElement('div');
    userMsg.className = 'user-followup';
    userMsg.innerHTML = '<div class="user-followup-content">' + this.escapeHtml(question) + '</div>';

    // 加载指示器
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-response';
    loadingDiv.innerHTML = `
      <div class="loading"></div>
      <p>AI 正在思考...</p>
    `;

    // 将用户问题和加载指示器插入到输入框之前，保证输入框始终在最下方
    if (followupArea) {
      responseArea.insertBefore(userMsg, followupArea);
      responseArea.insertBefore(loadingDiv, followupArea);
    } else {
      responseArea.appendChild(userMsg);
      responseArea.appendChild(loadingDiv);
    }

    // 立即清空输入框（问题已显示在上方）
    document.getElementById('followupInput').value = '';

    const problem = await Luogu.getProblem(this.currentModule.luoguId);
    const context = `${this.currentChapter.title} - ${problem.title}\n${problem.description}`;

    // 追加用户问题到对话历史
    if (!this.conversationHistory) this.conversationHistory = [];
    this.conversationHistory.push({ role: 'user', content: question });

    // 使用多轮对话模式，传递完整历史
    const result = await AI.sendConversation(question, context, this.conversationHistory);

    if (result.success) {
      // 保存AI回复到对话历史
      this.conversationHistory.push({ role: 'assistant', content: result.message });

      loadingDiv.innerHTML = `
        <h4>AI 助手的引导</h4>
        <div class="ai-response-content">${this.formatMarkdown(result.message)}</div>
      `;
      this.saveAiResponse(this.currentModule.id);
    } else {
      loadingDiv.innerHTML = `
        <h4>回答失败</h4>
        <p>${result.message}</p>
      `;
    }
  },

  // 请求Debug - 使用自定义弹窗替代prompt()
  async requestDebug() {
    const code = await this.showInputModal('请粘贴你的代码：', true);
    if (!code) return;
    
    const errorMsg = await this.showInputModal('有错误信息吗？（可选，直接点确定可跳过）', false) || '';

    const responseArea = document.getElementById('aiResponseArea');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-response';
    loadingDiv.innerHTML = `
      <div class="loading"></div>
      <p>AI 正在帮你Debug...</p>
    `;
    responseArea.appendChild(loadingDiv);

    const result = await AI.helpDebug(code, errorMsg);

    if (result.success) {
      loadingDiv.innerHTML = `
        <h4>Debug 结果</h4>
        <div class="ai-response-content">${this.formatMarkdown(result.message)}</div>
      `;
      this.saveAiResponse(this.currentModule.id);
    } else {
      loadingDiv.innerHTML = `
        <h4>Debug 失败</h4>
        <p>${result.message}</p>
      `;
    }
  },

  // 自定义输入弹窗
  showInputModal(title, multiline) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'ac-confirm-overlay';
      overlay.innerHTML = `
        <div class="ac-confirm-dialog" style="max-width:500px;">
          <h3>${title}</h3>
          ${multiline ? '<textarea id="inputModalTextarea" style="width:100%;height:200px;border:1px solid var(--border-color);border-radius:8px;padding:12px;font-family:monospace;font-size:13px;resize:vertical;"></textarea>' : '<input id="inputModalInput" style="width:100%;padding:10px;border:1px solid var(--border-color);border-radius:8px;font-size:14px;">'}
          <div class="ac-confirm-buttons" style="margin-top:16px;">
            <button class="btn-secondary" id="inputModalCancel">取消</button>
            <button class="btn-ac-confirm" id="inputModalConfirm">确定</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      const input = document.getElementById(multiline ? 'inputModalTextarea' : 'inputModalInput');
      setTimeout(() => input.focus(), 100);
      
      document.getElementById('inputModalConfirm').onclick = () => {
        const val = input.value.trim();
        overlay.remove();
        resolve(val);
      };
      document.getElementById('inputModalCancel').onclick = () => {
        overlay.remove();
        resolve(null);
      };
      overlay.onclick = (e) => {
        if (e.target === overlay) { overlay.remove(); resolve(null); }
      };
      // Enter key support for single-line
      if (!multiline) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { document.getElementById('inputModalConfirm').click(); }
        });
      }
    });
  },

  // 标记AC
  async markAC() {
    const confirmed = await Luogu.checkAC(this.currentModule.luoguId);
    if (!confirmed) return;
    
    Storage.completeModule(this.currentModule.id);
    
    const btn = document.getElementById('btnAC');
    if (btn) {
      btn.classList.add('completed');
      btn.innerHTML = '<span>已完成！</span>';
      btn.disabled = true;
    }

    // 使用自定义toast替代alert
    this.showToast('恭喜你完成了一道题！继续加油！', 'success');
    
    setTimeout(() => { this.back(); }, 1500);
  },

  // 自定义Toast提示
  showToast(message, type) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'custom-toast ' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  },

  // 完成介绍
  completeIntro() {
    Storage.completeModule(this.currentModule.id);

    // 找到当前章节的第一道题（洛谷题目或初赛 quiz）
    const chapter = this.currentChapter;
    if (chapter && chapter.modules.length > 1) {
      const firstProblem = chapter.modules.find(m => m.type === 'problem' || m.type === 'quiz');
      if (firstProblem) {
        // 直接跳转到第一道题
        this.open(firstProblem, chapter);
        return;
      }
    }

    // 如果找不到题目，返回章节概览
    this.showChapter(chapter);
  },

  // ============ CSP 初赛 Quiz 渲染 ============

  // 渲染初赛练习（选择题/判断题/多选题）
  renderQuiz(module) {
    const content = document.getElementById('lessonContent');
    const quizzes = (window.CSP_S1_QUIZZES && window.CSP_S1_QUIZZES[module.quizId]) || [];

    if (!quizzes.length) {
      content.innerHTML = `
        <div class="lesson-card">
          <h3>真题演练</h3>
          <p>题目正在准备中，请稍后再来...</p>
        </div>`;
      return;
    }

    this._quizAnswered = new Set();
    this._quizModule = module;
    this._quizRecords = (typeof Storage !== 'undefined' && Storage.getQuizAnswers)
      ? (Storage.getQuizAnswers(module.id) || {})
      : {};

    let html = `
      <div class="lesson-card quiz-intro-card">
        <h3>📝 真题演练（共 ${quizzes.length} 题）</h3>
        <p class="quiz-tip">点击选项作答，答完立即显示对错和解析。全部答完后自动记录学习进度！</p>
        <div class="quiz-progress">
          <span id="quizProgressText">已答 0 / ${quizzes.length}</span>
        </div>
      </div>`;

    // 支持大题题干组：stemGroup 相同的子题共享一个题干（阅读程序/完善程序）。
    // 有题干的组采用左右分栏：左栏放程序/题干，右栏放题目与选项（对齐初赛真实卷面）。
    const groups = [];
    let curGroup = null;
    quizzes.forEach((q, i) => {
      const g = (q.stemGroup === undefined || q.stemGroup === null) ? null : q.stemGroup;
      const sameGroup = curGroup && g !== null && curGroup.key === g;
      if (sameGroup) {
        curGroup.items.push({ q: q, i: i });
      } else {
        curGroup = {
          key: g !== null ? g : '__q' + i,
          stem: q.stem || '',
          stemTitle: q.stemTitle || '',
          items: [{ q: q, i: i }]
        };
        groups.push(curGroup);
      }
    });

    groups.forEach(group => {
      const itemsHtml = group.items.map(it => this._renderQuizQuestion(it.q, it.i)).join('');
      if (group.stem) {
        // 阅读程序 / 完善程序：程序在左，题目与选项在右
        html += `
          <div class="quiz-split">
            <div class="quiz-split-left">
              <div class="lesson-card quiz-stem-card">
                <h3>${group.stemTitle || '📋 题目'}</h3>
                <div class="quiz-stem-body">${this.formatMarkdown(group.stem)}</div>
              </div>
            </div>
            <div class="quiz-split-right">${itemsHtml}</div>
          </div>`;
      } else {
        html += itemsHtml;
      }
    });

    html += `
      <div class="lesson-card">
        <h3>完成练习</h3>
        <p>把每道题的解析都看明白，比刷十道新题更有用！</p>
        <button class="btn-primary" onclick="LessonView.completeQuiz()">记录完成，返回章节 →</button>
      </div>`;

    content.innerHTML = html;

    // 绑定交互
    this._bindQuizEvents(quizzes);

    // 恢复历史答题记录（退出再进入仍保留）
    this._restoreQuizRecords(quizzes);

    // 渲染 LaTeX 公式与代码高亮
    const self = this;
    setTimeout(() => {
      self.renderLatex(content);
      document.querySelectorAll('pre code').forEach(block => {
        if (window.hljs) hljs.highlightElement(block);
      });
    }, 100);
  },

  // 单题 HTML
  _renderQuizQuestion(q, i) {
    const typeLabel = q.tag || (q.type === 'multi' ? '多选题' : (q.type === 'judge' ? '判断题' : '单选题'));
    const ptsHtml = q.points ? ` · ${q.points} 分` : '';
    const optsHtml = (q.options || []).map((opt, j) => {
      const label = String.fromCharCode(65 + j);
      return `<div class="quiz-option" data-opt="${label}">
        <span class="quiz-option-label">${label}</span>
        <span class="quiz-option-text">${this.formatMarkdown(opt)}</span>
      </div>`;
    }).join('');

    const submitBtn = q.type === 'multi' ? `<button class="quiz-submit-btn" style="display:none;">提交答案</button>` : '';

    return `
      <div class="quiz-card" data-qidx="${i}">
        <div class="quiz-qtype">第 ${i + 1} 题 · ${typeLabel}${ptsHtml}</div>
        <div class="quiz-q">${this.formatMarkdown(q.q)}</div>
        <div class="quiz-options">${optsHtml}</div>
        ${submitBtn}
        <div class="quiz-analysis" style="display:none;">
          <div class="quiz-verdict"></div>
          <div class="quiz-analysis-body">${this.formatMarkdown(q.analysis)}</div>
          <div class="quiz-analysis-actions">
            <button class="quiz-redo-btn" type="button">↻ 重新做本题</button>
          </div>
        </div>
      </div>`;
  },

  // 绑定 Quiz 交互事件
  _bindQuizEvents(quizzes) {
    document.querySelectorAll('.quiz-card').forEach(card => {
      this._bindQuizCard(card, quizzes);
    });
  },

  // 重做某题：用全新 HTML 替换该卡片并重新绑定
  _redoQuizQuestion(card, quizzes) {
    const idx = parseInt(card.dataset.qidx, 10);
    const q = quizzes[idx];
    if (!q) return;
    const tmp = document.createElement('div');
    tmp.innerHTML = this._renderQuizQuestion(q, idx);
    const fresh = tmp.firstElementChild;
    card.replaceWith(fresh);
    if (this._quizAnswered) this._quizAnswered.delete(idx);
    if (this._quizRecords && this._quizModule) {
      delete this._quizRecords[idx];
      if (typeof Storage !== 'undefined' && Storage.saveQuizAnswers) {
        Storage.saveQuizAnswers(this._quizModule.id, this._quizRecords);
      }
    }
    const progEl = document.getElementById('quizProgressText');
    if (progEl) progEl.textContent = `已答 ${this._quizAnswered ? this._quizAnswered.size : 0} / ${quizzes.length}`;
    this._bindQuizCard(fresh, quizzes);
    if (typeof this.renderLatex === 'function') this.renderLatex(fresh);
  },

  // 恢复历史答题记录：锁定选项、还原对错与解析
  _restoreQuizRecords(quizzes) {
    const records = this._quizRecords || {};
    const self = this;
    const toArray = function (ans) { return ans instanceof Array ? ans : [ans]; };
    Object.keys(records).forEach(function (k) {
      const idx = parseInt(k, 10);
      const rec = records[k];
      const q = quizzes[idx];
      const card = document.querySelector('.quiz-card[data-qidx="' + idx + '"]');
      if (!q || !card) return;
      const options = card.querySelectorAll('.quiz-option');
      const analysis = card.querySelector('.quiz-analysis');
      const verdict = card.querySelector('.quiz-verdict');
      if (!analysis || !verdict) return;

      const correctList = toArray(q.answer);
      options.forEach(function (o) { o.classList.add('locked'); });
      correctList.forEach(function (a) {
        const el = card.querySelector('.quiz-option[data-opt="' + a + '"]');
        if (el) el.classList.add('correct');
      });
      (rec.sel || []).forEach(function (a) {
        const el = card.querySelector('.quiz-option[data-opt="' + a + '"]');
        if (!el) return;
        if (correctList.indexOf(a) < 0) el.classList.add('wrong');
        else el.classList.add('selected');
      });
      verdict.textContent = rec.correct
        ? '✅ 回答正确！'
        : '❌ 回答错误，正确答案是 ' + (rec.answer || '') + '。';
      verdict.classList.add(rec.correct ? 'quiz-verdict-right' : 'quiz-verdict-wrong');
      analysis.style.display = 'block';
      self._quizAnswered.add(idx);
    });

    const progEl = document.getElementById('quizProgressText');
    if (progEl) progEl.textContent = '已答 ' + this._quizAnswered.size + ' / ' + quizzes.length;
  },

  // 绑定单个题卡的交互
  _bindQuizCard(card, quizzes) {
    const self = this;
    {
      const idx = parseInt(card.dataset.qidx, 10);
      const q = quizzes[idx];
      const options = card.querySelectorAll('.quiz-option');
      const analysis = card.querySelector('.quiz-analysis');
      const verdict = card.querySelector('.quiz-verdict');

      const finishQuestion = (isCorrect, correctStr, userSel) => {
        // 锁定选项
        options.forEach(o => o.classList.add('locked'));
        // 标注正确答案
        (q.answer instanceof Array ? q.answer : [q.answer]).forEach(a => {
          const el = card.querySelector(`.quiz-option[data-opt="${a}"]`);
          if (el) el.classList.add('correct');
        });
        verdict.textContent = isCorrect
          ? '✅ 回答正确！'
          : `❌ 回答错误，正确答案是 ${correctStr}。`;
        verdict.classList.add(isCorrect ? 'quiz-verdict-right' : 'quiz-verdict-wrong');
        analysis.style.display = 'block';
        self.renderLatex(analysis);

        // 持久化答题记录（退出再进入仍保留）
        if (self._quizModule) {
          self._quizRecords = self._quizRecords || {};
          self._quizRecords[idx] = {
            sel: userSel || [],
            correct: !!isCorrect,
            answer: correctStr || ''
          };
          if (typeof Storage !== 'undefined' && Storage.saveQuizAnswers) {
            Storage.saveQuizAnswers(self._quizModule.id, self._quizRecords);
          }
        }

        // 更新进度
        self._quizAnswered.add(idx);
        const total = quizzes.length;
        const progEl = document.getElementById('quizProgressText');
        if (progEl) progEl.textContent = `已答 ${self._quizAnswered.size} / ${total}`;
        if (self._quizAnswered.size === total && self._quizModule) {
          Storage.completeModule(self._quizModule.id);
          self.toast('🎉 全部完成！本章进度已记录');
        }
      };

      if (q.type === 'multi') {
        // 多选：点击切换选中，再提交
        const submitBtn = card.querySelector('.quiz-submit-btn');
        const selected = new Set();
        options.forEach(opt => {
          opt.addEventListener('click', () => {
            if (opt.classList.contains('locked')) return;
            const label = opt.dataset.opt;
            if (selected.has(label)) {
              selected.delete(label);
              opt.classList.remove('selected');
            } else {
              selected.add(label);
              opt.classList.add('selected');
            }
            submitBtn.style.display = selected.size > 0 ? 'inline-block' : 'none';
          });
        });
        submitBtn.addEventListener('click', () => {
          if (!selected.size) return;
          // 用户选中的标 wrong（若它不在正确答案里）
          options.forEach(o => {
            if (selected.has(o.dataset.opt) && !(q.answer || []).includes(o.dataset.opt)) {
              o.classList.add('wrong');
            }
          });
          const correctSet = (q.answer || []).slice().sort().join('');
          const userSet = Array.from(selected).sort().join('');
          finishQuestion(userSet === correctSet, correctSet.split('').join('、'), Array.from(selected));
        });
      } else {
        // 单选/判断
        options.forEach(opt => {
          opt.addEventListener('click', () => {
            if (opt.classList.contains('locked')) return;
            const isCorrect = opt.dataset.opt === q.answer;
            if (!isCorrect) opt.classList.add('wrong');
            finishQuestion(isCorrect, q.answer, [opt.dataset.opt]);
          });
        });
      }

      // 重新做本题
      const redoBtn = card.querySelector('.quiz-redo-btn');
      if (redoBtn) {
        redoBtn.addEventListener('click', () => self._redoQuizQuestion(card, quizzes));
      }
    }
  },

  // 完成 quiz 手动记录
  completeQuiz() {
    if (this._quizModule) Storage.completeModule(this._quizModule.id);
    this.showChapter(this.currentChapter);
  },

  // 返回：章节内的小节/题目 → 回本章概览；章节概览 → 回学科地图
  back() {
    if (this.currentModule && this.currentChapter) {
      this.currentModule = null;
      this.showChapter(this.currentChapter);
      return;
    }
    App.showMap();
  },

  // 切换视图（内部使用，统一通过App管理）
  showView(viewId) {
    if (viewId === 'mapView') {
      App.showMap();
    } else {
      App.showLesson();
    }
  },

  // 格式化Markdown（兼容同步和异步）
  // 关键：先把「代码块 / 行内代码 / LaTeX 公式」抽成占位符保护起来，再交给 marked 解析。
  // 否则 marked 会吃掉 LaTeX 里的转义反斜杠（如 \{ \} \% \, \( \)），导致公式渲染失败或变形。
  formatMarkdown(text) {
    if (!text) return '';
    const self = this;
    const box = { code: [], math: [] };
    let s = String(text);

    // 1) 围栏代码块 → 占位符
    s = s.replace(/```([^\n`]*)\n?([\s\S]*?)```/g, (m, lang, code) => {
      box.code.push('<pre><code class="language-' + (String(lang || 'cpp').trim() || 'cpp') + '">' +
        self.escapeHtml(code.replace(/\n$/, '')) + '</code></pre>');
      return '@@MDCODE' + (box.code.length - 1) + '@@';
    });

    // 2) 行内代码 → 占位符
    s = s.replace(/`([^`\n]+)`/g, (m, code) => {
      box.code.push('<code>' + self.escapeHtml(code) + '</code>');
      return '@@MDCODE' + (box.code.length - 1) + '@@';
    });

    // 3) LaTeX 公式 → 占位符（先长后短，避免 $$ 被 $ 抢先截断）
    const protect = (re) => {
      s = s.replace(re, (m) => {
        box.math.push(self.escapeHtml(m));
        return '@@MDMATH' + (box.math.length - 1) + '@@';
      });
    };
    protect(/\$\$[\s\S]+?\$\$/g);
    protect(/\\\[[\s\S]+?\\\]/g);
    protect(/\\\([\s\S]+?\\\)/g);
    protect(/\$[^$\n]+?\$/g);

    // 4) marked 解析
    let html = this._markedToHtml(s);

    // 5) 还原占位符（公式保持原样，交给 KaTeX auto-render 渲染）
    html = html.replace(/@@MDMATH(\d+)@@/g, (m, i) => (box.math[+i] != null ? box.math[+i] : m));
    html = html.replace(/@@MDCODE(\d+)@@/g, (m, i) => (box.code[+i] != null ? box.code[+i] : m));
    return html;
  },

  // marked 解析（同步优先，异步/异常时退化为内置解析）
  _markedToHtml(s) {
    try {
      if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
        const result = marked.parse(s);
        if (result && typeof result.then === 'function') {
          // marked v12+ 异步版本，用简单替换兜底
          return this.simpleMarkdown(s);
        }
        return String(result);
      }
    } catch (e) {
      console.warn('marked.parse 出错，使用简单格式化:', e);
    }
    return this.simpleMarkdown(s);
  },

  // 简单Markdown解析（备用）
  simpleMarkdown(text) {
    if (!text) return '';
    // 先抽出围栏代码块，避免内部被行内规则误处理
    const codeBlocks = [];
    text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (m, lang, code) => {
      codeBlocks.push('<pre><code class="language-' + (lang || 'cpp') + '">' +
        this.escapeHtml(code.replace(/\n$/, '')) + '</code></pre>');
      return '\u0000CODE' + (codeBlocks.length - 1) + '\u0000';
    });
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>')
      .replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>')
      .replace(/^### (.*?)(<br>|$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)(<br>|$)/gm, '<h2>$1</h2>');
  },

  // 渲染 LaTeX 数学公式（使用 KaTeX），并顺带优化表格展示
  renderLatex(container) {
    if (!container) return;
    this._enhanceTables(container);
    if (typeof renderMathInElement === 'function') {
      try {
        renderMathInElement(container, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      } catch(e) {
        console.warn('KaTeX render error:', e);
      }
    }
  },

  // 给 Markdown 表格套一层可横向滚动的容器（窄屏不撑破布局）
  _enhanceTables(container) {
    if (!container || !container.querySelectorAll) return;
    container.querySelectorAll('table').forEach(table => {
      const parent = table.parentElement;
      if (!parent || (parent.classList && parent.classList.contains('md-table-wrap'))) return;
      const wrap = document.createElement('div');
      wrap.className = 'md-table-wrap';
      parent.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  },

  // 创建代码块
  createCodeBlock(code, lang) {
    return `
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-lang">${lang}</span>
          <button class="btn-copy" onclick="LessonView.copyCode(this)">复制</button>
        </div>
        <pre><code class="language-${lang}">${this.escapeHtml(code)}</code></pre>
      </div>
    `;
  },

  // 复制代码
  copyCode(btn) {
    const code = btn.closest('.code-block').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '已复制！';
      setTimeout(() => {
        btn.textContent = '复制';
      }, 2000);
    });
  },

  // HTML转义
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // 显示章节（供MapView调用）
  showChapter(chapter) {
    this.currentChapter = chapter;
    this.currentModule = null;
    document.getElementById('lessonTitle').textContent = chapter.title;
    document.getElementById('lessonContent').innerHTML = this.renderChapterOverview(chapter);
    document.getElementById('mapView').classList.remove('active');
    document.getElementById('lessonView').classList.add('active');
    const btnBack = document.getElementById('btnBack');
    btnBack.style.display = 'block';
    btnBack.textContent = '← 返回地图';
    // 进入章节 → 沉浸阅读，隐藏学科栏
    if (typeof App !== 'undefined' && App.setFocusMode) App.setFocusMode(true);
  },

  // 渲染章节概览
  renderChapterOverview(chapter) {
    let html = '<div class="lesson-card"><h3>' + chapter.title + '</h3>';
    html += '<p>' + chapter.description + '</p></div>';
    html += '<div class="modules-grid">';
    chapter.modules.forEach((mod, idx) => {
      const completed = Storage.isCompleted(mod.id);
      const statusClass = completed ? 'completed' : 'available';
      const statusIcon = completed ? '✓' : (mod.type === 'intro' ? 'A' : (idx + 1));
      html += '<div class="module-node" onclick="LessonView.openModule(\'' + chapter.id + '\', ' + idx + ')">';
      html += '<div class="module-circle ' + statusClass + '"><span>' + statusIcon + '</span></div>';
      html += '<div class="module-label">' + mod.title + '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  // 打开模块（供章节概览页点击调用）
  openModule(chapterId, moduleIdx) {
    const chapter = CHAPTERS.find(ch => ch.id === chapterId);
    if (!chapter) return;
    const module = chapter.modules[moduleIdx];
    if (!module) return;
    this.open(module, chapter);
  }
};
