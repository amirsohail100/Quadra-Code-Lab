# Quartra Code Lab

Quartra Code Lab is an offline practice lab for Python, C++, DSA and SQL. 232 questions across 35 categories, Easy to Hard, each with its own page. Solve in VS Code, check with downloadable test scripts, read questions aloud, track progress, and compare with a closed-by-default answer. Pure HTML, no server.

## Quick start

1. Unzip the folder.
2. Double-click `index.html` (Chrome, Edge or Firefox). No internet, no server, no install.
3. Pick a track: **Python**, **C++**, **DSA** or **SQL**.

## What is inside

| Track  | Questions | Categories                                                                                               | How you check                                                     |
| ------ | --------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Python | 100       | 10 (basics, lists, dicts, JSON, files, OS, classes, async, strings, functions)                           | `python test_<id>.py`                                             |
| C++    | 42        | 7 (basics, strings, vectors, maps, OOP, STL, modern C++)                                                 | `g++ -std=c++17 test_<id>.cpp -o t && ./t`                        |
| DSA    | 50        | 10 (arrays, two pointers, sliding window, binary search, linked lists, trees, stack, DP, graphs, greedy) | no checker: input and expected output are shown, use any language |
| SQL    | 40        | 8 (SELECT, JOINs, aggregation, subqueries, windows, strings, dates, advanced)                            | `python check_<id>.py`                                            |

Every category is split into Easy / Medium / Hard. Questions are verified: each Python, C++ and SQL reference answer passes its own generated test.

## How to solve a question

**Python / C++**

1. Open a question and copy the starter code into `solution.py` or `solution.cpp` in VS Code.
2. Click "Download test\_<id>" and save it in the same folder.
3. Run the command shown on the page. Every test prints PASS or FAIL.
4. All PASS? Click "Mark as solved".

**SQL**

1. Read the tables and the expected output shown on the page.
2. Download `setup_<id>.sql` and run it in any SQLite tool to try your query (DB Browser for SQLite, VS Code SQLite extension, `sqlite3`).
3. For an automatic check, put ONE query in `solution.sql` next to `check_<id>.py` and run `python check_<id>.py`. It builds the tables in memory, runs your query and compares columns and rows.

The SQL dialect is SQLite. A browser cannot run SQL offline without a bundled engine, so checking happens through the Python script (Python ships with sqlite3).

**DSA**
Read the problem, examples and constraints, solve in any language. The approach and pseudocode are hidden until you open them.

## Compare with the reference answer

Every question has a **Show reference answer** button. It is CLOSED by default and closes again each time you open a question. Click it to see the answer code (or approach and pseudocode for DSA), and use Copy to paste it next to your own solution.

## More features

- Progress per track, saved in your browser (localStorage). Export and import it from the home page.
- Text to speech (Read aloud) with voice and speed controls. Offline voices depend on your operating system: Windows, macOS and Android include them. Voices marked "offline" in the top bar work without internet.
- Dark and light theme, mobile friendly layout.

## Project layout

```
index.html            home page
python.html cpp.html dsa.html sql.html    one page per track
css/style.css         all styling
js/tracks.js          track list and settings
js/app.js             track engine (lists, details, progress, speech, answer toggle)
js/home.js            home page logic
js/harness.js         builds the downloadable test, setup and check files
data/<track>.questions.js    all questions of a track
data/python.solutions.js, data/cpp.solutions.js    reference answers
```

DSA approaches and SQL reference queries live inside their questions files.

## Add your own question

Open `data/<track>.questions.js` and add one more `add(...)` call following the format of the others. For Python and C++ add the reference answer in the matching `*.solutions.js` using the same id.

## Requirements

A modern browser. To run checks: Python 3 (Python and SQL tracks) and g++ with C++17 (C++ track).
