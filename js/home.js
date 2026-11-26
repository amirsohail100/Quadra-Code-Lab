/* js/home.js - landing page: track cards, totals, progress export/import. */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const TRACKS = window.QUADRA_TRACKS, DATA = window.QUADRA_DATA;
  const PREF = "quadracodelab:prefs";
  const load = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) || f; } catch (e) { return f; } };
  const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800); };

  function render() {
    let total = 0, solved = 0, cats = 0;
    $("#homeNav").innerHTML = '<a class="active" href="index.html">Home</a>' + TRACKS.map(t => '<a href="' + t.page + '">' + t.name + "</a>").join("");
    $("#tracks").innerHTML = TRACKS.map(t => {
      const qs = DATA[t.id].questions, done = load("quadracodelab:" + t.id + ":done", {});
      const d = qs.filter(q => done[q.id]).length;
      total += qs.length; solved += d; cats += DATA[t.id].categories.length;
      return '<a class="track" href="' + t.page + '"><span class="t-icon">' + t.icon + "</span><h2>" + t.name + "</h2><p>" + t.blurb + "</p>" +
        '<div class="t-meta"><span>' + DATA[t.id].categories.length + " categories · " + qs.length + " questions</span><span>" + d + " solved</span></div>" +
        '<div class="mini"><i style="width:' + (qs.length ? d / qs.length * 100 : 0) + '%"></i></div></a>';
    }).join("");
    $("#stats").innerHTML = [[TRACKS.length, "tracks"], [cats, "categories"], [total, "questions"], [solved, "solved so far"]]
      .map(s => '<div class="stat"><b>' + s[0] + "</b><span>" + s[1] + "</span></div>").join("");
  }
  const setTheme = t => { document.documentElement.dataset.theme = t; $("#themeBtn").textContent = t === "dark" ? "🌙" : "☀️"; };
  let prefs = load(PREF, { theme: "dark" });
  setTheme(prefs.theme || "dark");
  $("#themeBtn").onclick = () => { prefs.theme = prefs.theme === "dark" ? "light" : "dark"; try { localStorage.setItem(PREF, JSON.stringify(prefs)); } catch (e) {} setTheme(prefs.theme); };

  $("#exportBtn").onclick = () => {
    const out = {}; TRACKS.forEach(t => out[t.id] = load("quadracodelab:" + t.id + ":done", {}));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 2)], { type: "application/json" }));
    a.download = "quadra-code-lab-progress.json"; document.body.appendChild(a); a.click(); a.remove();
  };
  $("#importFile").onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        TRACKS.forEach(t => { if (obj[t.id]) localStorage.setItem("quadracodelab:" + t.id + ":done", JSON.stringify(obj[t.id])); });
        render(); toast("Progress imported");
      } catch (err) { toast("Invalid file"); }
    };
    r.readAsText(f);
  };
  $("#resetAll").onclick = () => {
    if (!confirm("Reset progress in ALL tracks?")) return;
    TRACKS.forEach(t => { try { localStorage.removeItem("quadracodelab:" + t.id + ":done"); } catch (e) {} });
    render();
  };
  render();
})();
