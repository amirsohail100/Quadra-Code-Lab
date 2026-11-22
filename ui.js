/* =====================================================================
   ui.js - everything about the interface. Data comes from questions.js.
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const LEVELS = ["easy", "medium", "hard"];
  const LEVEL_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };

  /* ---------- storage ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ } }
  };

  const catById = {};
  CATEGORIES.forEach(c => { catById[c.id] = c; });
  const qById = {};
  QUESTIONS.forEach(q => { qById[q.id] = q; });
  const catQs = id => QUESTIONS.filter(q => q.cat === id);

  let done = store.get("pymaster_done", {});
  let st = Object.assign({ cat: CATEGORIES[0].id, level: "all", qid: null }, store.get("pymaster_state", {}));
  if (!catById[st.cat]) st.cat = CATEGORIES[0].id;
  if (st.qid && !qById[st.qid]) st.qid = null;
  const saveState = () => store.set("pymaster_state", st);

  /* ---------- small helpers ---------- */
  function esc(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function rich(text) { // escape, then turn `code` into <code>
    return esc(text).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\n/g, "<br>");
  }
  function plain(text) { return String(text).replace(/`/g, ""); }
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1900);
  }
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const area = document.createElement("textarea");
      area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select();
      try { document.execCommand("copy"); } catch (err) { /* ignore */ }
      area.remove();
    }
    toast("Copied to clipboard");
  }
  function download(filename, text) {
    const blob = new Blob([text], { type: "text/x-python;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  /* ---------- python test script generator ---------- */
  function buildTestScript(q) {
    const pyStr = s => JSON.stringify(s);
    const lines = [
      "# Test script for: " + q.title + "   (" + LEVEL_LABEL[q.level] + ")",
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
    q.tests.forEach(t => { lines.push("    (" + pyStr(t[0]) + ", " + pyStr(t[1]) + "),"); });
    lines.push(
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
    return lines.join("\n");
  }
  const buildStarter = q => "# solution.py  -  " + q.title + " (" + LEVEL_LABEL[q.level] + ")\n" + q.sig + "\n";

  /* ---------- text to speech (works offline with local voices) ---------- */
  const tts = {
    supported: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    voices: [], speaking: false
  };

  function loadVoices() {
    if (!tts.supported) return;
    const all = speechSynthesis.getVoices();
    if (!all.length) return;
    const rank = v => (v.localService ? 0 : 10) + (/^en/i.test(v.lang) ? 0 : 5);
    tts.voices = all.slice().sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
    const select = $("#voiceSelect");
    const saved = store.get("pymaster_voice", null);
    select.innerHTML = tts.voices.map((v, i) =>
      '<option value="' + i + '">' + esc(v.name) + " (" + esc(v.lang) + ")" + (v.localService ? " - offline" : " - online") + "</option>").join("");
    const idx = tts.voices.findIndex(v => v.name === saved);
    select.value = String(idx >= 0 ? idx : 0);
  }

  function stopSpeaking() {
    if (tts.supported) speechSynthesis.cancel();
    tts.speaking = false;
    updateSpeakButtons();
  }

  function speak(text) {
    if (!tts.supported) { toast("Text to speech is not supported in this browser"); return; }
    speechSynthesis.cancel();
    const select = $("#voiceSelect");
    const voice = tts.voices[Number(select.value)] || null;
    const rate = Number($("#rate").value) || 1;
    const parts = text.match(/[^.!?\n]+[.!?]*/g) || [text];  // short chunks avoid a Chrome cut-off bug
    tts.speaking = true;
    updateSpeakButtons();
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part.trim());
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = rate;
      if (i === parts.length - 1) {
        u.onend = u.onerror = () => { tts.speaking = false; updateSpeakButtons(); };
      }
      speechSynthesis.speak(u);
    });
  }

  function updateSpeakButtons() {
    const speakBtn = $('[data-act="speak"]');
    const stopBtn = $('[data-act="stop"]');
    if (speakBtn) speakBtn.disabled = tts.speaking;
    if (stopBtn) stopBtn.disabled = !tts.speaking;
  }

  function questionSpeech(q) {
    return q.title + ". " + LEVEL_LABEL[q.level] + " level. " + plain(q.desc) + " Write the function named " + q.fn.replace(/_/g, " ") + ".";
  }

  /* ---------- rendering ---------- */
  function overallProgress() {
    const total = QUESTIONS.length;
    const count = QUESTIONS.filter(q => done[q.id]).length;
    $("#overallBar").style.width = (count / total * 100) + "%";
    $("#overallText").textContent = count + " / " + total + " solved";
  }

  function renderSidebar() {
    $("#catList").innerHTML = CATEGORIES.map(c => {
      const qs = catQs(c.id);
      const d = qs.filter(q => done[q.id]).length;
      return '<button class="cat' + (c.id === st.cat ? " active" : "") + '" data-cat="' + c.id + '">' +
        '<span class="cat-icon">' + c.icon + '</span>' +
        '<span class="cat-name">' + esc(c.name) + '</span>' +
        '<span class="cat-count">' + d + "/" + qs.length + '</span>' +
        '<span class="mini"><i style="width:' + (qs.length ? d / qs.length * 100 : 0) + '%"></i></span></button>';
    }).join("");
  }

  function renderList() {
    const c = catById[st.cat];
    const qs = catQs(c.id);
    const d = qs.filter(q => done[q.id]).length;
    const chips = ["all"].concat(LEVELS).map(l => {
      const n = l === "all" ? qs.length : qs.filter(q => q.level === l).length;
      return '<button class="chip' + (st.level === l ? " active" : "") + '" data-level="' + l + '">' +
        (l === "all" ? "All" : LEVEL_LABEL[l]) + " (" + n + ")</button>";
    }).join("");

    const groups = LEVELS.filter(l => st.level === "all" || st.level === l).map(l => {
      const items = qs.filter(q => q.level === l);
      if (!items.length) return "";
      const dn = items.filter(q => done[q.id]).length;
      const cards = items.map(q => {
        const n = q.id.split("-")[1];
        return '<button class="card' + (done[q.id] ? " done" : "") + '" data-open="' + q.id + '">' +
          '<span class="num">' + (done[q.id] ? "✓" : n) + '</span>' +
          '<span class="card-title">' + esc(q.title) + '</span></button>';
      }).join("");
      return '<h2 class="group-title"><span class="badge ' + l + '">' + LEVEL_LABEL[l] + '</span><small>' + dn + " / " + items.length + ' solved</small></h2>' +
        '<div class="cards">' + cards + '</div>';
    }).join("");

    $("#main").innerHTML =
      '<section class="hero"><div class="hero-icon">' + c.icon + '</div><div><h1>' + esc(c.name) + '</h1><p>' + esc(c.desc) + '</p></div>' +
      '<div class="hero-prog">' + d + " / " + qs.length + ' solved<div class="bar" style="width:120px;margin-top:6px"><i style="width:' + (d / qs.length * 100) + '%"></i></div></div></section>' +
      '<div class="chips">' + chips + '</div>' + groups;
  }

  function caseHtml(t) {
    return '<div class="case"><div class="lbl">Input</div><pre>' + esc(t[0]) + '</pre>' +
      '<div class="lbl">Expected output' + (/\bresult\b/.test(t[0]) && t[0].includes("\n") ? " (value of <b>result</b>)" : "") + '</div>' +
      '<pre class="exp">' + esc(t[1]) + '</pre></div>';
  }

  function renderDetail(q) {
    const c = catById[q.cat];
    const idx = QUESTIONS.indexOf(q);
    const prev = QUESTIONS[idx - 1], next = QUESTIONS[idx + 1];
    const isDone = !!done[q.id];
    const samples = q.tests.slice(0, 2), rest = q.tests.slice(2);
    const hints = q.hints.length
      ? '<details><summary>Need a hint?</summary><ul>' + q.hints.map(h => "<li>" + rich(h) + "</li>").join("") + "</ul></details>" : "";

    $("#main").innerHTML =
      '<div class="crumbs"><button class="back" data-act="back">← ' + esc(c.name) + '</button>' +
      '<span>' + c.icon + " " + esc(c.name) + " › " + LEVEL_LABEL[q.level] + " › #" + q.id.split("-")[1] + '</span></div>' +

      '<div class="title-row"><h1>' + esc(q.title) + '</h1><span class="badge ' + q.level + '">' + LEVEL_LABEL[q.level] + '</span></div>' +

      '<section class="panel"><h2>Problem</h2><div class="desc">' + rich(q.desc) + '</div>' + hints + '</section>' +

      '<section class="panel"><h2><span class="grow">Starter code</span><button class="copy-btn" data-act="copy-starter">Copy</button></h2>' +
      '<pre>' + esc(q.sig) + '</pre></section>' +

      '<section class="panel"><h2>Sample input / output</h2><div class="cases">' + samples.map(caseHtml).join("") + '</div></section>' +

      (rest.length ? '<section class="panel"><h2>More test cases your code must pass (' + rest.length + ')</h2><div class="cases">' + rest.map(caseHtml).join("") + '</div></section>' : "") +

      '<section class="panel"><h2>Work in VS Code</h2><div class="actions">' +
      '<button class="btn" data-act="copy-starter">📋 Copy starter code</button>' +
      '<button class="btn primary" data-act="download-test">⬇ Download test_' + q.id + '.py</button>' +
      '<button class="btn" data-act="copy-test">📋 Copy test script</button></div>' +
      '<details><summary>How do I run the tests?</summary><ol>' +
      '<li>In VS Code create <code>solution.py</code> and paste the starter code. Write your solution.</li>' +
      '<li>Download <code>test_' + q.id + '.py</code> into the SAME folder.</li>' +
      '<li>Run <code>python test_' + q.id + '.py</code> in the terminal. Every test prints PASS or FAIL.</li>' +
      '<li>All PASS? Come back and press <b>Mark as solved</b>.</li></ol></details></section>' +

      '<section class="panel"><h2>Listen</h2><div class="actions">' +
      '<button class="btn" data-act="speak">🔊 Read question aloud</button>' +
      '<button class="btn" data-act="stop" disabled>⏹ Stop</button></div>' +
      '<div class="tts-note">' + (tts.supported
        ? "Uses your device's built-in voices. Choose a voice marked <b>offline</b> in the top bar to work without internet."
        : "Your browser does not support text to speech.") + '</div></section>' +

      '<div class="actions"><button class="btn ' + (isDone ? "" : "success") + '" data-act="toggle-done">' +
      (isDone ? "↩ Mark as not solved" : "✓ Mark as solved") + '</button></div>' +

      '<div class="nav-row"><button class="btn" data-act="prev"' + (prev ? "" : " disabled") + '>← ' + (prev ? esc(prev.title) : "Previous") + '</button>' +
      '<button class="btn" data-act="next"' + (next ? "" : " disabled") + '>' + (next ? esc(next.title) : "Next") + ' →</button></div>';
  }

  function render() {
    overallProgress();
    renderSidebar();
    if (st.qid) renderDetail(qById[st.qid]); else renderList();
  }

  function openQuestion(id) {
    stopSpeaking();
    const q = qById[id];
    st.qid = id; st.cat = q.cat;
    saveState(); render(); window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-cat],[data-level],[data-open],[data-act]");
    if (!t) return;

    if (t.dataset.cat) {
      stopSpeaking();
      st.cat = t.dataset.cat; st.qid = null; st.level = "all";
      document.body.classList.remove("menu-open");
      saveState(); render(); window.scrollTo(0, 0);
    } else if (t.dataset.level) {
      st.level = t.dataset.level; saveState(); render();
    } else if (t.dataset.open) {
      openQuestion(t.dataset.open);
    } else if (t.dataset.act) {
      const q = st.qid ? qById[st.qid] : null;
      const act = t.dataset.act;
      if (act === "back") { stopSpeaking(); st.qid = null; saveState(); render(); window.scrollTo(0, 0); }
      else if (!q) return;
      else if (act === "copy-starter") copyText(buildStarter(q));
      else if (act === "copy-test") copyText(buildTestScript(q));
      else if (act === "download-test") { download("test_" + q.id + ".py", buildTestScript(q)); toast("Saved test_" + q.id + ".py"); }
      else if (act === "speak") speak(questionSpeech(q));
      else if (act === "stop") stopSpeaking();
      else if (act === "toggle-done") {
        if (done[q.id]) delete done[q.id]; else done[q.id] = true;
        store.set("pymaster_done", done);
        toast(done[q.id] ? "Nice! Marked as solved 🎉" : "Marked as not solved");
        render();
      } else if (act === "prev" || act === "next") {
        const target = QUESTIONS[QUESTIONS.indexOf(q) + (act === "next" ? 1 : -1)];
        if (target) openQuestion(target.id);
      }
    }
  });

  $("#menuBtn").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  $("#backdrop").addEventListener("click", () => document.body.classList.remove("menu-open"));

  $("#resetBtn").addEventListener("click", () => {
    if (confirm("Reset ALL progress? This cannot be undone.")) {
      done = {}; store.set("pymaster_done", done); render(); toast("Progress reset");
    }
  });

  const themeBtn = $("#themeBtn");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
    store.set("pymaster_theme", theme);
  }
  themeBtn.addEventListener("click", () =>
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));
  applyTheme(store.get("pymaster_theme", "dark"));

  $("#voiceSelect").addEventListener("change", e => {
    const v = tts.voices[Number(e.target.value)];
    if (v) store.set("pymaster_voice", v.name);
  });
  $("#rate").value = store.get("pymaster_rate", 1);
  $("#rate").addEventListener("change", e => store.set("pymaster_rate", Number(e.target.value)));

  if (tts.supported) {
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
  } else {
    $("#ttsSettings").style.display = "none";
  }
  window.addEventListener("beforeunload", () => { if (tts.supported) speechSynthesis.cancel(); });

  render();
})();
