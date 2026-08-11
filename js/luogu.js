// 洛谷题目获取
const Luogu = {
  // 题目缓存
  cache: {},

  // 获取题目信息（主入口）
  async getProblem(problemId) {
    // 先检查缓存
    if (this.cache[problemId]) {
      return this.cache[problemId];
    }

    // 立即返回本地数据（不阻塞UI）
    const localProblem = this.getLocalProblem(problemId);
    
    // 如果本地数据标记为需要获取，或者描述为空/占位符，则优先尝试获取
    const shouldFetch = localProblem.needFetch || 
                        !localProblem.description || 
                        localProblem.description.includes('加载中') ||
                        localProblem.description.includes('若网络可用');
    
    this.cache[problemId] = localProblem;

    // 后台尝试从洛谷获取真实题目
    if (shouldFetch) {
      this.fetchFromLuogu(problemId).then(problem => {
        if (problem) {
          this.cache[problemId] = problem;
          console.log(`已获取题目 ${problemId} 的真实数据`);
        }
      }).catch(error => {
        console.warn('从洛谷获取失败，使用本地数据:', error);
      });
    }

    return localProblem;
  },

  // 重试加载（供UI调用）
  async retryLoad(problemId) {
    delete this.cache[problemId];
    console.log(`正在重新加载题目 ${problemId}...`);
    const problem = await this.fetchFromLuogu(problemId);
    if (problem) {
      this.cache[problemId] = problem;
      return { success: true, problem };
    }
    return { success: false };
  },

  // 从洛谷获取题目数据
  async fetchFromLuogu(problemId) {
    // 策略1: 优先尝试洛谷 JSON API（_contentOnly=1，返回结构化数据）
    const jsonResult = await this.tryJsonApi(problemId);
    if (jsonResult) return jsonResult;

    // 策略2: 通过CORS代理抓取HTML
    const htmlResult = await this.tryHtmlProxy(problemId);
    if (htmlResult) return htmlResult;

    console.warn(`所有获取方式均失败: ${problemId}`);
    return null;
  },

  // 策略1: 洛谷 JSON API
  async tryJsonApi(problemId) {
    const apiUrl = `https://www.luogu.com.cn/problem/${problemId}?_contentOnly=1`;

    // 多个CORS代理，按优先级排序
    const proxies = [
      { url: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`, name: 'allorigins' },
      { url: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, name: 'codetabs' },
      { url: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, name: 'corsproxy.io' },
      { url: (u) => `https://cors-anywhere.herokuapp.com/${u}`, name: 'cors-anywhere' },
      { url: (u) => `https://proxy.cors.sh/${u}`, name: 'cors.sh' },
    ];

    for (const proxy of proxies) {
      try {
        const proxyUrl = proxy.url(apiUrl);
        console.log(`[JSON API] 尝试 ${proxy.name}: ${problemId}`);
        const response = await fetch(proxyUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(10000)  // JSON API 更快，10s足够
        });

        if (!response.ok) continue;

        const text = await response.text();
        if (!text || text.length < 200) continue;

        const data = JSON.parse(text);
        const problemData = data.currentData && data.currentData.problem;
        if (!problemData) continue;

        // 解析结构化数据
        return this.parseJsonProblem(problemData, problemId);
      } catch (e) {
        console.warn(`[JSON API] ${proxy.name} 失败:`, e.message);
        continue;
      }
    }
    return null;
  },

  // 解析 JSON API 返回的题目数据
  parseJsonProblem(problemData, problemId) {
    const title = problemData.title || `题目 ${problemId}`;

    // 难度映射（洛谷官方：0=未评定, 1=入门, 2=普及-, 3=普及, 4=普及+, 5=提高-, 6=提高, 7=省选-/NOI/CTSC）
    const diffMap = { 0: 1, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 };
    let difficulty = diffMap[problemData.difficulty] || 3;
    
    // 确保难度在有效范围内
    if (difficulty < 1) difficulty = 1;
    if (difficulty > 7) difficulty = 7;

    // 组合描述
    let description = '';
    if (problemData.background && problemData.background.trim()) {
      description += problemData.background.trim() + '\n\n';
    }
    if (problemData.description && problemData.description.trim()) {
      description += problemData.description.trim();
    }
    if (problemData.inputFormat && problemData.inputFormat.trim()) {
      description += '\n\n**输入格式：**\n' + problemData.inputFormat.trim();
    }
    if (problemData.outputFormat && problemData.outputFormat.trim()) {
      description += '\n\n**输出格式：**\n' + problemData.outputFormat.trim();
    }

    // 样例
    const samples = [];
    if (problemData.samples && Array.isArray(problemData.samples)) {
      for (const s of problemData.samples) {
        samples.push({
          input: (s[0] || '').trim(),
          output: (s[1] || '').trim()
        });
      }
    }

    // 数据范围与提示
    let constraints = '';
    if (problemData.hint && problemData.hint.trim()) {
      constraints += problemData.hint.trim();
    }
    if (problemData.limits) {
      if (problemData.limits.time && problemData.limits.time.length > 0) {
        constraints += `\n时间限制：${problemData.limits.time[0]}ms`;
      }
      if (problemData.limits.memory && problemData.limits.memory.length > 0) {
        constraints += `\n内存限制：${problemData.limits.memory[0]}KB`;
      }
    }
    if (!constraints) constraints = '详见洛谷题目页面';

    return {
      id: problemId,
      title: title,
      difficulty: difficulty,
      description: description.trim() || `洛谷题目 ${problemId}。请在洛谷查看完整题目描述。`,
      samples: samples,
      constraints: constraints,
      fromLuogu: true
    };
  },

  // 策略2: CORS代理 + HTML解析（兜底方案）
  async tryHtmlProxy(problemId) {
    const url = `https://www.luogu.com.cn/problem/${problemId}`;
    const proxies = [
      { url: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, name: 'codetabs' },
      { url: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, name: 'corsproxy.io' },
      { url: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`, name: 'allorigins' },
    ];

    for (const proxy of proxies) {
      try {
        const proxyUrl = proxy.url(url);
        console.log(`[HTML Proxy] 尝试 ${proxy.name}: ${problemId}`);
        const response = await fetch(proxyUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: AbortSignal.timeout(12000)
        });

        if (!response.ok) continue;

        const html = await response.text();
        if (!html || html.length < 500) continue;

        return this.parseLuoguHTML(html, problemId);
      } catch (e) {
        console.warn(`[HTML Proxy] ${proxy.name} 失败:`, e.message);
        continue;
      }
    }
    return null;
  },

  // 解析洛谷HTML
  parseLuoguHTML(html, problemId) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const titleEl = doc.querySelector('h1') || doc.querySelector('.problem-title');
      const title = titleEl ? titleEl.textContent.trim() : `题目 ${problemId}`;

      let difficulty = 3;
      const difficultyEl = doc.querySelector('.difficulty-indicator') ||
                           doc.querySelector('[class*="difficulty"]') ||
                           doc.querySelector('[class*="tag"]');
      if (difficultyEl) {
        const diffMatch = (difficultyEl.textContent || '').match(/(\d+)/);
        if (diffMatch) {
          difficulty = parseInt(diffMatch[1]);
          // 确保难度在有效范围内
          if (difficulty < 1) difficulty = 1;
          if (difficulty > 7) difficulty = 7;
        }
      }

      // 提取题目描述（从JSON数据或meta标签）
      let description = '';
      
      // 尝试从script标签中的JSON数据提取
      const scriptRegex = /<script[^>]*>window\._server_data\s*=\s*({[\s\S]*?})<\/script>/i;
      const scriptMatch = html.match(scriptRegex);
      if (scriptMatch) {
        try {
          const serverData = JSON.parse(scriptMatch[1]);
          const pd = serverData.currentData && serverData.currentData.problem;
          if (pd) {
            if (pd.background && pd.background.trim()) {
              description += pd.background.trim() + '\n\n';
            }
            if (pd.description && pd.description.trim()) {
              description += pd.description.trim();
            }
            if (pd.inputFormat && pd.inputFormat.trim()) {
              description += '\n\n**输入格式：**\n' + pd.inputFormat.trim();
            }
            if (pd.outputFormat && pd.outputFormat.trim()) {
              description += '\n\n**输出格式：**\n' + pd.outputFormat.trim();
            }
          }
        } catch (e) {
          // JSON解析失败，继续用其他方法
        }
      }
      
      // 如果script中没有，尝试从DOM提取
      if (!description) {
        const contentEl = doc.querySelector('#app') || doc.querySelector('main') || doc.querySelector('article');
        if (contentEl) {
          description = contentEl.textContent.trim().substring(0, 5000);
        }
      }
      
      if (!description) {
        description = `洛谷题目 ${problemId}。请在洛谷查看完整题目描述。`;
      }

      // 提取样例（从pre标签或JSON数据）
      const samples = [];
      
      // 先从script JSON提取样例
      if (scriptMatch) {
        try {
          const serverData = JSON.parse(scriptMatch[1]);
          const pd = serverData.currentData && serverData.currentData.problem;
          if (pd && pd.samples && Array.isArray(pd.samples)) {
            for (const s of pd.samples) {
              samples.push({
                input: (s[0] || '').trim(),
                output: (s[1] || '').trim()
              });
            }
          }
        } catch (e) {}
      }
      
      // 如果没有从JSON获取到，尝试从HTML提取
      if (samples.length === 0) {
        const sampleRegex = /样例(?:\s*\d+)?[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/gi;
        const preMatches = [];
        let match;
        while ((match = sampleRegex.exec(html)) !== null) {
          preMatches.push(match[1].replace(/<[^>]+>/g, '').trim());
        }
        for (let i = 0; i < preMatches.length - 1; i += 2) {
          samples.push({ input: preMatches[i], output: preMatches[i + 1] || '' });
        }
      }

      // 提取数据范围
      let constraints = '';
      if (scriptMatch) {
        try {
          const serverData = JSON.parse(scriptMatch[1]);
          const pd = serverData.currentData && serverData.currentData.problem;
          if (pd) {
            if (pd.hint && pd.hint.trim()) {
              constraints += pd.hint.trim();
            }
            if (pd.limits) {
              if (pd.limits.time && pd.limits.time.length > 0) {
                constraints += `\n时间限制：${pd.limits.time[0]}ms`;
              }
              if (pd.limits.memory && pd.limits.memory.length > 0) {
                constraints += `\n内存限制：${pd.limits.memory[0]}KB`;
              }
            }
          }
        } catch (e) {}
      }
      if (!constraints) constraints = '详见洛谷题目页面';

      return {
        id: problemId,
        title: title,
        difficulty: difficulty,
        description: description,
        samples: samples,
        constraints: constraints,
        fromLuogu: true
      };
    } catch (error) {
      console.error('解析HTML失败:', error);
      return null;
    }
  },

  // 本地题目数据（备用缓存）
  getLocalProblem(problemId) {
    if (typeof window !== 'undefined' && window.PROBLEM_CACHE && window.PROBLEM_CACHE[problemId]) {
      return window.PROBLEM_CACHE[problemId];
    }
    const localProblems = {
      // === 搜索 ===
      'P1706': {
        id: 'P1706', title: '全排列问题', difficulty: 1,
        description: '按照字典序输出自然数 1 到 n 的所有排列。\n\n**题目描述：**\n给定一个整数 n，输出 1 到 n 的全排列，按字典序排列。\n\n**输入格式：**\n一个整数 n（1 ≤ n ≤ 9）。\n\n**输出格式：**\n每行一个排列，数字之间用空格隔开。',
        samples: [{ input: '3', output: '1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1' }],
        constraints: '1 ≤ n ≤ 9'
      },
      'P1219': {
        id: 'P1219', title: '八皇后', difficulty: 2,
        description: '在 8×8 的国际象棋棋盘上放置 8 个皇后，使得它们互不攻击。\n\n**题目描述：**\n在 8×8 棋盘上放置 8 个皇后，要求任意两个皇后不在同一行、同一列、同一对角线上。输出前 3 个解和总方案数。\n\n**输入格式：**\n无输入。\n\n**输出格式：**\n前三行每行一个方案（8个数字表示每行皇后的列号），第四行方案总数。',
        samples: [],
        constraints: '棋盘大小为 6×6 至 13×13（n 由输入指定）'
      },
      'P1019': {
        id: 'P1019', title: '单词接龙', difficulty: 3,
        description: '给定一组单词和一个开头字母，找出最长的"龙"。\n\n**题目描述：**\n单词接龙是一个游戏。给定一组单词和一个开头字母，找出一个最长的"龙"：每个单词最多用两次，相邻两个单词有公共部分（重叠部分），且重叠部分不能是包含关系。\n\n**输入格式：**\n第一行 n（单词数）。接下来 n 行每行一个单词。最后一行一个字母（开头字母）。\n\n**输出格式：**\n一个整数，最长"龙"的长度。',
        samples: [{ input: '5\nat\ntouch\ncheat\nchoose\ntact\na', output: '23' }],
        constraints: 'n ≤ 20，单词长度不超过 20'
      },
      'P1605': {
        id: 'P1605', title: '迷宫', difficulty: 2,
        description: '给定一个 N×M 的迷宫，求从起点到终点的路径方案数。\n\n**题目描述：**\n迷宫中有障碍物，求从起点到终点有多少条不同的路径。\n\n**输入格式：**\n第一行 N M T（T为障碍数）。第二行起点坐标 SX SY，第三行终点坐标 FX FY。接下来 T 行每行一个障碍坐标。\n\n**输出格式：**\n方案总数。',
        samples: [{ input: '2 2 1\n1 1\n2 2\n1 2', output: '1' }],
        constraints: 'N, M ≤ 5'
      },
      'P1101': {
        id: 'P1101', title: '单词方阵', difficulty: 2,
        description: '在一个 n×n 的字母方阵中查找单词"yizhong"，将找到的单词用特殊标记标出。\n\n**题目描述：**\n给一 n×n 的字母方阵，内可能蕴含多个"yizhong"单词。单词在方阵中是沿同一方向连续排列的。将找到的单词标出。\n\n**输入格式：**\n第一行一个数 n。以下 n×n 的字母矩阵。\n\n**输出格式：**\nn×n 矩阵，找到的字母原样输出，没找到的输出 *。',
        samples: [],
        constraints: 'n ≤ 100'
      },
      'P1596': {
        id: 'P1596', title: 'Lake Counting S', difficulty: 2,
        description: '计算八连通的水洼数量。\n\n**题目描述：**\n有一块 N×M 的土地，雨后积起了水。\\\'W\\\'代表积水，\\\'.\\\'代表干燥。八个方向连通算作一个水洼。求水洼数量。\n\n**输入格式：**\n第一行 N M。接下来 N 行 M 列字符。\n\n**输出格式：**\n水洼数量。',
        samples: [{ input: '10 12\nW........WW.\n.WWW.....WWW\n....WW...WW.\n.........WW.\n.........W..\n..W......W..\n.W.W.....WW.\nW.W.W.....W.\n.W.W......W.\n..W.......W.', output: '3' }],
        constraints: 'N, M ≤ 100'
      },
      'P1025': {
        id: 'P1025', title: '数的划分', difficulty: 3,
        description: '将整数 n 分成 k 份，且每份不能为空，任意两份不能相同。\n\n**题目描述：**\n将整数 n 分成 k 份，且每份不能为空，任意两种方案不能相同（不考虑顺序）。求不同的分法数量。\n\n**输入格式：**\n一行两个整数 n, k。\n\n**输出格式：**\n一个整数，不同的分法数。',
        samples: [{ input: '7 3', output: '4' }],
        constraints: '6 < n ≤ 200，2 ≤ k ≤ 6'
      },
      'P1030': {
        id: 'P1030', title: '求先序排列', difficulty: 2,
        description: '给出一棵二叉树的中序和后序遍历，求其先序遍历。\n\n**输入格式：**\n两行，第一行中序遍历字符串，第二行后序遍历字符串。\n\n**输出格式：**\n先序遍历字符串。',
        samples: [{ input: 'BADC\nBDCA', output: 'ABCD' }],
        constraints: '节点数不超过 8'
      },
      'P1092': {
        id: 'P1092', title: '虫食算', difficulty: 5,
        description: '给出一个 N 进制的加法竖式，其中一些数字被虫子吃掉，求原来的竖式。\n\n**题目描述：**\n所谓虫食算，就是原先的算式中有一部分被虫子啃掉了，需要根据剩下的数字来判定被啃掉的字母。\n\n**输入格式：**\n第一行 N（进制）。接下来三行，每行一个 N 位的字符串，表示加数、被加数与和。\n\n**输出格式：**\n一行 N 个数字，表示字母 A,B,C... 对应的数字。',
        samples: [],
        constraints: 'N ≤ 26'
      },
      'P1443': {
        id: 'P1443', title: '马的遍历', difficulty: 2,
        description: 'n×m 的棋盘，马从 (x,y) 出发，求到达每个格子的最少步数。\n\n**输入格式：**\nn m x y\n\n**输出格式：**\nn×m 矩阵，每格最少步数（左对齐 5 格宽），无法到达输出 -1。',
        samples: [{ input: '3 3 1 1', output: '0    3    2\n3    -1   1\n2    1    4' }],
        constraints: '1 ≤ n, m ≤ 400'
      },
      'P1162': {
        id: 'P1162', title: '填涂颜色', difficulty: 2,
        description: '由 0 和 1 组成的方阵，被 1 包围的 0 区域改成 2。\n\n**输入格式：**\n第一行 n。接下来 n×n 的 0-1 矩阵。\n\n**输出格式：**\n填涂后的矩阵。',
        samples: [],
        constraints: 'n ≤ 30'
      },
      'P1036': {
        id: 'P1036', title: '选数', difficulty: 2,
        description: '从 n 个整数中任选 k 个相加，和为素数的选法有多少种。\n\n**输入格式：**\n第一行 n k。第二行 n 个整数。\n\n**输出格式：**\n一个整数，方案数。',
        samples: [{ input: '4 3\n3 7 12 19', output: '1' }],
        constraints: 'n ≤ 20，每个数 ≤ 5×10^6'
      },

      // === BFS ===
      'P1032': {
        id: 'P1032', title: '字串变换', difficulty: 3,
        description: '给定字符串 A、B 和变换规则，求从 A 到 B 的最少步数。\n\n**输入格式：**\n第一行 A B。接下来每行两个字符串表示规则。\n\n**输出格式：**\n最少步数或 "NO ANSWER!"。',
        samples: [{ input: 'abcd xyz\nabc xu\nud y\ny yz', output: '3' }],
        constraints: '字符串长度 ≤ 20，规则 ≤ 6'
      },
      'P1141': {
        id: 'P1141', title: '01迷宫', difficulty: 3,
        description: 'n×n 的 01 格子，从 (i,j) 出发只能走到不同数字的相邻格，求能到达的格子数。\n\n**输入格式：**\n第一行 n m。接下来 n×n 的 01 矩阵，最后 m 行每行一个询问坐标。\n\n**输出格式：**\nm 行，每行答案。',
        samples: [],
        constraints: 'n ≤ 1000，m ≤ 100000'
      },
      'P1332': {
        id: 'P1332', title: '血色先锋队', difficulty: 3,
        description: '多个起点同时BFS扩散，求每个目标点被覆盖的最早时间。\n\n**输入格式：**\n第一行 N M A B（矩阵大小、起点数、目标数）。接下来 A 行起点坐标。接下来 B 行目标坐标。\n\n**输出格式：**\nB 行，每个目标点的最早时间。',
        samples: [],
        constraints: 'N, M ≤ 500'
      },
      'P1126': {
        id: 'P1126', title: '机器人搬重物', difficulty: 4,
        description: '机器人携带重物在网格中移动，带方向的最短路。\n\n**输入格式：**\n第一行 N M。接下来 N 行 M 列网格（0空地/1障碍）。最后一行起点坐标+方向 终点坐标。\n\n**输出格式：**\n最少步数或 -1。',
        samples: [],
        constraints: 'N, M ≤ 50'
      },
      'P2895': {
        id: 'P2895', title: 'Meteor Shower S', difficulty: 3,
        description: '流星雨砸下，求贝茜到达安全位置的最早时间。\n\n**输入格式：**\n第一行 M（流星数）。接下来 M 行每行 xi yi ti。\n\n**输出格式：**\n最短时间或 -1。',
        samples: [],
        constraints: 'M ≤ 50000，0 ≤ xi, yi ≤ 300'
      },
      'P1379': {
        id: 'P1379', title: '八数码难题', difficulty: 4,
        description: '3×3 的棋盘上 1-8 和一个空格，求从初始状态到目标状态的最少步数。\n\n**输入格式：**\n一行 9 个数字（0 表示空格），初始状态。\n\n**输出格式：**\n最少步数。',
        samples: [{ input: '283104765', output: '4' }],
        constraints: '保证有解'
      },
      'P1902': {
        id: 'P1902', title: '刺杀大使', difficulty: 5,
        description: 'n×m 矩阵，每格有伤害值，找一条从第一行到最后一行的路径使路径上最大伤害最小。\n\n**输入格式：**\n第一行 n m。接下来 n×m 矩阵。\n\n**输出格式：**\n路径上最大伤害的最小值。',
        samples: [],
        constraints: 'n, m ≤ 1000'
      },
      'P3916': {
        id: 'P3916', title: '图的遍历', difficulty: 3,
        description: '求有向图中每个点能到达的编号最大的点。\n\n**输入格式：**\n第一行 N M。接下来 M 行 u v。\n\n**输出格式：**\nN 个整数。',
        samples: [],
        constraints: 'N, M ≤ 100000'
      },

      // === DP 基础 ===
      'P1048': {
        id: 'P1048', title: '采药', difficulty: 2,
        description: '在 T 时间内采集总价值最大的草药。\n\n**输入格式：**\n第一行 T M。接下来 M 行每行时间 价值。\n\n**输出格式：**\n最大总价值。',
        samples: [{ input: '70 3\n71 100\n69 1\n1 2', output: '3' }],
        constraints: 'T ≤ 1000，M ≤ 100'
      },
      'P1049': {
        id: 'P1049', title: '装箱问题', difficulty: 2,
        description: '将 n 个物品装入容量 V 的箱子，使剩余空间最小。\n\n**输入格式：**\n第一行 V。第二行 n。接下来 n 行每行体积。\n\n**输出格式：**\n最小剩余空间。',
        samples: [{ input: '24\n6\n8\n3\n12\n7\n9\n7', output: '0' }],
        constraints: 'V ≤ 20000，n ≤ 30'
      },
      'P1060': {
        id: 'P1060', title: '开心的金明', difficulty: 2,
        description: '在 N 元预算内，买物品使（价格×重要度）之和最大。\n\n**输入格式：**\n第一行 N m。接下来 m 行每行 v p（价格 重要度）。\n\n**输出格式：**\n最大总和。',
        samples: [],
        constraints: 'N < 30000，m < 25'
      },
      'P1064': {
        id: 'P1064', title: '金明的预算方案', difficulty: 4,
        description: '有主件和附件的背包问题。必须先买主件才能买附件。\n\n**输入格式：**\n第一行 N m。接下来 m 行每行 v p q。\n\n**输出格式：**\n最大总和。',
        samples: [],
        constraints: 'N < 32000，m < 60'
      },
      'P1020': {
        id: 'P1020', title: '导弹拦截', difficulty: 3,
        description: '最长不上升子序列 + Dilworth 定理。\n\n**输入格式：**\n一行整数（导弹高度）。\n\n**输出格式：**\n第一行最多拦截数，第二行最少系统数。',
        samples: [{ input: '389 207 155 300 299 170 158 65', output: '6\n2' }],
        constraints: '导弹数 ≤ 100000'
      },
      'P1091': {
        id: 'P1091', title: '合唱队形', difficulty: 3,
        description: 'N 位同学排队，求最少出列人数使剩下同学身高先增后减。\n\n**输入格式：**\n第一行 N。第二行 N 个身高。\n\n**输出格式：**\n最少出列人数。',
        samples: [{ input: '8\n186 186 150 200 160 130 197 220', output: '4' }],
        constraints: 'N ≤ 100'
      },
      'P1108': {
        id: 'P1108', title: '低价购买', difficulty: 3,
        description: '求最长下降子序列长度以及长度为该长度的不同方案数。\n\n**输入格式：**\n第一行 N。第二行 N 个价格。\n\n**输出格式：**\n两个整数。',
        samples: [],
        constraints: 'N ≤ 5000'
      },
      'P1140': {
        id: 'P1140', title: '相似基因', difficulty: 3,
        description: '两个基因序列对齐，匹配/插入空格得不同分值，求最大相似度。\n\n**输入格式：**\n第一行 len1 seq1。第二行 len2 seq2。\n\n**输出格式：**\n最大相似度。',
        samples: [{ input: '7 AGTGATG\n5 GTTAG', output: '14' }],
        constraints: '长度 ≤ 100'
      },
      'P1156': {
        id: 'P1156', title: '垃圾陷阱', difficulty: 4,
        description: '奶牛掉进垃圾井，每个垃圾可以吃（增加生命）或垫高。求最早逃生时间或最长存活时间。\n\n**输入格式：**\n第一行 D G。接下来 G 行每行 t f h。\n\n**输出格式：**\n最早逃生时间或最长存活时间。',
        samples: [],
        constraints: 'D ≤ 100，G ≤ 100'
      },
      'P1077': {
        id: 'P1077', title: '摆花', difficulty: 2,
        description: '共 m 个位置，每种花有数量上限，求不同搭配方案数。\n\n**输入格式：**\n第一行 n m。第二行 n 个整数（每种花上限）。\n\n**输出格式：**\n方案数 mod 1000007。',
        samples: [],
        constraints: 'n, m ≤ 100'
      },
      'P1164': {
        id: 'P1164', title: '小A点菜', difficulty: 2,
        description: '有 M 元，N 道菜各有价格，求刚好花完钱的方案数。\n\n**输入格式：**\n第一行 N M。第二行 N 个价格。\n\n**输出格式：**\n方案数。',
        samples: [{ input: '4 4\n1 1 2 2', output: '3' }],
        constraints: 'N ≤ 100，M ≤ 10000'
      },
      'P1314': {
        id: 'P1314', title: '聪明的质监员', difficulty: 5,
        description: '选参数 W 使矿石检验结果与标准值最接近。二分+前缀和。\n\n**输入格式：**\n第一行 n m S。接下来 n 行 w v。接下来 m 行 li ri。\n\n**输出格式：**\n最小差值。',
        samples: [],
        constraints: 'n, m ≤ 200000'
      },
      'P1002': {
        id: 'P1002', title: '过河卒', difficulty: 2,
        description: '棋盘 A 到 B，马在 C 点挡住，求路径数。\n\n**输入格式：**\nB坐标 C坐标。\n\n**输出格式：**\n路径条数。',
        samples: [{ input: '6 6 3 3', output: '6' }],
        constraints: '坐标 ≤ 20'
      },
      'P1616': {
        id: 'P1616', title: '疯狂的采药', difficulty: 2,
        description: '完全背包。每种草药无限采，T 时间内最大价值。\n\n**输入格式：**\n第一行 T M。接下来 M 行每行时间 价值。\n\n**输出格式：**\n最大价值。',
        samples: [],
        constraints: 'T ≤ 10^7，M ≤ 10000'
      },
      'P1855': {
        id: 'P1855', title: '榨取kkksc03', difficulty: 3,
        description: '二维费用背包。\n\n**输入格式：**\nn M T。接下来 n 行每行 mi ti。\n\n**输出格式：**\n最大愿望数。',
        samples: [],
        constraints: 'n ≤ 100'
      },

      // === 字符串 ===
      'P3370': {
        id: 'P3370', title: '【模板】字符串哈希', difficulty: 2,
        description: '如题，给定 N 个字符串，求其中不同的字符串数量。\n\n**输入格式：**\n第一行 N。接下来 N 行每行一个字符串。\n\n**输出格式：**\n不同字符串数。',
        samples: [{ input: '5\nabc\naaaa\nabc\nabcc\n12345', output: '4' }],
        constraints: 'N ≤ 10000，长度 ≤ 1500'
      },
      'P3375': {
        id: 'P3375', title: '【模板】KMP', difficulty: 2,
        description: '给出两个字符串 s1 和 s2，输出 s2 在 s1 中所有出现位置。\n\n**输入格式：**\n两行字符串。\n\n**输出格式：**\n所有起始位置（从1开始），最后一行输出 border 数组。',
        samples: [{ input: 'ABABABC\nABA', output: '1\n3\n0 0 1' }],
        constraints: '长度 ≤ 10^6'
      },
      'P3805': {
        id: 'P3805', title: '【模板】manacher 算法', difficulty: 2,
        description: '求字符串的最长回文子串长度。\n\n**输入格式：**\n一行字符串。\n\n**输出格式：**\n最长回文子串长度。',
        samples: [{ input: 'aaa', output: '3' }],
        constraints: '长度 ≤ 1.1×10^7'
      },
      'P4555': {
        id: 'P4555', title: '最长双回文串', difficulty: 4,
        description: '求由两个回文串拼接而成的最长子串长度。\n\n**输入格式：**\n一行字符串 S。\n\n**输出格式：**\n最长双回文串长度。',
        samples: [{ input: 'baacaabbacabb', output: '12' }],
        constraints: '|S| ≤ 10^5'
      },
      'P2580': {
        id: 'P2580', title: '于是他错误的点名开始了', difficulty: 1,
        description: 'Trie树入门。老师点名，判断名字是第一次、重复还是不存在。\n\n**输入格式：**\n第一行 N。接下来 N 行名字。第 N+2 行 M。接下来 M 行名字。\n\n**输出格式：**\nM 行，OK/REPEAT/WRONG。',
        samples: [],
        constraints: 'N ≤ 10000，M ≤ 100000'
      },

      // === 图论 ===
      'P3366': {
        id: 'P3366', title: '【模板】最小生成树', difficulty: 2,
        description: '如题，给出一个无向图，求出最小生成树的边权和，若不连通输出 orz。\n\n**输入格式：**\n第一行 N M。接下来 M 行 u v w。\n\n**输出格式：**\n边权和或 orz。',
        samples: [{ input: '4 5\n1 2 2\n1 3 2\n1 4 3\n2 3 4\n3 4 3', output: '7' }],
        constraints: 'N ≤ 5000，M ≤ 200000'
      },
      'P3371': {
        id: 'P3371', title: '【模板】单源最短路径', difficulty: 3,
        description: '求有向图中从起点到所有点的最短路径。\n\n**输入格式：**\n第一行 N M S。接下来 M 行 u v w。\n\n**输出格式：**\nN 个整数，最短路径，不可达输出 2^31-1。',
        samples: [{ input: '4 6 1\n1 2 2\n2 3 2\n2 4 1\n1 3 5\n3 4 3\n1 4 4', output: '0 2 4 3' }],
        constraints: 'N ≤ 10000，M ≤ 500000'
      },
      'P4779': {
        id: 'P4779', title: '【模板】单源最短路径（标准版）', difficulty: 3,
        description: 'Dijkstra 堆优化模板。\n\n**输入格式：**\n第一行 n m s。接下来 m 行 u v w（w ≥ 0）。\n\n**输出格式：**\nn 个整数，最短距离。',
        samples: [],
        constraints: 'n ≤ 10^5，m ≤ 2×10^5'
      },
      'P3385': {
        id: 'P3385', title: '【模板】负环', difficulty: 3,
        description: '判断图中是否存在负环。\n\n**输入格式：**\n第一行 T（测试组数）。每组：第一行 n m。接下来 m 行 u v w。\n\n**输出格式：**\n每组输出 YES 或 NO。',
        samples: [],
        constraints: 'n ≤ 2000，m ≤ 3000'
      },
      'P1525': {
        id: 'P1525', title: '关押罪犯', difficulty: 4,
        description: '二分图判定 / 并查集。将罪犯分到两个监狱使最大冲突值最小。\n\n**输入格式：**\n第一行 N M。接下来 M 行 a b c。\n\n**输出格式：**\n最小冲突值。',
        samples: [],
        constraints: 'N ≤ 20000，M ≤ 100000'
      },
      'P2742': {
        id: 'P2742', title: '【模板】二维凸包', difficulty: 4,
        description: '给定平面上 n 个点，求凸包的周长。\n\n**输入格式：**\n第一行 n。接下来 n 行 x y。\n\n**输出格式：**\n周长（保留两位小数）。',
        samples: [],
        constraints: 'n ≤ 10000'
      },
      'P3388': {
        id: 'P3388', title: '【模板】割点（割顶）', difficulty: 3,
        description: '给出一个无向图，求所有割点。\n\n**输入格式：**\n第一行 n m。接下来 m 行 u v。\n\n**输出格式：**\n第一行割点数。第二行割点编号（升序）。',
        samples: [{ input: '6 7\n1 2\n1 3\n1 4\n2 5\n3 5\n4 5\n5 6', output: '1\n5' }],
        constraints: 'n ≤ 20000，m ≤ 100000'
      },
      'P3387': {
        id: 'P3387', title: '【模板】缩点', difficulty: 4,
        description: '给定有向图，求一条路径使点权和最大（每个点多条边）。Tarjan缩点+DP。\n\n**输入格式：**\n第一行 n m。第二行 n 个点权。接下来 m 行 u v。\n\n**输出格式：**\n最大点权和。',
        samples: [],
        constraints: 'n ≤ 10^4，m ≤ 10^5'
      },
      'P3865': {
        id: 'P3865', title: '【模板】ST 表', difficulty: 2,
        description: '静态区间最大值查询。\n\n**输入格式：**\n第一行 N M。第二行 N 个数。接下来 M 行 l r。\n\n**输出格式：**\nM 行，每行区间最大值。',
        samples: [],
        constraints: 'N ≤ 10^5，M ≤ 2×10^6'
      },
      'P1886': {
        id: 'P1886', title: '滑动窗口 /【模板】单调队列', difficulty: 3,
        description: '求长度为 k 的滑动窗口中的最小值和最大值。\n\n**输入格式：**\n第一行 n k。第二行 n 个整数。\n\n**输出格式：**\n两行，每行 n-k+1 个数。',
        samples: [],
        constraints: 'n ≤ 10^6'
      },
      'P5788': {
        id: 'P5788', title: '【模板】单调栈', difficulty: 2,
        description: '求每个元素之后第一个大于它的元素下标（没有则为0）。\n\n**输入格式：**\n第一行 n。第二行 n 个整数。\n\n**输出格式：**\nn 个整数。',
        samples: [],
        constraints: 'n ≤ 3×10^6'
      },
      'P3811': {
        id: 'P3811', title: '【模板】乘法逆元', difficulty: 2,
        description: '给定 n 和质数 p，求 1 到 n 模 p 的乘法逆元。\n\n**输入格式：**\n一行 n p。\n\n**输出格式：**\nn 行。',
        samples: [],
        constraints: 'n ≤ 3×10^6'
      },
      'P3803': {
        id: 'P3803', title: '【模板】多项式乘法（FFT）', difficulty: 4,
        description: '给定 n 次多项式 F 和 m 次多项式 G，求 F*G。\n\n**输入格式：**\n第一行 n m。接下来两行系数。\n\n**输出格式：**\n一行 n+m+1 个系数。',
        samples: [],
        constraints: 'n, m ≤ 10^6'
      },
      'P3390': {
        id: 'P3390', title: '【模板】矩阵快速幂', difficulty: 2,
        description: '给定 n×n 矩阵 A，求 A^k。\n\n**输入格式：**\n第一行 n k。接下来 n×n 个整数。\n\n**输出格式：**\n矩阵（模 10^9+7）。',
        samples: [],
        constraints: 'n ≤ 100，k ≤ 10^12'
      },
      'P3372': {
        id: 'P3372', title: '【模板】线段树 1', difficulty: 2,
        description: '区间加、区间求和。\n\n**输入格式：**\n第一行 n m。第二行 n 个数。接下来 m 行操作（1 l r k 或 2 l r）。\n\n**输出格式：**\n每个询问一行。',
        samples: [],
        constraints: 'n, m ≤ 10^5'
      },
      'P3373': {
        id: 'P3373', title: '【模板】线段树 2', difficulty: 3,
        description: '区间加、区间乘、区间求和。\n\n**输入格式：**\n第一行 n m p。第二行 n 个数。接下来 m 行操作。\n\n**输出格式：**\n询问答案（模 p）。',
        samples: [],
        constraints: 'n, m ≤ 10^5'
      },
      'P3369': {
        id: 'P3369', title: '【模板】普通平衡树', difficulty: 4,
        description: '二叉搜索树模板：插入、删除、排名、第k小、前驱、后继。\n\n**输入格式：**\n第一行 n。接下来 n 行 opt x。\n\n**输出格式：**\n3/4/5/6操作的结果。',
        samples: [],
        constraints: 'n ≤ 10^5'
      },
      'P3384': {
        id: 'P3384', title: '【模板】树链剖分', difficulty: 4,
        description: '树上路径/子树修改与查询。\n\n**输入格式：**\n第一行 n m r p。接下来各种操作。\n\n**输出格式：**\n询问答案（模 p）。',
        samples: [],
        constraints: 'n, m ≤ 10^5'
      },
      'P3379': {
        id: 'P3379', title: '【模板】最近公共祖先（LCA）', difficulty: 2,
        description: '倍增法求树上两点 LCA。\n\n**输入格式：**\n第一行 N M S。接下来 N-1 行 x y。接下来 M 行 a b。\n\n**输出格式：**\nM 行 LCA。',
        samples: [],
        constraints: 'N ≤ 500000，M ≤ 500000'
      },
      'P3834': {
        id: 'P3834', title: '【模板】可持久化线段树 1（主席树）', difficulty: 4,
        description: '静态区间第 k 小。\n\n**输入格式：**\n第一行 n m。第二行 n 个数。接下来 m 行 l r k。\n\n**输出格式：**\nm 行答案。',
        samples: [],
        constraints: 'n, m ≤ 200000'
      },
      'P3810': {
        id: 'P3810', title: '【模板】三维偏序（陌上花开）', difficulty: 5,
        description: 'CDQ分治模板。有 n 个元素，第 i 个元素有 ai, bi, ci。求每个元素的偏序计数。\n\n**输入格式：**\n第一行 n k。接下来 n 行 a b c。\n\n**输出格式：**\nn 行。',
        samples: [],
        constraints: 'n ≤ 10^5，k ≤ 200000'
      },
      'P3382': {
        id: 'P3382', title: '【模板】三分法', difficulty: 2,
        description: '给出 N 次多项式，在 [l, r] 上求极值点。\n\n**输入格式：**\n第一行 N l r。第二行 N+1 个系数。\n\n**输出格式：**\n极值点 x（保留 5 位小数）。',
        samples: [],
        constraints: 'N ≥ 2'
      },
      'P4525': {
        id: 'P4525', title: '【模板】自适应辛普森法 1', difficulty: 4,
        description: '计算定积分。\n\n**输入格式：**\n一行 a b c d L R。\n\n**输出格式：**\n积分值（保留 6 位小数）。',
        samples: [],
        constraints: ''
      },
      'P4777': {
        id: 'P4777', title: '【模板】扩展中国剩余定理（EXCRT）', difficulty: 5,
        description: '求解同余方程组 x ≡ a_i (mod b_i)，模数不一定互质。\n\n**输入格式：**\n第一行 n。接下来 n 行 a_i b_i。\n\n**输出格式：**\n最小非负解。',
        samples: [],
        constraints: 'n ≤ 10^5'
      },
      'P3389': {
        id: 'P3389', title: '【模板】高斯消元法', difficulty: 4,
        description: '求解 n 元一次方程组。\n\n**输入格式：**\n第一行 n。接下来 n 行 n+1 个数。\n\n**输出格式：**\nn 行解（保留2位小数）或 No Solution。',
        samples: [],
        constraints: 'n ≤ 100'
      },
      'P3381': {
        id: 'P3381', title: '【模板】最小费用最大流', difficulty: 4,
        description: '如题，求最小费用最大流。\n\n**输入格式：**\n第一行 n m s t。接下来 m 行 u v w c。\n\n**输出格式：**\n最大流 最小费用。',
        samples: [],
        constraints: 'n ≤ 5000，m ≤ 50000'
      },
      'P3386': {
        id: 'P3386', title: '【模板】二分图最大匹配', difficulty: 2,
        description: '匈牙利算法模板。\n\n**输入格式：**\n第一行 n m e。接下来 e 行 u v。\n\n**输出格式：**\n最大匹配数。',
        samples: [],
        constraints: 'n, m ≤ 500，e ≤ 50000'
      },
      'P4549': {
        id: 'P4549', title: '【模板】裴蜀定理', difficulty: 2,
        description: '给定 n 个数，求 gcd 的最小正整数线性组合。\n\n**输入格式：**\n第一行 n。第二行 n 个数。\n\n**输出格式：**\n最小正整数。',
        samples: [{ input: '2\n12 8', output: '4' }],
        constraints: 'n ≤ 20'
      },
      'P3374': {
        id: 'P3374', title: '【模板】树状数组 1', difficulty: 2,
        description: '单点修改，区间查询。\n\n**输入格式：**\n第一行 n m。第二行 n 个数。接下来 m 行操作。\n\n**输出格式：**\n询问答案。',
        samples: [],
        constraints: 'n, m ≤ 500000'
      },
      'P3368': {
        id: 'P3368', title: '【模板】树状数组 2', difficulty: 2,
        description: '区间修改，单点查询。\n\n**输入格式：**\n第一行 n m。第二行 n 个数。接下来 m 行操作。\n\n**输出格式：**\n询问答案。',
        samples: [],
        constraints: 'n, m ≤ 500000'
      },
      'P3376': {
        id: 'P3376', title: '【模板】网络最大流', difficulty: 3,
        description: 'Dinic 算法模板。\n\n**输入格式：**\n第一行 n m s t。接下来 m 行 u v w。\n\n**输出格式：**\n最大流。',
        samples: [],
        constraints: 'n ≤ 200，m ≤ 5000'
      },
      'P3808': {
        id: 'P3808', title: '【模板】AC 自动机（简单版）', difficulty: 3,
        description: '给定 n 个模式串和一个文本串，求有多少个模式串在文本串中出现过。\n\n**输入格式：**\n第一行 n。接下来 n 行模式串。最后一行文本串。\n\n**输出格式：**\n出现次数。',
        samples: [],
        constraints: 'n ≤ 10^6'
      },
      'P3383': {
        id: 'P3383', title: '【模板】线性筛素数', difficulty: 2,
        description: '查询第 k 个素数。\n\n**输入格式：**\n第一行 n q。接下来 q 行 k。\n\n**输出格式：**\n第 k 个素数。',
        samples: [],
        constraints: 'n ≤ 10^8，q ≤ 10^6'
      },
      'P1138': {
        id: 'P1138', title: '第 k 小整数', difficulty: 1,
        description: '现有 n 个正整数，要求出这 n 个正整数中的第 k 个最小整数（相同大小的只算一次）。\n\n**输入格式：**\n第一行 n k。第二行 n 个正整数。\n\n**输出格式：**\n第 k 小整数或 NO RESULT。',
        samples: [],
        constraints: 'n ≤ 10000，k ≤ 1000'
      },
      'P1177': {
        id: 'P1177', title: '【模板】排序', difficulty: 1,
        description: '将读入的 N 个数从小到大排序后输出。\n\n**输入格式：**\n第一行 N。第二行 N 个整数。\n\n**输出格式：**\nN 个排序后的整数。',
        samples: [],
        constraints: 'N ≤ 10^5'
      },
      'P1226': {
        id: 'P1226', title: '【模板】快速幂', difficulty: 1,
        description: '求 a^b mod p。\n\n**输入格式：**\n一行 a b p。\n\n**输出格式：**\na^b mod p=s。',
        samples: [{ input: '2 10 9', output: '2^10 mod 9=7' }],
        constraints: 'a, b ≤ 2^31'
      },
      'P1908': {
        id: 'P1908', title: '逆序对', difficulty: 3,
        description: '求一个序列中逆序对的总数。\n\n**输入格式：**\n第一行 n。第二行 n 个数。\n\n**输出格式：**\n逆序对总数。',
        samples: [{ input: '6\n5 4 2 6 3 1', output: '11' }],
        constraints: 'n ≤ 5×10^5'
      },
      'P1434': {
        id: 'P1434', title: '滑雪', difficulty: 3,
        description: '记忆化搜索经典题。矩形区域，可以从一个点滑向上下左右相邻且高度更低的点。求最长滑坡长度。\n\n**输入格式：**\n第一行 R C。接下来 R×C 的高度。\n\n**输出格式：**\n最长长度。',
        samples: [],
        constraints: 'R, C ≤ 100'
      },
    };

    return localProblems[problemId] || {
      id: problemId,
      title: `题目 ${problemId}`,
      difficulty: 3,
      description: '',
      samples: [],
      constraints: '详见洛谷题目页面',
      needFetch: true // 标记需要从洛谷加载
    };
  },

  // 提交代码到洛谷
  submitCode(problemId, code) {
    const url = `https://www.luogu.com.cn/problem/${problemId}#submit`;
    window.open(url, '_blank');
  },

  // 检查是否AC
  checkAC(problemId) {
    return new Promise((resolve) => {
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
