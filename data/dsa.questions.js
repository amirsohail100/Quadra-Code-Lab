/* data/dsa.questions.js  –  Quadra Code Lab DSA track
   70 questions · 10 categories · 7 per category
   DSA is LANGUAGE-NEUTRAL: no code checker.
   Each question has: id, cat, level, title, desc (problem statement),
   examples [{input, output, explanation?}], constraints[], hints[], approach (hidden), pseudocode (hidden)
*/
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "arrays",   name: "Arrays & Hashing",   icon: "📊", desc: "Fundamental array problems with hash-map tricks" },
    { id: "twoptr",   name: "Two Pointers",        icon: "👆", desc: "Left/right pointer techniques" },
    { id: "sliding",  name: "Sliding Window",      icon: "🪟", desc: "Variable and fixed-size window patterns" },
    { id: "binary",   name: "Binary Search",       icon: "🔍", desc: "Search in sorted / monotonic spaces" },
    { id: "linked",   name: "Linked Lists",        icon: "🔗", desc: "Singly and doubly linked list operations" },
    { id: "trees",    name: "Trees",               icon: "🌳", desc: "Binary trees, BSTs, and traversals" },
    { id: "stack",    name: "Stack & Queue",       icon: "📚", desc: "Monotonic stacks, queues, and deques" },
    { id: "dp",       name: "Dynamic Programming", icon: "💡", desc: "1-D and 2-D DP patterns" },
    { id: "graphs",   name: "Graphs",              icon: "🕸️", desc: "BFS, DFS, and common graph algorithms" },
    { id: "greedy",   name: "Greedy Algorithms",   icon: "💰", desc: "Locally optimal choices for global solution" },
  ];

  const QUESTIONS = [];
  let _id = 0;
  function add(cat, level, title, desc, examples, constraints, hints, approach, pseudocode) {
    _id++;
    QUESTIONS.push({ id: cat + "-" + _id, cat, level, title, desc, examples, constraints, hints, approach, pseudocode });
  }

  /* ───────── Arrays & Hashing ───────── */
  add("arrays","easy","Contains Duplicate",
    "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and `false` if every element is distinct.",
    [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    ["1 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    ["A set only holds unique values."],
    "Insert each number into a hash set. If the number is already in the set, return true.",
    `set = empty\nfor x in nums:\n  if x in set: return true\n  set.add(x)\nreturn false`
  );

  add("arrays","easy","Valid Anagram",
    "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    ["1 ≤ s.length, t.length ≤ 5 × 10⁴", "s and t consist of lowercase English letters"],
    ["Count character frequencies."],
    "Count character frequencies for both strings. If the frequency maps are equal, they are anagrams.",
    `if len(s) != len(t): return false\ncount = {}\nfor c in s: count[c]++\nfor c in t:\n  count[c]--\n  if count[c] < 0: return false\nreturn true`
  );

  add("arrays","medium","Two Sum",
    "Given an array `nums` and a target, return indices `[i, j]` such that `nums[i] + nums[j] == target`. Exactly one solution exists and you may not use the same index twice.",
    [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    ["For each number, check if (target - number) was seen before."],
    "Use a hash map storing {value: index}. For each number, look up (target - num). If found, return both indices.",
    `seen = {}\nfor i, x in enumerate(nums):\n  need = target - x\n  if need in seen: return [seen[need], i]\n  seen[x] = i`
  );

  add("arrays","medium","Group Anagrams",
    "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100"],
    ["Anagrams produce the same sorted string."],
    "Use a hash map keyed by the sorted version of each string. Group strings by their sorted key.",
    `groups = defaultdict(list)\nfor s in strs:\n  key = sorted(s)\n  groups[key].append(s)\nreturn list(groups.values())`
  );

  add("arrays","hard","Longest Consecutive Sequence",
    "Given an unsorted array `nums`, return the length of the longest consecutive elements sequence. Must run in O(n).",
    [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "Sequence: [1,2,3,4]" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    ["0 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    ["A sequence starts where (n-1) is not in the set."],
    "Put all numbers in a set. For each number n where (n-1) is NOT in the set (sequence start), extend the sequence by checking n+1, n+2, etc.",
    `s = set(nums)\nbest = 0\nfor n in s:\n  if n-1 not in s:\n    cur = n\n    while cur in s: cur++\n    best = max(best, cur-n)\nreturn best`
  );

  /* ───────── Two Pointers ───────── */
  add("twoptr","easy","Valid Palindrome",
    "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome.",
    [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
      { input: 's = "race a car"', output: "false" },
    ],
    ["1 ≤ s.length ≤ 2 × 10⁵"],
    ["Use left and right pointers, skip non-alphanumeric."],
    "Two pointers from both ends. Skip non-alphanumeric characters and compare lowercased characters.",
    `l, r = 0, len(s)-1\nwhile l < r:\n  while l<r and not isalnum(s[l]): l++\n  while l<r and not isalnum(s[r]): r--\n  if lower(s[l]) != lower(s[r]): return false\n  l++; r--\nreturn true`
  );

  add("twoptr","easy","Squares of a Sorted Array",
    "Given a sorted array `nums` of integers, return an array of the squares of each number, also in sorted order.",
    [
      { input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]" },
      { input: "nums = [-7,-3,2,3,11]", output: "[4,9,9,49,121]" },
    ],
    ["1 ≤ nums.length ≤ 10⁴", "-10⁴ ≤ nums[i] ≤ 10⁴", "nums is sorted in non-decreasing order"],
    ["Largest squares come from the two ends."],
    "Use two pointers (left at start, right at end). Compare absolute values and fill the result from the end.",
    `res = [0]*n; l,r = 0,n-1; i = n-1\nwhile l<=r:\n  if abs(nums[l]) > abs(nums[r]): res[i]=nums[l]*nums[l]; l++\n  else: res[i]=nums[r]*nums[r]; r--\n  i--\nreturn res`
  );

  add("twoptr","medium","3Sum",
    "Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.",
    [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    ["Sort first; fix one element, two-pointer the rest."],
    "Sort the array. For each index i, use two pointers l=i+1, r=end. Move pointers based on sum. Skip duplicates.",
    `sort(nums)\nfor i in range(len-2):\n  if i>0 and nums[i]==nums[i-1]: continue\n  l,r = i+1, len-1\n  while l<r:\n    s = nums[i]+nums[l]+nums[r]\n    if s==0: add; skip dups; l++;r--\n    elif s<0: l++\n    else: r--`
  );

  add("twoptr","medium","Container With Most Water",
    "Given `n` non-negative integers `height[0..n-1]` representing vertical lines, find two lines that together with the x-axis forms a container holding the most water. Return the maximum amount of water.",
    [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    ["2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    ["Moving the taller pointer can only decrease the area."],
    "Start with two pointers at the ends. At each step compute area and move the pointer with the shorter height inward.",
    `l,r = 0, n-1; best = 0\nwhile l<r:\n  best = max(best, min(h[l],h[r])*(r-l))\n  if h[l] < h[r]: l++ else r--\nreturn best`
  );

  add("twoptr","hard","Trapping Rain Water",
    "Given an elevation map `height` where each bar has width 1, compute how much water it can trap after raining.",
    [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    ["1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    ["Water at position i = min(maxLeft, maxRight) - height[i]."],
    "Two pointers l, r. Track maxLeft and maxRight. If maxLeft < maxRight, process left side; else process right side.",
    `l,r=0,n-1; mL=mR=0; res=0\nwhile l<=r:\n  if mL<=mR:\n    mL=max(mL,h[l]); res+=mL-h[l]; l++\n  else:\n    mR=max(mR,h[r]); res+=mR-h[r]; r--\nreturn res`
  );

  /* ───────── Sliding Window ───────── */
  add("sliding","easy","Maximum Average Subarray I",
    "Given an integer array `nums` and an integer `k`, find the contiguous subarray of length `k` that has the maximum average value and return this value.",
    [
      { input: "nums = [1,12,-5,-6,50,3], k = 4", output: "12.75", explanation: "Max average is (12-5-6+50)/4 = 12.75" },
      { input: "nums = [5], k = 1", output: "5.0" },
    ],
    ["1 ≤ k ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    ["Slide a window of size k: add new element, remove old element."],
    "Compute sum of first k elements. Slide: add nums[i], subtract nums[i-k], update max.",
    `s = sum(nums[:k]); best = s\nfor i in range(k, n):\n  s += nums[i] - nums[i-k]\n  best = max(best, s)\nreturn best / k`
  );

  add("sliding","easy","Minimum Size Subarray Sum",
    "Given an array `nums` of positive integers and a positive integer `target`, return the minimal length of a contiguous subarray whose sum ≥ target. Return 0 if no such subarray exists.",
    [
      { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", explanation: "[4,3] has the minimal length" },
      { input: "target = 4, nums = [1,4,4]", output: "1" },
    ],
    ["1 ≤ target ≤ 10⁹", "1 ≤ nums.length ≤ 10⁵"],
    ["Expand right; shrink left when sum ≥ target."],
    "Variable sliding window. Expand right pointer, and when window sum ≥ target, shrink from left recording minimum length.",
    `l=0; s=0; best=inf\nfor r in range(n):\n  s+=nums[r]\n  while s>=target:\n    best=min(best,r-l+1); s-=nums[l]; l++\nreturn 0 if best==inf else best`
  );

  add("sliding","medium","Longest Substring Without Repeating Characters",
    "Given a string `s`, find the length of the longest substring without repeating characters.",
    [
      { input: 's = "abcabcbb"', output: "3", explanation: '"abc"' },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3", explanation: '"wke"' },
    ],
    ["0 ≤ s.length ≤ 5 × 10⁴"],
    ["Track last seen index of each character."],
    "Sliding window with a set/map. Expand right; if duplicate found, move left past the previous occurrence.",
    `seen={}; l=0; best=0\nfor r,c in enumerate(s):\n  if c in seen and seen[c]>=l: l=seen[c]+1\n  seen[c]=r\n  best=max(best,r-l+1)\nreturn best`
  );

  add("sliding","medium","Permutation in String",
    "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`.",
    [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: "true" },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: "false" },
    ],
    ["1 ≤ s1.length, s2.length ≤ 10⁴"],
    ["A fixed window of size len(s1) in s2; compare frequency maps."],
    "Maintain frequency counts for s1 and the current window in s2. Track number of characters with matching counts.",
    `count1=freq(s1); count2=freq(s2[:k])\nif count1==count2: return true\nfor i in k..len(s2)-1:\n  add s2[i], remove s2[i-k] from count2\n  if count1==count2: return true\nreturn false`
  );

  add("sliding","hard","Minimum Window Substring",
    "Given strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. Return `\"\"` if no such window exists.",
    [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    ["1 ≤ s.length ≤ 10⁵", "1 ≤ t.length ≤ 10⁴"],
    ["Track how many characters are satisfied (count == needed)."],
    "Two pointers l, r. Expand r until all chars satisfied. Then contract l to minimize, record window, repeat.",
    `need=freq(t); have=0; formed=len(need)\nl=0; best=(inf,0,0)\nfor r,c in enumerate(s):\n  window[c]++\n  if window[c]==need.get(c,0): have++\n  while have==formed:\n    update best if r-l+1 smaller\n    window[s[l]]--\n    if window[s[l]]<need.get(s[l],0): have--\n    l++\nreturn s[best[1]:best[2]+1]`
  );

  /* ───────── Binary Search ───────── */
  add("binary","easy","Binary Search",
    "Given a sorted array `nums` of distinct integers and a `target`, return the index of target or `-1` if not present.",
    [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
    ],
    ["1 ≤ nums.length ≤ 10⁴", "-10⁴ ≤ nums[i], target ≤ 10⁴"],
    ["Halve the search space each step."],
    "Classic binary search: l=0, r=n-1. Mid = (l+r)//2. Narrow range based on comparison.",
    `l,r=0,n-1\nwhile l<=r:\n  m=(l+r)//2\n  if nums[m]==target: return m\n  elif nums[m]<target: l=m+1\n  else: r=m-1\nreturn -1`
  );

  add("binary","easy","First Bad Version",
    "You are a product manager with `n` versions [1..n]. Some version k is the first bad one; all versions after k are also bad. You have `bool isBadVersion(v)`. Find the first bad version using the minimum number of calls.",
    [
      { input: "n = 5, bad = 4", output: "4", explanation: "Versions 4 and 5 are bad" },
      { input: "n = 1, bad = 1", output: "1" },
    ],
    ["1 ≤ bad ≤ n ≤ 2³¹ − 1"],
    ["If mid is bad, the answer is at most mid."],
    "Binary search: if isBadVersion(mid) is true, the first bad is ≤ mid so r=mid. Else l=mid+1.",
    `l,r=1,n\nwhile l<r:\n  m=l+(r-l)//2\n  if isBadVersion(m): r=m\n  else: l=m+1\nreturn l`
  );

  add("binary","medium","Search in Rotated Sorted Array",
    "An integer array `nums` sorted in ascending order is possibly rotated at some pivot. Given `nums` and `target`, return the index of target or `-1`.",
    [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    ["1 ≤ nums.length ≤ 5000", "All values are distinct"],
    ["At least one half is always sorted; check which half target falls in."],
    "Binary search with rotation awareness. Determine which half is sorted, then decide which half to continue.",
    `l,r=0,n-1\nwhile l<=r:\n  m=(l+r)//2\n  if nums[m]==target: return m\n  if nums[l]<=nums[m]:  # left sorted\n    if nums[l]<=target<nums[m]: r=m-1 else l=m+1\n  else:  # right sorted\n    if nums[m]<target<=nums[r]: l=m+1 else r=m-1\nreturn -1`
  );

  add("binary","medium","Find Minimum in Rotated Sorted Array",
    "Given a sorted rotated array `nums` with distinct values, find the minimum element. Must run in O(log n).",
    [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
      { input: "nums = [11,13,15,17]", output: "11" },
    ],
    ["1 ≤ nums.length ≤ 5000", "All values are distinct"],
    ["The minimum is in the unsorted half."],
    "If nums[mid] > nums[r], minimum is in the right half; else it is in the left half (including mid).",
    `l,r=0,n-1\nwhile l<r:\n  m=(l+r)//2\n  if nums[m]>nums[r]: l=m+1\n  else: r=m\nreturn nums[l]`
  );

  add("binary","hard","Median of Two Sorted Arrays",
    "Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays. Must run in O(log(m+n)).",
    [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
    ["0 ≤ m, n ≤ 1000", "nums1 and nums2 are sorted in non-decreasing order"],
    ["Binary search on the smaller array to find the right partition."],
    "Binary search on the smaller array. Find partition (i,j) such that left half ≤ right half across both arrays.",
    `Ensure len(A)<=len(B). Binary search i in [0,m].\nj=(m+n+1)//2 - i\nCheck: A[i-1]<=B[j] and B[j-1]<=A[i]\nCompute median from maxLeft and minRight`
  );

  /* ───────── Linked Lists ───────── */
  add("linked","easy","Reverse Linked List",
    "Given the head of a singly linked list, reverse it and return the new head.",
    [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" },
    ],
    ["0 ≤ length ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    ["Track prev, curr, next."],
    "Iterative: maintain prev=null, curr=head. At each step: save next, point curr→prev, advance both.",
    `prev=null; curr=head\nwhile curr:\n  next=curr.next\n  curr.next=prev\n  prev=curr; curr=next\nreturn prev`
  );

  add("linked","easy","Merge Two Sorted Lists",
    "Merge two sorted linked lists and return the head of the merged list (also sorted).",
    [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "l1 = [], l2 = []", output: "[]" },
    ],
    ["0 ≤ length ≤ 50", "-100 ≤ Node.val ≤ 100"],
    ["Use a dummy head node."],
    "Dummy node trick. At each step pick the smaller of l1.val and l2.val. Append remaining list at end.",
    `dummy=Node(0); tail=dummy\nwhile l1 and l2:\n  if l1.val<=l2.val: tail.next=l1; l1=l1.next\n  else: tail.next=l2; l2=l2.next\n  tail=tail.next\ntail.next = l1 or l2\nreturn dummy.next`
  );

  add("linked","medium","Linked List Cycle",
    "Given the head of a linked list, determine if it has a cycle. Return `true` if a cycle exists.",
    [
      { input: "head = [3,2,0,-4] (tail connects to index 1)", output: "true" },
      { input: "head = [1,2] (tail connects to index 0)", output: "true" },
      { input: "head = [1] (no cycle)", output: "false" },
    ],
    ["0 ≤ length ≤ 10⁴"],
    ["Fast and slow pointers; if they ever meet there's a cycle."],
    "Floyd's tortoise and hare. slow moves 1 step, fast moves 2 steps. If they meet → cycle exists.",
    `slow=head; fast=head\nwhile fast and fast.next:\n  slow=slow.next; fast=fast.next.next\n  if slow==fast: return true\nreturn false`
  );

  add("linked","medium","Remove Nth Node From End",
    "Given the head of a linked list and integer `n`, remove the nth node from the end and return the head.",
    [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" },
    ],
    ["1 ≤ length ≤ 30", "1 ≤ n ≤ length"],
    ["Advance one pointer by n; then move both until fast reaches end."],
    "Two pointers: advance fast by n+1 steps from dummy. Then move both until fast is null. slow.next is the node to remove.",
    `dummy.next=head; slow=dummy; fast=dummy\nfor i in range(n+1): fast=fast.next\nwhile fast:\n  slow=slow.next; fast=fast.next\nslow.next=slow.next.next\nreturn dummy.next`
  );

  add("linked","hard","LRU Cache",
    "Design a data structure that follows the Least Recently Used (LRU) cache constraint. Implement `LRUCache(capacity)`, `get(key)` (return -1 if not found), and `put(key, value)`. Both operations must be O(1).",
    [
      { input: 'LRUCache(2)\nput(1,1)\nput(2,2)\nget(1) → 1\nput(3,3) (evicts key 2)\nget(2) → -1\nget(3) → 3', output: "1, -1, 3" },
    ],
    ["1 ≤ capacity ≤ 3000", "0 ≤ key, value ≤ 10⁴", "At most 2 × 10⁵ operations"],
    ["Use a doubly linked list + hash map."],
    "HashMap for O(1) lookup. Doubly linked list to track order (head=most recent, tail=least recent). On get/put, move node to head; on eviction, remove tail.",
    `class Node: key,val,prev,next\nclass LRUCache:\n  map={}, head=dummy, tail=dummy\n  get: if key in map → move to head, return val; else -1\n  put: if key exists → update+move; else insert at head; if over capacity → remove tail`
  );

  /* ───────── Trees ───────── */
  add("trees","easy","Maximum Depth of Binary Tree",
    "Given the root of a binary tree, return its maximum depth (number of nodes along the longest root-to-leaf path).",
    [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    ["0 ≤ number of nodes ≤ 10⁴", "-100 ≤ Node.val ≤ 100"],
    ["Recursion: depth = 1 + max(left depth, right depth)."],
    "DFS: return 0 for null. For each node, recurse left and right, return 1 + max of both depths.",
    `def depth(node):\n  if not node: return 0\n  return 1 + max(depth(node.left), depth(node.right))`
  );

  add("trees","easy","Invert Binary Tree",
    "Given the root of a binary tree, invert it (mirror) and return the root.",
    [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    ["0 ≤ number of nodes ≤ 100"],
    ["Recursively swap left and right children."],
    "Recursive: swap node.left and node.right, then recursively invert both children.",
    `def invert(node):\n  if not node: return\n  node.left, node.right = node.right, node.left\n  invert(node.left); invert(node.right)\n  return node`
  );

  add("trees","medium","Validate Binary Search Tree",
    "Given the root of a binary tree, determine if it is a valid BST. A valid BST: left subtree values < node.val < right subtree values.",
    [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Root's right child (4) is less than root (5)" },
    ],
    ["1 ≤ number of nodes ≤ 10⁴", "-2³¹ ≤ Node.val ≤ 2³¹ − 1"],
    ["Pass min and max bounds through recursion."],
    "Recursive validate(node, min, max). Each node's value must be in (min, max). Left recurses with max=node.val, right with min=node.val.",
    `def valid(node, lo, hi):\n  if not node: return true\n  if not (lo < node.val < hi): return false\n  return valid(node.left, lo, node.val) and valid(node.right, node.val, hi)`
  );

  add("trees","medium","Level Order Traversal",
    "Given the root of a binary tree, return its level order traversal as `[[values at level 1], [values at level 2], ...]`.",
    [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    ["0 ≤ number of nodes ≤ 2000"],
    ["Use a queue (BFS). Process level by level."],
    "BFS with a queue. At each level, process all current-level nodes and enqueue their children.",
    `q=deque([root]); res=[]\nwhile q:\n  level=[]; n=len(q)\n  for _ in range(n):\n    node=q.popleft()\n    level.append(node.val)\n    if node.left: q.append(node.left)\n    if node.right: q.append(node.right)\n  res.append(level)\nreturn res`
  );

  add("trees","hard","Serialize and Deserialize Binary Tree",
    "Design an algorithm to serialize and deserialize a binary tree. `serialize(root)` returns a string; `deserialize(data)` reconstructs the tree. No restrictions on format.",
    [
      { input: "root = [1,2,3,null,null,4,5]", output: "serialize then deserialize returns the same tree" },
    ],
    ["0 ≤ number of nodes ≤ 10⁴", "-1000 ≤ Node.val ≤ 1000"],
    ["Preorder traversal with null markers."],
    "Serialize with preorder DFS, using 'null' for missing nodes. Deserialize with a queue of tokens.",
    `serialize: preorder with 'N' for null, join with ','\ndeserialize: split on ',', use index pointer\n  def build(): if tokens[i]=='N': i++;return null\n  node=Node(tokens[i]); i++\n  node.left=build(); node.right=build()\n  return node`
  );

  /* ───────── Stack & Queue ───────── */
  add("stack","easy","Valid Parentheses",
    "Given a string `s` containing only `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid (brackets properly opened and closed).",
    [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    ["1 ≤ s.length ≤ 10⁴"],
    ["Push open brackets; pop and match on close brackets."],
    "Use a stack. Push open brackets. For close brackets, check top of stack matches.",
    `stack=[]; match={')':'(',']':'[','}':'{'}\nfor c in s:\n  if c in '([{': stack.append(c)\n  elif not stack or stack[-1]!=match[c]: return false\n  else: stack.pop()\nreturn not stack`
  );

  add("stack","easy","Min Stack",
    "Design a stack that supports `push`, `pop`, `top`, and `getMin` — all in O(1). `getMin` returns the minimum element in the stack.",
    [
      { input: "push(-2), push(0), push(-3), getMin()→-3, pop(), top()→0, getMin()→-2", output: "-3, 0, -2" },
    ],
    ["−2³¹ ≤ val ≤ 2³¹ − 1", "pop/top/getMin are only called when non-empty"],
    ["Maintain a parallel 'min stack'."],
    "Two stacks: main and minStack. Push to minStack: min(val, minStack.top()). Pop both together.",
    `class MinStack:\n  stack=[]; minStack=[]\n  push(v): stack.append(v)\n    minStack.append(min(v, minStack[-1] if minStack else v))\n  pop: stack.pop(); minStack.pop()\n  getMin: return minStack[-1]`
  );

  add("stack","medium","Daily Temperatures",
    "Given a list `temperatures`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` for a warmer temperature. Use 0 if no future day is warmer.",
    [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
    ],
    ["1 ≤ n ≤ 10⁵", "30 ≤ temperatures[i] ≤ 100"],
    ["Monotonic decreasing stack of indices."],
    "Push indices onto a stack. When current temp > temp at stack top, pop and record the difference.",
    `stack=[]; res=[0]*n\nfor i,t in enumerate(temps):\n  while stack and temps[stack[-1]]<t:\n    j=stack.pop(); res[j]=i-j\n  stack.append(i)\nreturn res`
  );

  add("stack","medium","Evaluate Reverse Polish Notation",
    "Evaluate the value of an expression in Reverse Polish Notation (postfix). Valid operators: `+`, `-`, `*`, `/` (integer division truncating toward zero).",
    [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2+1)*3) = 9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4+(13/5)) = 6" },
    ],
    ["1 ≤ tokens.length ≤ 10⁴"],
    ["Push numbers; on operator, pop two and push result."],
    "Stack-based evaluation. Push operands. On operator, pop two values, apply operator, push result.",
    `stack=[]\nfor t in tokens:\n  if t in '+-*/':\n    b,a=stack.pop(),stack.pop()\n    if t=='+': stack.append(a+b)\n    elif t=='-': stack.append(a-b)\n    elif t=='*': stack.append(a*b)\n    else: stack.append(int(a/b))\n  else: stack.append(int(t))\nreturn stack[0]`
  );

  add("stack","hard","Largest Rectangle in Histogram",
    "Given an array `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    [
      { input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "Bars at indices 2-3 (height 5, width 2)" },
      { input: "heights = [2,4]", output: "4" },
    ],
    ["1 ≤ n ≤ 10⁵", "0 ≤ heights[i] ≤ 10⁴"],
    ["Monotonic increasing stack. Pop when you find a shorter bar."],
    "Monotonic stack. Push indices. When heights[i] < heights[stack.top()], pop and compute area using current index as right boundary and new top as left boundary.",
    `stack=[]; best=0\nfor i in range(n+1):\n  h = heights[i] if i<n else 0\n  while stack and heights[stack[-1]]>h:\n    H=heights[stack.pop()]\n    W=i if not stack else i-stack[-1]-1\n    best=max(best,H*W)\n  stack.append(i)\nreturn best`
  );

  /* ───────── Dynamic Programming ───────── */
  add("dp","easy","Climbing Stairs",
    "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" },
    ],
    ["1 ≤ n ≤ 45"],
    ["dp[i] = dp[i-1] + dp[i-2] (Fibonacci pattern)."],
    "dp[1]=1, dp[2]=2. For i≥3: dp[i]=dp[i-1]+dp[i-2]. Optimize with two variables.",
    `a,b=1,1\nfor _ in range(n-1): a,b=b,a+b\nreturn b`
  );

  add("dp","easy","House Robber",
    "You are a robber planning to rob houses along a street. Adjacent houses cannot be robbed. Given `nums[i]` = amount in house i, return the maximum amount you can rob without alerting police.",
    [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 and 3 (1+3=4)" },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1, 3, 5 (2+9+1=12)" },
    ],
    ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])."],
    "Track prev2 and prev1. For each house: new = max(prev1, prev2 + nums[i]). Update prev2=prev1, prev1=new.",
    `a,b=0,0\nfor x in nums: a,b=b,max(b,a+x)\nreturn b`
  );

  add("dp","medium","Coin Change",
    "Given an array of coin denominations `coins` and an amount `amount`, return the fewest number of coins needed to make up that amount. Return -1 if it's not possible.",
    [
      { input: "coins = [1,5,11], amount = 11", output: "1" },
      { input: "coins = [2], amount = 3", output: "-1" },
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "5+5+1" },
    ],
    ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹ − 1", "0 ≤ amount ≤ 10⁴"],
    ["dp[i] = minimum coins to make amount i."],
    "dp array of size amount+1, initialized to infinity. dp[0]=0. For each amount from 1 to amount, try all coins.",
    `dp=[inf]*(amount+1); dp[0]=0\nfor a in 1..amount:\n  for c in coins:\n    if a>=c: dp[a]=min(dp[a], 1+dp[a-c])\nreturn dp[amount] if dp[amount]!=inf else -1`
  );

  add("dp","medium","Longest Increasing Subsequence",
    "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
    ],
    ["1 ≤ nums.length ≤ 2500", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    ["O(n log n) with patience sorting (tails array)."],
    "Maintain tails array. For each num, binary search for its position in tails. If >= all, append; else replace.",
    `tails=[]\nfor x in nums:\n  lo,hi=0,len(tails)\n  while lo<hi:\n    m=(lo+hi)//2\n    if tails[m]<x: lo=m+1 else hi=m\n  if lo==len(tails): tails.append(x)\n  else: tails[lo]=x\nreturn len(tails)`
  );

  add("dp","hard","Edit Distance",
    "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace a character) required to convert `word1` to `word2`.",
    [
      { input: 'word1 = "horse", word2 = "ros"', output: "3" },
      { input: 'word1 = "intention", word2 = "execution"', output: "5" },
    ],
    ["0 ≤ word1.length, word2.length ≤ 500"],
    ["dp[i][j] = min edits to convert word1[:i] to word2[:j]."],
    "2D DP. Base cases: dp[i][0]=i, dp[0][j]=j. Transition: if chars match dp[i][j]=dp[i-1][j-1]; else 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
    `dp[i][j] = i if j==0, j if i==0\nif w1[i-1]==w2[j-1]: dp[i][j]=dp[i-1][j-1]\nelse: dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`
  );

  /* ───────── Graphs ───────── */
  add("graphs","easy","Number of Islands",
    "Given an `m×n` 2D grid of `'1'` (land) and `'0'` (water), count the number of islands (connected groups of `'1'` cells connected horizontally or vertically).",
    [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
    ["1 ≤ m, n ≤ 300"],
    ["DFS to mark each island."],
    "For each unvisited land cell, start a DFS/BFS marking all connected land as visited. Count DFS starts.",
    `def dfs(r,c):\n  if out of bounds or grid[r][c]!='1': return\n  grid[r][c]='0'\n  for each neighbor: dfs(nr,nc)\ncount=0\nfor r,c in grid:\n  if grid[r][c]=='1': dfs(r,c); count++\nreturn count`
  );

  add("graphs","easy","Clone Graph",
    "Given a reference to a node in a connected undirected graph, return a deep copy of the graph. Each node has a `val` and a list of `neighbors`.",
    [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "Deep copy of same structure" },
    ],
    ["1 ≤ nodes ≤ 100", "1 ≤ Node.val ≤ 100"],
    ["Use a hash map (original node → cloned node) to avoid re-cloning."],
    "BFS/DFS. When visiting a node, if not in map, create clone and add to map. For each neighbor, recurse and link clone.",
    `visited={}\ndef clone(node):\n  if node in visited: return visited[node]\n  copy=Node(node.val)\n  visited[node]=copy\n  for n in node.neighbors: copy.neighbors.append(clone(n))\n  return copy`
  );

  add("graphs","medium","Course Schedule",
    "There are `numCourses` courses (0 to numCourses-1). `prerequisites[i] = [a, b]` means you must take b before a. Determine if it is possible to finish all courses.",
    [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "Cycle" },
    ],
    ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
    ["Detect a cycle in a directed graph."],
    "Build adjacency list. DFS with 3 states per node: 0=unvisited, 1=in progress, 2=done. If you reach state 1, there's a cycle.",
    `state=[0]*n\ndef dfs(u):\n  if state[u]==1: return false (cycle)\n  if state[u]==2: return true\n  state[u]=1\n  for v in adj[u]:\n    if not dfs(v): return false\n  state[u]=2; return true`
  );

  add("graphs","medium","Pacific Atlantic Water Flow",
    "An island is represented by an `m×n` matrix `heights`. Water flows to Pacific (top/left borders) and Atlantic (bottom/right borders). Return coordinates from which water can flow to BOTH oceans.",
    [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
    ],
    ["1 ≤ m, n ≤ 200", "0 ≤ heights[i][j] ≤ 10⁵"],
    ["Reverse BFS: start from ocean borders, flow uphill."],
    "BFS from Pacific border cells and from Atlantic border cells. Mark reachable cells. Intersection is the answer.",
    `pacific=BFS from top/left borders (flow uphill)\natlantic=BFS from bottom/right borders (flow uphill)\nreturn intersection`
  );

  add("graphs","hard","Word Ladder",
    "Given `beginWord`, `endWord`, and a `wordList`, find the number of words in the shortest transformation sequence from `beginWord` to `endWord` where adjacent words differ by exactly one letter. Return 0 if no such sequence.",
    [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: "hit→hot→dot→dog→cog" },
    ],
    ["1 ≤ words.length ≤ 10", "beginWord, endWord, and all words have same length"],
    ["BFS level by level; each level = one transformation."],
    "BFS. Transform each word by changing each character to 'a'-'z'. If resulting word is in wordList and not visited, add to next level.",
    `q=deque([(beginWord,1)]); visited={beginWord}\nwhile q:\n  word,steps=q.popleft()\n  for each 1-char-change new_word:\n    if new_word==endWord: return steps+1\n    if new_word in wordSet and not visited: q.append((new_word,steps+1)); visited.add(new_word)\nreturn 0`
  );

  /* ───────── Greedy ───────── */
  add("greedy","easy","Jump Game",
    "Given an integer array `nums`, you are initially at index 0. Each element represents the maximum jump length from that position. Return `true` if you can reach the last index.",
    [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
    ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁵"],
    ["Track the maximum index reachable so far."],
    "Track maxReach = 0. For each index i ≤ maxReach, update maxReach = max(maxReach, i + nums[i]).",
    `reach=0\nfor i,v in enumerate(nums):\n  if i>reach: return false\n  reach=max(reach, i+v)\nreturn true`
  );

  add("greedy","easy","Assign Cookies",
    "You have children and cookies. `g[i]` is the greed factor of child i; `s[j]` is the size of cookie j. Cookie j satisfies child i if `s[j] ≥ g[i]`. Maximize the number of content children.",
    [
      { input: "g = [1,2,3], s = [1,1]", output: "1" },
      { input: "g = [1,2], s = [1,2,3]", output: "2" },
    ],
    ["1 ≤ g.length, s.length ≤ 3 × 10⁴", "1 ≤ g[i], s[j] ≤ 2³¹ − 1"],
    ["Sort both; match smallest satisfying cookie to smallest child."],
    "Sort g and s. Two pointers: if s[j] ≥ g[i], satisfy child i and advance both; else only advance j.",
    `sort(g); sort(s); i=j=0\nwhile i<len(g) and j<len(s):\n  if s[j]>=g[i]: i++\n  j++\nreturn i`
  );

  add("greedy","medium","Gas Station",
    "There are `n` gas stations in a circuit. `gas[i]` is the gas at station i; `cost[i]` is the gas to travel from station i to i+1. Can you complete the circuit? If yes, return the starting station index; otherwise return -1. The answer is unique if it exists.",
    [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
    ],
    ["n == gas.length == cost.length", "1 ≤ n ≤ 10⁵", "0 ≤ gas[i], cost[i] ≤ 10⁴"],
    ["If total gas ≥ total cost, a solution exists; the start is where cumulative tank would have gone negative last."],
    "Traverse once. Track total and current tank. When current tank < 0, reset start to i+1.",
    `total=0; tank=0; start=0\nfor i in range(n):\n  diff=gas[i]-cost[i]\n  total+=diff; tank+=diff\n  if tank<0: start=i+1; tank=0\nreturn start if total>=0 else -1`
  );

  add("greedy","medium","Task Scheduler",
    "You have CPU tasks labeled A-Z, with a cooldown `n` between same-task executions. Find the minimum number of intervals the CPU needs to finish all tasks (it can be idle).",
    [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", explanation: "AB_AB_AB" },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: "6" },
    ],
    ["1 ≤ tasks.length ≤ 10⁴", "0 ≤ n ≤ 100"],
    ["The most frequent task determines the frame length."],
    "Let f = max frequency. The answer is max(len(tasks), (f-1)*(n+1) + count_of_tasks_with_max_freq).",
    `freq=Counter(tasks); f=max(freq.values())\nslots=(f-1)*(n+1)\nslots += sum(1 for v in freq.values() if v==f)\nreturn max(len(tasks), slots)`
  );

  add("greedy","hard","Merge Intervals (Minimum Rooms)",
    "Given an array of meeting time intervals `intervals[i] = [start, end]`, return the minimum number of conference rooms required.",
    [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
      { input: "intervals = [[7,10],[2,4]]", output: "1" },
    ],
    ["1 ≤ intervals.length ≤ 10⁴", "0 ≤ start < end ≤ 10⁶"],
    ["Sort start times; use a min-heap of end times."],
    "Sort by start time. Use a min-heap of end times. For each meeting, if earliest end ≤ start, reuse that room (pop); always push current end. Answer = heap size.",
    `sort by start; heap=[]\nfor s,e in intervals:\n  if heap and heap[0]<=s: heappop(heap)\n  heappush(heap, e)\nreturn len(heap)`
  );

  /* ═══════════ MORE QUESTIONS (added in Quadra Code Lab) ═══════════ */

  /* ───────── Arrays & Hashing ───────── */
  add("arrays","easy","Missing Number",
    "Given an array `nums` containing `n` distinct numbers taken from the range `[0, n]`, return the only number in the range that is missing from the array.",
    [
      { input: "nums = [3,0,1]", output: "2", explanation: "n = 3, so the range is [0, 3]. The number 2 is missing." },
      { input: "nums = [0,1]", output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    ["n == nums.length", "1 ≤ n ≤ 10⁴", "0 ≤ nums[i] ≤ n", "All numbers are unique"],
    ["What is the sum of 0..n? What is the sum of the array?"],
    "The sum of 0..n is n(n+1)/2. Subtract the sum of the array from it: the difference is the missing number. O(n) time, O(1) space.",
    `n = len(nums)\nexpected = n * (n + 1) / 2\nreturn expected - sum(nums)`
  );

  add("arrays","medium","Top K Frequent Elements",
    "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order. The answer is guaranteed to be unique.",
    [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
      { input: "nums = [4,4,4,5,5,6,6,6,6], k = 1", output: "[6]" },
    ],
    ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "1 ≤ k ≤ number of distinct elements"],
    ["Count the frequencies first.", "Try bucket sort: the frequency can never be larger than nums.length."],
    "Count frequencies with a hash map. Create buckets where index i holds the numbers that appear i times. Walk the buckets from the highest index down and collect numbers until you have k. O(n) time.",
    `count = {}\nfor x in nums: count[x]++\nbuckets = list of (len(nums)+1) empty lists\nfor x, c in count: buckets[c].append(x)\nresult = []\nfor c from len(nums) down to 1:\n  for x in buckets[c]:\n    result.append(x)\n    if len(result) == k: return result`
  );

  /* ───────── Two Pointers ───────── */
  add("twoptr","easy","Move Zeroes",
    "Given an integer array `nums`, move all `0`s to the end of it while keeping the relative order of the non-zero elements. Do it IN PLACE (do not make a copy of the array).",
    [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]", output: "[0]" },
      { input: "nums = [4,2,4,0,0,3,0,5,1,0]", output: "[4,2,4,3,5,1,0,0,0,0]" },
    ],
    ["1 ≤ nums.length ≤ 10⁴", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1"],
    ["Keep a 'write' pointer for the next place where a non-zero value belongs."],
    "Use two pointers. The read pointer scans the array. Every non-zero value is copied to the write position and the write pointer moves forward. At the end fill the rest of the array with zeros. O(n) time, O(1) space.",
    `write = 0\nfor read in 0..n-1:\n  if nums[read] != 0:\n    nums[write] = nums[read]\n    write++\nwhile write < n:\n  nums[write] = 0\n  write++`
  );

  add("twoptr","medium","Sort Colors",
    "An array `nums` holds only `0`, `1` and `2` (red, white, blue). Sort it IN PLACE so the same colors are next to each other in the order 0, 1, 2. Do not use the built-in sort function.",
    [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
      { input: "nums = [2,0,1]", output: "[0,1,2]" },
      { input: "nums = [1,1,0,2,0]", output: "[0,0,1,1,2]" },
    ],
    ["1 ≤ nums.length ≤ 300", "nums[i] is 0, 1 or 2"],
    ["Use three pointers: low, mid and high.", "This is the Dutch national flag problem. Solve it in a single pass."],
    "Keep `low` (next place for a 0), `high` (next place for a 2) and `mid` (the scanner). If nums[mid] is 0, swap with low and move both forward. If it is 2, swap with high and move high back (do not move mid). If it is 1 just move mid. One pass, O(1) space.",
    `low = 0; mid = 0; high = n - 1\nwhile mid <= high:\n  if nums[mid] == 0: swap(nums[low], nums[mid]); low++; mid++\n  elif nums[mid] == 1: mid++\n  else: swap(nums[mid], nums[high]); high--`
  );

  /* ───────── Sliding Window ───────── */
  add("sliding","easy","Best Time to Buy and Sell Stock",
    "`prices[i]` is the price of a stock on day `i`. You may buy on one day and sell on a LATER day (one transaction only). Return the maximum profit, or `0` if no profit is possible.",
    [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1 (day 2) and sell at 6 (day 5)." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "The price only falls, so do not trade." },
      { input: "prices = [2,4,1]", output: "2" },
    ],
    ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    ["Keep track of the cheapest price seen so far."],
    "Scan once. Keep the minimum price so far. For each day, the best profit if you sell today is price - minSoFar. Keep the largest such profit. O(n) time, O(1) space.",
    `minPrice = infinity; best = 0\nfor p in prices:\n  minPrice = min(minPrice, p)\n  best = max(best, p - minPrice)\nreturn best`
  );

  add("sliding","medium","Longest Repeating Character Replacement",
    "You are given a string `s` of upper-case letters and an integer `k`. You may change at most `k` characters to any other letter. Return the length of the longest substring that contains only one repeated letter after the changes.",
    [
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Change the two A's to B (or the two B's to A)." },
      { input: 's = "AABABBA", k = 1', output: "4", explanation: 'Change one B in "AABA" to A to get "AAAA".' },
      { input: 's = "AAAA", k = 0', output: "4" },
    ],
    ["1 ≤ s.length ≤ 10⁵", "s has only upper-case English letters", "0 ≤ k ≤ s.length"],
    ["A window is valid when (window length - count of its most frequent letter) ≤ k."],
    "Slide a window [left, right]. Keep letter counts and the highest count `maxFreq` seen in the window. If the window length minus maxFreq is more than k, the window is invalid: shrink it from the left by one. The answer is the largest window length seen. O(n) time.",
    `count = {}; left = 0; maxFreq = 0; best = 0\nfor right in 0..n-1:\n  count[s[right]]++\n  maxFreq = max(maxFreq, count[s[right]])\n  if (right - left + 1) - maxFreq > k:\n    count[s[left]]--\n    left++\n  best = max(best, right - left + 1)\nreturn best`
  );

  /* ───────── Binary Search ───────── */
  add("binary","easy","Search Insert Position",
    "Given a sorted array of distinct integers `nums` and a `target`, return the index of the target if it is found. If not, return the index where it would be inserted to keep the array sorted. Your solution must run in O(log n).",
    [
      { input: "nums = [1,3,5,6], target = 5", output: "2" },
      { input: "nums = [1,3,5,6], target = 2", output: "1" },
      { input: "nums = [1,3,5,6], target = 7", output: "4" },
    ],
    ["1 ≤ nums.length ≤ 10⁴", "nums is sorted in ascending order with distinct values"],
    ["You are looking for the first index whose value is ≥ target."],
    "Binary search with lo = 0 and hi = n. While lo < hi, look at mid. If nums[mid] < target the answer is to the right (lo = mid + 1), else hi = mid. At the end lo is the answer (the 'lower bound'). O(log n).",
    `lo = 0; hi = len(nums)\nwhile lo < hi:\n  mid = (lo + hi) // 2\n  if nums[mid] < target: lo = mid + 1\n  else: hi = mid\nreturn lo`
  );

  add("binary","medium","Find Peak Element",
    "A peak element is strictly greater than its neighbours. Given an array `nums` where neighbouring values are never equal, return the index of ANY peak. Imagine `nums[-1]` and `nums[n]` are minus infinity. Your solution must run in O(log n).",
    [
      { input: "nums = [1,2,3,1]", output: "2", explanation: "3 is a peak (index 2)." },
      { input: "nums = [1,2,1,3,5,6,4]", output: "1 or 5", explanation: "Both index 1 (value 2) and index 5 (value 6) are peaks. Any one is accepted." },
      { input: "nums = [5,4,3]", output: "0" },
    ],
    ["1 ≤ nums.length ≤ 1000", "nums[i] != nums[i + 1]"],
    ["Compare nums[mid] with nums[mid + 1]: the slope tells you which side must contain a peak."],
    "Binary search on the slope. If nums[mid] < nums[mid + 1] the array is rising, so a peak exists on the right (lo = mid + 1). Otherwise a peak exists at mid or on the left (hi = mid). When lo == hi it is a peak. O(log n).",
    `lo = 0; hi = n - 1\nwhile lo < hi:\n  mid = (lo + hi) // 2\n  if nums[mid] < nums[mid + 1]: lo = mid + 1\n  else: hi = mid\nreturn lo`
  );

  /* ───────── Linked Lists ───────── */
  add("linked","easy","Middle of the Linked List",
    "Given the head of a singly linked list, return the middle node (with everything after it). If there are two middle nodes, return the SECOND one.",
    [
      { input: "head = [1,2,3,4,5]", output: "[3,4,5]" },
      { input: "head = [1,2,3,4,5,6]", output: "[4,5,6]", explanation: "Two middles (3 and 4): return the second one." },
      { input: "head = [7]", output: "[7]" },
    ],
    ["1 ≤ number of nodes ≤ 100", "1 ≤ Node.val ≤ 100"],
    ["Use a slow pointer and a fast pointer."],
    "Move `slow` by one node and `fast` by two nodes. When fast reaches the end, slow is in the middle. The loop condition `fast and fast.next` makes slow land on the second middle for even lengths. O(n) time, O(1) space.",
    `slow = head; fast = head\nwhile fast and fast.next:\n  slow = slow.next\n  fast = fast.next.next\nreturn slow`
  );

  add("linked","medium","Palindrome Linked List",
    "Given the head of a singly linked list, return `true` if its values read the same forwards and backwards. Try to use O(1) extra space.",
    [
      { input: "head = [1,2,2,1]", output: "true" },
      { input: "head = [1,2]", output: "false" },
      { input: "head = [1,2,3,2,1]", output: "true" },
    ],
    ["1 ≤ number of nodes ≤ 10⁵", "0 ≤ Node.val ≤ 9"],
    ["Find the middle, reverse the second half, then compare the two halves."],
    "Find the middle with slow/fast pointers. Reverse the second half of the list in place. Walk the first half and the reversed second half together, comparing values. (Optionally reverse the second half back afterwards.) O(n) time, O(1) space.",
    `find middle with slow/fast\nsecond = reverse(middle)\nfirst = head\nwhile second:\n  if first.val != second.val: return false\n  first = first.next; second = second.next\nreturn true`
  );

  /* ───────── Trees ───────── */
  add("trees","easy","Symmetric Tree",
    "Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its centre).",
    [
      { input: "root = [1,2,2,3,4,4,3]", output: "true" },
      { input: "root = [1,2,2,null,3,null,3]", output: "false" },
      { input: "root = [1]", output: "true" },
    ],
    ["0 ≤ number of nodes ≤ 1000", "-100 ≤ Node.val ≤ 100"],
    ["Write a helper that compares TWO nodes: the left child of one with the right child of the other."],
    "Define mirror(a, b): both empty → true; only one empty → false; values differ → false; otherwise mirror(a.left, b.right) and mirror(a.right, b.left). The tree is symmetric if mirror(root.left, root.right) is true. O(n).",
    `def mirror(a, b):\n  if a is null and b is null: return true\n  if a is null or b is null: return false\n  return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)\nreturn root is null or mirror(root.left, root.right)`
  );

  add("trees","medium","Lowest Common Ancestor of a BST",
    "Given a binary SEARCH tree and two nodes `p` and `q` that exist in it, return their lowest common ancestor: the deepest node that has both `p` and `q` as descendants (a node can be a descendant of itself).",
    [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2", explanation: "A node can be its own descendant." },
      { input: "root = [2,1], p = 2, q = 1", output: "2" },
    ],
    ["2 ≤ number of nodes ≤ 10⁵", "All values are unique", "p != q and both exist in the tree"],
    ["Use the BST property: smaller values are on the left, bigger values on the right."],
    "Start at the root. If both p and q are smaller than the current node, go left. If both are larger, go right. Otherwise the current node splits them (or equals one of them): it is the answer. O(h) time, O(1) space.",
    `node = root\nwhile node:\n  if p < node.val and q < node.val: node = node.left\n  elif p > node.val and q > node.val: node = node.right\n  else: return node`
  );

  /* ───────── Stack & Queue ───────── */
  add("stack","easy","Backspace String Compare",
    "Two strings `s` and `t` are typed into empty text editors. The character `#` means backspace (it deletes the previous character, and does nothing on an empty text). Return `true` if the two final texts are equal.",
    [
      { input: 's = "ab#c", t = "ad#c"', output: "true", explanation: 'Both become "ac".' },
      { input: 's = "ab##", t = "c#d#"', output: "true", explanation: 'Both become "".' },
      { input: 's = "a#c", t = "b"', output: "false", explanation: '"c" is not "b".' },
    ],
    ["1 ≤ s.length, t.length ≤ 200", "s and t contain lower-case letters and '#'"],
    ["Build the final text of each string with a stack."],
    "Write a helper `build(str)`: push every letter on a stack and pop the stack on '#' (if it is not empty). Compare build(s) with build(t). O(n) time. (A two-pointer scan from the end gives O(1) space.)",
    `def build(str):\n  stack = []\n  for ch in str:\n    if ch == '#':\n      if stack: stack.pop()\n    else: stack.push(ch)\n  return stack\nreturn build(s) == build(t)`
  );

  add("stack","medium","Next Greater Element I",
    "`nums1` is a subset of `nums2` (all values are unique). For each value of `nums1`, find its position in `nums2` and return the first greater value to the RIGHT of it in `nums2`, or `-1` if there is none.",
    [
      { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]", explanation: "4 has nothing greater on its right, 1 → 3, 2 has nothing greater on its right." },
      { input: "nums1 = [2,4], nums2 = [1,2,3,4]", output: "[3,-1]" },
      { input: "nums1 = [1], nums2 = [1]", output: "[-1]" },
    ],
    ["1 ≤ nums1.length ≤ nums2.length ≤ 1000", "All integers are unique", "nums1 is a subset of nums2"],
    ["Compute the next greater element for every number of nums2 once, using a monotonic stack and a hash map."],
    "Walk through nums2 and keep a stack of values that are still waiting for a greater element (the stack is decreasing). When a bigger value arrives, pop smaller values and record `next[popped] = current`. Remaining stack values have no answer (-1). Finally look up every nums1 value in the map. O(n + m).",
    `next = {}; stack = []\nfor x in nums2:\n  while stack and stack.top < x:\n    next[stack.pop()] = x\n  stack.push(x)\nreturn [next.get(v, -1) for v in nums1]`
  );

  /* ───────── Dynamic Programming ───────── */
  add("dp","easy","Min Cost Climbing Stairs",
    "`cost[i]` is the price of stepping ON stair `i`. After paying you may climb one or two stairs. You can start from stair 0 or stair 1. Return the minimum cost to reach the TOP (the position just after the last stair).",
    [
      { input: "cost = [10,15,20]", output: "15", explanation: "Start at stair 1, pay 15 and climb two stairs." },
      { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6" },
      { input: "cost = [5,5]", output: "5" },
    ],
    ["2 ≤ cost.length ≤ 1000", "0 ≤ cost[i] ≤ 999"],
    ["The cheapest way to stand on stair i depends only on stairs i-1 and i-2."],
    "Let dp[i] be the minimum cost to arrive at position i (dp[0] = dp[1] = 0). To arrive at i you come from i-1 (paying cost[i-1]) or from i-2 (paying cost[i-2]). dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]). The answer is dp[n]. Two variables are enough: O(1) space.",
    `a = 0; b = 0   # dp[i-2], dp[i-1]\nfor i in 2..n:\n  a, b = b, min(b + cost[i-1], a + cost[i-2])\nreturn b`
  );

  add("dp","medium","Unique Paths",
    "A robot starts at the top-left cell of an `m x n` grid and wants to reach the bottom-right cell. It can only move RIGHT or DOWN. Return the number of different paths.",
    [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3", explanation: "Right→Down→Down, Down→Down→Right, Down→Right→Down." },
      { input: "m = 1, n = 1", output: "1" },
    ],
    ["1 ≤ m, n ≤ 100", "The answer fits in a 64-bit integer"],
    ["The number of ways to reach a cell = ways from the cell above + ways from the cell on the left."],
    "dp[r][c] = dp[r-1][c] + dp[r][c-1], and the first row and first column are all 1. A single row array is enough: for each row, dp[c] += dp[c-1]. O(m·n) time, O(n) space.",
    `dp = [1] * n\nfor r in 1..m-1:\n  for c in 1..n-1:\n    dp[c] += dp[c-1]\nreturn dp[n-1]`
  );

  /* ───────── Graphs ───────── */
  add("graphs","easy","Find if Path Exists in Graph",
    "There are `n` vertices numbered `0` to `n-1` and a list of bidirectional `edges`. Return `true` if there is a path from `source` to `destination`, otherwise `false`.",
    [
      { input: "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2", output: "true" },
      { input: "n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5", output: "false", explanation: "{0,1,2} and {3,4,5} are two separate groups." },
      { input: "n = 1, edges = [], source = 0, destination = 0", output: "true" },
    ],
    ["1 ≤ n ≤ 2 × 10⁵", "0 ≤ edges.length ≤ 2 × 10⁵", "No duplicate edges and no self loops"],
    ["Build an adjacency list, then run BFS or DFS from the source."],
    "Build an adjacency list (each edge is added in both directions). Run BFS from `source` with a visited set. If you ever reach `destination` return true; when the queue is empty return false. O(n + E).",
    `graph = adjacency list from edges\nqueue = [source]; seen = {source}\nwhile queue:\n  node = queue.pop_front()\n  if node == destination: return true\n  for nb in graph[node]:\n    if nb not in seen: seen.add(nb); queue.push(nb)\nreturn false`
  );

  add("graphs","medium","Rotting Oranges",
    "A grid holds `0` (empty), `1` (fresh orange) and `2` (rotten orange). Every minute each fresh orange that is next to a rotten one (up, down, left, right) becomes rotten. Return the minimum number of minutes until no fresh orange is left, or `-1` if that is impossible.",
    [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" },
      { input: "grid = [[2,1,1],[0,1,1],[1,0,1]]", output: "-1", explanation: "The bottom-left orange is never reached (no 4-direction contact)." },
      { input: "grid = [[0,2]]", output: "0", explanation: "There is no fresh orange, so nothing to wait for." },
    ],
    ["1 ≤ rows, columns ≤ 10", "grid[i][j] is 0, 1 or 2"],
    ["Start BFS from ALL rotten oranges at the same time (multi-source BFS).", "Count the fresh oranges so you know if some are left at the end."],
    "Put every rotten orange into the queue and count the fresh ones. Process the queue level by level; each level is one minute. For every rotten orange infect its fresh neighbours, decrement the fresh counter and queue them. Return the number of levels processed if fresh == 0, else -1. O(rows·cols).",
    `queue = all (r,c) with grid==2; fresh = count of 1s; minutes = 0\nwhile queue and fresh > 0:\n  for each orange in current level:\n    for each neighbour that is 1:\n      grid = 2; fresh--; queue.push(neighbour)\n  minutes++\nreturn minutes if fresh == 0 else -1`
  );

  /* ───────── Greedy ───────── */
  add("greedy","easy","Best Time to Buy and Sell Stock II",
    "`prices[i]` is the stock price on day `i`. You may buy and sell as many times as you want, but you can hold only one share at a time (sell before you buy again). Return the maximum total profit.",
    [
      { input: "prices = [7,1,5,3,6,4]", output: "7", explanation: "Buy at 1, sell at 5 (+4). Buy at 3, sell at 6 (+3)." },
      { input: "prices = [1,2,3,4,5]", output: "4" },
      { input: "prices = [7,6,4,3,1]", output: "0" },
    ],
    ["1 ≤ prices.length ≤ 3 × 10⁴", "0 ≤ prices[i] ≤ 10⁴"],
    ["Every rise from one day to the next is profit you can collect."],
    "Greedy: add up every positive difference between two consecutive days. Collecting each small rise gives the same profit as buying at every valley and selling at every peak. O(n) time, O(1) space.",
    `profit = 0\nfor i in 1..n-1:\n  if prices[i] > prices[i-1]:\n    profit += prices[i] - prices[i-1]\nreturn profit`
  );

  add("greedy","medium","Partition Labels",
    "Split the string `s` into as many parts as possible so that each letter appears in at most ONE part. Return the sizes of the parts in order.",
    [
      { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]", explanation: 'The parts are "ababcbaca", "defegde", "hijhklij".' },
      { input: 's = "eccbbbbdec"', output: "[10]" },
      { input: 's = "abc"', output: "[1,1,1]" },
    ],
    ["1 ≤ s.length ≤ 500", "s has only lower-case English letters"],
    ["Find the LAST position of every letter first."],
    "Record the last index of every letter. Scan the string keeping `end` = the furthest last-index of all letters seen in the current part. When the scan index reaches `end`, the part is complete: store its size and start a new part. O(n).",
    `last = {ch: last index of ch}\nstart = 0; end = 0; result = []\nfor i in 0..n-1:\n  end = max(end, last[s[i]])\n  if i == end:\n    result.append(end - start + 1)\n    start = i + 1\nreturn result`
  );

  /* ══════════════════════════════════════════════════════════════════════ */
  (window.QUADRA_DATA = window.QUADRA_DATA || {}).dsa = {
    categories: CATEGORIES,
    questions: QUESTIONS
  };
})();
