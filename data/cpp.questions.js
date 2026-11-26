/* data/cpp.questions.js  –  Quadra Code Lab C++ track
   63 questions · 7 categories · 9 per category
   Each test: [ "expr_or_body", "expected_literal" ]
   Body style (contains 'return'): wrapped in [&](){ ... }()
*/
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "basics",    name: "C++ Basics",         icon: "⚙️",  desc: "Variables, types, control flow, functions" },
    { id: "strings",   name: "Strings & Chars",     icon: "🔤",  desc: "std::string manipulation and character ops" },
    { id: "vectors",   name: "Vectors & Arrays",    icon: "📦",  desc: "STL vector operations and algorithms" },
    { id: "maps",      name: "Maps & Sets",         icon: "🗺️",  desc: "std::map, std::unordered_map, std::set" },
    { id: "oop",       name: "OOP & Classes",       icon: "🏛️",  desc: "Classes, constructors, inheritance, polymorphism" },
    { id: "stl",       name: "STL Algorithms",      icon: "🔧",  desc: "Sorting, searching, transform, accumulate" },
    { id: "modern",    name: "Modern C++",          icon: "🚀",  desc: "Lambda, auto, smart pointers, range-for" },
  ];

  const QUESTIONS = [];
  let _id = 0;
  function add(cat, level, title, sig, desc, tests, hints) {
    _id++;
    QUESTIONS.push({ id: cat + "-" + _id, cat, level, title, sig, desc, tests, hints });
  }

  /* ───────── C++ Basics ───────── */
  add("basics","easy","Sum of Digits",
    "int sumDigits(int n)",
    "Return the sum of all digits of a non-negative integer `n`.\n\nExample: `sumDigits(1234)` → `10`",
    [
      ["sumDigits(0)","0"],
      ["sumDigits(9)","9"],
      ["sumDigits(1234)","10"],
      ["sumDigits(99999)","45"],
    ],
    ["Use modulo 10 to get the last digit, then divide by 10."]
  );

  add("basics","easy","Is Prime",
    "bool isPrime(int n)",
    "Return `true` if `n` is a prime number, `false` otherwise.\n\nExample: `isPrime(7)` → `true`",
    [
      ["isPrime(1)","false"],
      ["isPrime(2)","true"],
      ["isPrime(17)","true"],
      ["isPrime(18)","false"],
    ],
    ["Check divisibility up to sqrt(n)."]
  );

  add("basics","medium","Power Without pow()",
    "long long power(long long base, int exp)",
    "Return `base` raised to `exp` (exp ≥ 0) without using `pow()`. Use fast exponentiation (O(log exp)).\n\nExample: `power(2, 10)` → `1024`",
    [
      ["power(2, 0)","1LL"],
      ["power(2, 10)","1024LL"],
      ["power(3, 5)","243LL"],
      ["power(7, 3)","343LL"],
    ],
    ["Halve the exponent each step (exponentiation by squaring)."]
  );

  add("basics","medium","Roman to Integer",
    "int romanToInt(const string& s)",
    "Convert a Roman numeral string to its integer value. Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtraction rule applies (IV=4, IX=9, etc.).\n\nExample: `romanToInt(\"MCMXCIV\")` → `1994`",
    [
      ['romanToInt("III")',"3"],
      ['romanToInt("IV")',"4"],
      ['romanToInt("IX")',"9"],
      ['romanToInt("MCMXCIV")',"1994"],
    ],
    ["If current symbol < next symbol, subtract it instead of adding."]
  );

  add("basics","hard","Integer to Roman",
    "string intToRoman(int num)",
    "Convert integer `num` (1–3999) to a Roman numeral string.\n\nExample: `intToRoman(1994)` → `\"MCMXCIV\"`",
    [
      ['intToRoman(1)','"I"'],
      ['intToRoman(4)','"IV"'],
      ['intToRoman(58)','"LVIII"'],
      ['intToRoman(1994)','"MCMXCIV"'],
    ],
    ["Use a table of value-symbol pairs from largest to smallest, greedily subtract."]
  );

  add("basics","hard","Palindrome Number",
    "bool isPalindrome(int x)",
    "Return `true` if the integer `x` reads the same forwards and backwards. Negative numbers are never palindromes.\n\nExample: `isPalindrome(121)` → `true`",
    [
      ["isPalindrome(-121)","false"],
      ["isPalindrome(0)","true"],
      ["isPalindrome(121)","true"],
      ["isPalindrome(1221)","true"],
      ["isPalindrome(10)","false"],
    ],
    ["Reverse only the second half of the number to avoid overflow."]
  );

  /* ───────── Strings & Chars ───────── */
  add("strings","easy","Reverse String",
    "string reverseStr(string s)",
    "Return the string `s` reversed.\n\nExample: `reverseStr(\"hello\")` → `\"olleh\"`",
    [
      ['reverseStr("")','""'],
      ['reverseStr("a")','"a"'],
      ['reverseStr("hello")','"olleh"'],
      ['reverseStr("abcde")','"edcba"'],
    ],
    ["Use std::reverse or a two-pointer swap."]
  );

  add("strings","easy","Count Vowels",
    "int countVowels(const string& s)",
    "Return the count of vowels (a, e, i, o, u — both cases) in the string.\n\nExample: `countVowels(\"Hello World\")` → `3`",
    [
      ['countVowels("")',"0"],
      ['countVowels("aeiouAEIOU")',"10"],
      ['countVowels("Hello World")',"3"],
      ['countVowels("rhythm")',"0"],
    ],
    ["Lowercase the character before checking against \"aeiou\"."]
  );

  add("strings","medium","Longest Common Prefix",
    "string longestCommonPrefix(vector<string> strs)",
    "Return the longest common prefix string among all strings in `strs`. Return `\"\"` if none.\n\nExample: `longestCommonPrefix({\"flower\",\"flow\",\"flight\"})` → `\"fl\"`",
    [
      ['longestCommonPrefix({"flower","flow","flight"})','"fl"'],
      ['longestCommonPrefix({"dog","racecar","car"})','""'],
      ['longestCommonPrefix({"abc","abc","abc"})','"abc"'],
    ],
    ["Sort and compare only the first and last strings."]
  );

  add("strings","medium","Anagram Check",
    "bool isAnagram(const string& s, const string& t)",
    "Return `true` if `t` is an anagram of `s` (same characters, different order).\n\nExample: `isAnagram(\"anagram\", \"nagaram\")` → `true`",
    [
      ['isAnagram("anagram","nagaram")','true'],
      ['isAnagram("rat","car")','false'],
      ['isAnagram("a","a")','true'],
      ['isAnagram("ab","ba")','true'],
    ],
    ["Sort both strings or count character frequencies."]
  );

  add("strings","hard","Minimum Window Substring",
    "string minWindow(const string& s, const string& t)",
    "Return the minimum window in `s` which will contain all the characters of `t`. Return `\"\"` if none.\n\nExample: `minWindow(\"ADOBECODEBANC\", \"ABC\")` → `\"BANC\"`",
    [
      ['minWindow("ADOBECODEBANC","ABC")','"BANC"'],
      ['minWindow("a","a")','"a"'],
      ['minWindow("a","b")','""'],
    ],
    ["Use a sliding window with two pointers and a frequency map."]
  );

  add("strings","hard","Zigzag Conversion",
    "string zigzagConvert(const string& s, int numRows)",
    "Write the string in zigzag pattern on `numRows` rows and read line by line.\n\nExample: `zigzagConvert(\"PAYPALISHIRING\", 3)` → `\"PAHNAPLSIIGYIR\"`",
    [
      ['zigzagConvert("PAYPALISHIRING",3)','"PAHNAPLSIIGYIR"'],
      ['zigzagConvert("PAYPALISHIRING",4)','"PINALSIGYAHRPI"'],
      ['zigzagConvert("A",1)','"A"'],
    ],
    ["Simulate the zigzag: a direction variable flips when you hit the first or last row."]
  );

  /* ───────── Vectors & Arrays ───────── */
  add("vectors","easy","Max in Vector",
    "int maxElement(vector<int> v)",
    "Return the maximum element of a non-empty vector.\n\nExample: `maxElement({3,1,4,1,5,9})` → `9`",
    [
      ["maxElement({1})","1"],
      ["maxElement({3,1,4,1,5,9})","9"],
      ["maxElement({-5,-1,-3})","(-1)"],
    ],
    ["Use std::max_element or a simple loop."]
  );

  add("vectors","easy","Remove Duplicates (sorted)",
    "int removeDuplicates(vector<int>& nums)",
    "Given a sorted vector `nums`, remove duplicates in-place and return the new length. The relative order must be kept.\n\nExample: `removeDuplicates({1,1,2})` → `2`, nums becomes `{1,2,...}`",
    [
      [
        `int removeDuplicates(vector<int>& nums);
vector<int> v = {1,1,2};
int k = removeDuplicates(v);
vector<int> res(v.begin(), v.begin()+k);
return res;`,
        "(vector<int>{1,2})"
      ],
      [
        `int removeDuplicates(vector<int>& nums);
vector<int> v = {0,0,1,1,1,2,2,3,3,4};
int k = removeDuplicates(v);
return k;`,
        "5"
      ],
    ],
    ["Use a slow pointer that only advances when you find a new unique value."]
  );

  add("vectors","medium","Two Sum",
    "vector<int> twoSum(vector<int> nums, int target)",
    "Return the indices of the two numbers in `nums` that add up to `target`. Exactly one solution exists.\n\nExample: `twoSum({2,7,11,15}, 9)` → `{0,1}`",
    [
      ["twoSum({2,7,11,15},9)","(vector<int>{0,1})"],
      ["twoSum({3,2,4},6)","(vector<int>{1,2})"],
      ["twoSum({3,3},6)","(vector<int>{0,1})"],
    ],
    ["Use an unordered_map: for each number store index, then look up target-num."]
  );

  add("vectors","medium","Rotate Array",
    "void rotate(vector<int>& nums, int k)",
    "Rotate the vector `nums` to the right by `k` steps in-place.\n\nExample: `{1,2,3,4,5,6,7}` rotated by 3 → `{5,6,7,1,2,3,4}`",
    [
      [
        `void rotate(vector<int>& nums, int k);
vector<int> v = {1,2,3,4,5,6,7};
rotate(v, 3);
return v;`,
        "(vector<int>{5,6,7,1,2,3,4})"
      ],
      [
        `void rotate(vector<int>& nums, int k);
vector<int> v = {-1,-100,3,99};
rotate(v, 2);
return v;`,
        "(vector<int>{3,99,-1,-100})"
      ],
    ],
    ["Reverse three times: whole array, first n-k, last k."]
  );

  add("vectors","hard","Merge Intervals",
    "vector<vector<int>> merge(vector<vector<int>> intervals)",
    "Merge all overlapping intervals and return the result sorted.\n\nExample: `merge({{1,3},{2,6},{8,10},{15,18}})` → `{{1,6},{8,10},{15,18}}`",
    [
      ["merge({{1,3},{2,6},{8,10},{15,18}})","(vector<vector<int>>{{1,6},{8,10},{15,18}})"],
      ["merge({{1,4},{4,5}})","(vector<vector<int>>{{1,5}})"],
      ["merge({{1,4},{2,3}})","(vector<vector<int>>{{1,4}})"],
    ],
    ["Sort by start. Walk and merge if current start ≤ last end."]
  );

  add("vectors","hard","Trapping Rain Water",
    "int trap(vector<int> height)",
    "Given elevation map `height`, compute how much water it can trap after raining.\n\nExample: `trap({0,1,0,2,1,0,1,3,2,1,2,1})` → `6`",
    [
      ["trap({0,1,0,2,1,0,1,3,2,1,2,1})","6"],
      ["trap({4,2,0,3,2,5})","9"],
      ["trap({3,3})","0"],
    ],
    ["Two pointers: maintain maxLeft and maxRight; water at a cell = min(maxL,maxR)-height[i]."]
  );

  /* ───────── Maps & Sets ───────── */
  add("maps","easy","Frequency Map",
    "map<char,int> charFreq(const string& s)",
    "Return a `map<char,int>` mapping each character in `s` to its frequency.\n\nExample: `charFreq(\"aab\")` → `{{'a',2},{'b',1}}`",
    [
      ['charFreq("aab")',"(map<char,int>{{'a',2},{'b',1}})"],
      ['charFreq("")',"(map<char,int>{})"],
      ['charFreq("abc")',"(map<char,int>{{'a',1},{'b',1},{'c',1}})"],
    ],
    ["Iterate over the string and increment freq[c]."]
  );

  add("maps","easy","Two Sum – Map Version",
    "bool hasTwoSum(vector<int> nums, int target)",
    "Return `true` if any two distinct elements in `nums` sum to `target`.\n\nExample: `hasTwoSum({1,4,7,2}, 9)` → `true` (2+7)",
    [
      ["hasTwoSum({1,4,7,2},9)","true"],
      ["hasTwoSum({1,2,3},10)","false"],
      ["hasTwoSum({5,5},10)","true"],
    ],
    ["Use an unordered_set; for each number check if target-number is already seen."]
  );

  add("maps","medium","Group Anagrams",
    "vector<vector<string>> groupAnagrams(vector<string> strs)",
    "Group the strings in `strs` by anagram class. Order within each group and of groups doesn't matter.\n\nExample: `groupAnagrams({\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"})` → `{{\"eat\",\"tea\",\"ate\"},{\"tan\",\"nat\"},{\"bat\"}}`",
    [
      [
        `auto res = groupAnagrams({"eat","tea","tan","ate","nat","bat"});
for(auto& g:res) sort(g.begin(),g.end());
sort(res.begin(),res.end());
return res;`,
        `(vector<vector<string>>{{"ate","eat","tea"},{"bat"},{"nat","tan"}})`
      ],
    ],
    ["Sort each string as the key in an unordered_map."]
  );

  add("maps","medium","Top K Frequent Elements",
    "vector<int> topKFrequent(vector<int> nums, int k)",
    "Return the `k` most frequent elements in `nums`. Order doesn't matter.\n\nExample: `topKFrequent({1,1,1,2,2,3}, 2)` → `{1,2}`",
    [
      [
        `auto r = topKFrequent({1,1,1,2,2,3},2);
sort(r.begin(),r.end());
return r;`,
        "(vector<int>{1,2})"
      ],
      ["topKFrequent({1},1)","(vector<int>{1})"],
    ],
    ["Count frequencies then use a partial sort or bucket sort."]
  );

  add("maps","hard","Longest Consecutive Sequence",
    "int longestConsecutive(vector<int> nums)",
    "Return the length of the longest consecutive integer sequence in `nums`.\n\nExample: `longestConsecutive({100,4,200,1,3,2})` → `4` (1-2-3-4)",
    [
      ["longestConsecutive({100,4,200,1,3,2})","4"],
      ["longestConsecutive({0,3,7,2,5,8,4,6,0,1})","9"],
      ["longestConsecutive({})","0"],
    ],
    ["Insert all numbers into an unordered_set. For each number that is a sequence start (n-1 not in set), extend forward."]
  );

  add("maps","hard","Subarray Sum Equals K",
    "int subarraySum(vector<int> nums, int k)",
    "Return the total number of continuous subarrays whose sum equals `k`.\n\nExample: `subarraySum({1,1,1}, 2)` → `2`",
    [
      ["subarraySum({1,1,1},2)","2"],
      ["subarraySum({1,2,3},3)","2"],
      ["subarraySum({-1,-1,1},0)","1"],
    ],
    ["Use prefix sums and a frequency map: count how many times (prefixSum - k) has appeared."]
  );

  /* ───────── OOP & Classes ───────── */
  add("oop","easy","Rectangle Class",
    "class Rectangle { ... }",
    "Define a class `Rectangle` with `width` and `height` (set via constructor). Provide `area()` and `perimeter()` methods.\n\nExample: `Rectangle r(4,5); r.area()` → `20`",
    [
      ["Rectangle(4,5).area()","20"],
      ["Rectangle(4,5).perimeter()","18"],
      ["Rectangle(1,1).area()","1"],
    ],
    ["Constructor sets the two fields; methods compute the formula."]
  );

  add("oop","easy","Counter Class",
    "class Counter { ... }",
    "Define a class `Counter` with methods `increment()`, `decrement()`, and `value()`. Initial value is 0.\n\nExample: after two increments and one decrement, `value()` → `1`",
    [
      [
        `Counter c;
c.increment(); c.increment(); c.decrement();
return c.value();`,
        "1"
      ],
      [
        `Counter c;
return c.value();`,
        "0"
      ],
    ],
    ["Store a private int and modify / return it."]
  );

  add("oop","medium","Stack Class",
    "class Stack { ... }",
    "Implement a generic integer stack with `push(x)`, `pop()` (returns int), `top()`, `empty()`, and `size()`. Throws `std::underflow_error` on pop/top when empty.\n\nExample: push 1 2 3, pop → 3, top → 2",
    [
      [
        `Stack s;
s.push(1); s.push(2); s.push(3);
int a = s.pop();
int b = s.top();
return make_pair(a, b);`,
        "(make_pair(3,2))"
      ],
      [
        `Stack s;
return s.empty();`,
        "true"
      ],
    ],
    ["Wrap std::vector<int> and delegate operations."]
  );

  add("oop","medium","Shape Hierarchy",
    "class Shape / Circle / Rect",
    "Define an abstract base class `Shape` with a virtual `area()` returning `double`. Derive `Circle(double r)` and `Rect(double w, double h)`. Floating-point results are compared with a small tolerance.\n\nExample: `Circle(1.0).area()` ≈ `3.141592`",
    [
      ["Circle(1.0).area()","Approx(3.141592653589793)"],
      ["Rect(3.0,4.0).area()","Approx(12.0)"],
      ["Circle(2.5).area()","Approx(19.634954084936208)"],
    ],
    ["Use M_PI or define pi = acos(-1.0)."]
  );

  add("oop","hard","Linked List Class",
    "class LinkedList { ... }",
    "Implement a singly-linked list with `pushBack(x)`, `pushFront(x)`, `popFront()` (returns int), `toVector()` (returns `vector<int>`).\n\nExample: pushBack 1 2 3 → toVector gives {1,2,3}",
    [
      [
        `LinkedList l;
l.pushBack(1); l.pushBack(2); l.pushBack(3);
return l.toVector();`,
        "(vector<int>{1,2,3})"
      ],
      [
        `LinkedList l;
l.pushFront(3); l.pushFront(2); l.pushFront(1);
return l.toVector();`,
        "(vector<int>{1,2,3})"
      ],
    ],
    ["Use a Node struct with int val and Node* next."]
  );

  add("oop","hard","Binary Search Tree",
    "class BST { ... }",
    "Implement a BST with `insert(x)`, `contains(x)`, and `inorder()` returning a `vector<int>` in sorted order.\n\nExample: insert 5,3,7,1,4 → inorder gives {1,3,4,5,7}",
    [
      [
        `BST t;
for(int x:{5,3,7,1,4}) t.insert(x);
return t.inorder();`,
        "(vector<int>{1,3,4,5,7})"
      ],
      [
        `BST t;
t.insert(10); t.insert(5); t.insert(15);
return t.contains(5);`,
        "true"
      ],
    ],
    ["Recursive insert; inorder traversal via left-root-right recursion."]
  );

  /* ───────── STL Algorithms ───────── */
  add("stl","easy","Sort Descending",
    "vector<int> sortDesc(vector<int> v)",
    "Return `v` sorted in descending order.\n\nExample: `sortDesc({3,1,4,1,5})` → `{5,4,3,1,1}`",
    [
      ["sortDesc({3,1,4,1,5})","(vector<int>{5,4,3,1,1})"],
      ["sortDesc({1})","(vector<int>{1})"],
      ["sortDesc({})","(vector<int>{})"],
    ],
    ["Use std::sort with a greater<int> comparator or a lambda."]
  );

  add("stl","easy","Count If Even",
    "int countEven(vector<int> v)",
    "Return the count of even numbers in `v` using a standard algorithm.\n\nExample: `countEven({1,2,3,4,5,6})` → `3`",
    [
      ["countEven({1,2,3,4,5,6})","3"],
      ["countEven({1,3,5})","0"],
      ["countEven({2,4,6,8})","4"],
    ],
    ["Use std::count_if with a lambda checking n%2==0."]
  );

  add("stl","medium","Transform to Squares",
    "vector<int> squares(vector<int> v)",
    "Return a new vector where each element is the square of the corresponding element in `v`.\n\nExample: `squares({1,2,3,4})` → `{1,4,9,16}`",
    [
      ["squares({1,2,3,4})","(vector<int>{1,4,9,16})"],
      ["squares({-2,0,3})","(vector<int>{4,0,9})"],
      ["squares({})","(vector<int>{})"],
    ],
    ["Use std::transform with an output iterator and a squaring lambda."]
  );

  add("stl","medium","Sum with Accumulate",
    "int rangeSum(vector<int> v, int lo, int hi)",
    "Return the sum of elements in `v` with indices in [lo, hi] (inclusive).\n\nExample: `rangeSum({1,2,3,4,5}, 1, 3)` → `9` (2+3+4)",
    [
      ["rangeSum({1,2,3,4,5},1,3)","9"],
      ["rangeSum({10,20,30},0,2)","60"],
      ["rangeSum({5},0,0)","5"],
    ],
    ["Use std::accumulate on the subrange v.begin()+lo to v.begin()+hi+1."]
  );

  add("stl","hard","Partition Even/Odd",
    "vector<int> partitionEvenOdd(vector<int> v)",
    "Rearrange `v` so all even numbers come before all odd numbers. The relative order of evens and odds must be preserved. Return the result.\n\nExample: `partitionEvenOdd({1,2,3,4,5,6})` → `{2,4,6,1,3,5}`",
    [
      ["partitionEvenOdd({1,2,3,4,5,6})","(vector<int>{2,4,6,1,3,5})"],
      ["partitionEvenOdd({2,4,6})","(vector<int>{2,4,6})"],
      ["partitionEvenOdd({1,3,5})","(vector<int>{1,3,5})"],
    ],
    ["Use std::stable_partition with n%2==0 predicate."]
  );

  add("stl","hard","Next Permutation",
    "bool nextPerm(vector<int>& v)",
    "Rearrange `v` into the next lexicographically greater permutation in-place and return `true`. If no such permutation, rearrange to the first (sorted) and return `false`.\n\nExample: `{1,2,3}` → `{1,3,2}` returns `true`",
    [
      [
        `vector<int> v{1,2,3};
bool ok = nextPerm(v);
return make_pair(v, ok);`,
        "(make_pair(vector<int>{1,3,2}, true))"
      ],
      [
        `vector<int> v{3,2,1};
bool ok = nextPerm(v);
return make_pair(v, ok);`,
        "(make_pair(vector<int>{1,2,3}, false))"
      ],
    ],
    ["Delegate to std::next_permutation."]
  );

  /* ───────── Modern C++ ───────── */
  add("modern","easy","Lambda Sort by Length",
    "vector<string> sortByLength(vector<string> v)",
    "Sort the vector of strings by string length (ascending). Ties keep original order.\n\nExample: `sortByLength({\"banana\",\"pi\",\"apple\"})` → `{\"pi\",\"apple\",\"banana\"}`",
    [
      ['sortByLength({"banana","pi","apple"})','(vector<string>{"pi","apple","banana"})'],
      ['sortByLength({"a","bb","ccc","dd"})','(vector<string>{"a","bb","dd","ccc"})'],
    ],
    ["Use std::stable_sort with a lambda comparing s.size()."]
  );

  add("modern","easy","Auto and Range-for Sum",
    "int sumVector(vector<int> v)",
    "Return the sum of elements using `auto` and range-for.\n\nExample: `sumVector({1,2,3,4,5})` → `15`",
    [
      ["sumVector({1,2,3,4,5})","15"],
      ["sumVector({})","0"],
      ["sumVector({-1,1,-2,2})","0"],
    ],
    ["for(auto x : v) sum += x;"]
  );

  add("modern","medium","Unique Ptr Usage",
    "unique_ptr<int> makeValue(int x)",
    "Create a `unique_ptr<int>` holding `x` and return it.\n\nExample: `*makeValue(42)` → `42`",
    [
      ["*makeValue(42)","42"],
      ["*makeValue(0)","0"],
      ["*makeValue(-7)","(-7)"],
    ],
    ["Use std::make_unique<int>(x)."]
  );

  add("modern","medium","Lambda Capture Sum",
    "function<int()> makeAdder(vector<int> v)",
    "Return a lambda (as `std::function<int()>`) that captures `v` by value and returns the sum of its elements.\n\nExample: `makeAdder({1,2,3})()` → `6`",
    [
      ["makeAdder({1,2,3})()","6"],
      ["makeAdder({})()","0"],
      ["makeAdder({-1,2,-3,4})()","2"],
    ],
    ["Capture v by value: return [v](){ int s=0; for(auto x:v) s+=x; return s; };"]
  );

  add("modern","hard","Variadic Sum",
    "template<class... Ts> auto varSum(Ts... args)",
    "Write a variadic template function `varSum` that returns the sum of all its arguments (ints/doubles).\n\nExample: `varSum(1,2,3,4)` → `10`",
    [
      ["varSum(1,2,3,4)","10"],
      ["varSum(1.5,2.5)","Approx(4.0)"],
      ["varSum(10)","10"],
    ],
    ["Use fold expression: return (args + ...);"]
  );

  add("modern","hard","CRTP Counter",
    "template<class Derived> class InstanceCounter",
    "Use CRTP to create a base class `InstanceCounter<Derived>` that counts instances of each derived class. Provide a static `count()` method.\n\nExample: create 3 objects of `class A : public InstanceCounter<A>`, `A::count()` → 3",
    [
      [
        `struct A : InstanceCounter<A> {};
struct B : InstanceCounter<B> {};
A a1, a2, a3;
B b1, b2;
return make_pair(A::count(), B::count());`,
        "(make_pair(3,2))"
      ],
    ],
    ["Store a static int in InstanceCounter<Derived>; increment in constructor, decrement in destructor."]
  );

  /* ═══════════ MORE QUESTIONS (added in Quadra Code Lab) ═══════════ */

  /* ───────── C++ Basics ───────── */
  add("basics","easy","Factorial",
    "long long factorial(int n)",
    "Return `n!` (n factorial) for `0 <= n <= 20`. `0! = 1`.\n\nExample: `factorial(5)` → `120`",
    [
      ["factorial(0)","1"],
      ["factorial(5)","120"],
      ["factorial(10)","3628800"],
      ["factorial(20)","2432902008176640000LL"],
    ],
    ["Use `long long`: 20! does not fit in `int`."]
  );

  add("basics","medium","Decimal to Binary String",
    "string toBinary(int n)",
    "Return the binary representation of the non-negative integer `n` as a string. `0` returns `\"0\"`. Do not use `bitset`.\n\nExample: `toBinary(10)` → `\"1010\"`",
    [
      ['toBinary(10)','"1010"'],
      ['toBinary(0)','"0"'],
      ['toBinary(255)','"11111111"'],
      ['toBinary(1)','"1"'],
    ],
    ["Collect `n % 2` while dividing `n` by 2, then reverse the collected digits."]
  );

  add("basics","hard","Count Primes (Sieve)",
    "int countPrimes(int n)",
    "Return how many prime numbers are strictly less than `n` (`0 <= n <= 5,000,000`). It must be fast, so use the Sieve of Eratosthenes.\n\nExample: `countPrimes(10)` → `4` (2, 3, 5, 7)",
    [
      ["countPrimes(0)","0"],
      ["countPrimes(2)","0"],
      ["countPrimes(10)","4"],
      ["countPrimes(100)","25"],
      ["countPrimes(1000000)","78498"],
    ],
    ["Make a `vector<bool>` of size `n`, then cross out the multiples of every prime starting from `p*p`."]
  );

  /* ───────── Strings & Chars ───────── */
  add("strings","easy","Palindrome Check",
    "bool isPalindrome(const string& s)",
    "Return `true` if `s` reads the same forwards and backwards (exact characters, case matters). An empty string is a palindrome.\n\nExample: `isPalindrome(\"racecar\")` → `true`",
    [
      ['isPalindrome("racecar")','true'],
      ['isPalindrome("ab")','false'],
      ['isPalindrome("")','true'],
      ['isPalindrome("Aa")','false'],
    ],
    ["Compare `s[i]` with `s[n-1-i]` for the first half."]
  );

  add("strings","medium","Capitalize Words",
    "string capitalizeWords(string s)",
    "Make the first letter of every word upper case and the rest lower case. Words are separated by single spaces, keep the spaces as they are.\n\nExample: `capitalizeWords(\"hELLO wORLD\")` → `\"Hello World\"`",
    [
      ['capitalizeWords("hello world")','"Hello World"'],
      ['capitalizeWords("hELLO wORLD")','"Hello World"'],
      ['capitalizeWords("")','""'],
      ['capitalizeWords("a b c")','"A B C"'],
    ],
    ["Track whether the previous character was a space (or the start). Use `toupper` / `tolower`."]
  );

  add("strings","hard","Run-Length Encoding",
    "string rle(const string& s)",
    "Compress `s` by replacing each run of the same character with the character followed by the run length (always write the count, even for 1).\n\nExample: `rle(\"aaabcc\")` → `\"a3b1c2\"`",
    [
      ['rle("aaabcc")','"a3b1c2"'],
      ['rle("")','""'],
      ['rle("z")','"z1"'],
      ['rle("aabbbbbbbbbbbb")','"a2b12"'],
    ],
    ["Walk with an index and count how far the same character continues. Use `to_string` for the count."]
  );

  /* ───────── Vectors & Arrays ───────── */
  add("vectors","easy","Sum of Vector",
    "long long sumVec(const vector<int>& v)",
    "Return the sum of all elements. The sum can be larger than `int`, so return `long long`. An empty vector sums to 0.\n\nExample: `sumVec({1,2,3})` → `6`",
    [
      ["sumVec({1,2,3})","6"],
      ["sumVec({})","0"],
      ["sumVec({-1,1})","0"],
      ["sumVec({1000000000,1000000000,1000000000})","3000000000LL"],
    ],
    ["Start with `long long total = 0;` so the addition does not overflow."]
  );

  add("vectors","medium","Move Zeroes",
    "vector<int> moveZeroes(vector<int> v)",
    "Move all `0` values to the end of the vector while keeping the order of the other elements. Return the result.\n\nExample: `moveZeroes({0,1,0,3,12})` → `{1,3,12,0,0}`",
    [
      ["moveZeroes({0,1,0,3,12})","vector<int>{1,3,12,0,0}"],
      ["moveZeroes({0})","vector<int>{0}"],
      ["moveZeroes({1,2})","vector<int>{1,2}"],
      ["moveZeroes({})","vector<int>{}"],
    ],
    ["`std::stable_partition`, or keep a write index for the non-zero values and fill the rest with 0."]
  );

  add("vectors","hard","Product Except Self",
    "vector<int> productExceptSelf(vector<int> v)",
    "Return a vector `out` where `out[i]` is the product of all elements of `v` except `v[i]`. Do NOT use division. All products fit in `int`.\n\nExample: `productExceptSelf({1,2,3,4})` → `{24,12,8,6}`",
    [
      ["productExceptSelf({1,2,3,4})","vector<int>{24,12,8,6}"],
      ["productExceptSelf({-1,1,0,-3,3})","vector<int>{0,0,9,0,0}"],
      ["productExceptSelf({2,3})","vector<int>{3,2}"],
      ["productExceptSelf({5})","vector<int>{1}"],
    ],
    ["Do two passes: first store the product of everything to the LEFT, then multiply by the product of everything to the RIGHT."]
  );

  /* ───────── Maps & Sets ───────── */
  add("maps","easy","Count Characters",
    "map<char,int> charCount(const string& s)",
    "Return a `map<char,int>` that tells how many times each character occurs in `s`.\n\nExample: `charCount(\"aab\")` → `{'a':2, 'b':1}`",
    [
      [`charCount("aab")`,`map<char,int>{{'a',2},{'b',1}}`],
      [`charCount("")`,`map<char,int>{}`],
      [`charCount("zzz")`,`map<char,int>{{'z',3}}`],
    ],
    ["`++m[c]` creates the entry with 0 first, then adds one."]
  );

  add("maps","medium","First Unique Character",
    "int firstUnique(const string& s)",
    "Return the index of the first character that appears exactly once in `s`, or `-1` if there is none.\n\nExample: `firstUnique(\"loveleetcode\")` → `2`",
    [
      ['firstUnique("leetcode")','0'],
      ['firstUnique("loveleetcode")','2'],
      ['firstUnique("aabb")','-1'],
      ['firstUnique("")','-1'],
    ],
    ["First count every character, then scan the string again and return the first index with count 1."]
  );

  add("maps","hard","Group Anagrams",
    "vector<vector<string>> groupAnagrams(vector<string> words)",
    "Group the words that are anagrams of each other. Inside a group keep the input order. Groups are ordered by the first appearance of their first word.\n\nExample: `{\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"}` → `{{\"eat\",\"tea\",\"ate\"},{\"tan\",\"nat\"},{\"bat\"}}`",
    [
      ['groupAnagrams({"eat","tea","tan","ate","nat","bat"})','vector<vector<string>>{{"eat","tea","ate"},{"tan","nat"},{"bat"}}'],
      ['groupAnagrams({})','vector<vector<string>>{}'],
      ['groupAnagrams({"a"})','vector<vector<string>>{{"a"}}'],
      ['groupAnagrams({"ab","ba","ab"})','vector<vector<string>>{{"ab","ba","ab"}}'],
    ],
    ["The sorted letters of a word are the same for all anagrams: use them as a map key that points to a group index."]
  );

  /* ───────── OOP & Classes ───────── */
  add("oop","easy","Person Class",
    "class Person { ... }",
    "Define a class `Person` with a constructor `Person(string name, int age)`, and the methods `getName()`, `getAge()` and `birthday()` (adds one year to the age).\n\nExample: age 20 then `birthday()` → `getAge()` is `21`",
    [
      [
        `Person p("Ravi", 20);
p.birthday();
return p.getAge();`,
        "21"
      ],
      [
        `Person p("Asha", 5);
return p.getName();`,
        '"Asha"'
      ],
    ],
    ["Keep `name` and `age` as private members and set them in the constructor."]
  );

  add("oop","medium","Animal Sounds (Polymorphism)",
    "class Animal / Dog / Cat",
    "Define a base class `Animal` with a `virtual string sound()`. Derive `Dog` (returns `\"Woof\"`) and `Cat` (returns `\"Meow\"`). Calling `sound()` through an `Animal*` must run the derived version.\n\nExample: a `Dog` and a `Cat` in an `Animal*` array → `\"Woof\"`, `\"Meow\"`",
    [
      [
        `Dog d; Cat c;
Animal* a[2] = {&d, &c};
return a[0]->sound() + a[1]->sound();`,
        '"WoofMeow"'
      ],
      [
        `Dog d;
return d.sound();`,
        '"Woof"'
      ],
      [
        `Cat c;
Animal& r = c;
return r.sound();`,
        '"Meow"'
      ],
    ],
    ["Without the `virtual` keyword the base version would always be called. Add a virtual destructor too (good practice)."]
  );

  add("oop","hard","Fraction with Operators",
    "class Fraction { ... }",
    "Define `Fraction(int num, int den)` that always keeps itself in lowest terms (the denominator is positive). Support `operator+`, `operator==` and `string toString()` that returns text like `\"5/6\"` (a whole number is `\"2/1\"`).\n\nExample: `Fraction(1,2) + Fraction(1,3)` → `\"5/6\"`",
    [
      [
        `return (Fraction(1,2) + Fraction(1,3)).toString();`,
        '"5/6"'
      ],
      [
        `return Fraction(2,4) == Fraction(1,2);`,
        "true"
      ],
      [
        `return Fraction(6,3).toString();`,
        '"2/1"'
      ],
      [
        `return (Fraction(1,4) + Fraction(1,4)).toString();`,
        '"1/2"'
      ],
    ],
    ["Divide numerator and denominator by `std::gcd(num, den)` in the constructor. For `+`: `a/b + c/d = (a*d + c*b) / (b*d)`."]
  );

  /* ───────── STL Algorithms ───────── */
  add("stl","easy","Sort Descending",
    "vector<int> sortDesc(vector<int> v)",
    "Return the vector sorted from the largest to the smallest value.\n\nExample: `sortDesc({3,1,2})` → `{3,2,1}`",
    [
      ["sortDesc({3,1,2})","vector<int>{3,2,1}"],
      ["sortDesc({})","vector<int>{}"],
      ["sortDesc({5,5,1})","vector<int>{5,5,1}"],
    ],
    ["`sort(v.begin(), v.end(), greater<int>())`."]
  );

  add("stl","medium","K-th Largest",
    "int kthLargest(vector<int> v, int k)",
    "Return the k-th largest element (1-based, duplicates count). `1 <= k <= v.size()`.\n\nExample: `kthLargest({3,2,1,5,6,4}, 2)` → `5`",
    [
      ["kthLargest({3,2,1,5,6,4},2)","5"],
      ["kthLargest({3,2,3,1,2,4,5,5,6},4)","4"],
      ["kthLargest({1},1)","1"],
      ["kthLargest({7,7,7},3)","7"],
    ],
    ["`nth_element` with `greater<int>()`, or sort descending and take index `k-1`."]
  );

  add("stl","hard","Top K Frequent",
    "vector<int> topKFrequent(vector<int> v, int k)",
    "Return the `k` most frequent values. Order the result by frequency (highest first); values with the same frequency are ordered by the smaller value first.\n\nExample: `topKFrequent({1,1,1,2,2,3}, 2)` → `{1,2}`",
    [
      ["topKFrequent({1,1,1,2,2,3},2)","vector<int>{1,2}"],
      ["topKFrequent({1},1)","vector<int>{1}"],
      ["topKFrequent({4,4,5,5,6},2)","vector<int>{4,5}"],
      ["topKFrequent({3,3,2,2,1},3)","vector<int>{2,3,1}"],
    ],
    ["Count with a map, copy the pairs into a vector and `sort` with a custom comparison (a lambda)."]
  );

  /* ───────── Modern C++ ───────── */
  add("modern","easy","Apply Twice",
    "int applyTwice(function<int(int)> f, int x)",
    "Call the function `f` on `x`, then call `f` again on the result, and return it.\n\nExample: with `f = x + 3`, `applyTwice(f, 1)` → `7`",
    [
      [
        `return applyTwice([](int x) { return x + 3; }, 1);`,
        "7"
      ],
      [
        `return applyTwice([](int x) { return x * x; }, 3);`,
        "81"
      ],
      [
        `int k = 10;
return applyTwice([k](int x) { return x - k; }, 0);`,
        "-20"
      ],
    ],
    ["`std::function<int(int)>` can hold any lambda: just write `f(f(x))`."]
  );

  add("modern","medium","Unique Pointer Box",
    "unique_ptr<int> makeBox(int v) / int unbox(unique_ptr<int> p)",
    "Write `makeBox(v)` that returns a `unique_ptr<int>` owning the value `v`, and `unbox(p)` that takes ownership of a `unique_ptr<int>` and returns the value inside. Use `make_unique`.\n\nExample: `unbox(makeBox(7))` → `7`",
    [
      [
        `auto b = makeBox(7);
return unbox(move(b));`,
        "7"
      ],
      [
        `auto b = makeBox(-2);
*b *= 3;
return unbox(move(b));`,
        "-6"
      ],
      [
        `auto b = makeBox(5);
return *b + 1;`,
        "6"
      ],
    ],
    ["A `unique_ptr` cannot be copied, only moved: the parameter of `unbox` is taken by value, and the caller uses `std::move`."]
  );

  add("modern","hard","Function Composition",
    "function<int(int)> compose(function<int(int)> f, function<int(int)> g)",
    "Return a new function `h` such that `h(x) = f(g(x))`. The returned function must keep working after `compose` has returned (capture `f` and `g` by value).\n\nExample: `compose(x+1, x*2)(5)` → `11`",
    [
      [
        `auto h = compose([](int x) { return x + 1; }, [](int x) { return x * 2; });
return h(5);`,
        "11"
      ],
      [
        `auto h = compose([](int x) { return x * x; }, [](int x) { return x - 1; });
return h(4);`,
        "9"
      ],
      [
        `auto inc = [](int x) { return x + 1; };
auto h = compose(inc, compose(inc, inc));
return h(0);`,
        "3"
      ],
    ],
    ["Return a lambda `[f, g](int x) { return f(g(x)); }`. Capturing by value avoids dangling references."]
  );

  /* ══════════════════════════════════════════════════════════════════════ */
  (window.QUADRA_DATA = window.QUADRA_DATA || {}).cpp = {
    categories: CATEGORIES,
    questions: QUESTIONS
  };
})();
