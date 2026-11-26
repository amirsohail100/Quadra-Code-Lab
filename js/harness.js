/* =====================================================================
   js/harness.js - builds the downloadable test files.
     pythonTest(q)  -> test_<id>.py   (checks solution.py)
     cppTest(q)     -> test_<id>.cpp  (includes solution.cpp)
     sqlSetup(q)    -> setup_<id>.sql (CREATE TABLE + INSERT, SQLite dialect)
     sqlCheck(q)    -> check_<id>.py  (runs solution.sql on in-memory SQLite and compares)
   Works in the browser (window.QuadraHarness) and in Node (module.exports).
   ===================================================================== */
(function (root) {
  "use strict";

  const LEVEL_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };
  const levelOf = q => LEVEL_LABEL[q.level] || q.level;

  /* ------------------------------ Python ------------------------------ */
  function pythonTest(q) {
    const s = JSON.stringify;
    const L = [
      "# Test script for: " + q.title + "   (" + levelOf(q) + ")",
      "# 1) Write your code in a file called solution.py (same folder as this file).",
      "# 2) Run:  python test_" + q.id + ".py",
      "import os, sys, json, time, asyncio, itertools, datetime, tempfile, shutil",
      "from solution import *",
      "",
      "def _write(path, text):",
      "    folder = os.path.dirname(path)",
      "    if folder:",
      "        os.makedirs(folder, exist_ok=True)",
      "    with open(path, 'w') as f:",
      "        f.write(text)",
      "",
      "def _read(path):",
      "    with open(path) as f:",
      "        return f.read()",
      "",
      "TESTS = ["
    ];
    q.tests.forEach(t => L.push("    (" + s(t[0]) + ", " + s(t[1]) + "),"));
    L.push(
      "]",
      "",
      "def _run(code, expected, ns):",
      "    try:",
      "        got = eval(code, ns)",
      "    except SyntaxError:",
      "        exec(code, ns)",
      "        got = ns.get('result')",
      "    return got, eval(expected, ns)",
      "",
      "passed = 0",
      "for number, (code, expected) in enumerate(TESTS, 1):",
      "    folder = tempfile.mkdtemp()",
      "    origin = os.getcwd()",
      "    os.chdir(folder)",
      "    try:",
      "        got, want = _run(code, expected, dict(globals()))",
      "        ok = got == want",
      "    except Exception as error:",
      "        got, want, ok = type(error).__name__ + ': ' + str(error), expected, False",
      "    finally:",
      "        os.chdir(origin)",
      "        shutil.rmtree(folder, ignore_errors=True)",
      "    if ok:",
      "        passed += 1",
      "        print('PASS  test', number)",
      "    else:",
      "        print('FAIL  test', number)",
      "        print('   code     :', code.replace('\\n', '\\n              '))",
      "        print('   expected :', want)",
      "        print('   got      :', got)",
      "",
      "print()",
      "print(passed, '/', len(TESTS), 'tests passed')",
      "if passed == len(TESTS):",
      "    print('All tests passed - well done!')",
      "sys.exit(0 if passed == len(TESTS) else 1)",
      ""
    );
    return L.join("\n");
  }

  /* ------------------------------- C++ -------------------------------- */
  const CPP_HELPERS = String.raw`namespace qt {

struct Approx {                       // use Approx(3.14) as an expected value for doubles
    double v;
    explicit Approx(double x) : v(x) {}
};
inline bool operator==(double a, const Approx& b) { return std::fabs(a - b.v) <= 1e-6 * std::max(1.0, std::fabs(b.v)); }
inline bool operator==(const Approx& b, double a) { return a == b; }

template <class T, class = void> struct streamable : std::false_type {};
template <class T> struct streamable<T, std::void_t<decltype(std::declval<std::ostream&>() << std::declval<const T&>())>> : std::true_type {};

inline std::string show(bool b);
inline std::string show(char c);
inline std::string show(const char* s);
inline std::string show(const std::string& s);
inline std::string show(const Approx& a);
template <class A, class B> std::string show(const std::pair<A, B>& p);
template <class T> std::string show(const std::vector<T>& v);
template <class T> std::string show(const std::set<T>& v);
template <class K, class V> std::string show(const std::map<K, V>& m);
template <class T> std::enable_if_t<streamable<T>::value, std::string> show(const T& x);
template <class T> std::enable_if_t<!streamable<T>::value, std::string> show(const T& x);

inline std::string show(bool b) { return b ? "true" : "false"; }
inline std::string show(char c) { return std::string("'") + c + "'"; }
inline std::string show(const char* s) { return std::string("\"") + s + "\""; }
inline std::string show(const std::string& s) { return "\"" + s + "\""; }
inline std::string show(const Approx& a) { std::ostringstream o; o << a.v; return o.str(); }
template <class A, class B> std::string show(const std::pair<A, B>& p) { return "(" + show(p.first) + ", " + show(p.second) + ")"; }
template <class T> std::string show(const std::vector<T>& v) {
    std::string s = "[";
    for (size_t i = 0; i < v.size(); ++i) { if (i) s += ", "; s += show(v[i]); }
    return s + "]";
}
template <class T> std::string show(const std::set<T>& v) {
    std::string s = "{"; bool first = true;
    for (const auto& x : v) { if (!first) s += ", "; first = false; s += show(x); }
    return s + "}";
}
template <class K, class V> std::string show(const std::map<K, V>& m) {
    std::string s = "{"; bool first = true;
    for (const auto& kv : m) { if (!first) s += ", "; first = false; s += show(kv.first) + ": " + show(kv.second); }
    return s + "}";
}
template <class T> std::enable_if_t<streamable<T>::value, std::string> show(const T& x) { std::ostringstream o; o << x; return o.str(); }
template <class T> std::enable_if_t<!streamable<T>::value, std::string> show(const T&) { return "<object>"; }

}  // namespace qt
`;

  function cppTest(q) {
    const id = q.id;
    const raw = s => 'R"__QT__(' + s + ')__QT__"';
    const L = [
      "// Test file for: " + q.title + "   (" + levelOf(q) + ")",
      "// 1) Save your code as solution.cpp in the SAME folder as this file.",
      "// 2) Compile and run:",
      "//      g++ -std=c++17 test_" + id + ".cpp -o test_" + id + " && ./test_" + id,
      "//    (Windows:  g++ -std=c++17 test_" + id + ".cpp -o test_" + id + " ; .\\test_" + id + ".exe)",
      "#include <algorithm>", "#include <array>", "#include <cctype>", "#include <climits>", "#include <cmath>",
      "#include <cstdint>", "#include <cstring>", "#include <deque>", "#include <functional>", "#include <iostream>",
      "#include <iterator>", "#include <limits>", "#include <list>", "#include <map>", "#include <memory>",
      "#include <numeric>", "#include <optional>", "#include <queue>", "#include <set>", "#include <sstream>",
      "#include <stack>", "#include <stdexcept>", "#include <string>", "#include <tuple>", "#include <type_traits>",
      "#include <unordered_map>", "#include <unordered_set>", "#include <utility>", "#include <vector>",
      "",
      "using namespace std;",
      '#include "solution.cpp"',
      "",
      CPP_HELPERS,
      "using qt::Approx;",
      "",
      "int main() {",
      "    int total = 0, passed = 0;",
      ""
    ];
    q.tests.forEach((t, i) => {
      const n = i + 1;
      const isBody = /\breturn\b/.test(t[0]);
      const gotFn = isBody ? "[&]() {\n" + t[0] + "\n            }()" : "[&]() { return (" + t[0] + "); }()";
      L.push(
        "    {",
        "        ++total;",
        "        const char* code = " + raw(t[0]) + ";",
        "        try {",
        "            auto got = " + gotFn + ";",
        "            auto want = (" + t[1] + ");",
        "            if (got == want) {",
        "                ++passed;",
        '                cout << "PASS  test ' + n + '\\n";',
        "            } else {",
        '                cout << "FAIL  test ' + n + '\\n   code     : " << code << "\\n   expected : " << qt::show(want) << "\\n   got      : " << qt::show(got) << "\\n";',
        "            }",
        "        } catch (const std::exception& e) {",
        '            cout << "FAIL  test ' + n + '\\n   code     : " << code << "\\n   threw    : " << e.what() << "\\n";',
        "        } catch (...) {",
        '            cout << "FAIL  test ' + n + '\\n   code     : " << code << "\\n   threw    : unknown exception\\n";',
        "        }",
        "    }"
      );
    });
    L.push(
      "",
      '    cout << "\\n" << passed << " / " << total << " tests passed\\n";',
      '    if (passed == total) cout << "All tests passed - well done!\\n";',
      "    return passed == total ? 0 : 1;",
      "}",
      ""
    );
    return L.join("\n");
  }

  /* ------------------------------- SQL -------------------------------- */
  function sqlLiteral(v) {
    if (v === null || v === undefined) return "NULL";
    if (typeof v === "number") return String(v);
    if (typeof v === "boolean") return v ? "1" : "0";
    return "'" + String(v).replace(/'/g, "''") + "'";
  }

  function sqlSetup(q) {
    const out = [
      "-- Quadra Code Lab SQL setup for: " + q.title + "   (SQLite dialect)",
      "-- Run this once in your SQL tool (DB Browser for SQLite, VS Code SQLite extension, sqlite3 CLI ...),",
      "-- then write your query.",
      ""
    ];
    q.tables.forEach(t => {
      out.push("DROP TABLE IF EXISTS " + t.name + ";");
      out.push("CREATE TABLE " + t.name + " (" + t.cols.map(c => c[0] + " " + c[1]).join(", ") + ");");
      for (let i = 0; i < t.rows.length; i += 50) {
        out.push("INSERT INTO " + t.name + " VALUES\n  " +
          t.rows.slice(i, i + 50).map(r => "(" + r.map(sqlLiteral).join(", ") + ")").join(",\n  ") + ";");
      }
      out.push("");
    });
    return out.join("\n");
  }

  function sqlCheck(q) {
    const data = { setup: sqlSetup(q), expected: { cols: q.expected.cols, rows: q.expected.rows }, ordered: !!q.expected.ordered };
    const header = [
      "# Check script for: " + q.title + "   (" + levelOf(q) + ")",
      "# 1) Write ONE query (SELECT ... or WITH ... SELECT ...) in a file called solution.sql, same folder as this file.",
      "# 2) Run:  python check_" + q.id + ".py",
      "# The script builds the tables in an in-memory SQLite database, runs your query and compares the result.",
      "import sqlite3, json, sys, os",
      "",
      "DATA = json.loads(" + JSON.stringify(JSON.stringify(data)) + ")",
      ""
    ].join("\n");
    const body = String.raw`
def norm(v):
    if isinstance(v, float):
        v = round(v, 6)
        if v == int(v):
            v = int(v)
    return v

def fmt(v):
    return "NULL" if v is None else str(v)

def table(cols, rows, limit=12):
    data = [[fmt(c) for c in cols]] + [[fmt(x) for x in r] for r in rows[:limit]]
    widths = [max(len(r[i]) for r in data) for i in range(len(cols))]
    lines = []
    for n, r in enumerate(data):
        lines.append("  " + " | ".join(x.ljust(widths[i]) for i, x in enumerate(r)))
        if n == 0:
            lines.append("  " + "-+-".join("-" * w for w in widths))
    if len(rows) > limit:
        lines.append("  ... (%d more rows)" % (len(rows) - limit))
    return "\n".join(lines)

path = "solution.sql"
if not os.path.exists(path):
    print("FAIL  solution.sql not found. Create it in the same folder and write your query inside.")
    sys.exit(1)
query = open(path, encoding="utf-8").read().strip()
if not query:
    print("FAIL  solution.sql is empty.")
    sys.exit(1)

con = sqlite3.connect(":memory:")
con.executescript(DATA["setup"])
try:
    cur = con.execute(query)
    rows = cur.fetchall()
except sqlite3.Error as error:
    print("FAIL  your query raised an error:")
    print("   ", error)
    print("   (the file must contain exactly ONE statement)")
    sys.exit(1)
if cur.description is None:
    print("FAIL  your statement does not return rows. Write a SELECT query.")
    sys.exit(1)

cols = [d[0] for d in cur.description]
exp_cols = DATA["expected"]["cols"]
got = [tuple(norm(x) for x in r) for r in rows]
want = [tuple(norm(x) for x in r) for r in DATA["expected"]["rows"]]
if not DATA["ordered"]:
    got.sort(key=repr)
    want.sort(key=repr)

cols_ok = [c.lower() for c in cols] == [c.lower() for c in exp_cols]
rows_ok = got == want
if cols_ok and rows_ok:
    print("PASS  query returned %d row(s) and matches the expected output" % len(rows))
    print()
    print("1 / 1 tests passed")
    print("All tests passed - well done!")
    sys.exit(0)

print("FAIL  output does not match")
if not cols_ok:
    print("   column names/order differ - expected:", exp_cols, " got:", cols)
elif DATA["ordered"] and sorted(got, key=repr) == sorted(want, key=repr):
    print("   the rows are right but the ORDER is wrong (ORDER BY needed)")
print()
print("Your output (%d rows):" % len(rows))
print(table(cols, rows))
print()
print("Expected output (%d rows):" % len(want))
print(table(exp_cols, DATA["expected"]["rows"]))
print()
print("0 / 1 tests passed")
sys.exit(1)
`;
    return header + body;
  }

  const api = { pythonTest, cppTest, sqlSetup, sqlCheck, LEVEL_LABEL };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.QuadraHarness = api;
})(typeof window !== "undefined" ? window : this);
