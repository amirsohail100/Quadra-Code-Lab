/* =====================================================================
   data/python.questions.js  -  all Python categories and questions.

   Add a question:
     add(categoryId, level, title, functionName, starterCode, description, tests, hints);
   - level : "easy" | "medium" | "hard"
   - tests : [ [pythonCode, expectedPythonLiteral], ... ]
       * single expression  -> its value is compared
       * several lines      -> the code must set a variable called `result`
       * helpers _write(path, text) and _read(path) are available;
         every test runs in a fresh temporary folder.
   The first 2 tests are shown as "Samples", the rest as "More test cases".
   The reference answer goes into data/python.solutions.js (same id).
   ===================================================================== */
(function () {
"use strict";

const CATEGORIES = [
  { id: "basics",    name: "Python Basics",              icon: "🧱", desc: "Conditions, loops, numbers and logic - the foundation of everything." },
  { id: "lists",     name: "List Manipulation",          icon: "📋", desc: "Searching, merging, rotating and reshaping lists." },
  { id: "dicts",     name: "Dictionary Manipulation",    icon: "🗂️", desc: "Counting, grouping, merging and nesting dictionaries." },
  { id: "json",      name: "JSON Manipulation",          icon: "🧾", desc: "Parse, build, search and transform JSON data and files." },
  { id: "files",     name: "File Handling",              icon: "📁", desc: "Read, write, append and process text and CSV files with open()." },
  { id: "os",        name: "OS Module",                  icon: "💻", desc: "Paths, folders and directory walking with os and os.path." },
  { id: "classes",   name: "Python Classes (OOP)",       icon: "🏛️", desc: "Classes, inheritance, dunder methods, properties and abstract classes." },
  { id: "async",     name: "Asynchronous Programming",   icon: "⚡", desc: "asyncio: coroutines, gather, timeouts, queues and semaphores." },
  { id: "strings",   name: "String Magic (Extra)",       icon: "🔤", desc: "Text processing problems that every Python developer should know." },
  { id: "functions", name: "Functions, Decorators & Generators (Extra)", icon: "🎩", desc: "Closures, decorators, generators and custom exceptions." }
];

const QUESTIONS = [];
const _counter = {};
function add(cat, level, title, fn, sig, desc, tests, hints) {
  _counter[cat] = (_counter[cat] || 0) + 1;
  QUESTIONS.push({
    id: cat + "-" + _counter[cat], cat, level, title, fn,
    sig: sig.includes("\n") ? sig : sig + "\n    pass",
    desc, tests, hints: hints || []
  });
}

/* ============================ 1. PYTHON BASICS ============================ */
add("basics", "easy", "Even or Odd", "is_even", "def is_even(n):",
  "Return `True` if the integer `n` is even, otherwise `False`. Zero and negative numbers are allowed.",
  [["is_even(4)", "True"], ["is_even(7)", "False"], ["is_even(0)", "True"], ["is_even(-3)", "False"]],
  ["`n % 2` is the remainder after dividing by 2."]);

add("basics", "easy", "Celsius to Fahrenheit", "celsius_to_fahrenheit", "def celsius_to_fahrenheit(c):",
  "Convert a temperature from Celsius to Fahrenheit using `F = C * 9 / 5 + 32`. Return a float.",
  [["celsius_to_fahrenheit(0)", "32.0"], ["celsius_to_fahrenheit(100)", "212.0"], ["celsius_to_fahrenheit(-40)", "-40.0"]],
  ["Division with `/` always gives a float."]);

add("basics", "easy", "Sum of Digits", "sum_of_digits", "def sum_of_digits(n):",
  "Return the sum of the digits of a non-negative integer `n`.",
  [["sum_of_digits(123)", "6"], ["sum_of_digits(0)", "0"], ["sum_of_digits(9999)", "36"], ["sum_of_digits(1005)", "6"]],
  ["Convert to a string, or use `% 10` and `// 10` in a loop."]);

add("basics", "easy", "FizzBuzz List", "fizzbuzz", "def fizzbuzz(n):",
  "Return a list of strings for the numbers 1 to `n`. Multiples of 3 become `'Fizz'`, multiples of 5 become `'Buzz'`, multiples of both become `'FizzBuzz'`, every other number becomes its own string (e.g. `'4'`).",
  [["fizzbuzz(5)", "['1', '2', 'Fizz', '4', 'Buzz']"], ["fizzbuzz(3)", "['1', '2', 'Fizz']"], ["fizzbuzz(15)[-1]", "'FizzBuzz'"], ["fizzbuzz(0)", "[]"]],
  ["Check the multiple of 15 (or both 3 and 5) first."]);

add("basics", "medium", "Prime Check", "is_prime", "def is_prime(n):",
  "Return `True` if the integer `n` is a prime number, otherwise `False`. Numbers below 2 are not prime.",
  [["is_prime(2)", "True"], ["is_prime(1)", "False"], ["is_prime(17)", "True"], ["is_prime(18)", "False"], ["is_prime(97)", "True"], ["is_prime(0)", "False"]],
  ["You only need to test divisors up to the square root of `n`."]);

add("basics", "medium", "GCD and LCM", "gcd_lcm", "def gcd_lcm(a, b):",
  "Return a tuple `(gcd, lcm)` of two positive integers. Do not use `math.gcd`.",
  [["gcd_lcm(12, 18)", "(6, 36)"], ["gcd_lcm(7, 5)", "(1, 35)"], ["gcd_lcm(10, 10)", "(10, 10)"], ["gcd_lcm(100, 75)", "(25, 300)"]],
  ["Euclid: `while b: a, b = b, a % b`.", "lcm = a * b // gcd"]);

add("basics", "medium", "Collatz Steps", "collatz_steps", "def collatz_steps(n):",
  "Start from `n`. If it is even divide it by 2, if odd multiply by 3 and add 1. Repeat until you reach 1. Return how many steps it took (`n = 1` takes 0 steps).",
  [["collatz_steps(1)", "0"], ["collatz_steps(6)", "8"], ["collatz_steps(7)", "16"], ["collatz_steps(27)", "111"]],
  ["Use `//` for integer division so you do not get floats."]);

add("basics", "hard", "Integer to Roman", "to_roman", "def to_roman(n):",
  "Convert an integer from 1 to 3999 into a Roman numeral string.",
  [["to_roman(4)", "'IV'"], ["to_roman(9)", "'IX'"], ["to_roman(58)", "'LVIII'"], ["to_roman(1994)", "'MCMXCIV'"], ["to_roman(3999)", "'MMMCMXCIX'"]],
  ["Keep a list of (value, symbol) pairs including 900 = CM, 400 = CD, 90 = XC, 40 = XL, 9 = IX, 4 = IV and subtract greedily."]);

add("basics", "hard", "Number to Words", "number_to_words", "def number_to_words(n):",
  "Convert an integer from 0 to 999 into English words in lowercase. Use a hyphen between tens and ones (`'forty-five'`), a space between hundreds and the rest, and no word `and`.",
  [["number_to_words(0)", "'zero'"], ["number_to_words(13)", "'thirteen'"], ["number_to_words(45)", "'forty-five'"], ["number_to_words(100)", "'one hundred'"], ["number_to_words(342)", "'three hundred forty-two'"], ["number_to_words(105)", "'one hundred five'"], ["number_to_words(999)", "'nine hundred ninety-nine'"]],
  ["Make lists for 0-19 and for the tens (twenty, thirty ...)."]);

add("basics", "hard", "Balanced Brackets", "is_balanced", "def is_balanced(s):",
  "The string `s` may contain the brackets `()`, `[]`, `{}` and any other characters (ignore the others). Return `True` if every bracket is closed by the correct type in the correct order.",
  [["is_balanced('()[]{}')", "True"], ["is_balanced('([)]')", "False"], ["is_balanced('{[()]}')", "True"], ["is_balanced('')", "True"], ["is_balanced('((')", "False"], ["is_balanced('a(b)c')", "True"], ["is_balanced(')(')", "False"]],
  ["A plain list works as a stack: `append` and `pop`."]);

/* ============================ 2. LIST MANIPULATION ============================ */
add("lists", "easy", "Second Largest", "second_largest", "def second_largest(nums):",
  "Return the second largest DISTINCT value in `nums` (it always has at least 2 distinct values).",
  [["second_largest([1, 2, 3])", "2"], ["second_largest([5, 5, 4])", "4"], ["second_largest([10, 20, 20, 30])", "20"]],
  ["`set()` removes duplicates, `sorted()` orders them."]);

add("lists", "easy", "Remove Duplicates", "remove_duplicates", "def remove_duplicates(items):",
  "Return a new list with duplicates removed while keeping the original order of first appearance.",
  [["remove_duplicates([1, 2, 2, 3, 1])", "[1, 2, 3]"], ["remove_duplicates([])", "[]"], ["remove_duplicates(['a', 'b', 'a'])", "['a', 'b']"]],
  ["Keep a `seen` set while looping."]);

add("lists", "easy", "Rotate Left", "rotate_left", "def rotate_left(items, k):",
  "Return a new list rotated to the left by `k` positions. `k` can be bigger than the list length. An empty list stays empty.",
  [["rotate_left([1, 2, 3, 4, 5], 2)", "[3, 4, 5, 1, 2]"], ["rotate_left([1, 2, 3], 4)", "[2, 3, 1]"], ["rotate_left([], 3)", "[]"], ["rotate_left([1, 2, 3], 0)", "[1, 2, 3]"]],
  ["Use `k % len(items)` and slicing."]);

add("lists", "easy", "Chunk a List", "chunk_list", "def chunk_list(items, size):",
  "Split `items` into a list of smaller lists, each having at most `size` elements.",
  [["chunk_list([1, 2, 3, 4, 5], 2)", "[[1, 2], [3, 4], [5]]"], ["chunk_list([], 3)", "[]"], ["chunk_list([1, 2, 3], 3)", "[[1, 2, 3]]"]],
  ["`range(0, len(items), size)` gives the start of every chunk."]);

add("lists", "medium", "Merge Two Sorted Lists", "merge_sorted", "def merge_sorted(a, b):",
  "Merge two already sorted lists into one sorted list WITHOUT using `sorted()` or `.sort()`.",
  [["merge_sorted([1, 3, 5], [2, 4, 6])", "[1, 2, 3, 4, 5, 6]"], ["merge_sorted([], [1])", "[1]"], ["merge_sorted([1, 1], [1])", "[1, 1, 1]"], ["merge_sorted([1, 2, 3], [10, 20])", "[1, 2, 3, 10, 20]"]],
  ["Keep two indexes `i` and `j` and always take the smaller front element."]);

add("lists", "medium", "Two Sum", "two_sum", "def two_sum(nums, target):",
  "Return a tuple `(i, j)` with `i < j` of the indexes of two numbers in `nums` that add up to `target`. Exactly one answer exists.",
  [["two_sum([2, 7, 11, 15], 9)", "(0, 1)"], ["two_sum([3, 2, 4], 6)", "(1, 2)"], ["two_sum([3, 3], 6)", "(0, 1)"]],
  ["Store `value -> index` in a dictionary while looping."]);

add("lists", "medium", "Flatten Any Depth", "flatten", "def flatten(nested):",
  "Flatten a list that can contain lists inside lists (any depth) into one flat list, keeping order.",
  [["flatten([1, [2, [3, [4]]], 5])", "[1, 2, 3, 4, 5]"], ["flatten([])", "[]"], ["flatten([[], [1, []]])", "[1]"]],
  ["Recursion: if an item is a list, flatten it; otherwise append it."]);

add("lists", "hard", "Longest Consecutive Run", "longest_consecutive", "def longest_consecutive(nums):",
  "Return the length of the longest run of consecutive integers (like 1, 2, 3, 4) that can be formed from the numbers in `nums`. The numbers are unsorted and may repeat. Aim for O(n).",
  [["longest_consecutive([100, 4, 200, 1, 3, 2])", "4"], ["longest_consecutive([])", "0"], ["longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])", "9"]],
  ["Put numbers in a set and only start counting from numbers whose `n - 1` is NOT in the set."]);

add("lists", "hard", "Rotate Matrix", "rotate_matrix", "def rotate_matrix(matrix):",
  "Given a square matrix (list of lists), return a NEW matrix rotated 90 degrees clockwise.",
  [["rotate_matrix([[1, 2], [3, 4]])", "[[3, 1], [4, 2]]"], ["rotate_matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]"], ["rotate_matrix([[1]])", "[[1]]"]],
  ["Reverse the rows, then transpose with `zip(*rows)`."]);

add("lists", "hard", "Maximum Subarray Sum", "max_subarray", "def max_subarray(nums):",
  "Return the largest possible sum of a contiguous (touching) part of `nums`. The list has at least one number and may contain negatives.",
  [["max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])", "6"], ["max_subarray([1])", "1"], ["max_subarray([-3, -1, -2])", "-1"], ["max_subarray([5, 4, -1, 7, 8])", "23"]],
  ["Kadane: `current = max(x, current + x)` and track the best."]);

/* ============================ 3. DICTIONARY MANIPULATION ============================ */
add("dicts", "easy", "Word Count", "word_count", "def word_count(text):",
  "Return a dictionary that maps each word of `text` (split on whitespace, case-insensitive) to how many times it appears. Keys should be lowercase.",
  [["word_count('a b a')", "{'a': 2, 'b': 1}"], ["word_count('')", "{}"], ["word_count('Hello hello HELLO world')", "{'hello': 3, 'world': 1}"]],
  ["`dict.get(word, 0) + 1` or `collections.Counter`."]);

add("dicts", "easy", "Invert a Dictionary", "invert_dict", "def invert_dict(d):",
  "Swap keys and values. All values are unique and hashable.",
  [["invert_dict({'a': 1, 'b': 2})", "{1: 'a', 2: 'b'}"], ["invert_dict({})", "{}"], ["invert_dict({'x': 'y'})", "{'y': 'x'}"]],
  ["A dict comprehension: `{v: k for k, v in d.items()}`."]);

add("dicts", "easy", "Merge Without Mutating", "merge_dicts", "def merge_dicts(a, b):",
  "Return a NEW dictionary containing everything from `a` and `b`. When a key is in both, the value from `b` wins. Neither input may be changed.",
  [["merge_dicts({'a': 1, 'b': 2}, {'b': 3, 'c': 4})", "{'a': 1, 'b': 3, 'c': 4}"], ["merge_dicts({}, {'x': 1})", "{'x': 1}"], ["a = {'x': 1}\nmerge_dicts(a, {'y': 2})\nresult = a", "{'x': 1}"]],
  ["`{**a, **b}` creates a new dictionary."]);

add("dicts", "easy", "Safe Nested Get", "get_nested", "def get_nested(data, keys, default=None):",
  "Follow the list `keys` through nested dictionaries and return the value found. If any key is missing (or you hit a non-dictionary before the keys finish) return `default`.",
  [["get_nested({'a': {'b': {'c': 1}}}, ['a', 'b', 'c'])", "1"], ["get_nested({'a': {'b': 1}}, ['a', 'x'], 'missing')", "'missing'"], ["get_nested({'a': 1}, ['b'])", "None"], ["get_nested({'a': 1}, ['a', 'b'], 'no')", "'no'"]],
  ["Loop over keys; at every step check `isinstance(current, dict) and key in current`."]);

add("dicts", "medium", "Group Words by Length", "group_by_length", "def group_by_length(words):",
  "Return a dictionary `{length: [words with that length]}` keeping the original order inside every list.",
  [["group_by_length(['a', 'bb', 'c', 'dd', 'eee'])", "{1: ['a', 'c'], 2: ['bb', 'dd'], 3: ['eee']}"], ["group_by_length([])", "{}"]],
  ["`dict.setdefault(key, [])` is handy."]);

add("dicts", "medium", "Top N Frequent", "top_n_frequent", "def top_n_frequent(items, n):",
  "Return a list of the `n` most frequent items, most frequent first. If two items have the same count, the one that is alphabetically smaller comes first.",
  [["top_n_frequent(['a', 'b', 'a', 'c', 'b', 'a'], 2)", "['a', 'b']"], ["top_n_frequent(['x', 'y', 'z', 'y'], 2)", "['y', 'x']"], ["top_n_frequent([], 3)", "[]"]],
  ["Sort by `(-count, item)`."]);

add("dicts", "medium", "Group Anagrams", "group_anagrams", "def group_anagrams(words):",
  "Group words that are anagrams of each other. Return a list of groups; sort the words inside each group, and sort the groups by their first word.",
  [["group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])", "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]"], ["group_anagrams([])", "[]"]],
  ["`''.join(sorted(word))` is the same for all anagrams - use it as a dictionary key."]);

add("dicts", "hard", "Deep Merge", "deep_merge", "def deep_merge(a, b):",
  "Recursively merge dictionary `b` into dictionary `a` and return a NEW dictionary. If both values for a key are dictionaries merge them deeply, otherwise the value from `b` wins. Do not change `a` or `b`.",
  [["deep_merge({'a': {'x': 1, 'y': 2}, 'b': 1}, {'a': {'y': 3, 'z': 4}, 'c': 5})", "{'a': {'x': 1, 'y': 3, 'z': 4}, 'b': 1, 'c': 5}"], ["deep_merge({'a': {'x': 1}}, {'a': 5})", "{'a': 5}"], ["a = {'x': {'y': 1}}\ndeep_merge(a, {'x': {'z': 2}})\nresult = a", "{'x': {'y': 1}}"]],
  ["Start from a copy of `a`, then loop over `b`'s items and recurse when both sides are dicts."]);

add("dicts", "hard", "Flatten a Dictionary", "flatten_dict", "def flatten_dict(d, sep='.'):",
  "Flatten nested dictionaries into one level. Keys are joined with `sep`.",
  [["flatten_dict({'a': {'b': 1, 'c': {'d': 2}}, 'e': 3})", "{'a.b': 1, 'a.c.d': 2, 'e': 3}"], ["flatten_dict({})", "{}"], ["flatten_dict({'a': {'b': 1}}, '/')", "{'a/b': 1}"]],
  ["Recursion with a `prefix` argument (use an inner helper function)."]);

add("dicts", "hard", "Unflatten a Dictionary", "unflatten_dict", "def unflatten_dict(d, sep='.'):",
  "The reverse of flattening: split every key on `sep` and rebuild the nested dictionaries.",
  [["unflatten_dict({'a.b': 1, 'a.c.d': 2, 'e': 3})", "{'a': {'b': 1, 'c': {'d': 2}}, 'e': 3}"], ["unflatten_dict({})", "{}"], ["unflatten_dict({'a/b': 1}, '/')", "{'a': {'b': 1}}"]],
  ["Walk down with `current = current.setdefault(part, {})` for all parts except the last."]);

/* ============================ 4. JSON MANIPULATION ============================ */
add("json", "easy", "Dict to JSON String", "to_json_string", "import json\n\ndef to_json_string(data):\n    pass",
  "Return the JSON string of `data` with keys sorted alphabetically and default separators.",
  [["to_json_string({'b': 1, 'a': [1, 2]})", "'{\"a\": [1, 2], \"b\": 1}'"], ["to_json_string([])", "'[]'"], ["to_json_string({'ok': True, 'x': None})", "'{\"ok\": true, \"x\": null}'"]],
  ["`json.dumps(data, sort_keys=True)`."]);

add("json", "easy", "Read a Key from JSON Text", "get_json_value", "import json\n\ndef get_json_value(text, key):\n    pass",
  "`text` is a JSON object as a string. Return the value of the top-level `key`, or `None` if the key is missing.",
  [["get_json_value('{\"name\": \"Ravi\", \"age\": 25}', 'name')", "'Ravi'"], ["get_json_value('{\"name\": \"Ravi\", \"age\": 25}', 'age')", "25"], ["get_json_value('{\"a\": 1}', 'b')", "None"]],
  ["`json.loads` then `.get(key)`."]);

add("json", "easy", "Save and Load JSON File", "save_and_load", "import json\n\ndef save_and_load(path, data):\n    pass",
  "Write `data` to the file `path` as JSON with `indent=2`, then read the file back and return the loaded data.",
  [["save_and_load('t.json', {'a': [1, 2, 3]})", "{'a': [1, 2, 3]}"], ["save_and_load('t.json', {'a': 1})\nresult = _read('t.json')", "'{\\n  \"a\": 1\\n}'"]],
  ["Use `with open(path, 'w') as f: json.dump(data, f, indent=2)`."]);

add("json", "easy", "Safe JSON Parse", "safe_parse", "import json\n\ndef safe_parse(text):\n    pass",
  "Return the parsed value of the JSON text. If the text is not valid JSON return `None` (do not crash).",
  [["safe_parse('{\"a\": 1}')", "{'a': 1}"], ["safe_parse('{bad')", "None"], ["safe_parse('')", "None"], ["safe_parse('[1, 2]')", "[1, 2]"]],
  ["Catch `json.JSONDecodeError`."]);

add("json", "medium", "Shopping Cart Total", "total_cost", "import json\n\ndef total_cost(text):\n    pass",
  "`text` is a JSON list of items like `{\"price\": 10, \"qty\": 2}`. Return the sum of `price * qty` of all items.",
  [["total_cost('[{\"price\": 10, \"qty\": 2}, {\"price\": 5.5, \"qty\": 2}]')", "31.0"], ["total_cost('[]')", "0"], ["total_cost('[{\"price\": 3, \"qty\": 3}]')", "9"]],
  ["Parse first, then use `sum(...)` with a generator."]);

add("json", "medium", "Filter Records from a JSON File", "filter_json_file", "import json\n\ndef filter_json_file(path, key, value):\n    pass",
  "The file at `path` holds a JSON list of objects. Return the list of objects whose `key` equals `value` (order preserved).",
  [["import json\n_write('d.json', json.dumps([{'n': 'a', 't': 1}, {'n': 'b', 't': 2}, {'n': 'c', 't': 1}]))\nresult = [x['n'] for x in filter_json_file('d.json', 't', 1)]", "['a', 'c']"], ["_write('e.json', '[]')\nresult = filter_json_file('e.json', 'k', 1)", "[]"]],
  ["Use `item.get(key) == value` so missing keys do not crash."]);

add("json", "medium", "Update a JSON File", "update_json_file", "import json\n\ndef update_json_file(path, key, value):\n    pass",
  "The file at `path` holds a JSON object. Set `key` to `value` in it and save the file back (keep other keys). The function returns nothing.",
  [["import json\n_write('c.json', '{\"a\": 1}')\nupdate_json_file('c.json', 'b', 2)\nresult = json.loads(_read('c.json'))", "{'a': 1, 'b': 2}"], ["import json\n_write('c.json', '{\"a\": 1}')\nupdate_json_file('c.json', 'a', 99)\nresult = json.loads(_read('c.json'))", "{'a': 99}"]],
  ["Read with `json.load`, change the dict, then open the file again in `'w'` mode and `json.dump`."]);

add("json", "hard", "JSON with Dates and Sets", "dumps_with_dates", "import json\nimport datetime\n\ndef dumps_with_dates(obj):\n    pass",
  "Return a JSON string (keys sorted) of `obj`, where `datetime.date` objects become ISO strings like `'2024-01-15'` and `set` objects become sorted lists.",
  [["dumps_with_dates({'d': datetime.date(2024, 1, 15), 's': {3, 1, 2}})", "'{\"d\": \"2024-01-15\", \"s\": [1, 2, 3]}'"], ["dumps_with_dates({'x': 1})", "'{\"x\": 1}'"], ["dumps_with_dates([datetime.date(2020, 2, 29)])", "'[\"2020-02-29\"]'"]],
  ["Pass a function to the `default=` argument of `json.dumps`; raise `TypeError` for unknown types."]);

add("json", "hard", "Find All Values of a Key", "find_all_values", "def find_all_values(obj, key):",
  "Search a JSON structure (dicts and lists nested at any depth) and return a list of ALL values stored under `key`, in the order you meet them (depth-first, dictionary order).",
  [["find_all_values({'a': 1, 'b': {'a': 2, 'c': [{'a': 3}]}}, 'a')", "[1, 2, 3]"], ["find_all_values({'x': 1}, 'a')", "[]"], ["find_all_values([{'id': 1}, {'id': 2}], 'id')", "[1, 2]"]],
  ["Recursion: for dicts check the key, then recurse into every value; for lists recurse into every item."]);

add("json", "hard", "JSON to CSV", "write_csv_from_json", "import json\nimport csv\n\ndef write_csv_from_json(json_path, csv_path):\n    pass",
  "`json_path` holds a JSON list of flat objects with the same keys. Write a CSV file where the header is the SORTED keys of the first object, followed by one row per object.",
  [["_write('i.json', '[{\"b\": 2, \"a\": 1}, {\"a\": 3, \"b\": 4}]')\nwrite_csv_from_json('i.json', 'o.csv')\nresult = _read('o.csv').splitlines()", "['a,b', '1,2', '3,4']"], ["_write('i.json', '[{\"k\": \"x\"}]')\nwrite_csv_from_json('i.json', 'o.csv')\nresult = _read('o.csv').splitlines()", "['k', 'x']"]],
  ["`csv.DictWriter(f, fieldnames=sorted(...))` with `open(csv_path, 'w', newline='')`."]);

/* ============================ 5. FILE HANDLING ============================ */
add("files", "easy", "Write Lines", "write_lines", "def write_lines(path, lines):",
  "Write every string of `lines` to the file `path`, one per line (each line ends with a newline).",
  [["write_lines('a.txt', ['x', 'y'])\nresult = _read('a.txt')", "'x\\ny\\n'"], ["write_lines('a.txt', [])\nresult = _read('a.txt')", "''"]],
  ["`with open(path, 'w') as f:` and `f.write(line + '\\n')`."]);

add("files", "easy", "Count Lines", "count_lines", "def count_lines(path):",
  "Return the number of lines in the text file `path`.",
  [["_write('a.txt', '1\\n2\\n3\\n')\nresult = count_lines('a.txt')", "3"], ["_write('a.txt', '')\nresult = count_lines('a.txt')", "0"], ["_write('a.txt', 'one line only')\nresult = count_lines('a.txt')", "1"]],
  ["Loop over the file object, or use `len(f.readlines())`."]);

add("files", "easy", "Append a Line", "append_line", "def append_line(path, text):",
  "Add `text` plus a newline at the END of the file without deleting the existing content.",
  [["_write('a.txt', 'x\\n')\nappend_line('a.txt', 'y')\nresult = _read('a.txt')", "'x\\ny\\n'"], ["append_line('new.txt', 'hi')\nresult = _read('new.txt')", "'hi\\n'"]],
  ["Open the file in `'a'` (append) mode."]);

add("files", "easy", "Read Non-Empty Lines", "read_nonempty_lines", "def read_nonempty_lines(path):",
  "Return a list of the lines of the file with surrounding whitespace removed. Skip lines that are empty after stripping.",
  [["_write('a.txt', 'a\\n\\n  b  \\n\\n')\nresult = read_nonempty_lines('a.txt')", "['a', 'b']"], ["_write('a.txt', '\\n\\n')\nresult = read_nonempty_lines('a.txt')", "[]"]],
  ["`line.strip()` and an `if` in a list comprehension."]);

add("files", "medium", "Word Frequency in a File", "word_frequency_file", "def word_frequency_file(path):",
  "Return a dictionary of how many times each word appears in the file. Words are split on whitespace and compared in lowercase.",
  [["_write('t.txt', 'to be or not to be')\nresult = word_frequency_file('t.txt')", "{'to': 2, 'be': 2, 'or': 1, 'not': 1}"], ["_write('t.txt', 'Hi hi\\nHI there')\nresult = word_frequency_file('t.txt')", "{'hi': 3, 'there': 1}"]],
  ["`f.read().lower().split()` handles newlines too."]);

add("files", "medium", "Search a Word in a File", "find_in_file", "def find_in_file(path, word):",
  "Return a list of the 1-based line numbers where `word` appears (case-insensitive, substring match).",
  [["_write('s.txt', 'Python is fun\\nI like java\\nPYTHON rocks\\n')\nresult = find_in_file('s.txt', 'python')", "[1, 3]"], ["_write('s.txt', 'abc\\n')\nresult = find_in_file('s.txt', 'zzz')", "[]"]],
  ["`enumerate(f, start=1)` gives line numbers."]);

add("files", "medium", "Copy as Uppercase", "copy_uppercase", "def copy_uppercase(src, dst):",
  "Read the file `src` and write its content in UPPERCASE to `dst`. Return the number of lines copied.",
  [["_write('s.txt', 'ab\\ncd\\n')\nn = copy_uppercase('s.txt', 'd.txt')\nresult = (n, _read('d.txt'))", "(2, 'AB\\nCD\\n')"], ["_write('s.txt', '')\nn = copy_uppercase('s.txt', 'd.txt')\nresult = (n, _read('d.txt'))", "(0, '')"]],
  ["You can use two `with` statements (or one `with` for both files)."]);

add("files", "hard", "Tail of a File", "tail", "def tail(path, n):",
  "Return the LAST `n` lines of the file as a list of strings without the newline characters. If the file has fewer than `n` lines return all of them. Try not to keep the whole file in memory.",
  [["_write('l.txt', 'a\\nb\\nc\\nd\\n')\nresult = tail('l.txt', 2)", "['c', 'd']"], ["_write('l.txt', 'a\\nb\\n')\nresult = tail('l.txt', 10)", "['a', 'b']"], ["_write('l.txt', 'a\\nb\\n')\nresult = tail('l.txt', 0)", "[]"]],
  ["`collections.deque(f, maxlen=n)` keeps only the last n lines."]);

add("files", "hard", "Merge Files", "merge_files", "def merge_files(paths, out_path):",
  "Join the content of all files in `paths` (in order) into `out_path`. Every line must end with exactly one newline in the output, even if an input file did not end with one. Return the total number of lines written.",
  [["_write('a.txt', '1\\n2')\n_write('b.txt', '3\\n')\nn = merge_files(['a.txt', 'b.txt'], 'o.txt')\nresult = (n, _read('o.txt'))", "(3, '1\\n2\\n3\\n')"], ["n = merge_files([], 'o.txt')\nresult = (n, _read('o.txt'))", "(0, '')"]],
  ["Strip the trailing newline of each line and write it again with `'\\n'`."]);

add("files", "hard", "CSV Column Stats", "csv_stats", "import csv\n\ndef csv_stats(path, column):\n    pass",
  "The CSV file has a header row. Return a tuple `(minimum, maximum, average)` of the numeric values in the column called `column`, as floats.",
  [["_write('s.csv', 'name,score\\na,10\\nb,20\\nc,30\\n')\nresult = csv_stats('s.csv', 'score')", "(10.0, 30.0, 20.0)"], ["_write('s.csv', 'name,score\\nx,1.5\\ny,2.5\\n')\nresult = csv_stats('s.csv', 'score')", "(1.5, 2.5, 2.0)"]],
  ["`csv.DictReader` gives each row as a dictionary; convert with `float()`."]);

/* ============================ 6. OS MODULE ============================ */
add("os", "easy", "Join Path", "join_path", "import os\n\ndef join_path(parts):\n    pass",
  "`parts` is a list of path pieces. Return them joined with the correct separator of the current operating system.",
  [["join_path(['a', 'b', 'c.txt'])", "os.path.join('a', 'b', 'c.txt')"], ["join_path(['x'])", "'x'"]],
  ["`os.path.join(*parts)`."]);

add("os", "easy", "File Extension", "get_extension", "import os\n\ndef get_extension(filename):\n    pass",
  "Return the extension of the filename in lowercase WITHOUT the dot. If there is no extension return an empty string. For `archive.tar.gz` only the last part (`gz`) counts.",
  [["get_extension('report.PDF')", "'pdf'"], ["get_extension('archive.tar.gz')", "'gz'"], ["get_extension('README')", "''"]],
  ["`os.path.splitext`."]);

add("os", "easy", "Ensure Directory", "ensure_dir", "import os\n\ndef ensure_dir(path):\n    pass",
  "Create the folder `path` (including missing parent folders). It must not fail if the folder already exists. Return `True` when the folder exists at the end.",
  [["ensure_dir('x/y/z')", "True"], ["ensure_dir('x/y')\nresult = ensure_dir('x/y')", "True"]],
  ["`os.makedirs(path, exist_ok=True)` and `os.path.isdir`."]);

add("os", "easy", "List Only Files", "list_files", "import os\n\ndef list_files(folder):\n    pass",
  "Return a sorted list of the names of the FILES directly inside `folder` (ignore sub-folders).",
  [["_write('d/b.txt', '')\n_write('d/a.txt', '')\nos.makedirs('d/sub')\nresult = list_files('d')", "['a.txt', 'b.txt']"], ["os.makedirs('empty')\nresult = list_files('empty')", "[]"]],
  ["`os.listdir` and `os.path.isfile(os.path.join(folder, name))`."]);

add("os", "medium", "Group Files by Extension", "group_by_extension", "import os\n\ndef group_by_extension(folder):\n    pass",
  "Return a dictionary `{extension: sorted list of file names}` for the files directly in `folder`. The extension is lowercase without a dot; files with no extension use the key `''`.",
  [["for name in ['a.py', 'b.py', 'c.txt', 'README']:\n    _write('g/' + name, '')\nresult = group_by_extension('g')", "{'py': ['a.py', 'b.py'], 'txt': ['c.txt'], '': ['README']}"], ["os.makedirs('e')\nresult = group_by_extension('e')", "{}"]],
  ["Combine `os.listdir`, `os.path.splitext` and `setdefault`."]);

add("os", "medium", "Folder Size", "folder_size", "import os\n\ndef folder_size(folder):\n    pass",
  "Return the total size in bytes of all files inside `folder`, including files in sub-folders.",
  [["_write('f/a.txt', '12345')\n_write('f/s/b.txt', '123')\nresult = folder_size('f')", "8"], ["os.makedirs('z')\nresult = folder_size('z')", "0"]],
  ["`os.walk` + `os.path.getsize`."]);

add("os", "medium", "Find Files Recursively", "find_files", "import os\n\ndef find_files(root, ext):\n    pass",
  "Return a sorted list of the paths (relative to `root`, always written with `/` as separator) of all files under `root` whose name ends with `ext` (for example `'.py'`).",
  [["_write('r/a.py', '')\n_write('r/s/b.py', '')\n_write('r/s/c.txt', '')\nresult = find_files('r', '.py')", "['a.py', 's/b.py']"], ["_write('r/a.txt', '')\nresult = find_files('r', '.py')", "[]"]],
  ["`os.path.relpath(full, root).replace(os.sep, '/')`."]);

add("os", "hard", "Organize by Extension", "organize_by_extension", "import os\nimport shutil\n\ndef organize_by_extension(folder):\n    pass",
  "Move every file that is directly inside `folder` into a sub-folder named after its extension (lowercase, no dot). Files without an extension go to a sub-folder called `no_ext`. Return a dictionary `{sub_folder_name: number_of_files_moved}`.",
  [["for name in ['a.txt', 'b.txt', 'c.py', 'README']:\n    _write('m/' + name, name)\ncounts = organize_by_extension('m')\nresult = (counts, sorted(os.listdir('m')), os.path.exists('m/txt/a.txt'))", "({'txt': 2, 'py': 1, 'no_ext': 1}, ['no_ext', 'py', 'txt'], True)"]],
  ["Collect the file list FIRST, then create folders and `shutil.move`."]);

add("os", "hard", "Delete Empty Folders", "delete_empty_dirs", "import os\n\ndef delete_empty_dirs(root):\n    pass",
  "Delete every empty folder below `root` (a folder that only contained empty folders also becomes empty and must be deleted). Never delete `root` itself. Return how many folders were deleted.",
  [["os.makedirs('t/a/b')\nos.makedirs('t/c')\n_write('t/c/f.txt', 'x')\nn = delete_empty_dirs('t')\nresult = (n, sorted(os.listdir('t')))", "(2, ['c'])"], ["os.makedirs('u')\nresult = delete_empty_dirs('u')", "0"]],
  ["`os.walk(root, topdown=False)` visits the deepest folders first."]);

add("os", "hard", "Find Duplicate Files", "find_duplicates", "import os\nimport hashlib\n\ndef find_duplicates(root):\n    pass",
  "Find files under `root` that have exactly the same content. Return a list of groups (each group is a sorted list of relative paths using `/`) containing 2 or more files; sort the groups by their first path.",
  [["_write('q/a.txt', 'hello')\n_write('q/b.txt', 'hello')\n_write('q/s/c.txt', 'hello')\n_write('q/d.txt', 'world')\nresult = find_duplicates('q')", "[['a.txt', 'b.txt', 's/c.txt']]"], ["_write('q/a.txt', '1')\n_write('q/b.txt', '2')\nresult = find_duplicates('q')", "[]"]],
  ["Hash the bytes of every file with `hashlib.md5(data).hexdigest()` and group by hash."]);

/* ============================ 7. PYTHON CLASSES ============================ */
add("classes", "easy", "Rectangle", "Rectangle", "class Rectangle:\n    def __init__(self, width, height):\n        pass\n\n    def area(self):\n        pass\n\n    def perimeter(self):\n        pass",
  "Create a `Rectangle` class that stores `width` and `height` and has methods `area()` and `perimeter()`.",
  [["Rectangle(3, 4).area()", "12"], ["Rectangle(3, 4).perimeter()", "14"], ["Rectangle(5, 5).area()", "25"]],
  ["Store values with `self.width = width`."]);

add("classes", "easy", "Counter", "Counter", "class Counter:\n    def __init__(self, start=0):\n        pass\n\n    def increment(self):\n        pass\n\n    def decrement(self):\n        pass",
  "Create a `Counter` class with an attribute `value` that starts at `start` (default 0). `increment()` adds 1 and `decrement()` subtracts 1.",
  [["Counter().value", "0"], ["Counter(10).value", "10"], ["c = Counter()\nc.increment()\nc.increment()\nc.decrement()\nresult = c.value", "1"]],
  ["Methods change `self.value`."]);

add("classes", "easy", "Person with __str__", "Person", "class Person:\n    def __init__(self, name, age):\n        pass\n\n    def __str__(self):\n        pass",
  "Create a `Person` with attributes `name` and `age`. `str(person)` must return text like `'Asha (30)'`.",
  [["str(Person('Asha', 30))", "'Asha (30)'"], ["Person('Raj', 5).name", "'Raj'"], ["Person('Raj', 5).age", "5"]],
  ["`__str__` must return a string."]);

add("classes", "easy", "Bank Account", "BankAccount", "class BankAccount:\n    def __init__(self, balance=0):\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass",
  "Create a `BankAccount` with a `balance` attribute (default 0). `deposit(amount)` adds money. `withdraw(amount)` removes money but raises `ValueError` if the balance is not enough (and then the balance must stay the same).",
  [["BankAccount().balance", "0"], ["a = BankAccount(100)\na.deposit(50)\nresult = a.balance", "150"], ["a = BankAccount(100)\na.withdraw(30)\nresult = a.balance", "70"], ["a = BankAccount(100)\ntry:\n    a.withdraw(500)\nexcept ValueError:\n    result = ('error', a.balance)", "('error', 100)"]],
  ["Check `amount > self.balance` BEFORE subtracting."]);

add("classes", "medium", "Animal Inheritance", "Animal", "class Animal:\n    def __init__(self, name):\n        pass\n\n    def sound(self):\n        pass\n\n    def describe(self):\n        pass\n\nclass Dog(Animal):\n    pass\n\nclass Cat(Animal):\n    pass",
  "`Animal.sound()` returns `'...'`. `Dog.sound()` returns `'Woof'` and `Cat.sound()` returns `'Meow'`. `describe()` (written only in `Animal`) returns `'<name> says <sound>'`.",
  [["Dog('Rex').describe()", "'Rex says Woof'"], ["Cat('Tom').describe()", "'Tom says Meow'"], ["Animal('X').describe()", "'X says ...'"], ["isinstance(Dog('a'), Animal)", "True"]],
  ["`describe` should call `self.sound()` - polymorphism does the rest."]);

add("classes", "medium", "Vector with Operators", "Vector", "class Vector:\n    def __init__(self, x, y):\n        pass\n\n    # implement __add__, __sub__, __mul__ (scalar), __eq__ and __repr__",
  "Create a 2D `Vector` with attributes `x` and `y`. Support `+`, `-`, multiplication by a number (`v * 3`), `==`, and a `repr` like `Vector(3, 6)`.",
  [["Vector(1, 2) + Vector(3, 4) == Vector(4, 6)", "True"], ["repr(Vector(1, 2) * 3)", "'Vector(3, 6)'"], ["(Vector(5, 5) - Vector(2, 1)).x", "3"], ["Vector(1, 2) == Vector(1, 3)", "False"]],
  ["Each dunder method returns a NEW `Vector`."]);

add("classes", "medium", "Temperature Property", "Temperature", "class Temperature:\n    def __init__(self, celsius):\n        pass\n\n    # add a `celsius` property (validated) and a `fahrenheit` property with a setter",
  "Create `Temperature(celsius)`. The property `celsius` must reject values below -273.15 by raising `ValueError` (also in the constructor). The property `fahrenheit` returns `celsius * 9 / 5 + 32` and can also be set, which updates `celsius`.",
  [["Temperature(100).fahrenheit", "212.0"], ["t = Temperature(0)\nt.fahrenheit = 212\nresult = t.celsius", "100.0"], ["try:\n    Temperature(-300)\nexcept ValueError:\n    result = 'invalid'", "'invalid'"], ["t = Temperature(10)\ntry:\n    t.celsius = -500\nexcept ValueError:\n    result = t.celsius", "10"]],
  ["Use `@property` and `@celsius.setter`; store the value in `self._celsius`."]);

add("classes", "hard", "Singleton Config", "Config", "class Config:\n    def set(self, key, value):\n        pass\n\n    def get(self, key, default=None):\n        pass",
  "Make `Config` a singleton: calling `Config()` any number of times always returns the SAME object. It stores settings with `set(key, value)` and `get(key, default=None)`.",
  [["Config() is Config()", "True"], ["Config().set('theme', 'dark')\nresult = Config().get('theme')", "'dark'"], ["Config().get('missing', 42)", "42"]],
  ["Override `__new__` and keep the instance in a class attribute."]);

add("classes", "hard", "Suppress Context Manager", "Suppress", "class Suppress:\n    def __init__(self, *exceptions):\n        pass\n\n    # implement __enter__ and __exit__",
  "Create a context manager class `Suppress(*exception_types)`. Inside `with Suppress(ValueError):` a `ValueError` is silently ignored and the program continues after the block. Other exception types must still be raised.",
  [["with Suppress(ValueError):\n    raise ValueError('ignored')\nresult = 'continued'", "'continued'"], ["try:\n    with Suppress(ValueError):\n        raise TypeError('not ignored')\nexcept TypeError:\n    result = 'raised'", "'raised'"], ["with Suppress(KeyError, IndexError):\n    [][0]\nresult = 'ok'", "'ok'"]],
  ["`__exit__` returns `True` to swallow the exception; use `issubclass(exc_type, self.exceptions)` (check for `None` first)."]);

add("classes", "hard", "Abstract Shapes", "Shape", "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    pass\n\nclass Rectangle(Shape):\n    pass\n\ndef total_area(shapes):\n    pass",
  "`Shape` is an abstract base class with an abstract method `area()` (so `Shape()` raises `TypeError`). `Square(side)` and `Rectangle(width, height)` implement it. `total_area(shapes)` returns the sum of all areas.",
  [["try:\n    Shape()\nexcept TypeError:\n    result = 'abstract'", "'abstract'"], ["Square(3).area()", "9"], ["total_area([Square(2), Rectangle(2, 3)])", "10"], ["total_area([])", "0"]],
  ["Give `Square` and `Rectangle` their own `__init__` and `area`."]);

/* ============================ 8. ASYNC PROGRAMMING ============================ */
add("async", "easy", "Your First Coroutine", "greet", "import asyncio\n\nasync def greet(name):\n    pass",
  "Write `async def greet(name)` that waits 0.1 seconds with `asyncio.sleep` and then returns `'Hello, <name>'`.",
  [["asyncio.run(greet('Ravi'))", "'Hello, Ravi'"], ["asyncio.run(greet('World'))", "'Hello, World'"]],
  ["Inside an async function use `await asyncio.sleep(0.1)`."]);

add("async", "easy", "Add After Delay", "add_after", "import asyncio\n\nasync def add_after(a, b, delay):\n    pass",
  "Write `async def add_after(a, b, delay)` that waits `delay` seconds and then returns `a + b`.",
  [["asyncio.run(add_after(2, 3, 0.1))", "5"], ["asyncio.run(add_after(-1, 1, 0))", "0"]],
  ["`asyncio.run(coroutine)` starts the event loop."]);

add("async", "easy", "Gather Squares Concurrently", "gather_squares", "import asyncio\n\nasync def square(x):\n    pass\n\nasync def gather_squares(nums):\n    pass",
  "`square(x)` waits 0.1 s and returns `x * x`. `gather_squares(nums)` runs `square` for all numbers CONCURRENTLY and returns the list of results in the same order. For 10 numbers the whole thing must take well under 0.5 s.",
  [["asyncio.run(gather_squares([1, 2, 3]))", "[1, 4, 9]"], ["asyncio.run(gather_squares([]))", "[]"], ["import time\nt = time.time()\nasyncio.run(gather_squares(list(range(10))))\nresult = (time.time() - t) < 0.5", "True"]],
  ["`await asyncio.gather(*(square(n) for n in nums))`."]);

add("async", "easy", "Async Generator Countdown", "countdown", "import asyncio\n\nasync def countdown(n):\n    pass",
  "Write an ASYNC GENERATOR `countdown(n)` that yields `n, n-1, ..., 1` and waits 0.01 s before each value.",
  [["async def _c():\n    return [x async for x in countdown(3)]\nresult = asyncio.run(_c())", "[3, 2, 1]"], ["async def _c():\n    return [x async for x in countdown(0)]\nresult = asyncio.run(_c())", "[]"]],
  ["An `async def` that contains `yield` is an async generator."]);

add("async", "medium", "Fetch Many URLs", "fetch_all", "import asyncio\n\nasync def fetch(url):\n    pass\n\nasync def fetch_all(urls):\n    pass",
  "`fetch(url)` simulates a download: it waits 0.1 s and returns `'data:' + url`. `fetch_all(urls)` downloads all URLs concurrently and returns a dictionary `{url: data}`.",
  [["asyncio.run(fetch_all(['a', 'bb']))", "{'a': 'data:a', 'bb': 'data:bb'}"], ["asyncio.run(fetch_all([]))", "{}"]],
  ["Gather the results and then `dict(zip(urls, results))`."]);

add("async", "medium", "Run With Timeout", "run_with_timeout", "import asyncio\n\nasync def run_with_timeout(coro, seconds):\n    pass",
  "Await the coroutine `coro` but give up after `seconds`. Return its result if it finishes in time, otherwise return the string `'timeout'`.",
  [["async def slow():\n    await asyncio.sleep(1)\n    return 'done'\nasync def fast():\n    return 'done'\nresult = (asyncio.run(run_with_timeout(slow(), 0.1)), asyncio.run(run_with_timeout(fast(), 0.5)))", "('timeout', 'done')"]],
  ["`asyncio.wait_for(coro, timeout)` raises `asyncio.TimeoutError`."]);

add("async", "medium", "Limit Concurrency", "run_limited", "import asyncio\n\nasync def run_limited(n, limit):\n    pass",
  "Start `n` tasks. Each task increases a shared counter of running tasks, waits 0.05 s, then decreases it. Use `asyncio.Semaphore(limit)` so at most `limit` tasks run at the same time. Return the MAXIMUM number of tasks that were running simultaneously.",
  [["asyncio.run(run_limited(10, 3))", "3"], ["asyncio.run(run_limited(5, 10))", "5"], ["asyncio.run(run_limited(4, 1))", "1"]],
  ["`async with semaphore:` around the work of each task; update `max_seen` after incrementing."]);

add("async", "hard", "Producer / Consumer Pipeline", "pipeline", "import asyncio\n\nasync def pipeline(items, workers):\n    pass",
  "Put all `items` into an `asyncio.Queue`. Start `workers` worker coroutines; each repeatedly takes an item, waits 0.01 s, and stores `item * item` in a results list. When all items are processed stop the workers and return the results SORTED.",
  [["asyncio.run(pipeline([1, 2, 3, 4, 5], 2))", "[1, 4, 9, 16, 25]"], ["asyncio.run(pipeline([], 3))", "[]"], ["asyncio.run(pipeline([3], 1))", "[9]"]],
  ["`await queue.join()` waits until `task_done()` was called for every item; then cancel the workers."]);

add("async", "hard", "Async Retry", "retry", "import asyncio\n\nasync def retry(func, attempts, delay):\n    pass",
  "`func` is an async function that takes no arguments. Call `await func()`. If it raises, wait `delay` seconds and try again, up to `attempts` calls in total. Return the result on success; if every attempt fails, raise the LAST exception.",
  [["calls = []\nasync def flaky():\n    calls.append(1)\n    if len(calls) < 3:\n        raise ValueError('fail')\n    return 'ok'\nresult = (asyncio.run(retry(flaky, 5, 0.01)), len(calls))", "('ok', 3)"], ["async def bad():\n    raise KeyError('x')\ntry:\n    asyncio.run(retry(bad, 2, 0.01))\nexcept KeyError:\n    result = 'raised'", "'raised'"]],
  ["Loop `for attempt in range(attempts)`; remember the exception and re-raise it after the loop."]);

add("async", "hard", "First Completed", "first_completed", "import asyncio\n\nasync def first_completed(coros):\n    pass",
  "Run all coroutines in the list `coros` at the same time. Return the result of the FIRST one that finishes and cancel all the others.",
  [["async def job(name, d):\n    await asyncio.sleep(d)\n    return name\nresult = asyncio.run(first_completed([job('slow', 0.5), job('fast', 0.05), job('mid', 0.2)]))", "'fast'"]],
  ["`asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)` returns `(done, pending)`. Wrap coroutines with `asyncio.ensure_future` first."]);

/* ============================ 9. STRINGS (EXTRA) ============================ */
add("strings", "easy", "Reverse Words", "reverse_words", "def reverse_words(s):",
  "Reverse the ORDER of the words in `s`. Words are separated by one or more spaces; the result uses single spaces and has no leading or trailing spaces.",
  [["reverse_words('hello world')", "'world hello'"], ["reverse_words('  a   b ')", "'b a'"], ["reverse_words('')", "''"]],
  ["`split()` without arguments handles extra spaces."]);

add("strings", "easy", "Smart Palindrome", "is_palindrome", "def is_palindrome(s):",
  "Return `True` if `s` reads the same forwards and backwards when you ignore case and every character that is not a letter or digit.",
  [["is_palindrome('A man, a plan, a canal: Panama')", "True"], ["is_palindrome('hello')", "False"], ["is_palindrome('')", "True"]],
  ["Build a cleaned string with `ch.lower() for ch in s if ch.isalnum()`."]);

add("strings", "easy", "Count Vowels", "count_vowels", "def count_vowels(s):",
  "Return how many vowels (a, e, i, o, u - upper or lower case) are in `s`.",
  [["count_vowels('Hello World')", "3"], ["count_vowels('xyz')", "0"], ["count_vowels('AEIOU')", "5"]],
  ["Compare `ch.lower() in 'aeiou'`."]);

add("strings", "easy", "Title Case", "title_case", "def title_case(s):",
  "Capitalise every word: first letter upper case, the rest lower case. Words are separated by spaces; the result uses single spaces.",
  [["title_case('hELLO wORLD')", "'Hello World'"], ["title_case('python is fun')", "'Python Is Fun'"], ["title_case('  many   spaces ')", "'Many Spaces'"]],
  ["Do it manually with `word[:1].upper() + word[1:].lower()` (not `str.title`, which has quirks)."]);

add("strings", "medium", "Caesar Cipher", "caesar_cipher", "def caesar_cipher(text, shift):",
  "Shift every letter by `shift` places in the alphabet (wrapping around), keeping the case. Other characters stay unchanged. A negative shift decrypts.",
  [["caesar_cipher('abc', 1)", "'bcd'"], ["caesar_cipher('xyz', 3)", "'abc'"], ["caesar_cipher('Hello, World!', 5)", "'Mjqqt, Btwqi!'"], ["caesar_cipher('bcd', -1)", "'abc'"]],
  ["`(ord(ch) - ord('a') + shift) % 26 + ord('a')` for lowercase."]);

add("strings", "medium", "Run-Length Encoding", "compress", "def compress(s):",
  "Compress consecutive repeated characters into the character followed by the count, e.g. `'aaabbc'` becomes `'a3b2c1'`.",
  [["compress('aaabbc')", "'a3b2c1'"], ["compress('')", "''"], ["compress('abc')", "'a1b1c1'"], ["compress('zzzzzzzzzzzz')", "'z12'"]],
  ["`itertools.groupby` or a manual loop with a counter."]);

add("strings", "medium", "Longest Common Prefix", "common_prefix", "def common_prefix(words):",
  "Return the longest string that is a prefix of ALL strings in `words`. Return `''` if there is none or the list is empty.",
  [["common_prefix(['flower', 'flow', 'flight'])", "'fl'"], ["common_prefix(['dog', 'car'])", "''"], ["common_prefix(['a'])", "'a'"], ["common_prefix([])", "''"]],
  ["Compare the smallest and the largest word (`min`, `max`) character by character."]);

add("strings", "hard", "Longest Unique Substring", "longest_unique_substring", "def longest_unique_substring(s):",
  "Return the LENGTH of the longest part of `s` (contiguous characters) in which no character repeats.",
  [["longest_unique_substring('abcabcbb')", "3"], ["longest_unique_substring('bbbbb')", "1"], ["longest_unique_substring('pwwkew')", "3"], ["longest_unique_substring('')", "0"]],
  ["Sliding window: store the last index of every character and move the left edge."]);

add("strings", "hard", "Wildcard Matching", "wildcard_match", "def wildcard_match(s, pattern):",
  "Return `True` if the WHOLE string `s` matches `pattern`. In the pattern `?` matches exactly one character and `*` matches any sequence (including an empty one).",
  [["wildcard_match('aa', 'a')", "False"], ["wildcard_match('aa', '*')", "True"], ["wildcard_match('cb', '?a')", "False"], ["wildcard_match('adceb', '*a*b')", "True"], ["wildcard_match('acdcb', 'a*c?b')", "False"], ["wildcard_match('', '*')", "True"], ["wildcard_match('abc', 'a?c')", "True"]],
  ["Dynamic programming table `dp[i][j]`, or the two-pointer greedy approach with backtracking to the last `*`."]);

add("strings", "hard", "Word Wrap", "word_wrap", "def word_wrap(text, width):",
  "Break `text` into lines that are at most `width` characters long, never splitting a word and fitting as many words as possible on each line (greedy). Return the list of lines (single spaces between words). Every word is no longer than `width`.",
  [["word_wrap('the quick brown fox jumps', 10)", "['the quick', 'brown fox', 'jumps']"], ["word_wrap('a b c', 1)", "['a', 'b', 'c']"], ["word_wrap('', 5)", "[]"], ["word_wrap('hello world', 11)", "['hello world']"]],
  ["Keep a current line; add the next word if `len(line) + 1 + len(word) <= width`, otherwise start a new line."]);

/* ============================ 10. FUNCTIONS & DECORATORS (EXTRA) ============================ */
add("functions", "easy", "Multiplier Factory", "make_multiplier", "def make_multiplier(n):",
  "Return a function that multiplies its argument by `n` (a closure).",
  [["make_multiplier(3)(5)", "15"], ["make_multiplier(0)(9)", "0"], ["[make_multiplier(k)(2) for k in range(3)]", "[0, 2, 4]"]],
  ["Define an inner function and return it."]);

add("functions", "easy", "Apply Twice", "apply_twice", "def apply_twice(func, x):",
  "Call the function `func` on `x` and then call it again on the result. Return the final value.",
  [["apply_twice(lambda v: v + 3, 1)", "7"], ["apply_twice(str.upper, 'a')", "'A'"], ["apply_twice(lambda v: v * v, 3)", "81"]],
  ["Functions are values - you can pass them around."]);

add("functions", "easy", "Args and Kwargs", "summarize", "def summarize(*args, **kwargs):",
  "Return a tuple `(total, keys)` where `total` is the sum of all positional arguments and `keys` is the sorted list of keyword argument names.",
  [["summarize(1, 2, 3, a=1, b=2)", "(6, ['a', 'b'])"], ["summarize()", "(0, [])"], ["summarize(z=1, y=2)", "(0, ['y', 'z'])"]],
  ["`args` is a tuple, `kwargs` is a dictionary."]);

add("functions", "easy", "Safe Divide", "safe_divide", "def safe_divide(a, b):",
  "Return `a / b`. If `b` is zero return `None` instead of crashing.",
  [["safe_divide(10, 2)", "5.0"], ["safe_divide(1, 0)", "None"], ["safe_divide(10, 4)", "2.5"]],
  ["`try` / `except ZeroDivisionError`."]);

add("functions", "medium", "Count Calls Decorator", "counted", "import functools\n\ndef counted(func):\n    pass",
  "Write a decorator `counted` that counts how many times the decorated function was called and exposes the number as the attribute `calls` of the function. The function must still work normally.",
  [["@counted\ndef f(x):\n    return x * 2\nf(1)\nf(2)\nresult = (f.calls, f(3))", "(2, 6)"], ["@counted\ndef g():\n    return 'hi'\nresult = g.calls", "0"]],
  ["Set `wrapper.calls = 0` before returning `wrapper`; increase it inside."]);

add("functions", "medium", "Fibonacci Generator", "fib", "def fib():\n    pass",
  "Write a generator function `fib()` that yields the Fibonacci numbers forever: 0, 1, 1, 2, 3, 5, ...",
  [["import itertools\nresult = list(itertools.islice(fib(), 10))", "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]"], ["next(fib())", "0"]],
  ["An infinite `while True:` loop with `yield a` and `a, b = b, a + b`."]);

add("functions", "medium", "Memoize Decorator", "memoize", "import functools\n\ndef memoize(func):\n    pass",
  "Write a decorator `memoize` that remembers results per argument, so calling the function again with the same (single, hashable) argument does not run the function body again.",
  [["calls = []\n@memoize\ndef sq(x):\n    calls.append(x)\n    return x * x\nsq(4)\nsq(4)\nsq(5)\nresult = (sq(4), calls)", "(16, [4, 5])"]],
  ["Keep a dictionary in the closure; check `if x not in cache`."]);

add("functions", "hard", "Retry Decorator", "retry", "import functools\n\ndef retry(times):\n    pass",
  "`retry(times)` is a decorator FACTORY: `@retry(times=3)`. The decorated function is called up to `times` times. If it raises an exception, call it again; if every attempt fails, raise the last exception. If an attempt succeeds return its result.",
  [["calls = []\n@retry(times=3)\ndef flaky():\n    calls.append(1)\n    if len(calls) < 3:\n        raise ValueError('x')\n    return 'ok'\nresult = (flaky(), len(calls))", "('ok', 3)"], ["n = []\n@retry(times=2)\ndef bad():\n    n.append(1)\n    raise ValueError('x')\ntry:\n    bad()\nexcept ValueError:\n    result = len(n)", "2"]],
  ["Three nested functions: `retry(times)` -> `decorator(func)` -> `wrapper(*args, **kwargs)`."]);

add("functions", "hard", "Custom Exception", "validate_age", "class InvalidAgeError(ValueError):\n    pass\n\ndef validate_age(age):\n    pass",
  "`validate_age(age)` returns `age` when it is an integer from 0 to 150. Otherwise it raises `InvalidAgeError` (which is a subclass of `ValueError`) - also when `age` is not an integer at all.",
  [["validate_age(25)", "25"], ["validate_age(0)", "0"], ["try:\n    validate_age(-1)\nexcept InvalidAgeError:\n    result = 'bad'", "'bad'"], ["try:\n    validate_age('x')\nexcept ValueError:\n    result = 'bad'", "'bad'"], ["try:\n    validate_age(151)\nexcept InvalidAgeError:\n    result = 'bad'", "'bad'"]],
  ["Because `InvalidAgeError` inherits from `ValueError`, `except ValueError` also catches it."]);

add("functions", "hard", "Lazy Chunks", "chunked", "def chunked(iterable, size):",
  "Write a GENERATOR `chunked(iterable, size)` that lazily yields tuples of `size` items from any iterable (even another generator). The last tuple may be shorter.",
  [["list(chunked(range(5), 2))", "[(0, 1), (2, 3), (4,)]"], ["list(chunked('abcdef', 3))", "[('a', 'b', 'c'), ('d', 'e', 'f')]"], ["list(chunked([], 3))", "[]"], ["list(chunked((x for x in range(3)), 5))", "[(0, 1, 2)]"]],
  ["Use `itertools.islice(iterator, size)` inside a `while True` loop and stop when the chunk is empty."]);

/* ======================= MORE QUESTIONS (added in Quadra Code Lab) ======================= */

/* ---- basics ---- */
add("basics", "easy", "Count Vowels", "count_vowels", "def count_vowels(s):",
  "Return how many vowels (`a, e, i, o, u`, upper or lower case) the string `s` contains.",
  [["count_vowels('Hello')", "2"], ["count_vowels('xyz')", "0"], ["count_vowels('AEIOU')", "5"], ["count_vowels('')", "0"]],
  ["Lower-case the string first, then check `ch in 'aeiou'`."]);
add("basics", "medium", "Perfect Number", "is_perfect", "def is_perfect(n):",
  "A perfect number equals the sum of its proper divisors (all divisors except itself). Return `True` if `n` is perfect, otherwise `False`. `1` is not perfect.",
  [["is_perfect(6)", "True"], ["is_perfect(28)", "True"], ["is_perfect(12)", "False"], ["is_perfect(1)", "False"], ["is_perfect(496)", "True"]],
  ["Loop `i` from 1 to `n // 2` and add the numbers that divide `n`."]);
add("basics", "hard", "Number to Any Base", "to_base", "def to_base(n, base):",
  "Convert the non-negative integer `n` to a string in the given `base` (2 to 16). Use upper-case letters `A-F` for digits above 9. Do not use `bin`, `hex`, `oct` or `format`.",
  [["to_base(10, 2)", "'1010'"], ["to_base(255, 16)", "'FF'"], ["to_base(0, 2)", "'0'"], ["to_base(100, 8)", "'144'"], ["to_base(31, 16)", "'1F'"]],
  ["Repeatedly take `n % base` and divide `n //= base`; the digits come out in reverse order."]);

/* ---- lists ---- */
add("lists", "easy", "Second Largest", "second_largest", "def second_largest(nums):",
  "Return the second largest DISTINCT value of the list `nums`. Return `None` if there are fewer than 2 distinct values.",
  [["second_largest([3, 1, 4, 1, 5])", "4"], ["second_largest([2, 2])", "None"], ["second_largest([7])", "None"], ["second_largest([-1, -5, -3])", "-3"]],
  ["`set(nums)` removes duplicates; then sort it."]);
add("lists", "medium", "Rotate Left", "rotate_left", "def rotate_left(nums, k):",
  "Return a NEW list where `nums` is rotated to the left by `k` positions. `k` may be larger than the list length. An empty list stays empty.",
  [["rotate_left([1, 2, 3, 4, 5], 2)", "[3, 4, 5, 1, 2]"], ["rotate_left([1, 2, 3], 3)", "[1, 2, 3]"], ["rotate_left([1, 2, 3], 4)", "[2, 3, 1]"], ["rotate_left([], 5)", "[]"]],
  ["Use `k % len(nums)` and slicing. Guard the empty list first."]);
add("lists", "hard", "Merge Intervals", "merge_intervals", "def merge_intervals(intervals):",
  "`intervals` is a list of `[start, end]` pairs in any order. Merge every overlapping or touching interval and return the merged list sorted by start.",
  [["merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])", "[[1, 6], [8, 10], [15, 18]]"], ["merge_intervals([[1, 4], [4, 5]])", "[[1, 5]]"], ["merge_intervals([])", "[]"], ["merge_intervals([[5, 6], [1, 2]])", "[[1, 2], [5, 6]]"], ["merge_intervals([[1, 10], [2, 3], [4, 5]])", "[[1, 10]]"]],
  ["Sort by start. Keep a result list and compare the next start with the last merged end."]);

/* ---- dicts ---- */
add("dicts", "easy", "Invert Dictionary", "invert_dict", "def invert_dict(d):",
  "Return a new dictionary where keys and values of `d` are swapped. All values of `d` are unique.",
  [["invert_dict({'a': 1, 'b': 2})", "{1: 'a', 2: 'b'}"], ["invert_dict({})", "{}"], ["invert_dict({'x': 'y'})", "{'y': 'x'}"]],
  ["A dict comprehension: `{v: k for k, v in d.items()}`."]);
add("dicts", "medium", "Group Words by Length", "group_by_length", "def group_by_length(words):",
  "Return a dictionary that maps each word length to the list of words of that length, keeping the original order of the words.",
  [["group_by_length(['a', 'bb', 'c', 'dd', 'eee'])", "{1: ['a', 'c'], 2: ['bb', 'dd'], 3: ['eee']}"], ["group_by_length([])", "{}"], ["group_by_length(['hi', 'yo', 'hey'])", "{2: ['hi', 'yo'], 3: ['hey']}"]],
  ["`result.setdefault(len(w), []).append(w)`."]);
add("dicts", "hard", "Flatten Nested Dictionary", "flatten_dict", "def flatten_dict(d):",
  "Flatten a nested dictionary. Nested keys are joined with a dot. Example: `{'a': {'b': 1}}` becomes `{'a.b': 1}`. Values that are not dictionaries are kept as they are.",
  [["flatten_dict({'a': {'b': 1, 'c': {'d': 2}}, 'e': 3})", "{'a.b': 1, 'a.c.d': 2, 'e': 3}"], ["flatten_dict({})", "{}"], ["flatten_dict({'x': {'y': {'z': 0}}})", "{'x.y.z': 0}"], ["flatten_dict({'k': [1, 2]})", "{'k': [1, 2]}"]],
  ["Write a recursive helper that carries a `prefix` string."]);

/* ---- json ---- */
add("json", "easy", "Read a Key from JSON", "get_name", "import json\n\ndef get_name(text):\n    pass",
  "`text` is a JSON string of an object. Return the value stored under the key `\"name\"`.",
  [["get_name('{\"name\": \"Ravi\", \"age\": 3}')", "'Ravi'"], ["get_name('{\"name\": \"\"}')", "''"], ["get_name('{\"id\": 1, \"name\": \"Asha\"}')", "'Asha'"]],
  ["`json.loads(text)` gives a normal dictionary."]);
add("json", "medium", "Total Price from JSON", "total_price", "import json\n\ndef total_price(text):\n    pass",
  "`text` is a JSON list of objects like `{\"price\": 2.5, \"qty\": 2}`. Return the sum of `price * qty` over all items. An empty list gives `0`.",
  [["total_price('[{\"price\": 2.5, \"qty\": 2}, {\"price\": 10, \"qty\": 1}]')", "15.0"], ["total_price('[]')", "0"], ["total_price('[{\"price\": 3, \"qty\": 3}]')", "9"]],
  ["Parse with `json.loads`, then `sum(item['price'] * item['qty'] for item in data)`."]);
add("json", "hard", "Find All Values of a Key", "find_all_values", "import json\n\ndef find_all_values(text, key):\n    pass",
  "`text` is a JSON string of any nesting (objects inside lists inside objects...). Return a list of EVERY value stored under `key`, at any depth, in document order.",
  [["find_all_values('{\"id\": 1, \"child\": {\"id\": 2, \"items\": [{\"id\": 3}]}}', 'id')", "[1, 2, 3]"], ["find_all_values('{\"a\": 1}', 'id')", "[]"], ["find_all_values('[{\"id\": \"x\"}, {\"id\": \"y\"}]', 'id')", "['x', 'y']"], ["find_all_values('{\"a\": {\"a\": {\"a\": 1}}}', 'a')", "[{'a': {'a': 1}}, {'a': 1}, 1]"]],
  ["Write a recursive function. For a dict: check each key, then recurse into each value. For a list: recurse into each item."]);

/* ---- files ---- */
add("files", "easy", "Count Lines in a File", "count_lines", "def count_lines(path):",
  "Return the number of lines in the text file `path`. An empty file has 0 lines.",
  [["_write('a.txt', 'a\\nb\\nc\\n')\nresult = count_lines('a.txt')", "3"], ["_write('a.txt', '')\nresult = count_lines('a.txt')", "0"], ["_write('a.txt', 'x')\nresult = count_lines('a.txt')", "1"]],
  ["Loop over the file object, or use `len(f.readlines())`."]);
add("files", "medium", "Word Count of a File", "word_count", "def word_count(path):",
  "Return the total number of words (separated by any whitespace) in the text file `path`.",
  [["_write('a.txt', 'hello world\\nfoo\\n')\nresult = word_count('a.txt')", "3"], ["_write('a.txt', '')\nresult = word_count('a.txt')", "0"], ["_write('a.txt', '  many   spaces\\n\\n\\nhere ')\nresult = word_count('a.txt')", "3"]],
  ["`f.read().split()` splits on any whitespace and ignores extra spaces."]);
add("files", "hard", "CSV Column Average", "csv_average", "def csv_average(path, column):",
  "The file `path` is a simple CSV (comma separated, no quotes). The first line holds the column names. Return the average of the numeric column `column` as a float rounded to 2 decimals. Do not use the `csv` or `pandas` modules.",
  [["_write('d.csv', 'name,score\\nA,10\\nB,20\\nC,25\\n')\nresult = csv_average('d.csv', 'score')", "18.33"], ["_write('d.csv', 'k,v\\nx,5\\n')\nresult = csv_average('d.csv', 'v')", "5.0"], ["_write('d.csv', 'a,b\\n1,2\\n3,4\\n')\nresult = csv_average('d.csv', 'a')", "2.0"]],
  ["Split the header, find the index of `column`, then average `float(line.split(',')[index])` for the other lines."]);

/* ---- os ---- */
add("os", "easy", "File Extension", "file_extension", "import os\n\ndef file_extension(path):\n    pass",
  "Return the extension of `path` including the dot (for example `'.txt'`). If there is no extension return an empty string. For `archive.tar.gz` return only the last one: `'.gz'`.",
  [["file_extension('a/b/report.txt')", "'.txt'"], ["file_extension('archive.tar.gz')", "'.gz'"], ["file_extension('README')", "''"]],
  ["`os.path.splitext(path)[1]`."]);
add("os", "medium", "List Files Sorted", "list_files", "import os\n\ndef list_files(folder):\n    pass",
  "Return the names of the FILES (not sub-folders) directly inside `folder`, sorted alphabetically.",
  [["os.makedirs('d/sub')\n_write('d/b.txt', '1')\n_write('d/a.txt', '2')\nresult = list_files('d')", "['a.txt', 'b.txt']"], ["os.makedirs('e')\nresult = list_files('e')", "[]"], ["_write('f/z.py', '')\n_write('f/m.py', '')\nresult = list_files('f')", "['m.py', 'z.py']"]],
  ["`os.listdir(folder)` + `os.path.isfile(os.path.join(folder, name))`."]);
add("os", "hard", "Total Size of a Folder", "folder_size", "import os\n\ndef folder_size(folder):\n    pass",
  "Return the total size in bytes of all files inside `folder`, including every nested sub-folder. An empty folder is 0.",
  [["_write('t/a.txt', '12345')\n_write('t/s/b.txt', '123')\nresult = folder_size('t')", "8"], ["os.makedirs('z')\nresult = folder_size('z')", "0"], ["_write('q/x/y/z.txt', 'hello')\nresult = folder_size('q')", "5"]],
  ["`os.walk(folder)` gives `(root, dirs, files)` for each level; add `os.path.getsize(...)` of each file."]);

/* ---- classes ---- */
add("classes", "easy", "Bank Account", "BankAccount", "class BankAccount:\n    def __init__(self, balance=0):\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass",
  "Create a `BankAccount` with a `balance` attribute (default 0). `deposit(amount)` adds money. `withdraw(amount)` subtracts money but raises `ValueError` when the balance is not enough.",
  [["a = BankAccount(100)\na.deposit(50)\nresult = a.balance", "150"], ["a = BankAccount()\nresult = a.balance", "0"], ["a = BankAccount(10)\ntry:\n    a.withdraw(20)\nexcept ValueError:\n    result = 'no money'", "'no money'"], ["a = BankAccount(30)\na.withdraw(10)\nresult = a.balance", "20"]],
  ["Check `amount > self.balance` before subtracting."]);
add("classes", "medium", "Vector2D with Dunder Methods", "Vector2D", "class Vector2D:\n    def __init__(self, x, y):\n        pass",
  "Create `Vector2D(x, y)` that supports `+` (add two vectors), `*` with a number (scale), `==` (equal coordinates) and `repr()` that returns text like `Vector2D(1, 2)`.",
  [["Vector2D(1, 2) + Vector2D(3, 4) == Vector2D(4, 6)", "True"], ["repr(Vector2D(1, 2))", "'Vector2D(1, 2)'"], ["(Vector2D(1, 2) * 3) == Vector2D(3, 6)", "True"], ["Vector2D(1, 2) == Vector2D(2, 1)", "False"]],
  ["Implement `__add__`, `__mul__`, `__eq__` and `__repr__`."]);
add("classes", "hard", "Temperature with Properties", "Temperature", "class Temperature:\n    def __init__(self, celsius):\n        pass",
  "Create `Temperature(celsius)`. It has a `celsius` property and a `fahrenheit` property that can be READ and SET (setting one changes the other). A value below `-273.15` Celsius raises `ValueError` (also inside `__init__`).",
  [["t = Temperature(100)\nresult = t.fahrenheit", "212.0"], ["t = Temperature(0)\nt.fahrenheit = 212\nresult = t.celsius", "100.0"], ["try:\n    Temperature(-300)\nexcept ValueError:\n    result = 'bad'", "'bad'"], ["t = Temperature(10)\ntry:\n    t.celsius = -500\nexcept ValueError:\n    result = t.celsius", "10"]],
  ["Use `@property` and `@celsius.setter`. Store one private value and compute the other."]);

/* ---- async ---- */
add("async", "easy", "Async Double", "double", "import asyncio\n\nasync def double(x):\n    pass",
  "Write `async def double(x)` that waits 0.01 seconds with `asyncio.sleep` and then returns `x * 2`.",
  [["asyncio.run(double(4))", "8"], ["asyncio.run(double(0))", "0"], ["asyncio.run(double(-3))", "-6"]],
  ["`await asyncio.sleep(0.01)` then `return x * 2`."]);
add("async", "medium", "Gather Squares", "square_all", "import asyncio\n\nasync def square_all(nums):\n    pass",
  "Write `async def square_all(nums)` that squares every number CONCURRENTLY. Each square must wait 0.2 seconds (`asyncio.sleep`) before it is computed. Return the squares in the same order as `nums`. Ten numbers must finish in well under one second.",
  [["asyncio.run(square_all([1, 2, 3]))", "[1, 4, 9]"], ["asyncio.run(square_all([]))", "[]"], ["start = time.time()\nasyncio.run(square_all(list(range(10))))\nresult = (time.time() - start) < 0.9", "True"]],
  ["Define a small inner `async def` and run all of them with `await asyncio.gather(*...)`. `gather` keeps the order."]);
add("async", "hard", "Fetch with Timeout", "fetch_or_default", "import asyncio\n\nasync def fetch_or_default(coro_func, timeout, default):\n    pass",
  "`coro_func` is a function that returns a coroutine when called with no arguments. Await it, but wait at most `timeout` seconds. Return its result, or `default` if it takes longer.",
  [["async def slow():\n    await asyncio.sleep(1)\n    return 'done'\nresult = asyncio.run(fetch_or_default(slow, 0.1, 'late'))", "'late'"], ["async def fast():\n    return 'ok'\nresult = asyncio.run(fetch_or_default(fast, 1, 'late'))", "'ok'"], ["async def fast2():\n    await asyncio.sleep(0.05)\n    return 7\nresult = asyncio.run(fetch_or_default(fast2, 1, 0))", "7"]],
  ["`await asyncio.wait_for(coro_func(), timeout)` raises `asyncio.TimeoutError` when it is too slow."]);

/* ---- strings ---- */
add("strings", "easy", "Reverse Words", "reverse_words", "def reverse_words(s):",
  "Reverse the ORDER of the words in `s`. The result has exactly one space between words and no leading or trailing spaces.",
  [["reverse_words('hello world')", "'world hello'"], ["reverse_words('  a  b ')", "'b a'"], ["reverse_words('')", "''"], ["reverse_words('one')", "'one'"]],
  ["`s.split()` ignores extra spaces. Then reverse and `' '.join`."]);
add("strings", "medium", "Caesar Cipher", "caesar", "def caesar(text, shift):",
  "Shift every letter of `text` by `shift` positions in the alphabet (wrapping around). Keep upper/lower case. Other characters stay unchanged. `shift` can be negative.",
  [["caesar('abc', 1)", "'bcd'"], ["caesar('xyz', 3)", "'abc'"], ["caesar('Hello, World!', 5)", "'Mjqqt, Btwqi!'"], ["caesar('bcd', -1)", "'abc'"]],
  ["For a letter: `chr((ord(ch) - base + shift) % 26 + base)` where `base` is `ord('a')` or `ord('A')`."]);
add("strings", "hard", "Longest Palindromic Substring", "longest_palindrome", "def longest_palindrome(s):",
  "Return the longest substring of `s` that reads the same forwards and backwards. If several have the same length, return the one that starts first. An empty string returns an empty string.",
  [["longest_palindrome('babad')", "'bab'"], ["longest_palindrome('cbbd')", "'bb'"], ["longest_palindrome('a')", "'a'"], ["longest_palindrome('forgeeksskeegfor')", "'geeksskeeg'"], ["longest_palindrome('')", "''"]],
  ["Expand around every centre (one for odd length, one for even length) and keep the best."]);

/* ---- functions ---- */
add("functions", "easy", "Make Multiplier", "make_multiplier", "def make_multiplier(n):",
  "Return a NEW function that multiplies its argument by `n` (a closure). Example: `make_multiplier(3)(4)` is `12`.",
  [["make_multiplier(3)(4)", "12"], ["make_multiplier(0)(9)", "0"], ["make_multiplier(-2)(5)", "-10"]],
  ["Define an inner function that uses `n` and return it (without calling it)."]);
add("functions", "medium", "Fibonacci Generator", "fib_upto", "def fib_upto(limit):",
  "Write a GENERATOR that yields the Fibonacci numbers `0, 1, 1, 2, 3, 5, ...` while they are less than or equal to `limit`.",
  [["list(fib_upto(20))", "[0, 1, 1, 2, 3, 5, 8, 13]"], ["list(fib_upto(0))", "[0]"], ["list(fib_upto(1))", "[0, 1, 1]"], ["list(fib_upto(-1))", "[]"]],
  ["Keep two variables `a, b = 0, 1`; `yield a` while `a <= limit`, then `a, b = b, a + b`."]);
add("functions", "hard", "Memoize Decorator", "memoize", "def memoize(func):",
  "Write a decorator `memoize` that caches results by the positional arguments, so the wrapped function runs only once for the same arguments. A memoized recursive Fibonacci of 80 must return instantly.",
  [["calls = []\n@memoize\ndef sq(x):\n    calls.append(x)\n    return x * x\nsq(3); sq(3); sq(4)\nresult = (sq(3), calls)", "(9, [3, 4])"], ["@memoize\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\nresult = fib(80)", "23416728348467685"], ["@memoize\ndef add(a, b):\n    return a + b\nresult = (add(1, 2), add(2, 1))", "(3, 3)"]],
  ["Keep a dictionary in the decorator; the key is the `args` tuple. Return the stored value if the key exists."]);

(window.QUADRA_DATA = window.QUADRA_DATA || {}).python = { categories: CATEGORIES, questions: QUESTIONS };
})();
