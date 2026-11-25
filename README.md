<div align="center">
  <!-- Replace the src path below with your actual SVG logo file path or URL -->
  <img src="./assets/icon.svg" alt="Quadra Code Lab Logo" width="140" height="140" />
  <h1>Quadra Code Lab</h1>
  <p>
    <strong>Offline-First Interactive Coding Practice Lab for Python, C++, DSA & SQL</strong>
  </p>
  <p>
    <a href="[https://github.com/amirsohail100](https://github.com/amirsohail100)"><img src="[https://img.shields.io/badge/Author-Amir_Sohail-blue?style=for-the-badge&logo=github](https://img.shields.io/badge/Author-Amir_Sohail-blue?style=for-the-badge&logo=github)" alt="Author"></a>
    <img src="[https://img.shields.io/badge/Status-Live_(Offline_Web_App)-success?style=for-the-badge](https://img.shields.io/badge/Status-Live_(Offline_Web_App)-success?style=for-the-badge)" alt="Status">
    <img src="[https://img.shields.io/badge/Questions-232_Across_35_Categories-orange?style=for-the-badge](https://img.shields.io/badge/Questions-232_Across_35_Categories-orange?style=for-the-badge)" alt="Questions">
    <img src="[https://img.shields.io/badge/Architecture-Pure_HTML_/_No_Server-purple?style=for-the-badge](https://img.shields.io/badge/Architecture-Pure_HTML_/_No_Server-purple?style=for-the-badge)" alt="Architecture">
  </p>
</div>

---

## 📖 Overview

**Quadra Code Lab** is a zero-server, offline-first coding practice environment built with pure HTML, CSS, and vanilla JavaScript. Designed for uninterrupted local learning, it packs **232 verified questions across 35 categories** spanning **Python, C++, Data Structures & Algorithms (DSA), and SQL**—ranging from Easy to Hard, each with its own dedicated problem page.

Solve problems directly inside VS Code, validate solutions using auto-generated local test scripts, listen to problem statements with built-in offline Text-to-Speech, track progress via `localStorage`, and compare your work against closed-by-default reference solutions—without needing internet access, a backend server, or complex setup.

---

## 🌟 Core Features & Capabilities

- **Zero-Server Offline Architecture:** Runs straight from `index.html` in Chrome, Edge, or Firefox with zero installation or internet dependency.
- **Automated Local Test Harnesses:** Downloadable verification scripts (`test_<id>.py`, `test_<id>.cpp`, `setup_<id>.sql`, `check_<id>.py`) to test your local VS Code solutions with instant PASS/FAIL output.
- **Closed-by-Default Reference Answers:** Every problem includes a hidden reference answer (or approach and pseudocode for DSA) that resets to closed every time you open a question, encouraging genuine problem-solving first.
- **Built-In Accessibility & Progress Tracking:** Features offline OS Text-to-Speech ("Read aloud") with voice and speed controls, dark/light themes, mobile-friendly UI, and exportable/importable `localStorage` progress.

---

## 🌐 The Quadra Ecosystem

Quadra Code Lab is part of a broader, multi-domain software ecosystem engineered from the ground up:

| Product             | Category                 | Description & Current Status                                                                                                                                      |
| :------------------ | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quadra Code Lab** | Developer Practice Suite | **Live (Offline).** A pure-HTML, zero-server offline coding lab featuring 232 verified Python, C++, DSA, and SQL problems with local test harnesses.              |
| **Quadra Studio**   | Freelancing & Agency Hub | **Live.** The core brand platform and Upwork/Fiverr-style freelancing product. Accessible via the pinned link on my GitHub profile.                               |
| **Quadra Pixel**    | Game Storefront          | **Live (Monolithic).** An itch.io / Microsoft Store-style digital storefront hosting original games built by me.                                                  |
| **Quadra AI**       | Agentic AI System        | **In Development.** An advanced agentic framework orchestrating multiple LLM providers into structured workflows, with plans for a custom-trained foundation LLM. |
| **Quadra Engine**   | Unified Game Dev Suite   | **In Development.** An ambitious all-in-one workspace combining the workflows of Unity, Blender, Substance Painter, and VS Code into a single environment.        |
| **Quadra Office**   | Productivity Suite       | **In Development.** A modern, lightweight alternative to Microsoft Office for document, spreadsheet, and workflow management.                                     |
| **Quadra Flow**     | Machine Learning Library | **In Development.** A high-level Python wrapper designed to simplify complex, high-syntax ML builder libraries into clean, low-syntax pipelines.                  |

---

## 📚 Curriculum & Tracks Breakdown

Every category is divided into **Easy / Medium / Hard** tiers, and every Python, C++, and SQL reference answer is verified against its own generated test script:

| Track      | Questions | Categories                                                                                               | Local Verification Command                                   |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Python** | 100       | 10 (basics, lists, dicts, JSON, files, OS, classes, async, strings, functions)                           | `python test_<id>.py`                                        |
| **C++**    | 42        | 7 (basics, strings, vectors, maps, OOP, STL, modern C++)                                                 | `g++ -std=c++17 test_<id>.cpp -o t && ./t`                   |
| **DSA**    | 50        | 10 (arrays, two pointers, sliding window, binary search, linked lists, trees, stack, DP, graphs, greedy) | No checker: input & expected output shown (use any language) |
| **SQL**    | 40        | 8 (SELECT, JOINs, aggregation, subqueries, windows, strings, dates, advanced)                            | `python check_<id>.py`                                       |

---

## 🚀 Quick Start & Workflow

### 1. Launch the Lab

1. Unzip the project folder.
2. Double-click `index.html` in any modern browser (**Chrome**, **Edge**, or **Firefox**)—no internet, no server, no install.
3. Choose a track: **Python**, **C++**, **DSA**, or **SQL**.

### 2. How to Solve & Verify

- **Python / C++:**
  1. Open a question and copy the starter code into `solution.py` or `solution.cpp` in VS Code.
  2. Click **Download `test_<id>`** and save it in the same folder.
  3. Run the verification command shown on the page; each test prints `PASS` or `FAIL`. Once all pass, click **Mark as solved**.
- **SQL (SQLite Dialect):**
  1. Inspect the schema tables and expected output on the question page.
  2. Download `setup_<id>.sql` to experiment in any SQLite client (DB Browser for SQLite, VS Code SQLite extension, or `sqlite3`).
  3. For automated checking, place **one** query inside `solution.sql` alongside `check_<id>.py` and run `python check_<id>.py` (builds tables in memory via Python's built-in `sqlite3` and compares columns and rows).
- **DSA:**
  1. Read the problem statement, examples, and constraints, and implement your solution in any language.
  2. Expand the hidden **Approach & Pseudocode** or **Show reference answer** sections only after attempting the problem.

---

## 🏗️ Project Layout & Extensibility

### Directory Structure

```text
index.html                                      # Home page & progress import/export
python.html | cpp.html | dsa.html | sql.html    # Dedicated track pages
css/style.css                                   # Complete theme & responsive styling
js/tracks.js                                    # Track definitions & settings
js/app.js                                       # Core track engine (lists, details, progress, TTS, answer toggle)
js/home.js                                      # Home page dashboard logic
js/harness.js                                   # Dynamic generator for test, setup, and check scripts
data/<track>.questions.js                       # All questions per track (includes DSA approaches & SQL answers)
data/python.solutions.js, data/cpp.solutions.js # Reference answers for Python & C++
```

### Adding Custom Questions

Open `data/<track>.questions.js` and append a new `add(...)` call matching the existing schema. For **Python** and **C++**, add the corresponding reference solution inside `data/python.solutions.js` or `data/cpp.solutions.js` using the same question `id`.

---

## 🛠️ Tech Stack & System Requirements

- **Frontend & Engine:** HTML5, CSS3, Vanilla JavaScript (`localStorage`, Web Speech API)
- **Test Harnesses & Verification:** Python 3 (`sqlite3` standard library), C++17 (`g++`)
- **System Requirements:** Any modern web browser; Python 3 (for Python & SQL checks) and `g++` with C++17 support (for C++ checks).

---

## 👨‍💻 Creator & Lead Developer

**Amir Sohail**  
_Founder, Lead Developer & AI Engineer at Quadra_

- **GitHub:** [@amirsohail100](https://github.com/amirsohail100)
- **Hugging Face:** [@amirsoahil101](https://huggingface.co/amirsoahil101)
- **Kaggle:** [@amirsohail122](https://www.kaggle.com/amirsohail122)

---

## 🔒 License & Usage Notice

**Quadra Code Lab** and its associated curriculum, test harnesses, and source code are created and maintained by **Amir Sohail** under the **Quadra** ecosystem.
