/* =====================================================================
   js/app.js - Quartra track engine (used by python/cpp/dsa/sql pages).
   The page sets <body data-track="python|cpp|dsa|sql">.
   ===================================================================== */
(function () {
  "use strict";

  const TRACKS = window.QUARTRA_TRACKS;
  const trackId = document.body.dataset.track;
  const T = TRACKS.find(t => t.id === trackId);
  const DATA = (window.QUARTRA_DATA || {})[trackId];
  const SOL = (window.QUARTRA_SOLUTIONS || {})[trackId] || {};
  const H = window.QuartraHarness;
  const $ = s => document.querySelector(s);
  const LEVELS = ["easy", "medium", "hard"];
  const LVL = { easy: "Easy", medium: "Medium", hard: "Hard" };

  /* ---------- storage (safe) ---------- */
  const KEY = "quartra:" + trackId + ":done";
  const PREF = "quartra:prefs";
  function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ } }
  let done = load(KEY, {});
  let prefs = load(PREF, { theme: "dark", rate: 1, voice: "" });

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function md(s) {   // tiny markdown: `code`, newlines
    return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\n/g, "<br>");
  }
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 1800);
  }
  function copy(text) {
    const ok = () => toast("Copied!");
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
    function fallback() {
      const a = document.createElement("textarea"); a.value = text; document.body.appendChild(a); a.select();
      try { document.execCommand("copy"); ok(); } catch (e) { toast("Copy failed"); }
      a.remove();
    }
  }
  function download(name, text) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const byId = id => DATA.questions.find(q => q.id === id);
  const inCat = c => DATA.questions.filter(q => q.cat === c);
  const catOf = id => DATA.categories.find(c => c.id === id);
  const countDone = list => list.filter(q => done[q.id]).length;

  /* ---------- state ---------- */
  let view = { type: "home", cat: DATA.categories[0].id, level: "all", q: null };

  function fromHash() {
    const h = location.hash.slice(1);
    let m;
    if ((m = h.match(/^q\/(.+)$/)) && byId(m[1])) view = { type: "detail", q: m[1], cat: byId(m[1]).cat, level: view.level };
    else if ((m = h.match(/^cat\/(.+)$/)) && catOf(m[1])) view = { type: "list", cat: m[1], level: view.level, q: null };
    else view = { type: "list", cat: view.cat, level: view.level, q: null };
  }
  function go(hash) { location.hash = hash; }

  /* ---------- text to speech ---------- */
  const tts = { voices: [], speaking: false };
  function initVoices() {
    if (!("speechSynthesis" in window)) { const s = $("#ttsSettings"); if (s) s.style.display = "none"; return; }
    const fill = () => {
      tts.voices = speechSynthesis.getVoices();
      const sel = $("#voiceSelect"); if (!sel) return;
      const list = tts.voices.slice().sort((a, b) => (b.localService - a.localService) || a.name.localeCompare(b.name));
      sel.innerHTML = list.map(v => '<option value="' + esc(v.name) + '">' + esc(v.name) + " (" + esc(v.lang) + ")" + (v.localService ? " • offline" : " • online") + "</option>").join("");
      const pick = list.find(v => v.name === prefs.voice) || list.find(v => v.localService && /^en/i.test(v.lang)) || list[0];
      if (pick) sel.value = pick.name;
    };
    fill(); speechSynthesis.onvoiceschanged = fill;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("Text to speech is not supported in this browser"); return; }
    stopSpeak();
    const chunks = text.replace(/\s+/g, " ").match(/[^.!?;:]+[.!?;:]?/g) || [text];
    const sel = $("#voiceSelect"); const voice = tts.voices.find(v => sel && v.name === sel.value);
    const rate = parseFloat(($("#rate") || {}).value) || 1;
    tts.speaking = true; updateSpeakBtn();
    chunks.forEach((c, i) => {
      const u = new SpeechSynthesisUtterance(c.trim());
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = rate;
      if (i === chunks.length - 1) u.onend = u.onerror = () => { tts.speaking = false; updateSpeakBtn(); };
      speechSynthesis.speak(u);
    });
  }
  function stopSpeak() { if ("speechSynthesis" in window) speechSynthesis.cancel(); tts.speaking = false; updateSpeakBtn(); }
  function updateSpeakBtn() { const b = $("#speakBtn"); if (b) b.textContent = tts.speaking ? "⏹ Stop" : "🔊 Read aloud"; }
  function speechText(q) {
    let t = q.title + ". " + q.desc.replace(/`/g, "");
    if (T.kind === "dsa") {
      q.examples.forEach((e, i) => { t += " Example " + (i + 1) + ". Input: " + e.input.replace(/\n/g, ", ") + ". Output: " + e.output + "."; });
    } else if (T.kind === "sql") {
      t += " Tables: " + q.tables.map(x => x.name + " with columns " + x.cols.map(c => c[0]).join(", ")).join("; ") + ". Expected columns: " + q.expected.cols.join(", ") + ".";
    }
    return t;
  }

  /* ---------- top-level chrome ---------- */
  function overall() {
    const total = DATA.questions.length, d = countDone(DATA.questions);
    $("#overallBar").style.width = (total ? d / total * 100 : 0) + "%";
    $("#overallText").textContent = d + " / " + total + " solved";
  }
  function setTheme(t) {
    document.documentElement.dataset.theme = t; prefs.theme = t; save(PREF, prefs);
    $("#themeBtn").textContent = t === "dark" ? "🌙" : "☀️";
  }
  function renderSidebar() {
    $("#catList").innerHTML = DATA.categories.map(c => {
      const list = inCat(c.id), d = countDone(list);
      return '<button class="cat' + (view.cat === c.id ? " active" : "") + '" data-cat="' + c.id + '">' +
        '<span class="cat-icon">' + c.icon + '</span><span class="cat-name">' + esc(c.name) + '</span>' +
        '<span class="cat-count">' + d + "/" + list.length + '</span>' +
        '<span class="mini"><i style="width:' + (list.length ? d / list.length * 100 : 0) + '%"></i></span></button>';
    }).join("");
  }

  /* ---------- list view ---------- */
  function renderList() {
    const c = catOf(view.cat), list = inCat(c.id);
    const d = countDone(list);
    let h = '<div class="hero"><div class="hero-icon">' + c.icon + '</div><div><h1>' + esc(c.name) + '</h1><p>' + esc(c.desc || "") + '</p></div>' +
      '<div class="hero-prog">' + d + " / " + list.length + ' solved</div></div>';
    h += '<div class="chips">' + ["all"].concat(LEVELS).map(l =>
      '<button class="chip' + (view.level === l ? " active" : "") + '" data-level="' + l + '">' + (l === "all" ? "All levels" : LVL[l]) + "</button>").join("") + "</div>";
    (view.level === "all" ? LEVELS : [view.level]).forEach(l => {
      const items = list.filter(q => q.level === l);
      if (!items.length) return;
      h += '<div class="group-title"><span class="badge ' + l + '">' + LVL[l] + "</span><small>" + countDone(items) + " / " + items.length + "</small></div><div class=\"cards\">";
      h += items.map(q => '<button class="card' + (done[q.id] ? " done" : "") + '" data-q="' + q.id + '"><span class="num">' + (done[q.id] ? "✓" : list.indexOf(q) + 1) + '</span><span class="card-title">' + esc(q.title) + "</span></button>").join("");
      h += "</div>";
    });
    $("#main").innerHTML = h;
  }

  /* ---------- shared detail pieces ---------- */
  function tableHtml(cols, rows, limit) {
    const shown = limit ? rows.slice(0, limit) : rows;
    let h = '<div class="tbl-wrap"><table class="data"><thead><tr>' + cols.map(c => "<th>" + esc(c) + "</th>").join("") + "</tr></thead><tbody>";
    h += shown.map(r => "<tr>" + r.map(v => v === null ? '<td class="null">NULL</td>' : "<td>" + esc(v) + "</td>").join("") + "</tr>").join("");
    h += "</tbody></table></div>";
    if (limit && rows.length > limit) h += '<p class="note">… and ' + (rows.length - limit) + " more rows (they are all in the setup file).</p>";
    return h;
  }
  function refHtml(label, sub, body, lang) {
    // CLOSED by default: aria-expanded=false and the body is hidden
    return '<div class="panel"><button class="ref-toggle" id="refBtn" aria-expanded="false"><span class="arrow">▶</span> ' + esc(label) +
      '<span class="sub">' + esc(sub) + '</span></button>' +
      '<div class="ref-body" id="refBody" hidden><p class="ref-warn">Try it yourself first. Compare this with your own answer.</p>' +
      '<div class="code-head"><span>' + esc(lang) + '</span><button class="copy-btn" data-copy="ref">Copy</button></div><pre id="refCode">' + esc(body) + "</pre></div></div>";
  }
  function hintsHtml(hints) {
    if (!hints || !hints.length) return "";
    return '<div class="panel"><details><summary>💡 Hints (' + hints.length + ')</summary><ul>' + hints.map(x => "<li>" + md(x) + "</li>").join("") + "</ul></details></div>";
  }
  function starter(q) {
    if (T.id === "python") return q.sig;
    if (T.id === "cpp") {
      const body = /\.\.\./.test(q.sig) ? "// Write the code described below, e.g.\n// " + q.sig.replace(/\s*\{ \.\.\. \}/, "") + "\n" : q.sig + " {\n    \n}\n";
      return "#include <bits/stdc++.h>\nusing namespace std;\n\n" + body;
    }
    return "";
  }

  /* ---------- detail view ---------- */
  function renderDetail() {
    const q = byId(view.q), c = catOf(q.cat), list = inCat(q.cat), i = list.indexOf(q);
    const prev = list[i - 1], next = list[i + 1];
    let h = '<div class="crumbs"><button class="back" data-go="cat/' + c.id + '">← ' + esc(c.name) + "</button><span>Question " + (i + 1) + " of " + list.length + "</span></div>";
    h += '<div class="title-row"><h1>' + esc(q.title) + '</h1><span class="badge ' + q.level + '">' + LVL[q.level] + "</span>" + (done[q.id] ? '<span class="badge easy">✓ solved</span>' : "") + "</div>";

    h += '<div class="panel"><h2>Problem <span class="grow"></span><button class="copy-btn" id="speakBtn">🔊 Read aloud</button></h2><div class="desc">' + md(q.desc) + "</div>";
    h += '<div class="tts-note">Read aloud uses your browser voice. Pick an "offline" voice in the top bar to use it without internet.</div></div>';

    if (T.kind === "code") h += codeBody(q);
    else if (T.kind === "dsa") h += dsaBody(q);
    else h += sqlBody(q);

    h += hintsHtml(q.hints);

    h += '<div class="panel"><div class="actions"><button class="btn ' + (done[q.id] ? "" : "success") + '" id="doneBtn">' + (done[q.id] ? "↩ Mark as not solved" : "✓ Mark as solved") + "</button></div></div>";
    h += '<div class="nav-row"><button class="btn" ' + (prev ? 'data-go="q/' + prev.id + '"' : "disabled") + ">← Previous</button><button class=\"btn primary\" " + (next ? 'data-go="q/' + next.id + '"' : "disabled") + ">Next →</button></div>";
    $("#main").innerHTML = h;
    window.scrollTo(0, 0);
  }

  function codeBody(q) {
    let h = "";
    h += '<div class="panel"><h2>Starter code <span class="grow"></span><button class="copy-btn" data-copy="starter">Copy</button></h2><pre id="starterCode">' + esc(starter(q)) + "</pre>" +
      '<div class="tts-note">Put your code in <code>' + T.file + "</code> in VS Code.</div></div>";
    h += '<div class="panel"><h2>Test cases (' + q.tests.length + ")</h2><div class=\"cases\">" + q.tests.map(t =>
      '<div class="case"><span class="lbl">Input / code</span><pre>' + esc(t[0]) + '</pre><span class="lbl">Expected</span><pre class="exp">' + esc(t[1]) + "</pre></div>").join("") + "</div></div>";
    const how = T.id === "python" ? "python test_" + q.id + ".py" : "g++ -std=c++17 test_" + q.id + ".cpp -o t && ./t";
    h += '<div class="panel"><h2>Check your solution</h2><div class="actions"><button class="btn primary" id="dlTest">⬇ Download test_' + q.id + "." + T.testExt + "</button></div>" +
      '<div class="tts-note">Save it next to <code>' + T.file + "</code> and run <code>" + esc(how) + "</code>. Every test prints PASS or FAIL.</div></div>";
    h += refHtml("Show reference answer", "closed by default", SOL[q.id] || "// Reference answer not available for this question.", T.lang);
    return h;
  }

  function dsaBody(q) {
    let h = '<div class="panel"><h2>Examples</h2>' + q.examples.map((e, n) =>
      '<div class="ex"><span class="ex-label">Example ' + (n + 1) + ' - input</span><pre>' + esc(e.input) + '</pre><span class="ex-label">Output</span><pre class="exp">' + esc(e.output) + "</pre>" +
      (e.explanation ? '<span class="note">' + md(e.explanation) + "</span>" : "") + "</div>").join("") + "</div>";
    h += '<div class="panel"><h2>Constraints</h2><ul class="plain">' + q.constraints.map(x => "<li>" + md(x) + "</li>").join("") + "</ul>" +
      '<div class="tts-note">No code checker on this page: solve it in any language you like, then compare with the examples above.</div></div>';
    const body = "APPROACH\n" + q.approach + "\n\nPSEUDOCODE\n" + q.pseudocode;
    h += refHtml("Show approach and pseudocode", "closed by default", body, "language-neutral");
    return h;
  }

  function sqlBody(q) {
    let h = '<div class="panel"><h2>Tables</h2>' + q.tables.map(t =>
      '<div class="tname">' + esc(t.name) + "<small>" + t.cols.map(c => esc(c[0]) + " " + esc(c[1])).join(", ") + "</small></div>" + tableHtml(t.cols.map(c => c[0]), t.rows, 8)).join("") + "</div>";
    h += '<div class="panel"><h2>Expected output ' + (q.expected.ordered ? "(rows in this exact order)" : "(row order does not matter)") + "</h2>" +
      tableHtml(q.expected.cols, q.expected.rows) + '<div class="note">Your query must return exactly these columns (in this order) and rows.</div></div>';
    h += '<div class="panel"><h2>Run and check</h2><div class="actions"><button class="btn" id="dlSetup">⬇ setup_' + q.id + '.sql</button><button class="btn primary" id="dlCheck">⬇ check_' + q.id + '.py</button></div>' +
      '<div class="tts-note">1) Run the setup file in any SQLite tool (DB Browser for SQLite, VS Code SQLite extension, <code>sqlite3</code>) and write your query. ' +
      "2) To auto-check: save ONE query in <code>solution.sql</code> next to <code>check_" + q.id + ".py</code> and run <code>python check_" + q.id + ".py</code>.</div></div>";
    h += refHtml("Show reference answer", "closed by default", q.solution, "SQL (SQLite)");
    return h;
  }

  /* ---------- render & events ---------- */
  function render() {
    stopSpeak();
    renderSidebar(); overall();
    if (view.type === "detail") renderDetail(); else renderList();
    document.body.classList.remove("menu-open");
  }

  document.addEventListener("click", e => {
    const t = e.target.closest("button, a"); if (!t) return;
    if (t.dataset.cat) { go("cat/" + t.dataset.cat); return; }
    if (t.dataset.level) { view.level = t.dataset.level; render(); return; }
    if (t.dataset.q) { go("q/" + t.dataset.q); return; }
    if (t.dataset.go) { go(t.dataset.go); return; }
    if (t.id === "menuBtn" || t.id === "backdrop") { document.body.classList.toggle("menu-open"); return; }
    if (t.id === "themeBtn") { setTheme(prefs.theme === "dark" ? "light" : "dark"); return; }
    if (t.id === "resetBtn") { if (confirm("Reset all " + T.name + " progress?")) { done = {}; save(KEY, done); render(); } return; }
    if (view.type !== "detail") return;
    const q = byId(view.q);
    if (t.id === "refBtn") {
      const body = $("#refBody"), open = t.getAttribute("aria-expanded") === "true";
      t.setAttribute("aria-expanded", String(!open)); body.hidden = open; return;
    }
    if (t.dataset.copy) { copy(t.dataset.copy === "ref" ? $("#refCode").textContent : $("#starterCode").textContent); return; }
    if (t.id === "speakBtn") { tts.speaking ? stopSpeak() : speak(speechText(q)); return; }
    if (t.id === "doneBtn") { done[q.id] ? delete done[q.id] : (done[q.id] = true); save(KEY, done); renderSidebar(); overall(); renderDetail(); toast(done[q.id] ? "Marked as solved 🎉" : "Marked as not solved"); return; }
    if (t.id === "dlTest") { download("test_" + q.id + "." + T.testExt, T.id === "python" ? H.pythonTest(q) : H.cppTest(q)); return; }
    if (t.id === "dlSetup") { download("setup_" + q.id + ".sql", H.sqlSetup(q)); return; }
    if (t.id === "dlCheck") { download("check_" + q.id + ".py", H.sqlCheck(q)); return; }
  });

  window.addEventListener("hashchange", () => { fromHash(); render(); });
  document.addEventListener("input", e => {
    if (e.target.id === "rate") { prefs.rate = e.target.value; save(PREF, prefs); }
  });
  document.addEventListener("change", e => {
    if (e.target.id === "voiceSelect") { prefs.voice = e.target.value; save(PREF, prefs); }
  });

  /* ---------- boot ---------- */
  document.title = "Quartra · " + T.name + " practice";
  $("#trackTitle").textContent = T.icon + " " + T.name;
  $("#rate").value = prefs.rate;
  setTheme(prefs.theme || "dark");
  initVoices();
  fromHash(); render();
})();
