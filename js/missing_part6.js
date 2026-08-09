// 缺失的Part6内容
Object.assign(LESSON_CONTENT, {
  'ch6_2_1_intro': {
    problemDesc: `## 🌟 6.2.1 质数（素数判定、筛法）

### 这是什么问题？

想象你是一个古代希腊的数学家，站在沙滩上，看着无穷无尽的沙粒——就像无穷无尽的整数。你想知道：**哪些数是"不可再分"的？** 这些数就像原子一样，是构成所有整数的"基本粒子"，我们叫它们**质数**（或素数）。

具体来说，我们需要解决两个核心问题：
1. **质数判定**：给你一个数 n，判断它是不是质数。
2. **筛法求质数**：给你一个范围 [2, N]，把里面所有的质数都找出来。

质数是数论的基石！从密码学（RSA加密）到算法竞赛，质数无处不在。比如洛谷 P3383【线性筛素数】就是一道经典题目。`,

    idea: `## 💡 算法思想

### 一、质数的定义

质数就是**只有1和它本身两个因数**的自然数（大于1）。比如 2, 3, 5, 7, 11... 而像 4=2×2, 6=2×3 这种有其他因数的叫**合数**。

> 🎯 比喻：质数就像乐高积木中的"基础块"，所有合数都可以用质数"拼"出来！

### 二、试除法判定质数

最朴素的想法：从 2 试到 n-1，看有没有能整除 n 的。

**优化**：如果 n 有因数，那一定有一个因数 ≤ √n。所以只需要试到 √n 就够了！

> 🧠 为什么？因为如果 a×b=n，且 a>√n, b>√n，那 a×b > n，矛盾！

### 三、埃氏筛法（Eratosthenes筛）

想象你有一张1~N的数表：
1. 从2开始，2是质数 ✅
2. 把2的所有倍数（4,6,8...）全部划掉 ❌
3. 下一个没被划掉的是3，3是质数 ✅
4. 划掉3的所有倍数（6,9,12...）
5. 重复...

> 🎯 比喻：像筛沙子一样，把"合数沙子"筛掉，留下的就是"质数金子"！

### 四、线性筛（欧拉筛）

埃氏筛的问题是：有些数会被重复筛掉（比如6被2筛一次，又被3筛一次）。**线性筛**保证每个合数只被筛一次，时间复杂度 O(N)！

核心思想：**每个合数只被它的最小质因子筛掉。**`,

    derivation: `## 📐 推导与实现

### 一、试除法 O(√n)

\`\`\`
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)  // i <= √n 等价于 i*i <= n
        if (n % i == 0) return false;
    return true;
}
\`\`\`

**时间复杂度**：O(√n)，对于 n ≤ 10^9 完全够用。

### 二、埃氏筛 O(N log log N)

\`\`\`
const int MAXN = 10000005;
bool not_prime[MAXN];  // not_prime[i]=true 表示 i 是合数
int primes[MAXN];      // 存所有质数
int cnt = 0;

void eratosthenes(int n) {
    not_prime[0] = not_prime[1] = true;  // 0和1不是质数
    for (int i = 2; i <= n; i++) {
        if (!not_prime[i]) {             // i是质数
            primes[cnt++] = i;
            for (int j = i * 2; j <= n; j += i)
                not_prime[j] = true;     // 划掉i的倍数
        }
    }
}
\`\`\`

**复杂度分析**：每个质数 p 会筛掉 N/p 个数，总操作数 = N/2 + N/3 + N/5 + ... ≈ N·log(log(N))。

**小优化**：内层循环可以从 i*i 开始（因为 i*i 之前的倍数已经被更小的质数筛过了）。

### 三、线性筛 O(N)

\`\`\`
bool not_prime2[MAXN];
int primes2[MAXN];
int cnt2 = 0;

void linear_sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (!not_prime2[i])
            primes2[cnt2++] = i;         // i是质数
        for (int j = 0; j < cnt2 && i * primes2[j] <= n; j++) {
            not_prime2[i * primes2[j]] = true;  // 筛掉 i × 质数
            if (i % primes2[j] == 0)
                break;  // 关键！保证每个合数只被最小质因子筛
        }
    }
}
\`\`\`

**关键理解**：\`if (i % primes2[j] == 0) break;\`

- 当 primes[j] 能整除 i 时，说明 primes[j] 是 i 的最小质因子
- 如果继续筛 i×primes[j+1]，那这个数的最小质因子其实是 primes[j]，不是 primes[j+1]
- 这样保证了每个合数**恰好被筛一次**

| 筛法 | 时间复杂度 | 特点 |
|------|-----------|------|
| 试除法 | O(√n) | 单个判定 |
| 埃氏筛 | O(N log log N) | 简单直观 |
| 线性筛 | O(N) | 最快，竞赛常用 |`,

    code: `// 完整代码示例：线性筛素数（洛谷P3383）
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100000005;
bool not_prime[MAXN];
int primes[MAXN];
int cnt = 0;

// 线性筛核心代码
void sieve(int n) {
    not_prime[0] = not_prime[1] = true;
    for (int i = 2; i <= n; i++) {
        if (!not_prime[i])
            primes[cnt++] = i;
        for (int j = 0; j < cnt && (long long)i * primes[j] <= n; j++) {
            not_prime[i * primes[j]] = true;
            if (i % primes[j] == 0)
                break;
        }
    }
}

// 试除法判定单个质数
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; (long long)i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int n, q;
    scanf("%d%d", &n, &q);
    sieve(n);  // 预处理1~n的所有质数
    while (q--) {
        int x;
        scanf("%d", &x);
        printf("%d\\n", primes[x - 1]);  // 第x个质数（从1开始）
    }
    return 0;
}`
  },

  'ch6_2_2_intro': {
    problemDesc: `## 🌟 6.2.2 最大公约数（GCD/LCM、扩展欧几里得）

### 这是什么问题？

想象你有两根木棍，一根长 a 厘米，一根长 b 厘米。你想把它们切成同样长的小段，而且不能有剩余。问：**每段最长能切多长？** 这就是求 **最大公约数（GCD）**！

再比如：两个齿轮分别有 a 齿和 b 齿，它们从某次咬合开始，**转多少圈后再次同时回到原位？** 这就是求 **最小公倍数（LCM）**！

核心问题：
1. **GCD(a, b)**：a 和 b 的最大公约数
2. **LCM(a, b)**：a 和 b 的最小公倍数
3. **扩展欧几里得**：找到整数 x, y 使得 ax + by = gcd(a,b)

这些是数论中最基础也最重要的工具！`,

    idea: `## 💡 算法思想

### 一、辗转相除法（欧几里得算法）

求 GCD 最经典的方法！

> 🎯 比喻：想象两个小朋友分糖果。a 颗糖和 b 颗糖，每次用多的减少的，直到一样多——那个数就是GCD！

核心公式：\`gcd(a, b) = gcd(b, a % b)\`

为什么？因为 a = q×b + r，a和b的公约数一定也是b和r的公约数！

### 二、LCM 的求法

有个超美的公式：

\`lcm(a, b) = a × b / gcd(a, b)\`

> 🧠 直觉：a×b 把所有因子都乘了一遍，但公共部分被算了两次，除以gcd就去重了。

### 三、扩展欧几里得算法（exGCD）

普通GCD只告诉你gcd是多少，**扩展欧几里得**还能告诉你：存在整数 x, y 使得：

\`a·x + b·y = gcd(a, b)\`

> 🎯 比喻：就像说"我可以用a步和b步的组合，走出gcd步的距离"。

这在解同余方程、求乘法逆元时超级有用！`,

    derivation: `## 📐 推导与实现

### 一、欧几里得算法

**定理**：gcd(a, b) = gcd(b, a mod b)

**证明**：设 a = qb + r（r = a mod b）
- 若 d|a 且 d|b，则 d|(a - qb) = d|r
- 所以 a,b 的公因子也是 b,r 的公因子，反之亦然
- 因此 gcd(a,b) = gcd(b,r)

**代码**：
\`\`\`
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
\`\`\`

**时间复杂度**：O(log(min(a,b)))，和斐波那契数列有关（最坏情况是相邻斐波那契数）。

### 二、LCM

\`\`\`
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // 先除后乘，防溢出！
}
\`\`\`

### 三、扩展欧几里得

**目标**：求 x, y 使得 ax + by = gcd(a,b)

**推导**（递归）：
1. 当 b=0 时，gcd=a，显然 x=1, y=0
2. 否则，递归求 gcd(b, a%b) 的解 x', y'：
   - b·x' + (a%b)·y' = gcd
   - 因为 a%b = a - (a/b)·b
   - 代入：b·x' + (a - (a/b)·b)·y' = gcd
   - 整理：a·y' + b·(x' - (a/b)·y') = gcd
   - 所以 x = y', y = x' - (a/b)·y'

\`\`\`
int exgcd(int a, int b, int &x, int &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    int g = exgcd(b, a % b, x, y);
    int tmp = x;
    x = y;
    y = tmp - (a / b) * y;
    return g;
}
\`\`\`

**通解**：若 ax₀ + by₀ = gcd，则所有解为：
- x = x₀ + (b/gcd)·t
- y = y₀ - (a/gcd)·t

| 算法 | 用途 | 复杂度 |
|------|------|--------|
| gcd | 求最大公约数 | O(log n) |
| lcm | 求最小公倍数 | O(log n) |
| exgcd | 解不定方程/求逆元 | O(log n) |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;

// 辗转相除法求GCD
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 求LCM（注意先除后乘防溢出）
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

// 扩展欧几里得
// 返回gcd(a,b)，同时求出x,y使得 a*x + b*y = gcd(a,b)
int exgcd(int a, int b, int &x, int &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int g = exgcd(b, a % b, x, y);
    int tmp = x;
    x = y;
    y = tmp - (a / b) * y;
    return g;
}

// 应用：解方程 ax ≡ 1 (mod m)，即求a模m的逆元
// 前提：gcd(a, m) = 1
int modInverse(int a, int m) {
    int x, y;
    int g = exgcd(a, m, x, y);
    if (g != 1) return -1;  // 逆元不存在
    return (x % m + m) % m;  // 保证结果在[0, m)
}

int main() {
    int a, b;
    cin >> a >> b;
    cout << "GCD = " << gcd(a, b) << endl;
    cout << "LCM = " << lcm(a, b) << endl;
    
    int x, y;
    int g = exgcd(a, b, x, y);
    cout << g << " = " << a << "*" << x << " + " << b << "*" << y << endl;
    return 0;
}`
  },

  'ch6_2_3_intro': {
    problemDesc: `## 🌟 6.2.3 欧拉函数

### 这是什么问题？

想象你站在一个钟面上，钟面有 n 个刻度（0 到 n-1）。你想知道：**有多少个刻度和 n 是"互质"的？** 也就是说，这些刻度数和 n 的最大公约数是1。

这个计数函数就叫**欧拉函数 φ(n)**！

比如 φ(12) = 4，因为 1~12 中和12互质的数只有 1, 5, 7, 11。

欧拉函数是数论中的"瑞士军刀"——从欧拉定理到RSA加密，从快速幂优化到莫比乌斯反演，到处都有它的身影！

核心问题：
1. 求单个 φ(n)
2. 线性筛求 1~N 的所有 φ(i)`,

    idea: `## 💡 算法思想

### 一、欧拉函数的定义

φ(n) = 1~n 中与 n 互质的数的个数。

> 🎯 比喻：把1~n想象成n个小朋友，φ(n)就是其中和n"合不来"（互质）的小朋友数量。

### 二、通项公式

如果 n 的质因数分解为 n = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ，则：

φ(n) = n · (1 - 1/p₁) · (1 - 1/p₂) · ... · (1 - 1/pₖ)

> 🧠 直觉：从n个数中，去掉p₁的倍数（占1/p₁），去掉p₂的倍数（占1/p₂）...用容斥的思想。

### 三、性质

1. **积性函数**：若 gcd(a,b)=1，则 φ(ab) = φ(a)·φ(b)
2. **质数的φ**：φ(p) = p-1（质数和所有比它小的数都互质）
3. **质数幂的φ**：φ(p^k) = p^k - p^(k-1) = p^(k-1)·(p-1)
4. **欧拉定理**：若 gcd(a,n)=1，则 a^φ(n) ≡ 1 (mod n)
5. **费马小定理**：当n是质数时，a^(n-1) ≡ 1 (mod n)

### 四、线性筛求欧拉函数

和线性筛素数类似，利用积性函数的性质，可以在 O(N) 内求出 1~N 的所有 φ 值。`,

    derivation: `## 📐 推导与实现

### 一、通项公式推导

**目标**：φ(n) = n · ∏(1 - 1/pᵢ)

**用容斥原理**：
- 1~n 中 p₁ 的倍数有 n/p₁ 个
- p₂ 的倍数有 n/p₂ 个
- p₁p₂ 的倍数有 n/(p₁p₂) 个
- ...

由容斥：与n不互质的数 = n/p₁ + n/p₂ + ... - n/(p₁p₂) - ...
与n互质的数 = n - (与n不互质的数) = n·∏(1 - 1/pᵢ)

### 二、单个φ(n)的计算 O(√n)

\`\`\`
int euler_phi(int n) {
    int res = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            res = res / i * (i - 1);  // res *= (1 - 1/i)
            while (n % i == 0) n /= i; // 除尽i
        }
    }
    if (n > 1) res = res / n * (n - 1);  // 剩余的大质因子
    return res;
}
\`\`\`

### 三、线性筛求φ O(N)

利用积性函数性质：
1. φ(1) = 1
2. 若 p 是质数：φ(p) = p-1
3. 若 i % p == 0（p是i的质因子）：φ(i·p) = φ(i)·p
4. 若 i % p != 0：φ(i·p) = φ(i)·(p-1)

\`\`\`
int phi[MAXN];
int primes[MAXN], cnt = 0;
bool not_prime[MAXN];

void euler_sieve(int n) {
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!not_prime[i]) {
            primes[cnt++] = i;
            phi[i] = i - 1;  // 质数的φ
        }
        for (int j = 0; j < cnt && i * primes[j] <= n; j++) {
            not_prime[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            } else {
                phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            }
        }
    }
}
\`\`\`

**关键理解**：
- i % p == 0 时，p 已经是 i 的质因子，i·p 只是多了一个 p 的幂次
- φ(i·p) = i·p · ∏(1-1/q) = p · (i · ∏(1-1/q)) = p · φ(i)
- i % p != 0 时，p 是新的质因子，由积性函数：φ(i·p) = φ(i)·φ(p) = φ(i)·(p-1)

| 方法 | 复杂度 | 适用场景 |
|------|--------|---------|
| 通项公式 | O(√n) | 单个n |
| 线性筛 | O(N) | 批量求1~N |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 10000005;
int phi[MAXN];
int primes[MAXN], cnt = 0;
bool not_prime[MAXN];

// 线性筛求欧拉函数
void euler_sieve(int n) {
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!not_prime[i]) {
            primes[cnt++] = i;
            phi[i] = i - 1;
        }
        for (int j = 0; j < cnt && (long long)i * primes[j] <= n; j++) {
            not_prime[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            } else {
                phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            }
        }
    }
}

// 单个欧拉函数
int euler_phi(int n) {
    int res = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            res = res / i * (i - 1);
            while (n % i == 0) n /= i;
        }
    }
    if (n > 1) res = res / n * (n - 1);
    return res;
}

int main() {
    int n;
    cin >> n;
    euler_sieve(n);
    // 求1~n的欧拉函数之和（洛谷P2158）
    long long sum = 0;
    for (int i = 1; i <= n; i++)
        sum += phi[i];
    cout << sum << endl;
    return 0;
}`
  },

  'ch6_3_1_intro': {
    problemDesc: `## 🌟 6.3.1 线性同余方程 & 乘法逆元

### 这是什么问题？

想象你在一个只有 n 个数字的"环形世界"里（就像时钟只有 n 个小时）。你想解一个方程：

**a·x ≡ b (mod n)**

意思是：a 乘以某个 x，除以 n 的余数等于 b。

特殊情况：当 b=1 时，**a·x ≡ 1 (mod n)**，这个 x 就叫 a 模 n 的**乘法逆元**！

> 🎯 比喻：乘法逆元就像是"除法"——在模运算的世界里，除以 a 就等于乘以 a 的逆元！

经典题目：洛谷 P1082【同余方程】，求 ax ≡ 1 (mod b) 的最小正整数解。

核心问题：
1. 解线性同余方程 ax ≡ b (mod m)
2. 求乘法逆元（多种方法）`,

    idea: `## 💡 算法思想

### 一、线性同余方程

**ax ≡ b (mod m)** 等价于 **ax - my = b**，也就是 **ax + m(-y) = b**。

这不就是不定方程吗？！用**扩展欧几里得**就能解！

**有解条件**：gcd(a, m) | b（b 是 gcd 的倍数）

### 二、乘法逆元

当 gcd(a, m) = 1 时，ax ≡ 1 (mod m) 一定有解！

三种求法：
1. **exGCD法**：直接解 ax + my = 1
2. **费马小定理**：当 m 是质数时，a⁻¹ ≡ a^(m-2) (mod m)
3. **线性递推**：O(N) 批量求 1~N 的逆元

> 🧠 费马小定理的原理：a^(m-1) ≡ 1 (mod m)，两边除以 a 得 a^(m-2) ≡ a⁻¹ (mod m)

### 三、线性递推求逆元

有个巧妙的递推式：

inv[i] = -(m/i) · inv[m%i] (mod m)

> 🎯 比喻：用"已知的小逆元"推"大的逆元"，像多米诺骨牌一样！`,

    derivation: `## 📐 推导与实现

### 一、exGCD 解线性同余方程

**ax ≡ b (mod m)** → **ax + my = b**

1. 用 exGCD 求 ax₀ + my₀ = g，其中 g = gcd(a,m)
2. 若 b % g ≠ 0，无解
3. 否则，x₀ = x₀ · (b/g)，这就是一组特解
4. 通解：x = x₀ + (m/g)·t
5. 最小正整数解：((x₀ % (m/g)) + m/g) % (m/g)

### 二、费马小定理求逆元

**前提**：p 是质数，gcd(a, p) = 1

由费马小定理：a^(p-1) ≡ 1 (mod p)
→ a · a^(p-2) ≡ 1 (mod p)
→ a⁻¹ ≡ a^(p-2) (mod p)

用快速幂计算 a^(p-2) mod p，时间复杂度 O(log p)。

### 三、线性递推求逆元 O(N)

**推导**：设 m = k·i + r（k = m/i, r = m%i）

则 k·i + r ≡ 0 (mod m)

两边乘 i⁻¹·r⁻¹：k·r⁻¹ + i⁻¹ ≡ 0 (mod m)

→ **i⁻¹ ≡ -k·r⁻¹ ≡ -(m/i)·(m%i)⁻¹ (mod m)**

\`\`\`
inv[1] = 1;
for (int i = 2; i <= n; i++)
    inv[i] = (long long)(MOD - MOD / i) * inv[MOD % i] % MOD;
\`\`\`

| 方法 | 条件 | 复杂度 | 适用场景 |
|------|------|--------|---------|
| exGCD | gcd(a,m)=1 | O(log m) | 通用 |
| 费马小定理 | m为质数 | O(log m) | 模数为质数 |
| 线性递推 | m为质数 | O(N) | 批量求1~N |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// 扩展欧几里得
ll exgcd(ll a, ll b, ll &x, ll &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    ll g = exgcd(b, a % b, x, y);
    ll tmp = x; x = y; y = tmp - (a / b) * y;
    return g;
}

// 方法1：exGCD求逆元
ll inv_exgcd(ll a, ll m) {
    ll x, y;
    ll g = exgcd(a, m, x, y);
    if (g != 1) return -1;  // 逆元不存在
    return (x % m + m) % m;
}

// 方法2：快速幂求逆元（m必须是质数）
ll qpow(ll a, ll b, ll m) {
    ll res = 1; a %= m;
    while (b) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
ll inv_fermat(ll a, ll p) {
    return qpow(a, p - 2, p);
}

// 方法3：线性递推求1~n的逆元（p必须是质数）
const int MAXN = 3000005;
ll inv[MAXN];
void get_inv(int n, ll p) {
    inv[1] = 1;
    for (int i = 2; i <= n; i++)
        inv[i] = (p - p / i) * inv[p % i] % p;
}

int main() {
    // 洛谷P1082：求 ax ≡ 1 (mod b) 的最小正整数解
    ll a, b;
    cin >> a >> b;
    cout << inv_exgcd(a, b) << endl;
    return 0;
}`
  },

  'ch6_3_2_intro': {
    problemDesc: `## 🌟 6.3.2 中国剩余定理（CRT）

### 这是什么问题？

想象你是一个古代的将军，你需要点兵。你知道：
- 3人一排多2人
- 5人一排多3人
- 7人一排多2人

问：最少有多少兵？

这就是著名的**"韩信点兵"**问题！数学上就是解一组同余方程：

x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)

**中国剩余定理（CRT）** 就是解决这类问题的神器！当模数两两互质时，它能给出唯一解。

经典题目：洛谷 P4777【CRT模板】、洛谷 P1082 的加强版。`,

    idea: `## 💡 算法思想

### 一、问题形式

求解：
x ≡ a₁ (mod m₁)
x ≡ a₂ (mod m₂)
...
x ≡ aₙ (mod mₙ)

其中 m₁, m₂, ..., mₙ **两两互质**。

### 二、核心思想

> 🎯 比喻：想象你在拼拼图，每个同余方程是一块拼图。CRT告诉你怎么把它们拼在一起！

**构造法**：
1. 令 M = m₁ · m₂ · ... · mₙ（所有模数的乘积）
2. 令 Mᵢ = M / mᵢ
3. 求 Mᵢ 模 mᵢ 的逆元 tᵢ（即 Mᵢ · tᵢ ≡ 1 (mod mᵢ)）
4. 答案 x = Σ aᵢ · Mᵢ · tᵢ (mod M)

**为什么有效？**
- 对于第 j 个方程：当 i ≠ j 时，Mᵢ 是 mⱼ 的倍数，所以 aᵢ·Mᵢ·tᵢ ≡ 0 (mod mⱼ)
- 只有 i = j 时，aⱼ·Mⱼ·tⱼ ≡ aⱼ·1 ≡ aⱼ (mod mⱼ)
- 所以 x ≡ aⱼ (mod mⱼ) ✅

### 三、扩展CRT（EXCRT）

当模数**不互质**时，CRT不直接适用。EXCRT通过逐个合并方程来解决。`,

    derivation: `## 📐 推导与实现

### 一、标准CRT

设 M = ∏mᵢ，Mᵢ = M/mᵢ

**步骤**：
1. 对每个 i，求 tᵢ = Mᵢ⁻¹ mod mᵢ（用exGCD或逆元）
2. x = (Σ aᵢ · Mᵢ · tᵢ) mod M

**例子**（韩信点兵）：
- m₁=3, a₁=2; m₂=5, a₂=3; m₃=7, a₃=2
- M = 105
- M₁=35, M₂=21, M₃=15
- t₁=35⁻¹ mod 3 = 2, t₂=21⁻¹ mod 5 = 1, t₃=15⁻¹ mod 7 = 1
- x = (2·35·2 + 3·21·1 + 2·15·1) mod 105 = (140+63+30) mod 105 = 233 mod 105 = 23 ✅

### 二、扩展CRT（模数不互质）

**合并两个方程**：
x ≡ a₁ (mod m₁)  →  x = a₁ + k₁·m₁
x ≡ a₂ (mod m₂)  →  x = a₂ + k₂·m₂

代入：a₁ + k₁·m₁ = a₂ + k₂·m₂
→ k₁·m₁ - k₂·m₂ = a₂ - a₁
→ k₁·m₁ ≡ (a₂ - a₁) (mod m₂)

用exGCD解出k₁，然后合并为：x ≡ a' (mod lcm(m₁,m₂))

**有解条件**：gcd(m₁,m₂) | (a₂-a₁)

逐个合并n个方程即可。

\`\`\`
// EXCRT核心：合并 x ≡ a1 (mod m1) 和 x ≡ a2 (mod m2)
// 返回合并后的 (a, lcm(m1,m2))
pair<ll,ll> merge(ll a1, ll m1, ll a2, ll m2) {
    ll x, y;
    ll g = exgcd(m1, m2, x, y);
    if ((a2 - a1) % g != 0) return {-1, -1}; // 无解
    ll lcm = m1 / g * m2;
    ll delta = (a2 - a1) / g;
    // k1 = delta * x mod (m2/g)
    ll k1 = (__int128)delta % (m2/g) * (x % (m2/g)) % (m2/g);
    ll a_new = (a1 + (__int128)k1 % lcm * m1 % lcm) % lcm;
    a_new = (a_new + lcm) % lcm;
    return {a_new, lcm};
}
\`\`\`

| 版本 | 模数条件 | 复杂度 |
|------|---------|--------|
| CRT | 两两互质 | O(n log M) |
| EXCRT | 无限制 | O(n log M) |`,

    code: `// 完整代码示例：CRT模板（洛谷P4777）
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll exgcd(ll a, ll b, ll &x, ll &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    ll g = exgcd(b, a % b, x, y);
    ll tmp = x; x = y; y = tmp - (a / b) * y;
    return g;
}

// 快速乘（防溢出）
ll mul(ll a, ll b, ll m) {
    return (__int128)a * b % m;
}

// 中国剩余定理（模数两两互质）
ll CRT(int n, ll a[], ll m[]) {
    ll M = 1;
    for (int i = 1; i <= n; i++) M *= m[i];
    ll ans = 0;
    for (int i = 1; i <= n; i++) {
        ll Mi = M / m[i];
        ll x, y;
        exgcd(Mi, m[i], x, y);
        x = (x % m[i] + m[i]) % m[i];  // Mi的逆元
        ans = (ans + mul(a[i], mul(Mi, x, M), M)) % M;
    }
    return (ans % M + M) % M;
}

// 扩展CRT（模数不一定互质）
ll EXCRT(int n, ll a[], ll m[]) {
    ll cur_a = a[1], cur_m = m[1];
    for (int i = 2; i <= n; i++) {
        ll x, y;
        ll g = exgcd(cur_m, m[i], x, y);
        if ((a[i] - cur_a) % g != 0) return -1;  // 无解
        ll lcm = cur_m / g * m[i];
        ll delta = (a[i] - cur_a) / g;
        ll k = (__int128)delta % (m[i]/g) * (x % (m[i]/g)) % (m[i]/g);
        cur_a = (cur_a + (__int128)k % lcm * cur_m % lcm) % lcm;
        cur_a = (cur_a + lcm) % lcm;
        cur_m = lcm;
    }
    return cur_a;
}

int main() {
    int n;
    scanf("%d", &n);
    ll a[105], m[105];
    for (int i = 1; i <= n; i++)
        scanf("%lld%lld", &m[i], &a[i]);
    printf("%lld\\n", CRT(n, a, m));
    return 0;
}`
  },

  'ch6_3_3_intro': {
    problemDesc: `## 🌟 6.3.3 高次同余方程（BSGS）

### 这是什么问题？

现在问题升级了！不再是简单的 ax ≡ b，而是：

**a^x ≡ b (mod p)**

给定 a, b, p，求最小的非负整数 x。

> 🎯 比喻：如果线性同余是"走楼梯"（每次加a），那高次同余就是"坐电梯"（每次乘a）。你要找按几次电梯才能到达b层！

这就是**离散对数问题**，是密码学（如Diffie-Hellman密钥交换）的核心！

经典题目：洛谷 P3846【BSGS模板】

当 a 和 p 不互质时，还需要用**扩展BSGS（exBSGS）**。`,

    idea: `## 💡 算法思想

### 一、暴力？太慢！

直接枚举 x = 0, 1, 2, ... 最坏要枚举到 p-1，时间复杂度 O(p)，对于 p = 10^9 就TLE了。

### 二、BSGS（Baby-step Giant-step）

> 🎯 比喻：想象你在一个巨大的图书馆找一本书。暴力是一本本翻（O(p)），BSGS是先确定在哪个书架（Giant-step），再在书架上找具体位置（Baby-step）。

**核心思想**：分块！

设 m = ⌈√p⌉，令 x = i·m - j（其中 0 ≤ j < m, 1 ≤ i ≤ m）

则 a^x = a^(im-j) ≡ b (mod p)
→ a^(im) ≡ b · a^j (mod p)

**步骤**：
1. **Baby-step**：计算 b·a^j mod p（j=0,1,...,m-1），存入哈希表
2. **Giant-step**：计算 a^(im) mod p（i=1,2,...,m），在哈希表中查找

时间复杂度 O(√p · log(√p))，空间 O(√p)。

### 三、扩展BSGS

当 gcd(a,p) ≠ 1 时，先提取公因子转化为互质的情况，再用标准BSGS。`,

    derivation: `## 📐 推导与实现

### 一、标准BSGS推导

**目标**：a^x ≡ b (mod p)，gcd(a,p) = 1

设 m = ⌈√p⌉，x = im - j（i ∈ [1,m], j ∈ [0,m-1]）

> 为什么这样设？因为 x 的范围是 [0, p-1]，而 im-j 可以覆盖 [0, m²-1] ⊇ [0, p-1]

a^(im-j) ≡ b (mod p)
两边乘 a^j：a^(im) ≡ b·a^j (mod p)

**Baby-step**：枚举 j = 0,1,...,m-1，计算 b·a^j mod p，存入 map（值→最小的j）

**Giant-step**：枚举 i = 1,2,...,m，计算 a^(im) mod p = (a^m)^i mod p，在map中查找

找到后 x = im - j，取最小的 x。

**复杂度**：
- 时间：O(m log m) = O(√p log p)（map的log）
- 空间：O(m) = O(√p)
- 用unordered_map可以优化到 O(√p)

### 二、exBSGS（a和p不互质）

当 gcd(a,p) = g > 1 时：

a^x ≡ b (mod p)

若 g ∤ b，则当 x ≥ 1 时无解（因为左边是g的倍数，右边不是）。

若 g | b：两边除以g → a^(x-1) · (a/g) ≡ b/g (mod p/g)

但这还不够，因为 a/g 和 p/g 可能还不互质...

**通用方法**：
1. 不断提取 g = gcd(a, p)，同时除 b
2. 设提取了 k 次后 gcd(a, p') = 1
3. 此时方程变为 a^(x-k) · C ≡ b' (mod p')
4. 用标准BSGS解 a^(x-k) ≡ b'·C⁻¹ (mod p')

\`\`\`
// exBSGS核心思路
int exBSGS(int a, int b, int p) {
    a %= p; b %= p;
    if (b == 1 || p == 1) return 0;
    int cnt = 0, D = 1;
    for (int g = gcd(a, p); g > 1; g = gcd(a, p)) {
        if (b % g) return -1;  // 无解
        p /= g; b /= g;
        D = (long long)D * (a / g) % p;
        cnt++;
        if (D == b) return cnt;
    }
    // 现在gcd(a,p)=1，用标准BSGS
    // 解 a^(x-cnt) ≡ b * D^(-1) (mod p)
    ...
}
\`\`\`

| 算法 | 条件 | 复杂度 |
|------|------|--------|
| BSGS | gcd(a,p)=1 | O(√p log p) |
| exBSGS | 无限制 | O(√p log p) |`,

    code: `// 完整代码示例：BSGS（洛谷P3846）
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll qpow(ll a, ll b, ll p) {
    ll res = 1; a %= p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}

// BSGS：求最小的非负整数x使得 a^x ≡ b (mod p)，gcd(a,p)=1
ll BSGS(ll a, ll b, ll p) {
    a %= p; b %= p;
    if (b == 1 || p == 1) return 0;
    ll m = ceil(sqrt(p));
    unordered_map<ll, ll> mp;  // 存 b*a^j -> j
    ll cur = b % p;
    for (ll j = 0; j < m; j++) {
        mp[cur] = j;  // 保留最小的j
        cur = cur * a % p;
    }
    ll am = qpow(a, m, p);  // a^m
    cur = am;
    for (ll i = 1; i <= m; i++) {
        if (mp.count(cur)) {
            ll ans = i * m - mp[cur];
            return ans;
        }
        cur = cur * am % p;
    }
    return -1;  // 无解
}

// exBSGS：a和p不一定互质
ll exBSGS(ll a, ll b, ll p) {
    a %= p; b %= p;
    if (b == 1 || p == 1) return 0;
    ll cnt = 0, D = 1;
    for (ll g = __gcd(a, p); g > 1; g = __gcd(a, p)) {
        if (b % g) return -1;
        p /= g; b /= g;
        D = D * (a / g) % p;
        cnt++;
        if (D == b) return cnt;
    }
    // 现在gcd(a,p)=1，转化为 a^(x-cnt) ≡ b/D (mod p)
    ll invD = qpow(D, p - 2, p);  // D的逆元（p此时是质数或用exgcd）
    ll target = b * invD % p;
    ll res = BSGS(a, target, p);
    if (res == -1) return -1;
    return res + cnt;
}

int main() {
    ll a, b, p;
    while (scanf("%lld%lld%lld", &p, &a, &b) != EOF) {
        ll ans = BSGS(a, b, p);
        if (ans == -1) puts("no solution");
        else printf("%lld\\n", ans);
    }
    return 0;
}`
  },

  'ch6_6_1_intro': {
    problemDesc: `## 🌟 6.6.1 排列组合

### 这是什么问题？

生活中处处是排列组合！

- 从5个人中选3个人组队，有多少种选法？（**组合** C(5,3)）
- 5个人排成一排拍照，有多少种排法？（**排列** A(5,5) = 5!）
- 把10个不同的球放进3个不同的盒子，有多少种放法？

排列组合是**计数**的基础！在OI中，几乎每场考试都有计数题。

核心问题：
1. 求排列数 A(n,m) = n!/(n-m)!
2. 求组合数 C(n,m) = n!/(m!·(n-m)!)
3. 取模运算下的组合数（Lucas定理等）`,

    idea: `## 💡 算法思想

### 一、基本计数原理

- **加法原理**：完成一件事有n类方法，第i类有aᵢ种，总共 a₁+a₂+...+aₙ 种
- **乘法原理**：完成一件事有n步，第i步有aᵢ种，总共 a₁·a₂·...·aₙ 种

> 🎯 比喻：加法是"或者"，乘法是"然后"。

### 二、排列与组合

- **排列** A(n,m)：从n个**不同**元素中选m个**排顺序** → n!/(n-m)!
- **组合** C(n,m)：从n个**不同**元素中选m个**不排顺序** → n!/(m!(n-m)!)

> 🧠 关系：C(n,m) = A(n,m) / m!（排列去掉顺序就是组合）

### 三、计算方法

1. **递推（杨辉三角）**：C(n,m) = C(n-1,m-1) + C(n-1,m)
2. **阶乘+逆元**：C(n,m) = n! · (m!)⁻¹ · ((n-m)!)⁻¹ mod p
3. **Lucas定理**：当p是质数，C(n,m) mod p = C(n/p, m/p) · C(n%p, m%p) mod p

### 四、特殊技巧

- **隔板法**：把n个相同球放进k个不同盒子（每盒至少1个）→ C(n-1, k-1)
- **多重集组合**：有重复元素的组合`,

    derivation: `## 📐 推导与实现

### 一、杨辉三角（帕斯卡三角）

C(n,0)=1, C(n,n)=1
C(n,m) = C(n-1,m-1) + C(n-1,m)

\`\`\`
C[0][0] = 1;
for (int i = 1; i <= n; i++)
    for (int j = 0; j <= i; j++)
        C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
\`\`\`

**复杂度**：O(n²)，适合 n ≤ 5000。

### 二、阶乘+逆元 O(N)

预处理阶乘和阶乘的逆元：

\`\`\`
fact[0] = 1;
for (int i = 1; i <= N; i++) fact[i] = fact[i-1] * i % MOD;
inv_fact[N] = qpow(fact[N], MOD - 2);  // 费马小定理
for (int i = N - 1; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;

ll C(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fact[n] % MOD * inv_fact[m] % MOD * inv_fact[n-m] % MOD;
}
\`\`\`

### 三、Lucas定理

**定理**：p为质数时，C(n,m) mod p = C(⌊n/p⌋, ⌊m/p⌋) · C(n%p, m%p) mod p

**推导**：把n,m写成p进制，逐位计算组合数再相乘。

\`\`\`
ll lucas(ll n, ll m, ll p) {
    if (m == 0) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
\`\`\`

**复杂度**：O(p + log_p(n)·log p)，适合 n 很大但 p 不太大（p ≤ 10^5）。

| 方法 | 适用条件 | 复杂度 |
|------|---------|--------|
| 杨辉三角 | n较小 | O(n²) |
| 阶乘+逆元 | 模数为质数 | O(N)预处理，O(1)查询 |
| Lucas | n很大，p较小且为质数 | O(p + log²n) |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int MOD = 1e9 + 7;
const int MAXN = 200005;

ll fact[MAXN], inv_fact[MAXN];

ll qpow(ll a, ll b, ll p) {
    ll res = 1; a %= p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p; b >>= 1;
    }
    return res;
}

void init() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++)
        fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = qpow(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

// 组合数 C(n,m) mod MOD
ll C(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fact[n] % MOD * inv_fact[m] % MOD * inv_fact[n-m] % MOD;
}

// 排列数 A(n,m) mod MOD
ll A(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fact[n] % MOD * inv_fact[n-m] % MOD;
}

// Lucas定理（p为质数）
ll lucas(ll n, ll m, ll p) {
    if (m == 0) return 1;
    // 需要小范围的C函数
    ll fn = 1, fm = 1, fnm = 1;
    ll nn = n % p, mm = m % p;
    for (int i = 1; i <= nn; i++) fn = fn * i % p;
    for (int i = 1; i <= mm; i++) fm = fm * i % p;
    for (int i = 1; i <= nn-mm; i++) fnm = fnm * i % p;
    ll small_C = fn % p * qpow(fm, p-2, p) % p * qpow(fnm, p-2, p) % p;
    return small_C * lucas(n/p, m/p, p) % p;
}

int main() {
    init();
    int n, m;
    cin >> n >> m;
    cout << "C(" << n << "," << m << ") = " << C(n, m) << endl;
    return 0;
}`
  },

  'ch6_6_2_intro': {
    problemDesc: `## 🌟 6.6.2 卡特兰数 & 斯特林数

### 这是什么问题？

有些计数问题看起来各不相同，但答案都是同一个数列——**卡特兰数**！

- n对括号有多少种合法匹配方式？
- n个节点能构成多少种不同的二叉搜索树？
- 从(0,0)走到(n,n)，每步向右或向上，不越过对角线，有多少种走法？

答案都是 Cₙ = C(2n,n)/(n+1)！

而**斯特林数**解决的是另一类问题：
- 把n个不同的球放进k个**相同的**盒子（第一类/第二类斯特林数）

这些特殊数列在高级计数题中频繁出现！`,

    idea: `## 💡 算法思想

### 一、卡特兰数（Catalan Number）

**定义**：C₀=1, Cₙ = Σ Cᵢ·Cₙ₋₁₋ᵢ（i=0到n-1）

**通项公式**：Cₙ = C(2n, n) / (n+1) = (2n)! / (n! · (n+1)!)

**前几项**：1, 1, 2, 5, 14, 42, 132, 429...

> 🎯 经典模型：
> - 合法括号序列
> - 栈的出栈序列
> - 二叉树计数
> - 不越对角线的格路

### 二、第一类斯特林数 s(n,k)

**定义**：n个不同元素分成k个**圆排列**（环）的方案数。

**递推**：s(n,k) = s(n-1,k-1) + (n-1)·s(n-1,k)

> 🧠 第n个元素：要么自己成一个环（s(n-1,k-1)），要么插入前n-1个元素的某个环中（(n-1)种位置）

### 三、第二类斯特林数 S(n,k)

**定义**：n个不同元素分成k个**非空集合**的方案数。

**递推**：S(n,k) = S(n-1,k-1) + k·S(n-1,k)

> 🧠 第n个元素：要么自己成一个集合（S(n-1,k-1)），要么放入已有的k个集合之一（k种选择）

### 四、计算方法

都可以用递推 O(n²) 或 NTT 优化到 O(n log n)。`,

    derivation: `## 📐 推导与实现

### 一、卡特兰数

**通项推导**（以括号序列为例）：

总路径数 = C(2n, n)（从2n步中选n步向上）
不合法路径 = C(2n, n-1)（反射原理）
合法路径 = C(2n,n) - C(2n,n-1) = C(2n,n)/(n+1)

\`\`\`
ll catalan(int n, ll p) {
    return C(2*n, n, p) % p * qpow(n + 1, p - 2, p) % p;
}
\`\`\`

**递推**：
\`\`\`
cat[0] = 1;
for (int i = 1; i <= n; i++)
    for (int j = 0; j < i; j++)
        cat[i] = (cat[i] + cat[j] * cat[i-1-j]) % MOD;
\`\`\`

### 二、第一类斯特林数（递推）

s(n,k) = s(n-1,k-1) + (n-1)·s(n-1,k)

\`\`\`
ll s[MAXN][MAXN];  // 第一类斯特林数
s[0][0] = 1;
for (int i = 1; i <= n; i++)
    for (int k = 1; k <= i; k++)
        s[i][k] = (s[i-1][k-1] + (i-1) * s[i-1][k]) % MOD;
\`\`\`

**行和**：Σₖ s(n,k) = n!（所有圆排列的总和 = 全排列）

### 三、第二类斯特林数（递推）

S(n,k) = S(n-1,k-1) + k·S(n-1,k)

\`\`\`
ll S[MAXN][MAXN];  // 第二类斯特林数
S[0][0] = 1;
for (int i = 1; i <= n; i++)
    for (int k = 1; k <= i; k++)
        S[i][k] = (S[i-1][k-1] + k * S[i-1][k]) % MOD;
\`\`\`

**行和**：Σₖ S(n,k)·k! = 把n个不同球放进k个不同盒子的方案（贝尔数相关）

**通项**（容斥）：S(n,k) = (1/k!) · Σⱼ₌₀ᵏ (-1)^(k-j) · C(k,j) · j^n

| 数列 | 递推 | 通项 | 应用 |
|------|------|------|------|
| 卡特兰数 | O(n²) | O(1)（需预处理阶乘） | 括号/二叉树/格路 |
| 第一类Stirling | O(n²) | 行生成函数 | 圆排列/置换 |
| 第二类Stirling | O(n²) | 容斥O(klogn) | 集合划分/放球 |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int MOD = 998244353;
const int MAXN = 200005;

ll fact[MAXN], inv_fact[MAXN];

ll qpow(ll a, ll b, ll p) {
    ll res = 1; a %= p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p; b >>= 1;
    }
    return res;
}

void init() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = qpow(fact[MAXN-1], MOD-2, MOD);
    for (int i = MAXN-2; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

ll C(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fact[n] % MOD * inv_fact[m] % MOD * inv_fact[n-m] % MOD;
}

// 卡特兰数 C_n = C(2n,n)/(n+1)
ll catalan(int n) {
    return C(2*n, n) % MOD * qpow(n+1, MOD-2, MOD) % MOD;
}

// 第二类斯特林数（递推）
ll S[1005][1005];
void init_stirling(int n) {
    S[0][0] = 1;
    for (int i = 1; i <= n; i++)
        for (int k = 1; k <= i; k++)
            S[i][k] = (S[i-1][k-1] + k * S[i-1][k]) % MOD;
}

// 第二类斯特林数（通项，单点查询）
// S(n,k) = 1/k! * sum_{j=0}^{k} (-1)^{k-j} * C(k,j) * j^n
ll stirling2(int n, int k) {
    ll res = 0;
    for (int j = 0; j <= k; j++) {
        ll term = C(k, j) * qpow(j, n, MOD) % MOD;
        if ((k - j) % 2 == 1) res = (res - term + MOD) % MOD;
        else res = (res + term) % MOD;
    }
    res = res * inv_fact[k] % MOD;
    return res;
}

int main() {
    init();
    int n;
    cin >> n;
    cout << "Catalan(" << n << ") = " << catalan(n) << endl;
    return 0;
}`
  },

  'ch6_6_3_intro': {
    problemDesc: `## 🌟 6.6.3 容斥原理

### 这是什么问题？

想象你在统计班级里喜欢数学或语文的人数：
- 喜欢数学的有20人
- 喜欢语文的有15人
- 两科都喜欢的有5人

问：至少喜欢一科的有多少人？

答案 = 20 + 15 - 5 = 30（减去重复计算的）

这就是**容斥原理**的核心思想：**先加后减，交替进行**！

当问题变成"求不满足任何条件的方案数"时，容斥原理就派上大用场了！

经典题目：洛谷 P3164【HAOI2011】Problem b（莫比乌斯反演+容斥）`,

    idea: `## 💡 算法思想

### 一、基本公式

|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ...

> 🎯 比喻：像荡秋千一样，一加一减，来回摆动！

### 二、补集形式（更常用）

**不满足任何条件的方案数** = 总数 - 至少满足一个条件的方案数

= Σ(-1)^|S| · (满足S中所有条件的方案数)

其中 S 遍历所有条件子集。

### 三、应用

1. **错排问题**：n个元素的错排数 = Σ(-1)^k · C(n,k) · (n-k)!
2. **互质计数**：1~n中和m互质的数的个数
3. **莫比乌斯反演**：本质就是容斥！
4. **带限制的组合计数**

### 四、实现

通常用**二进制枚举**子集，复杂度 O(2^n · 单次计算)。

当条件数n ≤ 20 时完全可行！`,

    derivation: `## 📐 推导与实现

### 一、容斥原理的证明

**Venn图直觉**：
- 两个集合：|A∪B| = |A| + |B| - |A∩B|
  - 加|A|和|B|时，A∩B被算了两次，减一次刚好
- 三个集合：|A∪B∪C| = |A|+|B|+|C| - |A∩B|-|A∩C|-|B∩C| + |A∩B∩C|

**一般证明**（数学归纳法或计数论证）：
对于恰好属于k个集合的元素，在右边被计算了 C(k,1) - C(k,2) + C(k,3) - ... = 1 次（k≥1时）。

### 二、错排公式

n个元素的错排（每个元素都不在自己位置）：

D(n) = n! · (1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n!)
     = Σ_{k=0}^{n} (-1)^k · C(n,k) · (n-k)!
     = Σ_{k=0}^{n} (-1)^k · n! / k!

**推导**：
- 全集 = n!（所有排列）
- Aᵢ = 第i个元素在自己位置的排列
- |Aᵢ| = (n-1)!，|Aᵢ∩Aⱼ| = (n-2)!，...
- |A₁∪...∪Aₙ| = C(n,1)·(n-1)! - C(n,2)·(n-2)! + ...
- D(n) = n! - |A₁∪...∪Aₙ| = Σ(-1)^k · C(n,k)·(n-k)!

### 三、代码实现框架

\`\`\`
ll ans = 0;
for (int S = 0; S < (1 << n); S++) {
    int cnt = __builtin_popcount(S);  // 选了几个条件
    ll ways = calc(S);  // 满足S中所有条件的方案数
    if (cnt % 2 == 0) ans += ways;
    else ans -= ways;
}
\`\`\`

### 四、经典应用：1~n中与m互质的数的个数

m的质因子为p₁,p₂,...,pₖ

答案 = n - Σ⌊n/pᵢ⌋ + Σ⌊n/(pᵢpⱼ)⌋ - ...

= Σ_{S⊆{p₁,...,pₖ}} (-1)^|S| · ⌊n/∏_{p∈S} p⌋

| 应用 | 条件数 | 复杂度 |
|------|--------|--------|
| 错排 | n | O(n) |
| 互质计数 | k（质因子个数） | O(2^k) |
| 一般容斥 | n | O(2^n · calc) |`,

    code: `// 完整代码示例
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

// 例1：错排数 D(n)
const int MOD = 1e9 + 7;
const int MAXN = 100005;
ll fact[MAXN];

void init() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
}

// 错排数 D(n) = sum (-1)^k * n!/k!
ll derangement(int n) {
    ll res = 0;
    for (int k = 0; k <= n; k++) {
        ll term = fact[n] % MOD * /* inv_fact[k] */ 1 % MOD; // 简化
        if (k % 2 == 0) res = (res + term) % MOD;
        else res = (res - term + MOD) % MOD;
    }
    return res;
}

// 例2：1~n中与m互质的数的个数（容斥）
ll count_coprime(ll n, ll m) {
    // 先找m的质因子
    vector<ll> primes;
    for (ll i = 2; i * i <= m; i++) {
        if (m % i == 0) {
            primes.push_back(i);
            while (m % i == 0) m /= i;
        }
    }
    if (m > 1) primes.push_back(m);
    
    int k = primes.size();
    ll ans = 0;
    // 二进制枚举子集
    for (int S = 0; S < (1 << k); S++) {
        ll prod = 1;
        int cnt = 0;
        for (int i = 0; i < k; i++) {
            if (S >> i & 1) {
                prod *= primes[i];
                cnt++;
            }
        }
        ll term = n / prod;
        if (cnt % 2 == 0) ans += term;
        else ans -= term;
    }
    return ans;
}

int main() {
    ll n, m;
    cin >> n >> m;
    cout << count_coprime(n, m) << endl;
    return 0;
}`
  },

  'ch6_7_1_intro': {
    problemDesc: `## 🌟 6.7.1 矩阵

### 这是什么问题？

矩阵就是一个**数表**——m行n列的数字排列。但别小看它！

- 解方程组？矩阵！
- 图上的路径计数？矩阵乘法！
- 递推数列的第n项？矩阵快速幂！
- 图形变换（旋转、缩放）？矩阵！

在OI中，矩阵最重要的应用是**矩阵快速幂**——把O(n)的递推优化到O(log n)！

经典题目：洛谷 P3390【矩阵快速幂】、斐波那契数列第n项`,

    idea: `## 💡 算法思想

### 一、矩阵基础

- **矩阵乘法**：C[i][j] = Σ A[i][k] · B[k][j]
- **单位矩阵** I：对角线为1，其余为0。A·I = A
- **矩阵快速幂**：A^n = A·A·...·A，用快速幂优化到 O(k³ log n)

> 🎯 比喻：矩阵乘法就像"流水线"——输入一个向量，经过矩阵变换，输出新向量。

### 二、矩阵快速幂的应用

**核心思想**：把递推关系写成矩阵形式！

比如斐波那契：F(n) = F(n-1) + F(n-2)

写成矩阵：
[F(n)  ]   [1 1]   [F(n-1)]
[F(n-1)] = [1 0] · [F(n-2)]

所以 [F(n), F(n-1)]^T = M^(n-2) · [F(2), F(1)]^T

用矩阵快速幂，O(log n) 搞定！

### 三、常见递推的矩阵构造

| 递推 | 矩阵 |
|------|------|
| F(n) = F(n-1) + F(n-2) | [[1,1],[1,0]] |
| F(n) = a·F(n-1) + b·F(n-2) | [[a,b],[1,0]] |
| 带常数的递推 | 增加一维存常数 |`,

    derivation: `## 📐 推导与实现

### 一、矩阵乘法

\`\`\`
struct Matrix {
    ll a[105][105];
    int n, m;  // n行m列
};

Matrix mul(Matrix A, Matrix B) {
    Matrix C;
    C.n = A.n; C.m = B.m;
    memset(C.a, 0, sizeof(C.a));
    for (int i = 0; i < C.n; i++)
        for (int k = 0; k < A.m; k++)
            for (int j = 0; j < C.m; j++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
    return C;
}
\`\`\`

**复杂度**：O(n³)（或优化到 O(n^2.8) 的Strassen，但OI不常用）

### 二、矩阵快速幂

\`\`\`
Matrix qpow(Matrix A, ll b) {
    Matrix res;
    res.n = res.m = A.n;
    memset(res.a, 0, sizeof(res.a));
    for (int i = 0; i < res.n; i++) res.a[i][i] = 1;  // 单位矩阵
    while (b) {
        if (b & 1) res = mul(res, A);
        A = mul(A, A);
        b >>= 1;
    }
    return res;
}
\`\`\`

**复杂度**：O(k³ log n)，k是矩阵大小。

### 三、斐波那契数列示例

F(n) = F(n-1) + F(n-2)，F(1)=F(2)=1

构造转移矩阵 M = [[1,1],[1,0]]

[F(n)  ]       [F(2)]   [1]
[F(n-1)] = M^(n-2) · [F(1)] = M^(n-2) · [1]

\`\`\`
ll fib(ll n) {
    if (n <= 2) return 1;
    Matrix M;
    M.n = M.m = 2;
    M.a[0][0] = 1; M.a[0][1] = 1;
    M.a[1][0] = 1; M.a[1][1] = 0;
    Matrix res = qpow(M, n - 2);
    return (res.a[0][0] + res.a[0][1]) % MOD;
}
\`\`\`

| 操作 | 复杂度 |
|------|--------|
| 矩阵乘法 | O(k³) |
| 矩阵快速幂 | O(k³ log n) |
| 斐波那契第n项 | O(log n) |`,

    code: `// 完整代码示例：矩阵快速幂（洛谷P3390）
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const ll MOD = 1e9 + 7;

struct Matrix {
    ll a[105][105];
    int n;
    Matrix(int _n) : n(_n) {
        memset(a, 0, sizeof(a));
    }
};

// 矩阵乘法
Matrix mul(const Matrix &A, const Matrix &B) {
    Matrix C(A.n);
    for (int i = 0; i < A.n; i++)
        for (int k = 0; k < A.n; k++)
            if (A.a[i][k])  // 小优化
                for (int j = 0; j < A.n; j++)
                    C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
    return C;
}

// 矩阵快速幂
Matrix qpow(Matrix A, ll b) {
    Matrix res(A.n);
    for (int i = 0; i < A.n; i++) res.a[i][i] = 1;  // 单位矩阵
    while (b) {
        if (b & 1) res = mul(res, A);
        A = mul(A, A);
        b >>= 1;
    }
    return res;
}

int main() {
    ll n, k;
    scanf("%lld%lld", &n, &k);
    Matrix A(n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%lld", &A.a[i][j]);
    Matrix res = qpow(A, k);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            printf("%lld ", res.a[i][j]);
        puts("");
    }
    return 0;
}`
  },

  'ch6_7_2_intro': {
    problemDesc: `## 🌟 6.7.2 高斯消元

### 这是什么问题？

给你n个未知数、n个方程，求每个未知数的值：

2x + y - z = 8
-3x - y + 2z = -11
-2x + y + 2z = -3

这就是**线性方程组**！初中你就学过用"消元法"解方程组，而**高斯消元**就是系统化的消元法。

在OI中，高斯消元常用于：
- 解线性方程组
- 求矩阵的秩/行列式
- 结合异或运算解**异或方程组**

经典题目：洛谷 P3389【高斯消元】、洛谷 P2447【异或方程组】`,

    idea: `## 💡 算法思想

### 一、高斯消元的基本步骤

> 🎯 比喻：就像整理书桌——把东西一层层归位。

**两个阶段**：

1. **前向消元**：把增广矩阵化成上三角形（行阶梯形）
   - 选主元（选绝对值最大的行，减少误差）
   - 用主元行消去下面行的对应列
   
2. **回代**：从最后一行往上，依次求出每个未知数

### 二、解的情况

- **唯一解**：化成上三角后，每行都有主元
- **无解**：出现 0 = 非零数 的行
- **无穷多解**：出现 0 = 0 的行（自由变量）

### 三、异或方程组

当所有运算都是异或（mod 2）时，高斯消元更简单：
- 不需要选主元（没有精度问题）
- 加减法都变成异或
- 常用于"开关问题"、"翻转问题"

### 四、复杂度

O(n³)，n是未知数个数。`,

    derivation: `## 📐 推导与实现

### 一、高斯消元算法

**增广矩阵**：把系数和常数放一起

\`\`\`
[2  1 -1 |  8]
[-3 -1  2 | -11]
[-2  1  2 | -3]
\`\`\`

**第1步**：用第1行消去第2、3行的第1列
- R2 = R2 - (-3/2)·R1
- R3 = R3 - (-2/2)·R1

**第2步**：用第2行消去第3行的第2列

**最终得到上三角**：
\`\`\`
[2  1  -1  |  8 ]
[0  1/2 1/2 | 1/2]
[0  0   3   |  6 ]
\`\`\`

**回代**：
- z = 6/3 = 2
- y = (1/2 - 1/2·2)/(1/2) = ...
- x = ...

### 二、代码实现

\`\`\`
int gauss(double a[][MAXN], double x[], int n) {
    for (int i = 0; i < n; i++) {
        // 选主元
        int pivot = i;
        for (int j = i + 1; j < n; j++)
            if (fabs(a[j][i]) > fabs(a[pivot][i]))
                pivot = j;
        swap(a[i], a[pivot]);
        
        if (fabs(a[i][i]) < EPS) continue;  // 这列没有主元
        
        // 消元
        for (int j = i + 1; j < n; j++) {
            double factor = a[j][i] / a[i][i];
            for (int k = i; k <= n; k++)
                a[j][k] -= factor * a[i][k];
        }
    }
    
    // 回代
    for (int i = n - 1; i >= 0; i--) {
        x[i] = a[i][n];
        for (int j = i + 1; j < n; j++)
            x[i] -= a[i][j] * x[j];
        x[i] /= a[i][i];
    }
}
\`\`\`

### 三、异或方程组

\`\`\`
// 用bitset优化，O(n^3/64)
bitset<MAXN> a[MAXN];
int n;

bool xor_gauss() {
    for (int i = 0; i < n; i++) {
        int pivot = i;
        while (pivot < n && !a[pivot][i]) pivot++;
        if (pivot == n) return false;  // 无解或多解
        swap(a[i], a[pivot]);
        for (int j = 0; j < n; j++)
            if (j != i && a[j][i])
                a[j] ^= a[i];
    }
    return true;  // 唯一解，存在a[i][n]中
}
\`\`\`

| 类型 | 复杂度 | 特点 |
|------|--------|------|
| 实数高斯消元 | O(n³) | 注意精度 |
| 异或高斯消元 | O(n³/64) | bitset优化 |`,

    code: `// 完整代码示例：高斯消元（洛谷P3389）
#include <bits/stdc++.h>
using namespace std;

const double EPS = 1e-9;
const int MAXN = 105;

double a[MAXN][MAXN];  // 增广矩阵
double x[MAXN];        // 解
int n;

// 高斯消元，返回0唯一解，1无解，2无穷多解
int gauss() {
    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int j = i + 1; j < n; j++)
            if (fabs(a[j][i]) > fabs(a[pivot][i]))
                pivot = j;
        if (fabs(a[pivot][i]) < EPS) continue;
        for (int k = 0; k <= n; k++)
            swap(a[i][k], a[pivot][k]);
        
        double inv = 1.0 / a[i][i];
        for (int k = i; k <= n; k++) a[i][k] *= inv;
        
        for (int j = 0; j < n; j++) {
            if (j == i) continue;
            double factor = a[j][i];
            for (int k = i; k <= n; k++)
                a[j][k] -= factor * a[i][k];
        }
    }
    
    for (int i = 0; i < n; i++) {
        bool all_zero = true;
        for (int j = 0; j < n; j++)
            if (fabs(a[i][j]) > EPS) { all_zero = false; break; }
        if (all_zero && fabs(a[i][n]) > EPS) return 1;  // 无解
        if (all_zero) return 2;  // 无穷多解
    }
    
    for (int i = 0; i < n; i++) x[i] = a[i][n];
    return 0;
}

int main() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= n; j++)
            scanf("%lf", &a[i][j]);
    int res = gauss();
    if (res == 0) {
        for (int i = 0; i < n; i++)
            printf("%.2f\\n", x[i]);
    } else if (res == 1) puts("No solution");
    else puts("Infinite solutions");
    return 0;
}`
  },

  'ch6_7_3_intro': {
    problemDesc: `## 🌟 6.7.3 线性基

### 这是什么问题？

给你n个数，每个数都可以选或不选。问：选出的数的**异或和**能产生多少种不同的值？

或者：选出的数的异或和中，第k小的是多少？最大的是多少？

> 🎯 比喻：线性基就像一组"密码钥匙"——用最少的钥匙，就能打开所有可能的"密码锁"（异或值）。

**线性基**是一组数，它和原集合有**相同的异或生成空间**，但个数最少（且线性无关）。

经典题目：洛谷 P3812【线性基模板】、WC2011 最大XOR和路径`,

    idea: `## 💡 算法思想

### 一、什么是线性基？

给定一个数的集合S，线性基是一组数B = {b₁, b₂, ..., bₖ}，满足：
1. B中元素**线性无关**（任意一个不能被其他的异或出来）
2. S中每个数都能用B中元素的异或表示
3. |B| 最小

> 🎯 比喻：就像向量的基——用最少的基向量表示整个空间。这里是"异或空间"的基！

### 二、线性基的性质

1. 线性基的大小 ≤ log₂(max_value)（比如64位整数最多64个）
2. 异或空间中有 2^|B| 种不同的异或值
3. 可以用**贪心**求最大异或值

### 三、插入操作

对于每个数x，从高位到低位：
- 如果x的第i位是1：
  - 如果b[i]为空，把x放在b[i]，结束
  - 如果b[i]有值，x = x ⊕ b[i]，继续往下

### 四、查询操作

- **最大异或值**：从高位到低位贪心，能异或就异或
- **第k小异或值**：把线性基化成"最简形式"，然后按k的二进制位选`,

    derivation: `## 📐 推导与实现

### 一、构建线性基

\`\`\`
ll b[64];  // b[i]表示最高位为i的基向量

bool insert(ll x) {
    for (int i = 62; i >= 0; i--) {
        if (!(x >> i & 1)) continue;
        if (!b[i]) { b[i] = x; return true; }
        x ^= b[i];
    }
    return false;  // x已经能被表示了
}
\`\`\`

**复杂度**：每个数 O(log(max_val))，总共 O(n log(max_val))。

**正确性**：每次插入要么新增一个基向量，要么x被消成0（说明x已经在生成空间中）。

### 二、查询最大异或值

\`\`\`
ll query_max() {
    ll res = 0;
    for (int i = 62; i >= 0; i--)
        res = max(res, res ^ b[i]);  // 能变大就异或
    return res;
}
\`\`\`

**贪心正确性**：高位比所有低位加起来还大（2^i > 2^(i-1) + ... + 1），所以从高位贪心是对的。

### 三、查询第k小异或值

先把线性基**重构**成最简形式（每个b[i]的第j位(j≠i)都是0）：

\`\`\`
void rebuild() {
    for (int i = 62; i >= 0; i--)
        for (int j = i - 1; j >= 0; j--)
            if (b[i] >> j & 1)
                b[i] ^= b[j];
}

ll query_kth(ll k) {
    // 把非零的基向量提取出来
    vector<ll> basis;
    for (int i = 0; i <= 62; i++)
        if (b[i]) basis.push_back(b[i]);
    if (k > (1LL << basis.size())) return -1;  // 不存在
    k--;  // 从0开始
    ll res = 0;
    for (int i = 0; i < basis.size(); i++)
        if (k >> i & 1) res ^= basis[i];
    return res;
}
\`\`\`

| 操作 | 复杂度 |
|------|--------|
| 插入 | O(log V) |
| 查询最大值 | O(log V) |
| 查询第k小 | O(log V)（需rebuild） |
| 构建 | O(n log V) |`,

    code: `// 完整代码示例：线性基（洛谷P3812）
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct LinearBasis {
    ll b[64];  // b[i]：最高位为i的基
    int cnt;   // 基的个数
    
    LinearBasis() {
        memset(b, 0, sizeof(b));
        cnt = 0;
    }
    
    // 插入一个数
    bool insert(ll x) {
        for (int i = 62; i >= 0; i--) {
            if (!(x >> i & 1)) continue;
            if (!b[i]) {
                b[i] = x;
                cnt++;
                return true;
            }
            x ^= b[i];
        }
        return false;  // 已经在生成空间中
    }
    
    // 查询最大异或值
    ll query_max() {
        ll res = 0;
        for (int i = 62; i >= 0; i--)
            res = max(res, res ^ b[i]);
        return res;
    }
    
    // 查询最小异或值（非空子集）
    ll query_min() {
        for (int i = 0; i <= 62; i++)
            if (b[i]) return b[i];
        return 0;
    }
    
    // 重构为最简形式（用于查询第k小）
    void rebuild() {
        for (int i = 62; i >= 0; i--)
            for (int j = i - 1; j >= 0; j--)
                if (b[i] >> j & 1)
                    b[i] ^= b[j];
    }
    
    // 查询第k小（1-indexed，需要rebuild）
    ll query_kth(ll k) {
        vector<ll> basis;
        for (int i = 0; i <= 62; i++)
            if (b[i]) basis.push_back(b[i]);
        int sz = basis.size();
        if (k > (1LL << sz)) return -1;
        k--;
        ll res = 0;
        for (int i = 0; i < sz; i++)
            if (k >> i & 1) res ^= basis[i];
        return res;
    }
};

int main() {
    int n;
    scanf("%d", &n);
    LinearBasis lb;
    for (int i = 0; i < n; i++) {
        ll x;
        scanf("%lld", &x);
        lb.insert(x);
    }
    printf("%lld\\n", lb.query_max());
    return 0;
}`
  },

  'ch6_12_1_intro': {
    problemDesc: `## 🌟 6.12.1 三分法

### 这是什么问题？

想象你站在一条山谷中，想知道**最低点**在哪里。你只能感受到脚下的坡度。

如果这个山谷是**单峰**的（只有一个谷底，左边递减右边递增），那你可以用**三分法**快速找到最低点！

数学上：求一个**单峰函数** f(x) 在 [l, r] 上的极值点。

> 🎯 单峰函数：先严格递减再严格递增（下凸），或先递增后递减（上凸）。

经典题目：求抛物线顶点、求黄金分割点、各种凸函数优化。

三分法是**二分法的升级版**——二分找零点，三分找极值！`,

    idea: `## 💡 算法思想

### 一、从二分法说起

二分法：在单调函数上找零点。每次取中点，判断零点在左半还是右半，区间减半。

### 二、三分法

单峰函数上找极值，每次取**两个**中点！

> 🎯 比喻：想象你在山谷里，派两个侦察兵分别走到1/3和2/3的位置，比较他们的高度——谁更高，谁那一侧就不可能是谷底！

**步骤**（求最小值，下凸函数）：
1. 取 m₁ = l + (r-l)/3, m₂ = r - (r-l)/3
2. 比较 f(m₁) 和 f(m₂)：
   - 若 f(m₁) < f(m₂)：极值点在 [l, m₂]
   - 若 f(m₁) > f(m₂)：极值点在 [m₁, r]
   - 若相等：极值点在 [m₁, m₂]
3. 重复直到 r-l 足够小

### 三、为什么有效？

- 如果 f(m₁) < f(m₂)，说明 m₂ 在"上坡"段（或m₁在"下坡"段），极值点一定在 m₂ 左边
- 每次区间缩小为原来的 2/3

### 四、整数三分

当定义域是整数时，也可以用整数三分（注意边界处理）。`,

    derivation: `## 📐 推导与实现

### 一、实数三分

\`\`\`
double ternary_search(double l, double r) {
    while (r - l > 1e-9) {  // 精度控制
        double m1 = l + (r - l) / 3;
        double m2 = r - (r - l) / 3;
        if (f(m1) < f(m2))
            r = m2;  // 极值在[l, m2]
        else
            l = m1;  // 极值在[m1, r]
    }
    return f(l);  // 或f((l+r)/2)
}
\`\`\`

**复杂度**：每次区间 × 2/3，迭代次数 = log_{3/2}((r-l)/ε) ≈ 100次（ε=1e-9）。

### 二、整数三分

\`\`\`
int ternary_search_int(int l, int r) {
    while (r - l > 2) {
        int m1 = l + (r - l) / 3;
        int m2 = r - (r - l) / 3;
        if (f(m1) < f(m2))
            r = m2;
        else
            l = m1;
    }
    int ans = l;
    for (int i = l; i <= r; i++)
        if (f(i) < f(ans)) ans = i;
    return ans;
}
\`\`\`

### 三、另一种写法（黄金分割法）

类似二分，只取一个中点，但需要保存上一步的信息。效率略高但实现复杂，OI中不常用。

### 四、注意事项

1. **必须是单峰函数**！多峰函数三分会出错。
2. 实数三分的精度一般设 1e-9 或迭代100次。
3. 整数三分要注意 l+1==r 时的边界。

| 方法 | 适用场景 | 每次缩小区间 |
|------|---------|-------------|
| 二分 | 单调函数找零点 | 1/2 |
| 三分 | 单峰函数找极值 | 2/3 |`,

    code: `// 完整代码示例：三分法求函数极值
#include <bits/stdc++.h>
using namespace std;

// 示例：求 f(x) = x^2 - 4x + 5 的最小值（答案在x=2处，f(2)=1）
double f(double x) {
    return x * x - 4 * x + 5;
}

// 实数三分求最小值（下凸函数）
double ternary_min(double l, double r) {
    for (int i = 0; i < 200; i++) {  // 迭代200次保证精度
        double m1 = l + (r - l) / 3;
        double m2 = r - (r - l) / 3;
        if (f(m1) < f(m2))
            r = m2;
        else
            l = m1;
    }
    return f((l + r) / 2);
}

// 整数三分求最小值
int f_int(int x) {
    return x * x - 4 * x + 5;
}

int ternary_min_int(int l, int r) {
    while (r - l > 2) {
        int m1 = l + (r - l) / 3;
        int m2 = r - (r - l) / 3;
        if (f_int(m1) < f_int(m2))
            r = m2;
        else
            l = m1;
    }
    int ans = l;
    for (int i = l + 1; i <= r; i++)
        if (f_int(i) < f_int(ans)) ans = i;
    return ans;
}

int main() {
    double ans = ternary_min(-100, 100);
    printf("最小值 = %.6f\\n", ans);  // 输出1.000000
    
    int ans_int = ternary_min_int(-100, 100);
    printf("最小值点 x = %d, f(x) = %d\\n", ans_int, f_int(ans_int));
    return 0;
}`
  },

  'ch6_12_2_intro': {
    problemDesc: `## 🌟 6.12.2 自适应辛普森法

### 这是什么问题？

想象你想知道一条弯曲的河流的面积。你没法直接用公式算，但你可以用很多小矩形去"近似"它——这就是**积分**的思想。

**自适应辛普森法**是一种数值积分方法：用抛物线去逼近曲线，自动调整精度，快速求出定积分的近似值！

> 🎯 应用场景：当函数没有初等原函数时（如 e^(-x²)、sin(x)/x），或者函数太复杂无法解析积分时。

经典题目：洛谷 P4525【自适应辛普森积分】`,

    idea: `## 💡 算法思想

### 一、数值积分

求 ∫[a,b] f(x) dx 的近似值。

**基本思路**：用简单的图形（矩形、梯形、抛物线）去逼近曲线下的面积。

### 二、辛普森公式

> 🎯 比喻：用一段抛物线代替曲线，算抛物线下的面积。

**辛普森公式**：
∫[a,b] f(x)dx ≈ (b-a)/6 · [f(a) + 4f((a+b)/2) + f(b)]

用三个点的函数值，构造一条抛物线，算抛物线的积分。

**精度**：对三次多项式精确！

### 三、自适应策略

> 🧠 核心思想：如果整段的辛普森值和分成两半后的辛普森值之差很小，说明精度够了；否则递归细分！

\`\`\`
simpson(a, b) 和 simpson(a, mid) + simpson(mid, b) 的差 < eps？
- 是：返回结果
- 否：递归细分两半
\`\`\`

### 四、复杂度

自适应，取决于函数的"弯曲程度"。光滑函数很快，振荡函数可能较慢。`,

    derivation: `## 📐 推导与实现

### 一、辛普森公式推导

在 [a,b] 上，用三个点 (a,f(a)), (m,f(m)), (b,f(b))（m=(a+b)/2）构造抛物线 p(x)：

∫[a,b] p(x)dx = (b-a)/6 · [f(a) + 4f(m) + f(b)]

**误差**：O((b-a)^5 · f⁽⁴⁾(ξ))，对不超过三次的多项式精确。

### 二、自适应辛普森

\`\`\`
double simpson(double a, double b) {
    double mid = (a + b) / 2;
    return (b - a) / 6 * (f(a) + 4 * f(mid) + f(b));
}

double asr(double a, double b, double eps, double ans) {
    double mid = (a + b) / 2;
    double left = simpson(a, mid);
    double right = simpson(mid, b);
    if (abs(left + right - ans) <= 15 * eps)  // 15倍误差估计
        return left + right + (left + right - ans) / 15;  // Richardson外推
    return asr(a, mid, eps / 2, left) + asr(mid, b, eps / 2, right);
}

double integrate(double a, double b, double eps = 1e-9) {
    return asr(a, b, eps, simpson(a, b));
}
\`\`\`

### 三、关键细节

1. **15倍eps的判断**：经验值，实际误差大约是 |S(a,b) - S(a,m) - S(m,b)| / 15
2. **Richardson外推**：最后加上 (left+right-ans)/15 可以提高精度
3. **eps的选取**：一般 1e-8 到 1e-12

### 四、与其他方法比较

| 方法 | 精度 | 速度 | 特点 |
|------|------|------|------|
| 矩形法 | O(h) | 快 | 最粗糙 |
| 梯形法 | O(h²) | 快 | 较平滑 |
| 辛普森 | O(h⁴) | 中 | 抛物线逼近 |
| 自适应辛普森 | 可控 | 自适应 | 智能细分 |`,

    code: `// 完整代码示例：自适应辛普森积分（洛谷P4525）
#include <bits/stdc++.h>
using namespace std;

// 示例函数：f(x) = (cx+d)/(ax+b) 的不定积分
// 或者任意你需要的函数
double a_coeff, b_coeff, c_coeff, d_coeff;

double f(double x) {
    return (c_coeff * x + d_coeff) / (a_coeff * x + b_coeff);
}

// 辛普森公式
double simpson(double l, double r) {
    double mid = (l + r) / 2;
    return (r - l) / 6.0 * (f(l) + 4 * f(mid) + f(r));
}

// 自适应辛普森递归
// eps: 当前精度要求
// ans: simpson(l, r) 的值
double asr(double l, double r, double eps, double ans) {
    double mid = (l + r) / 2;
    double left = simpson(l, mid);
    double right = simpson(mid, r);
    // 如果左右两半的和与整体之差在误差范围内
    if (fabs(left + right - ans) <= 15 * eps)
        return left + right + (left + right - ans) / 15;
    // 否则递归细分
    return asr(l, mid, eps / 2, left) + asr(mid, r, eps / 2, right);
}

// 积分接口
double integrate(double l, double r, double eps = 1e-9) {
    return asr(l, r, eps, simpson(l, r));
}

int main() {
    // 读入函数参数和积分区间
    double L, R;
    scanf("%lf%lf%lf%lf%lf%lf", &a_coeff, &b_coeff, &c_coeff, &d_coeff, &L, &R);
    printf("%.6f\\n", integrate(L, R));
    return 0;
}`
  }
});
