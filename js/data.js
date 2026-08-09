const CHAPTERS = [
  // Part 3 - Search
  {
    id: 'ch3_1',
    title: '3.1 深度优先搜索',
    icon: '🔍',
    description: '通过递归回溯遍历所有可能状态的搜索方法',
    modules: [
      { id: 'ch3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1706' },
      { id: 'ch3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1219' },
      { id: 'ch3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1019' },
      { id: 'ch3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1101' },
      { id: 'ch3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1596' },
      { id: 'ch3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1030' },
      { id: 'ch3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1092' },
      { id: 'ch3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1443' },
      { id: 'ch3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1162' },
      { id: 'ch3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1036' }
    ]
  },
  {
    id: 'ch3_2',
    title: '3.2 广度优先搜索',
    icon: '🌊',
    description: '使用队列逐层扩展搜索空间的遍历方法',
    modules: [
      { id: 'ch3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1443' },
      { id: 'ch3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1032' },
      { id: 'ch3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1141' },
      { id: 'ch3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1332' },
      { id: 'ch3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1126' },
      { id: 'ch3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P2895' },
      { id: 'ch3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1379' },
      { id: 'ch3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1902' },
      { id: 'ch3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P3916' },
      { id: 'ch3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1030' },
      { id: 'ch3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1596' }
    ]
  },
  {
    id: 'ch3_3',
    title: '3.3 记忆化搜索',
    icon: '🧠',
    description: '通过记录已计算状态避免重复搜索的优化方法',
    modules: [
      { id: 'ch3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1048' },
      { id: 'ch3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1049' },
      { id: 'ch3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1060' },
      { id: 'ch3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1064' },
      { id: 'ch3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1091' },
      { id: 'ch3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1108' },
      { id: 'ch3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1020' },
      { id: 'ch3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1077' },
      { id: 'ch3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1164' },
      { id: 'ch3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1314' }
    ]
  },
  {
    id: 'ch3_4',
    title: '3.4 搜索剪枝',
    icon: '✂️',
    description: '通过约束条件提前排除无效分支的搜索优化',
    modules: [
      { id: 'ch3_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1074' },
      { id: 'ch3_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1120' },
      { id: 'ch3_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1158' },
      { id: 'ch3_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1314' },
      { id: 'ch3_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1379' },
      { id: 'ch3_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1443' },
      { id: 'ch3_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1596' },
      { id: 'ch3_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1706' },
      { id: 'ch3_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1902' },
      { id: 'ch3_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P2895' },
      { id: 'ch3_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P3916' }
    ]
  },
  {
    id: 'ch3_5',
    title: '3.5 双向搜索',
    icon: '↔️',
    description: '从起点和终点同时搜索以缩小搜索空间',
    modules: [
      { id: 'ch3_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1379' },
      { id: 'ch3_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1032' },
      { id: 'ch3_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1141' },
      { id: 'ch3_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1596' },
      { id: 'ch3_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1902' },
      { id: 'ch3_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P2895' },
      { id: 'ch3_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P3916' },
      { id: 'ch3_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1706' },
      { id: 'ch3_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1219' },
      { id: 'ch3_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1019' },
      { id: 'ch3_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1101' }
    ]
  },
  {
    id: 'ch3_6',
    title: '3.6 A* 搜索',
    icon: '⭐',
    description: '使用启发函数引导搜索方向的最优搜索算法',
    modules: [
      { id: 'ch3_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P1379' },
      { id: 'ch3_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P1032' },
      { id: 'ch3_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P1141' },
      { id: 'ch3_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P1332' },
      { id: 'ch3_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P2895' },
      { id: 'ch3_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P1902' },
      { id: 'ch3_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P3916' },
      { id: 'ch3_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P1706' },
      { id: 'ch3_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P1219' },
      { id: 'ch3_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P1019' },
      { id: 'ch3_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P1101' }
    ]
  },
  {
    id: 'ch3_7',
    title: '3.7 IDA* 搜索',
    icon: '🌟',
    description: '迭代加深与A*结合的搜索算法',
    modules: [
      { id: 'ch3_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P1379' },
      { id: 'ch3_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P1032' },
      { id: 'ch3_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P2895' },
      { id: 'ch3_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P1902' },
      { id: 'ch3_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P3916' },
      { id: 'ch3_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P1706' },
      { id: 'ch3_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P1219' },
      { id: 'ch3_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P1019' },
      { id: 'ch3_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P1605' },
      { id: 'ch3_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P1101' },
      { id: 'ch3_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P1596' },
      { id: 'ch3_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P1443' }
    ]
  },
  {
    id: 'ch3_8',
    title: '3.8 DLX',
    icon: '💃',
    description: '舞蹈链精确覆盖算法',
    modules: [
      { id: 'ch3_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch3_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P3231' },
      { id: 'ch3_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P2315' },
      { id: 'ch3_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P4018' },
      { id: 'ch3_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P4925' },
      { id: 'ch3_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P5047' },
      { id: 'ch3_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P5206' },
      { id: 'ch3_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P5369' },
      { id: 'ch3_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P5686' },
      { id: 'ch3_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P6015' },
      { id: 'ch3_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P6103' },
      { id: 'ch3_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P6182' },
      { id: 'ch3_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P6271' }
    ]
  },

  // Part 4 - DP
  {
    id: 'ch4_1',
    title: '4.1 线性DP',
    icon: '📏',
    description: '在序列上进行动态规划的经典方法',
    modules: [
      { id: 'ch4_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1020' },
      { id: 'ch4_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1048' },
      { id: 'ch4_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1060' },
      { id: 'ch4_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1091' },
      { id: 'ch4_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1108' },
      { id: 'ch4_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1002' },
      { id: 'ch4_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1018' },
      { id: 'ch4_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1012' },
      { id: 'ch4_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1013' }
    ]
  },
  {
    id: 'ch4_2',
    title: '4.2 背包DP',
    icon: '🎒',
    description: '解决物品选择问题的动态规划方法',
    modules: [
      { id: 'ch4_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1048' },
      { id: 'ch4_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1049' },
      { id: 'ch4_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1060' },
      { id: 'ch4_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1064' },
      { id: 'ch4_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1091' },
      { id: 'ch4_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1108' },
      { id: 'ch4_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1077' },
      { id: 'ch4_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1314' },
      { id: 'ch4_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1013' }
    ]
  },
  {
    id: 'ch4_3',
    title: '4.3 区间DP',
    icon: '📐',
    description: '在连续区间上进行状态转移的动态规划',
    modules: [
      { id: 'ch4_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_4',
    title: '4.4 树形DP',
    icon: '🌲',
    description: '在树结构上进行状态转移的动态规划',
    modules: [
      { id: 'ch4_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_5',
    title: '4.5 状压DP',
    icon: '🗜️',
    description: '使用位运算压缩状态的动态规划方法',
    modules: [
      { id: 'ch4_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_6',
    title: '4.6 倍增DP',
    icon: '🚀',
    description: '利用倍增思想优化状态转移的动态规划',
    modules: [
      { id: 'ch4_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_7',
    title: '4.7 数据结构优化DP',
    icon: '🏗️',
    description: '利用高级数据结构加速状态转移',
    modules: [
      { id: 'ch4_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_8',
    title: '4.8 单调队列DP',
    icon: '📊',
    description: '使用单调队列优化滑动窗口类DP',
    modules: [
      { id: 'ch4_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_9',
    title: '4.9 斜率优化DP',
    icon: '📈',
    description: '通过斜率优化转移方程的动态规划',
    modules: [
      { id: 'ch4_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_9_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_9_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_10',
    title: '4.10 决策单调性DP',
    icon: '🎯',
    description: '利用决策点单调性优化DP转移',
    modules: [
      { id: 'ch4_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_11',
    title: '4.11 数位DP',
    icon: '🔢',
    description: '按数位进行状态设计的动态规划',
    modules: [
      { id: 'ch4_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch4_12',
    title: '4.12 轮廓线DP',
    icon: '🧵',
    description: '基于轮廓线状态进行动态规划的方法',
    modules: [
      { id: 'ch4_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch4_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch4_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch4_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch4_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch4_12_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch4_12_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch4_12_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch4_12_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch4_12_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch4_12_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch4_12_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  }
  ,
  // Part 5 - Strings
  {
    id: 'ch5_1',
    title: '5.1 字符串哈希',
    icon: '#️⃣',
    description: '使用哈希函数快速比较字符串的方法',
    modules: [
      { id: 'ch5_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_2',
    title: '5.2 KMP算法',
    icon: '🔗',
    description: '利用失配指针实现线性时间字符串匹配',
    modules: [
      { id: 'ch5_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_3',
    title: '5.3 Manacher算法',
    icon: '🥞',
    description: '线性时间求解最长回文子串',
    modules: [
      { id: 'ch5_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_4',
    title: '5.4 Trie字典树',
    icon: '🌳',
    description: '用于高效字符串检索的树形数据结构',
    modules: [
      { id: 'ch5_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_5',
    title: '5.5 AC自动机',
    icon: '🤖',
    description: '多模式字符串匹配的自动机算法',
    modules: [
      { id: 'ch5_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_6',
    title: '5.6 回文自动机',
    icon: '🔄',
    description: '高效处理回文串问题的自动机结构',
    modules: [
      { id: 'ch5_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_7',
    title: '5.7 后缀数组',
    icon: '📚',
    description: '基于后缀排序的字符串处理工具',
    modules: [
      { id: 'ch5_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch5_8',
    title: '5.8 后缀自动机',
    icon: '🏭',
    description: '强大的字符串匹配自动机结构',
    modules: [
      { id: 'ch5_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch5_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch5_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch5_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch5_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch5_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch5_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch5_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch5_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch5_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch5_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch5_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  }
  ,
  // Part 6 - Math
  {
    id: 'ch6_1',
    title: '6.1 位运算',
    icon: '💡',
    description: '利用二进制位操作解决数学问题',
    modules: [
      { id: 'ch6_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_2_1',
    title: '6.2.1 质数',
    icon: '➗',
    description: '质数判定、筛法及相关问题',
    modules: [
      { id: 'ch6_2_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_2_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_2_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_2_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_2_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_2_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_2_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_2_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_2_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_2_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_2_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_2_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_2_2',
    title: '6.2.2 最大公约数',
    icon: '➗',
    description: 'GCD/LCM计算及扩展欧几里得算法',
    modules: [
      { id: 'ch6_2_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_2_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_2_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_2_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_2_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_2_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_2_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_2_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_2_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_2_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_2_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_2_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_2_3',
    title: '6.2.3 欧拉函数',
    icon: '➗',
    description: '欧拉函数及其性质的应用',
    modules: [
      { id: 'ch6_2_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_2_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_2_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_2_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_2_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_2_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_2_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_2_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_2_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_2_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_2_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_2_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_3_1',
    title: '6.3.1 线性同余',
    icon: '≡',
    description: '线性同余方程的求解方法',
    modules: [
      { id: 'ch6_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_3_2',
    title: '6.3.2 中国剩余定理',
    icon: '≡',
    description: '求解一元线性同余方程组',
    modules: [
      { id: 'ch6_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_3_3',
    title: '6.3.3 高次同余',
    icon: '≡',
    description: '高次同余方程的求解（BSGS等）',
    modules: [
      { id: 'ch6_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_4',
    title: '6.4 博弈论',
    icon: '🎮',
    description: 'Nim游戏、SG函数等博弈问题',
    modules: [
      { id: 'ch6_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_5',
    title: '6.5 概率与期望',
    icon: '🎲',
    description: '概率计算与数学期望问题',
    modules: [
      { id: 'ch6_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_6_1',
    title: '6.6.1 排列组合',
    icon: '🧮',
    description: '排列数与组合数的计算及应用',
    modules: [
      { id: 'ch6_6_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_6_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_6_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_6_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_6_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_6_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_6_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_6_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_6_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_6_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_6_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_6_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_6_2',
    title: '6.6.2 卡特兰&斯特林数',
    icon: '🧮',
    description: '特殊计数序列的性质与应用',
    modules: [
      { id: 'ch6_6_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_6_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_6_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_6_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_6_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_6_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_6_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_6_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_6_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_6_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_6_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_6_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_6_3',
    title: '6.6.3 容斥原理',
    icon: '🧮',
    description: '利用容斥原理进行计数',
    modules: [
      { id: 'ch6_6_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_6_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_6_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_6_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_6_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_6_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_6_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_6_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_6_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_6_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_6_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_6_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_7_1',
    title: '6.7.1 矩阵',
    icon: '📐',
    description: '矩阵运算及其在算法中的应用',
    modules: [
      { id: 'ch6_7_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_7_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_7_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_7_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_7_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_7_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_7_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_7_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_7_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_7_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_7_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_7_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_7_2',
    title: '6.7.2 高斯消元',
    icon: '📐',
    description: '线性方程组求解算法',
    modules: [
      { id: 'ch6_7_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_7_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_7_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_7_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_7_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_7_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_7_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_7_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_7_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_7_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_7_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_7_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_7_3',
    title: '6.7.3 线性基',
    icon: '📐',
    description: '异或空间下的线性基结构',
    modules: [
      { id: 'ch6_7_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_7_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_7_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_7_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_7_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_7_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_7_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_7_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_7_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_7_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_7_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_7_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_8',
    title: '6.8 多项式',
    icon: 'ƒ',
    description: '多项式运算（FFT/NTT等）',
    modules: [
      { id: 'ch6_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_9',
    title: '6.9 莫比乌斯反演',
    icon: '🔄',
    description: '莫比乌斯函数及反演公式',
    modules: [
      { id: 'ch6_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_9_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_9_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_10',
    title: '6.10 筛法',
    icon: '🧹',
    description: '各类筛法技巧（埃筛、欧拉筛等）',
    modules: [
      { id: 'ch6_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_11',
    title: '6.11 线性规划',
    icon: '📉',
    description: '线性规划问题与单纯形法',
    modules: [
      { id: 'ch6_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_12_1',
    title: '6.12.1 三分法',
    icon: '🔬',
    description: '求解单峰函数极值的三分搜索',
    modules: [
      { id: 'ch6_12_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_12_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_12_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_12_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_12_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_12_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_12_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_12_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_12_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_12_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_12_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_12_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_12_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_12_2',
    title: '6.12.2 Simpson积分',
    icon: '🔬',
    description: '数值积分的Simpson公式',
    modules: [
      { id: 'ch6_12_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_12_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_12_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_12_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_12_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_12_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_12_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_12_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_12_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_12_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_12_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_12_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_12_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch6_13',
    title: '6.13 置换群',
    icon: '🔀',
    description: '置换群理论与Burnside引理',
    modules: [
      { id: 'ch6_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch6_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch6_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch6_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch6_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch6_13_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch6_13_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch6_13_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch6_13_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch6_13_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch6_13_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch6_13_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  }
  ,
  // Part 7 - Data Structures
  {
    id: 'ch7_1',
    title: '7.1 链表',
    icon: '🔗',
    description: '链表结构及其在算法中的应用',
    modules: [
      { id: 'ch7_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_2',
    title: '7.2 栈',
    icon: '📚',
    description: '栈结构及应用（表达式求值等）',
    modules: [
      { id: 'ch7_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_3',
    title: '7.3 队列',
    icon: '🚶',
    description: '队列结构及单调队列等变体',
    modules: [
      { id: 'ch7_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_4',
    title: '7.4 并查集',
    icon: '🤝',
    description: '处理集合合并与查询的数据结构',
    modules: [
      { id: 'ch7_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_5',
    title: '7.5 二叉堆',
    icon: '🌲',
    description: '优先队列与堆结构',
    modules: [
      { id: 'ch7_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_6',
    title: '7.6 ST表',
    icon: '📋',
    description: '稀疏表实现静态区间查询',
    modules: [
      { id: 'ch7_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_7',
    title: '7.7 树状数组',
    icon: '🌿',
    description: '高效处理前缀和与区间查询',
    modules: [
      { id: 'ch7_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch7_8',
    title: '7.8 线段树',
    icon: '🌳',
    description: '强大的区间查询与修改数据结构',
    modules: [
      { id: 'ch7_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch7_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch7_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch7_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch7_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch7_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch7_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch7_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch7_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch7_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch7_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch7_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },

  // Part 7 - Advanced Data Structures (continued)
  {
    id: 'ch7_9',
    title: '7.9 分块',
    icon: '🧱',
    description: '通过分块思想平衡修改和查询的复杂度',
    modules: [
      { id: 'ch7_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P3372' },
      { id: 'ch7_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P2801' },
      { id: 'ch7_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P4168' },
      { id: 'ch7_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P3203' },
      { id: 'ch7_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P1494' },
      { id: 'ch7_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P1972' },
      { id: 'ch7_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P2709' },
      { id: 'ch7_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P3901' },
      { id: 'ch7_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P4137' },
      { id: 'ch7_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P4396' }
    ]
  },
  {
    id: 'ch7_10',
    title: '7.10 可并堆',
    icon: '🗂️',
    description: '支持高效合并的堆结构',
    modules: [
      { id: 'ch7_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P3377' },
      { id: 'ch7_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P2713' },
      { id: 'ch7_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P3261' },
      { id: 'ch7_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P4331' },
      { id: 'ch7_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P1552' }
    ]
  },
  {
    id: 'ch7_11',
    title: '7.11 主席树',
    icon: '📜',
    description: '可持久化线段树，解决区间第K小等问题',
    modules: [
      { id: 'ch7_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P3834' },
      { id: 'ch7_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P2617' },
      { id: 'ch7_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P2633' },
      { id: 'ch7_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P3168' },
      { id: 'ch7_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P4602' }
    ]
  },
  {
    id: 'ch7_12',
    title: '7.12 平衡树',
    icon: '⚖️',
    description: '支持高效动态查询的平衡二叉搜索树',
    modules: [
      { id: 'ch7_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P3369' },
      { id: 'ch7_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P3391' },
      { id: 'ch7_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P2234' },
      { id: 'ch7_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P1486' },
      { id: 'ch7_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P2286' }
    ]
  },
  {
    id: 'ch7_13',
    title: '7.13 树链剖分',
    icon: '🔪',
    description: '将树转化为线性序列，结合线段树维护',
    modules: [
      { id: 'ch7_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P3384' },
      { id: 'ch7_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P3178' },
      { id: 'ch7_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P2146' },
      { id: 'ch7_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P2590' },
      { id: 'ch7_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P3313' }
    ]
  },
  {
    id: 'ch7_14',
    title: '7.14 树套树',
    icon: '🌳',
    description: '树中套树，解决多维查询问题',
    modules: [
      { id: 'ch7_14_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_14_prob_1', title: '第1题', type: 'problem', luoguId: 'P3810' },
      { id: 'ch7_14_prob_2', title: '第2题', type: 'problem', luoguId: 'P3157' },
      { id: 'ch7_14_prob_3', title: '第3题', type: 'problem', luoguId: 'P2617' },
      { id: 'ch7_14_prob_4', title: '第4题', type: 'problem', luoguId: 'P3332' },
      { id: 'ch7_14_prob_5', title: '第5题', type: 'problem', luoguId: 'P4278' }
    ]
  },
  {
    id: 'ch7_15',
    title: '7.15 动态树',
    icon: '🌿',
    description: 'Link-Cut Tree，支持动态树操作',
    modules: [
      { id: 'ch7_15_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_15_prob_1', title: '第1题', type: 'problem', luoguId: 'P3690' },
      { id: 'ch7_15_prob_2', title: '第2题', type: 'problem', luoguId: 'P3203' },
      { id: 'ch7_15_prob_3', title: '第3题', type: 'problem', luoguId: 'P2147' },
      { id: 'ch7_15_prob_4', title: '第4题', type: 'problem', luoguId: 'P4332' },
      { id: 'ch7_15_prob_5', title: '第5题', type: 'problem', luoguId: 'P4219' }
    ]
  },
  {
    id: 'ch7_16',
    title: '7.16 可持久化数据结构',
    icon: '⏳',
    description: '保留历史版本的数据结构',
    modules: [
      { id: 'ch7_16_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_16_prob_1', title: '第1题', type: 'problem', luoguId: 'P3919' },
      { id: 'ch7_16_prob_2', title: '第2题', type: 'problem', luoguId: 'P3402' },
      { id: 'ch7_16_prob_3', title: '第3题', type: 'problem', luoguId: 'P3835' },
      { id: 'ch7_16_prob_4', title: '第4题', type: 'problem', luoguId: 'P5048' },
      { id: 'ch7_16_prob_5', title: '第5题', type: 'problem', luoguId: 'P5062' }
    ]
  },
  {
    id: 'ch7_17',
    title: '7.17 K-D Tree',
    icon: '🌐',
    description: '多维空间的高效查询数据结构',
    modules: [
      { id: 'ch7_17_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_17_prob_1', title: '第1题', type: 'problem', luoguId: 'P4357' },
      { id: 'ch7_17_prob_2', title: '第2题', type: 'problem', luoguId: 'P4148' },
      { id: 'ch7_17_prob_3', title: '第3题', type: 'problem', luoguId: 'P2093' },
      { id: 'ch7_17_prob_4', title: '第4题', type: 'problem', luoguId: 'P2479' },
      { id: 'ch7_17_prob_5', title: '第5题', type: 'problem', luoguId: 'P3710' }
    ]
  },
  {
    id: 'ch7_18',
    title: '7.18 珂朵莉树',
    icon: '🌸',
    description: '基于set的暴力数据结构，处理区间赋值',
    modules: [
      { id: 'ch7_18_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_18_prob_1', title: '第1题', type: 'problem', luoguId: 'P2787' },
      { id: 'ch7_18_prob_2', title: '第2题', type: 'problem', luoguId: 'P2572' },
      { id: 'ch7_18_prob_3', title: '第3题', type: 'problem', luoguId: 'P4344' },
      { id: 'ch7_18_prob_4', title: '第4题', type: 'problem', luoguId: 'P5061' },
      { id: 'ch7_18_prob_5', title: '第5题', type: 'problem', luoguId: 'P5608' }
    ]
  },

  // Part 8 - Graph Theory
  {
    id: 'ch8_1',
    title: '8.1 图的存储',
    icon: '🗺️',
    description: '邻接矩阵、邻接表等图的表示方法',
    modules: [
      { id: 'ch8_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_2',
    title: '8.2 最短路',
    icon: '🛤️',
    description: 'Dijkstra、Floyd、Bellman-Ford等最短路算法',
    modules: [
      { id: 'ch8_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_3_1',
    title: '8.3.1 二叉树',
    icon: '🌲',
    description: '二叉树的性质与遍历',
    modules: [
      { id: 'ch8_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_3_2',
    title: '8.3.2 树的直径',
    icon: '🌲',
    description: '树的最长路径问题',
    modules: [
      { id: 'ch8_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_3_3',
    title: '8.3.3 最近公共祖先',
    icon: '🌲',
    description: 'LCA问题的各种解法',
    modules: [
      { id: 'ch8_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_4',
    title: '8.4 最小生成树',
    icon: '🌳',
    description: 'Kruskal、Prim等最小生成树算法',
    modules: [
      { id: 'ch8_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_5',
    title: '8.5 拓扑排序',
    icon: '📊',
    description: '有向无环图的拓扑排序',
    modules: [
      { id: 'ch8_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_6',
    title: '8.6 差分约束',
    icon: '⚖️',
    description: '利用最短路求解不等式组',
    modules: [
      { id: 'ch8_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_7',
    title: '8.7 连通性',
    icon: '🔗',
    description: '强连通分量、割点、桥等',
    modules: [
      { id: 'ch8_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_8',
    title: '8.8 二分图',
    icon: '🔀',
    description: '二分图匹配与染色问题',
    modules: [
      { id: 'ch8_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_9_1',
    title: '8.9.1 最大流',
    icon: '🌊',
    description: '网络流最大流算法',
    modules: [
      { id: 'ch8_9_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_9_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_9_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_9_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_9_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_9_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_9_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_9_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_9_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_9_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_9_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_9_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_9_2',
    title: '8.9.2 最小割',
    icon: '✂️',
    description: '网络流最小割问题',
    modules: [
      { id: 'ch8_9_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_9_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_9_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_9_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_9_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_9_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_9_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_9_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_9_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_9_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_9_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_9_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_9_3',
    title: '8.9.3 费用流',
    icon: '💰',
    description: '最小费用最大流算法',
    modules: [
      { id: 'ch8_9_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_9_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_9_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_9_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_9_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_9_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_9_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_9_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_9_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_9_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_9_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_9_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_9_4',
    title: '8.9.4 有上下界网络流',
    icon: '🌊',
    description: '带容量限制的网络流问题',
    modules: [
      { id: 'ch8_9_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_9_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_9_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_9_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_9_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_9_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_9_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_9_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_9_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_9_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_9_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_9_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_10',
    title: '8.10 2-SAT',
    icon: '🔀',
    description: '二元可满足性问题',
    modules: [
      { id: 'ch8_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_11',
    title: '8.11 点分治',
    icon: '🔪',
    description: '树上路径问题的分治算法',
    modules: [
      { id: 'ch8_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_12',
    title: '8.12 虚树',
    icon: '🌲',
    description: '树上关键点的简化树结构',
    modules: [
      { id: 'ch8_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_12_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_12_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_12_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_12_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_12_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_12_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_12_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch8_13',
    title: '8.13 Matrix Tree定理',
    icon: '📐',
    description: '利用矩阵计算生成树个数',
    modules: [
      { id: 'ch8_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch8_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch8_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch8_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch8_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch8_13_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch8_13_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch8_13_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch8_13_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch8_13_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch8_13_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch8_13_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },

  // Part 9 - Computational Geometry
  {
    id: 'ch9_1',
    title: '9.1 凸包',
    icon: '🔷',
    description: '计算点集的凸包结构',
    modules: [
      { id: 'ch9_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch9_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch9_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch9_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch9_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch9_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch9_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch9_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch9_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch9_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch9_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch9_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch9_2',
    title: '9.2 旋转卡壳',
    icon: '📏',
    description: '利用旋转卡壳求解凸包相关问题',
    modules: [
      { id: 'ch9_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch9_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch9_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch9_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch9_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch9_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch9_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch9_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch9_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch9_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch9_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch9_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch9_3',
    title: '9.3 半平面交',
    icon: '📐',
    description: '求解多个半平面的交集',
    modules: [
      { id: 'ch9_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch9_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch9_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch9_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch9_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch9_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch9_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch9_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch9_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch9_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch9_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch9_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },

  // Part 10 - Miscellaneous
  {
    id: 'ch10_1',
    title: '10.1 模拟退火',
    icon: '🔥',
    description: '基于物理退火过程的随机优化算法',
    modules: [
      { id: 'ch10_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch10_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch10_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch10_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch10_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch10_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch10_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch10_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch10_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch10_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch10_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch10_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch10_2',
    title: '10.2 分数规划',
    icon: '📊',
    description: '求解分数形式的最优化问题',
    modules: [
      { id: 'ch10_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch10_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch10_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch10_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch10_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch10_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch10_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch10_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch10_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch10_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch10_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch10_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch10_3_1',
    title: '10.3.1 CDQ分治',
    icon: '🔪',
    description: '基于分治思想解决偏序问题',
    modules: [
      { id: 'ch10_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch10_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch10_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch10_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch10_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch10_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch10_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch10_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch10_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch10_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch10_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch10_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch10_3_2',
    title: '10.3.2 整体二分',
    icon: '🔍',
    description: '对多个查询同时进行二分',
    modules: [
      { id: 'ch10_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch10_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch10_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch10_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch10_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch10_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch10_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch10_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch10_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch10_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch10_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch10_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  },
  {
    id: 'ch10_3_3',
    title: '10.3.3 莫队算法',
    icon: '🔍',
    description: '通过分块和排序优化区间查询',
    modules: [
      { id: 'ch10_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P1040' },
      { id: 'ch10_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P1063' },
      { id: 'ch10_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P1070' },
      { id: 'ch10_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P1080' },
      { id: 'ch10_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P1121' },
      { id: 'ch10_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P1140' },
      { id: 'ch10_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P1156' },
      { id: 'ch10_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P1015' },
      { id: 'ch10_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P1013' },
      { id: 'ch10_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P1025' },
      { id: 'ch10_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P1028' },
      { id: 'ch10_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P1002' }
    ]
  }
];
