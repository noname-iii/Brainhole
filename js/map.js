// 地图视图逻辑
const MapView = {
  currentChapter: null,

  // 初始化地图
  init() {
    this.renderMap();
    this.bindEvents();
  },

  // 渲染地图
  renderMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = '';

    // 按Part分组渲染章节
    const parts = this.groupChaptersByPart();
    
    Object.keys(parts).forEach(partKey => {
      const partSection = this.createPartSection(partKey, parts[partKey]);
      mapContainer.appendChild(partSection);
    });
  },

  // 按Part分组
  groupChaptersByPart() {
    const parts = {};
    CHAPTERS.forEach(chapter => {
      const partMatch = chapter.title.match(/^(\d+)\./);
      const partKey = partMatch ? `Part ${partMatch[1]}` : '其他';
      
      if (!parts[partKey]) {
        parts[partKey] = [];
      }
      parts[partKey].push(chapter);
    });
    return parts;
  },

  // 创建Part区域
  createPartSection(partKey, chapters) {
    const section = document.createElement('div');
    section.className = 'part-section';
    
    const header = document.createElement('div');
    header.className = 'part-header';
    header.innerHTML = `<h2>${partKey}</h2>`;
    section.appendChild(header);

    const path = document.createElement('div');
    path.className = 'learning-path';
    
    chapters.forEach((chapter, index) => {
      const node = this.createChapterNode(chapter, index);
      path.appendChild(node);
    });
    
    section.appendChild(path);
    return section;
  },

  // 创建章节节点
  createChapterNode(chapter, index) {
    const node = document.createElement('div');
    node.className = 'chapter-node';
    node.dataset.chapterId = chapter.id;

    // 计算进度
    const progress = this.calculateChapterProgress(chapter);
    
    // 根据进度设置状态
    let statusClass = 'locked';
    if (progress.completed > 0) {
      statusClass = progress.completed === progress.total ? 'completed' : 'in-progress';
    } else if (this.isChapterUnlocked(chapter)) {
      statusClass = 'available';
    }

    node.innerHTML = `
      <div class="chapter-circle ${statusClass}">
        <span class="chapter-icon">${chapter.icon}</span>
        ${statusClass === 'completed' ? '<div class="chapter-badge">✓</div>' : ''}
      </div>
      <div class="chapter-info">
        <div class="chapter-title">${chapter.title}</div>
        <div class="chapter-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress.percentage}%"></div>
          </div>
          <span class="progress-text">${progress.completed}/${progress.total}</span>
        </div>
      </div>
    `;

    // 添加点击事件
    if (statusClass !== 'locked') {
      node.addEventListener('click', () => {
        this.openChapter(chapter);
      });
    }

    return node;
  },

  // 计算章节进度
  calculateChapterProgress(chapter) {
    const total = chapter.modules.length;
    let completed = 0;
    
    chapter.modules.forEach(module => {
      if (Storage.isCompleted(module.id)) {
        completed++;
      }
    });

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  },

  // 检查章节是否解锁 - 允许随时访问所有章节
  isChapterUnlocked(chapter) {
    return true;
  },

  // 打开章节
  openChapter(chapter) {
    this.currentChapter = chapter;
    LessonView.showChapter(chapter);
  },

  // 绑定事件
  bindEvents() {
    // 可以在这里添加地图相关的交互事件
  },

  // 渲染方法（供外部调用）
  render() {
    this.renderMap();
  }
};
