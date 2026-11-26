/* data/cpp.solutions.js  –  Quadra Code Lab C++ reference solutions */
(function () {
  "use strict";
  const S = {};

  S["basics-1"] = `int sumDigits(int n) {
    int s = 0;
    while (n > 0) { s += n % 10; n /= 10; }
    return s;
}`;

  S["basics-2"] = `bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; ++i)
        if (n % i == 0) return false;
    return true;
}`;

  S["basics-3"] = `long long power(long long base, int exp) {
    long long result = 1;
    while (exp > 0) {
        if (exp & 1) result *= base;
        base *= base;
        exp >>= 1;
    }
    return result;
}`;

  S["basics-4"] = `int romanToInt(const string& s) {
    unordered_map<char,int> v{{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
    int result = 0;
    for (int i = 0; i < (int)s.size(); ++i) {
        if (i+1 < (int)s.size() && v[s[i]] < v[s[i+1]])
            result -= v[s[i]];
        else
            result += v[s[i]];
    }
    return result;
}`;

  S["basics-5"] = `string intToRoman(int num) {
    vector<pair<int,string>> table{{1000,"M"},{900,"CM"},{500,"D"},{400,"CD"},
        {100,"C"},{90,"XC"},{50,"L"},{40,"XL"},{10,"X"},{9,"IX"},
        {5,"V"},{4,"IV"},{1,"I"}};
    string res;
    for (auto& [v,sym] : table)
        while (num >= v) { res += sym; num -= v; }
    return res;
}`;

  S["basics-6"] = `bool isPalindrome(int x) {
    if (x < 0) return false;
    long long rev = 0, orig = x;
    while (x > 0) { rev = rev * 10 + x % 10; x /= 10; }
    return orig == rev;
}`;

  S["strings-7"] = `string reverseStr(string s) {
    reverse(s.begin(), s.end());
    return s;
}`;

  S["strings-8"] = `int countVowels(const string& s) {
    string v = "aeiouAEIOU";
    return count_if(s.begin(), s.end(), [&](char c){ return v.find(c) != string::npos; });
}`;

  S["strings-9"] = `string longestCommonPrefix(vector<string> strs) {
    if (strs.empty()) return "";
    sort(strs.begin(), strs.end());
    const string& a = strs.front();
    const string& b = strs.back();
    int i = 0;
    while (i < (int)a.size() && i < (int)b.size() && a[i] == b[i]) ++i;
    return a.substr(0, i);
}`;

  S["strings-10"] = `bool isAnagram(const string& s, const string& t) {
    if (s.size() != t.size()) return false;
    unordered_map<char,int> cnt;
    for (char c : s) cnt[c]++;
    for (char c : t) { if (--cnt[c] < 0) return false; }
    return true;
}`;

  S["strings-11"] = `string minWindow(const string& s, const string& t) {
    unordered_map<char,int> need;
    for (char c : t) need[c]++;
    int have = 0, formed = need.size();
    unordered_map<char,int> window;
    int best = INT_MAX, bl = 0;
    int l = 0;
    for (int r = 0; r < (int)s.size(); ++r) {
        window[s[r]]++;
        if (need.count(s[r]) && window[s[r]] == need[s[r]]) have++;
        while (have == formed) {
            if (r - l + 1 < best) { best = r - l + 1; bl = l; }
            window[s[l]]--;
            if (need.count(s[l]) && window[s[l]] < need[s[l]]) have--;
            l++;
        }
    }
    return best == INT_MAX ? "" : s.substr(bl, best);
}`;

  S["strings-12"] = `string zigzagConvert(const string& s, int numRows) {
    if (numRows == 1) return s;
    vector<string> rows(numRows);
    int row = 0, step = 1;
    for (char c : s) {
        rows[row] += c;
        if (row == 0) step = 1;
        else if (row == numRows - 1) step = -1;
        row += step;
    }
    string res;
    for (auto& r : rows) res += r;
    return res;
}`;

  S["vectors-13"] = `int maxElement(vector<int> v) {
    return *max_element(v.begin(), v.end());
}`;

  S["vectors-14"] = `int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int k = 1;
    for (int i = 1; i < (int)nums.size(); ++i)
        if (nums[i] != nums[k-1]) nums[k++] = nums[i];
    return k;
}`;

  S["vectors-15"] = `vector<int> twoSum(vector<int> nums, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}`;

  S["vectors-16"] = `void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k %= n;
    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}`;

  S["vectors-17"] = `vector<vector<int>> merge(vector<vector<int>> intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (auto& iv : intervals) {
        if (!res.empty() && iv[0] <= res.back()[1])
            res.back()[1] = max(res.back()[1], iv[1]);
        else
            res.push_back(iv);
    }
    return res;
}`;

  S["vectors-18"] = `int trap(vector<int> height) {
    int l = 0, r = height.size()-1, mL = 0, mR = 0, res = 0;
    while (l <= r) {
        if (mL <= mR) { mL = max(mL, height[l]); res += mL - height[l++]; }
        else          { mR = max(mR, height[r]); res += mR - height[r--]; }
    }
    return res;
}`;

  S["maps-19"] = `map<char,int> charFreq(const string& s) {
    map<char,int> freq;
    for (char c : s) freq[c]++;
    return freq;
}`;

  S["maps-20"] = `bool hasTwoSum(vector<int> nums, int target) {
    unordered_set<int> seen;
    for (int x : nums) {
        if (seen.count(target - x)) return true;
        seen.insert(x);
    }
    return false;
}`;

  S["maps-21"] = `vector<vector<string>> groupAnagrams(vector<string> strs) {
    unordered_map<string, vector<string>> groups;
    for (auto& s : strs) {
        string key = s; sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [k,v] : groups) res.push_back(v);
    return res;
}`;

  S["maps-22"] = `vector<int> topKFrequent(vector<int> nums, int k) {
    unordered_map<int,int> cnt;
    for (int x : nums) cnt[x]++;
    vector<pair<int,int>> pairs(cnt.begin(), cnt.end());
    partial_sort(pairs.begin(), pairs.begin()+k, pairs.end(),
        [](auto& a, auto& b){ return a.second > b.second; });
    vector<int> res;
    for (int i = 0; i < k; ++i) res.push_back(pairs[i].first);
    return res;
}`;

  S["maps-23"] = `int longestConsecutive(vector<int> nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int best = 0;
    for (int n : s) {
        if (!s.count(n-1)) {
            int cur = n;
            while (s.count(cur)) cur++;
            best = max(best, cur - n);
        }
    }
    return best;
}`;

  S["maps-24"] = `int subarraySum(vector<int> nums, int k) {
    unordered_map<int,int> freq{{0,1}};
    int sum = 0, count = 0;
    for (int x : nums) {
        sum += x;
        count += freq[sum - k];
        freq[sum]++;
    }
    return count;
}`;

  S["oop-25"] = `class Rectangle {
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() { return width * height; }
    double perimeter() { return 2 * (width + height); }
private:
    double width, height;
};`;

  S["oop-26"] = `class Counter {
public:
    void increment() { ++n; }
    void decrement() { --n; }
    int value() const { return n; }
private:
    int n = 0;
};`;

  S["oop-27"] = `class Stack {
public:
    void push(int x) { data.push_back(x); }
    int pop() {
        if (data.empty()) throw std::underflow_error("empty");
        int v = data.back(); data.pop_back(); return v;
    }
    int top() const {
        if (data.empty()) throw std::underflow_error("empty");
        return data.back();
    }
    bool empty() const { return data.empty(); }
    int size() const { return data.size(); }
private:
    vector<int> data;
};`;

  S["oop-28"] = `class Shape { public: virtual double area() = 0; };
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return acos(-1.0) * r * r; }
};
class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() override { return w * h; }
};`;

  S["oop-29"] = `struct Node { int val; Node* next; Node(int v):val(v),next(nullptr){} };
class LinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;
public:
    void pushBack(int x) {
        auto n = new Node(x);
        if (!tail) head = tail = n;
        else { tail->next = n; tail = n; }
    }
    void pushFront(int x) {
        auto n = new Node(x);
        n->next = head; head = n;
        if (!tail) tail = n;
    }
    int popFront() {
        if (!head) throw std::underflow_error("empty");
        int v = head->val; Node* old = head;
        head = head->next; if (!head) tail = nullptr;
        delete old; return v;
    }
    vector<int> toVector() const {
        vector<int> res;
        for (Node* c = head; c; c = c->next) res.push_back(c->val);
        return res;
    }
};`;

  S["oop-30"] = `struct BSTNode { int val; BSTNode* left=nullptr; BSTNode* right=nullptr; BSTNode(int v):val(v){} };
class BST {
    BSTNode* root = nullptr;
    BSTNode* ins(BSTNode* n, int v) {
        if (!n) return new BSTNode(v);
        if (v < n->val) n->left = ins(n->left, v);
        else if (v > n->val) n->right = ins(n->right, v);
        return n;
    }
    void inord(BSTNode* n, vector<int>& res) const {
        if (!n) return;
        inord(n->left, res); res.push_back(n->val); inord(n->right, res);
    }
public:
    void insert(int v) { root = ins(root, v); }
    bool contains(int v) const {
        BSTNode* c = root;
        while (c) {
            if (v == c->val) return true;
            c = v < c->val ? c->left : c->right;
        }
        return false;
    }
    vector<int> inorder() const { vector<int> r; inord(root, r); return r; }
};`;

  S["stl-31"] = `vector<int> sortDesc(vector<int> v) {
    sort(v.begin(), v.end(), greater<int>());
    return v;
}`;

  S["stl-32"] = `int countEven(vector<int> v) {
    return count_if(v.begin(), v.end(), [](int n){ return n%2==0; });
}`;

  S["stl-33"] = `vector<int> squares(vector<int> v) {
    transform(v.begin(), v.end(), v.begin(), [](int x){ return x*x; });
    return v;
}`;

  S["stl-34"] = `int rangeSum(vector<int> v, int lo, int hi) {
    return accumulate(v.begin()+lo, v.begin()+hi+1, 0);
}`;

  S["stl-35"] = `vector<int> partitionEvenOdd(vector<int> v) {
    stable_partition(v.begin(), v.end(), [](int n){ return n%2==0; });
    return v;
}`;

  S["stl-36"] = `bool nextPerm(vector<int>& v) {
    return next_permutation(v.begin(), v.end());
}`;

  S["modern-37"] = `vector<string> sortByLength(vector<string> v) {
    stable_sort(v.begin(), v.end(), [](const auto& a, const auto& b){ return a.size() < b.size(); });
    return v;
}`;

  S["modern-38"] = `int sumVector(vector<int> v) {
    int s = 0;
    for (auto x : v) s += x;
    return s;
}`;

  S["modern-39"] = `unique_ptr<int> makeValue(int x) {
    return make_unique<int>(x);
}`;

  S["modern-40"] = `function<int()> makeAdder(vector<int> v) {
    return [v]() {
        int s = 0;
        for (auto x : v) s += x;
        return s;
    };
}`;

  S["modern-41"] = `template<class... Ts>
auto varSum(Ts... args) {
    return (args + ...);
}`;

  S["modern-42"] = `template<class Derived>
class InstanceCounter {
    static int _count;
public:
    InstanceCounter()  { ++_count; }
    ~InstanceCounter() { --_count; }
    static int count() { return _count; }
};
template<class D> int InstanceCounter<D>::_count = 0;`;

  /* ══════════════════════════════════════════════════════════════════════ */

  /* ================= more reference answers ================= */
  S["basics-43"] = `long long factorial(int n) {
    long long r = 1;
    for (int i = 2; i <= n; ++i) r *= i;
    return r;
}`;

  S["basics-44"] = `string toBinary(int n) {
    if (n == 0) return "0";
    string s;
    while (n > 0) {
        s += char('0' + n % 2);
        n /= 2;
    }
    reverse(s.begin(), s.end());
    return s;
}`;

  S["basics-45"] = `int countPrimes(int n) {
    if (n < 3) return 0;
    vector<bool> composite(n, false);
    int count = 0;
    for (long long i = 2; i < n; ++i) {
        if (composite[i]) continue;
        ++count;
        for (long long j = i * i; j < n; j += i) composite[j] = true;
    }
    return count;
}`;

  S["strings-46"] = `bool isPalindrome(const string& s) {
    int i = 0, j = (int)s.size() - 1;
    while (i < j) {
        if (s[i++] != s[j--]) return false;
    }
    return true;
}`;

  S["strings-47"] = `string capitalizeWords(string s) {
    bool start = true;
    for (char& c : s) {
        if (c == ' ') { start = true; continue; }
        c = start ? toupper(c) : tolower(c);
        start = false;
    }
    return s;
}`;

  S["strings-48"] = `string rle(const string& s) {
    string out;
    for (size_t i = 0; i < s.size();) {
        size_t j = i;
        while (j < s.size() && s[j] == s[i]) ++j;
        out += s[i];
        out += to_string(j - i);
        i = j;
    }
    return out;
}`;

  S["vectors-49"] = `long long sumVec(const vector<int>& v) {
    long long total = 0;
    for (int x : v) total += x;
    return total;
}`;

  S["vectors-50"] = `vector<int> moveZeroes(vector<int> v) {
    size_t w = 0;
    for (size_t i = 0; i < v.size(); ++i)
        if (v[i] != 0) v[w++] = v[i];
    while (w < v.size()) v[w++] = 0;
    return v;
}`;

  S["vectors-51"] = `vector<int> productExceptSelf(vector<int> v) {
    int n = v.size();
    vector<int> out(n, 1);
    int left = 1;
    for (int i = 0; i < n; ++i) { out[i] = left; left *= v[i]; }
    int right = 1;
    for (int i = n - 1; i >= 0; --i) { out[i] *= right; right *= v[i]; }
    return out;
}`;

  S["maps-52"] = `map<char,int> charCount(const string& s) {
    map<char,int> m;
    for (char c : s) ++m[c];
    return m;
}`;

  S["maps-53"] = `int firstUnique(const string& s) {
    unordered_map<char,int> cnt;
    for (char c : s) ++cnt[c];
    for (size_t i = 0; i < s.size(); ++i)
        if (cnt[s[i]] == 1) return (int)i;
    return -1;
}`;

  S["maps-54"] = `vector<vector<string>> groupAnagrams(vector<string> words) {
    unordered_map<string,int> index;
    vector<vector<string>> groups;
    for (const string& w : words) {
        string key = w;
        sort(key.begin(), key.end());
        auto it = index.find(key);
        if (it == index.end()) {
            index[key] = groups.size();
            groups.push_back({w});
        } else {
            groups[it->second].push_back(w);
        }
    }
    return groups;
}`;

  S["oop-55"] = `class Person {
    string name_;
    int age_;
public:
    Person(string name, int age) : name_(name), age_(age) {}
    string getName() const { return name_; }
    int getAge() const { return age_; }
    void birthday() { ++age_; }
};`;

  S["oop-56"] = `class Animal {
public:
    virtual ~Animal() = default;
    virtual string sound() { return "..."; }
};
class Dog : public Animal {
public:
    string sound() override { return "Woof"; }
};
class Cat : public Animal {
public:
    string sound() override { return "Meow"; }
};`;

  S["oop-57"] = `class Fraction {
    int n_, d_;
public:
    Fraction(int num, int den) {
        if (den < 0) { num = -num; den = -den; }
        int g = std::gcd(std::abs(num), den);
        if (g == 0) g = 1;
        n_ = num / g;
        d_ = den / g;
    }
    Fraction operator+(const Fraction& o) const {
        return Fraction(n_ * o.d_ + o.n_ * d_, d_ * o.d_);
    }
    bool operator==(const Fraction& o) const { return n_ == o.n_ && d_ == o.d_; }
    string toString() const { return to_string(n_) + "/" + to_string(d_); }
};`;

  S["stl-58"] = `vector<int> sortDesc(vector<int> v) {
    sort(v.begin(), v.end(), greater<int>());
    return v;
}`;

  S["stl-59"] = `int kthLargest(vector<int> v, int k) {
    sort(v.begin(), v.end(), greater<int>());
    return v[k - 1];
}`;

  S["stl-60"] = `vector<int> topKFrequent(vector<int> v, int k) {
    map<int,int> cnt;
    for (int x : v) ++cnt[x];
    vector<pair<int,int>> items(cnt.begin(), cnt.end());
    sort(items.begin(), items.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    vector<int> out;
    for (int i = 0; i < k && i < (int)items.size(); ++i) out.push_back(items[i].first);
    return out;
}`;

  S["modern-61"] = `int applyTwice(function<int(int)> f, int x) {
    return f(f(x));
}`;

  S["modern-62"] = `unique_ptr<int> makeBox(int v) {
    return make_unique<int>(v);
}
int unbox(unique_ptr<int> p) {
    return *p;
}`;

  S["modern-63"] = `function<int(int)> compose(function<int(int)> f, function<int(int)> g) {
    return [f, g](int x) { return f(g(x)); };
}`;

  (window.QUADRA_SOLUTIONS = window.QUADRA_SOLUTIONS || {}).cpp = S;
})();
