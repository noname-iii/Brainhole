// 缺失的Part7内容 - 高级数据结构篇
Object.assign(LESSON_CONTENT, {
  'ch7_9_intro': {
    problemDesc: `## 🧱 7.9 分块（块状数据结构，莫队基础）

### 这是什么问题？

想象你是一个图书馆管理员，面前有100万本书排成一排，读者们不断提出两种要求：
1. **修改操作**：把第i本书的价格改成x元 💰
2. **查询操作**：统计第i本到第j本书的总价格 📊

如果用普通数组，修改O(1)但查询O(n)；如果用前缀和，查询O(1)但修改O(n)。有没有两全其美的办法？

**分块思想**：把100万本书分成1000堆，每堆1000本。每堆维护一个"总价标签"。这样：
- 修改一本书：更新它所在堆的标签，O(√n)
- 查询区间：完整堆直接加标签，零散的本本加，O(√n)

这就是**块状数据结构**的精髓！它还是**莫队算法**的基础——一个能解决区间查询问题的神奇离线技巧。`,

    idea: `## 💡 算法思想

### 一、分块：平衡的艺术 🎭

想象你在分蛋糕🍰，一整块太大不好拿，太碎又麻烦。分块就是把数据分成"大小适中"的小块：

- **块大小**：通常设为√n（n是数据规模）
- **块数量**：也是√n个块
- **核心思想**：用空间换时间，用"块级操作"代替"逐个操作"

> 🎯 比喻：分块就像班级管理！老师不直接管50个学生，而是管5个组长，每个组长管10个学生。效率up up！

### 二、块状数组的操作

**预处理**：
1. 把数组分成√n块，每块√n个元素
2. 计算每块的和/最值/其他信息

**单点修改**：
1. 找到元素所在的块
2. 更新元素值
3. 更新该块的信息
→ 时间复杂度：O(√n)

**区间查询**：
1. 如果区间在同一个块内：暴力遍历，O(√n)
2. 如果跨多个块：
   - 左边的零散部分：暴力遍历
   - 中间的完整块：直接加块信息
   - 右边的零散部分：暴力遍历
→ 时间复杂度：O(√n)

### 三、莫队算法：分块的升级版 🚀

莫队算法解决的是**离线区间查询**问题。核心思想：

1. 把所有查询按"左端点所在块"排序
2. 同一块内按"右端点"排序
3. 维护一个"当前区间"，通过**移动端点**来回答所有查询

> 🧠 关键洞察：相邻查询的区间重叠很多，移动端点的代价很小！

**时间复杂度**：O(n√n)，比暴力快得多！`,

    derivation: `## 分块的推导与实现

### 1. 块状数组的数学分析

设数组长度为n，块大小为B：
- 块数量：⌈n/B⌉
- 单点修改：O(1)更新元素 + O(1)更新块信息 = O(1)
- 区间查询：最多2个零散块（各B个元素）+ 最多n/B个完整块
  - 总时间：O(B + n/B)

**最优块大小**：令 B = n/B，解得 B = √n
- 此时时间复杂度：O(√n)

### 2. 块状数组代码实现

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int BLOCK = 320; // √100000 ≈ 316

int a[MAXN];        // 原数组
long long sum[350]; // 每块的和
int n, m;

// 查询元素x所在的块编号
int getBlock(int x) {
    return x / BLOCK;
}

// 单点修改：a[pos] += val
void update(int pos, int val) {
    int b = getBlock(pos);
    a[pos] += val;
    sum[b] += val; // 更新块信息
}

// 区间查询：sum(a[l..r])
long long query(int l, int r) {
    long long ans = 0;
    int bl = getBlock(l), br = getBlock(r);
    
    if (bl == br) {
        // 同一个块内：暴力
        for (int i = l; i <= r; i++)
            ans += a[i];
    } else {
        // 左边零散部分
        for (int i = l; i < (bl + 1) * BLOCK; i++)
            ans += a[i];
        // 中间完整块
        for (int b = bl + 1; b < br; b++)
            ans += sum[b];
        // 右边零散部分
        for (int i = br * BLOCK; i <= r; i++)
            ans += a[i];
    }
    return ans;
}
\`\`\`

### 3. 莫队算法推导

**问题**：给定数组a，多次查询区间[l,r]内不同元素的个数。

**朴素做法**：每次查询用set统计，O(n log n) per query，总O(n² log n) ❌

**莫队优化**：
1. 离线所有查询
2. 按左端点分块排序，同块内按右端点排序
3. 维护当前区间的答案，通过移动端点更新

**关键分析**：
- 左端点：每次最多移动O(√n)（因为同块内）
- 右端点：每换一个块，右端点最多移动O(n)，共√n个块，总O(n√n)
- 总时间复杂度：O(n√n) ✅

\`\`\`cpp
struct Query {
    int l, r, id;
} q[MAXN];

// 排序规则
bool cmp(Query a, Query b) {
    int ba = a.l / BLOCK, bb = b.l / BLOCK;
    if (ba != bb) return ba < bb;
    return a.r < b.r; // 同块内按右端点排序
}

int cnt[MAXN]; // 每个元素出现次数
int ans[MAXN];
int currentAns = 0;

// 添加元素
void add(int pos) {
    cnt[a[pos]]++;
    if (cnt[a[pos]] == 1) currentAns++; // 新出现
}

// 删除元素
void del(int pos) {
    cnt[a[pos]]--;
    if (cnt[a[pos]] == 0) currentAns--; // 消失了
}

// 莫队主过程
void moTeam() {
    sort(q + 1, q + m + 1, cmp);
    int curL = 1, curR = 0; // 当前区间为空
    
    for (int i = 1; i <= m; i++) {
        // 扩展区间
        while (curR < q[i].r) add(++curR);
        while (curL > q[i].l) add(--curL);
        // 缩小区间
        while (curR > q[i].r) del(curR--);
        while (curL < q[i].l) del(curL++);
        
        ans[q[i].id] = currentAns;
    }
}
\`\`\`

### 4. 时间复杂度总结

| 操作 | 块状数组 | 莫队算法 |
|------|---------|---------|
| 预处理 | O(n) | O(n) |
| 单点修改 | O(√n) | - |
| 区间查询 | O(√n) | - |
| 离线查询 | - | O(n√n) |

分块是"暴力与数据结构的桥梁"，莫队是"离线查询的神器"！`,

    code: `// 完整示例：块状数组 + 莫队
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int BLOCK = 320;

int a[MAXN];
long long sum[350];
int n, m;

// 块状数组实现
int getBlock(int x) {
    return x / BLOCK;
}

void update(int pos, int val) {
    int b = getBlock(pos);
    a[pos] += val;
    sum[b] += val;
}

long long query(int l, int r) {
    long long ans = 0;
    int bl = getBlock(l), br = getBlock(r);
    
    if (bl == br) {
        for (int i = l; i <= r; i++)
            ans += a[i];
    } else {
        for (int i = l; i < (bl + 1) * BLOCK; i++)
            ans += a[i];
        for (int b = bl + 1; b < br; b++)
            ans += sum[b];
        for (int i = br * BLOCK; i <= r; i++)
            ans += a[i];
    }
    return ans;
}

// 莫队算法实现
struct Query {
    int l, r, id;
} q[MAXN];

bool cmp(Query a, Query b) {
    int ba = a.l / BLOCK, bb = b.l / BLOCK;
    if (ba != bb) return ba < bb;
    return a.r < b.r;
}

int cnt[MAXN], ans[MAXN], currentAns = 0;

void add(int pos) {
    cnt[a[pos]]++;
    if (cnt[a[pos]] == 1) currentAns++;
}

void del(int pos) {
    cnt[a[pos]]--;
    if (cnt[a[pos]] == 0) currentAns--;
}

void moTeam() {
    sort(q + 1, q + m + 1, cmp);
    int curL = 1, curR = 0;
    
    for (int i = 1; i <= m; i++) {
        while (curR < q[i].r) add(++curR);
        while (curL > q[i].l) add(--curL);
        while (curR > q[i].r) del(curR--);
        while (curL < q[i].l) del(curL++);
        ans[q[i].id] = currentAns;
    }
}

int main() {
    // 块状数组用法
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        sum[getBlock(i)] += a[i];
    }
    
    // 莫队用法
    for (int i = 1; i <= m; i++) {
        cin >> q[i].l >> q[i].r;
        q[i].id = i;
    }
    moTeam();
    for (int i = 1; i <= m; i++)
        cout << ans[i] << "\\n";
    
    return 0;
}`
  },

  'ch7_10_intro': {
    problemDesc: `## 🌲 7.10 可并堆（左偏树）

### 这是什么问题？

想象你是一个游戏设计师，需要管理玩家的战斗力排名系统🏆：
1. **合并两个公会**：把公会A和公会B的成员合并成一个新公会 🤝
2. **查询最强玩家**：找出某个公会中战斗力最高的人 👑
3. **删除最强玩家**：把公会中最强的人踢出去（比如他开挂了）❌

如果用普通堆，合并两个堆需要O(n)——把一个小堆的元素逐个插入大堆。太慢了！

**可并堆**（Mergeable Heap）就是为了解决这个问题！它支持：
- **合并**两个堆：O(log n) 甚至 O(1)
- **插入**元素：O(log n)
- **查询/删除最值**：O(log n)

**左偏树**（Leftist Tree）是可并堆的一种优雅实现，它通过"左偏"的性质保证树的高度平衡，让合并操作飞快！`,

    idea: `## 💡 算法思想

### 一、什么是可并堆？ 🎯

可并堆就是一种**支持快速合并**的堆数据结构。

> 🧠 比喻：普通堆像一个严格的班级，只能按成绩排队。可并堆像两个班级合并，能快速重新排好队！

**核心操作**：
- **merge(A, B)**：合并两个堆，返回新堆
- **insert(x)**：插入元素（可以看成merge一个单元素堆）
- **findMin()**：查询最小值
- **deleteMin()**：删除最小值

### 二、左偏树的性质 🌳

左偏树是一种**二叉树**，满足：
1. **堆性质**：每个节点的值 ≤ 它儿子的值（小根堆）
2. **左偏性质**：每个节点的左儿子距离 ≥ 右儿子距离

**距离（dist）**定义：
- 空节点的dist = -1
- 非空节点的dist = 右儿子的dist + 1

> 🎯 关键洞察：左偏树的"左偏"保证了树的高度是O(log n)！

**为什么左偏能保证平衡？**
- 如果一个节点有n个后代，它的dist最多是log(n+1)-1
- 因为左偏，左子树至少和右子树一样"深"
- 所以树不会"歪"得太厉害

### 三、合并操作的核心思想 🚀

合并两个左偏树A和B（假设A的根更小）：
1. 把B合并到A的**右子树**（因为右子树更"浅"）
2. 递归合并A的右子树和B
3. 合并后，如果左儿子的dist < 右儿子的dist，交换左右儿子（恢复左偏性质）
4. 更新当前节点的dist

**时间复杂度**：O(log n)，因为每次递归都往右走，而右路径长度是O(log n)！`,

    derivation: `## 左偏树的推导与实现

### 1. 左偏树的数学性质

**定理**：一棵有n个节点的左偏树，根节点的dist ≤ log₂(n+1) - 1

**证明**（归纳法）：
- 基础：n=1时，dist=0，log₂(2)-1=0 ✓
- 归纳：设左子树有nL个节点，右子树有nR个节点
  - 由左偏性质：dist(left) ≥ dist(right)
  - 由归纳假设：dist(right) ≤ log₂(nR+1) - 1
  - 所以 dist(root) = dist(right) + 1 ≤ log₂(nR+1)
  - 又因为 n ≥ nL + nR + 1 ≥ 2·nR + 1（左偏保证左子树≥右子树）
  - 所以 nR ≤ (n-1)/2
  - 代入得：dist(root) ≤ log₂((n-1)/2 + 1) = log₂((n+1)/2) = log₂(n+1) - 1 ✓

**推论**：左偏树的高度是O(log n)，所以merge操作是O(log n)！

### 2. 节点结构

\`\`\`cpp
struct Node {
    int val;       // 节点值
    int dist;      // 距离
    int left, right; // 左右儿子
    int fa;        // 父节点（用于删除）
} t[MAXN];
\`\`\`

### 3. 合并操作实现

\`\`\`cpp
// 合并两棵左偏树，返回新树的根
int merge(int x, int y) {
    if (!x || !y) return x | y; // 空树处理
    
    // 保证x是较小的（堆性质）
    if (t[x].val > t[y].val) swap(x, y);
    
    // 把y合并到x的右子树
    t[x].right = merge(t[x].right, y);
    t[t[x].right].fa = x; // 维护父指针
    
    // 恢复左偏性质
    if (t[t[x].left].dist < t[t[x].right].dist)
        swap(t[x].left, t[x].right);
    
    // 更新dist
    t[x].dist = t[t[x].right].dist + 1;
    
    return x;
}
\`\`\`

### 4. 其他操作

\`\`\`cpp
// 插入元素：合并一个单节点
int insert(int root, int val) {
    int x = ++nodeCnt;
    t[x].val = val;
    t[x].dist = 0;
    t[x].left = t[x].right = 0;
    return merge(root, x);
}

// 查询最小值
int findMin(int root) {
    return t[root].val;
}

// 删除最小值：把根的左右子树合并
int deleteMin(int root) {
    int left = t[root].left;
    int right = t[root].right;
    t[left].fa = t[right].fa = 0;
    return merge(left, right);
}

// 删除任意节点（需要父指针）
int deleteNode(int x) {
    int left = t[x].left, right = t[x].right;
    int fa = t[x].fa;
    
    // 合并x的左右子树
    int newSubtree = merge(left, right);
    t[newSubtree].fa = fa;
    
    // 把x从父节点断开，连上新子树
    if (t[fa].left == x) t[fa].left = newSubtree;
    else t[fa].right = newSubtree;
    
    // 向上维护左偏性质
    while (fa) {
        if (t[t[fa].left].dist < t[t[fa].right].dist)
            swap(t[fa].left, t[fa].right);
        t[fa].dist = t[t[fa].right].dist + 1;
        fa = t[fa].fa;
    }
    
    return newSubtree; // 返回新根
}
\`\`\`

### 5. 时间复杂度总结

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| merge | O(log n) | 递归深度≤log n |
| insert | O(log n) | 一次merge |
| findMin | O(1) | 直接返回根 |
| deleteMin | O(log n) | 一次merge |
| deleteNode | O(log n) | merge + 向上维护 |

左偏树是"可并堆的优雅实现"，在需要频繁合并堆的场景中大放异彩！`,

    code: `// 完整示例：左偏树实现可并堆
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

struct Node {
    int val, dist;
    int left, right, fa;
} t[MAXN];

int nodeCnt = 0;

// 初始化节点
void init(int x, int val) {
    t[x].val = val;
    t[x].dist = 0;
    t[x].left = t[x].right = t[x].fa = 0;
}

// 合并两棵左偏树
int merge(int x, int y) {
    if (!x || !y) return x | y;
    
    if (t[x].val > t[y].val) swap(x, y);
    
    t[x].right = merge(t[x].right, y);
    t[t[x].right].fa = x;
    
    if (t[t[x].left].dist < t[t[x].right].dist)
        swap(t[x].left, t[x].right);
    
    t[x].dist = t[t[x].right].dist + 1;
    
    return x;
}

// 插入元素
int insert(int root, int val) {
    int x = ++nodeCnt;
    init(x, val);
    return merge(root, x);
}

// 查询最小值
int findMin(int root) {
    return t[root].val;
}

// 删除最小值
int deleteMin(int root) {
    int left = t[root].left;
    int right = t[root].right;
    t[left].fa = t[right].fa = 0;
    return merge(left, right);
}

// 删除任意节点
int deleteNode(int x) {
    int left = t[x].left, right = t[x].right;
    int fa = t[x].fa;
    
    int newSubtree = merge(left, right);
    t[newSubtree].fa = fa;
    
    if (t[fa].left == x) t[fa].left = newSubtree;
    else t[fa].right = newSubtree;
    
    while (fa) {
        if (t[t[fa].left].dist < t[t[fa].right].dist)
            swap(t[fa].left, t[fa].right);
        t[fa].dist = t[t[fa].right].dist + 1;
        fa = t[fa].fa;
    }
    
    return newSubtree;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    int root = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        root = insert(root, x);
    }
    
    for (int i = 1; i <= m; i++) {
        int op;
        cin >> op;
        if (op == 1) { // 插入
            int x;
            cin >> x;
            root = insert(root, x);
        } else if (op == 2) { // 查询最小值
            cout << findMin(root) << "\\n";
        } else if (op == 3) { // 删除最小值
            root = deleteMin(root);
        }
    }
    
    return 0;
}`
  },

  'ch7_11_intro': {
    problemDesc: `## 🌳 7.11 主席树（可持久化线段树）

### 这是什么问题？

想象你是一个历史学家，需要记录一个王朝的变迁📜：
- **第1年**：村庄A有10户人家
- **第2年**：村庄A变成15户，村庄B新建5户
- **第3年**：查询第1年村庄A有多少户？第2年所有村庄总共有多少户？

如果用普通线段树，每次修改都会**覆盖**之前的状态，无法回答历史查询！

**主席树**（可持久化线段树）就是为了解决这个问题！它支持：
- **修改**：更新某个位置的值
- **查询历史版本**：查询任意历史时刻的区间信息
- **保留所有版本**：每次修改都生成一个新版本，不破坏旧版本

> 🎯 比喻：主席树就像"时光机"，可以回到过去的任何时刻查看数据！

经典应用：查询区间第k小值（洛谷P3834）。`,

    idea: `## 💡 算法思想

### 一、可持久化的核心思想 🕰️

**问题**：如何保存数据结构的"所有历史版本"？

**朴素想法**：每次修改都完整复制一份。但这样空间O(n·m)，m是修改次数，爆炸💥！

**主席树的优化**：
- 每次修改只影响线段树的**一条路径**（从根到叶子）
- 其他节点可以**共享**！
- 所以只需要**新建被修改的节点**，其他指向旧版本

> 🧠 比喻：就像修改作文，只重写改动的段落，其他段落复印原来的！

### 二、主席树的结构 🌲

**建树过程**：
1. 初始版本：建一棵完整的线段树（版本0）
2. 第i次修改：
   - 从版本i-1的根开始
   - 沿着修改路径，**新建**经过的节点
   - 新建节点的子节点：如果没被修改，指向旧版本的节点
   - 生成版本i的新根

**关键性质**：
- 每次修改新建O(log n)个节点
- 总空间：O(n + m log n)，m是修改次数
- 查询历史版本：从对应版本的根开始查询

### 三、经典应用：区间第k小 🎯

**问题**：给定数组，多次查询区间[l,r]中第k小的数。

**主席树解法**：
1. 对数组建立**权值线段树**（按数值大小建线段树）
2. 每个版本i保存前i个元素的权值线段树
3. 查询[l,r]：用版本r的线段树 - 版本l-1的线段树
4. 在权值线段树上二分，找到第k小

> 🎯 比喻：就像数数1~100中第k小的数，先看左半区有多少个，如果<k就去右半区找！`,

    derivation: `## 主席树的推导与实现

### 1. 空间复杂度分析

设数组长度为n，修改次数为m：
- 初始建树：O(n)个节点
- 每次修改：新建O(log n)个节点（一条路径）
- 总空间：O(n + m log n)

**对比**：
- 朴素复制：O(n·m) ❌
- 主席树：O(n + m log n) ✅

### 2. 节点结构

\`\`\`cpp
struct Node {
    int left, right; // 左右儿子编号
    int sum;         // 区间和（或其他信息）
} t[MAXN * 40];      // 空间要开够！

int root[MAXN];      // 每个版本的根节点
int nodeCnt = 0;
\`\`\`

### 3. 建树

\`\`\`cpp
// 建树：版本0
int build(int l, int r) {
    int p = ++nodeCnt;
    if (l == r) {
        t[p].sum = 0;
        return p;
    }
    int mid = (l + r) / 2;
    t[p].left = build(l, mid);
    t[p].right = build(mid + 1, r);
    t[p].sum = t[t[p].left].sum + t[t[p].right].sum;
    return p;
}
\`\`\`

### 4. 修改（生成新版本）

\`\`\`cpp
// 修改：在版本pre的基础上，把位置pos加上val
// 返回新版本的根
int modify(int pre, int l, int r, int pos, int val) {
    int p = ++nodeCnt; // 新建节点
    t[p] = t[pre];     // 复制旧节点
    
    if (l == r) {
        t[p].sum += val;
        return p;
    }
    
    int mid = (l + r) / 2;
    if (pos <= mid)
        t[p].left = modify(t[pre].left, l, mid, pos, val);
    else
        t[p].right = modify(t[pre].right, mid + 1, r, pos, val);
    
    t[p].sum = t[t[p].left].sum + t[t[p].right].sum;
    return p;
}
\`\`\`

### 5. 查询历史版本

\`\`\`cpp
// 查询版本root[i]中区间[ql,qr]的和
int query(int root, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return t[root].sum;
    
    int mid = (l + r) / 2;
    int ans = 0;
    if (ql <= mid) ans += query(t[root].left, l, mid, ql, qr);
    if (qr > mid) ans += query(t[root].right, mid + 1, r, ql, qr);
    return ans;
}
\`\`\`

### 6. 区间第k小（经典应用）

\`\`\`cpp
// 查询区间[ql,qr]中第k小的数
// root[i]表示前i个元素的权值线段树
int queryKth(int rootL, int rootR, int l, int r, int k) {
    if (l == r) return l;
    
    int mid = (l + r) / 2;
    // 左半区的元素个数 = 版本R的左子树 - 版本L-1的左子树
    int leftCount = t[t[rootR].left].sum - t[t[rootL].left].sum;
    
    if (k <= leftCount)
        // 第k小在左半区
        return queryKth(t[rootL].left, t[rootR].left, l, mid, k);
    else
        // 第k小在右半区，k减去左半区的数量
        return queryKth(t[rootL].right, t[rootR].right, mid + 1, r, k - leftCount);
}
\`\`\`

### 7. 完整流程示例

假设数组a = [3, 1, 4, 1, 5]，查询[2,4]中第2小的数：

1. 建树：root[0] = 空树
2. 插入a[1]=3：root[1] = modify(root[0], 1, 5, 3, 1)
3. 插入a[2]=1：root[2] = modify(root[1], 1, 5, 1, 1)
4. 插入a[3]=4：root[3] = modify(root[2], 1, 5, 4, 1)
5. 插入a[4]=1：root[4] = modify(root[3], 1, 5, 1, 1)
6. 插入a[5]=5：root[5] = modify(root[4], 1, 5, 5, 1)

查询[2,4]第2小：queryKth(root[1], root[4], 1, 5, 2)
- root[4] - root[1] 表示a[2..4] = [1, 4, 1]
- 第2小是1（排序后[1, 1, 4]）

### 8. 时间复杂度总结

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 建树 | O(n) | O(n) |
| 修改 | O(log n) | O(log n) 新节点 |
| 查询 | O(log n) | O(1) |
| 区间第k小 | O(log n) | O(1) |

主席树是"可持久化思想的典范"，让线段树拥有了"时光机"能力！`,

    code: `// 完整示例：主席树实现区间第k小
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;

struct Node {
    int left, right;
    int sum;
} t[MAXN * 40];

int root[MAXN];
int nodeCnt = 0;
int a[MAXN];

// 离散化用
vector<int> vals;
int getRank(int x) {
    return lower_bound(vals.begin(), vals.end(), x) - vals.begin() + 1;
}

// 建树
int build(int l, int r) {
    int p = ++nodeCnt;
    t[p].sum = 0;
    if (l == r) {
        t[p].left = t[p].right = 0;
        return p;
    }
    int mid = (l + r) / 2;
    t[p].left = build(l, mid);
    t[p].right = build(mid + 1, r);
    return p;
}

// 修改：生成新版本
int modify(int pre, int l, int r, int pos, int val) {
    int p = ++nodeCnt;
    t[p] = t[pre];
    
    if (l == r) {
        t[p].sum += val;
        return p;
    }
    
    int mid = (l + r) / 2;
    if (pos <= mid)
        t[p].left = modify(t[pre].left, l, mid, pos, val);
    else
        t[p].right = modify(t[pre].right, mid + 1, r, pos, val);
    
    t[p].sum = t[t[p].left].sum + t[t[p].right].sum;
    return p;
}

// 查询第k小
int queryKth(int rootL, int rootR, int l, int r, int k) {
    if (l == r) return l;
    
    int mid = (l + r) / 2;
    int leftCount = t[t[rootR].left].sum - t[t[rootL].left].sum;
    
    if (k <= leftCount)
        return queryKth(t[rootL].left, t[rootR].left, l, mid, k);
    else
        return queryKth(t[rootL].right, t[rootR].right, mid + 1, r, k - leftCount);
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        vals.push_back(a[i]);
    }
    
    // 离散化
    sort(vals.begin(), vals.end());
    vals.erase(unique(vals.begin(), vals.end()), vals.end());
    int valCnt = vals.size();
    
    // 建主席树
    root[0] = build(1, valCnt);
    for (int i = 1; i <= n; i++) {
        root[i] = modify(root[i - 1], 1, valCnt, getRank(a[i]), 1);
    }
    
    // 处理查询
    for (int i = 1; i <= m; i++) {
        int l, r, k;
        cin >> l >> r >> k;
        int rank = queryKth(root[l - 1], root[r], 1, valCnt, k);
        cout << vals[rank - 1] << "\\n";
    }
    
    return 0;
}`
  },

  'ch7_12_intro': {
    problemDesc: `## ⚖️ 7.12 平衡树（Splay/Treap）

### 这是什么问题？

想象你是一个学校图书管理员，需要管理一个动态的书单📚：
1. **插入**一本新书
2. **删除**一本书
3. **查询**某本书的排名（按价格排序）
4. **查询**排名为k的书是哪本
5. **查询**某本书的前驱（价格比它低的书中最高的）和后继（价格比它高的书中最低的）

如果用普通数组，插入删除O(n)太慢；如果用普通BST，可能退化成链，也是O(n)！

**平衡树**就是为了解决这个问题！它通过"旋转"或"随机优先级"保持树的平衡，让所有操作都是O(log n)。

**两种经典实现**：
- **Splay**：通过"伸展"操作，把访问的节点旋转到根
- **Treap**：给每个节点随机优先级，用堆性质保持平衡

> 🎯 比喻：平衡树就像"会自我调整的书架"，让常用的书总在容易拿到的地方！`,

    idea: `## 💡 算法思想

### 一、BST的问题与平衡的必要性 🌳

**二叉搜索树（BST）**的性质：
- 左子树所有节点 < 根 < 右子树所有节点
- 中序遍历是有序的

**问题**：如果插入顺序是1,2,3,4,5... BST会退化成链！
\`\`\`
1
 \\
  2
   \\
    3
     \\
      4
\`\`\`
这样查询就变成O(n)了！

**解决方案**：让树"平衡"起来，保证高度是O(log n)。

### 二、Splay：旋转的艺术 🔄

**核心思想**：每次访问一个节点后，通过"旋转"把它移到根节点。

**旋转操作**：
- **左旋**：把右儿子提上来，自己变成左儿子
- **右旋**：把左儿子提上来，自己变成右儿子

> 🧠 比喻：就像玩魔方，通过旋转让目标面转到顶层！

**Splay的三种情况**（把节点x旋转到父节点p的下方）：
1. **Zig**：x是p的儿子，p是根 → 单次旋转
2. **Zig-Zig**：x和p都是左儿子（或都是右儿子）→ 先旋转p，再旋转x
3. **Zig-Zag**：x是左儿子p是右儿子（或相反）→ 先旋转x，再旋转x

**关键洞察**：虽然单次操作可能O(n)，但**均摊分析**证明每次操作是O(log n)！

### 三、Treap：随机的魔法 🎲

**核心思想**：给每个节点一个**随机优先级**，同时满足：
- BST性质：左子树 < 根 < 右子树
- 堆性质：父节点优先级 > 儿子优先级（大根堆）

**为什么随机能保持平衡？**
- 随机优先级让树的形状"期望平衡"
- 期望高度是O(log n)

**操作**：
- **插入**：先按BST性质插入，然后通过旋转维护堆性质
- **删除**：把要删的节点旋转到叶子，然后删除
- **查询**：和普通BST一样`,

    derivation: `## 平衡树的推导与实现

### 1. Splay的均摊复杂度分析

**势能法**：定义势能Φ = Σlog(size(x))，x是所有节点

- **初始势能**：O(n log n)
- **最终势能**：O(n log n)
- **每次splay的实际代价**：O(旋转次数)
- **势能变化**：O(log n)

**结论**：每次splay的**均摊代价**是O(log n)！

### 2. Splay代码实现

\`\`\`cpp
struct Node {
    int ch[2]; // 左右儿子
    int fa;    // 父节点
    int val;   // 节点值
    int cnt;   // 重复次数
    int size;  // 子树大小
} t[MAXN];

int root, nodeCnt;

// 判断x是父节点的左儿子还是右儿子
bool get(int x) {
    return t[t[x].fa].ch[1] == x;
}

// 更新节点信息
void pushup(int x) {
    if (x) {
        t[x].size = t[x].cnt;
        if (t[x].ch[0]) t[x].size += t[t[x].ch[0]].size;
        if (t[x].ch[1]) t[x].size += t[t[x].ch[1]].size;
    }
}

// 旋转操作
void rotate(int x) {
    int y = t[x].fa, z = t[y].fa, k = get(x);
    t[y].ch[k] = t[x].ch[k ^ 1];
    if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
    t[x].ch[k ^ 1] = y;
    t[y].fa = x;
    t[x].fa = z;
    if (z) t[z].ch[t[z].ch[1] == y] = x;
    pushup(y);
    pushup(x);
}

// Splay操作：把x旋转到目标节点goal的下方
void splay(int x, int goal) {
    while (t[x].fa != goal) {
        int y = t[x].fa, z = t[y].fa;
        if (z != goal) {
            if (get(x) == get(y)) rotate(y); // Zig-Zig
            else rotate(x); // Zig-Zag
        }
        rotate(x);
    }
    if (goal == 0) root = x;
}
\`\`\`

### 3. Splay的完整操作

\`\`\`cpp
// 插入值为val的节点
void insert(int val) {
    int cur = root, p = 0;
    while (cur && t[cur].val != val) {
        p = cur;
        cur = t[cur].ch[val > t[cur].val];
    }
    if (cur) {
        t[cur].cnt++; // 已存在，增加计数
    } else {
        cur = ++nodeCnt;
        if (p) t[p].ch[val > t[p].val] = cur;
        t[cur].fa = p;
        t[cur].ch[0] = t[cur].ch[1] = 0;
        t[cur].val = val;
        t[cur].cnt = t[cur].size = 1;
    }
    splay(cur, 0); // 旋转到根
}

// 查询值为val的节点的排名
int getRank(int val) {
    int cur = root, rank = 0;
    while (cur) {
        if (val == t[cur].val) {
            rank += t[t[cur].ch[0]].size + 1;
            splay(cur, 0);
            return rank;
        } else if (val < t[cur].val) {
            cur = t[cur].ch[0];
        } else {
            rank += t[t[cur].ch[0]].size + t[cur].cnt;
            cur = t[cur].ch[1];
        }
    }
    return -1; // 不存在
}

// 查询排名为k的节点值
int getKth(int k) {
    int cur = root;
    while (cur) {
        int leftSize = t[t[cur].ch[0]].size;
        if (k <= leftSize) {
            cur = t[cur].ch[0];
        } else if (k <= leftSize + t[cur].cnt) {
            splay(cur, 0);
            return t[cur].val;
        } else {
            k -= leftSize + t[cur].cnt;
            cur = t[cur].ch[1];
        }
    }
    return -1;
}

// 查询前驱（小于val的最大值）
int getPre(int val) {
    int cur = root, pre = -1;
    while (cur) {
        if (t[cur].val < val) {
            pre = t[cur].val;
            cur = t[cur].ch[1];
        } else {
            cur = t[cur].ch[0];
        }
    }
    return pre;
}

// 查询后继（大于val的最小值）
int getNxt(int val) {
    int cur = root, nxt = -1;
    while (cur) {
        if (t[cur].val > val) {
            nxt = t[cur].val;
            cur = t[cur].ch[0];
        } else {
            cur = t[cur].ch[1];
        }
    }
    return nxt;
}

// 删除值为val的节点
void del(int val) {
    int cur = root;
    while (cur && t[cur].val != val) {
        cur = t[cur].ch[val > t[cur].val];
    }
    if (!cur) return;
    
    splay(cur, 0); // 先旋转到根
    
    if (t[cur].cnt > 1) {
        t[cur].cnt--;
        pushup(cur);
        return;
    }
    
    // 只有一个儿子或没有儿子
    if (!t[cur].ch[0] && !t[cur].ch[1]) {
        root = 0;
    } else if (!t[cur].ch[0]) {
        root = t[cur].ch[1];
        t[root].fa = 0;
    } else if (!t[cur].ch[1]) {
        root = t[cur].ch[0];
        t[root].fa = 0;
    } else {
        // 有两个儿子：找前驱，把前驱旋转到根，把右子树挂到前驱的右儿子
        int pre = t[cur].ch[0];
        while (t[pre].ch[1]) pre = t[pre].ch[1];
        splay(pre, 0);
        t[pre].ch[1] = t[cur].ch[1];
        t[t[cur].ch[1]].fa = pre;
        pushup(pre);
    }
}
\`\`\`

### 4. Treap代码实现（简化版）

\`\`\`cpp
struct Node {
    int ch[2];
    int val, pri; // 值和随机优先级
    int size;
} t[MAXN];

int root, nodeCnt;

// 旋转
void rotate(int &x, int k) {
    int y = t[x].ch[k];
    t[x].ch[k] = t[y].ch[k ^ 1];
    t[y].ch[k ^ 1] = x;
    x = y;
}

// 插入
void insert(int &x, int val) {
    if (!x) {
        x = ++nodeCnt;
        t[x].val = val;
        t[x].pri = rand();
        t[x].size = 1;
        return;
    }
    t[x].size++;
    if (val < t[x].val) {
        insert(t[x].ch[0], val);
        if (t[t[x].ch[0]].pri > t[x].pri) rotate(x, 0);
    } else {
        insert(t[x].ch[1], val);
        if (t[t[x].ch[1]].pri > t[x].pri) rotate(x, 1);
    }
}
\`\`\`

### 5. 时间复杂度总结

| 操作 | Splay | Treap |
|------|-------|-------|
| 插入 | O(log n) 均摊 | O(log n) 期望 |
| 删除 | O(log n) 均摊 | O(log n) 期望 |
| 查询排名 | O(log n) 均摊 | O(log n) 期望 |
| 查询第k小 | O(log n) 均摊 | O(log n) 期望 |
| 前驱/后继 | O(log n) 均摊 | O(log n) 期望 |

平衡树是"动态有序序列的神器"，在需要维护有序集合的场景中不可或缺！`,

    code: `// 完整示例：Splay实现
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

struct Node {
    int ch[2], fa;
    int val, cnt, size;
} t[MAXN];

int root, nodeCnt;

bool get(int x) {
    return t[t[x].fa].ch[1] == x;
}

void pushup(int x) {
    if (x) {
        t[x].size = t[x].cnt;
        if (t[x].ch[0]) t[x].size += t[t[x].ch[0]].size;
        if (t[x].ch[1]) t[x].size += t[t[x].ch[1]].size;
    }
}

void rotate(int x) {
    int y = t[x].fa, z = t[y].fa, k = get(x);
    t[y].ch[k] = t[x].ch[k ^ 1];
    if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
    t[x].ch[k ^ 1] = y;
    t[y].fa = x;
    t[x].fa = z;
    if (z) t[z].ch[t[z].ch[1] == y] = x;
    pushup(y);
    pushup(x);
}

void splay(int x, int goal) {
    while (t[x].fa != goal) {
        int y = t[x].fa, z = t[y].fa;
        if (z != goal) {
            if (get(x) == get(y)) rotate(y);
            else rotate(x);
        }
        rotate(x);
    }
    if (goal == 0) root = x;
}

void insert(int val) {
    int cur = root, p = 0;
    while (cur && t[cur].val != val) {
        p = cur;
        cur = t[cur].ch[val > t[cur].val];
    }
    if (cur) {
        t[cur].cnt++;
    } else {
        cur = ++nodeCnt;
        if (p) t[p].ch[val > t[p].val] = cur;
        t[cur].fa = p;
        t[cur].ch[0] = t[cur].ch[1] = 0;
        t[cur].val = val;
        t[cur].cnt = t[cur].size = 1;
    }
    splay(cur, 0);
}

int getRank(int val) {
    int cur = root, rank = 0;
    while (cur) {
        if (val == t[cur].val) {
            rank += t[t[cur].ch[0]].size + 1;
            splay(cur, 0);
            return rank;
        } else if (val < t[cur].val) {
            cur = t[cur].ch[0];
        } else {
            rank += t[t[cur].ch[0]].size + t[cur].cnt;
            cur = t[cur].ch[1];
        }
    }
    return -1;
}

int getKth(int k) {
    int cur = root;
    while (cur) {
        int leftSize = t[t[cur].ch[0]].size;
        if (k <= leftSize) {
            cur = t[cur].ch[0];
        } else if (k <= leftSize + t[cur].cnt) {
            splay(cur, 0);
            return t[cur].val;
        } else {
            k -= leftSize + t[cur].cnt;
            cur = t[cur].ch[1];
        }
    }
    return -1;
}

int getPre(int val) {
    int cur = root, pre = -1;
    while (cur) {
        if (t[cur].val < val) {
            pre = t[cur].val;
            cur = t[cur].ch[1];
        } else {
            cur = t[cur].ch[0];
        }
    }
    return pre;
}

int getNxt(int val) {
    int cur = root, nxt = -1;
    while (cur) {
        if (t[cur].val > val) {
            nxt = t[cur].val;
            cur = t[cur].ch[0];
        } else {
            cur = t[cur].ch[1];
        }
    }
    return nxt;
}

void del(int val) {
    int cur = root;
    while (cur && t[cur].val != val) {
        cur = t[cur].ch[val > t[cur].val];
    }
    if (!cur) return;
    
    splay(cur, 0);
    
    if (t[cur].cnt > 1) {
        t[cur].cnt--;
        pushup(cur);
        return;
    }
    
    if (!t[cur].ch[0] && !t[cur].ch[1]) {
        root = 0;
    } else if (!t[cur].ch[0]) {
        root = t[cur].ch[1];
        t[root].fa = 0;
    } else if (!t[cur].ch[1]) {
        root = t[cur].ch[0];
        t[root].fa = 0;
    } else {
        int pre = t[cur].ch[0];
        while (t[pre].ch[1]) pre = t[pre].ch[1];
        splay(pre, 0);
        t[pre].ch[1] = t[cur].ch[1];
        t[t[cur].ch[1]].fa = pre;
        pushup(pre);
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int op, x;
        cin >> op >> x;
        if (op == 1) insert(x);
        else if (op == 2) del(x);
        else if (op == 3) cout << getRank(x) << "\\n";
        else if (op == 4) cout << getKth(x) << "\\n";
        else if (op == 5) cout << getPre(x) << "\\n";
        else if (op == 6) cout << getNxt(x) << "\\n";
    }
    return 0;
}`
  },

  'ch7_13_intro': {
    problemDesc: `## 🔗 7.13 树链剖分

### 这是什么问题？

想象你是一个快递公司的调度员，需要管理一棵树形物流网络🚚：
- 节点是城市，边是道路
- **修改操作**：给从城市u到城市v路径上的所有城市增加物资
- **查询操作**：查询从城市u到城市v路径上的总物资

如果用朴素方法，每次操作都要遍历整条路径，O(n)太慢！

**树链剖分**就是为了解决这个问题！它把树"切割"成若干条"重链"，然后用线段树维护，让路径操作变成O(log² n)！

> 🎯 比喻：树链剖分就像把一棵大树"切成几段木头"，每段木头用线段树快速处理！

核心思想：**重链剖分**，让每条路径被分成O(log n)段重链，每段用线段树O(log n)处理，总O(log² n)！`,

    idea: `## 💡 算法思想

### 一、树的问题：路径操作太难了 🌲

**问题**：给定一棵树，支持：
1. 路径修改：给u到v路径上的所有点加值
2. 路径查询：查询u到v路径上的和
3. 子树修改：给u的子树所有点加值
4. 子树查询：查询u的子树的和

**难点**：树不是线性的，不能直接用线段树！

### 二、树链剖分的核心思想 🔪

**关键观察**：如果我们能把树"拉直"成一条线，就能用线段树了！

**树链剖分**的做法：
1. **定义重儿子**：每个节点的儿子中，子树最大的那个是"重儿子"
2. **定义重边**：连接节点和重儿子的边是"重边"
3. **定义重链**：由重边连成的链是"重链"

> 🧠 比喻：就像把一棵树"梳理"成几条"辫子"，每条辫子是连续的！

**性质**：
- 每个节点属于且仅属于一条重链
- 从根到任意节点的路径，最多经过O(log n)条重链

### 三、DFS序：把树拉直 📏

**第一次DFS**：计算每个节点的：
- **深度（depth）**：到根的距离
- **子树大小（size）**：后代数量
- **重儿子（heavy_son）**：子树最大的儿子
- **父节点（fa）**：直接上级

**第二次DFS**：给节点重新编号，让同一条重链的编号连续！
- 优先访问重儿子，让重链的编号连续
- 记录每个节点的**DFS序（dfn）**和**子树的DFS序范围**

**结果**：
- 重链在DFS序上是连续的区间
- 子树在DFS序上也是连续的区间

### 四、用线段树维护 🌳

把DFS序映射到线段树上：
- 路径操作：把路径分成O(log n)段重链，每段对应线段树的一个区间
- 子树操作：子树的DFS序是连续区间，直接在线段树上操作

**时间复杂度**：
- 路径操作：O(log² n)（O(log n)段 × O(log n)线段树）
- 子树操作：O(log n)（一个区间）`,

    derivation: `## 树链剖分的推导与实现

### 1. 重链剖分的性质

**定理**：从根到任意节点的路径，最多经过O(log n)条重链。

**证明**：
- 每经过一条轻边，子树大小至少翻倍
- 因为如果u是v的轻儿子，size(u) ≤ size(v)/2
- 所以从轻边跳O(log n)次，子树大小就超过n了
- 因此路径上最多有O(log n)条轻边，也就最多O(log n)条重链 ✓

### 2. 第一次DFS：计算基本信息

\`\`\`cpp
int fa[MAXN], depth[MAXN], size[MAXN], heavy_son[MAXN];

void dfs1(int u, int f, int dep) {
    fa[u] = f;
    depth[u] = dep;
    size[u] = 1;
    heavy_son[u] = 0;
    int maxSubSize = 0;
    
    for (int v : adj[u]) {
        if (v == f) continue;
        dfs1(v, u, dep + 1);
        size[u] += size[v];
        if (size[v] > maxSubSize) {
            maxSubSize = size[v];
            heavy_son[u] = v;
        }
    }
}
\`\`\`

### 3. 第二次DFS：生成DFS序

\`\`\`cpp
int dfn[MAXN], top[MAXN], curDfn;

void dfs2(int u, int t) {
    dfn[u] = ++curDfn;
    top[u] = t; // 所在重链的顶端
    
    if (heavy_son[u]) {
        // 优先访问重儿子，让重链连续
        dfs2(heavy_son[u], t);
    }
    
    for (int v : adj[u]) {
        if (v == fa[u] || v == heavy_son[u]) continue;
        dfs2(v, v); // 轻儿子开启新的重链
    }
}
\`\`\`

### 4. 线段树维护

\`\`\`cpp
long long tree[MAXN * 4], lazy[MAXN * 4];
int a[MAXN]; // 原数组（按DFS序重排）

void build(int node, int l, int r) {
    if (l == r) {
        tree[node] = a[l];
        return;
    }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

void pushdown(int node, int l, int r) {
    if (lazy[node]) {
        int mid = (l + r) / 2;
        lazy[node * 2] += lazy[node];
        lazy[node * 2 + 1] += lazy[node];
        tree[node * 2] += lazy[node] * (mid - l + 1);
        tree[node * 2 + 1] += lazy[node] * (r - mid);
        lazy[node] = 0;
    }
}

void update(int node, int l, int r, int ql, int qr, long long val) {
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushdown(node, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(node * 2, l, mid, ql, qr, val);
    if (qr > mid) update(node * 2 + 1, mid + 1, r, ql, qr, val);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

long long query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    pushdown(node, l, r);
    int mid = (l + r) / 2;
    long long ans = 0;
    if (ql <= mid) ans += query(node * 2, l, mid, ql, qr);
    if (qr > mid) ans += query(node * 2 + 1, mid + 1, r, ql, qr);
    return ans;
}
\`\`\`

### 5. 路径操作

\`\`\`cpp
// 路径修改：给u到v路径上的所有点加val
void pathUpdate(int u, int v, long long val) {
    while (top[u] != top[v]) {
        // 让u和v跳到同一条重链
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        // u所在重链更深，先处理u到top[u]这段
        update(1, 1, n, dfn[top[u]], dfn[u], val);
        u = fa[top[u]]; // 跳到重链上方的父节点
    }
    // 现在u和v在同一条重链上
    if (depth[u] > depth[v]) swap(u, v);
    update(1, 1, n, dfn[u], dfn[v], val);
}

// 路径查询：查询u到v路径上的和
long long pathQuery(int u, int v) {
    long long ans = 0;
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        ans += query(1, 1, n, dfn[top[u]], dfn[u]);
        u = fa[top[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    ans += query(1, 1, n, dfn[u], dfn[v]);
    return ans;
}
\`\`\`

### 6. 子树操作

\`\`\`cpp
// 子树修改：给u的子树所有点加val
void subtreeUpdate(int u, long long val) {
    update(1, 1, n, dfn[u], dfn[u] + size[u] - 1, val);
}

// 子树查询：查询u的子树的和
long long subtreeQuery(int u) {
    return query(1, 1, n, dfn[u], dfn[u] + size[u] - 1);
}
\`\`\`

### 7. 时间复杂度总结

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| 预处理 | O(n) | 两次DFS |
| 路径修改 | O(log² n) | O(log n)段 × O(log n)线段树 |
| 路径查询 | O(log² n) | 同上 |
| 子树修改 | O(log n) | 一个区间 |
| 子树查询 | O(log n) | 一个区间 |

树链剖分是"树上路径问题的利器"，让复杂的树操作变得简单！`,

    code: `// 完整示例：树链剖分
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

vector<int> adj[MAXN];
int fa[MAXN], depth[MAXN], size[MAXN], heavy_son[MAXN];
int dfn[MAXN], top[MAXN], curDfn;
int a[MAXN], b[MAXN]; // b是按DFS序重排的数组
int n, m, root;

long long tree[MAXN * 4], lazy[MAXN * 4];

void dfs1(int u, int f, int dep) {
    fa[u] = f;
    depth[u] = dep;
    size[u] = 1;
    heavy_son[u] = 0;
    int maxSubSize = 0;
    
    for (int v : adj[u]) {
        if (v == f) continue;
        dfs1(v, u, dep + 1);
        size[u] += size[v];
        if (size[v] > maxSubSize) {
            maxSubSize = size[v];
            heavy_son[u] = v;
        }
    }
}

void dfs2(int u, int t) {
    dfn[u] = ++curDfn;
    top[u] = t;
    b[curDfn] = a[u];
    
    if (heavy_son[u]) {
        dfs2(heavy_son[u], t);
    }
    
    for (int v : adj[u]) {
        if (v == fa[u] || v == heavy_son[u]) continue;
        dfs2(v, v);
    }
}

void build(int node, int l, int r) {
    if (l == r) {
        tree[node] = b[l];
        return;
    }
    int mid = (l + r) / 2;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

void pushdown(int node, int l, int r) {
    if (lazy[node]) {
        int mid = (l + r) / 2;
        lazy[node * 2] += lazy[node];
        lazy[node * 2 + 1] += lazy[node];
        tree[node * 2] += lazy[node] * (mid - l + 1);
        tree[node * 2 + 1] += lazy[node] * (r - mid);
        lazy[node] = 0;
    }
}

void update(int node, int l, int r, int ql, int qr, long long val) {
    if (ql <= l && r <= qr) {
        tree[node] += val * (r - l + 1);
        lazy[node] += val;
        return;
    }
    pushdown(node, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(node * 2, l, mid, ql, qr, val);
    if (qr > mid) update(node * 2 + 1, mid + 1, r, ql, qr, val);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

long long query(int node, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[node];
    pushdown(node, l, r);
    int mid = (l + r) / 2;
    long long ans = 0;
    if (ql <= mid) ans += query(node * 2, l, mid, ql, qr);
    if (qr > mid) ans += query(node * 2 + 1, mid + 1, r, ql, qr);
    return ans;
}

void pathUpdate(int u, int v, long long val) {
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        update(1, 1, n, dfn[top[u]], dfn[u], val);
        u = fa[top[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    update(1, 1, n, dfn[u], dfn[v], val);
}

long long pathQuery(int u, int v) {
    long long ans = 0;
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        ans += query(1, 1, n, dfn[top[u]], dfn[u]);
        u = fa[top[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    ans += query(1, 1, n, dfn[u], dfn[v]);
    return ans;
}

void subtreeUpdate(int u, long long val) {
    update(1, 1, n, dfn[u], dfn[u] + size[u] - 1, val);
}

long long subtreeQuery(int u) {
    return query(1, 1, n, dfn[u], dfn[u] + size[u] - 1);
}

int main() {
    cin >> n >> m >> root;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs1(root, 0, 1);
    dfs2(root, root);
    build(1, 1, n);
    
    for (int i = 1; i <= m; i++) {
        int op, u, v;
        long long val;
        cin >> op;
        if (op == 1) { // 路径修改
            cin >> u >> v >> val;
            pathUpdate(u, v, val);
        } else if (op == 2) { // 路径查询
            cin >> u >> v;
            cout << pathQuery(u, v) << "\\n";
        } else if (op == 3) { // 子树修改
            cin >> u >> val;
            subtreeUpdate(u, val);
        } else if (op == 4) { // 子树查询
            cin >> u;
            cout << subtreeQuery(u) << "\\n";
        }
    }
    
    return 0;
}`
  },

  'ch7_14_intro': {
    problemDesc: `## 🌳🌳 7.14 树套树

### 这是什么问题？

想象你是一个游戏设计师，需要管理一个二维的游戏世界🎮：
- 地图上有很多怪物，每个怪物有坐标(x,y)和战斗力
- **修改操作**：在坐标(x,y)生成一个战斗力为v的怪物
- **查询操作**：查询矩形区域[x1,x2]×[y1,y2]内战斗力最强的怪物

如果用一个二维数组，空间O(n²)太大；如果遍历所有怪物，时间O(n)太慢！

**树套树**就是为了解决这个问题！它用"外层树+内层树"的结构，让二维操作变成O(log² n)！

> 🎯 比喻：树套树就像"俄罗斯套娃"，外层线段树管x坐标，每个节点里套一个线段树管y坐标！

常见形式：
- **线段树套线段树**：二维区间查询
- **线段树套平衡树**：二维区间第k大
- **树状数组套线段树**：空间优化版`,

    idea: `## 💡 算法思想

### 一、二维问题的挑战 📐

**问题**：给定平面上的点，支持：
1. 插入点(x, y, v)
2. 查询矩形[x1,x2]×[y1,y2]内的信息（最值/和/第k大等）

**难点**：二维空间太大，不能直接开数组！

### 二、树套树的核心思想 🎯

**关键观察**：把二维问题分解成两个一维问题！

**树套树的做法**：
1. **外层树**：对第一维（x坐标）建线段树
2. **内层树**：外层树的每个节点里，套一棵对第二维（y坐标）的线段树

> 🧠 比喻：就像"班级里的学习小组"！外层线段树是班级，每个班级节点里套一个内层线段树（学习小组），小组按y坐标管理！

**查询过程**：
1. 在外层树上找到x范围[x1,x2]对应的O(log n)个节点
2. 对这O(log n)个节点，分别在它们的内层树上查询y范围[y1,y2]
3. 合并结果

### 三、常见树套树类型 🌲

**1. 线段树套线段树**
- 外层：x坐标的线段树
- 内层：y坐标的线段树
- 空间：O(n log n)（动态开点）
- 查询：O(log² n)

**2. 线段树套平衡树**
- 外层：x坐标的线段树
- 内层：y坐标的平衡树（如Splay）
- 优势：支持查询区间第k大
- 查询：O(log² n)

**3. 树状数组套线段树**
- 外层：x坐标的树状数组
- 内层：y坐标的动态开点线段树
- 优势：空间更优，常数更小
- 查询：O(log² n)

### 四、动态开点技术 💡

**问题**：如果内层线段树都开满，空间O(n²)爆炸！

**解决**：动态开点——只开用到的节点！
- 每个内层线段树初始为空
- 插入时才创建需要的节点
- 用数组模拟指针，避免new的开销

**空间分析**：
- 每次插入在外层树上经过O(log n)个节点
- 每个节点的内层树新建O(log n)个节点
- 总空间：O(n log² n) 或优化到 O(n log n)`,

    derivation: `## 树套树的推导与实现

### 1. 线段树套平衡树实现二维第k大

**问题**：给定二维平面上的点，查询矩形区域内第k大的值。

**思路**：
1. 外层线段树维护x范围
2. 每个节点的平衡树维护该x范围内的y值集合
3. 查询时，在外层找到O(log n)个节点，在每个平衡树上二分

### 2. 代码实现

\`\`\`cpp
// 外层线段树节点
struct SegNode {
    int root; // 内层平衡树的根
} seg[MAXN * 4];

// 内层Splay节点
struct SplayNode {
    int ch[2], fa;
    int val, cnt, size;
} splay[MAXN * 40];

int splayCnt;

// Splay操作（同7.12）
void splay_rotate(int x) { /* ... */ }
void splay_splay(int x, int goal) { /* ... */ }

// 内层平衡树插入
void splay_insert(int &root, int val) {
    int cur = root, p = 0;
    while (cur && splay[cur].val != val) {
        p = cur;
        cur = splay[cur].ch[val > splay[cur].val];
    }
    if (cur) {
        splay[cur].cnt++;
    } else {
        cur = ++splayCnt;
        splay[cur].val = val;
        splay[cur].cnt = splay[cur].size = 1;
        splay[cur].fa = p;
        if (p) splay[p].ch[val > splay[p].val] = cur;
    }
    splay_splay(cur, 0);
    root = cur;
}

// 外层线段树插入
void insert(int node, int l, int r, int x, int y) {
    splay_insert(seg[node].root, y);
    if (l == r) return;
    int mid = (l + r) / 2;
    if (x <= mid) insert(node * 2, l, mid, x, y);
    else insert(node * 2 + 1, mid + 1, r, x, y);
}

// 查询外层区间[ql,qr]内，y值在[y1,y2]的元素个数
int countInRange(int node, int l, int r, int ql, int qr, int y1, int y2) {
    if (ql <= l && r <= qr) {
        // 在内层平衡树上查询[y1,y2]的个数
        return queryRange(seg[node].root, y1, y2);
    }
    int mid = (l + r) / 2;
    int ans = 0;
    if (ql <= mid) ans += countInRange(node * 2, l, mid, ql, qr, y1, y2);
    if (qr > mid) ans += countInRange(node * 2 + 1, mid + 1, r, ql, qr, y1, y2);
    return ans;
}

// 查询矩形内第k大
int queryKth(int ql, int qr, int y1, int y2, int k) {
    // 二分答案
    int left = 1, right = MAXY, ans = -1;
    while (left <= right) {
        int mid = (left + right) / 2;
        // 查询值在[mid, MAXY]范围内的个数
        int cnt = countInRange(1, 1, MAXX, ql, qr, mid, y2);
        if (cnt >= k) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return ans;
}
\`\`\`

### 3. 树状数组套动态开点线段树

**优势**：空间更优，常数更小。

\`\`\`cpp
// 内层动态开点线段树
struct InnerNode {
    int ls, rs;
    int sum;
} inner[MAXN * 40];

int innerCnt;
int innerRoot[MAXN]; // 树状数组的每个位置对应一个内层树根

// 内层线段树插入
void innerInsert(int &root, int l, int r, int pos, int val) {
    if (!root) root = ++innerCnt;
    inner[root].sum += val;
    if (l == r) return;
    int mid = (l + r) / 2;
    if (pos <= mid) innerInsert(inner[root].ls, l, mid, pos, val);
    else innerInsert(inner[root].rs, mid + 1, r, pos, val);
}

// 树状数组更新
void bitUpdate(int x, int y, int val) {
    for (; x <= MAXX; x += x & -x) {
        innerInsert(innerRoot[x], 1, MAXY, y, val);
    }
}

// 内层线段树查询
int innerQuery(int root, int l, int r, int ql, int qr) {
    if (!root) return 0;
    if (ql <= l && r <= qr) return inner[root].sum;
    int mid = (l + r) / 2;
    int ans = 0;
    if (ql <= mid) ans += innerQuery(inner[root].ls, l, mid, ql, qr);
    if (qr > mid) ans += innerQuery(inner[root].rs, mid + 1, r, ql, qr);
    return ans;
}

// 树状数组查询
int bitQuery(int x, int y1, int y2) {
    int ans = 0;
    for (; x > 0; x -= x & -x) {
        ans += innerQuery(innerRoot[x], 1, MAXY, y1, y2);
    }
    return ans;
}

// 二维区间查询
int query2D(int x1, int x2, int y1, int y2) {
    return bitQuery(x2, y1, y2) - bitQuery(x1 - 1, y1, y2);
}
\`\`\`

### 4. 时间复杂度总结

| 操作 | 线段树套平衡树 | 树状数组套线段树 |
|------|--------------|----------------|
| 插入 | O(log² n) | O(log² n) |
| 查询 | O(log² n) | O(log² n) |
| 空间 | O(n log² n) | O(n log n) |

树套树是"二维问题的通用解法"，让复杂的二维操作变得简单！`,

    code: `// 完整示例：树状数组套动态开点线段树
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int MAXX = 100000;
const int MAXY = 100000;

struct InnerNode {
    int ls, rs;
    int sum;
} inner[MAXN * 40];

int innerCnt;
int innerRoot[MAXN];

void innerInsert(int &root, int l, int r, int pos, int val) {
    if (!root) root = ++innerCnt;
    inner[root].sum += val;
    if (l == r) return;
    int mid = (l + r) / 2;
    if (pos <= mid) innerInsert(inner[root].ls, l, mid, pos, val);
    else innerInsert(inner[root].rs, mid + 1, r, pos, val);
}

void bitUpdate(int x, int y, int val) {
    for (; x <= MAXX; x += x & -x) {
        innerInsert(innerRoot[x], 1, MAXY, y, val);
    }
}

int innerQuery(int root, int l, int r, int ql, int qr) {
    if (!root) return 0;
    if (ql <= l && r <= qr) return inner[root].sum;
    int mid = (l + r) / 2;
    int ans = 0;
    if (ql <= mid) ans += innerQuery(inner[root].ls, l, mid, ql, qr);
    if (qr > mid) ans += innerQuery(inner[root].rs, mid + 1, r, ql, qr);
    return ans;
}

int bitQuery(int x, int y1, int y2) {
    int ans = 0;
    for (; x > 0; x -= x & -x) {
        ans += innerQuery(innerRoot[x], 1, MAXY, y1, y2);
    }
    return ans;
}

int query2D(int x1, int x2, int y1, int y2) {
    return bitQuery(x2, y1, y2) - bitQuery(x1 - 1, y1, y2);
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        int x, y, v;
        cin >> x >> y >> v;
        bitUpdate(x, y, v);
    }
    
    for (int i = 1; i <= m; i++) {
        int op;
        cin >> op;
        if (op == 1) {
            int x, y, v;
            cin >> x >> y >> v;
            bitUpdate(x, y, v);
        } else if (op == 2) {
            int x1, x2, y1, y2;
            cin >> x1 >> x2 >> y1 >> y2;
            cout << query2D(x1, x2, y1, y2) << "\\n";
        }
    }
    
    return 0;
}`
  },

  'ch7_15_intro': {
    problemDesc: `## 🔗🌳 7.15 动态树（LCT）

### 这是什么问题？

想象你是一个网络管理员，需要管理一个动态变化的网络拓扑🌐：
- 节点之间可以**连边**或**断边**
- 需要查询两个节点是否**连通**
- 需要查询连通块内的**信息**（如节点数、权值和等）
- 需要**修改**节点或边的权值

如果用并查集，只能处理加边不能处理断边；如果用树链剖分，树的结构不能改变！

**动态树（Link-Cut Tree，LCT）**就是为了解决这个问题！它支持：
- **Link(u, v)**：连接u和v
- **Cut(u, v)**：断开u和v之间的边
- **Query(u, v)**：查询u到v路径上的信息
- **ChangeRoot(u)**：把u变成所在树的根

> 🎯 比喻：LCT就像"会变形的树"，可以随意连接、断开、翻转！

LCT是"树上的瑞士军刀"，能解决各种动态树问题！`,

    idea: `## 💡 算法思想

### 一、动态树的挑战 🌲

**问题**：维护一个森林，支持：
1. 加边（Link）
2. 断边（Cut）
3. 路径查询
4. 换根

**难点**：树的结构在动态变化！

### 二、LCT的核心思想 🔗

**关键观察**：用**Splay**维护树的"偏好路径"！

**LCT的概念**：
1. **Preferred Child（偏好儿子）**：每个节点有一个"偏好儿子"
2. **Preferred Edge（偏好边）**：连接节点和偏好儿子的边
3. **Preferred Path（偏好路径）**：由偏好边连成的路径

> 🧠 比喻：就像"高速公路"！LCT把树分成若干条"高速公路"（偏好路径），每条高速公路用一棵Splay维护！

**LCT的操作**：
1. **Access(u)**：把u到根的路径变成一条偏好路径
2. **MakeRoot(u)**：把u变成所在树的根
3. **Link(u, v)**：连接u和v
4. **Cut(u, v)**：断开u和v
5. **FindRoot(u)**：找到u所在树的根

### 三、Splay维护偏好路径 🎯

**结构**：
- 每条偏好路径用一棵Splay维护
- Splay按**深度**排序（中序遍历是深度递增）
- 不同偏好路径之间用**虚边**连接（记录父节点）

**关键操作**：
- **Access(u)**：从u到根，把经过的路径都变成偏好路径
  - 从u开始，跳到当前偏好路径的顶端
  - 把顶端通过虚边连到上一条偏好路径
  - 重复直到到达整棵树的根
  
- **MakeRoot(u)**：
  - 先Access(u)，让u到根成为一条偏好路径
  - 然后Splay(u)，让u成为Splay的根
  - 翻转u的左子树（因为u要变成根，深度关系要反转）

### 四、LCT的应用 🚀

1. **维护连通性**：FindRoot判断是否连通
2. **路径查询**：Access后在Splay上查询
3. **树链剖分的动态版**：支持加边断边的路径操作
4. **维护生成树**：如最小生成树的动态维护`,

    derivation: `## LCT的推导与实现

### 1. LCT的节点结构

\`\`\`cpp
struct Node {
    int ch[2]; // Splay的左右儿子
    int fa;    // 父节点（可能是Splay内的，也可能是虚边）
    int val;   // 节点权值
    int sum;   // 子树信息（Splay内的）
    bool rev;  // 翻转标记
} t[MAXN];
\`\`\`

### 2. 基础操作

\`\`\`cpp
// 判断节点类型
bool isRoot(int x) {
    return t[t[x].fa].ch[0] != x && t[t[x].fa].ch[1] != x;
}

// 翻转操作
void pushRev(int x) {
    if (x) {
        swap(t[x].ch[0], t[x].ch[1]);
        t[x].rev ^= 1;
    }
}

// 下传标记
void pushDown(int x) {
    if (t[x].rev) {
        pushRev(t[x].ch[0]);
        pushRev(t[x].ch[1]);
        t[x].rev = 0;
    }
}

// 更新信息
void pushUp(int x) {
    t[x].sum = t[t[x].ch[0]].sum ^ t[t[x].ch[1]].sum ^ t[x].val;
}

// 旋转
void rotate(int x) {
    int y = t[x].fa, z = t[y].fa;
    int k = (t[y].ch[1] == x);
    
    if (!isRoot(y)) {
        t[z].ch[t[z].ch[1] == y] = x;
    }
    t[x].fa = z;
    
    t[y].ch[k] = t[x].ch[k ^ 1];
    if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
    
    t[x].ch[k ^ 1] = y;
    t[y].fa = x;
    
    pushUp(y);
    pushUp(x);
}

// Splay操作：把x旋转到Splay的根
void splay(int x) {
    int top = 0;
    static int stk[MAXN];
    stk[++top] = x;
    
    // 找到Splay的根，收集路径
    for (int i = x; !isRoot(i); i = t[i].fa) {
        stk[++top] = t[i].fa;
    }
    
    // 从上到下下传标记
    while (top) pushDown(stk[top--]);
    
    // 旋转
    while (!isRoot(x)) {
        int y = t[x].fa, z = t[y].fa;
        if (!isRoot(y)) {
            if ((t[y].ch[0] == x) ^ (t[z].ch[0] == y)) rotate(x);
            else rotate(y);
        }
        rotate(x);
    }
}
\`\`\`

### 3. LCT核心操作

\`\`\`cpp
// Access(u)：把u到根的路径变成偏好路径
void access(int x) {
    for (int y = 0; x; y = x, x = t[x].fa) {
        splay(x);
        t[x].ch[1] = y;
        pushUp(x);
    }
}

// MakeRoot(u)：把u变成所在树的根
void makeRoot(int x) {
    access(x);
    splay(x);
    pushRev(x);
}

// FindRoot(u)：找到u所在树的根
int findRoot(int x) {
    access(x);
    splay(x);
    while (t[x].ch[0]) {
        pushDown(x);
        x = t[x].ch[0];
    }
    splay(x);
    return x;
}

// Link(u, v)：连接u和v
void link(int x, int y) {
    makeRoot(x);
    if (findRoot(y) != x) {
        t[x].fa = y;
    }
}

// Cut(u, v)：断开u和v之间的边
void cut(int x, int y) {
    makeRoot(x);
    if (findRoot(y) == x && t[y].fa == x && !t[y].ch[0]) {
        t[y].fa = 0;
        t[x].ch[1] = 0;
        pushUp(x);
    }
}

// 路径查询：查询u到v路径上的异或和
int queryPath(int x, int y) {
    makeRoot(x);
    access(y);
    splay(y);
    return t[y].sum;
}
\`\`\`

### 4. 时间复杂度分析

**均摊分析**：
- Access操作：均摊O(log n)
- MakeRoot、FindRoot、Link、Cut：均摊O(log n)
- 路径查询：均摊O(log n)

**关键洞察**：虽然单次操作可能O(n)，但均摊下来是O(log n)！

### 5. LCT的应用示例

**问题**：动态维护森林，支持加边、断边、查询连通性。

\`\`\`cpp
int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> t[i].val;
        t[i].sum = t[i].val;
    }
    
    for (int i = 1; i <= m; i++) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) { // 加边
            link(x, y);
        } else if (op == 2) { // 断边
            cut(x, y);
        } else if (op == 3) { // 查询连通性
            if (findRoot(x) == findRoot(y)) cout << "Yes\\n";
            else cout << "No\\n";
        } else if (op == 4) { // 路径查询
            cout << queryPath(x, y) << "\\n";
        }
    }
    
    return 0;
}
\`\`\`

LCT是"动态树的终极武器"，能解决各种复杂的树结构问题！`,

    code: `// 完整示例：LCT实现
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

struct Node {
    int ch[2], fa;
    int val, sum;
    bool rev;
} t[MAXN];

bool isRoot(int x) {
    return t[t[x].fa].ch[0] != x && t[t[x].fa].ch[1] != x;
}

void pushRev(int x) {
    if (x) {
        swap(t[x].ch[0], t[x].ch[1]);
        t[x].rev ^= 1;
    }
}

void pushDown(int x) {
    if (t[x].rev) {
        pushRev(t[x].ch[0]);
        pushRev(t[x].ch[1]);
        t[x].rev = 0;
    }
}

void pushUp(int x) {
    t[x].sum = t[t[x].ch[0]].sum ^ t[t[x].ch[1]].sum ^ t[x].val;
}

void rotate(int x) {
    int y = t[x].fa, z = t[y].fa;
    int k = (t[y].ch[1] == x);
    
    if (!isRoot(y)) {
        t[z].ch[t[z].ch[1] == y] = x;
    }
    t[x].fa = z;
    
    t[y].ch[k] = t[x].ch[k ^ 1];
    if (t[x].ch[k ^ 1]) t[t[x].ch[k ^ 1]].fa = y;
    
    t[x].ch[k ^ 1] = y;
    t[y].fa = x;
    
    pushUp(y);
    pushUp(x);
}

void splay(int x) {
    int top = 0;
    static int stk[MAXN];
    stk[++top] = x;
    
    for (int i = x; !isRoot(i); i = t[i].fa) {
        stk[++top] = t[i].fa;
    }
    
    while (top) pushDown(stk[top--]);
    
    while (!isRoot(x)) {
        int y = t[x].fa, z = t[y].fa;
        if (!isRoot(y)) {
            if ((t[y].ch[0] == x) ^ (t[z].ch[0] == y)) rotate(x);
            else rotate(y);
        }
        rotate(x);
    }
}

void access(int x) {
    for (int y = 0; x; y = x, x = t[x].fa) {
        splay(x);
        t[x].ch[1] = y;
        pushUp(x);
    }
}

void makeRoot(int x) {
    access(x);
    splay(x);
    pushRev(x);
}

int findRoot(int x) {
    access(x);
    splay(x);
    while (t[x].ch[0]) {
        pushDown(x);
        x = t[x].ch[0];
    }
    splay(x);
    return x;
}

void link(int x, int y) {
    makeRoot(x);
    if (findRoot(y) != x) {
        t[x].fa = y;
    }
}

void cut(int x, int y) {
    makeRoot(x);
    if (findRoot(y) == x && t[y].fa == x && !t[y].ch[0]) {
        t[y].fa = 0;
        t[x].ch[1] = 0;
        pushUp(x);
    }
}

int queryPath(int x, int y) {
    makeRoot(x);
    access(y);
    splay(y);
    return t[y].sum;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> t[i].val;
        t[i].sum = t[i].val;
    }
    
    for (int i = 1; i <= m; i++) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) {
            link(x, y);
        } else if (op == 2) {
            cut(x, y);
        } else if (op == 3) {
            if (findRoot(x) == findRoot(y)) cout << "Yes\\n";
            else cout << "No\\n";
        } else if (op == 4) {
            cout << queryPath(x, y) << "\\n";
        }
    }
    
    return 0;
}`
  },

  'ch7_16_intro': {
    problemDesc: `## 🕰️ 7.16 可持久化数据结构

### 这是什么问题？

想象你是一个游戏开发者，需要实现一个"时光倒流"功能⏰：
- 玩家有一个序列，可以进行各种操作（修改、查询）
- 玩家可以**保存当前状态**，继续游戏
- 玩家可以**回到任意一个保存的状态**，重新开始

如果用普通数据结构，每次修改都会覆盖之前的状态，无法"时光倒流"！

**可持久化数据结构**就是为了解决这个问题！它支持：
- **修改**：生成一个新版本
- **查询**：查询任意历史版本
- **保留所有版本**：不破坏旧版本

> 🎯 比喻：可持久化数据结构就像"游戏的存档系统"，可以随时读档！

常见的可持久化数据结构：
- **可持久化数组**：最基础
- **可持久化线段树**（主席树）：7.11已介绍
- **可持久化平衡树**：支持历史版本的有序集合
- **可持久化并查集**：支持历史版本的连通性查询`,

    idea: `## 💡 算法思想

### 一、可持久化的核心挑战 🕰️

**问题**：如何保存数据结构的"所有历史版本"？

**朴素想法**：每次修改都完整复制一份。但这样空间O(n·m)，m是修改次数，爆炸💥！

**优化思路**：
- 每次修改只影响**一部分**节点
- 其他节点可以**共享**！
- 只**新建被修改的节点**，其他指向旧版本

> 🧠 比喻：就像"修改论文"，只重写改动的段落，其他段落复印原来的！

### 二、可持久化的通用方法 🎯

**核心思想**：**路径复制**

1. 找到被修改的路径（从根到叶子）
2. 复制路径上的所有节点
3. 新建节点的子节点：如果没被修改，指向旧版本的节点
4. 生成新版本的新根

**适用条件**：
- 数据结构是**树形**的
- 每次修改只影响**一条路径**或**O(log n)个节点**

### 三、可持久化数组 📝

**问题**：维护一个数组，支持：
1. 修改某个位置
2. 查询某个位置
3. 查询任意历史版本

**实现**：用线段树实现
- 每个版本是一棵线段树
- 修改时复制一条路径
- 空间：O(n + m log n)

### 四、可持久化平衡树 🌳

**问题**：维护一个有序集合，支持：
1. 插入元素
2. 删除元素
3. 查询排名/第k小
4. 查询任意历史版本

**实现**：用Treap或Splay实现
- 每个版本是一棵平衡树
- 修改时复制一条路径
- 空间：O(n + m log n)

### 五、可持久化并查集 🔗

**问题**：维护一个并查集，支持：
1. 合并两个集合
2. 查询连通性
3. 查询任意历史版本

**实现**：用可持久化数组维护父节点和秩
- 每个版本是一个可持久化数组
- 空间：O(n log n + m log² n)`,

    derivation: `## 可持久化数据结构的推导与实现

### 1. 可持久化数组

\`\`\`cpp
struct Node {
    int ls, rs;
    int val;
} t[MAXN * 40];

int root[MAXN];
int nodeCnt;

// 建树
int build(int l, int r) {
    int p = ++nodeCnt;
    if (l == r) {
        t[p].val = a[l];
        return p;
    }
    int mid = (l + r) / 2;
    t[p].ls = build(l, mid);
    t[p].rs = build(mid + 1, r);
    return p;
}

// 修改：在版本pre的基础上，把位置pos改成val
int modify(int pre, int l, int r, int pos, int val) {
    int p = ++nodeCnt;
    t[p] = t[pre]; // 复制节点
    
    if (l == r) {
        t[p].val = val;
        return p;
    }
    
    int mid = (l + r) / 2;
    if (pos <= mid)
        t[p].ls = modify(t[pre].ls, l, mid, pos, val);
    else
        t[p].rs = modify(t[pre].rs, mid + 1, r, pos, val);
    
    return p;
}

// 查询：查询版本root中位置pos的值
int query(int root, int l, int r, int pos) {
    if (l == r) return t[root].val;
    
    int mid = (l + r) / 2;
    if (pos <= mid) return query(t[root].ls, l, mid, pos);
    else return query(t[root].rs, mid + 1, r, pos);
}
\`\`\`

### 2. 可持久化并查集

\`\`\`cpp
// 用可持久化数组维护fa和rank
int faRoot[MAXN], rankRoot[MAXN];

// 查询版本v中x的父节点
int findFa(int v, int x) {
    return query(faRoot[v], 1, n, x);
}

// 查询版本v中x的秩
int findRank(int v, int x) {
    return query(rankRoot[v], 1, n, x);
}

// 查询版本v中x的根（路径压缩）
int find(int v, int x) {
    int fx = findFa(v, x);
    if (fx == x) return x;
    return find(v, fx);
}

// 合并：在版本v的基础上，合并x和y
int merge(int v, int x, int y) {
    int fx = find(v, x);
    int fy = find(v, y);
    
    if (fx == fy) {
        // 没有变化，新版本和旧版本一样
        faRoot[v + 1] = faRoot[v];
        rankRoot[v + 1] = rankRoot[v];
        return;
    }
    
    int rankX = findRank(v, fx);
    int rankY = findRank(v, fy);
    
    if (rankX < rankY) swap(fx, fy);
    
    // 把fy的父节点改成fx
    faRoot[v + 1] = modify(faRoot[v], 1, n, fy, fx);
    rankRoot[v + 1] = rankRoot[v];
    
    if (rankX == rankY) {
        // fx的秩加1
        rankRoot[v + 1] = modify(rankRoot[v + 1], 1, n, fx, rankX + 1);
    }
}
\`\`\`

### 3. 可持久化Treap（简化版）

\`\`\`cpp
struct Node {
    int ls, rs;
    int val, pri;
    int size;
} t[MAXN * 40];

int root[MAXN];
int nodeCnt;

// 复制节点
int copyNode(int x) {
    int p = ++nodeCnt;
    t[p] = t[x];
    return p;
}

// 旋转（需要复制节点）
void rotate(int &x, int k) {
    int y = copyNode(t[x].ch[k]);
    t[x].ch[k] = t[y].ch[k ^ 1];
    t[y].ch[k ^ 1] = x;
    x = y;
}

// 插入（生成新版本）
void insert(int pre, int &cur, int val) {
    if (!cur) {
        cur = ++nodeCnt;
        t[cur].val = val;
        t[cur].pri = rand();
        t[cur].size = 1;
        return;
    }
    
    cur = copyNode(pre); // 复制当前节点
    t[cur].size++;
    
    if (val < t[cur].val) {
        insert(t[pre].ls, t[cur].ls, val);
        if (t[t[cur].ls].pri > t[cur].pri) rotate(cur, 0);
    } else {
        insert(t[pre].rs, t[cur].rs, val);
        if (t[t[cur].rs].pri > t[cur].pri) rotate(cur, 1);
    }
}

// 生成新版本
void insertVersion(int v, int val) {
    root[v + 1] = root[v];
    insert(root[v], root[v + 1], val);
}
\`\`\`

### 4. 空间复杂度总结

| 数据结构 | 初始空间 | 每次修改空间 |
|---------|---------|------------|
| 可持久化数组 | O(n) | O(log n) |
| 可持久化线段树 | O(n) | O(log n) |
| 可持久化平衡树 | O(n) | O(log n) |
| 可持久化并查集 | O(n log n) | O(log² n) |

可持久化数据结构是"时光机的实现"，让数据结构拥有了"记忆"！`,

    code: `// 完整示例：可持久化数组
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;

struct Node {
    int ls, rs;
    int val;
} t[MAXN * 40];

int root[MAXN];
int nodeCnt;
int a[MAXN];

int build(int l, int r) {
    int p = ++nodeCnt;
    if (l == r) {
        t[p].val = a[l];
        return p;
    }
    int mid = (l + r) / 2;
    t[p].ls = build(l, mid);
    t[p].rs = build(mid + 1, r);
    return p;
}

int modify(int pre, int l, int r, int pos, int val) {
    int p = ++nodeCnt;
    t[p] = t[pre];
    
    if (l == r) {
        t[p].val = val;
        return p;
    }
    
    int mid = (l + r) / 2;
    if (pos <= mid)
        t[p].ls = modify(t[pre].ls, l, mid, pos, val);
    else
        t[p].rs = modify(t[pre].rs, mid + 1, r, pos, val);
    
    return p;
}

int query(int root, int l, int r, int pos) {
    if (l == r) return t[root].val;
    
    int mid = (l + r) / 2;
    if (pos <= mid) return query(t[root].ls, l, mid, pos);
    else return query(t[root].rs, mid + 1, r, pos);
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    
    root[0] = build(1, n);
    
    for (int i = 1; i <= m; i++) {
        int op, ver, pos, val;
        cin >> op >> ver;
        if (op == 1) { // 修改
            cin >> pos >> val;
            root[i] = modify(root[ver], 1, n, pos, val);
        } else if (op == 2) { // 查询
            cin >> pos;
            cout << query(root[ver], 1, n, pos) << "\\n";
            root[i] = root[ver]; // 查询不产生新版本
        }
    }
    
    return 0;
}`
  },

  'ch7_17_intro': {
    problemDesc: `## 📐 7.17 K-D Tree

### 这是什么问题？

想象你是一个游戏设计师，需要在一个二维地图上做操作🗺️：
- 地图上有许多NPC，每个NPC有坐标(x,y)
- **查询操作**：找到距离某个点最近的NPC
- **范围查询**：找到矩形区域内的所有NPC

如果用暴力方法，每次查询都要遍历所有NPC，O(n)太慢！

**K-D Tree**就是为了解决这个问题！它是一种**多维空间的数据结构**，能把最近邻查询优化到O(√n)甚至更快！

> 🎯 比喻：K-D Tree就像"空间的二分法"，每次把空间切成两半，快速定位目标区域！

K-D Tree的应用：
- **最近邻查询**：找到离查询点最近的点
- **范围查询**：找到矩形/圆形区域内的点
- **K近邻查询**：找到离查询点最近的k个点`,

    idea: `## 💡 算法思想

### 一、多维空间的挑战 📐

**问题**：给定n个k维空间中的点，支持：
1. 最近邻查询：找到离查询点最近的点
2. 范围查询：找到某个区域内的所有点

**难点**：多维空间不能直接排序！

### 二、K-D Tree的核心思想 🔪

**关键观察**：每次选择一个维度，把空间切成两半！

**K-D Tree的构建**：
1. 选择一个维度（轮流选择或选择方差最大的）
2. 找到该维度的中位数
3. 用中位数把空间切成两半
4. 递归构建左右子树

> 🧠 比喻：就像"切蛋糕"！每次选择一个方向切一刀，把空间分成两半！

**性质**：
- 每个节点代表一个点
- 左子树的所有点在当前维度上 ≤ 当前节点
- 右子树的所有点在当前维度上 ≥ 当前节点
- 树的高度：O(log n)（如果数据分布均匀）

### 三、最近邻查询 🎯

**查询过程**：
1. 从根节点开始，像BST一样往下走
2. 维护"当前最近点"和"当前最近距离"
3. 回溯时，检查另一子树是否可能有更近的点
4. 如果查询点到分割面的距离 ≥ 当前最近距离，剪枝

**关键优化**：
- **剪枝**：如果不可能有更近的点，不搜索该子树
- **维护子树范围**：每个节点维护子树的bounding box，加速判断

### 四、范围查询 📦

**查询过程**：
1. 从根节点开始
2. 如果当前节点的子树范围完全在查询范围内，全部加入答案
3. 如果当前节点的子树范围完全不在查询范围内，剪枝
4. 否则递归查询左右子树

### 五、K-D Tree的优化 🚀

**1. 替罪树重构**
- 当树不平衡时，暴力重构
- 保持树的平衡，保证查询效率

**2. 维护子树信息**
- 每个节点维护子树的bounding box
- 加速范围查询和最近邻查询

**3. 批量构建**
- 给定n个点，O(n log n)构建K-D Tree
- 每次选择中位数，保证平衡`,

    derivation: `## K-D Tree的推导与实现

### 1. K-D Tree的节点结构

\`\`\`cpp
struct Point {
    int x, y; // 二维坐标
    int id;   // 点的编号
};

struct Node {
    Point p;        // 当前节点代表的点
    int ls, rs;     // 左右儿子
    int minx, maxx; // 子树x范围
    int miny, maxy; // 子树y范围
} t[MAXN];
\`\`\`

### 2. 构建K-D Tree

\`\`\`cpp
// 比较函数：按第d维排序
bool cmpX(const Point &a, const Point &b) { return a.x < b.x; }
bool cmpY(const Point &a, const Point &b) { return a.y < b.y; }

// 维护子树范围
void pushUp(int u) {
    t[u].minx = t[u].maxx = t[u].p.x;
    t[u].miny = t[u].maxy = t[u].p.y;
    
    if (t[u].ls) {
        t[u].minx = min(t[u].minx, t[t[u].ls].minx);
        t[u].maxx = max(t[u].maxx, t[t[u].ls].maxx);
        t[u].miny = min(t[u].miny, t[t[u].ls].miny);
        t[u].maxy = max(t[u].maxy, t[t[u].ls].maxy);
    }
    if (t[u].rs) {
        t[u].minx = min(t[u].minx, t[t[u].rs].minx);
        t[u].maxx = max(t[u].maxx, t[t[u].rs].maxx);
        t[u].miny = min(t[u].miny, t[t[u].rs].miny);
        t[u].maxy = max(t[u].maxy, t[t[u].rs].maxy);
    }
}

// 构建：在点集a[l..r]中构建K-D Tree，当前深度为dep
int build(int l, int r, int dep) {
    if (l > r) return 0;
    
    int mid = (l + r) / 2;
    
    // 选择排序的维度
    if (dep % 2 == 0) {
        nth_element(a + l, a + mid, a + r + 1, cmpX);
    } else {
        nth_element(a + l, a + mid, a + r + 1, cmpY);
    }
    
    int u = mid; // 用mid作为节点编号
    t[u].p = a[mid];
    t[u].ls = build(l, mid - 1, dep + 1);
    t[u].rs = build(mid + 1, r, dep + 1);
    
    pushUp(u);
    return u;
}
\`\`\`

### 3. 最近邻查询

\`\`\`cpp
// 计算两点距离的平方
long long dist(const Point &a, const Point &b) {
    return (long long)(a.x - b.x) * (a.x - b.x) + 
           (long long)(a.y - b.y) * (a.y - b.y);
}

// 查询点到子树u的最小可能距离
long long minDist(int u, const Point &p) {
    long long dx = 0, dy = 0;
    if (p.x < t[u].minx) dx = t[u].minx - p.x;
    else if (p.x > t[u].maxx) dx = p.x - t[u].maxx;
    if (p.y < t[u].miny) dy = t[u].miny - p.y;
    else if (p.y > t[u].maxy) dy = p.y - t[u].maxy;
    return dx * dx + dy * dy;
}

long long ans; // 当前最近距离
int ansId;     // 当前最近点的编号

// 查询最近邻
void query(int u, const Point &p) {
    if (!u) return;
    
    // 更新答案
    if (t[u].p.id != p.id) { // 不查询自己
        long long d = dist(t[u].p, p);
        if (d < ans) {
            ans = d;
            ansId = t[u].p.id;
        }
    }
    
    // 计算到左右子树的最小可能距离
    long long dl = t[u].ls ? minDist(t[u].ls, p) : LLONG_MAX;
    long long dr = t[u].rs ? minDist(t[u].rs, p) : LLONG_MAX;
    
    // 优先搜索更有可能的子树
    if (dl < dr) {
        if (dl < ans) query(t[u].ls, p);
        if (dr < ans) query(t[u].rs, p);
    } else {
        if (dr < ans) query(t[u].rs, p);
        if (dl < ans) query(t[u].ls, p);
    }
}
\`\`\`

### 4. 范围查询

\`\`\`cpp
vector<int> ansList; // 范围内的点

// 判断子树u是否完全在查询矩形内
bool inRect(int u, int x1, int x2, int y1, int y2) {
    return t[u].minx >= x1 && t[u].maxx <= x2 &&
           t[u].miny >= y1 && t[u].maxy <= y2;
}

// 判断子树u是否完全不在查询矩形内
bool outRect(int u, int x1, int x2, int y1, int y2) {
    return t[u].minx > x2 || t[u].maxx < x1 ||
           t[u].miny > y2 || t[u].maxy < y1;
}

// 判断点是否在查询矩形内
bool pointInRect(const Point &p, int x1, int x2, int y1, int y2) {
    return p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2;
}

// 范围查询
void queryRect(int u, int x1, int x2, int y1, int y2) {
    if (!u) return;
    
    if (inRect(u, x1, x2, y1, y2)) {
        // 子树完全在范围内，全部加入
        collectAll(u);
        return;
    }
    
    if (outRect(u, x1, x2, y1, y2)) {
        // 子树完全不在范围内，剪枝
        return;
    }
    
    // 检查当前点
    if (pointInRect(t[u].p, x1, x2, y1, y2)) {
        ansList.push_back(t[u].p.id);
    }
    
    // 递归查询
    queryRect(t[u].ls, x1, x2, y1, y2);
    queryRect(t[u].rs, x1, x2, y1, y2);
}
\`\`\`

### 5. 时间复杂度总结

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| 构建 | O(n log n) | 每次找中位数 |
| 最近邻查询 | O(√n) 平均 | 最坏O(n) |
| 范围查询 | O(√n + k) | k是答案数量 |
| 插入 | O(log n) 平均 | 最坏O(n) |

K-D Tree是"多维空间的利器"，在计算几何和空间查询中广泛应用！`,

    code: `// 完整示例：K-D Tree实现最近邻查询
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;

struct Point {
    int x, y;
    int id;
} a[MAXN], queryPoint;

struct Node {
    Point p;
    int ls, rs;
    int minx, maxx;
    int miny, maxy;
} t[MAXN];

int root;

bool cmpX(const Point &a, const Point &b) { return a.x < b.x; }
bool cmpY(const Point &a, const Point &b) { return a.y < b.y; }

void pushUp(int u) {
    t[u].minx = t[u].maxx = t[u].p.x;
    t[u].miny = t[u].maxy = t[u].p.y;
    
    if (t[u].ls) {
        t[u].minx = min(t[u].minx, t[t[u].ls].minx);
        t[u].maxx = max(t[u].maxx, t[t[u].ls].maxx);
        t[u].miny = min(t[u].miny, t[t[u].ls].miny);
        t[u].maxy = max(t[u].maxy, t[t[u].ls].maxy);
    }
    if (t[u].rs) {
        t[u].minx = min(t[u].minx, t[t[u].rs].minx);
        t[u].maxx = max(t[u].maxx, t[t[u].rs].maxx);
        t[u].miny = min(t[u].miny, t[t[u].rs].miny);
        t[u].maxy = max(t[u].maxy, t[t[u].rs].maxy);
    }
}

int build(int l, int r, int dep) {
    if (l > r) return 0;
    
    int mid = (l + r) / 2;
    
    if (dep % 2 == 0) {
        nth_element(a + l, a + mid, a + r + 1, cmpX);
    } else {
        nth_element(a + l, a + mid, a + r + 1, cmpY);
    }
    
    int u = mid;
    t[u].p = a[mid];
    t[u].ls = build(l, mid - 1, dep + 1);
    t[u].rs = build(mid + 1, r, dep + 1);
    
    pushUp(u);
    return u;
}

long long dist(const Point &a, const Point &b) {
    return (long long)(a.x - b.x) * (a.x - b.x) + 
           (long long)(a.y - b.y) * (a.y - b.y);
}

long long minDist(int u, const Point &p) {
    long long dx = 0, dy = 0;
    if (p.x < t[u].minx) dx = t[u].minx - p.x;
    else if (p.x > t[u].maxx) dx = p.x - t[u].maxx;
    if (p.y < t[u].miny) dy = t[u].miny - p.y;
    else if (p.y > t[u].maxy) dy = p.y - t[u].maxy;
    return dx * dx + dy * dy;
}

long long ans;
int ansId;

void query(int u, const Point &p) {
    if (!u) return;
    
    if (t[u].p.id != p.id) {
        long long d = dist(t[u].p, p);
        if (d < ans) {
            ans = d;
            ansId = t[u].p.id;
        }
    }
    
    long long dl = t[u].ls ? minDist(t[u].ls, p) : LLONG_MAX;
    long long dr = t[u].rs ? minDist(t[u].rs, p) : LLONG_MAX;
    
    if (dl < dr) {
        if (dl < ans) query(t[u].ls, p);
        if (dr < ans) query(t[u].rs, p);
    } else {
        if (dr < ans) query(t[u].rs, p);
        if (dl < ans) query(t[u].ls, p);
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i].x >> a[i].y;
        a[i].id = i;
    }
    
    root = build(1, n, 0);
    
    for (int i = 1; i <= m; i++) {
        cin >> queryPoint.x >> queryPoint.y;
        queryPoint.id = 0;
        ans = LLONG_MAX;
        ansId = -1;
        query(root, queryPoint);
        cout << ansId << "\\n";
    }
    
    return 0;
}`
  },

  'ch7_18_intro': {
    problemDesc: `## 🌈 7.18 珂朵莉树（Chtholly Tree）

### 这是什么问题？

想象你是一个游戏开发者，需要管理一个长长的血条🩸：
- 血条是一个长度为n的数组，每个位置有一个值
- **区间赋值操作**：把区间[l,r]的所有值改成v
- **区间操作**：查询区间[l,r]的和/最值等

如果用线段树，每次区间赋值都要打标记，很麻烦；如果用分块，代码复杂！

**珂朵莉树（Chtholly Tree）**就是为了解决这个问题！它是一种**基于set的暴力数据结构**，在**随机数据**下效率极高！

> 🎯 比喻：珂朵莉树就像"把连续的相同值合并成一段"，用set维护这些段！

**核心思想**：
- 用set维护若干个**连续段**（区间[l,r]的值都是v）
- 每次区间赋值后，合并相邻的相同段
- 查询时，遍历相关段

**适用条件**：
- 必须有**区间赋值操作**
- 数据是**随机**的（否则可能退化）

珂朵莉树的名字来自动漫《末日时在做什么？有没有空？可以来拯救吗？》的主角珂朵莉·诺塔·瑟尼欧里斯！`,

    idea: `## 💡 算法思想

### 一、珂朵莉树的核心思想 🎯

**关键观察**：如果有很多**区间赋值**操作，数组中会有很多**连续相同的段**！

**珂朵莉树的做法**：
1. 用set维护若干个**连续段**
2. 每个段表示为(l, r, v)：区间[l,r]的值都是v
3. 区间赋值时，把相关段合并成一个大段
4. 查询时，遍历相关段

> 🧠 比喻：就像"把相同颜色的珠子串成项链"，用set维护这些"珠子串"！

### 二、数据结构设计 📝

\`\`\`cpp
struct Node {
    int l, r;      // 区间[l,r]
    long long v;   // 值
    bool operator<(const Node &o) const {
        return l < o.l; // 按左端点排序
    }
};
set<Node> tree;
\`\`\`

### 三、核心操作：Split 🔪

**Split(pos)**：把包含pos的段分成两段
- 找到包含pos的段(l, r, v)
- 如果l == pos，不用分
- 否则分成(l, pos-1, v)和(pos, r, v)

**Assign(l, r, v)**：把区间[l,r]赋值为v
1. 先Split(r+1)，再Split(l)
2. 删除[l,r]内的所有段
3. 插入新段(l, r, v)

### 四、查询操作 🔍

**查询区间[l,r]的和**：
1. Split(r+1)，Split(l)
2. 遍历[l,r]内的所有段
3. 对每个段(l', r', v)，贡献是(r'-l'+1)×v

### 五、珂朵莉树的优势与劣势 📊

**优势**：
- 代码**极其简洁**（相比线段树）
- 在**随机数据+区间赋值**下效率极高
- 易于实现各种区间操作

**劣势**：
- **必须有区间赋值**（否则段不会合并，退化）
- **非随机数据**可能退化到O(n)
- 不能替代线段树的所有功能

### 六、经典应用 🚀

1. **区间赋值+区间求和**
2. **区间赋值+区间最值**
3. **区间赋值+区间第k大**（配合其他技巧）
4. **各种"ODT"题**（Online Data Structure）`,

    derivation: `## 珂朵莉树的推导与实现

### 1. 节点结构

\`\`\`cpp
struct Node {
    int l, r;
    long long v;
    bool operator<(const Node &o) const {
        return l < o.l;
    }
};

set<Node> tree;
\`\`\`

### 2. Split操作

\`\`\`cpp
// 把包含pos的段分成两段，返回pos所在段的迭代器
auto split(int pos) {
    auto it = tree.lower_bound({pos, 0, 0});
    if (it != tree.end() && it->l == pos) return it;
    
    --it;
    int l = it->l, r = it->r;
    long long v = it->v;
    
    tree.erase(it);
    tree.insert({l, pos - 1, v});
    return tree.insert({pos, r, v}).first;
}
\`\`\`

### 3. Assign操作

\`\`\`cpp
// 把区间[l,r]赋值为v
void assign(int l, int r, long long v) {
    auto itr = split(r + 1), itl = split(l);
    
    // 删除[l,r]内的所有段
    for (auto it = itl; it != itr; ++it) {
        // 可以在这里统计信息（如区间和）
    }
    tree.erase(itl, itr);
    
    // 插入新段
    tree.insert({l, r, v});
}
\`\`\`

### 4. 区间求和

\`\`\`cpp
// 查询区间[l,r]的和
long long querySum(int l, int r) {
    auto itr = split(r + 1), itl = split(l);
    long long ans = 0;
    
    for (auto it = itl; it != itr; ++it) {
        ans += (long long)(it->r - it->l + 1) * it->v;
    }
    
    return ans;
}
\`\`\`

### 5. 区间最值

\`\`\`cpp
// 查询区间[l,r]的最大值
long long queryMax(int l, int r) {
    auto itr = split(r + 1), itl = split(l);
    long long ans = LLONG_MIN;
    
    for (auto it = itl; it != itr; ++it) {
        ans = max(ans, it->v);
    }
    
    return ans;
}
\`\`\`

### 6. 区间第k小（需要排序）

\`\`\`cpp
// 查询区间[l,r]的第k小
long long queryKth(int l, int r, int k) {
    auto itr = split(r + 1), itl = split(l);
    vector<pair<long long, int>> vec;
    
    for (auto it = itl; it != itr; ++it) {
        vec.push_back({it->v, it->r - it->l + 1});
    }
    
    sort(vec.begin(), vec.end());
    
    for (auto &p : vec) {
        if (k <= p.second) return p.first;
        k -= p.second;
    }
    
    return -1; // 不应该到达
}
\`\`\`

### 7. 区间加（可选）

\`\`\`cpp
// 给区间[l,r]加上v
void add(int l, int r, long long v) {
    auto itr = split(r + 1), itl = split(l);
    vector<Node> vec;
    
    for (auto it = itl; it != itr; ++it) {
        vec.push_back({it->l, it->r, it->v + v});
    }
    
    tree.erase(itl, itr);
    
    for (auto &node : vec) {
        tree.insert(node);
    }
}
\`\`\`

### 8. 时间复杂度分析

**关键**：珂朵莉树的效率取决于**段的数量**。

**随机数据+区间赋值**：
- 每次区间赋值会把多个段合并成一个
- 段的数量期望是O(log n)
- 每次操作：O(log n)

**非随机数据**：
- 如果没有区间赋值，段不会合并
- 最坏情况：O(n)个段，每次操作O(n)

**结论**：珂朵莉树**必须有区间赋值**，且**数据要随机**！

### 9. 完整示例

\`\`\`cpp
int main() {
    int n, m;
    long long seed;
    cin >> n >> m >> seed;
    
    // 初始化
    for (int i = 1; i <= n; i++) {
        long long v = rnd(seed);
        tree.insert({i, i, v});
    }
    tree.insert({n + 1, n + 1, 0}); // 哨兵
    
    for (int i = 1; i <= m; i++) {
        int op = rnd(seed) % 4 + 1;
        int l = rnd(seed) % n + 1;
        int r = rnd(seed) % n + 1;
        if (l > r) swap(l, r);
        
        if (op == 1) { // 区间加
            long long v = rnd(seed);
            add(l, r, v);
        } else if (op == 2) { // 区间赋值
            long long v = rnd(seed);
            assign(l, r, v);
        } else if (op == 3) { // 区间第k小
            int k = rnd(seed) % (r - l + 1) + 1;
            cout << queryKth(l, r, k) << "\\n";
        } else if (op == 4) { // 区间幂次和
            long long v = rnd(seed);
            cout << queryPowSum(l, r, v) << "\\n";
        }
    }
    
    return 0;
}
\`\`\`

珂朵莉树是"暴力美学的典范"，在特定场景下比线段树更简洁高效！`,

    code: `// 完整示例：珂朵莉树实现
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int l, r;
    long long v;
    bool operator<(const Node &o) const {
        return l < o.l;
    }
};

set<Node> tree;

auto split(int pos) {
    auto it = tree.lower_bound({pos, 0, 0});
    if (it != tree.end() && it->l == pos) return it;
    
    --it;
    int l = it->l, r = it->r;
    long long v = it->v;
    
    tree.erase(it);
    tree.insert({l, pos - 1, v});
    return tree.insert({pos, r, v}).first;
}

void assign(int l, int r, long long v) {
    auto itr = split(r + 1), itl = split(l);
    tree.erase(itl, itr);
    tree.insert({l, r, v});
}

void add(int l, int r, long long v) {
    auto itr = split(r + 1), itl = split(l);
    vector<Node> vec;
    
    for (auto it = itl; it != itr; ++it) {
        vec.push_back({it->l, it->r, it->v + v});
    }
    
    tree.erase(itl, itr);
    
    for (auto &node : vec) {
        tree.insert(node);
    }
}

long long querySum(int l, int r) {
    auto itr = split(r + 1), itl = split(l);
    long long ans = 0;
    
    for (auto it = itl; it != itr; ++it) {
        ans += (long long)(it->r - it->l + 1) * it->v;
    }
    
    return ans;
}

long long queryMax(int l, int r) {
    auto itr = split(r + 1), itl = split(l);
    long long ans = LLONG_MIN;
    
    for (auto it = itl; it != itr; ++it) {
        ans = max(ans, it->v);
    }
    
    return ans;
}

long long queryKth(int l, int r, int k) {
    auto itr = split(r + 1), itl = split(l);
    vector<pair<long long, int>> vec;
    
    for (auto it = itl; it != itr; ++it) {
        vec.push_back({it->v, it->r - it->l + 1});
    }
    
    sort(vec.begin(), vec.end());
    
    for (auto &p : vec) {
        if (k <= p.second) return p.first;
        k -= p.second;
    }
    
    return -1;
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        long long v;
        cin >> v;
        tree.insert({i, i, v});
    }
    tree.insert({n + 1, n + 1, 0});
    
    for (int i = 1; i <= m; i++) {
        int op, l, r;
        long long v;
        cin >> op >> l >> r;
        
        if (op == 1) {
            cin >> v;
            add(l, r, v);
        } else if (op == 2) {
            cin >> v;
            assign(l, r, v);
        } else if (op == 3) {
            int k;
            cin >> k;
            cout << queryKth(l, r, k) << "\\n";
        } else if (op == 4) {
            cout << querySum(l, r) << "\\n";
        } else if (op == 5) {
            cout << queryMax(l, r) << "\\n";
        }
    }
    
    return 0;
}`
  }
});
