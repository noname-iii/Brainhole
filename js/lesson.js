// 课程视图
const LessonView = {
  currentModule: null,
  currentChapter: null,

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
    
    if (module.type === 'intro') {
      this.renderIntro(module);
    } else if (module.type === 'problem') {
      this.renderProblem(module);
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

    content.innerHTML = `
      <div class="lesson-card">
        <h3>A. 这个算法解决什么问题</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.problemDesc)}</div>
      </div>

      <div class="lesson-card">
        <h3>B. 这个算法是怎么想的</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.idea)}</div>
      </div>

      <div class="lesson-card">
        <h3>C. 推导与实现</h3>
        <div class="lesson-content-text">${this.formatMarkdown(lessonData.derivation)}</div>
      </div>

      <div class="lesson-card">
        <h3>D. 代码实现</h3>
        ${this.createCodeBlock(lessonData.code, 'cpp')}
      </div>

      <div class="lesson-card">
        <h3>完成学习</h3>
        <p>恭喜你完成了这个算法的学习！接下来让我们通过练习来巩固吧！</p>
        <button class="btn-primary" onclick="LessonView.completeIntro()">完成学习，开始做题 →</button>
      </div>
    `;

    // 高亮代码
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
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
          <div class="lesson-content-text">${this.formatMarkdown(problem.description)}</div>
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

    // 更新描述（包括从占位符状态更新）
    const descSection = card.querySelector('.problem-section .fetch-notice') || 
                        card.querySelector('.problem-section .lesson-content-text');
    if (descSection && problem.description && 
        !problem.description.includes('加载中') && 
        !problem.description.includes('详见洛谷')) {
      descSection.outerHTML = '<div class="lesson-content-text">' + this.formatMarkdown(problem.description) + '</div>';
    }

    // 更新数据范围
    const constraintsSection = card.querySelector('.problem-section:last-child p');
    if (constraintsSection && problem.constraints && problem.constraints !== '详见洛谷题目页面') {
      constraintsSection.textContent = problem.constraints;
    }
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

  // 分析用户思路
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

    const result = await AI.analyzeThinking(thinking, context);

    if (result.success) {
      responseArea.innerHTML = `
        <div class="ai-response">
          <h4>AI 助手的分析</h4>
          <div class="ai-response-content">${this.formatMarkdown(result.message)}</div>
        </div>

        <div class="followup-area">
          <h4>继续追问</h4>
          <textarea class="followup-input" id="followupInput" placeholder="有什么不明白的地方吗？可以继续提问..."></textarea>
          <div class="followup-actions">
            <button class="btn-primary" onclick="LessonView.askFollowup()">提问</button>
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
  },

  // 恢复AI分析回复
  restoreAiResponse(moduleId) {
    const saved = localStorage.getItem('oi_ai_response_' + moduleId);
    const area = document.getElementById('aiResponseArea');
    if (area && saved) {
      area.innerHTML = saved;
      this.renderLatex(area);
    }
  },

  // 追问
  async askFollowup() {
    const question = document.getElementById('followupInput').value.trim();
    if (!question) {
      this.showToast('请输入你的问题！', 'error');
      return;
    }

    const responseArea = document.getElementById('aiResponseArea');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-response';
    loadingDiv.innerHTML = `
      <div class="loading"></div>
      <p>AI 正在思考...</p>
    `;
    responseArea.appendChild(loadingDiv);

    const result = await AI.sendMessage(question, `${this.currentChapter.title}`);

    if (result.success) {
      loadingDiv.innerHTML = `
        <h4>AI 助手的回答</h4>
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
    
    // 找到当前章节的第一道题
    const chapter = this.currentChapter;
    if (chapter && chapter.modules.length > 1) {
      const firstProblem = chapter.modules.find(m => m.type === 'problem');
      if (firstProblem) {
        // 直接跳转到第一道题
        this.open(firstProblem, chapter);
        return;
      }
    }
    
    // 如果找不到题目，返回章节概览
    this.showChapter(chapter);
  },

  // 返回地图
  back() {
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
  formatMarkdown(text) {
    if (!text) return '';
    try {
      // marked v12+ 默认返回 Promise
      if (typeof marked.parse === 'function') {
        const result = marked.parse(text);
        if (result && typeof result.then === 'function') {
          // 异步版本，用简单替换兜底
          return this.simpleMarkdown(text);
        }
        return String(result);
      }
    } catch(e) {
      console.warn('marked.parse 出错，使用简单格式化:', e);
    }
    return this.simpleMarkdown(text);
  },

  // 简单Markdown解析（备用）
  simpleMarkdown(text) {
    if (!text) return '';
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

  // 渲染 LaTeX 数学公式（使用 KaTeX）
  renderLatex(container) {
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
    document.getElementById('lessonTitle').textContent = chapter.title;
    document.getElementById('lessonContent').innerHTML = this.renderChapterOverview(chapter);
    document.getElementById('mapView').classList.remove('active');
    document.getElementById('lessonView').classList.add('active');
    document.getElementById('btnBack').style.display = 'block';
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
