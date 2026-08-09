// 缺失的Part8和Part10内容
Object.assign(LESSON_CONTENT, {
  'ch8_3_1_intro': {
    problemDesc: `## 🌳 8.3.1 二叉树（性质、遍历）

### 这是什么问题？

想象你是一家族谱的编辑者，需要记录一个庞大家族的辈分关系。爷爷有两个儿子，每个儿子又有两个孩子……这种"一生二、二生四"的结构，就是一棵**树**！而在算法世界里，最常见、最重要的就是**二叉树**——每个节点最多只有两个"孩子"。

🌲 **二叉树能解决什么问题？**
- 📂 文件系统：你电脑里的文件夹就是一棵树的层级结构
- 🔍 快速查找：二叉搜索树让你在百万数据中秒级定位
- 📊 表达式求值：编译器把算术表达式变成一棵树来计算
- 🎮 决策树：AI下棋时每一步的选择构成一棵决策树

具体来说，我们需要掌握：
1. **二叉树的基本性质**：第 i 层最多有 2^(i-1) 个节点，深度为 k 的二叉树最多有 2^k - 1 个节点……
2. **三种遍历方式**：前序遍历（先根）、中序遍历（先左再根后右）、后序遍历（先左再右后根）
3. **层序遍历**：一层一层地从上到下、从左到右访问

二叉树是算法竞赛的"基础设施"，后面的线段树、平衡树、树形DP全都建立在它之上！洛谷 P1305【新二叉树】就是一道经典入门题。`,

    idea: `## 💡 算法思想

### 一、什么是二叉树？

二叉树就是一棵**每个节点最多有两个孩子**的树。我们习惯叫它们"左孩子"和"右孩子"。

> 🎯 比喻：二叉树就像一个家族，每个爸爸最多只能生两个孩子——一个左边的，一个右边的。

\`\`\`
        1          ← 根节点（第1层）
       / \\
      2   3        ← 第2层
     / \\   \\
    4   5   6      ← 第3层
   /
  7                ← 第4层
\`\`\`

### 二、二叉树的重要性质

| 性质 | 内容 | 记忆口诀 |
|------|------|----------|
| 性质1 | 第 i 层最多有 2^(i-1) 个节点 | "层数翻倍增长" |
| 性质2 | 深度为 k 的二叉树最多有 2^k - 1 个节点 | "满二叉树的节点总数" |
| 性质3 | 叶子节点数 = 度为2的节点数 + 1 | "叶子总比叉子多一个" |

> 🧠 为什么性质3成立？想象每个"叉"（度为2的节点）会"创造"一个额外的分支，最终多出来的那个末端就是叶子。

### 三、四种遍历方式

**🔴 前序遍历（先根遍历）**：根 → 左 → 右
- 就像"先跟老板打招呼，再看左边部门，再看右边部门"
- 上面的树：1, 2, 4, 7, 5, 3, 6

**🟢 中序遍历（中根遍历）**：左 → 根 → 右
- 就像"先看左边部门，再看老板，最后看右边部门"
- 上面的树：7, 4, 2, 5, 1, 3, 6

**🔵 后序遍历（后根遍历）**：左 → 右 → 根
- 就像"先把底下员工看完，最后才见老板"
- 上面的树：7, 4, 5, 2, 6, 3, 1

**🟡 层序遍历**：从上到下，一层一层
- 就像"拍集体照，第一排站完站第二排"
- 上面的树：1, 2, 3, 4, 5, 6, 7

💡 **一句话记住遍历：** "前序就是名字在前面（先访问根），后序就是名字在后面（后访问根），中序就是名字在中间！层序就是排队报数！"`,

    derivation: `## 📐 推导与实现

### 一、二叉树的存储

**方法1：链式存储（指针/结构体）**
\`\`\`
struct Node {
    int val;        // 节点的值
    Node* left;     // 左孩子
    Node* right;    // 右孩子
};
\`\`\`

**方法2：数组存储（竞赛常用！）**
\`\`\`
int val[MAXN], ls[MAXN], rs[MAXN];  // ls[i] = i的左孩子, rs[i] = i的右孩子
\`\`\`

> 🎯 数组存储的优势：不用指针，不怕内存泄漏，速度快！

### 二、前序遍历的推导

前序遍历的顺序：**根 → 左子树 → 右子树**

递归思路：
1. 访问当前节点（根）
2. 递归遍历左子树
3. 递归遍历右子树

\`\`\`
void preorder(int u) {
    if (u == 0) return;       // 空节点，返回
    cout << val[u] << " ";    // ① 访问根
    preorder(ls[u]);          // ② 遍历左子树
    preorder(rs[u]);          // ③ 遍历右子树
}
\`\`\`

**递归展开过程（以示例树为例）：**
\`\`\`
preorder(1):
  输出 1
  preorder(2):
    输出 2
    preorder(4):
      输出 4
      preorder(7):
        输出 7
        preorder(0) → 返回
        preorder(0) → 返回
      preorder(0) → 返回
    preorder(5):
      输出 5
      ...
  preorder(3):
    输出 3
    ...
\`\`\`

### 三、中序遍历和后序遍历

只需要改变"访问根"的位置！

\`\`\`
// 中序遍历：左 → 根 → 右
void inorder(int u) {
    if (u == 0) return;
    inorder(ls[u]);          // ① 遍历左子树
    cout << val[u] << " ";   // ② 访问根
    inorder(rs[u]);          // ③ 遍历右子树
}

// 后序遍历：左 → 右 → 根
void postorder(int u) {
    if (u == 0) return;
    postorder(ls[u]);        // ① 遍历左子树
    postorder(rs[u]);        // ② 遍历右子树
    cout << val[u] << " ";   // ③ 访问根
}
\`\`\`

> 🧠 **记忆技巧**：三种遍历中，"左"永远在"右"前面！变化的只是"根"的位置——前序根在最前，中序根在中间，后序根在最后。

### 四、层序遍历（BFS）

层序遍历用**队列**实现，就像排队买奶茶：
1. 根节点先入队
2. 每次取出队头，输出它，然后把它的左右孩子入队
3. 重复直到队列为空

\`\`\`
void levelOrder(int root) {
    queue<int> q;
    q.push(root);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << val[u] << " ";
        if (ls[u]) q.push(ls[u]);   // 左孩子入队
        if (rs[u]) q.push(rs[u]);   // 右孩子入队
    }
}
\`\`\`

### 五、时间复杂度分析

| 遍历方式 | 时间复杂度 | 空间复杂度 |
|----------|------------|------------|
| 前序遍历 | O(n) | O(h)，h为树高 |
| 中序遍历 | O(n) | O(h) |
| 后序遍历 | O(n) | O(h) |
| 层序遍历 | O(n) | O(n) |

每个节点恰好被访问一次，所以时间复杂度都是 O(n)。递归的空间复杂度取决于树的高度（递归栈深度），最坏 O(n)（链状），最好 O(log n)（平衡树）。

### 六、特殊二叉树

| 名称 | 定义 | 特点 |
|------|------|------|
| 满二叉树 | 每层节点数都达到最大 | 所有叶子在同一层 |
| 完全二叉树 | 只有最后一层可能不满，且不满的节点都靠左 | 可以用数组高效存储 |
| 二叉搜索树 | 左子树所有值 < 根 < 右子树所有值 | 中序遍历是有序的！ |`,

    code: `// ========== 二叉树的遍历完整代码 ==========
#include <iostream>
#include <queue>
using namespace std;

const int MAXN = 100005;

// 数组存储二叉树
int val[MAXN];   // 节点的值
int ls[MAXN];    // 左孩子编号（0表示没有）
int rs[MAXN];    // 右孩子编号
int cnt = 0;     // 节点计数器

// 创建新节点
int newNode(int v) {
    ++cnt;
    val[cnt] = v;
    ls[cnt] = rs[cnt] = 0;  // 初始没有孩子
    return cnt;
}

// ===== 前序遍历：根 → 左 → 右 =====
void preorder(int u) {
    if (u == 0) return;         // 空节点，返回
    cout << val[u] << " ";      // 访问根节点
    preorder(ls[u]);            // 递归遍历左子树
    preorder(rs[u]);            // 递归遍历右子树
}

// ===== 中序遍历：左 → 根 → 右 =====
void inorder(int u) {
    if (u == 0) return;
    inorder(ls[u]);             // 递归遍历左子树
    cout << val[u] << " ";      // 访问根节点
    inorder(rs[u]);             // 递归遍历右子树
}

// ===== 后序遍历：左 → 右 → 根 =====
void postorder(int u) {
    if (u == 0) return;
    postorder(ls[u]);           // 递归遍历左子树
    postorder(rs[u]);           // 递归遍历右子树
    cout << val[u] << " ";      // 访问根节点
}

// ===== 层序遍历（BFS） =====
void levelOrder(int root) {
    queue<int> q;
    q.push(root);               // 根节点入队
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << val[u] << " ";  // 输出当前节点
        if (ls[u]) q.push(ls[u]);   // 左孩子入队
        if (rs[u]) q.push(rs[u]);   // 右孩子入队
    }
}

// ===== 求二叉树的深度 =====
int depth(int u) {
    if (u == 0) return 0;       // 空树深度为0
    int ld = depth(ls[u]);      // 左子树深度
    int rd = depth(rs[u]);      // 右子树深度
    return max(ld, rd) + 1;     // 取较大值 + 1（当前层）
}

// ===== 统计叶子节点数 =====
int countLeaves(int u) {
    if (u == 0) return 0;
    if (ls[u] == 0 && rs[u] == 0) return 1;  // 没有孩子 = 叶子
    return countLeaves(ls[u]) + countLeaves(rs[u]);
}

int main() {
    // 手动建一棵树：
    //         1
    //        / \\
    //       2   3
    //      / \\   \\
    //     4   5   6
    //    /
    //   7
    int root = newNode(1);
    int n2 = newNode(2), n3 = newNode(3);
    ls[root] = n2; rs[root] = n3;
    int n4 = newNode(4), n5 = newNode(5);
    ls[n2] = n4; rs[n2] = n5;
    int n6 = newNode(6);
    rs[n3] = n6;
    int n7 = newNode(7);
    ls[n4] = n7;

    cout << "前序遍历: "; preorder(root); cout << endl;
    // 输出: 1 2 4 7 5 3 6
    cout << "中序遍历: "; inorder(root); cout << endl;
    // 输出: 7 4 2 5 1 3 6
    cout << "后序遍历: "; postorder(root); cout << endl;
    // 输出: 7 4 5 2 6 3 1
    cout << "层序遍历: "; levelOrder(root); cout << endl;
    // 输出: 1 2 3 4 5 6 7
    cout << "树的深度: " << depth(root) << endl;
    // 输出: 4
    cout << "叶子节点数: " << countLeaves(root) << endl;
    // 输出: 3（节点7, 5, 6）
    return 0;
}`
  },

  'ch8_3_2_intro': {
    problemDesc: `## 📏 8.3.2 树的直径

### 这是什么问题？

想象你是一只蜘蛛，住在一棵巨大的树形蛛网上。你想从树上的某个点出发，走到最远的另一个点——**你能走的最长路径有多长？** 这条最长的路径就叫**树的直径**！

🕸️ **树的直径的定义**：一棵树中任意两个节点之间路径长度的最大值。

具体来说，树的直径问题包括：
1. **求直径长度**：给定一棵树（带权或不带权），求最长路径的长度
2. **求直径端点**：这条最长路径的两端是哪两个节点？
3. **直径上的路径**：具体经过了哪些节点？

🌟 **实际应用场景**：
- 🏗️ 城市规划：在一个树形道路网中，最远的两个地点距离多远？
- 📡 网络设计：在一棵树形网络中，信号最远要传多远？
- 🎯 树的中心：在哪个节点建医院，使得到最远点的距离最小？

洛谷 P1099【树的直径】和 POJ 1985【Cow Marathon】都是经典题目。树的直径虽然概念简单，但它有一个非常优雅的"两次BFS"求法，是竞赛中的必备技巧！`,

    idea: `## 💡 算法思想

### 一、树的直径的直觉

想象你站在一棵大树下，想找树上最远的两个点。

> 🎯 比喻：就像你在一个没有环路的迷宫里，想找走最远的两个房间。

**关键性质**：树的直径的两个端点，一定是"叶子节点"（度为1的点），因为如果端点还有延伸，路径就能更长！

### 二、两次BFS/DFS法（经典求法）

这是最优雅的求法，只需要两次搜索！

**第一步**：从任意一个点 S 出发，BFS/DFS 找到离 S 最远的点 A。
**第二步**：从 A 出发，BFS/DFS 找到离 A 最远的点 B。
**A 到 B 的路径就是树的直径！**

> 🧠 为什么这样是对的？直觉上：从任意点出发的"最远点"一定是直径的一个端点。然后从那个端点出发的"最远点"就是另一个端点。

\`\`\`
       树的结构：
          1
         / \\
        2   3
       /|   |\\
      4 5   6 7
     /
    8

第一步：从1出发，最远点是8（距离3）
第二步：从8出发，最远点是7（距离5：8→4→2→1→3→7）
所以直径 = 5，路径为 8-4-2-1-3-7
\`\`\`

### 三、树形DP法

另一种方法是树形DP，在遍历树的过程中维护"经过当前节点的最长路径"。

对于每个节点 u，我们维护：
- **f[u]** = 从 u 往下走的最长路径长度
- 经过 u 的最长路径 = 从 u 出发最长的两条"向下路径"之和

> 🎯 比喻：每个节点像一个"中转站"，它要选出两条最长的"向下分支"拼起来，看能不能刷新直径的记录！

### 四、两种方法对比

| 方法 | 时间复杂度 | 优点 | 缺点 |
|------|------------|------|------|
| 两次BFS | O(n) | 简单好写 | 带负权边时不适用 |
| 树形DP | O(n) | 能处理负权边 | 代码稍复杂 |

💡 **一句话记住树的直径：** "从任意点找最远点A，再从A找最远点B，AB就是直径！"`,

    derivation: `## 📐 推导与实现

### 一、两次BFS法的正确性证明

**定理**：从任意节点 S 出发，BFS 找到的最远点 A 一定是某条直径的端点。

**证明（反证法）**：
假设 A 不是任何直径的端点。设直径的两个端点是 U 和 V。

情况1：S 在直径 UV 上
\`\`\`
U ---S---A'---V        （直径UV）
        |
        A              （S的最远点）
\`\`\`
因为 A 是 S 的最远点，所以 dist(S,A) ≥ dist(S,V)。
那么 dist(U,A) = dist(U,S) + dist(S,A) ≥ dist(U,S) + dist(S,V) = dist(U,V)
所以 A 到 U 的距离 ≥ 直径，A 也是直径端点。矛盾！

情况2：S 不在直径 UV 上
\`\`\`
U-------V    （直径）
    |
    P--------S
    |
    A        （S的最远点）
\`\`\`
设 S 到直径的"接入点"为 P。
因为 A 是 S 的最远点：dist(S,A) ≥ dist(S,V)
所以 dist(U,A) = dist(U,P) + dist(P,S) + dist(S,A)
              ≥ dist(U,P) + dist(P,S) + dist(S,V)
              = dist(U,P) + dist(P,V) = dist(U,V)
矛盾！所以 A 一定是直径端点。✅

### 二、两次BFS的代码实现

\`\`\`
// 第一次BFS：从start出发，找到最远点
int bfs(int start, int &farthest, int n) {
    // dist[i] = 从start到i的距离
    fill(dist, dist + n + 1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int maxDist = 0;
    farthest = start;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {       // 遍历u的所有邻居
            if (dist[v] == -1) {      // 没访问过
                dist[v] = dist[u] + 1;
                if (dist[v] > maxDist) {
                    maxDist = dist[v];
                    farthest = v;      // 更新最远点
                }
                q.push(v);
            }
        }
    }
    return maxDist;
}

// 求树的直径
int diameter(int root, int n) {
    int A, B;
    bfs(root, A, n);       // 第一次BFS，找到端点A
    int diam = bfs(A, B, n); // 第二次BFS，A到B就是直径
    return diam;
}
\`\`\`

### 三、树形DP法

对于每个节点 u，维护 f[u] = 从 u 出发"向下"能走的最长路径。

当处理 u 的子节点 v 时：
- 经过 v 返回到 u，路径长度 = f[v] + w(u,v)
- 用这个值更新 f[u]
- 同时，经过 u 的最长路径 = u 的"最长向下路径" + "次长向下路径"

\`\`\`
int f[MAXN];   // f[u] = 从u向下的最长路径
int ans = 0;   // 直径

void dp(int u, int fa) {
    f[u] = 0;
    for (auto [v, w] : adj[u]) {  // v是u的子节点，w是边权
        if (v == fa) continue;     // 不走回头路
        dp(v, u);
        // 经过u的路径 = 已经记录的最长 + 从v过来的这条
        ans = max(ans, f[u] + f[v] + w);
        // 更新u的最长向下路径
        f[u] = max(f[u], f[v] + w);
    }
}
\`\`\`

**推导过程**：
\`\`\`
对于节点u，假设它有3个子节点v1, v2, v3：
从u经过v1向下的最长路径 = f[v1] + w(u,v1)
从u经过v2向下的最长路径 = f[v2] + w(u,v2)
从u经过v3向下的最长路径 = f[v3] + w(u,v3)

经过u的最长路径 = 最长的两条之和
直径 = max(所有节点的"经过u的最长路径")
\`\`\`

### 四、带权树的直径

如果边有权重（正权），两次BFS法只需要把"距离"从"边数"改成"权重之和"即可。

树形DP法天然支持带权（包括负权边）。

### 五、时间复杂度

| 方法 | 时间 | 空间 | 说明 |
|------|------|------|------|
| 两次BFS | O(n) | O(n) | 只适用于非负权 |
| 树形DP | O(n) | O(n) | 通用，支持负权 |

两种方法都只需要遍历树一次（树形DP）或两次（两次BFS），每个节点/边被访问常数次，所以都是 O(n)。`,

    code: `// ========== 树的直径完整代码 ==========
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAXN = 100005;

// ===== 邻接表存树 =====
struct Edge {
    int to, weight;    // 目标节点, 边权
};
vector<Edge> adj[MAXN];
int n;                  // 节点数

// ==========================================
// 方法一：两次BFS求直径（适用于非负权边）
// ==========================================
int dist[MAXN];

// BFS返回最远距离，farthest记录最远点
int bfs(int start, int &farthest) {
    memset(dist, -1, sizeof(dist));
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int maxDist = 0;
    farthest = start;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            int v = e.to, w = e.weight;
            if (dist[v] == -1) {          // 没访问过
                dist[v] = dist[u] + w;    // 累加距离
                if (dist[v] > maxDist) {
                    maxDist = dist[v];
                    farthest = v;          // 更新最远点
                }
                q.push(v);
            }
        }
    }
    return maxDist;
}

void solveTwoBFS() {
    int A, B;
    bfs(1, A);                // 第一次BFS：从任意点（如1号）找端点A
    int diameter = bfs(A, B); // 第二次BFS：从A找最远点B
    cout << "直径长度: " << diameter << endl;
    cout << "端点: " << A << " 和 " << B << endl;
}

// ==========================================
// 方法二：树形DP求直径（支持负权边）
// ==========================================
int f[MAXN];   // f[u] = 从u向下走的最长路径
int ans = 0;   // 直径

void dp(int u, int fa) {
    f[u] = 0;
    for (auto &e : adj[u]) {
        int v = e.to, w = e.weight;
        if (v == fa) continue;     // 不走回父节点
        dp(v, u);                  // 先递归处理子树
        // 经过u的最长路径 = 之前记录的最长向下路径 + 从v过来的路径
        ans = max(ans, f[u] + f[v] + w);
        // 更新u的最长向下路径
        f[u] = max(f[u], f[v] + w);
    }
}

void solveDP() {
    ans = 0;
    dp(1, 0);   // 从节点1开始DP，0表示没有父节点
    cout << "直径长度: " << ans << endl;
}

// ==========================================
// 方法三：两次BFS + 记录路径
// ==========================================
int parent[MAXN];  // 记录BFS树中的父节点

int bfsWithPath(int start, int &farthest) {
    memset(dist, -1, sizeof(dist));
    memset(parent, 0, sizeof(parent));
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int maxDist = 0;
    farthest = start;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            int v = e.to, w = e.weight;
            if (dist[v] == -1) {
                dist[v] = dist[u] + w;
                parent[v] = u;      // 记录是从哪个节点走过来的
                if (dist[v] > maxDist) {
                    maxDist = dist[v];
                    farthest = v;
                }
                q.push(v);
            }
        }
    }
    return maxDist;
}

void solveWithPath() {
    int A, B;
    bfsWithPath(1, A);
    int diameter = bfsWithPath(A, B);
    
    // 回溯路径
    vector<int> path;
    for (int u = B; u != 0; u = parent[u]) {
        path.push_back(u);
    }
    cout << "直径: " << diameter << endl;
    cout << "路径: ";
    for (int i = path.size() - 1; i >= 0; i--) {
        cout << path[i] << (i > 0 ? " -> " : "");
    }
    cout << endl;
}

int main() {
    // 建一棵树：
    //        1
    //       / \\
    //      2   3
    //     /|   |\\
    //    4 5   6 7
    //   /
    //  8
    cin >> n;
    // 输入格式：u v w（u和v之间有一条权值为w的边）
    for (int i = 1; i < n; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});  // 无向图，两边都加
    }
    
    cout << "=== 方法一：两次BFS ===" << endl;
    solveTwoBFS();
    
    cout << "=== 方法二：树形DP ===" << endl;
    solveDP();
    
    cout << "=== 方法三：两次BFS+路径 ===" << endl;
    solveWithPath();
    
    return 0;
}`
  },

  'ch8_3_3_intro': {
    problemDesc: `## 🔍 8.3.3 最近公共祖先（LCA）

### 这是什么问题？

想象你和一个同学都在查家族族谱。你往上找：爸爸→爷爷→曾祖父……你同学也往上找：爸爸→爷爷→曾祖父……你们想知道：**最早的共同祖先是谁？** 这就是**最近公共祖先（Lowest Common Ancestor, LCA）**问题！

🌳 **LCA 的定义**：在一棵树中，两个节点 u 和 v 的最近公共祖先，是同时是 u 和 v 的祖先中，深度最大的那个节点。

📌 **LCA 能解决什么问题？**
- 🛤️ 求树上两点之间的距离：dist(u,v) = depth[u] + depth[v] - 2×depth[LCA(u,v)]
- 🔄 路径查询：树上 u 到 v 的路径经过哪些节点？
- 🌐 网络路由：在树形网络中找两个节点的最短路径
- 📊 树上的各种查询问题

LCA 是树论中的"瑞士军刀"，几乎所有树上路径问题都要先求 LCA！洛谷 P3379【最近公共祖先】是必刷模板题。`,

    idea: `## 💡 算法思想

### 一、什么是祖先？

在一棵有根树中，节点 u 的"祖先"就是从 u 往上走到根的路径上的所有节点（包括 u 自己）。

\`\`\`
         1（根）
        / \\
       2   3
      / \\
     4   5
    / \\
   6   7

6的祖先：6 → 4 → 2 → 1
7的祖先：7 → 4 → 2 → 1
5的祖先：5 → 2 → 1
\`\`\`

> 🎯 比喻：祖先就像你的长辈——爸爸、爷爷、曾祖父……一直到最老的始祖。

### 二、LCA 的直觉

6 和 7 的 LCA 是 4（它们共同的最高辈分的祖先）
6 和 5 的 LCA 是 2
6 和 3 的 LCA 是 1

> 🧠 想象两个人同时从自己的位置往上爬，相遇的第一个节点就是 LCA！

### 三、三种求LCA的方法

| 方法 | 预处理 | 查询 | 特点 |
|------|--------|------|------|
| 暴力法 | 无 | O(n) | 每次爬上去找，太慢 |
| 倍增法 | O(n log n) | O(log n) | 竞赛最常用！ |
| Tarjan离线 | O(n) | O(1) | 需要离线处理 |
| 树链剖分 | O(n) | O(log n) | 还能做更多事 |

### 四、倍增法的核心思想

**倍增法**是竞赛中最常用的 LCA 求法。

核心思想：**预处理每个节点往上跳 2^0, 2^1, 2^2, ... 步到达的祖先**。

查询时，像"二进制拆分"一样跳：
1. 先让深的节点跳到和浅的同一深度
2. 然后两个节点一起往上跳，每次跳 2^k 步（从大到小尝试）
3. 跳到"刚好不相遇"的位置，再跳一步就是 LCA！

> 🎯 比喻：就像你在一栋100层的大楼里找某一层，你可以先跳50层，再跳25层，再跳12层……用"倍增"的方式快速逼近目标！

💡 **一句话记住LCA倍增法：** "先对齐深度，再一起跳，跳到刚好不相遇，再跳一步就是答案！"`,

    derivation: `## 📐 推导与实现

### 一、暴力法（理解概念用）

最朴素的做法：
1. 让 u 和 v 中较深的那个先往上爬，爬到同一深度
2. 然后两个一起往上爬，直到相遇

\`\`\`
int lca_naive(int u, int v) {
    // 让u是较深的
    if (depth[u] < depth[v]) swap(u, v);
    // u往上爬到和v同一深度
    while (depth[u] > depth[v]) u = parent[u];
    // 一起往上爬
    while (u != v) { u = parent[u]; v = parent[v]; }
    return u;
}
\`\`\`

时间复杂度：O(n)，太慢了！需要优化。

### 二、倍增法详解

**预处理**：设 fa[u][k] = 节点 u 往上跳 2^k 步到达的祖先。

递推关系：
\`\`\`
fa[u][0] = parent[u]                    // 跳1步 = 直接父亲
fa[u][k] = fa[fa[u][k-1]][k-1]          // 跳2^k步 = 先跳2^(k-1)步，再跳2^(k-1)步
\`\`\`

**推导**：
\`\`\`
fa[u][1] = fa[fa[u][0]][0] = parent[parent[u]]    // 跳2步
fa[u][2] = fa[fa[u][1]][1]                         // 跳4步
fa[u][3] = fa[fa[u][2]][2]                         // 跳8步
...
\`\`\`

**查询 LCA(u, v)**：

**步骤1**：让 u 和 v 对齐深度
\`\`\`
// 假设 depth[u] > depth[v]，需要让 u 往上跳 depth[u] - depth[v] 步
int diff = depth[u] - depth[v];
for (int k = LOG; k >= 0; k--) {
    if (diff & (1 << k)) {     // 如果diff的第k位是1
        u = fa[u][k];          // 就跳2^k步
    }
}
// 现在 depth[u] == depth[v]
\`\`\`

> 🧠 这就是"二进制拆分"！任何整数都能拆成2的幂次之和。比如 13 = 8 + 4 + 1，所以跳13步 = 跳8步 + 跳4步 + 跳1步。

**步骤2**：如果 u == v，说明 v 就是 u 的祖先，直接返回 v。

**步骤3**：两个一起跳
\`\`\`
for (int k = LOG; k >= 0; k--) {
    if (fa[u][k] != fa[v][k]) {   // 跳完还不相遇
        u = fa[u][k];              // 那就跳！
        v = fa[v][k];
    }
}
// 循环结束后，u和v的"下一个祖先"就是LCA
return fa[u][0];
\`\`\`

> 🎯 为什么从大到小尝试？和二进制拆分一样——先大步跳，再小步调，最终精确到达 LCA 的下一层。

### 三、预处理过程

\`\`\`
// BFS/DFS计算深度和直接父亲
void dfs(int u, int fa, int d) {
    depth[u] = d;
    parent[u] = fa;
    f[u][0] = fa;
    for (int k = 1; k <= LOG; k++) {
        f[u][k] = f[f[u][k-1]][k-1];  // 倍增递推
    }
    for (int v : adj[u]) {
        if (v != fa) dfs(v, u, d + 1);
    }
}
\`\`\`

### 四、用 LCA 求树上距离

\`\`\`
dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)]
\`\`\`

**推导**：
\`\`\`
       LCA
       / \\
      /   \\
     u     v
     
u到LCA的距离 = depth[u] - depth[LCA]
v到LCA的距离 = depth[v] - depth[LCA]
u到v的距离 = (depth[u] - depth[LCA]) + (depth[v] - depth[LCA])
           = depth[u] + depth[v] - 2*depth[LCA]
\`\`\`

### 五、时间复杂度分析

| 阶段 | 时间复杂度 | 说明 |
|------|------------|------|
| 预处理（DFS + 倍增表） | O(n log n) | 每个节点算 log n 个祖先 |
| 单次查询 | O(log n) | 最多跳 log n 步 |
| 空间 | O(n log n) | fa 数组 |

对于 n = 10^5, log n ≈ 17，预处理约 170 万次操作，每次查询约 17 步，非常快！`,

    code: `// ========== 最近公共祖先（LCA）倍增法完整代码 ==========
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

const int MAXN = 500005;
const int LOG = 20;   // 2^20 > 10^6，足够覆盖

vector<int> adj[MAXN];  // 邻接表
int depth[MAXN];         // 每个节点的深度
int fa[MAXN][LOG + 1];  // fa[u][k] = u往上跳2^k步的祖先
int n, q, root;         // 节点数, 查询数, 根节点

// ===== DFS预处理 =====
void dfs(int u, int f, int d) {
    depth[u] = d;        // 记录深度
    fa[u][0] = f;        // 直接父亲 = 跳1步的祖先
    
    // 倍增表：fa[u][k] = fa[fa[u][k-1]][k-1]
    for (int k = 1; k <= LOG; k++) {
        fa[u][k] = fa[fa[u][k - 1]][k - 1];
    }
    
    // 递归处理子节点
    for (int v : adj[u]) {
        if (v != f) {     // 不走回父亲
            dfs(v, u, d + 1);
        }
    }
}

// ===== 查询LCA =====
int lca(int u, int v) {
    // 步骤1：让u和v对齐深度（保证u更深）
    if (depth[u] < depth[v]) swap(u, v);
    
    // u往上跳，跳到和v同一深度
    int diff = depth[u] - depth[v];
    for (int k = LOG; k >= 0; k--) {
        if (diff & (1 << k)) {     // diff的第k位是1，说明需要跳2^k步
            u = fa[u][k];
        }
    }
    
    // 步骤2：如果已经相遇，直接返回
    if (u == v) return u;
    
    // 步骤3：一起往上跳
    for (int k = LOG; k >= 0; k--) {
        if (fa[u][k] != fa[v][k]) {  // 跳完还不相遇
            u = fa[u][k];             // 那就跳
            v = fa[v][k];
        }
    }
    
    // 此时u和v的"下一个"就是LCA
    return fa[u][0];
}

// ===== 求树上两点距离 =====
int dist(int u, int v) {
    return depth[u] + depth[v] - 2 * depth[lca(u, v)];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> q >> root;
    
    // 读入树的结构
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);   // 无向边
    }
    
    // 预处理
    dfs(root, 0, 1);   // 根节点的"父亲"设为0（虚拟节点）
    
    // 处理查询
    for (int i = 1; i <= q; i++) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << "\\n";
    }
    
    return 0;
}`
  },

  'ch8_9_1_intro': {
    problemDesc: `## 🌊 8.9.1 最大流（Dinic/ISAP）

### 这是什么问题？

想象你是一座城市的供水工程师。城市有若干水管连接各个节点，每根水管都有最大流量限制。现在水源在节点 S，用水点在节点 T，你想知道：**从 S 到 T 最多能输送多少水？** 这就是经典的**最大流问题**！

💧 **网络流的三要素**：
1. **源点 S**：水从哪里来
2. **汇点 T**：水到哪里去
3. **容量 c(u,v)**：每条管道最多能通过多少水

📌 **最大流能解决什么问题？**
- 🚰 管道网络的最大输送量
- 🚗 道路交通的最大通行量
- ⚡ 电网的最大输电能力
- 📦 物流网络的最大运输量
- 🎯 二分图最大匹配（特殊应用）

最大流是网络流的基石！掌握了最大流，最小割、费用流都是"换个皮肤"。洛谷 P3376【网络最大流】是经典模板题，Dinic 算法是竞赛中最常用的最大流算法。`,

    idea: `## 💡 算法思想

### 一、网络流的基本概念

想象一个水管网络：
\`\`\`
     3       2
S ----→ A ----→ T
|       ↑       ↑
|  2    | 1     | 3
↓       |       |
B ------+       
  (容量标注在边上)
\`\`\`

- **流量 f(u,v)**：管道 (u,v) 上实际流过的水量
- **容量 c(u,v)**：管道 (u,v) 最多能流多少
- **约束**：0 ≤ f(u,v) ≤ c(u,v)，且每个中间节点"流入 = 流出"

> 🎯 比喻：网络流就像水管系统——水从源头流到终点，每根管子有粗细限制，中间不能漏水也不能凭空产水。

### 二、增广路思想（Ford-Fulkerson）

**核心思想**：不断找一条从 S 到 T 的"还能流水的路"（增广路），沿着这条路多送一些水，直到找不到增广路为止。

\`\`\`
while (能找到从S到T的路径P) {
    找到P上容量最小的边（瓶颈）= f
    沿着P上的每条边：
        正向边流量 += f    （多流水）
        反向边流量 -= f    （"反悔"机制）
    答案 += f
}
\`\`\`

> 🧠 **反向边**是关键！它让我们能"反悔"——如果之前某条水送错了方向，反向边允许我们"退回去"。

### 三、Dinic 算法

Dinic 是 Ford-Fulkerson 的高效实现，加入两个优化：

**优化1：BFS 建分层图**
- 从 S 开始 BFS，给每个节点标上"层号"（到 S 的最短距离）
- 只在"从第 i 层到第 i+1 层"的边上找增广路

**优化2：DFS 多路增广**
- 一次 DFS 不只找一条增广路，而是把所有能增广的路都走一遍
- 加入"当前弧优化"：已经走完的边不再重复走

> 🎯 比喻：Dinic 就像先用望远镜看好几层地形（BFS分层），然后派出多个探险队同时探索（多路增广），走过的路不再重复（当前弧优化）。

### 四、时间复杂度

| 算法 | 时间复杂度 | 适用场景 |
|------|------------|----------|
| Ford-Fulkerson | O(mf)（f为最大流） | 流量小时 |
| Edmonds-Karp | O(nm²) | 理论保证 |
| Dinic | O(n²m) | 竞赛最常用 |
| ISAP | O(n²m) | 常数更优 |

对于二分图匹配，Dinic 只需 O(m√n)，非常快！`,

    derivation: `## 📐 推导与实现

### 一、残量网络与增广路

**残量网络**：在原图中，每条边的"剩余容量" = 容量 - 已用流量。

\`\`\`
原图：S --(容量10)--> A，已流6
残量网络：S --(剩余4)--> A，A --(剩余6)--> S（反向边！）
\`\`\`

**增广路**：在残量网络中，从 S 到 T 的一条路径。路径上的最小剩余容量就是能多流的量。

**最大流最小割定理**：最大流 = 最小割。当残量网络中不存在 S 到 T 的路径时，当前流就是最大流。

### 二、Dinic 算法详解

**Step 1：BFS 建层次图**
\`\`\`
bool bfs() {
    memset(level, -1, sizeof(level));
    level[S] = 0;
    queue<int> q;
    q.push(S);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            if (level[e.to] == -1 && e.cap > 0) {  // 没访问过且有剩余容量
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[T] != -1;  // 能到T就返回true
}
\`\`\`

**Step 2：DFS 多路增广（带当前弧优化）**
\`\`\`
int cur[MAXN];  // 当前弧：记录每个节点"下次该试哪条边"

int dfs(int u, int flow) {  // flow = 当前路径上能通过的最大流量
    if (u == T) return flow;  // 到达汇点！
    int pushed = 0;           // 已经推送了多少流量
    
    for (int &i = cur[u]; i < adj[u].size(); i++) {  // 当前弧优化！
        auto &e = adj[u][i];
        if (level[e.to] == level[u] + 1 && e.cap > 0) {  // 下一层且有容量
            int d = dfs(e.to, min(flow, e.cap));
            if (d > 0) {
                e.cap -= d;           // 正向边减容量
                adj[e.to][e.rev].cap += d;  // 反向边加容量
                pushed += d;
                flow -= d;
                if (flow == 0) break;  // 没有多余流量了
            }
        }
    }
    return pushed;
}
\`\`\`

> 🧠 **当前弧优化**的精髓：如果节点 u 的第 i 条边已经"走完了"（容量耗尽或子树无法增广），那下次再来到 u 时，直接从第 i+1 条边开始试，不用再试前面的了！

**Step 3：主循环**
\`\`\`
int dinic() {
    int maxFlow = 0;
    while (bfs()) {          // BFS建层次图
        memcpy(cur, 0, sizeof(cur));  // 重置当前弧
        maxFlow += dfs(S, INF);       // DFS多路增广
    }
    return maxFlow;
}
\`\`\`

### 三、反向边的作用

**为什么需要反向边？**

考虑这个图：
\`\`\`
S --10--> A --10--> T
S --10--> B --10--> T
A --10--> B
\`\`\`

如果第一次增广走了 S→A→B→T（流量10），那 A→B 的容量用完了。
但最优解应该是 S→A→T (10) + S→B→T (10) = 20。

反向边的作用：当走 S→A→B→T 后，B→A 的反向边容量变为10。
第二次增广走 S→B→A→T（利用反向边"退流"），等价于：
- 取消 A→B 的流量
- 改为 A→T 和 S→B 各流10

> 🎯 反向边 = "反悔机制"，让算法能纠正之前的错误选择！

### 四、复杂度分析

- BFS：O(m)，每个节点和边访问一次
- DFS：O(nm)，每个节点最多走 n 步，每步尝试 m 条边（当前弧优化后）
- 总轮数：最多 n 轮（每轮层次图至少增加一层）
- 总复杂度：O(n²m)`,

    code: `// ========== Dinic最大流完整代码 ==========
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAXN = 10005;
const int INF = 1e9;

// ===== 边的结构 =====
struct Edge {
    int to;      // 目标节点
    int cap;     // 剩余容量
    int rev;     // 反向边在邻接表中的下标
};

vector<Edge> adj[MAXN];  // 邻接表
int level[MAXN];          // 层次（BFS深度）
int cur[MAXN];            // 当前弧优化
int S, T;                 // 源点、汇点
int n, m;                 // 节点数、边数

// ===== 添加边 =====
void addEdge(int u, int v, int cap) {
    adj[u].push_back({v, cap, (int)adj[v].size()});      // 正向边
    adj[v].push_back({u, 0, (int)adj[u].size() - 1});    // 反向边（容量0）
}

// ===== BFS建层次图 =====
bool bfs() {
    memset(level, -1, sizeof(level));
    level[S] = 0;                    // 源点在第0层
    queue<int> q;
    q.push(S);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            // 没访问过 且 有剩余容量
            if (level[e.to] == -1 && e.cap > 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[T] != -1;   // 汇点可达就继续
}

// ===== DFS多路增广 =====
int dfs(int u, int flow) {
    if (u == T) return flow;   // 到达汇点！
    int pushed = 0;            // 已推送的流量
    
    // 当前弧优化：从cur[u]开始，不走回头路
    for (int &i = cur[u]; i < (int)adj[u].size(); i++) {
        Edge &e = adj[u][i];
        // 只能往下一层走，且要有剩余容量
        if (level[e.to] == level[u] + 1 && e.cap > 0) {
            int d = dfs(e.to, min(flow, e.cap));
            if (d > 0) {
                e.cap -= d;                        // 正向边减容量
                adj[e.to][e.rev].cap += d;         // 反向边加容量（反悔机制）
                pushed += d;
                flow -= d;
                if (flow == 0) break;   // 流量用完了，不用继续
            }
        }
    }
    return pushed;
}

// ===== Dinic主函数 =====
int dinic() {
    int maxFlow = 0;
    while (bfs()) {                    // 不断建层次图
        for (int i = 1; i <= n; i++)   // 重置当前弧
            cur[i] = 0;
        maxFlow += dfs(S, INF);        // 多路增广
    }
    return maxFlow;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> m >> S >> T;
    
    // 读入m条边
    for (int i = 1; i <= m; i++) {
        int u, v, cap;
        cin >> u >> v >> cap;
        addEdge(u, v, cap);   // 添加有向边
    }
    
    cout << dinic() << endl;   // 输出最大流
    return 0;
}`
  },

  'ch8_9_2_intro': {
    problemDesc: `## ✂️ 8.9.2 最小割

### 这是什么问题？

想象你是一座城堡的防御指挥官。城堡内部有若干房间，房间之间有通道连接。敌人的大本营在 S，你的指挥部在 T。你想**堵住最少的通道，使得敌人从 S 完全无法到达 T**。每条通道有不同的"封堵难度"（代价），你想知道：**最小的总封堵代价是多少？**

这就是**最小割问题**！

🔪 **割（Cut）的定义**：把图中的节点分成两个集合 A 和 B，S 在 A 中，T 在 B 中。所有从 A 到 B 的边构成一个"割"。

📌 **最小割能解决什么问题？**
- 🛡️ 网络防御：最小代价切断敌人的通路
- 🔌 电路切割：最小代价断开电路
- 📸 图像分割：把图片分成前景和背景
- 🤝 项目选择：最大化收益的项目选择方案
- 🏗️ 闭合子图：选择依赖关系下的最优子集

**最大流最小割定理**是图论中最优美的定理之一：最大流 = 最小割！这意味着求最小割只需要求最大流！洛谷 P1361【最小割】是经典题目。`,

    idea: `## 💡 算法思想

### 一、什么是割？

给定一个有向图，源点 S 和汇点 T。

**割**就是把所有节点分成两个集合 S集 和 T集（S在S集，T在T集），然后"割掉"所有从 S集 指向 T集 的边。

\`\`\`
    S集          T集
  ┌───────┐   ┌───────┐
  │  S    │   │       │
  │   \\   │   │   T   │
  │    \\──┼───┼──→    │
  │     \\ │   │  ↑    │
  │      \\┼───┼──→    │
  └───────┘   └───────┘
      割掉的边 ↑↑
\`\`\`

**割的容量** = 所有被割掉的边的容量之和。

> 🎯 比喻：割就像在地图上画一条线，把地图分成两半（S在一半，T在另一半），被线切到的道路就是"割"。

### 二、最大流最小割定理

**定理**：对于任意网络，最大流 = 最小割。

**直觉理解**：
- 最大流是"最多能送多少水"
- 最小割是"最少堵多少路能断水"
- 这两个值一定相等！

> 🧠 为什么？如果最大流 > 最小割，那割断最小割的边后还有流能过去，矛盾！如果最大流 < 最小割，那流还能继续增广，矛盾！

### 三、如何求最小割？

**Step 1**：用 Dinic 求最大流
**Step 2**：在残量网络中，从 S 出发能到达的所有节点构成 S集，其余构成 T集
**Step 3**：从 S集 到 T集 的边就是最小割的边

\`\`\`
最大流跑完后：
- 从S在残量网络中BFS/DFS，能到的节点 → S集
- 不能到的节点 → T集
- S集→T集 的满流边 → 最小割
\`\`\`

### 四、最小割的应用

**1. 最大权闭合子图**
- 每个项目有收益（正）或成本（负），项目之间有依赖关系
- 建图：源点连正收益项目（容量=收益），负收益项目连汇点（容量=成本）
- 答案 = 所有正收益之和 - 最小割

**2. 二分图最小点权覆盖**
- 最小割 = 最小点权覆盖 = 总权值 - 最大独立集

💡 **一句话记住最小割：** "最小割就是最大流的'对偶问题'——跑完最大流后，在残量网络中画一条线把S和T分开！"`,

    derivation: `## 📐 推导与实现

### 一、最大流最小割定理的证明

**定义**：
- 流 f 的流量 = |f|
- 割 (S,T) 的容量 = c(S,T) = Σ c(u,v)，其中 u∈S, v∈T

**引理**：对任意流 f 和任意割 (S,T)，|f| ≤ c(S,T)

**证明**：
\`\`\`
|f| = f(S,T) - f(T,S)     （净流量 = 正向流量 - 反向流量）
    ≤ f(S,T)               （因为 f(T,S) ≥ 0）
    ≤ c(S,T)               （流量不超过容量）
\`\`\`

所以：最大流 ≤ 最小割。

**定理**：当增广路不存在时（即达到最大流），存在一个割使得 c(S,T) = |f|。

**构造**：在残量网络中，令 S集 = 从S可达的所有节点，T集 = 其余节点。
- 对于 S集→T集 的边 (u,v)：残量 = 0（否则 v 也在 S集），即满流
- 对于 T集→S集 的边 (u,v)：流量 = 0（否则有反向残量，v 可达）

所以 |f| = f(S,T) - f(T,S) = c(S,T) - 0 = c(S,T)。✅

### 二、求最小割的具体方案

\`\`\`
// 跑完最大流后
bool vis[MAXN];

void mark(int u) {
    vis[u] = true;
    for (auto &e : adj[u]) {
        if (!vis[e.to] && e.cap > 0) {  // 残量网络中可达
            mark(e.to);
        }
    }
}

// 主程序
dinic();           // 先跑最大流
memset(vis, 0, sizeof(vis));
mark(S);           // 从S出发标记可达点

// 找最小割的边
int minCut = 0;
for (int u = 1; u <= n; u++) {
    if (!vis[u]) continue;   // u不在S集
    for (auto &e : adj[u]) {
        if (!vis[e.to]) {    // e.to在T集
            // (u, e.to) 是割边
            minCut += original_cap(u, e.to);
        }
    }
}
\`\`\`

### 三、最小割的唯一性

最小割的**值**是唯一的，但最小割的**方案**不一定唯一。

判断一条边 (u,v) 是否在所有最小割中：
- (u,v) 是满流边
- 在残量网络中，S 能到 u 且 v 能到 T

判断一条边 (u,v) 是否在某个最小割中：
- (u,v) 是满流边
- 在残量网络中，S 能到 u 或 v 能到 T

### 四、最小割的应用——最大权闭合子图

**问题**：有 n 个项目，每个项目有权值 w_i（正=收益，负=成本）。某些项目需要先完成其他项目。求最大总权值。

**建图**：
1. 源点 S 向所有 w_i > 0 的项目连边，容量 = w_i
2. 所有 w_i < 0 的项目向汇点 T 连边，容量 = |w_i|
3. 依赖关系 (u 依赖 v)：u 向 v 连边，容量 = ∞

**答案** = 所有正权值之和 - 最小割

> 🧠 直觉：最小割把项目分成"选"和"不选"两组。割掉 S→u 表示不选正权项目 u（损失 w_i），割掉 v→T 表示选了负权项目 v（花费 |w_i|）。

### 五、复杂度

最小割的复杂度 = 最大流的复杂度 = O(n²m)（Dinic）。求方案只需要额外一次 BFS/DFS，O(n+m)。`,

    code: `// ========== 最小割完整代码 ==========
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAXN = 10005;
const int INF = 1e9;

struct Edge {
    int to, cap, rev;
};

vector<Edge> adj[MAXN];
int level[MAXN], cur[MAXN];
int S, T, n, m;

// 添加边
void addEdge(int u, int v, int cap) {
    adj[u].push_back({v, cap, (int)adj[v].size()});
    adj[v].push_back({u, 0, (int)adj[u].size() - 1});
}

// BFS建层次图
bool bfs() {
    memset(level, -1, sizeof(level));
    level[S] = 0;
    queue<int> q;
    q.push(S);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            if (level[e.to] == -1 && e.cap > 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[T] != -1;
}

// DFS多路增广
int dfs(int u, int flow) {
    if (u == T) return flow;
    int pushed = 0;
    for (int &i = cur[u]; i < (int)adj[u].size(); i++) {
        Edge &e = adj[u][i];
        if (level[e.to] == level[u] + 1 && e.cap > 0) {
            int d = dfs(e.to, min(flow, e.cap));
            if (d > 0) {
                e.cap -= d;
                adj[e.to][e.rev].cap += d;
                pushed += d;
                flow -= d;
                if (flow == 0) break;
            }
        }
    }
    return pushed;
}

// Dinic求最大流
int dinic() {
    int maxFlow = 0;
    while (bfs()) {
        for (int i = 1; i <= n; i++) cur[i] = 0;
        maxFlow += dfs(S, INF);
    }
    return maxFlow;
}

// ===== 求最小割方案 =====
bool vis[MAXN];

void markReachable(int u) {
    vis[u] = true;
    for (auto &e : adj[u]) {
        if (!vis[e.to] && e.cap > 0) {  // 残量网络中可达
            markReachable(e.to);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> m >> S >> T;
    for (int i = 1; i <= m; i++) {
        int u, v, cap;
        cin >> u >> v >> cap;
        addEdge(u, v, cap);
    }
    
    // 第一步：求最大流（= 最小割的值）
    int maxFlow = dinic();
    cout << "最小割的值（= 最大流）: " << maxFlow << endl;
    
    // 第二步：在残量网络中找S集
    memset(vis, 0, sizeof(vis));
    markReachable(S);
    
    // 第三步：输出最小割的边
    cout << "最小割的边:" << endl;
    for (int u = 1; u <= n; u++) {
        if (!vis[u]) continue;   // u必须在S集
        for (auto &e : adj[u]) {
            if (!vis[e.to] && e.rev < (int)adj[e.to].size()) {
                // e.to在T集，且这是一条正向边
                int originalCap = e.cap + adj[e.to][e.rev].cap;
                // 简化：直接检查是否满流
                if (e.cap == 0) {   // 满流 = 被割掉
                    cout << u << " -> " << e.to << endl;
                }
            }
        }
    }
    
    return 0;
}`
  },

  'ch8_9_3_intro': {
    problemDesc: `## 💰 8.9.3 费用流

### 这是什么问题？

还是那个水管网络，但现在每根水管除了"容量限制"，还有"每单位水的费用"。你不仅要从 S 输送水到 T，还要**在满足流量要求的前提下，使总费用最小**。或者反过来：**在总费用不超过某个限制的情况下，最多能送多少水？**

💧 **费用流 = 最大流 + 费用**
- 每条边有两个属性：**容量** c(u,v) 和 **单位费用** w(u,v)
- 流 f(u,v) 的费用 = f(u,v) × w(u,v)
- 目标：在满足流量最大的前提下，总费用最小

📌 **费用流能解决什么问题？**
- 🚚 最小费用运输：在物流网络中找最便宜的运输方案
- 📋 任务分配：把 n 个任务分配给 n 个人，每人做不同任务，费用最小
- 🎯 二分图最小权匹配：带权重的最优匹配
- 💸 经济模型：在供需平衡下找最优交易方案

洛谷 P3381【最小费用最大流】是经典模板题。费用流的核心是在最大流的基础上，每次找"最便宜的增广路"！`,

    idea: `## 💡 算法思想

### 一、费用流的直觉

想象你是一个快递公司的调度员。你有多个仓库和配送站，不同路线的运费不同。你要把所有货物从总仓库送到各个站点，**怎么送最省钱？**

> 🎯 比喻：费用流就是"精打细算版的最大流"——不光要送得多，还要花得少！

### 二、核心思想：最短路增广

最大流用 BFS 找增广路（不管费用），费用流用 **SPFA（最短路算法）** 找"费用最小的增广路"！

\`\`\`
while (能找到从S到T的路径P，且P是费用最小的) {
    找到P上的最小剩余容量 f
    沿P增广 f 的流量
    总费用 += f × P的单位费用之和
}
\`\`\`

### 三、SPFA 求最短路增广

为什么用 SPFA 而不是 Dijkstra？因为**反向边的费用是负的**！

当正向边 (u,v) 费用为 w 时，反向边 (v,u) 费用为 -w（"退流"等于"退钱"）。

有负权边就不能用 Dijkstra，要用能处理负权的 SPFA！

> 🧠 SPFA 就是 BFS 的"升级版"——用队列 + 松弛操作，能处理负权边的最短路。

### 四、算法流程

1. 用 SPFA 从 S 到 T 找一条费用最小的路径
2. 沿这条路径增广（和最大流一样，更新正向/反向边的容量）
3. 重复直到 SPFA 找不到 S 到 T 的路

### 五、时间复杂度

| 方法 | 复杂度 | 说明 |
|------|--------|------|
| SPFA增广 | O(nmf) | f为最大流量 |
| Primal-Dual | O(nm log n) | 用Dijkstra+势函数 |

竞赛中 SPFA 增广法最常用，虽然理论复杂度较高，但实际跑得很快。

💡 **一句话记住费用流：** "每次找最便宜的增广路，用最短路算法（SPFA）代替BFS！"`,

    derivation: `## 📐 推导与实现

### 一、费用流的数学模型

给定网络 G = (V, E)，每条边有容量 c(e) 和费用 w(e)。

**目标**：求一个最大流 f，使得总费用 Σ f(e) × w(e) 最小。

**约束**：
- 容量约束：0 ≤ f(e) ≤ c(e)
- 流量守恒：对每个中间节点 v，流入 = 流出

### 二、SPFA 增广法详解

**Step 1：SPFA 找最短路**
\`\`\`
bool spfa() {
    memset(dist, INF, sizeof(dist));
    memset(inq, 0, sizeof(inq));
    dist[S] = 0;
    queue<int> q;
    q.push(S);
    inq[S] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        inq[u] = false;
        for (auto &e : adj[u]) {
            if (e.cap > 0 && dist[e.to] > dist[u] + e.cost) {
                dist[e.to] = dist[u] + e.cost;
                pre[e.to] = u;        // 记录前驱（用于回溯路径）
                preEdge[e.to] = &e;   // 记录走的哪条边
                if (!inq[e.to]) {
                    q.push(e.to);
                    inq[e.to] = true;
                }
            }
        }
    }
    return dist[T] != INF;  // 能到T就继续
}
\`\`\`

**Step 2：沿最短路增广**
\`\`\`
// 找路径上的最小容量
int flow = INF;
for (int u = T; u != S; u = pre[u]) {
    flow = min(flow, preEdge[u]->cap);
}

// 增广
for (int u = T; u != S; u = pre[u]) {
    preEdge[u]->cap -= flow;                    // 正向减
    adj[u][preEdge[u]->rev].cap += flow;        // 反向加
}

maxFlow += flow;
minCost += flow * dist[T];   // 费用 = 流量 × 单位费用
\`\`\`

### 三、反向边的费用

**关键**：如果正向边 (u,v) 的费用为 w，反向边 (v,u) 的费用为 -w。

**为什么？** 考虑"退流"的场景：
- 之前从 u 流到 v，花了 w 元/单位
- 现在"退流"，从 v 退到 u，相当于"退钱"，每单位省 w 元
- 所以反向边费用 = -w

### 四、正确性证明

**贪心策略的正确性**：每次选费用最小的增广路，最终一定是最小费用最大流。

**证明思路**（反证法）：
假设存在更优的方案，那一定有一对增广路可以"交换"使得费用更小。但每次我们都选了最短路，交换只会让费用更大或相等。矛盾！

### 五、Primal-Dual 算法（优化版）

**问题**：SPFA 最坏 O(nm)，太慢。
**优化**：用 Dijkstra 代替 SPFA，但需要处理负权。

**势函数 h[v]**：用上一轮的最短路距离作为"势"，把边权变成非负：
\`\`\`
新边权 w'(u,v) = w(u,v) + h[u] - h[v] ≥ 0
\`\`\`

这样就能用 Dijkstra 了！每轮更新势函数 h[v] += dist[v]。

### 六、费用流的应用——二分图最优匹配

**问题**：n 个工人和 n 个任务，工人 i 做任务 j 的费用为 c[i][j]，求最小费用完美匹配。

**建图**：
- 源点 S → 每个工人，容量 1，费用 0
- 每个工人 → 每个任务，容量 1，费用 c[i][j]
- 每个任务 → 汇点 T，容量 1，费用 0

跑最小费用最大流即可！

### 七、复杂度

| 方法 | 时间 | 说明 |
|------|------|------|
| SPFA增广 | O(nmf) | 竞赛常用，实际很快 |
| Primal-Dual | O(f · m log n) | 理论更优 |`,

    code: `// ========== 最小费用最大流（SPFA增广法）完整代码 ==========
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAXN = 5005;
const int INF = 1e9;

// ===== 边的结构 =====
struct Edge {
    int to;      // 目标节点
    int cap;     // 剩余容量
    int cost;    // 单位费用
    int rev;     // 反向边的下标
};

vector<Edge> adj[MAXN];
int dist[MAXN];      // 最短路距离（最小费用）
bool inq[MAXN];      // 是否在队列中
int pre[MAXN];       // 前驱节点（回溯路径用）
int preEdge[MAXN];   // 前驱边的下标
int S, T, n, m;
int maxFlow, minCost;

// ===== 添加边 =====
void addEdge(int u, int v, int cap, int cost) {
    adj[u].push_back({v, cap, cost, (int)adj[v].size()});
    adj[v].push_back({u, 0, -cost, (int)adj[u].size() - 1});  // 反向边费用为-cost
}

// ===== SPFA找最短路（最小费用增广路） =====
bool spfa() {
    fill(dist, dist + n + 1, INF);
    memset(inq, 0, sizeof(inq));
    dist[S] = 0;           // 源点费用为0
    queue<int> q;
    q.push(S);
    inq[S] = true;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        inq[u] = false;
        
        for (int i = 0; i < (int)adj[u].size(); i++) {
            Edge &e = adj[u][i];
            // 有剩余容量 且 能松弛
            if (e.cap > 0 && dist[e.to] > dist[u] + e.cost) {
                dist[e.to] = dist[u] + e.cost;
                pre[e.to] = u;           // 记录从哪个节点来的
                preEdge[e.to] = i;       // 记录走的是第几条边
                if (!inq[e.to]) {
                    q.push(e.to);
                    inq[e.to] = true;
                }
            }
        }
    }
    return dist[T] != INF;   // 能找到增广路就返回true
}

// ===== 最小费用最大流主函数 =====
void mcmf() {
    maxFlow = 0;
    minCost = 0;
    
    while (spfa()) {   // 不断找最小费用增广路
        // 找路径上的最小容量（瓶颈）
        int flow = INF;
        for (int u = T; u != S; u = pre[u]) {
            flow = min(flow, adj[pre[u]][preEdge[u]].cap);
        }
        
        // 沿路径增广
        for (int u = T; u != S; u = pre[u]) {
            Edge &e = adj[pre[u]][preEdge[u]];
            e.cap -= flow;                          // 正向边减容量
            adj[u][e.rev].cap += flow;              // 反向边加容量
        }
        
        maxFlow += flow;
        minCost += flow * dist[T];   // 费用 = 流量 × 路径单位费用
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> m >> S >> T;
    
    for (int i = 1; i <= m; i++) {
        int u, v, cap, cost;
        cin >> u >> v >> cap >> cost;
        addEdge(u, v, cap, cost);
    }
    
    mcmf();
    
    cout << "最大流: " << maxFlow << endl;
    cout << "最小费用: " << minCost << endl;
    
    return 0;
}`
  },

  'ch8_9_4_intro': {
    problemDesc: `## 🔗 8.9.4 上下界网络流

### 这是什么问题？

之前的网络流问题中，每条边的流量范围是 [0, 容量]。但在现实中，有些管道有**最低流量要求**——比如消防水管至少要保持一定的水流量，不然会出问题！

📐 **有上下界的网络流**：每条边 (u,v) 有一个流量下界 l(u,v) 和上界 c(u,v)，要求：
\`\`\`
l(u,v) ≤ f(u,v) ≤ c(u,v)
\`\`\`

📌 **上下界网络流的三种问题**：
1. **可行流**：是否存在满足所有上下界约束的流？（不要求最大）
2. **最小流**：满足上下界的最小流是多少？
3. **最大流**：满足上下界的最大流是多少？

🌟 **应用场景**：
- 🔥 最低保障供应：某些管道必须保证最小流量
- ⚡ 电力调度：输电线路有最小负荷要求
- 💧 生态用水：河流必须保证最小生态流量
- 📊 有约束的匹配问题

上下界网络流的核心技巧是**转化为普通网络流**——通过巧妙的建图，把"必须流这么多"的约束变成普通的容量约束！`,

    idea: `## 💡 算法思想

### 一、从"自由"到"约束"

普通网络流：流量 ∈ [0, c]，很自由
上下界网络流：流量 ∈ [l, c]，有下限约束

> 🎯 比喻：普通网络流像自由市场——你想买多少买多少。上下界网络流像计划经济——每种商品有最低采购量！

### 二、核心思想：转化为普通网络流

**关键转换**：把每条边的流量拆成两部分：
\`\`\`
f(u,v) = l(u,v) + f'(u,v)
其中 0 ≤ f'(u,v) ≤ c(u,v) - l(u,v)
\`\`\`

也就是说，先把"必须流"的 l(u,v) 强制流掉，剩下的 f'(u,v) 就变成普通的 [0, c-l] 的网络流了！

### 三、可行流的构造

**问题**：强制流了下界之后，每个节点的"流入"和"流出"可能不平衡了！

**解决**：引入"超级源点 SS"和"超级汇点 TT"来"补平"差额。

对于每个节点 u：
- 计算 d[u] = Σ(进入u的边的下界) - Σ(离开u的边的下界)
- 如果 d[u] > 0：说明 u "多进来"了，连边 SS → u，容量 d[u]
- 如果 d[u] < 0：说明 u "多出去"了，连边 u → TT，容量 -d[u]

然后从 SS 到 TT 跑最大流。如果 SS 的所有出边都满流了，说明可行流存在！

> 🧠 直觉：SS 负责"补"那些多出来的流入，TT 负责"收"那些多出来的流出。如果 SS 和 TT 之间的流能"完美匹配"，说明所有下界约束都能满足。

### 四、建图总结

**可行流建图**：
1. 原图中每条边 (u,v,l,c) → 新图中 (u,v,c-l)（容量变为 c-l）
2. 对每个节点 u，算 d[u]
3. d[u]>0：连 SS→u，容量 d[u]
4. d[u]<0：连 u→TT，容量 -d[u]
5. 连 T→S，容量 ∞（把原图的汇和源连起来，变成"循环流"）
6. 跑 SS→TT 的最大流，检查是否满流

💡 **一句话记住上下界网络流：** "先把下界强制流掉，再用超级源汇补平差额，最后跑普通最大流验证！"`,

    derivation: `## 📐 推导与实现

### 一、下界处理的数学推导

原问题：对每条边 e，l(e) ≤ f(e) ≤ c(e)

令 f'(e) = f(e) - l(e)，则 0 ≤ f'(e) ≤ c(e) - l(e)

流量守恒约束（对节点 v）：
\`\`\`
Σ f(e_in) = Σ f(e_out)
Σ (f'(e_in) + l(e_in)) = Σ (f'(e_out) + l(e_out))
Σ f'(e_in) - Σ f'(e_out) = Σ l(e_out) - Σ l(e_in)
\`\`\`

令 d(v) = Σ l(e_in) - Σ l(e_out)（进入v的下界之和 - 离开v的下界之和）

则：Σ f'(e_in) - Σ f'(e_out) = -d(v)

- 如果 d(v) > 0：v 在"新网络"中需要额外流出 d(v)，从 SS 补 d(v) 给 v
- 如果 d(v) < 0：v 在"新网络"中需要额外流入 -d(v)，从 v 送 -d(v) 给 TT

### 二、可行流算法

\`\`\`
// 步骤1：建图
for (每条边 (u, v, l, c)) {
    addEdge(u, v, c - l);   // 新容量 = 上界 - 下界
    d[v] += l;              // v 多进了 l
    d[u] -= l;              // u 多出了 l
}

// 步骤2：连超级源汇
for (每个节点 v) {
    if (d[v] > 0) addEdge(SS, v, d[v]);    // 补入
    if (d[v] < 0) addEdge(v, TT, -d[v]);   // 补出
}
addEdge(T, S, INF);   // 循环流

// 步骤3：跑最大流
dinic(SS, TT);

// 步骤4：检查
bool feasible = true;
for (SS的每条出边e) {
    if (e.cap > 0) feasible = false;   // 没满流 = 不可行
}
\`\`\`

### 三、从可行流到最大流

在找到可行流后，要求最大流：
1. 删掉 T→S 的 ∞ 边（以及 SS、TT 相关的边）
2. 在**原图**的 S→T 上继续跑最大流（在可行流的基础上增广）
3. 最终流量 = 可行流中 T→S 边的流量 + 新增广的流量

### 四、从可行流到最小流

1. 先跑 SS→TT 的最大流（找可行流）
2. **不连** T→S 的 ∞ 边
3. 最小流 = T→S 边的流量 - (SS→TT 最大流中"退回"的部分)

实际上：先不连 T→S 跑一次，再连上跑一次，两次之差就是最小流。

### 五、复杂度

转化后的图最多多了 n+2 个节点和 m+n+1 条边，所以复杂度仍然是 O(n²m)（Dinic）。`,

    code: `// ========== 上下界可行流完整代码 ==========
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
#include <algorithm>
using namespace std;

const int MAXN = 10005;
const int INF = 1e9;

struct Edge {
    int to, cap, rev;
};

vector<Edge> adj[MAXN];
int level[MAXN], cur[MAXN];
int d[MAXN];    // d[v] = 进入v的下界之和 - 离开v的下界之和
int n, m, S, T;
int SS, TT;     // 超级源点和超级汇点

void addEdge(int u, int v, int cap) {
    adj[u].push_back({v, cap, (int)adj[v].size()});
    adj[v].push_back({u, 0, (int)adj[u].size() - 1});
}

// BFS
bool bfs(int s, int t) {
    memset(level, -1, sizeof(level));
    level[s] = 0;
    queue<int> q;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto &e : adj[u]) {
            if (level[e.to] == -1 && e.cap > 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    return level[t] != -1;
}

// DFS
int dfs(int u, int flow, int t) {
    if (u == t) return flow;
    int pushed = 0;
    for (int &i = cur[u]; i < (int)adj[u].size(); i++) {
        Edge &e = adj[u][i];
        if (level[e.to] == level[u] + 1 && e.cap > 0) {
            int d = dfs(e.to, min(flow, e.cap), t);
            if (d > 0) {
                e.cap -= d;
                adj[e.to][e.rev].cap += d;
                pushed += d;
                flow -= d;
                if (flow == 0) break;
            }
        }
    }
    return pushed;
}

// Dinic
int dinic(int s, int t) {
    int maxFlow = 0;
    while (bfs(s, t)) {
        for (int i = 0; i <= TT; i++) cur[i] = 0;
        maxFlow += dfs(s, INF, t);
    }
    return maxFlow;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> m >> S >> T;
    SS = n + 1;   // 超级源点
    TT = n + 2;   // 超级汇点
    
    memset(d, 0, sizeof(d));
    
    // 读入带上下界的边
    for (int i = 1; i <= m; i++) {
        int u, v, low, up;
        cin >> u >> v >> low >> up;
        addEdge(u, v, up - low);   // 新容量 = 上界 - 下界
        d[v] += low;               // v多进了low
        d[u] -= low;               // u多出了low
    }
    
    // 连超级源汇
    int sumD = 0;
    for (int i = 1; i <= n; i++) {
        if (d[i] > 0) {
            addEdge(SS, i, d[i]);   // 补入
            sumD += d[i];
        } else if (d[i] < 0) {
            addEdge(i, TT, -d[i]);  // 补出
        }
    }
    
    // 连T→S的∞边（循环流）
    int tsEdgeIdx = adj[T].size();
    addEdge(T, S, INF);
    
    // 跑SS→TT的最大流
    int flow = dinic(SS, TT);
    
    // 检查是否可行
    if (flow == sumD) {
        cout << "存在可行流！" << endl;
        // T→S边的流量就是可行流的大小
        int feasibleFlow = adj[S][adj[S].size() - 1].cap;
        // 实际上应该是INF减去T→S边的剩余容量
        cout << "可行流流量: " << INF - adj[S][tsEdgeIdx].cap << endl;
    } else {
        cout << "不存在可行流！" << endl;
    }
    
    return 0;
}`
  },

  'ch10_3_1_intro': {
    problemDesc: `## 🌀 10.3.1 CDQ分治

### 这是什么问题？

想象你是一个指挥官，有一大堆任务要处理。每个任务有"时间"和"价值"两个属性。你想知道：**对于每个任务 i，在它之前（时间更早）且价值比它低的任务有多少个？** 这就是一个经典的"二维偏序"问题！

📐 **CDQ 分治能解决什么问题？**
- 📊 多维偏序问题（三维偏序、四维偏序……）
- 🔄 动态逆序对（带修改的逆序对）
- 📈 斜率优化DP的优化
- 🎯 把"在线问题"变成"离线分治"

🌟 **CDQ 分治 vs 普通分治**：
- 普通分治：把问题分成两个**独立**的子问题
- CDQ 分治：把问题分成两半，但**左半部分会对右半部分产生贡献**！

> 🎯 名字来源：CDQ 是发明者陈丹琦的名字缩写，她在高中时提出了这个算法！

洛谷 P3810【三维偏序】是 CDQ 分治的经典模板题。CDQ 分治是"分治思想的高级应用"，掌握它能让你解决一大类棘手问题！`,

    idea: `## 💡 算法思想

### 一、从"二维偏序"说起

**二维偏序**：有 n 个元素 (a_i, b_i)，对每对 (i, j)，问满足 a_i < a_j 且 b_i < b_j 的 (i, j) 对数。

**朴素做法**：O(n²) 枚举所有对。太慢！

**优化**：先按 a 排序，问题变成"在 b 序列中求顺序对数"——用树状数组 O(n log n) 搞定！

### 二、三维偏序——CDQ 登场！

**三维偏序**：有 n 个元素 (a_i, b_i, c_i)，问满足 a_i < a_j 且 b_i < b_j 且 c_i < c_j 的 (i, j) 对数。

先按 a 排序——a 维搞定了。现在问题是：对于每个 j，在 a_j 之前的元素中，有多少个 b_i < b_j 且 c_i < c_j？

这就变成了一个"二维问题"，但是带有"前缀"的限制！

> 🎯 CDQ 分治的核心思想：**分治 + 处理"左边对右边的贡献"**

### 三、CDQ 分治的流程

\`\`\`
cdq(L, R):
    if L == R: return
    mid = (L + R) / 2
    
    ① cdq(L, mid)        // 递归处理左半
    ② cdq(mid+1, R)      // 递归处理右半
    ③ 计算左半对右半的贡献  // 关键步骤！
    ④ 合并（按b排序，为上层做准备）
\`\`\`

**步骤③怎么做？**
- 左半和右半分别按 b 排序
- 用双指针：左半的 b 从小到大扫，右半的 b 从小到大扫
- 左半 b < 右半 b 时，把左半的 c 插入树状数组
- 右半查询：在树状数组中查 c 的前缀和

> 🧠 比喻：CDQ 分治就像"分班考试"——先分两半各自考（递归），然后算"左班对右班的影响"（跨半贡献），最后合并成绩。

### 四、时间复杂度

T(n) = 2T(n/2) + O(n log n) = O(n log² n)

每层分治 O(n log n)（排序 + 树状数组），共 log n 层。

💡 **一句话记住CDQ分治：** "分两半，算左边对右边的贡献，合并！把高维偏序降维打击！"`,

    derivation: `## 📐 推导与实现

### 一、三维偏序问题

给定 n 个三元组 (a_i, b_i, c_i)，对每个 i 求：
\`\`\`
ans[i] = |{j : a_j < a_i, b_j < b_i, c_j < c_i}|
\`\`\`

### 二、CDQ 分治详解

**Step 1**：按 a 排序（去重后 a 互不相同）

**Step 2**：CDQ 分治
\`\`\`
void cdq(int L, int R) {
    if (L >= R) return;
    int mid = (L + R) / 2;
    
    cdq(L, mid);          // 左半内部
    cdq(mid + 1, R);      // 右半内部
    
    // 计算左半对右半的贡献
    // 此时左半和右半各自按b排好序了
    
    int i = L, j = mid + 1;
    while (j <= R) {
        // 左半中 b < 右半当前元素的b
        while (i <= mid && elem[i].b < elem[j].b) {
            add(elem[i].c, 1);   // 把c插入树状数组
            i++;
        }
        ans[elem[j].id] += query(elem[j].c);  // 查询c的前缀和
        j++;
    }
    
    // 清空树状数组（重要！）
    for (int k = L; k < i; k++) {
        add(elem[k].c, -1);
    }
    
    // 合并：按b归并排序
    merge(L, mid, mid + 1, R);
}
\`\`\`

### 三、为什么这样是对的？

考虑任意一对 (i, j)，满足 a_i < a_j, b_i < b_j, c_i < c_j。

在 CDQ 分治的某一层，i 和 j 一定会被分到"左半"和"右半"（因为 a_i < a_j，排序后 i 在前）。此时步骤③会计算这个贡献。

之后 i 和 j 不会再被同时考虑（它们在不同的递归分支中），所以每对恰好被计算一次。✅

### 四、树状数组的作用

在步骤③中，我们需要处理"b 和 c 的二维偏序"：
- 双指针按 b 排序，保证 b 的条件
- 树状数组维护 c 的前缀和，处理 c 的条件

> 🎯 树状数组把"二维偏序"降到了"一维"！

### 五、去重处理

如果有完全相同的三元组，需要特殊处理：
1. 排序时，a 相同按 b 排，b 相同按 c 排
2. 完全相同的元素，只有最后一个能"看到"前面所有相同的
3. 可以先去重，记录每个三元组的出现次数

### 六、复杂度分析

| 部分 | 复杂度 | 说明 |
|------|--------|------|
| 排序 | O(n log n) | 初始排序 |
| 每层CDQ | O(n log n) | 双指针 + 树状数组 |
| 层数 | O(log n) | 分治深度 |
| 总复杂度 | O(n log² n) | |

### 七、CDQ 分治的其他应用

**动态逆序对**：
- 把"时间"作为第一维，"位置"作为第二维，"值"作为第三维
- 删除操作 = 第三维的"时间戳"
- 用 CDQ 分治处理三维偏序

**斜率优化DP**：
- 把 DP 的转移看成"前面的点对当前点的贡献"
- 用 CDQ 分治代替单调队列`,

    code: `// ========== CDQ分治解决三维偏序完整代码 ==========
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

const int MAXN = 100005;

// ===== 三元组结构 =====
struct Element {
    int a, b, c;    // 三个维度
    int id;          // 原始编号
    int cnt;         // 重复次数（去重用）
    int ans;         // 答案
} elem[MAXN], tmp[MAXN];

int n;
int tree[MAXN];     // 树状数组

// ===== 树状数组 =====
void add(int pos, int val) {
    for (; pos <= 200000; pos += pos & (-pos))
        tree[pos] += val;
}

int query(int pos) {
    int sum = 0;
    for (; pos > 0; pos -= pos & (-pos))
        sum += tree[pos];
    return sum;
}

// ===== 排序规则 =====
// 先按a排，a相同按b，b相同按c
bool cmpABC(const Element &x, const Element &y) {
    if (x.a != y.a) return x.a < y.a;
    if (x.b != y.b) return x.b < y.b;
    return x.c < y.c;
}

// 按b排序（CDQ合并时用）
bool cmpB(const Element &x, const Element &y) {
    if (x.b != y.b) return x.b < y.b;
    return x.c < y.c;
}

// ===== CDQ分治 =====
void cdq(int L, int R) {
    if (L >= R) return;
    int mid = (L + R) / 2;
    
    cdq(L, mid);           // ① 递归左半
    cdq(mid + 1, R);       // ② 递归右半
    
    // ③ 计算左半对右半的贡献
    // 左半和右半各自按b排好序了
    int i = L;
    for (int j = mid + 1; j <= R; j++) {
        // 左半中b < elem[j].b的元素
        while (i <= mid && elem[i].b < elem[j].b) {
            add(elem[i].c, elem[i].cnt);  // 把c插入树状数组
            i++;
        }
        // 查询：c < elem[j].c的有多少
        elem[j].ans += query(elem[j].c - 1);
    }
    
    // 清空树状数组（重要！只清用过的部分）
    for (int k = L; k < i; k++) {
        add(elem[k].c, -elem[k].cnt);
    }
    
    // ④ 归并排序（按b合并，为上层准备）
    int p = L, q = mid + 1, idx = L;
    while (p <= mid && q <= R) {
        if (elem[p].b <= elem[q].b) tmp[idx++] = elem[p++];
        else tmp[idx++] = elem[q++];
    }
    while (p <= mid) tmp[idx++] = elem[p++];
    while (q <= R) tmp[idx++] = elem[q++];
    for (int k = L; k <= R; k++) elem[k] = tmp[k];
}

int ans[MAXN];  // 最终答案

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    int K;  // c的范围
    cin >> n >> K;
    
    for (int i = 1; i <= n; i++) {
        cin >> elem[i].a >> elem[i].b >> elem[i].c;
        elem[i].id = i;
        elem[i].cnt = 1;
    }
    
    // 第一步：按a,b,c排序
    sort(elem + 1, elem + n + 1, cmpABC);
    
    // 第二步：去重（完全相同的合并）
    int m = 0;
    for (int i = 1; i <= n; i++) {
        if (i > 1 && elem[i].a == elem[i-1].a 
            && elem[i].b == elem[i-1].b 
            && elem[i].c == elem[i-1].c) {
            elem[m].cnt++;   // 重复，计数+1
        } else {
            elem[++m] = elem[i];
            elem[m].cnt = 1;
            elem[m].ans = 0;
        }
    }
    
    // 第三步：CDQ分治
    cdq(1, m);
    
    // 第四步：统计答案
    for (int i = 1; i <= m; i++) {
        // elem[i]的答案要加上"和它相同的元素"的贡献
        ans[elem[i].id] = elem[i].ans + elem[i].cnt - 1;
    }
    
    // 输出每个元素的答案
    for (int i = 1; i <= n; i++) {
        cout << ans[i] << "\\n";
    }
    
    return 0;
}`
  },

  'ch10_3_2_intro': {
    problemDesc: `## 🎯 10.3.2 整体二分

### 这是什么问题？

想象你是一个学校的教务处主任。你有 n 个学生，每个学生有一个成绩。现在有一堆查询，每个查询问："成绩在第 k 低到第 k' 低之间的学生有哪些？" 如果还有"修改成绩"的操作呢？

📐 **整体二分能解决的问题**：
- 🔍 区间第 k 小（静态/动态）
- 📊 区间第 k 大
- 🔄 带修改的区间第 k 小
- 📈 各种"整体询问"的问题

🌟 **整体二分 vs 普通二分**：
- 普通二分：对每个查询单独二分答案 → O(q × n log n)
- 整体二分：**把所有查询放在一起二分** → O((n + q) log² n)

> 🎯 核心思想：既然所有查询都在"同一个值域"上二分，为什么不把它们放在一起处理呢？

洛谷 P3374【区间第k小（带修改）】和 P1527【矩阵乘法】是整体二分的经典题目。整体二分是"离线算法的巅峰"，掌握它能秒杀一大类查询问题！`,

    idea: `## 💡 算法思想

### 一、从"单个二分"到"整体二分"

**单个查询的二分**：
问："区间 [L,R] 中第 k 小的数是多少？"
二分答案 mid，统计 [L,R] 中 ≤ mid 的数有多少个（设为 cnt）：
- cnt ≥ k → 答案在左半 [lo, mid]
- cnt < k → 答案在右半 [mid+1, hi]

**问题**：每次统计都要扫一遍区间，O(n) × O(log V) = O(n log V)，q 个查询就是 O(qn log V)。

### 二、整体二分的核心

**把所有查询"打包"在一起二分！**

\`\`\`
solve(queries, value_range [lo, hi]):
    if lo == hi:
        所有queries的答案都是lo，直接记录
        return
    
    mid = (lo + hi) / 2
    
    // 把queries分成两组
    left_queries = []    // 答案在[lo, mid]的查询
    right_queries = []   // 答案在[mid+1, hi]的查询
    
    for 每个query q:
        cnt = q的区间中，值在[lo, mid]范围内的元素个数
        if cnt >= q.k:
            q放入left_queries    // 第k小在左半
        else:
            q.k -= cnt           // 减去左半的贡献
            q放入right_queries   // 去右半找第(k-cnt)小
    
    solve(left_queries, [lo, mid])
    solve(right_queries, [mid+1, hi])
\`\`\`

> 🎯 比喻：就像学校分班——所有学生按成绩分成两半，每个查询根据自己需要的"排名"被分到左半或右半。递归下去，最终每个查询都找到了自己的答案！

### 三、怎么高效统计"区间内值在[lo,mid]的元素个数"？

用**树状数组**！
- 把所有值在 [lo, mid] 的元素"插入"树状数组（在它们的位置+1）
- 查询区间 [L, R] 的和 = query(R) - query(L-1)
- 处理完后，把插入的元素"撤回"

### 四、处理修改操作

如果是带修改的版本：
- 把"修改"也看作一种"操作"
- 修改 = 删除旧值 + 插入新值
- 在二分时，修改操作也要根据值的范围分到左半或右半

💡 **一句话记住整体二分：** "把所有查询打包在一起二分答案，用树状数组统计，分治处理！"`,

    derivation: `## 📐 推导与实现

### 一、静态区间第k小

**问题**：给定数组 a[1..n]，q 个查询，每次问 a[L..R] 中第 k 小的数。

**整体二分流程**：

\`\`\`
solve(qs, lo, hi):
    // qs = 当前要处理的查询集合
    // [lo, hi] = 当前值域范围
    
    if lo == hi:
        for q in qs: ans[q.id] = lo
        return
    
    mid = (lo + hi) / 2
    
    // 把值在[lo, mid]的元素加入树状数组
    for i = 1 to n:
        if lo <= a[i] <= mid:
            add(i, 1)
    
    // 分配查询
    for q in qs:
        cnt = query(q.R) - query(q.L - 1)   // [L,R]中值在[lo,mid]的个数
        if cnt >= q.k:
            left_qs.push(q)       // 答案在左半
        else:
            q.k -= cnt
            right_qs.push(q)      // 答案在右半
    
    // 清空树状数组
    for i = 1 to n:
        if lo <= a[i] <= mid:
            add(i, -1)
    
    solve(left_qs, lo, mid)
    solve(right_qs, mid + 1, hi)
\`\`\`

### 二、优化：不每次扫全数组

上面的做法每次都要扫 1~n，太慢。优化：把"元素"和"查询"放在一起处理。

维护一个"操作序列"，包含：
- 元素插入操作（位置 pos，值 val）
- 查询操作（区间 [L,R]，第 k 小）

在二分时，只处理当前操作序列中的操作！

\`\`\`
struct Op {
    int type;    // 0=元素, 1=查询
    int pos;     // 元素位置 / 查询左端点
    int val;     // 元素值 / 查询右端点
    int k;       // 查询的k
    int id;      // 查询编号
};
\`\`\`

### 三、带修改的版本

**修改操作**：把位置 pos 的值从 old_val 改成 new_val。
等价于：删除 (pos, old_val) + 插入 (pos, new_val)。

在操作序列中，修改操作变成两个操作：
\`\`\`
修改(pos, old→new, time):
    操作1: type=0, pos=pos, val=old, time=time    (删除)
    操作2: type=0, pos=pos, val=new, time=time    (插入)
\`\`\`

二分时：
- val ≤ mid 的操作去左半
- val > mid 的操作去右半
- 查询操作根据树状数组的统计结果分配

### 四、复杂度分析

**每层**：
- 树状数组操作：O(n log n)
- 分配查询：O(q)

**层数**：O(log V)，V 是值域大小

**总复杂度**：O((n + q) log n log V)

对于 n, q, V ≤ 10^5，约 10^5 × 17 × 17 ≈ 3 × 10^7，完全能过！

### 五、整体二分的本质

整体二分的本质是**对答案空间的分治**。

| 分治类型 | 分治对象 | 例子 |
|----------|----------|------|
| 普通分治 | 数据范围 | 归并排序 |
| CDQ分治 | 时间/顺序 | 三维偏序 |
| 整体二分 | 答案值域 | 区间第k小 |`,

    code: `// ========== 整体二分解决静态区间第k小完整代码 ==========
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MAXN = 100005;

// ===== 操作结构 =====
struct Op {
    int type;   // 0=元素, 1=查询
    int pos;    // 元素位置 / 查询左端点L
    int val;    // 元素值 / 查询右端点R
    int k;      // 查询的第k小
    int id;     // 查询编号
};

Op ops[MAXN], tmp[MAXN], lops[MAXN], rops[MAXN];
int ans[MAXN];       // 每个查询的答案
int tree[MAXN];      // 树状数组
int n, q;

// ===== 树状数组 =====
void add(int pos, int val) {
    for (; pos <= n; pos += pos & (-pos))
        tree[pos] += val;
}

int query(int pos) {
    int sum = 0;
    for (; pos > 0; pos -= pos & (-pos))
        sum += tree[pos];
    return sum;
}

// ===== 整体二分 =====
// 处理ops[ql..qr]中的操作，当前值域[lo, hi]
void solve(int ql, int qr, int lo, int hi) {
    if (ql > qr) return;
    
    if (lo == hi) {
        // 值域缩小到一个点，所有查询的答案都是lo
        for (int i = ql; i <= qr; i++) {
            if (ops[i].type == 1) {
                ans[ops[i].id] = lo;
            }
        }
        return;
    }
    
    int mid = (lo + hi) / 2;
    int lc = 0, rc = 0;   // 左右两部分的计数器
    
    // 分配操作
    for (int i = ql; i <= qr; i++) {
        if (ops[i].type == 0) {
            // 元素操作
            if (ops[i].val <= mid) {
                // 值在左半，加入树状数组
                add(ops[i].pos, 1);
                lops[++lc] = ops[i];   // 放入左半
            } else {
                rops[++rc] = ops[i];   // 放入右半
            }
        } else {
            // 查询操作
            int cnt = query(ops[i].val) - query(ops[i].pos - 1);
            // cnt = 区间[ops[i].pos, ops[i].val]中值<=mid的元素个数
            if (cnt >= ops[i].k) {
                lops[++lc] = ops[i];   // 第k小在左半
            } else {
                ops[i].k -= cnt;       // 减去左半的贡献
                rops[++rc] = ops[i];   // 去右半找
            }
        }
    }
    
    // 清空树状数组（撤回左半的元素）
    for (int i = 1; i <= lc; i++) {
        if (lops[i].type == 0) {
            add(lops[i].pos, -1);
        }
    }
    
    // 把lops和rops放回ops
    for (int i = 1; i <= lc; i++) ops[ql + i - 1] = lops[i];
    for (int i = 1; i <= rc; i++) ops[ql + lc + i - 1] = rops[i];
    
    // 递归处理
    solve(ql, ql + lc - 1, lo, mid);         // 左半值域
    solve(ql + lc, qr, mid + 1, hi);         // 右半值域
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> q;
    
    int cnt = 0;   // 操作总数
    for (int i = 1; i <= n; i++) {
        int val;
        cin >> val;
        ops[++cnt] = {0, i, val, 0, 0};   // 元素操作
    }
    
    for (int i = 1; i <= q; i++) {
        int L, R, k;
        cin >> L >> R >> k;
        ops[++cnt] = {1, L, R, k, i};     // 查询操作
    }
    
    // 整体二分，值域[1, n]（假设元素值在1~n）
    // 如果值域更大，改成实际范围
    solve(1, cnt, 1, n);
    
    for (int i = 1; i <= q; i++) {
        cout << ans[i] << "\\n";
    }
    
    return 0;
}`
  },

  'ch10_3_3_intro': {
    problemDesc: `## 🐟 10.3.3 莫队算法

### 这是什么问题？

想象你是一个图书馆管理员。有 n 本书排成一排，每本书有一个类型编号。读者不停来问你："从第 L 本书到第 R 本书之间，有多少种不同类型的书？" 这就是经典的**区间种类数**问题！

📐 **莫队算法能解决的问题**：
- 📚 区间种类数（有多少种不同的数）
- 🎨 区间颜色数
- 🔢 区间内各元素出现次数的各种统计
- 📊 区间 mex（最小未出现的非负整数）

🌟 **莫队算法的本质**：
- 一种"优雅的暴力"——通过巧妙的排序，让暴力枚举的复杂度从 O(n²) 降到 O(n√n)！
- 不需要任何高级数据结构，只需要一个"当前答案"和"移动指针"

> 🎯 名字来源：莫队 = "莫队算法"，发明者莫涛（也是IOI金牌选手），因其在竞赛中的广泛应用而闻名。

洛谷 P1494【小Z的袜子】是莫队算法的入门经典题。莫队算法被称为"暴力美学"的巅峰——看似朴素，实则精妙！`,

    idea: `## 💡 算法思想

### 一、暴力做法

对于每个查询 [L, R]，扫一遍区间，用哈希表/数组统计种类数。

时间复杂度：O(n) 每查询，总共 O(qn)。太慢！

### 二、莫队的核心优化

**关键观察**：如果我已经知道了 [L, R] 的答案，那么 [L, R+1] 的答案只需要"加一个元素"就能得到！

> 🎯 比喻：莫队就像"挪窗户"——知道当前窗户里有什么，窗户往右移一格，只需要看"新进来的"和"刚出去的"。

**莫队的策略**：
1. 把所有查询排个序，让相邻查询的区间尽量"接近"
2. 维护两个指针 l 和 r，表示当前区间
3. 从一个查询移到下一个查询时，只需要移动指针，每次移动 O(1) 更新答案

### 三、排序策略——分块！

**怎么排序查询？** 把序列分成 √n 块，每个块大小约 √n。

排序规则：
1. 先按 L 所在的块号排序
2. 同一块内，按 R 排序

\`\`\`
块号:  0  0  0  1  1  1  2  2  2
位置:  1  2  3  4  5  6  7  8  9

查询排序后：
[L=2,R=5] → L在块0, R=5
[L=1,R=3] → L在块0, R=3
[L=4,R=8] → L在块1, R=8
[L=5,R=6] → L在块1, R=6
...
\`\`\`

### 四、为什么这样排序？

**分析指针移动次数**：
- **r 指针**：同一块内 r 单调递增（或递减），每块最多移动 n 次，共 √n 块 → 总移动 O(n√n)
- **l 指针**：相邻查询的 L 在同一块内，距离最多 √n → 每次移动 O(√n)，共 q 次 → 总移动 O(q√n)

**总复杂度**：O((n + q)√n)

> 🧠 直觉：分块让 r 不会"来回跳"（同一块内单调），让 l 不会"跳太远"（相邻查询在同一块）。

### 五、奇偶优化

一个小技巧：奇数块内 r 升序，偶数块内 r 降序。这样块与块之间切换时，r 不用"从最右跳到最左"。

💡 **一句话记住莫队：** "把查询分块排序，用两个指针挪来挪去，O(1)更新答案，总复杂度 O(n√n)！"`,

    derivation: `## 📐 推导与实现

### 一、维护"当前区间"的答案

以"区间种类数"为例：
\`\`\`
int cnt[MAXN];    // cnt[x] = 当前区间中x出现的次数
int types = 0;    // 当前区间的种类数

// 在位置pos加入一个元素
void add(int pos) {
    int x = a[pos];
    if (cnt[x] == 0) types++;   // 第一次出现，种类+1
    cnt[x]++;
}

// 在位置pos删除一个元素
void del(int pos) {
    int x = a[pos];
    cnt[x]--;
    if (cnt[x] == 0) types--;   // 最后一次消失，种类-1
}
\`\`\`

### 二、莫队主流程

\`\`\`
// 查询排序
int block_size = sqrt(n);
sort(queries, queries + q, [](Query &a, Query &b) {
    int ba = a.L / block_size, bb = b.L / block_size;
    if (ba != bb) return ba < bb;      // 先按块排
    return a.R < b.R;                   // 同块内按R排
});

// 处理查询
int l = 1, r = 0;   // 当前区间[l, r]（初始为空）
for (int i = 0; i < q; i++) {
    int L = queries[i].L, R = queries[i].R;
    
    // 移动指针（注意顺序！先扩后缩）
    while (r < R) add(++r);     // 右指针右移（扩大）
    while (l > L) add(--l);     // 左指针左移（扩大）
    while (r > R) del(r--);     // 右指针左移（缩小）
    while (l < L) del(l++);     // 左指针右移（缩小）
    
    ans[queries[i].id] = types;  // 记录答案
}
\`\`\`

> 🧠 **为什么先扩后缩？** 如果先缩，区间可能变成空的（l > r），导致出错。先扩大保证区间始终合法。

### 三、复杂度严格推导

设块大小为 B = √n。

**r 指针的移动**：
- 同一块内的查询，R 单调递增
- 每个块内，R 最多从 1 移到 n，移动 n 次
- 共 n/B 个块，总移动 = (n/B) × n = n²/B

**l 指针的移动**：
- 相邻查询的 L 在同一块内，距离最多 B
- 共 q 个查询，总移动 = q × B

**总移动** = n²/B + qB

令 B = n/√q 时取最小值 2n√q。当 q ≈ n 时，B = √n，总移动 = O(n√n)。

### 四、带修改的莫队

如果序列有修改操作（单点修改），用"带修改莫队"：

**核心**：加入"时间维度"。每个查询变成 (L, R, t)，t 是"在第几次修改之后查询"。

排序规则：
1. 按 L 的块号排
2. 同块按 R 的块号排
3. 同块同块按 t 排

块大小改为 n^(2/3)，复杂度 O(n^(5/3))。

### 五、莫队的应用——小Z的袜子

**问题**：n 只袜子排成一排，每只有颜色。问 [L,R] 中随机取两只，颜色相同的概率。

**转化**：
\`\`\`
P = Σ C(cnt[c], 2) / C(R-L+1, 2)
  = Σ cnt[c]×(cnt[c]-1)/2 / ((R-L+1)×(R-L)/2)
  = (Σ cnt[c]² - (R-L+1)) / ((R-L+1)×(R-L))
\`\`\`

莫队维护 Σ cnt[c]²：
- 加入元素 x：ans += 2×cnt[x] + 1，cnt[x]++
- 删除元素 x：cnt[x]--，ans -= 2×cnt[x] + 1

### 六、复杂度总结

| 版本 | 块大小 | 复杂度 | 适用场景 |
|------|--------|--------|----------|
| 普通莫队 | √n | O(n√n) | 无修改 |
| 带修改莫队 | n^(2/3) | O(n^(5/3)) | 有单点修改 |
| 树上莫队 | - | O(n√n) | 树上路径查询 |`,

    code: `// ========== 莫队算法解决区间种类数完整代码 ==========
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

const int MAXN = 100005;

int a[MAXN];          // 原数组
int cnt[MAXN];        // cnt[x] = 当前区间中x的出现次数
int types = 0;        // 当前区间的种类数
int n, q;
int block_size;       // 块大小

// ===== 查询结构 =====
struct Query {
    int L, R;    // 查询区间
    int id;      // 原始编号
} queries[MAXN];

int ans[MAXN];   // 每个查询的答案

// ===== 排序规则：分块 =====
bool cmp(const Query &a, const Query &b) {
    int ba = a.L / block_size;
    int bb = b.L / block_size;
    if (ba != bb) return ba < bb;     // 先按L的块号排
    // 同块内按R排（奇偶优化：奇数块R升序，偶数块R降序）
    return (ba & 1) ? (a.R < b.R) : (a.R > b.R);
}

// ===== 加入位置pos的元素 =====
void add(int pos) {
    int x = a[pos];
    if (cnt[x] == 0) types++;   // 新种类！
    cnt[x]++;
}

// ===== 删除位置pos的元素 =====
void del(int pos) {
    int x = a[pos];
    cnt[x]--;
    if (cnt[x] == 0) types--;   // 种类消失！
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n >> q;
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    
    for (int i = 1; i <= q; i++) {
        cin >> queries[i].L >> queries[i].R;
        queries[i].id = i;
    }
    
    // 块大小 = √n
    block_size = max(1, (int)sqrt(n));
    
    // 排序查询
    sort(queries + 1, queries + q + 1, cmp);
    
    // 莫队核心：移动指针
    int l = 1, r = 0;   // 当前区间[l, r]，初始为空
    
    for (int i = 1; i <= q; i++) {
        int L = queries[i].L;
        int R = queries[i].R;
        
        // 先扩大区间，再缩小区间（避免区间变空）
        while (r < R) add(++r);     // 右指针右移
        while (l > L) add(--l);     // 左指针左移
        while (r > R) del(r--);     // 右指针左移
        while (l < L) del(l++);     // 左指针右移
        
        ans[queries[i].id] = types;  // 记录答案
    }
    
    // 输出
    for (int i = 1; i <= q; i++) {
        cout << ans[i] << "\\n";
    }
    
    return 0;
}`
  }
});
