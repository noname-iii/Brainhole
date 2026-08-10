const CHAPTERS = [
  // Part 3 - Search
  {
    id: 'ch3_1',
    title: '3.1 深度优先搜索',
    icon: 'S1',
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
    icon: 'S2',
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
    icon: 'S3',
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
    icon: 'S4',
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
    icon: 'S5',
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
    icon: 'S6',
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
    icon: 'S7',
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
    icon: 'S8',
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
    icon: 'D1',
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
    icon: 'D5',
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
    icon: 'D6',
    description: '在连续区间上进行状态转移的动态规划',
    modules: [
      { id: 'ch4_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P4390' },
      { id: 'ch4_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P4470' },
      { id: 'ch4_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P4107' },
      { id: 'ch4_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P4261' },
      { id: 'ch4_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P4341' },
      { id: 'ch4_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P4168' },
      { id: 'ch4_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P4405' },
      { id: 'ch4_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P4069' },
      { id: 'ch4_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P4160' },
      { id: 'ch4_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P4291' },
      { id: 'ch4_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P4438' },
      { id: 'ch4_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P4229' }
    ]
  },
  {
    id: 'ch4_4',
    title: '4.4 树形DP',
    icon: 'D7',
    description: '在树结构上进行状态转移的动态规划',
    modules: [
      { id: 'ch4_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P4407' },
      { id: 'ch4_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P4015' },
      { id: 'ch4_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P4239' },
      { id: 'ch4_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P4206' },
      { id: 'ch4_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P4372' },
      { id: 'ch4_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P4450' },
      { id: 'ch4_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P4004' },
      { id: 'ch4_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P4427' },
      { id: 'ch4_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P4064' },
      { id: 'ch4_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P4135' },
      { id: 'ch4_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P4368' },
      { id: 'ch4_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P4299' }
    ]
  },
  {
    id: 'ch4_5',
    title: '4.5 状压DP',
    icon: 'D8',
    description: '使用位运算压缩状态的动态规划方法',
    modules: [
      { id: 'ch4_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P4018' },
      { id: 'ch4_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P4313' },
      { id: 'ch4_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P4021' },
      { id: 'ch4_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P4309' },
      { id: 'ch4_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P4017' },
      { id: 'ch4_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P4414' },
      { id: 'ch4_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P4076' },
      { id: 'ch4_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P4311' },
      { id: 'ch4_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P4083' },
      { id: 'ch4_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P4129' },
      { id: 'ch4_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P4094' },
      { id: 'ch4_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P4137' }
    ]
  },
  {
    id: 'ch4_6',
    title: '4.6 倍增DP',
    icon: 'D9',
    description: '利用倍增思想优化状态转移的动态规划',
    modules: [
      { id: 'ch4_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P4495' },
      { id: 'ch4_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P4151' },
      { id: 'ch4_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P4259' },
      { id: 'ch4_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P4371' },
      { id: 'ch4_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P4349' },
      { id: 'ch4_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P4490' },
      { id: 'ch4_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P4095' },
      { id: 'ch4_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P4304' },
      { id: 'ch4_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P4333' },
      { id: 'ch4_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P4071' },
      { id: 'ch4_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P4288' },
      { id: 'ch4_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P4486' }
    ]
  },
  {
    id: 'ch4_7',
    title: '4.7 数据结构优化DP',
    icon: 'D10',
    description: '利用高级数据结构加速状态转移',
    modules: [
      { id: 'ch4_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P4412' },
      { id: 'ch4_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P4272' },
      { id: 'ch4_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P4409' },
      { id: 'ch4_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P4042' },
      { id: 'ch4_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P4456' },
      { id: 'ch4_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P4210' },
      { id: 'ch4_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P4219' },
      { id: 'ch4_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P4232' },
      { id: 'ch4_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P4266' },
      { id: 'ch4_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P4492' },
      { id: 'ch4_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P4138' },
      { id: 'ch4_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P4145' }
    ]
  },
  {
    id: 'ch4_8',
    title: '4.8 单调队列DP',
    icon: 'D11',
    description: '使用单调队列优化滑动窗口类DP',
    modules: [
      { id: 'ch4_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P4351' },
      { id: 'ch4_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P4188' },
      { id: 'ch4_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P4131' },
      { id: 'ch4_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P4337' },
      { id: 'ch4_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P4150' },
      { id: 'ch4_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P4010' },
      { id: 'ch4_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P4124' },
      { id: 'ch4_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P4496' },
      { id: 'ch4_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P4276' },
      { id: 'ch4_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P4201' },
      { id: 'ch4_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P4108' },
      { id: 'ch4_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P4370' }
    ]
  },
  {
    id: 'ch4_9',
    title: '4.9 斜率优化DP',
    icon: 'D12',
    description: '通过斜率优化转移方程的动态规划',
    modules: [
      { id: 'ch4_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P4080' },
      { id: 'ch4_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P4099' },
      { id: 'ch4_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P4186' },
      { id: 'ch4_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P4358' },
      { id: 'ch4_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P4270' },
      { id: 'ch4_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P4330' },
      { id: 'ch4_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P4308' },
      { id: 'ch4_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P4250' },
      { id: 'ch4_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P4424' },
      { id: 'ch4_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P4128' },
      { id: 'ch4_9_prob_11', title: '第11题', type: 'problem', luoguId: 'P4112' },
      { id: 'ch4_9_prob_12', title: '第12题', type: 'problem', luoguId: 'P4284' }
    ]
  },
  {
    id: 'ch4_10',
    title: '4.10 决策单调性DP',
    icon: 'D2',
    description: '利用决策点单调性优化DP转移',
    modules: [
      { id: 'ch4_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P4401' },
      { id: 'ch4_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P4203' },
      { id: 'ch4_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P4462' },
      { id: 'ch4_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P4346' },
      { id: 'ch4_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P4202' },
      { id: 'ch4_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P4246' },
      { id: 'ch4_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P4287' },
      { id: 'ch4_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P4488' },
      { id: 'ch4_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P4078' },
      { id: 'ch4_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P4457' },
      { id: 'ch4_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P4312' },
      { id: 'ch4_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P4157' }
    ]
  },
  {
    id: 'ch4_11',
    title: '4.11 数位DP',
    icon: 'D3',
    description: '按数位进行状态设计的动态规划',
    modules: [
      { id: 'ch4_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P4293' },
      { id: 'ch4_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P4181' },
      { id: 'ch4_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P4441' },
      { id: 'ch4_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P4357' },
      { id: 'ch4_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P4377' },
      { id: 'ch4_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P4006' },
      { id: 'ch4_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P4458' },
      { id: 'ch4_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P4487' },
      { id: 'ch4_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P4290' },
      { id: 'ch4_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P4365' },
      { id: 'ch4_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P4320' },
      { id: 'ch4_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P4442' }
    ]
  },
  {
    id: 'ch4_12',
    title: '4.12 轮廓线DP',
    icon: 'D4',
    description: '基于轮廓线状态进行动态规划的方法',
    modules: [
      { id: 'ch4_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch4_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P4032' },
      { id: 'ch4_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P4167' },
      { id: 'ch4_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P4214' },
      { id: 'ch4_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P4134' },
      { id: 'ch4_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P4461' },
      { id: 'ch4_12_prob_6', title: '第6题', type: 'problem', luoguId: 'P4154' },
      { id: 'ch4_12_prob_7', title: '第7题', type: 'problem', luoguId: 'P4199' },
      { id: 'ch4_12_prob_8', title: '第8题', type: 'problem', luoguId: 'P4436' },
      { id: 'ch4_12_prob_9', title: '第9题', type: 'problem', luoguId: 'P4482' },
      { id: 'ch4_12_prob_10', title: '第10题', type: 'problem', luoguId: 'P4062' },
      { id: 'ch4_12_prob_11', title: '第11题', type: 'problem', luoguId: 'P4418' },
      { id: 'ch4_12_prob_12', title: '第12题', type: 'problem', luoguId: 'P4212' }
    ]
  }
  ,
  // Part 5 - Strings
  {
    id: 'ch5_1',
    title: '5.1 字符串哈希',
    icon: 'T1',
    description: '使用哈希函数快速比较字符串的方法',
    modules: [
      { id: 'ch5_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P5486' },
      { id: 'ch5_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P5071' },
      { id: 'ch5_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P5043' },
      { id: 'ch5_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P5483' },
      { id: 'ch5_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P5223' },
      { id: 'ch5_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P5414' },
      { id: 'ch5_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P5443' },
      { id: 'ch5_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P5493' },
      { id: 'ch5_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P5354' },
      { id: 'ch5_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P5078' },
      { id: 'ch5_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P5476' },
      { id: 'ch5_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P5146' }
    ]
  },
  {
    id: 'ch5_2',
    title: '5.2 KMP算法',
    icon: 'T2',
    description: '利用失配指针实现线性时间字符串匹配',
    modules: [
      { id: 'ch5_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P5458' },
      { id: 'ch5_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P5010' },
      { id: 'ch5_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P5270' },
      { id: 'ch5_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P5313' },
      { id: 'ch5_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P5220' },
      { id: 'ch5_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P5036' },
      { id: 'ch5_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P5118' },
      { id: 'ch5_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P5190' },
      { id: 'ch5_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P5335' },
      { id: 'ch5_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P5058' },
      { id: 'ch5_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P5204' },
      { id: 'ch5_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P5119' }
    ]
  },
  {
    id: 'ch5_3',
    title: '5.3 Manacher算法',
    icon: 'T3',
    description: '线性时间求解最长回文子串',
    modules: [
      { id: 'ch5_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P5228' },
      { id: 'ch5_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P5151' },
      { id: 'ch5_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P5115' },
      { id: 'ch5_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P5435' },
      { id: 'ch5_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P5169' },
      { id: 'ch5_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P5446' },
      { id: 'ch5_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P5350' },
      { id: 'ch5_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P5461' },
      { id: 'ch5_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P5399' },
      { id: 'ch5_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P5498' },
      { id: 'ch5_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P5357' },
      { id: 'ch5_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P5210' }
    ]
  },
  {
    id: 'ch5_4',
    title: '5.4 Trie字典树',
    icon: 'T4',
    description: '用于高效字符串检索的树形数据结构',
    modules: [
      { id: 'ch5_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P5012' },
      { id: 'ch5_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P5215' },
      { id: 'ch5_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P5086' },
      { id: 'ch5_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P5112' },
      { id: 'ch5_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P5343' },
      { id: 'ch5_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P5391' },
      { id: 'ch5_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P5120' },
      { id: 'ch5_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P5045' },
      { id: 'ch5_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P5321' },
      { id: 'ch5_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P5489' },
      { id: 'ch5_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P5318' },
      { id: 'ch5_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P5105' }
    ]
  },
  {
    id: 'ch5_5',
    title: '5.5 AC自动机',
    icon: 'T5',
    description: '多模式字符串匹配的自动机算法',
    modules: [
      { id: 'ch5_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P5411' },
      { id: 'ch5_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P5437' },
      { id: 'ch5_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P5162' },
      { id: 'ch5_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P5465' },
      { id: 'ch5_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P5153' },
      { id: 'ch5_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P5044' },
      { id: 'ch5_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P5075' },
      { id: 'ch5_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P5263' },
      { id: 'ch5_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P5032' },
      { id: 'ch5_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P5302' },
      { id: 'ch5_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P5066' },
      { id: 'ch5_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P5262' }
    ]
  },
  {
    id: 'ch5_6',
    title: '5.6 回文自动机',
    icon: 'T6',
    description: '高效处理回文串问题的自动机结构',
    modules: [
      { id: 'ch5_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P5468' },
      { id: 'ch5_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P5240' },
      { id: 'ch5_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P5027' },
      { id: 'ch5_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P5191' },
      { id: 'ch5_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P5372' },
      { id: 'ch5_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P5337' },
      { id: 'ch5_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P5103' },
      { id: 'ch5_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P5342' },
      { id: 'ch5_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P5447' },
      { id: 'ch5_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P5161' },
      { id: 'ch5_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P5381' },
      { id: 'ch5_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P5365' }
    ]
  },
  {
    id: 'ch5_7',
    title: '5.7 后缀数组',
    icon: 'T7',
    description: '基于后缀排序的字符串处理工具',
    modules: [
      { id: 'ch5_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P5111' },
      { id: 'ch5_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P5284' },
      { id: 'ch5_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P5033' },
      { id: 'ch5_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P5298' },
      { id: 'ch5_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P5377' },
      { id: 'ch5_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P5366' },
      { id: 'ch5_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P5456' },
      { id: 'ch5_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P5276' },
      { id: 'ch5_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P5253' },
      { id: 'ch5_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P5355' },
      { id: 'ch5_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P5309' },
      { id: 'ch5_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P5110' }
    ]
  },
  {
    id: 'ch5_8',
    title: '5.8 后缀自动机',
    icon: 'T8',
    description: '强大的字符串匹配自动机结构',
    modules: [
      { id: 'ch5_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch5_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P5100' },
      { id: 'ch5_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P5315' },
      { id: 'ch5_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P5172' },
      { id: 'ch5_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P5242' },
      { id: 'ch5_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P5463' },
      { id: 'ch5_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P5150' },
      { id: 'ch5_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P5273' },
      { id: 'ch5_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P5197' },
      { id: 'ch5_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P5311' },
      { id: 'ch5_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P5291' },
      { id: 'ch5_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P5173' },
      { id: 'ch5_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P5054' }
    ]
  }
  ,
  // Part 6 - Math
  {
    id: 'ch6_1',
    title: '6.1 位运算',
    icon: 'M1',
    description: '利用二进制位操作解决数学问题',
    modules: [
      { id: 'ch6_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6020' },
      { id: 'ch6_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6260' },
      { id: 'ch6_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6151' },
      { id: 'ch6_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6398' },
      { id: 'ch6_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6497' },
      { id: 'ch6_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6086' },
      { id: 'ch6_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6098' },
      { id: 'ch6_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6165' },
      { id: 'ch6_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6255' },
      { id: 'ch6_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6230' },
      { id: 'ch6_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6147' },
      { id: 'ch6_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6406' }
    ]
  },
  {
    id: 'ch6_2_1',
    title: '6.2.1 质数',
    icon: 'M7',
    description: '质数判定、筛法及相关问题',
    modules: [
      { id: 'ch6_2_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6070' },
      { id: 'ch6_2_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6075' },
      { id: 'ch6_2_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6384' },
      { id: 'ch6_2_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6356' },
      { id: 'ch6_2_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6372' },
      { id: 'ch6_2_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6388' },
      { id: 'ch6_2_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6320' },
      { id: 'ch6_2_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6402' },
      { id: 'ch6_2_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6030' },
      { id: 'ch6_2_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6469' },
      { id: 'ch6_2_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6264' },
      { id: 'ch6_2_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6096' }
    ]
  },
  {
    id: 'ch6_2_2',
    title: '6.2.2 最大公约数',
    icon: 'M8',
    description: 'GCD/LCM计算及扩展欧几里得算法',
    modules: [
      { id: 'ch6_2_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P6334' },
      { id: 'ch6_2_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P6073' },
      { id: 'ch6_2_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P6169' },
      { id: 'ch6_2_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P6170' },
      { id: 'ch6_2_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P6440' },
      { id: 'ch6_2_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P6033' },
      { id: 'ch6_2_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P6100' },
      { id: 'ch6_2_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P6312' },
      { id: 'ch6_2_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P6024' },
      { id: 'ch6_2_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P6228' },
      { id: 'ch6_2_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P6360' },
      { id: 'ch6_2_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P6216' }
    ]
  },
  {
    id: 'ch6_2_3',
    title: '6.2.3 欧拉函数',
    icon: 'M9',
    description: '欧拉函数及其性质的应用',
    modules: [
      { id: 'ch6_2_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_2_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P6097' },
      { id: 'ch6_2_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P6049' },
      { id: 'ch6_2_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P6371' },
      { id: 'ch6_2_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P6187' },
      { id: 'ch6_2_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P6109' },
      { id: 'ch6_2_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P6498' },
      { id: 'ch6_2_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P6032' },
      { id: 'ch6_2_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P6161' },
      { id: 'ch6_2_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P6323' },
      { id: 'ch6_2_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P6101' },
      { id: 'ch6_2_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P6304' },
      { id: 'ch6_2_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P6448' }
    ]
  },
  {
    id: 'ch6_3_1',
    title: '6.3.1 线性同余',
    icon: 'M10',
    description: '线性同余方程的求解方法',
    modules: [
      { id: 'ch6_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6241' },
      { id: 'ch6_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6108' },
      { id: 'ch6_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6278' },
      { id: 'ch6_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6213' },
      { id: 'ch6_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6116' },
      { id: 'ch6_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6061' },
      { id: 'ch6_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6431' },
      { id: 'ch6_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6327' },
      { id: 'ch6_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6412' },
      { id: 'ch6_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6373' },
      { id: 'ch6_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6387' },
      { id: 'ch6_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6184' }
    ]
  },
  {
    id: 'ch6_3_2',
    title: '6.3.2 中国剩余定理',
    icon: 'M11',
    description: '求解一元线性同余方程组',
    modules: [
      { id: 'ch6_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P6209' },
      { id: 'ch6_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P6277' },
      { id: 'ch6_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P6487' },
      { id: 'ch6_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P6068' },
      { id: 'ch6_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P6419' },
      { id: 'ch6_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P6112' },
      { id: 'ch6_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P6379' },
      { id: 'ch6_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P6203' },
      { id: 'ch6_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P6494' },
      { id: 'ch6_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P6324' },
      { id: 'ch6_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P6056' },
      { id: 'ch6_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P6414' }
    ]
  },
  {
    id: 'ch6_3_3',
    title: '6.3.3 高次同余',
    icon: 'M12',
    description: '高次同余方程的求解（BSGS等）',
    modules: [
      { id: 'ch6_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P6253' },
      { id: 'ch6_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P6329' },
      { id: 'ch6_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P6383' },
      { id: 'ch6_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P6225' },
      { id: 'ch6_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P6099' },
      { id: 'ch6_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P6382' },
      { id: 'ch6_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P6350' },
      { id: 'ch6_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P6302' },
      { id: 'ch6_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P6005' },
      { id: 'ch6_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P6269' },
      { id: 'ch6_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P6011' },
      { id: 'ch6_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P6311' }
    ]
  },
  {
    id: 'ch6_4',
    title: '6.4 博弈论',
    icon: 'M13',
    description: 'Nim游戏、SG函数等博弈问题',
    modules: [
      { id: 'ch6_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P6352' },
      { id: 'ch6_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P6421' },
      { id: 'ch6_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P6130' },
      { id: 'ch6_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P6156' },
      { id: 'ch6_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P6148' },
      { id: 'ch6_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P6464' },
      { id: 'ch6_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P6115' },
      { id: 'ch6_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P6466' },
      { id: 'ch6_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P6004' },
      { id: 'ch6_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P6268' },
      { id: 'ch6_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P6221' },
      { id: 'ch6_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P6500' }
    ]
  },
  {
    id: 'ch6_5',
    title: '6.5 概率与期望',
    icon: 'M14',
    description: '概率计算与数学期望问题',
    modules: [
      { id: 'ch6_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P6318' },
      { id: 'ch6_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P6477' },
      { id: 'ch6_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P6450' },
      { id: 'ch6_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P6273' },
      { id: 'ch6_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P6034' },
      { id: 'ch6_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P6359' },
      { id: 'ch6_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P6192' },
      { id: 'ch6_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P6183' },
      { id: 'ch6_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P6153' },
      { id: 'ch6_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P6303' },
      { id: 'ch6_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P6449' },
      { id: 'ch6_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P6256' }
    ]
  },
  {
    id: 'ch6_6_1',
    title: '6.6.1 排列组合',
    icon: 'M15',
    description: '排列数与组合数的计算及应用',
    modules: [
      { id: 'ch6_6_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6054' },
      { id: 'ch6_6_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6029' },
      { id: 'ch6_6_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6389' },
      { id: 'ch6_6_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6290' },
      { id: 'ch6_6_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6418' },
      { id: 'ch6_6_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6063' },
      { id: 'ch6_6_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6002' },
      { id: 'ch6_6_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6331' },
      { id: 'ch6_6_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6176' },
      { id: 'ch6_6_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6138' },
      { id: 'ch6_6_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6173' },
      { id: 'ch6_6_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6257' }
    ]
  },
  {
    id: 'ch6_6_2',
    title: '6.6.2 卡特兰&斯特林数',
    icon: 'M16',
    description: '特殊计数序列的性质与应用',
    modules: [
      { id: 'ch6_6_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P6499' },
      { id: 'ch6_6_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P6155' },
      { id: 'ch6_6_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P6473' },
      { id: 'ch6_6_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P6363' },
      { id: 'ch6_6_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P6441' },
      { id: 'ch6_6_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P6370' },
      { id: 'ch6_6_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P6305' },
      { id: 'ch6_6_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P6453' },
      { id: 'ch6_6_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P6465' },
      { id: 'ch6_6_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P6408' },
      { id: 'ch6_6_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P6420' },
      { id: 'ch6_6_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P6265' }
    ]
  },
  {
    id: 'ch6_6_3',
    title: '6.6.3 容斥原理',
    icon: 'M17',
    description: '利用容斥原理进行计数',
    modules: [
      { id: 'ch6_6_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_6_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P6445' },
      { id: 'ch6_6_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P6189' },
      { id: 'ch6_6_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P6288' },
      { id: 'ch6_6_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P6133' },
      { id: 'ch6_6_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P6037' },
      { id: 'ch6_6_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P6330' },
      { id: 'ch6_6_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P6016' },
      { id: 'ch6_6_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P6266' },
      { id: 'ch6_6_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P6347' },
      { id: 'ch6_6_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P6239' },
      { id: 'ch6_6_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P6001' },
      { id: 'ch6_6_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P6007' }
    ]
  },
  {
    id: 'ch6_7_1',
    title: '6.7.1 矩阵',
    icon: 'M18',
    description: '矩阵运算及其在算法中的应用',
    modules: [
      { id: 'ch6_7_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6319' },
      { id: 'ch6_7_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6480' },
      { id: 'ch6_7_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6022' },
      { id: 'ch6_7_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6021' },
      { id: 'ch6_7_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6276' },
      { id: 'ch6_7_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6413' },
      { id: 'ch6_7_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6459' },
      { id: 'ch6_7_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6476' },
      { id: 'ch6_7_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6479' },
      { id: 'ch6_7_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6132' },
      { id: 'ch6_7_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6270' },
      { id: 'ch6_7_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6314' }
    ]
  },
  {
    id: 'ch6_7_2',
    title: '6.7.2 高斯消元',
    icon: 'M19',
    description: '线性方程组求解算法',
    modules: [
      { id: 'ch6_7_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P6367' },
      { id: 'ch6_7_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P6045' },
      { id: 'ch6_7_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P6202' },
      { id: 'ch6_7_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P6119' },
      { id: 'ch6_7_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P6346' },
      { id: 'ch6_7_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P6142' },
      { id: 'ch6_7_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P6058' },
      { id: 'ch6_7_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P6340' },
      { id: 'ch6_7_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P6355' },
      { id: 'ch6_7_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P6325' },
      { id: 'ch6_7_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P6354' },
      { id: 'ch6_7_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P6095' }
    ]
  },
  {
    id: 'ch6_7_3',
    title: '6.7.3 线性基',
    icon: 'M20',
    description: '异或空间下的线性基结构',
    modules: [
      { id: 'ch6_7_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_7_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P6143' },
      { id: 'ch6_7_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P6043' },
      { id: 'ch6_7_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P6433' },
      { id: 'ch6_7_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P6423' },
      { id: 'ch6_7_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P6424' },
      { id: 'ch6_7_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P6417' },
      { id: 'ch6_7_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P6335' },
      { id: 'ch6_7_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P6196' },
      { id: 'ch6_7_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P6374' },
      { id: 'ch6_7_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P6301' },
      { id: 'ch6_7_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P6159' },
      { id: 'ch6_7_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P6333' }
    ]
  },
  {
    id: 'ch6_8',
    title: '6.8 多项式',
    icon: 'M21',
    description: '多项式运算（FFT/NTT等）',
    modules: [
      { id: 'ch6_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P6081' },
      { id: 'ch6_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P6126' },
      { id: 'ch6_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P6309' },
      { id: 'ch6_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P6369' },
      { id: 'ch6_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P6321' },
      { id: 'ch6_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P6003' },
      { id: 'ch6_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P6227' },
      { id: 'ch6_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P6452' },
      { id: 'ch6_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P6087' },
      { id: 'ch6_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P6136' },
      { id: 'ch6_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P6378' },
      { id: 'ch6_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P6392' }
    ]
  },
  {
    id: 'ch6_9',
    title: '6.9 莫比乌斯反演',
    icon: 'M22',
    description: '莫比乌斯函数及反演公式',
    modules: [
      { id: 'ch6_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P6422' },
      { id: 'ch6_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P6261' },
      { id: 'ch6_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P6472' },
      { id: 'ch6_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P6316' },
      { id: 'ch6_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P6247' },
      { id: 'ch6_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P6322' },
      { id: 'ch6_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P6495' },
      { id: 'ch6_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P6315' },
      { id: 'ch6_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P6299' },
      { id: 'ch6_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P6144' },
      { id: 'ch6_9_prob_11', title: '第11题', type: 'problem', luoguId: 'P6280' },
      { id: 'ch6_9_prob_12', title: '第12题', type: 'problem', luoguId: 'P6120' }
    ]
  },
  {
    id: 'ch6_10',
    title: '6.10 筛法',
    icon: 'M2',
    description: '各类筛法技巧（埃筛、欧拉筛等）',
    modules: [
      { id: 'ch6_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P6194' },
      { id: 'ch6_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P6286' },
      { id: 'ch6_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P6076' },
      { id: 'ch6_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P6137' },
      { id: 'ch6_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P6072' },
      { id: 'ch6_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P6425' },
      { id: 'ch6_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P6211' },
      { id: 'ch6_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P6399' },
      { id: 'ch6_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P6135' },
      { id: 'ch6_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P6223' },
      { id: 'ch6_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P6014' },
      { id: 'ch6_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P6055' }
    ]
  },
  {
    id: 'ch6_11',
    title: '6.11 线性规划',
    icon: 'M3',
    description: '线性规划问题与单纯形法',
    modules: [
      { id: 'ch6_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P6150' },
      { id: 'ch6_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P6470' },
      { id: 'ch6_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P6482' },
      { id: 'ch6_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P6357' },
      { id: 'ch6_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P6127' },
      { id: 'ch6_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P6060' },
      { id: 'ch6_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P6271' },
      { id: 'ch6_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P6251' },
      { id: 'ch6_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P6493' },
      { id: 'ch6_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P6415' },
      { id: 'ch6_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P6380' },
      { id: 'ch6_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P6145' }
    ]
  },
  {
    id: 'ch6_12_1',
    title: '6.12.1 三分法',
    icon: 'M4',
    description: '求解单峰函数极值的三分搜索',
    modules: [
      { id: 'ch6_12_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_12_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P6041' },
      { id: 'ch6_12_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P6157' },
      { id: 'ch6_12_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P6391' },
      { id: 'ch6_12_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P6171' },
      { id: 'ch6_12_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P6298' },
      { id: 'ch6_12_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P6341' },
      { id: 'ch6_12_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P6047' },
      { id: 'ch6_12_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P6308' },
      { id: 'ch6_12_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P6195' },
      { id: 'ch6_12_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P6339' },
      { id: 'ch6_12_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P6411' },
      { id: 'ch6_12_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P6429' }
    ]
  },
  {
    id: 'ch6_12_2',
    title: '6.12.2 Simpson积分',
    icon: 'M5',
    description: '数值积分的Simpson公式',
    modules: [
      { id: 'ch6_12_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_12_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P6244' },
      { id: 'ch6_12_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P6248' },
      { id: 'ch6_12_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P6284' },
      { id: 'ch6_12_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P6426' },
      { id: 'ch6_12_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P6218' },
      { id: 'ch6_12_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P6287' },
      { id: 'ch6_12_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P6062' },
      { id: 'ch6_12_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P6044' },
      { id: 'ch6_12_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P6246' },
      { id: 'ch6_12_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P6146' },
      { id: 'ch6_12_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P6249' },
      { id: 'ch6_12_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P6272' }
    ]
  },
  {
    id: 'ch6_13',
    title: '6.13 置换群',
    icon: 'M6',
    description: '置换群理论与Burnside引理',
    modules: [
      { id: 'ch6_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch6_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P6267' },
      { id: 'ch6_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P6430' },
      { id: 'ch6_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P6394' },
      { id: 'ch6_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P6064' },
      { id: 'ch6_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P6048' },
      { id: 'ch6_13_prob_6', title: '第6题', type: 'problem', luoguId: 'P6456' },
      { id: 'ch6_13_prob_7', title: '第7题', type: 'problem', luoguId: 'P6180' },
      { id: 'ch6_13_prob_8', title: '第8题', type: 'problem', luoguId: 'P6262' },
      { id: 'ch6_13_prob_9', title: '第9题', type: 'problem', luoguId: 'P6129' },
      { id: 'ch6_13_prob_10', title: '第10题', type: 'problem', luoguId: 'P6019' },
      { id: 'ch6_13_prob_11', title: '第11题', type: 'problem', luoguId: 'P6236' },
      { id: 'ch6_13_prob_12', title: '第12题', type: 'problem', luoguId: 'P6490' }
    ]
  }
  ,
  // Part 7 - Data Structures
  {
    id: 'ch7_1',
    title: '7.1 链表',
    icon: 'DS1',
    description: '链表结构及其在算法中的应用',
    modules: [
      { id: 'ch7_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P7192' },
      { id: 'ch7_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P7421' },
      { id: 'ch7_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P7402' },
      { id: 'ch7_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P7437' },
      { id: 'ch7_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P7196' },
      { id: 'ch7_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P7468' },
      { id: 'ch7_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P7009' },
      { id: 'ch7_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P7353' },
      { id: 'ch7_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P7263' },
      { id: 'ch7_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P7241' },
      { id: 'ch7_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P7474' },
      { id: 'ch7_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P7218' }
    ]
  },
  {
    id: 'ch7_2',
    title: '7.2 栈',
    icon: 'DS11',
    description: '栈结构及应用（表达式求值等）',
    modules: [
      { id: 'ch7_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P7494' },
      { id: 'ch7_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P7197' },
      { id: 'ch7_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P7221' },
      { id: 'ch7_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P7259' },
      { id: 'ch7_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P7205' },
      { id: 'ch7_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P7438' },
      { id: 'ch7_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P7108' },
      { id: 'ch7_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P7271' },
      { id: 'ch7_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P7040' },
      { id: 'ch7_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P7189' },
      { id: 'ch7_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P7393' },
      { id: 'ch7_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P7405' }
    ]
  },
  {
    id: 'ch7_3',
    title: '7.3 队列',
    icon: 'DS12',
    description: '队列结构及单调队列等变体',
    modules: [
      { id: 'ch7_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P7391' },
      { id: 'ch7_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P7180' },
      { id: 'ch7_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P7064' },
      { id: 'ch7_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P7321' },
      { id: 'ch7_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P7097' },
      { id: 'ch7_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P7177' },
      { id: 'ch7_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P7389' },
      { id: 'ch7_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P7100' },
      { id: 'ch7_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P7330' },
      { id: 'ch7_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P7333' },
      { id: 'ch7_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P7364' },
      { id: 'ch7_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P7287' }
    ]
  },
  {
    id: 'ch7_4',
    title: '7.4 并查集',
    icon: 'DS13',
    description: '处理集合合并与查询的数据结构',
    modules: [
      { id: 'ch7_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P7045' },
      { id: 'ch7_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P7099' },
      { id: 'ch7_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P7176' },
      { id: 'ch7_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P7340' },
      { id: 'ch7_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P7227' },
      { id: 'ch7_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P7295' },
      { id: 'ch7_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P7055' },
      { id: 'ch7_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P7054' },
      { id: 'ch7_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P7135' },
      { id: 'ch7_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P7274' },
      { id: 'ch7_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P7277' },
      { id: 'ch7_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P7310' }
    ]
  },
  {
    id: 'ch7_5',
    title: '7.5 二叉堆',
    icon: 'DS14',
    description: '优先队列与堆结构',
    modules: [
      { id: 'ch7_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P7161' },
      { id: 'ch7_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P7487' },
      { id: 'ch7_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P7107' },
      { id: 'ch7_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P7159' },
      { id: 'ch7_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P7457' },
      { id: 'ch7_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P7018' },
      { id: 'ch7_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P7029' },
      { id: 'ch7_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P7231' },
      { id: 'ch7_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P7470' },
      { id: 'ch7_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P7020' },
      { id: 'ch7_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P7010' },
      { id: 'ch7_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P7037' }
    ]
  },
  {
    id: 'ch7_6',
    title: '7.6 ST表',
    icon: 'DS15',
    description: '稀疏表实现静态区间查询',
    modules: [
      { id: 'ch7_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P7346' },
      { id: 'ch7_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P7098' },
      { id: 'ch7_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P7141' },
      { id: 'ch7_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P7222' },
      { id: 'ch7_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P7356' },
      { id: 'ch7_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P7204' },
      { id: 'ch7_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P7369' },
      { id: 'ch7_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P7362' },
      { id: 'ch7_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P7217' },
      { id: 'ch7_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P7008' },
      { id: 'ch7_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P7212' },
      { id: 'ch7_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P7284' }
    ]
  },
  {
    id: 'ch7_7',
    title: '7.7 树状数组',
    icon: 'DS16',
    description: '高效处理前缀和与区间查询',
    modules: [
      { id: 'ch7_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P7061' },
      { id: 'ch7_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P7289' },
      { id: 'ch7_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P7157' },
      { id: 'ch7_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P7120' },
      { id: 'ch7_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P7165' },
      { id: 'ch7_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P7484' },
      { id: 'ch7_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P7213' },
      { id: 'ch7_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P7063' },
      { id: 'ch7_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P7355' },
      { id: 'ch7_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P7339' },
      { id: 'ch7_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P7110' },
      { id: 'ch7_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P7490' }
    ]
  },
  {
    id: 'ch7_8',
    title: '7.8 线段树',
    icon: 'DS17',
    description: '强大的区间查询与修改数据结构',
    modules: [
      { id: 'ch7_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P7403' },
      { id: 'ch7_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P7332' },
      { id: 'ch7_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P7432' },
      { id: 'ch7_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P7261' },
      { id: 'ch7_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P7245' },
      { id: 'ch7_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P7366' },
      { id: 'ch7_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P7031' },
      { id: 'ch7_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P7137' },
      { id: 'ch7_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P7149' },
      { id: 'ch7_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P7152' },
      { id: 'ch7_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P7082' },
      { id: 'ch7_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P7092' }
    ]
  },

  // Part 7 - Advanced Data Structures (continued)
  {
    id: 'ch7_9',
    title: '7.9 分块',
    icon: 'DS18',
    description: '通过分块思想平衡修改和查询的复杂度',
    modules: [
      { id: 'ch7_9_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_9_prob_1', title: '第1题', type: 'problem', luoguId: 'P7247' },
      { id: 'ch7_9_prob_2', title: '第2题', type: 'problem', luoguId: 'P7418' },
      { id: 'ch7_9_prob_3', title: '第3题', type: 'problem', luoguId: 'P7229' },
      { id: 'ch7_9_prob_4', title: '第4题', type: 'problem', luoguId: 'P7085' },
      { id: 'ch7_9_prob_5', title: '第5题', type: 'problem', luoguId: 'P7363' },
      { id: 'ch7_9_prob_6', title: '第6题', type: 'problem', luoguId: 'P7021' },
      { id: 'ch7_9_prob_7', title: '第7题', type: 'problem', luoguId: 'P7422' },
      { id: 'ch7_9_prob_8', title: '第8题', type: 'problem', luoguId: 'P7068' },
      { id: 'ch7_9_prob_9', title: '第9题', type: 'problem', luoguId: 'P7076' },
      { id: 'ch7_9_prob_10', title: '第10题', type: 'problem', luoguId: 'P7142' }
    ]
  },
  {
    id: 'ch7_10',
    title: '7.10 可并堆',
    icon: 'DS2',
    description: '支持高效合并的堆结构',
    modules: [
      { id: 'ch7_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P7390' },
      { id: 'ch7_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P7025' },
      { id: 'ch7_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P7028' },
      { id: 'ch7_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P7459' },
      { id: 'ch7_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P7244' }
    ]
  },
  {
    id: 'ch7_11',
    title: '7.11 主席树',
    icon: 'DS3',
    description: '可持久化线段树，解决区间第K小等问题',
    modules: [
      { id: 'ch7_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P7460' },
      { id: 'ch7_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P7441' },
      { id: 'ch7_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P7206' },
      { id: 'ch7_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P7348' },
      { id: 'ch7_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P7030' }
    ]
  },
  {
    id: 'ch7_12',
    title: '7.12 平衡树',
    icon: 'DS4',
    description: '支持高效动态查询的平衡二叉搜索树',
    modules: [
      { id: 'ch7_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P7111' },
      { id: 'ch7_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P7407' },
      { id: 'ch7_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P7150' },
      { id: 'ch7_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P7347' },
      { id: 'ch7_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P7182' }
    ]
  },
  {
    id: 'ch7_13',
    title: '7.13 树链剖分',
    icon: 'DS5',
    description: '将树转化为线性序列，结合线段树维护',
    modules: [
      { id: 'ch7_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P7208' },
      { id: 'ch7_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P7281' },
      { id: 'ch7_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P7238' },
      { id: 'ch7_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P7250' },
      { id: 'ch7_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P7452' }
    ]
  },
  {
    id: 'ch7_14',
    title: '7.14 树套树',
    icon: 'DS6',
    description: '树中套树，解决多维查询问题',
    modules: [
      { id: 'ch7_14_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_14_prob_1', title: '第1题', type: 'problem', luoguId: 'P7131' },
      { id: 'ch7_14_prob_2', title: '第2题', type: 'problem', luoguId: 'P7350' },
      { id: 'ch7_14_prob_3', title: '第3题', type: 'problem', luoguId: 'P7228' },
      { id: 'ch7_14_prob_4', title: '第4题', type: 'problem', luoguId: 'P7056' },
      { id: 'ch7_14_prob_5', title: '第5题', type: 'problem', luoguId: 'P7236' }
    ]
  },
  {
    id: 'ch7_15',
    title: '7.15 动态树',
    icon: 'DS7',
    description: 'Link-Cut Tree，支持动态树操作',
    modules: [
      { id: 'ch7_15_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_15_prob_1', title: '第1题', type: 'problem', luoguId: 'P7444' },
      { id: 'ch7_15_prob_2', title: '第2题', type: 'problem', luoguId: 'P7256' },
      { id: 'ch7_15_prob_3', title: '第3题', type: 'problem', luoguId: 'P7370' },
      { id: 'ch7_15_prob_4', title: '第4题', type: 'problem', luoguId: 'P7122' },
      { id: 'ch7_15_prob_5', title: '第5题', type: 'problem', luoguId: 'P7465' }
    ]
  },
  {
    id: 'ch7_16',
    title: '7.16 可持久化数据结构',
    icon: 'DS8',
    description: '保留历史版本的数据结构',
    modules: [
      { id: 'ch7_16_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_16_prob_1', title: '第1题', type: 'problem', luoguId: 'P7130' },
      { id: 'ch7_16_prob_2', title: '第2题', type: 'problem', luoguId: 'P7169' },
      { id: 'ch7_16_prob_3', title: '第3题', type: 'problem', luoguId: 'P7083' },
      { id: 'ch7_16_prob_4', title: '第4题', type: 'problem', luoguId: 'P7500' },
      { id: 'ch7_16_prob_5', title: '第5题', type: 'problem', luoguId: 'P7270' }
    ]
  },
  {
    id: 'ch7_17',
    title: '7.17 K-D Tree',
    icon: 'DS9',
    description: '多维空间的高效查询数据结构',
    modules: [
      { id: 'ch7_17_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_17_prob_1', title: '第1题', type: 'problem', luoguId: 'P7071' },
      { id: 'ch7_17_prob_2', title: '第2题', type: 'problem', luoguId: 'P7260' },
      { id: 'ch7_17_prob_3', title: '第3题', type: 'problem', luoguId: 'P7378' },
      { id: 'ch7_17_prob_4', title: '第4题', type: 'problem', luoguId: 'P7272' },
      { id: 'ch7_17_prob_5', title: '第5题', type: 'problem', luoguId: 'P7280' }
    ]
  },
  {
    id: 'ch7_18',
    title: '7.18 珂朵莉树',
    icon: 'DS10',
    description: '基于set的暴力数据结构，处理区间赋值',
    modules: [
      { id: 'ch7_18_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch7_18_prob_1', title: '第1题', type: 'problem', luoguId: 'P7291' },
      { id: 'ch7_18_prob_2', title: '第2题', type: 'problem', luoguId: 'P7434' },
      { id: 'ch7_18_prob_3', title: '第3题', type: 'problem', luoguId: 'P7264' },
      { id: 'ch7_18_prob_4', title: '第4题', type: 'problem', luoguId: 'P7416' },
      { id: 'ch7_18_prob_5', title: '第5题', type: 'problem', luoguId: 'P7464' }
    ]
  },

  // Part 8 - Graph Theory
  {
    id: 'ch8_1',
    title: '8.1 图的存储',
    icon: 'G1',
    description: '邻接矩阵、邻接表等图的表示方法',
    modules: [
      { id: 'ch8_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P8230' },
      { id: 'ch8_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P8419' },
      { id: 'ch8_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P8240' },
      { id: 'ch8_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P8172' },
      { id: 'ch8_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P8274' },
      { id: 'ch8_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P8130' },
      { id: 'ch8_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P8276' },
      { id: 'ch8_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P8444' },
      { id: 'ch8_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P8495' },
      { id: 'ch8_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P8247' },
      { id: 'ch8_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P8131' },
      { id: 'ch8_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P8371' }
    ]
  },
  {
    id: 'ch8_2',
    title: '8.2 最短路',
    icon: 'G6',
    description: 'Dijkstra、Floyd、Bellman-Ford等最短路算法',
    modules: [
      { id: 'ch8_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P8474' },
      { id: 'ch8_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P8139' },
      { id: 'ch8_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P8109' },
      { id: 'ch8_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P8348' },
      { id: 'ch8_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P8374' },
      { id: 'ch8_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P8313' },
      { id: 'ch8_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P8022' },
      { id: 'ch8_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P8486' },
      { id: 'ch8_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P8050' },
      { id: 'ch8_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P8471' },
      { id: 'ch8_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P8190' },
      { id: 'ch8_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P8456' }
    ]
  },
  {
    id: 'ch8_3_1',
    title: '8.3.1 二叉树',
    icon: 'G7',
    description: '二叉树的性质与遍历',
    modules: [
      { id: 'ch8_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P8092' },
      { id: 'ch8_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P8364' },
      { id: 'ch8_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P8105' },
      { id: 'ch8_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P8266' },
      { id: 'ch8_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P8318' },
      { id: 'ch8_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P8447' },
      { id: 'ch8_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P8085' },
      { id: 'ch8_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P8151' },
      { id: 'ch8_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P8382' },
      { id: 'ch8_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P8272' },
      { id: 'ch8_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P8255' },
      { id: 'ch8_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P8332' }
    ]
  },
  {
    id: 'ch8_3_2',
    title: '8.3.2 树的直径',
    icon: 'G8',
    description: '树的最长路径问题',
    modules: [
      { id: 'ch8_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P8234' },
      { id: 'ch8_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P8008' },
      { id: 'ch8_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P8309' },
      { id: 'ch8_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P8265' },
      { id: 'ch8_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P8435' },
      { id: 'ch8_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P8072' },
      { id: 'ch8_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P8073' },
      { id: 'ch8_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P8126' },
      { id: 'ch8_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P8238' },
      { id: 'ch8_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P8192' },
      { id: 'ch8_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P8317' },
      { id: 'ch8_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P8015' }
    ]
  },
  {
    id: 'ch8_3_3',
    title: '8.3.3 最近公共祖先',
    icon: 'G9',
    description: 'LCA问题的各种解法',
    modules: [
      { id: 'ch8_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P8399' },
      { id: 'ch8_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P8051' },
      { id: 'ch8_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P8452' },
      { id: 'ch8_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P8132' },
      { id: 'ch8_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P8031' },
      { id: 'ch8_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P8176' },
      { id: 'ch8_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P8047' },
      { id: 'ch8_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P8334' },
      { id: 'ch8_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P8358' },
      { id: 'ch8_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P8466' },
      { id: 'ch8_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P8059' },
      { id: 'ch8_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P8174' }
    ]
  },
  {
    id: 'ch8_4',
    title: '8.4 最小生成树',
    icon: 'G10',
    description: 'Kruskal、Prim等最小生成树算法',
    modules: [
      { id: 'ch8_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P8052' },
      { id: 'ch8_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P8416' },
      { id: 'ch8_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P8202' },
      { id: 'ch8_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P8071' },
      { id: 'ch8_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P8450' },
      { id: 'ch8_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P8100' },
      { id: 'ch8_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P8361' },
      { id: 'ch8_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P8385' },
      { id: 'ch8_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P8484' },
      { id: 'ch8_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P8414' },
      { id: 'ch8_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P8134' },
      { id: 'ch8_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P8497' }
    ]
  },
  {
    id: 'ch8_5',
    title: '8.5 拓扑排序',
    icon: 'G11',
    description: '有向无环图的拓扑排序',
    modules: [
      { id: 'ch8_5_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_5_prob_1', title: '第1题', type: 'problem', luoguId: 'P8302' },
      { id: 'ch8_5_prob_2', title: '第2题', type: 'problem', luoguId: 'P8428' },
      { id: 'ch8_5_prob_3', title: '第3题', type: 'problem', luoguId: 'P8368' },
      { id: 'ch8_5_prob_4', title: '第4题', type: 'problem', luoguId: 'P8375' },
      { id: 'ch8_5_prob_5', title: '第5题', type: 'problem', luoguId: 'P8426' },
      { id: 'ch8_5_prob_6', title: '第6题', type: 'problem', luoguId: 'P8413' },
      { id: 'ch8_5_prob_7', title: '第7题', type: 'problem', luoguId: 'P8493' },
      { id: 'ch8_5_prob_8', title: '第8题', type: 'problem', luoguId: 'P8186' },
      { id: 'ch8_5_prob_9', title: '第9题', type: 'problem', luoguId: 'P8201' },
      { id: 'ch8_5_prob_10', title: '第10题', type: 'problem', luoguId: 'P8006' },
      { id: 'ch8_5_prob_11', title: '第11题', type: 'problem', luoguId: 'P8103' },
      { id: 'ch8_5_prob_12', title: '第12题', type: 'problem', luoguId: 'P8418' }
    ]
  },
  {
    id: 'ch8_6',
    title: '8.6 差分约束',
    icon: 'G12',
    description: '利用最短路求解不等式组',
    modules: [
      { id: 'ch8_6_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_6_prob_1', title: '第1题', type: 'problem', luoguId: 'P8346' },
      { id: 'ch8_6_prob_2', title: '第2题', type: 'problem', luoguId: 'P8030' },
      { id: 'ch8_6_prob_3', title: '第3题', type: 'problem', luoguId: 'P8360' },
      { id: 'ch8_6_prob_4', title: '第4题', type: 'problem', luoguId: 'P8087' },
      { id: 'ch8_6_prob_5', title: '第5题', type: 'problem', luoguId: 'P8446' },
      { id: 'ch8_6_prob_6', title: '第6题', type: 'problem', luoguId: 'P8267' },
      { id: 'ch8_6_prob_7', title: '第7题', type: 'problem', luoguId: 'P8437' },
      { id: 'ch8_6_prob_8', title: '第8题', type: 'problem', luoguId: 'P8207' },
      { id: 'ch8_6_prob_9', title: '第9题', type: 'problem', luoguId: 'P8422' },
      { id: 'ch8_6_prob_10', title: '第10题', type: 'problem', luoguId: 'P8386' },
      { id: 'ch8_6_prob_11', title: '第11题', type: 'problem', luoguId: 'P8091' },
      { id: 'ch8_6_prob_12', title: '第12题', type: 'problem', luoguId: 'P8401' }
    ]
  },
  {
    id: 'ch8_7',
    title: '8.7 连通性',
    icon: 'G13',
    description: '强连通分量、割点、桥等',
    modules: [
      { id: 'ch8_7_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_7_prob_1', title: '第1题', type: 'problem', luoguId: 'P8067' },
      { id: 'ch8_7_prob_2', title: '第2题', type: 'problem', luoguId: 'P8086' },
      { id: 'ch8_7_prob_3', title: '第3题', type: 'problem', luoguId: 'P8205' },
      { id: 'ch8_7_prob_4', title: '第4题', type: 'problem', luoguId: 'P8335' },
      { id: 'ch8_7_prob_5', title: '第5题', type: 'problem', luoguId: 'P8356' },
      { id: 'ch8_7_prob_6', title: '第6题', type: 'problem', luoguId: 'P8154' },
      { id: 'ch8_7_prob_7', title: '第7题', type: 'problem', luoguId: 'P8193' },
      { id: 'ch8_7_prob_8', title: '第8题', type: 'problem', luoguId: 'P8314' },
      { id: 'ch8_7_prob_9', title: '第9题', type: 'problem', luoguId: 'P8373' },
      { id: 'ch8_7_prob_10', title: '第10题', type: 'problem', luoguId: 'P8366' },
      { id: 'ch8_7_prob_11', title: '第11题', type: 'problem', luoguId: 'P8463' },
      { id: 'ch8_7_prob_12', title: '第12题', type: 'problem', luoguId: 'P8253' }
    ]
  },
  {
    id: 'ch8_8',
    title: '8.8 二分图',
    icon: 'G14',
    description: '二分图匹配与染色问题',
    modules: [
      { id: 'ch8_8_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_8_prob_1', title: '第1题', type: 'problem', luoguId: 'P8185' },
      { id: 'ch8_8_prob_2', title: '第2题', type: 'problem', luoguId: 'P8164' },
      { id: 'ch8_8_prob_3', title: '第3题', type: 'problem', luoguId: 'P8037' },
      { id: 'ch8_8_prob_4', title: '第4题', type: 'problem', luoguId: 'P8281' },
      { id: 'ch8_8_prob_5', title: '第5题', type: 'problem', luoguId: 'P8258' },
      { id: 'ch8_8_prob_6', title: '第6题', type: 'problem', luoguId: 'P8114' },
      { id: 'ch8_8_prob_7', title: '第7题', type: 'problem', luoguId: 'P8365' },
      { id: 'ch8_8_prob_8', title: '第8题', type: 'problem', luoguId: 'P8166' },
      { id: 'ch8_8_prob_9', title: '第9题', type: 'problem', luoguId: 'P8083' },
      { id: 'ch8_8_prob_10', title: '第10题', type: 'problem', luoguId: 'P8490' },
      { id: 'ch8_8_prob_11', title: '第11题', type: 'problem', luoguId: 'P8424' },
      { id: 'ch8_8_prob_12', title: '第12题', type: 'problem', luoguId: 'P8398' }
    ]
  },
  {
    id: 'ch8_9_1',
    title: '8.9.1 最大流',
    icon: 'G15',
    description: '网络流最大流算法',
    modules: [
      { id: 'ch8_9_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P8449' },
      { id: 'ch8_9_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P8485' },
      { id: 'ch8_9_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P8011' },
      { id: 'ch8_9_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P8197' },
      { id: 'ch8_9_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P8012' },
      { id: 'ch8_9_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P8241' },
      { id: 'ch8_9_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P8469' },
      { id: 'ch8_9_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P8409' },
      { id: 'ch8_9_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P8017' },
      { id: 'ch8_9_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P8142' },
      { id: 'ch8_9_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P8090' },
      { id: 'ch8_9_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P8325' }
    ]
  },
  {
    id: 'ch8_9_2',
    title: '8.9.2 最小割',
    icon: 'G16',
    description: '网络流最小割问题',
    modules: [
      { id: 'ch8_9_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P8280' },
      { id: 'ch8_9_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P8476' },
      { id: 'ch8_9_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P8214' },
      { id: 'ch8_9_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P8429' },
      { id: 'ch8_9_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P8289' },
      { id: 'ch8_9_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P8454' },
      { id: 'ch8_9_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P8251' },
      { id: 'ch8_9_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P8243' },
      { id: 'ch8_9_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P8359' },
      { id: 'ch8_9_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P8423' },
      { id: 'ch8_9_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P8380' },
      { id: 'ch8_9_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P8018' }
    ]
  },
  {
    id: 'ch8_9_3',
    title: '8.9.3 费用流',
    icon: 'G17',
    description: '最小费用最大流算法',
    modules: [
      { id: 'ch8_9_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P8167' },
      { id: 'ch8_9_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P8436' },
      { id: 'ch8_9_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P8299' },
      { id: 'ch8_9_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P8273' },
      { id: 'ch8_9_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P8074' },
      { id: 'ch8_9_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P8048' },
      { id: 'ch8_9_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P8117' },
      { id: 'ch8_9_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P8427' },
      { id: 'ch8_9_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P8226' },
      { id: 'ch8_9_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P8275' },
      { id: 'ch8_9_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P8065' },
      { id: 'ch8_9_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P8402' }
    ]
  },
  {
    id: 'ch8_9_4',
    title: '8.9.4 有上下界网络流',
    icon: 'G18',
    description: '带容量限制的网络流问题',
    modules: [
      { id: 'ch8_9_4_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_9_4_prob_1', title: '第1题', type: 'problem', luoguId: 'P8291' },
      { id: 'ch8_9_4_prob_2', title: '第2题', type: 'problem', luoguId: 'P8406' },
      { id: 'ch8_9_4_prob_3', title: '第3题', type: 'problem', luoguId: 'P8283' },
      { id: 'ch8_9_4_prob_4', title: '第4题', type: 'problem', luoguId: 'P8387' },
      { id: 'ch8_9_4_prob_5', title: '第5题', type: 'problem', luoguId: 'P8239' },
      { id: 'ch8_9_4_prob_6', title: '第6题', type: 'problem', luoguId: 'P8438' },
      { id: 'ch8_9_4_prob_7', title: '第7题', type: 'problem', luoguId: 'P8488' },
      { id: 'ch8_9_4_prob_8', title: '第8题', type: 'problem', luoguId: 'P8040' },
      { id: 'ch8_9_4_prob_9', title: '第9题', type: 'problem', luoguId: 'P8379' },
      { id: 'ch8_9_4_prob_10', title: '第10题', type: 'problem', luoguId: 'P8327' },
      { id: 'ch8_9_4_prob_11', title: '第11题', type: 'problem', luoguId: 'P8391' },
      { id: 'ch8_9_4_prob_12', title: '第12题', type: 'problem', luoguId: 'P8215' }
    ]
  },
  {
    id: 'ch8_10',
    title: '8.10 2-SAT',
    icon: 'G2',
    description: '二元可满足性问题',
    modules: [
      { id: 'ch8_10_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_10_prob_1', title: '第1题', type: 'problem', luoguId: 'P8286' },
      { id: 'ch8_10_prob_2', title: '第2题', type: 'problem', luoguId: 'P8483' },
      { id: 'ch8_10_prob_3', title: '第3题', type: 'problem', luoguId: 'P8403' },
      { id: 'ch8_10_prob_4', title: '第4题', type: 'problem', luoguId: 'P8457' },
      { id: 'ch8_10_prob_5', title: '第5题', type: 'problem', luoguId: 'P8036' },
      { id: 'ch8_10_prob_6', title: '第6题', type: 'problem', luoguId: 'P8058' },
      { id: 'ch8_10_prob_7', title: '第7题', type: 'problem', luoguId: 'P8204' },
      { id: 'ch8_10_prob_8', title: '第8题', type: 'problem', luoguId: 'P8220' },
      { id: 'ch8_10_prob_9', title: '第9题', type: 'problem', luoguId: 'P8066' },
      { id: 'ch8_10_prob_10', title: '第10题', type: 'problem', luoguId: 'P8333' },
      { id: 'ch8_10_prob_11', title: '第11题', type: 'problem', luoguId: 'P8005' },
      { id: 'ch8_10_prob_12', title: '第12题', type: 'problem', luoguId: 'P8203' }
    ]
  },
  {
    id: 'ch8_11',
    title: '8.11 点分治',
    icon: 'G3',
    description: '树上路径问题的分治算法',
    modules: [
      { id: 'ch8_11_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_11_prob_1', title: '第1题', type: 'problem', luoguId: 'P8295' },
      { id: 'ch8_11_prob_2', title: '第2题', type: 'problem', luoguId: 'P8482' },
      { id: 'ch8_11_prob_3', title: '第3题', type: 'problem', luoguId: 'P8344' },
      { id: 'ch8_11_prob_4', title: '第4题', type: 'problem', luoguId: 'P8370' },
      { id: 'ch8_11_prob_5', title: '第5题', type: 'problem', luoguId: 'P8116' },
      { id: 'ch8_11_prob_6', title: '第6题', type: 'problem', luoguId: 'P8311' },
      { id: 'ch8_11_prob_7', title: '第7题', type: 'problem', luoguId: 'P8321' },
      { id: 'ch8_11_prob_8', title: '第8题', type: 'problem', luoguId: 'P8169' },
      { id: 'ch8_11_prob_9', title: '第9题', type: 'problem', luoguId: 'P8138' },
      { id: 'ch8_11_prob_10', title: '第10题', type: 'problem', luoguId: 'P8310' },
      { id: 'ch8_11_prob_11', title: '第11题', type: 'problem', luoguId: 'P8211' },
      { id: 'ch8_11_prob_12', title: '第12题', type: 'problem', luoguId: 'P8165' }
    ]
  },
  {
    id: 'ch8_12',
    title: '8.12 虚树',
    icon: 'G4',
    description: '树上关键点的简化树结构',
    modules: [
      { id: 'ch8_12_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_12_prob_1', title: '第1题', type: 'problem', luoguId: 'P8143' },
      { id: 'ch8_12_prob_2', title: '第2题', type: 'problem', luoguId: 'P8121' },
      { id: 'ch8_12_prob_3', title: '第3题', type: 'problem', luoguId: 'P8400' },
      { id: 'ch8_12_prob_4', title: '第4题', type: 'problem', luoguId: 'P8064' },
      { id: 'ch8_12_prob_5', title: '第5题', type: 'problem', luoguId: 'P8308' },
      { id: 'ch8_12_prob_6', title: '第6题', type: 'problem', luoguId: 'P8329' },
      { id: 'ch8_12_prob_7', title: '第7题', type: 'problem', luoguId: 'P8269' },
      { id: 'ch8_12_prob_8', title: '第8题', type: 'problem', luoguId: 'P8026' },
      { id: 'ch8_12_prob_9', title: '第9题', type: 'problem', luoguId: 'P8180' },
      { id: 'ch8_12_prob_10', title: '第10题', type: 'problem', luoguId: 'P8231' },
      { id: 'ch8_12_prob_11', title: '第11题', type: 'problem', luoguId: 'P8045' },
      { id: 'ch8_12_prob_12', title: '第12题', type: 'problem', luoguId: 'P8099' }
    ]
  },
  {
    id: 'ch8_13',
    title: '8.13 Matrix Tree定理',
    icon: 'G5',
    description: '利用矩阵计算生成树个数',
    modules: [
      { id: 'ch8_13_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch8_13_prob_1', title: '第1题', type: 'problem', luoguId: 'P8178' },
      { id: 'ch8_13_prob_2', title: '第2题', type: 'problem', luoguId: 'P8162' },
      { id: 'ch8_13_prob_3', title: '第3题', type: 'problem', luoguId: 'P8055' },
      { id: 'ch8_13_prob_4', title: '第4题', type: 'problem', luoguId: 'P8411' },
      { id: 'ch8_13_prob_5', title: '第5题', type: 'problem', luoguId: 'P8098' },
      { id: 'ch8_13_prob_6', title: '第6题', type: 'problem', luoguId: 'P8345' },
      { id: 'ch8_13_prob_7', title: '第7题', type: 'problem', luoguId: 'P8383' },
      { id: 'ch8_13_prob_8', title: '第8题', type: 'problem', luoguId: 'P8378' },
      { id: 'ch8_13_prob_9', title: '第9题', type: 'problem', luoguId: 'P8441' },
      { id: 'ch8_13_prob_10', title: '第10题', type: 'problem', luoguId: 'P8297' },
      { id: 'ch8_13_prob_11', title: '第11题', type: 'problem', luoguId: 'P8324' },
      { id: 'ch8_13_prob_12', title: '第12题', type: 'problem', luoguId: 'P8412' }
    ]
  },

  // Part 9 - Computational Geometry
  {
    id: 'ch9_1',
    title: '9.1 凸包',
    icon: 'CG1',
    description: '计算点集的凸包结构',
    modules: [
      { id: 'ch9_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P9472' },
      { id: 'ch9_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P9187' },
      { id: 'ch9_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P9172' },
      { id: 'ch9_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P9257' },
      { id: 'ch9_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P9412' },
      { id: 'ch9_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P9413' },
      { id: 'ch9_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P9407' },
      { id: 'ch9_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P9065' },
      { id: 'ch9_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P9041' },
      { id: 'ch9_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P9247' },
      { id: 'ch9_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P9123' },
      { id: 'ch9_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P9364' }
    ]
  },
  {
    id: 'ch9_2',
    title: '9.2 旋转卡壳',
    icon: 'CG2',
    description: '利用旋转卡壳求解凸包相关问题',
    modules: [
      { id: 'ch9_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P9194' },
      { id: 'ch9_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P9448' },
      { id: 'ch9_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P9469' },
      { id: 'ch9_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P9024' },
      { id: 'ch9_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P9403' },
      { id: 'ch9_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P9327' },
      { id: 'ch9_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P9354' },
      { id: 'ch9_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P9460' },
      { id: 'ch9_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P9349' },
      { id: 'ch9_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P9310' },
      { id: 'ch9_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P9314' },
      { id: 'ch9_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P9337' }
    ]
  },
  {
    id: 'ch9_3',
    title: '9.3 半平面交',
    icon: 'CG3',
    description: '求解多个半平面的交集',
    modules: [
      { id: 'ch9_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch9_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P9474' },
      { id: 'ch9_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P9311' },
      { id: 'ch9_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P9449' },
      { id: 'ch9_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P9435' },
      { id: 'ch9_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P9335' },
      { id: 'ch9_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P9499' },
      { id: 'ch9_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P9211' },
      { id: 'ch9_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P9340' },
      { id: 'ch9_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P9222' },
      { id: 'ch9_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P9028' },
      { id: 'ch9_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P9102' },
      { id: 'ch9_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P9461' }
    ]
  },

  // Part 10 - Miscellaneous
  {
    id: 'ch10_1',
    title: '10.1 模拟退火',
    icon: 'X1',
    description: '基于物理退火过程的随机优化算法',
    modules: [
      { id: 'ch10_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P10037' },
      { id: 'ch10_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P10039' },
      { id: 'ch10_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P10133' },
      { id: 'ch10_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P10253' },
      { id: 'ch10_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P10212' },
      { id: 'ch10_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P10246' },
      { id: 'ch10_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P10385' },
      { id: 'ch10_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P10130' },
      { id: 'ch10_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P10100' },
      { id: 'ch10_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P10369' },
      { id: 'ch10_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P10240' },
      { id: 'ch10_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P10284' }
    ]
  },
  {
    id: 'ch10_2',
    title: '10.2 分数规划',
    icon: 'X2',
    description: '求解分数形式的最优化问题',
    modules: [
      { id: 'ch10_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P10426' },
      { id: 'ch10_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P10175' },
      { id: 'ch10_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P10272' },
      { id: 'ch10_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P10092' },
      { id: 'ch10_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P10354' },
      { id: 'ch10_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P10055' },
      { id: 'ch10_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P10048' },
      { id: 'ch10_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P10285' },
      { id: 'ch10_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P10202' },
      { id: 'ch10_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P10196' },
      { id: 'ch10_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P10214' },
      { id: 'ch10_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P10079' }
    ]
  },
  {
    id: 'ch10_3_1',
    title: '10.3.1 CDQ分治',
    icon: 'X3',
    description: '基于分治思想解决偏序问题',
    modules: [
      { id: 'ch10_3_1_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_1_prob_1', title: '第1题', type: 'problem', luoguId: 'P10248' },
      { id: 'ch10_3_1_prob_2', title: '第2题', type: 'problem', luoguId: 'P10234' },
      { id: 'ch10_3_1_prob_3', title: '第3题', type: 'problem', luoguId: 'P10403' },
      { id: 'ch10_3_1_prob_4', title: '第4题', type: 'problem', luoguId: 'P10334' },
      { id: 'ch10_3_1_prob_5', title: '第5题', type: 'problem', luoguId: 'P10041' },
      { id: 'ch10_3_1_prob_6', title: '第6题', type: 'problem', luoguId: 'P10363' },
      { id: 'ch10_3_1_prob_7', title: '第7题', type: 'problem', luoguId: 'P10182' },
      { id: 'ch10_3_1_prob_8', title: '第8题', type: 'problem', luoguId: 'P10343' },
      { id: 'ch10_3_1_prob_9', title: '第9题', type: 'problem', luoguId: 'P10297' },
      { id: 'ch10_3_1_prob_10', title: '第10题', type: 'problem', luoguId: 'P10419' },
      { id: 'ch10_3_1_prob_11', title: '第11题', type: 'problem', luoguId: 'P10365' },
      { id: 'ch10_3_1_prob_12', title: '第12题', type: 'problem', luoguId: 'P10420' }
    ]
  },
  {
    id: 'ch10_3_2',
    title: '10.3.2 整体二分',
    icon: 'X4',
    description: '对多个查询同时进行二分',
    modules: [
      { id: 'ch10_3_2_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_2_prob_1', title: '第1题', type: 'problem', luoguId: 'P10015' },
      { id: 'ch10_3_2_prob_2', title: '第2题', type: 'problem', luoguId: 'P10446' },
      { id: 'ch10_3_2_prob_3', title: '第3题', type: 'problem', luoguId: 'P10187' },
      { id: 'ch10_3_2_prob_4', title: '第4题', type: 'problem', luoguId: 'P10114' },
      { id: 'ch10_3_2_prob_5', title: '第5题', type: 'problem', luoguId: 'P10004' },
      { id: 'ch10_3_2_prob_6', title: '第6题', type: 'problem', luoguId: 'P10250' },
      { id: 'ch10_3_2_prob_7', title: '第7题', type: 'problem', luoguId: 'P10050' },
      { id: 'ch10_3_2_prob_8', title: '第8题', type: 'problem', luoguId: 'P10030' },
      { id: 'ch10_3_2_prob_9', title: '第9题', type: 'problem', luoguId: 'P10153' },
      { id: 'ch10_3_2_prob_10', title: '第10题', type: 'problem', luoguId: 'P10111' },
      { id: 'ch10_3_2_prob_11', title: '第11题', type: 'problem', luoguId: 'P10345' },
      { id: 'ch10_3_2_prob_12', title: '第12题', type: 'problem', luoguId: 'P10183' }
    ]
  },
  {
    id: 'ch10_3_3',
    title: '10.3.3 莫队算法',
    icon: 'X5',
    description: '通过分块和排序优化区间查询',
    modules: [
      { id: 'ch10_3_3_intro', title: '算法介绍', type: 'intro' },
      { id: 'ch10_3_3_prob_1', title: '第1题', type: 'problem', luoguId: 'P10445' },
      { id: 'ch10_3_3_prob_2', title: '第2题', type: 'problem', luoguId: 'P10174' },
      { id: 'ch10_3_3_prob_3', title: '第3题', type: 'problem', luoguId: 'P10096' },
      { id: 'ch10_3_3_prob_4', title: '第4题', type: 'problem', luoguId: 'P10094' },
      { id: 'ch10_3_3_prob_5', title: '第5题', type: 'problem', luoguId: 'P10346' },
      { id: 'ch10_3_3_prob_6', title: '第6题', type: 'problem', luoguId: 'P10360' },
      { id: 'ch10_3_3_prob_7', title: '第7题', type: 'problem', luoguId: 'P10042' },
      { id: 'ch10_3_3_prob_8', title: '第8题', type: 'problem', luoguId: 'P10230' },
      { id: 'ch10_3_3_prob_9', title: '第9题', type: 'problem', luoguId: 'P10318' },
      { id: 'ch10_3_3_prob_10', title: '第10题', type: 'problem', luoguId: 'P10296' },
      { id: 'ch10_3_3_prob_11', title: '第11题', type: 'problem', luoguId: 'P10211' },
      { id: 'ch10_3_3_prob_12', title: '第12题', type: 'problem', luoguId: 'P10258' }
    ]
  }
];
