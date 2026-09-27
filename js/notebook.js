// 重点习题册：收藏不明白的题目，按科目访问、重做
// 存储协议：localStorage.notebook_items = [{ id, subject, kpId, kpTitle, chapterTitle,
//   semTitle, q, answer, solution, addedAt, redone }]
(function () {
  window.NotebookView = {
    STORAGE_KEY: 'notebook_items',
    currentFilter: 'all',

    // 顺序与学科栏保持一致：数学 → 语文 → 物理 → 化学 → 生物
    SUBJECT_NAMES: {
      math: '数学', chinese: '语文', physics: '物理', chemistry: '化学',
      chemistry_lk: '化学·鲁科', biology: '生物', oi: 'OI'
    },
    SUBJECT_COLORS: {
      math: '#6366f1', chinese: '#f59e0b', physics: '#0ea5e9', chemistry: '#10b981',
      chemistry_lk: '#0d9488', biology: '#84cc16', oi: '#8b5cf6'
    },
    DIFF_LABELS: {
      1: '基础-', 2: '基础', 3: '基础+/拔高-', 4: '拔高', 5: '拔高+/高考-',
      6: '高考', 7: '高考+/竞赛-', 8: '竞赛', 9: '反人类'
    },
    // OI 洛谷难度标签（与洛谷官方一致）
    OI_DIFF_LABELS: {
      1: '入门', 2: '普及-', 3: '普及', 4: '普及+', 5: '提高-', 6: '提高', 7: '省选'
    },

    // ============ 存储 ============
    _load() {
      try {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      } catch (e) { return []; }
    },
    _save(items) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    },

    // 收藏一道题（由知识点真题区的「习题册」按钮调用）
    add(subject, kp, q, chapter, semester, index) {
      const items = this._load();
      const id = kp.id + '_q' + index;
      if (items.some(it => it.id === id)) return false;
      items.unshift({
        id: id,
        subject: subject || 'math',
        kpId: kp.id,
        kpTitle: kp.title || '',
        chapterTitle: (chapter && chapter.title) || '',
        semTitle: (semester && semester.title) || '',
        q: q.q || '',
        answer: q.answer || '',
        solution: q.solution || '',
        d: q.d || 0,
        src: q.src || '',
        addedAt: Date.now(),
        redone: 0
      });
      this._save(items);
      if (typeof App !== 'undefined' && App.updateGlobalProgress) App.updateGlobalProgress();
      return true;
    },

    // 收藏一道 OI 题（由洛谷题目页面调用）
    addOI(module, chapter, problem) {
      const items = this._load();
      const id = 'oi_' + module.id;
      if (items.some(it => it.id === id)) return false;
      
      // 构建题目内容
      let q = problem.title + '\n\n';
      if (problem.description) {
        q += problem.description + '\n\n';
      }
      if (problem.samples && problem.samples.length > 0) {
        q += '**样例：**\n';
        problem.samples.forEach((s, i) => {
          q += '输入 ' + (i + 1) + '：\n```\n' + s.input + '\n```\n';
          q += '输出 ' + (i + 1) + '：\n```\n' + s.output + '\n```\n';
        });
      }
      if (problem.constraints) {
        q += '\n**数据范围：**\n' + problem.constraints;
      }
      
      items.unshift({
        id: id,
        subject: 'oi',
        kpId: module.id,
        kpTitle: module.title || '',
        chapterTitle: (chapter && chapter.title) || '',
        semTitle: '',
        q: q,
        answer: '',
        solution: '',
        d: problem.difficulty || 0,
        src: module.luoguId || '',
        addedAt: Date.now(),
        redone: 0
      });
      this._save(items);
      if (typeof App !== 'undefined' && App.updateGlobalProgress) App.updateGlobalProgress();
      return true;
    },

    remove(id) {
      this._save(this._load().filter(it => it.id !== id));
      this.show();
    },

    toggleRedone(id) {
      const items = this._load();
      const it = items.find(x => x.id === id);
      if (it) { it.redone = it.redone ? 0 : 1; this._save(items); }
      this.show();
    },

    has(id) {
      return this._load().some(it => it.id === id);
    },

    count() { return this._load().length; },

    // 获取当前过滤列表（供导航使用）
    _getFilteredList() {
      const items = this._load();
      return this.currentFilter === 'all' ? items :
        items.filter(it => it.subject === this.currentFilter);
    },

    // 获取某题在过滤列表中的前后题
    getAdjacent(currentId) {
      const list = this._getFilteredList();
      const idx = list.findIndex(it => it.id === currentId);
      if (idx < 0) return { prev: null, next: null };
      return {
        prev: idx > 0 ? list[idx - 1] : null,
        next: idx < list.length - 1 ? list[idx + 1] : null,
        index: idx,
        total: list.length
      };
    },

    // 从习题册打开一道 OI 题（找到原始模块并跳转）
    openOI(notebookItemId) {
      const items = this._load();
      const item = items.find(x => x.id === notebookItemId);
      if (!item || item.subject !== 'oi') return;

      // 在 CHAPTERS 中查找对应模块
      if (typeof CHAPTERS === 'undefined') return;
      for (const ch of CHAPTERS) {
        const mod = ch.modules.find(m => m.id === item.kpId);
        if (mod) {
          // 标记来源为习题册，以便显示导航
          if (typeof LessonView !== 'undefined') {
            LessonView._notebookCtx = {
              itemId: notebookItemId,
              subject: 'oi'
            };
            LessonView.open(mod, ch);
          }
          return;
        }
      }
      // 找不到模块时降级提示
      if (typeof LessonView !== 'undefined') {
        LessonView.showToast('未找到原始题目，可能章节已变更', 'error');
      }
    },

    // ============ 渲染 ============
    show() {
      this._switchView('notebookView');
      const container = document.getElementById('notebookContainer');
      if (!container) return;

      const items = this._load();
      const subjects = ['all'].concat(Object.keys(this.SUBJECT_NAMES)
        .filter(s => items.some(it => it.subject === s)));

      // 统计
      const redoneCount = items.filter(it => it.redone).length;

      let html = '<div class="nb-header">' +
        '<p class="nb-subtitle">遇到不明白的题目，在题目区点击「☆ 习题册」即可收藏到这里。' +
        '按科目筛选，重做直到完全掌握！</p>' +
        '<div class="nb-stats"><span class="nb-stat">共 <b>' + items.length + '</b> 题</span>' +
        '<span class="nb-stat">已重做 <b>' + redoneCount + '</b> 题</span>' +
        '<span class="nb-stat">待攻克 <b>' + (items.length - redoneCount) + '</b> 题</span></div></div>';

      // 科目筛选
      html += '<div class="nb-filter">';
      subjects.forEach(s => {
        const active = this.currentFilter === s ? ' active' : '';
        const label = s === 'all' ? '全部' : this.SUBJECT_NAMES[s];
        const n = s === 'all' ? items.length : items.filter(it => it.subject === s).length;
        const color = s === 'all' ? '' : ' style="--chip-color:' + this.SUBJECT_COLORS[s] + '"';
        html += '<button class="nb-chip' + active + '" data-filter="' + s + '"' + color + '>' +
          label + ' (' + n + ')</button>';
      });
      html += '</div>';

      // 题目列表
      const filtered = this.currentFilter === 'all' ? items :
        items.filter(it => it.subject === this.currentFilter);

      if (filtered.length === 0) {
        html += '<div class="nb-empty">还没有收藏的题目。</div>';
      } else {
        filtered.forEach((it, i) => {
          const meta = this.SUBJECT_NAMES[it.subject] || it.subject;
          // OI 题使用洛谷难度标签
          let diff = '';
          if (it.subject === 'oi') {
            diff = it.d && this.OI_DIFF_LABELS[it.d]
              ? '<span class="kp-question-diff diff-' + it.d + '">' + this._esc(this.OI_DIFF_LABELS[it.d]) + '</span>' : '';
          } else {
            diff = it.d && this.DIFF_LABELS[it.d]
              ? '<span class="kp-question-diff diff-' + it.d + '">' + this._esc(this.DIFF_LABELS[it.d]) + '</span>' : '';
          }
          // OI 题显示洛谷链接
          let src = '';
          if (it.subject === 'oi' && it.src) {
            src = '<a href="https://www.luogu.com.cn/problem/' + this._esc(it.src) + '" target="_blank" class="kp-question-src" style="color:#6366f1;text-decoration:none;">📌 ' + this._esc(it.src) + '</a>';
          } else {
            src = it.src ? '<span class="kp-question-src">📌 ' + this._esc(it.src) + '</span>' : '';
          }
          html += '<div class="nb-item' + (it.redone ? ' nb-item-done' : '') + '" data-id="' + this._esc(it.id) + '">' +
            '<div class="nb-item-header">' +
            '<span class="nb-item-subject" style="background:' +
            (this.SUBJECT_COLORS[it.subject] || '#888') + '">' + this._esc(meta) + '</span>' +
            diff + src +
            '<span class="nb-item-source">' + this._esc(it.chapterTitle +
            (it.kpTitle ? ' · ' + it.kpTitle : '')) + '</span>' +
            '<div class="nb-item-actions">' +
            '<button class="nb-btn nb-btn-redone">' + (it.redone ? '✓ 已重做' : '重做完成') + '</button>' +
            '<button class="nb-btn nb-btn-remove">移除</button>' +
            '</div></div>' +
            '<div class="nb-item-body">' + this._md(it.q) + '</div>' +
            '<div class="nb-item-answer" style="display:none">' +
            '<div class="nb-answer-label">答案：' + this._esc(it.answer || '—') + '</div>' +
            '<div class="nb-solution">' + this._md(it.solution) + '</div></div>' +
            '<div class="nb-item-footer"><button class="nb-btn nb-btn-toggle">显示解析</button></div>' +
            '</div>';
        });
      }

      container.innerHTML = html;

      // 绑定事件
      container.querySelectorAll('.nb-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          this.currentFilter = chip.dataset.filter;
          this.show();
        });
      });
      container.querySelectorAll('.nb-item').forEach(el => {
        const id = el.dataset.id;
        el.querySelector('.nb-btn-toggle').addEventListener('click', (e) => {
          const ans = el.querySelector('.nb-item-answer');
          const show = ans.style.display === 'none';
          ans.style.display = show ? 'block' : 'none';
          e.target.textContent = show ? '收起解析' : '显示解析';
          if (show) this._renderLatex(ans);
        });
        el.querySelector('.nb-btn-remove').addEventListener('click', () => this.remove(id));
        el.querySelector('.nb-btn-redone').addEventListener('click', () => this.toggleRedone(id));
        // 点击题目跳回原知识点
        const src = el.querySelector('.nb-item-source');
        src.title = '点击回到原知识点';
        src.style.cursor = 'pointer';
        src.addEventListener('click', () => {
          const it = this._load().find(x => x.id === id);
          if (it && typeof KnowledgeView !== 'undefined' && KnowledgeView.findKp) {
            const found = KnowledgeView.findKp(it.kpId);
            if (found) {
              const tab = it.subject === 'chemistry_lk' ? 'chemistry' : it.subject;
              if (typeof App !== 'undefined' && App.switchSubject) App.switchSubject(tab);
              KnowledgeView.showKp(it.kpId);
            }
          }
        });
      });

      this._renderLatex(container);
    },

    // ============ 工具 ============
    _switchView(viewId) {
      if (typeof App !== 'undefined' && App.showView) {
        App.showView(viewId);
        return;
      }
      document.querySelectorAll('#mainContent .view').forEach(v => v.classList.remove('active'));
      const view = document.getElementById(viewId);
      if (view) view.classList.add('active');
    },

    _esc(text) {
      const div = document.createElement('div');
      div.textContent = String(text || '');
      return div.innerHTML;
    },

    _md(text) {
      if (!text) return '';
      if (typeof LessonView !== 'undefined' && LessonView.formatMarkdown) {
        return LessonView.formatMarkdown(String(text));
      }
      return this._esc(text).replace(/\n/g, '<br>');
    },

    _renderLatex(el) {
      if (typeof LessonView !== 'undefined' && LessonView.renderLatex) {
        LessonView.renderLatex(el);
      }
      if (window.hljs) {
        el.querySelectorAll('pre code').forEach(c => {
          try { window.hljs.highlightElement(c); } catch (e) {}
        });
      }
    }
  };
})();
