# PyMaster - Python Practice Website

Offline Python practice questions (like LeetCode, but for mastering Python - no data-structures grind).
No editor inside the website: you solve every question in VS Code.

## Run

Double-click `index.html` (any modern browser: Chrome, Edge, Firefox). No internet or server needed.

## Files

- `index.html` - page skeleton
- `style.css` - all styling (dark / light theme)
- `ui.js` - all interface logic (progress, filters, text to speech, test-script export)
- `questions.js` - ALL categories and questions (100 questions, 10 categories x 10, split easy / medium / hard)

## How to solve a question

1. Open a question, copy the starter code into `solution.py` in VS Code and write your solution.
2. Click "Download test\_<id>.py" and save it in the same folder as `solution.py`.
3. Run `python test_<id>.py` - every test prints PASS or FAIL.
4. All PASS? Click "Mark as solved". Progress is saved in your browser (localStorage).

## Text to speech

Uses the browser's built-in `speechSynthesis`. Pick a voice marked "offline" in the top bar to use it without internet.
(Offline voices depend on your operating system - Windows, macOS and Android include them.)

## Add your own question

Open `questions.js` and add one more `add(...)` line (the format is explained at the top of the file).
