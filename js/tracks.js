/* js/tracks.js - one place that describes the four Quartra tracks. */
window.QUARTRA_TRACKS = [
  { id: "python", page: "python.html", icon: "🐍", name: "Python",
    kind: "code", lang: "Python", file: "solution.py", testExt: "py",
    blurb: "Master Python itself: lists, dicts, JSON, files, OS, classes, async. Solve in VS Code, check with a test script." },
  { id: "cpp", page: "cpp.html", icon: "⚙️", name: "C++",
    kind: "code", lang: "C++", file: "solution.cpp", testExt: "cpp",
    blurb: "Core C++ and the STL: strings, vectors, maps, classes, algorithms and modern C++. Compile and run the test file." },
  { id: "dsa", page: "dsa.html", icon: "🧩", name: "DSA",
    kind: "dsa", lang: "any language",
    blurb: "Data structures and algorithms. No code checking: you see the input and the expected output, use ANY language." },
  { id: "sql", page: "sql.html", icon: "🗄️", name: "SQL",
    kind: "sql", lang: "SQL (SQLite)",
    blurb: "Write queries against the given tables and match the expected output. Setup file and check script included." }
];
