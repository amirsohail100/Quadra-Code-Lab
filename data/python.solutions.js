/* data/python.solutions.js - Quadra Code Lab Python reference answers (shown in the closed-by-default "Reference answer" box). */
(function () {
  "use strict";
  const S = {};
  const add = (id, code) => { S[id] = code.replace(/^\n/, "").replace(/\s+$/, ""); };

  /* ---------------- basics ---------------- */
  add("basics-1", String.raw`
def is_even(n):
    return n % 2 == 0`);
  add("basics-2", String.raw`
def celsius_to_fahrenheit(c):
    return c * 9 / 5 + 32`);
  add("basics-3", String.raw`
def sum_of_digits(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`);
  add("basics-4", String.raw`
def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append('FizzBuzz')
        elif i % 3 == 0:
            out.append('Fizz')
        elif i % 5 == 0:
            out.append('Buzz')
        else:
            out.append(str(i))
    return out`);
  add("basics-5", String.raw`
def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True`);
  add("basics-6", String.raw`
def gcd_lcm(a, b):
    x, y = a, b
    while y:
        x, y = y, x % y
    return (x, a * b // x)`);
  add("basics-7", String.raw`
def collatz_steps(n):
    steps = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        steps += 1
    return steps`);
  add("basics-8", String.raw`
def to_roman(n):
    table = [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'), (100, 'C'), (90, 'XC'),
             (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]
    out = ''
    for value, symbol in table:
        while n >= value:
            out += symbol
            n -= value
    return out`);
  add("basics-9", String.raw`
def number_to_words(n):
    ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
            'eighteen', 'nineteen']
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

    def below_100(x):
        if x < 20:
            return ones[x]
        word = tens[x // 10]
        return word + ('-' + ones[x % 10] if x % 10 else '')

    if n < 100:
        return below_100(n)
    rest = n % 100
    text = ones[n // 100] + ' hundred'
    if rest:
        text += ' ' + below_100(rest)
    return text`);
  add("basics-10", String.raw`
def is_balanced(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack`);

  /* ---------------- lists ---------------- */
  add("lists-1", String.raw`
def second_largest(nums):
    return sorted(set(nums))[-2]`);
  add("lists-2", String.raw`
def remove_duplicates(items):
    seen = set()
    out = []
    for x in items:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out`);
  add("lists-3", String.raw`
def rotate_left(items, k):
    if not items:
        return []
    k %= len(items)
    return items[k:] + items[:k]`);
  add("lists-4", String.raw`
def chunk_list(items, size):
    return [items[i:i + size] for i in range(0, len(items), size)]`);
  add("lists-5", String.raw`
def merge_sorted(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    return out + a[i:] + b[j:]`);
  add("lists-6", String.raw`
def two_sum(nums, target):
    seen = {}
    for j, x in enumerate(nums):
        if target - x in seen:
            return (seen[target - x], j)
        seen[x] = j`);
  add("lists-7", String.raw`
def flatten(nested):
    out = []
    for item in nested:
        if isinstance(item, list):
            out.extend(flatten(item))
        else:
            out.append(item)
    return out`);
  add("lists-8", String.raw`
def longest_consecutive(nums):
    values = set(nums)
    best = 0
    for n in values:
        if n - 1 not in values:
            length = 1
            while n + length in values:
                length += 1
            best = max(best, length)
    return best`);
  add("lists-9", String.raw`
def rotate_matrix(matrix):
    return [list(row) for row in zip(*matrix[::-1])]`);
  add("lists-10", String.raw`
def max_subarray(nums):
    best = current = nums[0]
    for x in nums[1:]:
        current = max(x, current + x)
        best = max(best, current)
    return best`);

  /* ---------------- dicts ---------------- */
  add("dicts-1", String.raw`
def word_count(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts`);
  add("dicts-2", String.raw`
def invert_dict(d):
    return {v: k for k, v in d.items()}`);
  add("dicts-3", String.raw`
def merge_dicts(a, b):
    return {**a, **b}`);
  add("dicts-4", String.raw`
def get_nested(data, keys, default=None):
    current = data
    for key in keys:
        if not isinstance(current, dict) or key not in current:
            return default
        current = current[key]
    return current`);
  add("dicts-5", String.raw`
def group_by_length(words):
    groups = {}
    for w in words:
        groups.setdefault(len(w), []).append(w)
    return groups`);
  add("dicts-6", String.raw`
def top_n_frequent(items, n):
    counts = {}
    for x in items:
        counts[x] = counts.get(x, 0) + 1
    ranked = sorted(counts, key=lambda k: (-counts[k], k))
    return ranked[:n]`);
  add("dicts-7", String.raw`
def group_anagrams(words):
    groups = {}
    for w in words:
        groups.setdefault(''.join(sorted(w)), []).append(w)
    result = [sorted(g) for g in groups.values()]
    return sorted(result, key=lambda g: g[0])`);
  add("dicts-8", String.raw`
def deep_merge(a, b):
    result = dict(a)
    for key, value in b.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result`);
  add("dicts-9", String.raw`
def flatten_dict(d, sep='.'):
    out = {}
    for key, value in d.items():
        if isinstance(value, dict):
            for sub_key, sub_value in flatten_dict(value, sep).items():
                out[key + sep + sub_key] = sub_value
        else:
            out[key] = value
    return out`);
  add("dicts-10", String.raw`
def unflatten_dict(d, sep='.'):
    result = {}
    for key, value in d.items():
        parts = key.split(sep)
        node = result
        for part in parts[:-1]:
            node = node.setdefault(part, {})
        node[parts[-1]] = value
    return result`);

  /* ---------------- json ---------------- */
  add("json-1", String.raw`
import json

def to_json_string(data):
    return json.dumps(data, sort_keys=True)`);
  add("json-2", String.raw`
import json

def get_json_value(text, key):
    return json.loads(text).get(key)`);
  add("json-3", String.raw`
import json

def save_and_load(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    with open(path) as f:
        return json.load(f)`);
  add("json-4", String.raw`
import json

def safe_parse(text):
    try:
        return json.loads(text)
    except ValueError:
        return None`);
  add("json-5", String.raw`
import json

def total_cost(text):
    return sum(item['price'] * item['qty'] for item in json.loads(text))`);
  add("json-6", String.raw`
import json

def filter_json_file(path, key, value):
    with open(path) as f:
        data = json.load(f)
    return [item for item in data if item.get(key) == value]`);
  add("json-7", String.raw`
import json

def update_json_file(path, key, value):
    with open(path) as f:
        data = json.load(f)
    data[key] = value
    with open(path, 'w') as f:
        json.dump(data, f)`);
  add("json-8", String.raw`
import json
import datetime

def dumps_with_dates(obj):
    def convert(o):
        if isinstance(o, datetime.date):
            return o.isoformat()
        if isinstance(o, set):
            return sorted(o)
        raise TypeError('cannot serialise ' + type(o).__name__)
    return json.dumps(obj, sort_keys=True, default=convert)`);
  add("json-9", String.raw`
def find_all_values(obj, key):
    found = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == key:
                found.append(v)
            found.extend(find_all_values(v, key))
    elif isinstance(obj, list):
        for item in obj:
            found.extend(find_all_values(item, key))
    return found`);
  add("json-10", String.raw`
import json
import csv

def write_csv_from_json(json_path, csv_path):
    with open(json_path) as f:
        rows = json.load(f)
    fields = sorted(rows[0].keys())
    with open(csv_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(fields)
        for row in rows:
            writer.writerow([row[k] for k in fields])`);

  /* ---------------- files ---------------- */
  add("files-1", String.raw`
def write_lines(path, lines):
    with open(path, 'w') as f:
        for line in lines:
            f.write(line + '\n')`);
  add("files-2", String.raw`
def count_lines(path):
    with open(path) as f:
        return sum(1 for _ in f)`);
  add("files-3", String.raw`
def append_line(path, text):
    with open(path, 'a') as f:
        f.write(text + '\n')`);
  add("files-4", String.raw`
def read_nonempty_lines(path):
    with open(path) as f:
        return [line.strip() for line in f if line.strip()]`);
  add("files-5", String.raw`
def word_frequency_file(path):
    counts = {}
    with open(path) as f:
        for line in f:
            for word in line.lower().split():
                counts[word] = counts.get(word, 0) + 1
    return counts`);
  add("files-6", String.raw`
def find_in_file(path, word):
    word = word.lower()
    found = []
    with open(path) as f:
        for number, line in enumerate(f, 1):
            if word in line.lower():
                found.append(number)
    return found`);
  add("files-7", String.raw`
def copy_uppercase(src, dst):
    count = 0
    with open(src) as fin, open(dst, 'w') as fout:
        for line in fin:
            fout.write(line.upper())
            count += 1
    return count`);
  add("files-8", String.raw`
from collections import deque

def tail(path, n):
    if n <= 0:
        return []
    with open(path) as f:
        last = deque(f, maxlen=n)
    return [line.rstrip('\n') for line in last]`);
  add("files-9", String.raw`
def merge_files(paths, out_path):
    total = 0
    with open(out_path, 'w') as out:
        for path in paths:
            with open(path) as f:
                for line in f:
                    out.write(line.rstrip('\n') + '\n')
                    total += 1
    return total`);
  add("files-10", String.raw`
import csv

def csv_stats(path, column):
    with open(path, newline='') as f:
        values = [float(row[column]) for row in csv.DictReader(f)]
    return (min(values), max(values), sum(values) / len(values))`);

  /* ---------------- os ---------------- */
  add("os-1", String.raw`
import os

def join_path(parts):
    return os.path.join(*parts)`);
  add("os-2", String.raw`
import os

def get_extension(filename):
    return os.path.splitext(filename)[1].lstrip('.').lower()`);
  add("os-3", String.raw`
import os

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)
    return os.path.isdir(path)`);
  add("os-4", String.raw`
import os

def list_files(folder):
    return sorted(n for n in os.listdir(folder) if os.path.isfile(os.path.join(folder, n)))`);
  add("os-5", String.raw`
import os

def group_by_extension(folder):
    groups = {}
    for name in sorted(os.listdir(folder)):
        if os.path.isfile(os.path.join(folder, name)):
            ext = os.path.splitext(name)[1].lstrip('.').lower()
            groups.setdefault(ext, []).append(name)
    return groups`);
  add("os-6", String.raw`
import os

def folder_size(folder):
    total = 0
    for root, dirs, files in os.walk(folder):
        for name in files:
            total += os.path.getsize(os.path.join(root, name))
    return total`);
  add("os-7", String.raw`
import os

def find_files(root, ext):
    found = []
    for current, dirs, files in os.walk(root):
        for name in files:
            if name.endswith(ext):
                rel = os.path.relpath(os.path.join(current, name), root)
                found.append(rel.replace(os.sep, '/'))
    return sorted(found)`);
  add("os-8", String.raw`
import os
import shutil

def organize_by_extension(folder):
    counts = {}
    for name in os.listdir(folder):
        source = os.path.join(folder, name)
        if not os.path.isfile(source):
            continue
        ext = os.path.splitext(name)[1].lstrip('.').lower() or 'no_ext'
        target = os.path.join(folder, ext)
        os.makedirs(target, exist_ok=True)
        shutil.move(source, os.path.join(target, name))
        counts[ext] = counts.get(ext, 0) + 1
    return counts`);
  add("os-9", String.raw`
import os

def delete_empty_dirs(root):
    deleted = 0
    for current, dirs, files in os.walk(root, topdown=False):
        if current != root and not os.listdir(current):
            os.rmdir(current)
            deleted += 1
    return deleted`);
  add("os-10", String.raw`
import os
import hashlib

def find_duplicates(root):
    by_hash = {}
    for current, dirs, files in os.walk(root):
        for name in files:
            path = os.path.join(current, name)
            with open(path, 'rb') as f:
                digest = hashlib.sha256(f.read()).hexdigest()
            rel = os.path.relpath(path, root).replace(os.sep, '/')
            by_hash.setdefault(digest, []).append(rel)
    groups = [sorted(g) for g in by_hash.values() if len(g) > 1]
    return sorted(groups, key=lambda g: g[0])`);

  /* ---------------- classes ---------------- */
  add("classes-1", String.raw`
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)`);
  add("classes-2", String.raw`
class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1

    def decrement(self):
        self.value -= 1`);
  add("classes-3", String.raw`
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return '%s (%d)' % (self.name, self.age)`);
  add("classes-4", String.raw`
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError('insufficient funds')
        self.balance -= amount`);
  add("classes-5", String.raw`
class Animal:
    def __init__(self, name):
        self.name = name

    def sound(self):
        return '...'

    def describe(self):
        return self.name + ' says ' + self.sound()

class Dog(Animal):
    def sound(self):
        return 'Woof'

class Cat(Animal):
    def sound(self):
        return 'Meow'`);
  add("classes-6", String.raw`
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, k):
        return Vector(self.x * k, self.y * k)

    def __eq__(self, other):
        return isinstance(other, Vector) and self.x == other.x and self.y == other.y

    def __repr__(self):
        return 'Vector(%s, %s)' % (self.x, self.y)`);
  add("classes-7", String.raw`
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError('below absolute zero')
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5 / 9`);
  add("classes-8", String.raw`
class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._data = {}
        return cls._instance

    def set(self, key, value):
        self._data[key] = value

    def get(self, key, default=None):
        return self._data.get(key, default)`);
  add("classes-9", String.raw`
class Suppress:
    def __init__(self, *exceptions):
        self.exceptions = exceptions

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return exc_type is not None and issubclass(exc_type, self.exceptions)`);
  add("classes-10", String.raw`
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

def total_area(shapes):
    return sum(s.area() for s in shapes)`);

  /* ---------------- async ---------------- */
  add("async-1", String.raw`
import asyncio

async def greet(name):
    await asyncio.sleep(0.1)
    return 'Hello, ' + name`);
  add("async-2", String.raw`
import asyncio

async def add_after(a, b, delay):
    await asyncio.sleep(delay)
    return a + b`);
  add("async-3", String.raw`
import asyncio

async def square(x):
    await asyncio.sleep(0.1)
    return x * x

async def gather_squares(nums):
    return list(await asyncio.gather(*(square(n) for n in nums)))`);
  add("async-4", String.raw`
import asyncio

async def countdown(n):
    while n > 0:
        await asyncio.sleep(0.01)
        yield n
        n -= 1`);
  add("async-5", String.raw`
import asyncio

async def fetch(url):
    await asyncio.sleep(0.1)
    return 'data:' + url

async def fetch_all(urls):
    results = await asyncio.gather(*(fetch(u) for u in urls))
    return dict(zip(urls, results))`);
  add("async-6", String.raw`
import asyncio

async def run_with_timeout(coro, seconds):
    try:
        return await asyncio.wait_for(coro, timeout=seconds)
    except asyncio.TimeoutError:
        return 'timeout'`);
  add("async-7", String.raw`
import asyncio

async def run_limited(n, limit):
    semaphore = asyncio.Semaphore(limit)
    running = 0
    peak = 0

    async def task():
        nonlocal running, peak
        async with semaphore:
            running += 1
            peak = max(peak, running)
            await asyncio.sleep(0.05)
            running -= 1

    await asyncio.gather(*(task() for _ in range(n)))
    return peak`);
  add("async-8", String.raw`
import asyncio

async def pipeline(items, workers):
    queue = asyncio.Queue()
    for item in items:
        queue.put_nowait(item)
    results = []

    async def worker():
        while True:
            item = await queue.get()
            await asyncio.sleep(0.01)
            results.append(item * item)
            queue.task_done()

    tasks = [asyncio.create_task(worker()) for _ in range(workers)]
    await queue.join()
    for t in tasks:
        t.cancel()
    await asyncio.gather(*tasks, return_exceptions=True)
    return sorted(results)`);
  add("async-9", String.raw`
import asyncio

async def retry(func, attempts, delay):
    last = None
    for i in range(attempts):
        try:
            return await func()
        except Exception as error:
            last = error
            if i < attempts - 1:
                await asyncio.sleep(delay)
    raise last`);
  add("async-10", String.raw`
import asyncio

async def first_completed(coros):
    tasks = [asyncio.ensure_future(c) for c in coros]
    done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
    for t in pending:
        t.cancel()
    return next(iter(done)).result()`);

  /* ---------------- strings ---------------- */
  add("strings-1", String.raw`
def reverse_words(s):
    return ' '.join(s.split()[::-1])`);
  add("strings-2", String.raw`
def is_palindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`);
  add("strings-3", String.raw`
def count_vowels(s):
    return sum(1 for c in s.lower() if c in 'aeiou')`);
  add("strings-4", String.raw`
def title_case(s):
    return ' '.join(w[0].upper() + w[1:].lower() for w in s.split())`);
  add("strings-5", String.raw`
def caesar_cipher(text, shift):
    out = []
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            out.append(chr((ord(c) - base + shift) % 26 + base))
        else:
            out.append(c)
    return ''.join(out)`);
  add("strings-6", String.raw`
def compress(s):
    out = []
    i = 0
    while i < len(s):
        j = i
        while j < len(s) and s[j] == s[i]:
            j += 1
        out.append(s[i] + str(j - i))
        i = j
    return ''.join(out)`);
  add("strings-7", String.raw`
def common_prefix(words):
    if not words:
        return ''
    prefix = words[0]
    for w in words[1:]:
        while not w.startswith(prefix):
            prefix = prefix[:-1]
    return prefix`);
  add("strings-8", String.raw`
def longest_unique_substring(s):
    last = {}
    start = 0
    best = 0
    for i, c in enumerate(s):
        if c in last and last[c] >= start:
            start = last[c] + 1
        last[c] = i
        best = max(best, i - start + 1)
    return best`);
  add("strings-9", String.raw`
def wildcard_match(s, pattern):
    dp = [[False] * (len(pattern) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(1, len(pattern) + 1):
        if pattern[j - 1] == '*':
            dp[0][j] = dp[0][j - 1]
    for i in range(1, len(s) + 1):
        for j in range(1, len(pattern) + 1):
            if pattern[j - 1] == '*':
                dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
            elif pattern[j - 1] == '?' or pattern[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[len(s)][len(pattern)]`);
  add("strings-10", String.raw`
def word_wrap(text, width):
    lines = []
    current = ''
    for word in text.split():
        if not current:
            current = word
        elif len(current) + 1 + len(word) <= width:
            current += ' ' + word
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines`);

  /* ---------------- functions ---------------- */
  add("functions-1", String.raw`
def make_multiplier(n):
    def multiply(x):
        return x * n
    return multiply`);
  add("functions-2", String.raw`
def apply_twice(func, x):
    return func(func(x))`);
  add("functions-3", String.raw`
def summarize(*args, **kwargs):
    return (sum(args), sorted(kwargs))`);
  add("functions-4", String.raw`
def safe_divide(a, b):
    if b == 0:
        return None
    return a / b`);
  add("functions-5", String.raw`
import functools

def counted(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper`);
  add("functions-6", String.raw`
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b`);
  add("functions-7", String.raw`
import functools

def memoize(func):
    cache = {}

    @functools.wraps(func)
    def wrapper(x):
        if x not in cache:
            cache[x] = func(x)
        return cache[x]
    return wrapper`);
  add("functions-8", String.raw`
import functools

def retry(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as error:
                    last = error
            raise last
        return wrapper
    return decorator`);
  add("functions-9", String.raw`
class InvalidAgeError(ValueError):
    pass

def validate_age(age):
    if not isinstance(age, int) or isinstance(age, bool) or age < 0 or age > 150:
        raise InvalidAgeError('invalid age: ' + repr(age))
    return age`);
  add("functions-10", String.raw`
def chunked(iterable, size):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield tuple(chunk)
            chunk = []
    if chunk:
        yield tuple(chunk)`);


  /* ================= more reference answers ================= */
  add("basics-11", String.raw`
def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in 'aeiou')`);
  add("basics-12", String.raw`
def is_perfect(n):
    if n < 2:
        return False
    total = 0
    for i in range(1, n // 2 + 1):
        if n % i == 0:
            total += i
    return total == n`);
  add("basics-13", String.raw`
def to_base(n, base):
    digits = '0123456789ABCDEF'
    if n == 0:
        return '0'
    out = ''
    while n > 0:
        out = digits[n % base] + out
        n //= base
    return out`);
  add("lists-11", String.raw`
def second_largest(nums):
    unique = sorted(set(nums))
    return unique[-2] if len(unique) >= 2 else None`);
  add("lists-12", String.raw`
def rotate_left(nums, k):
    if not nums:
        return []
    k %= len(nums)
    return nums[k:] + nums[:k]`);
  add("lists-13", String.raw`
def merge_intervals(intervals):
    merged = []
    for start, end in sorted(intervals):
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`);
  add("dicts-11", String.raw`
def invert_dict(d):
    return {v: k for k, v in d.items()}`);
  add("dicts-12", String.raw`
def group_by_length(words):
    result = {}
    for w in words:
        result.setdefault(len(w), []).append(w)
    return result`);
  add("dicts-13", String.raw`
def flatten_dict(d, prefix=''):
    out = {}
    for key, value in d.items():
        name = prefix + '.' + key if prefix else key
        if isinstance(value, dict):
            out.update(flatten_dict(value, name))
        else:
            out[name] = value
    return out`);
  add("json-11", String.raw`
import json

def get_name(text):
    return json.loads(text)['name']`);
  add("json-12", String.raw`
import json

def total_price(text):
    data = json.loads(text)
    return sum(item['price'] * item['qty'] for item in data)`);
  add("json-13", String.raw`
import json

def find_all_values(text, key):
    found = []
    def walk(node):
        if isinstance(node, dict):
            for k, v in node.items():
                if k == key:
                    found.append(v)
                walk(v)
        elif isinstance(node, list):
            for item in node:
                walk(item)
    walk(json.loads(text))
    return found`);
  add("files-11", String.raw`
def count_lines(path):
    with open(path) as f:
        return sum(1 for _ in f)`);
  add("files-12", String.raw`
def word_count(path):
    with open(path) as f:
        return len(f.read().split())`);
  add("files-13", String.raw`
def csv_average(path, column):
    with open(path) as f:
        lines = f.read().strip().split('\n')
    header = lines[0].split(',')
    idx = header.index(column)
    values = [float(line.split(',')[idx]) for line in lines[1:]]
    return round(sum(values) / len(values), 2)`);
  add("os-11", String.raw`
import os

def file_extension(path):
    return os.path.splitext(path)[1]`);
  add("os-12", String.raw`
import os

def list_files(folder):
    names = [n for n in os.listdir(folder) if os.path.isfile(os.path.join(folder, n))]
    return sorted(names)`);
  add("os-13", String.raw`
import os

def folder_size(folder):
    total = 0
    for root, dirs, files in os.walk(folder):
        for name in files:
            total += os.path.getsize(os.path.join(root, name))
    return total`);
  add("classes-11", String.raw`
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError('not enough money')
        self.balance -= amount`);
  add("classes-12", String.raw`
class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def __mul__(self, k):
        return Vector2D(self.x * k, self.y * k)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f'Vector2D({self.x}, {self.y})'`);
  add("classes-13", String.raw`
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError('below absolute zero')
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5 / 9`);
  add("async-11", String.raw`
import asyncio

async def double(x):
    await asyncio.sleep(0.01)
    return x * 2`);
  add("async-12", String.raw`
import asyncio

async def square_all(nums):
    async def square(n):
        await asyncio.sleep(0.2)
        return n * n
    return list(await asyncio.gather(*(square(n) for n in nums)))`);
  add("async-13", String.raw`
import asyncio

async def fetch_or_default(coro_func, timeout, default):
    try:
        return await asyncio.wait_for(coro_func(), timeout)
    except asyncio.TimeoutError:
        return default`);
  add("strings-11", String.raw`
def reverse_words(s):
    return ' '.join(reversed(s.split()))`);
  add("strings-12", String.raw`
def caesar(text, shift):
    out = []
    for ch in text:
        if ch.isalpha() and ch.isascii():
            base = ord('a') if ch.islower() else ord('A')
            out.append(chr((ord(ch) - base + shift) % 26 + base))
        else:
            out.append(ch)
    return ''.join(out)`);
  add("strings-13", String.raw`
def longest_palindrome(s):
    best = ''
    for centre in range(len(s)):
        for lo, hi in ((centre, centre), (centre, centre + 1)):
            while lo >= 0 and hi < len(s) and s[lo] == s[hi]:
                lo -= 1
                hi += 1
            if hi - lo - 1 > len(best):
                best = s[lo + 1:hi]
    return best`);
  add("functions-11", String.raw`
def make_multiplier(n):
    def multiply(x):
        return x * n
    return multiply`);
  add("functions-12", String.raw`
def fib_upto(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b`);
  add("functions-13", String.raw`
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper`);

  (window.QUADRA_SOLUTIONS = window.QUADRA_SOLUTIONS || {}).python = S;
})();
