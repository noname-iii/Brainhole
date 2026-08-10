// 洛谷题目获取
const Luogu = {
  // 题目缓存
  cache: {},

  // 获取题目信息
  async getProblem(problemId) {
    // 先检查缓存
    if (this.cache[problemId]) {
      return this.cache[problemId];
    }

    // 立即返回本地数据，不等待网络请求
    const localProblem = this.getLocalProblem(problemId);
    this.cache[problemId] = localProblem;

    // 在后台尝试从洛谷获取真实题目（不阻塞UI）
    this.fetchFromLuogu(problemId).then(problem => {
      if (problem) {
        this.cache[problemId] = problem;
        console.log(`已从洛谷获取题目 ${problemId} 的真实数据`);
      }
    }).catch(error => {
      console.warn('从洛谷API获取失败，使用本地数据:', error);
    });

    return localProblem;
  },

  // 从洛谷获取题目（通过CORS代理）
  async fetchFromLuogu(problemId) {
    const url = `https://www.luogu.com.cn/problem/${problemId}`;
    try {
      // 使用多个CORS代理作为备选
      const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
        `https://corsproxy.org/?${encodeURIComponent(url)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      ];

      let html = null;
      for (let i = 0; i < proxies.length; i++) {
        const proxyUrl = proxies[i];
        try {
          console.log(`尝试代理 ${i + 1}/${proxies.length}: ${proxyUrl.substring(0, 50)}...`);
          const response = await fetch(proxyUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            signal: AbortSignal.timeout(3000) // 3秒超时，快速降级到本地数据
          });
          if (response.ok) {
            html = await response.text();
            if (html && html.length > 500) {
              console.log(`代理 ${i + 1} 成功，获取到 ${html.length} 字符`);
              break;
            }
          }
        } catch (e) {
          console.warn(`代理 ${i + 1} 失败:`, e.message);
          continue;
        }
      }

      if (!html) {
        console.warn('所有代理均失败，使用本地数据');
        return null;
      }
      return this.parseLuoguHTML(html, problemId);
    } catch (error) {
      console.error('洛谷API请求失败:', error);
      return null;
    }
  },

  // 解析洛谷HTML提取题目信息
  parseLuoguHTML(html, problemId) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 提取标题
      const titleEl = doc.querySelector('h1') || doc.querySelector('.problem-title');
      const title = titleEl ? titleEl.textContent.trim() : `题目 ${problemId}`;

      // 提取难度
      let difficulty = 3;
      const difficultyEl = doc.querySelector('.difficulty-indicator') ||
                           doc.querySelector('[class*="difficulty"]') ||
                           doc.querySelector('.lg-title .difficulty');
      if (difficultyEl) {
        const diffText = difficultyEl.textContent || '';
        const diffMatch = diffText.match(/(\d+)/);
        if (diffMatch) difficulty = parseInt(diffMatch[1]);
      }

      // 提取题目内容区域
      const sections = doc.querySelectorAll('.problem-section, .luogu-content .section, [class*="problem-section"]');
      let description = '';
      let inputFormat = '';
      let outputFormat = '';
      let constraints = '';

      sections.forEach(section => {
        const heading = section.querySelector('h2, h3, .section-title');
        const headingText = heading ? heading.textContent.trim() : '';
        const content = section.textContent.replace(headingText, '').trim();

        if (headingText.includes('题目描述') || headingText.includes('题目背景')) {
          description += content + '\n\n';
        } else if (headingText.includes('输入格式')) {
          inputFormat = content;
        } else if (headingText.includes('输出格式')) {
          outputFormat = content;
        } else if (headingText.includes('数据范围') || headingText.includes('提示')) {
          constraints += content + '\n';
        }
      });

      // 如果没解析到结构化内容，尝试提取整个内容区
      if (!description) {
        const contentEl = doc.querySelector('.luogu-content') ||
                          doc.querySelector('#app') ||
                          doc.querySelector('main') ||
                          doc.querySelector('article');
        if (contentEl) {
          description = contentEl.textContent.trim().substring(0, 3000);
        }
      }

      if (!description) {
        description = `这是洛谷题目 ${problemId}。由于网络原因，题目详情暂时无法加载，请手动前往洛谷查看。`;
      }

      // 提取样例
      const samples = [];
      const sampleBlocks = doc.querySelectorAll('.sample-block, [class*="sample"]');
      for (let i = 0; i < sampleBlocks.length; i += 2) {
        const inputEl = sampleBlocks[i];
        const outputEl = sampleBlocks[i + 1];
        if (inputEl && outputEl) {
          const inputPre = inputEl.querySelector('pre, code') || inputEl;
          const outputPre = outputEl.querySelector('pre, code') || outputEl;
          samples.push({
            input: inputPre.textContent.trim(),
            output: outputPre.textContent.trim()
          });
        }
      }

      // 备选：通过正则提取样例
      if (samples.length === 0) {
        const sampleRegex = /样例输入[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>[\s\S]*?样例输出[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/g;
        let match;
        while ((match = sampleRegex.exec(html)) !== null) {
          samples.push({
            input: match[1].replace(/<[^>]+>/g, '').trim(),
            output: match[2].replace(/<[^>]+>/g, '').trim()
          });
        }
      }

      // 构建完整描述
      let fullDescription = description;
      if (inputFormat) fullDescription += '\n\n**输入格式：**\n' + inputFormat;
      if (outputFormat) fullDescription += '\n\n**输出格式：**\n' + outputFormat;

      return {
        id: problemId,
        title: title,
        difficulty: difficulty,
        description: fullDescription.trim(),
        samples: samples,
        constraints: constraints.trim() || '详见洛谷题目页面'
      };
    } catch (error) {
      console.error('解析洛谷HTML失败:', error);
      return null;
    }
  },

  // 本地题目数据（备用）
  getLocalProblem(problemId) {
    const localProblems = {
      // 搜索基础
      'P1706': {
        id: 'P1706',
        title: '全排列问题',
        difficulty: 1,
        description: '按照字典序输出自然数 1 到 n 的所有排列。\n\n**题目描述：**\n给定一个整数 n，输出 1 到 n 的全排列，按字典序排列。\n\n**输入格式：**\n一个整数 n（1 ≤ n ≤ 9）。\n\n**输出格式：**\n每行一个排列，数字之间用空格隔开。',
        samples: [
          { input: '3', output: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' }
        ],
        constraints: '1 ≤ n ≤ 9'
      },
      'P1219': {
        id: 'P1219',
        title: '八皇后',
        difficulty: 2,
        description: '一个 8×8 的棋盘上放置 8 个皇后，使得它们互不攻击。求所有合法的放置方案。\n\n**题目描述：**\n在 8×8 的国际象棋棋盘上放置 8 个皇后，要求：\n1. 任意两个皇后不在同一行\n2. 任意两个皇后不在同一列\n3. 任意两个皇后不在同一对角线上\n\n输出所有合法的放置方案，按字典序排列。\n\n**输入格式：**\n无输入。\n\n**输出格式：**\n每行一个方案，用 8 个数字表示每行皇后的列号。',
        samples: [],
        constraints: '棋盘大小为 8×8'
      },
      'P1019': {
        id: 'P1019',
        title: '单词接龙',
        difficulty: 3,
        description: '给定一组单词，找出以指定字母开头的最长"龙"。\n\n**题目描述：**\n单词接龙是一个与我们常玩的成语接龙相似的游戏。给定一组单词和一个开头字母，找出一个最长的"龙"，使得：\n1. 每个单词最多使用两次\n2. 相邻两个单词有公共的前后缀（前一个单词的后缀等于后一个单词的前缀）\n3. 公共部分不能是完整的单词\n\n**输入格式：**\n第一行一个整数 n，表示单词数量。\n接下来 n 行，每行一个单词。\n最后一行一个字母，表示龙的开头。\n\n**输出格式：**\n一个整数，表示最长的"龙"的长度。',
        samples: [
          { input: '5\nat\nbe\ncat\ndog\neat\na', output: '15' }
        ],
        constraints: '1 ≤ n ≤ 20，单词长度不超过 10'
      },
      // BFS 基础
      'P1443': {
        id: 'P1443',
        title: '马的遍历',
        difficulty: 2,
        description: '给定一个 n×m 的棋盘，马从起点出发，求到达每个格子的最少步数。\n\n**题目描述：**\n在中国象棋中，马可以走"日"字。给定一个 n×m 的棋盘，马从位置 (sx, sy) 出发，求马到达棋盘上每个格子的最少步数。\n\n**输入格式：**\n四个整数 n, m, sx, sy，分别表示棋盘大小和起点坐标。\n\n**输出格式：**\n一个 n×m 的矩阵，表示马到达每个格子的最少步数。无法到达的格子输出 -1。',
        samples: [
          { input: '3 3 1 1', output: '0 4 2\n4 -1 4\n2 4 0' }
        ],
        constraints: '1 ≤ n, m ≤ 400'
      },
      'P1032': {
        id: 'P1032',
        title: '字串变换',
        difficulty: 3,
        description: '给定两个字符串 A 和 B，以及一组变换规则，求从 A 变换到 B 的最少步数。\n\n**题目描述：**\n已知有两个长度不超过 20 的字符串 A 和 B。同时有不超过 6 条变换规则，每条规则形如 A_i → B_i，表示可以将字符串中的 A_i 替换为 B_i。\n\n求从 A 变换到 B 的最少步数。如果在 10 步内无法变换到 B，输出 "NO ANSWER!"。\n\n**输入格式：**\n第一行两个字符串 A 和 B。\n接下来若干行，每行两个字符串，表示一条变换规则。\n\n**输出格式：**\n一个整数，表示最少步数，或 "NO ANSWER!"。',
        samples: [
          { input: 'abcd\nxyz\nabc→xu\nud→y\ny→yz', output: '3' }
        ],
        constraints: '字符串长度不超过 20，规则数不超过 6'
      },
      // 记忆化搜索
      'P1048': {
        id: 'P1048',
        title: '采药',
        difficulty: 2,
        description: '在限定时间内，采集价值最大的草药组合。\n\n**题目描述：**\n辰辰是个有远大目标的孩子，他想成为世界上最伟大的医师。为了证明自己的资质，他需要从一个山洞里采集一些草药。\n\n这个山洞里有 M 株草药，每株草药有自己的采集时间和价值。在 T 时间内，辰辰能采集到的草药的最大总价值是多少？\n\n**输入格式：**\n第一行两个整数 T 和 M，表示总时间和草药数量。\n接下来 M 行，每行两个整数，表示一株草药的采集时间和价值。\n\n**输出格式：**\n一个整数，表示在 T 时间内能采集到的最大总价值。',
        samples: [
          { input: '70 3\n71 100\n32 30\n20 20', output: '50' }
        ],
        constraints: '1 ≤ T ≤ 1000，1 ≤ M ≤ 100'
      },
      'P1049': {
        id: 'P1049',
        title: '装箱问题',
        difficulty: 2,
        description: '将若干个物品装入一个箱子，使得箱子的剩余空间最小。\n\n**题目描述：**\n有一个箱子容量为 V（正整数，0 < V ≤ 20000），同时有 n 个物品（0 < n ≤ 30），每个物品有一个体积（正整数）。\n\n要求从这 n 个物品中任选若干个装入箱内，使得箱子的剩余空间最小。\n\n**输入格式：**\n第一行一个整数 V，表示箱子容量。\n第二行一个整数 n，表示物品数量。\n接下来 n 行，每行一个整数，表示每个物品的体积。\n\n**输出格式：**\n一个整数，表示箱子的最小剩余空间。',
        samples: [
          { input: '24\n6\n8\n3\n12\n7\n9\n7', output: '0' }
        ],
        constraints: 'V ≤ 20000，n ≤ 30'
      },
      // DP 基础
      'P1020': {
        id: 'P1020',
        title: '导弹拦截',
        difficulty: 3,
        description: '求一个序列的最长不上升子序列和最少不上升子序列覆盖数。\n\n**题目描述：**\n某国为了防御敌国的导弹袭击，发展出一种导弹拦截系统。但是这种导弹拦截系统有一个缺陷：虽然它的第一发炮弹能够到达任意的高度，但是以后每一发炮弹都不能高于前一发的高度。\n\n给定一系列导弹的高度，求：\n1. 一套系统最多能拦截多少导弹\n2. 拦截所有导弹最少需要多少套系统\n\n**输入格式：**\n一行，若干个整数，表示导弹的高度序列。\n\n**输出格式：**\n两行，第一行是一套系统最多能拦截的导弹数，第二行是拦截所有导弹需要的最少系统数。',
        samples: [
          { input: '389 207 155 300 299 170 158 65', output: '6\n2' }
        ],
        constraints: '导弹数量不超过 100000'
      },
      // 字符串哈希
      'P3370': {
        id: 'P3370',
        title: '【模板】字符串哈希',
        difficulty: 2,
        description: '给定 n 个字符串，求其中不同的字符串数量。\n\n**题目描述：**\n如题，给定 n 个字符串，求其中不同的字符串数量。\n\n**输入格式：**\n第一行一个整数 n。\n接下来 n 行，每行一个字符串。\n\n**输出格式：**\n一个整数，表示不同的字符串数量。',
        samples: [
          { input: '5\nabc\nabc\naaa\naba\naba', output: '3' }
        ],
        constraints: 'n ≤ 10000，字符串长度不超过 1500'
      },
      // 数据结构
      'P3366': {
        id: 'P3366',
        title: '【模板】最小生成树',
        difficulty: 2,
        description: '给定一个无向图，求其最小生成树的边权和。\n\n**题目描述：**\n如题，给出一个无向图，求出最小生成树的边权和。\n\n**输入格式：**\n第一行两个整数 n, m，表示图的点数和边数。\n接下来 m 行，每行三个整数 u, v, w，表示一条连接 u 和 v，边权为 w 的无向边。\n\n**输出格式：**\n一个整数，表示最小生成树的边权和。',
        samples: [
          { input: '4 5\n1 2 2\n1 3 2\n1 4 3\n2 3 4\n3 4 3', output: '7' }
        ],
        constraints: 'n ≤ 5000，m ≤ 200000'
      },
      // 图论
      'P3371': {
        id: 'P3371',
        title: '【模板】单源最短路径（弱化版）',
        difficulty: 3,
        description: '给定一个有向图，求从起点到所有点的最短路径。\n\n**题目描述：**\n如题，给出一个有向图。请输出从某一点出发到所有点的最短路径长度。\n\n**输入格式：**\n第一行三个整数 n, m, s，分别表示图的点数、边数和起点编号。\n接下来 m 行，每行三个整数 u, v, w，表示一条从 u 到 v，边权为 w 的有向边。\n\n**输出格式：**\n一行 n 个整数，表示从起点到每个点的最短路径长度。如果无法到达，输出 2^31-1。',
        samples: [
          { input: '4 6 1\n1 2 2\n2 3 2\n2 4 1\n1 3 5\n3 4 3\n1 4 4', output: '0 2 4 3' }
        ],
        constraints: 'n ≤ 10000，m ≤ 500000'
      },
      // 计算几何
      'P2742': {
        id: 'P2742',
        title: '【模板】二维凸包',
        difficulty: 4,
        description: '给定平面上 n 个点，求这些点的凸包。\n\n**题目描述：**\n如题，给定平面上 n 个点，求这些点的凸包，输出凸包的周长。\n\n**输入格式：**\n第一行一个整数 n。\n接下来 n 行，每行两个实数 x, y，表示一个点的坐标。\n\n**输出格式：**\n一个实数，表示凸包的周长，保留两位小数。',
        samples: [
          { input: '6\n0 0\n1 0\n2 1\n1 2\n0 2\n-1 1', output: '9.41' }
        ],
        constraints: 'n ≤ 10000'
      }
    };

    return localProblems[problemId] || {
      id: problemId,
      title: `题目 ${problemId}`,
      difficulty: 3,
      description: `这是洛谷题目 ${problemId}。\n\n**题目详情：**\n由于网络原因，题目详情暂时无法自动加载。\n\n**如何查看题目：**\n1. 点击下方"去洛谷查看"按钮，直接跳转到洛谷题目页面\n2. 在洛谷上查看完整的题目描述、样例和数据范围\n3. 完成题目后，回到这里点击"我AC了"按钮完成关卡\n\n**提示：** 配置好 AI API 后，可以在做题过程中随时向 AI 助手提问，获取解题思路和指导。`,
      samples: [],
      constraints: '详见洛谷题目页面'
    };
  },

  // 提交代码到洛谷（需要用户手动提交）
  submitCode(problemId, code) {
    const url = `https://www.luogu.com.cn/problem/${problemId}#submit`;
    window.open(url, '_blank');
  },

  // 检查是否AC（使用自定义弹窗，避免confirm()导致React错误）
  checkAC(problemId) {
    return new Promise((resolve) => {
      // 创建确认弹窗
      const overlay = document.createElement('div');
      overlay.className = 'ac-confirm-overlay';
      overlay.innerHTML = `
        <div class="ac-confirm-dialog">
          <div class="ac-confirm-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <h3>确认完成</h3>
          <p>你已经在洛谷上成功提交了 <strong>${problemId}</strong> 并获得了AC吗？</p>
          <div class="ac-confirm-buttons">
            <button class="btn-secondary" id="acCancel">再想想</button>
            <button class="btn-ac-confirm" id="acConfirm">是的，我AC了！</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      
      document.getElementById('acConfirm').onclick = () => {
        overlay.remove();
        resolve(true);
      };
      document.getElementById('acCancel').onclick = () => {
        overlay.remove();
        resolve(false);
      };
      overlay.onclick = (e) => {
        if (e.target === overlay) { overlay.remove(); resolve(false); }
      };
    });
  }
};
