/* ============================================================
   OUTSCAPE — Shared interactions
   • Course DETAIL dialog (modal)
   • Course COMPARISON (pick 2 → side-by-side with comparison lines)
   Single source of truth for all course rich-detail content.
   Real content: usu (confirmed). Draft content marked draft:true.
   ============================================================ */
(function () {
  "use strict";

  // ---- ICONS (inline) ----------------------------------------------------
  var IC = {
    pin: '<svg class="line" viewBox="0 0 24 24"><path d="M12 21s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>',
    ext: '<svg class="line" viewBox="0 0 24 24" width="13" height="13" style="stroke-width:2"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    wc:  '<svg class="line" viewBox="0 0 24 24"><path d="M6 4v16M6 4c4 0 4 4 0 4M14 4v16M18 9a4 4 0 0 1-4 4"/></svg>',
    check: '<svg class="line" viewBox="0 0 24 24"><path d="m5 13 4 4 10-10"/></svg>',
    dash: '<svg class="line" viewBox="0 0 24 24"><path d="M6 12h12"/></svg>'
  };

  // ---- COURSE DATA -------------------------------------------------------
  var COURSES = {
    shinsen: {
      name: "Shinsen-numa &amp; Naga-numa", jp: "神仙沼・長沼",
      photo: "assets/course_shinsen.jpg",
      level: "Easy", levelClass: "easy",
      difficulty: "Easy", duration: "~2.5 hrs", access: "Boardwalk", elevation: "+80 m",
      toilet: true, best: "Alpine marsh &amp; mirror ponds",
      draft: true,
      tag: "天空の湿原をゆく — across the sky marsh",
      desc: "A gentle boardwalk threads one of Niseko's highest marshes, past mirror ponds and alpine flowers with the ranges all around. <span class=\"tbc\">DRAFT</span> — copy &amp; plan pending your confirmation.",
      plan: [
        ["9:00", "Meet at Shinsen-numa Rest House"],
        ["9:20", "Onto the marsh boardwalk"],
        ["10:45", "Pond viewpoint &amp; break"],
        ["12:00", "Return"],
        ["12:30", "Finish &amp; dismiss"]
      ],
      meet: "Shinsen-numa Rest House", meetJp: "神仙沼レストハウス",
      map: "", draftMap: true
    },
    hangetsu: {
      name: "Hangetsu-ko (Half Moon Lake)", jp: "半月湖",
      photo: "assets/course_hangetsu.jpg",
      level: "Easy", levelClass: "easy",
      difficulty: "Easy", duration: "~2 hrs", access: "Forest trail", elevation: "+150 m",
      toilet: null, best: "Crater lake &amp; forest",
      draft: true,
      tag: "森と湖をめぐる — round the crater lake",
      desc: "A shaded forest loop around the caldera of Mt. Yotei's little sister, opening onto a still green lake. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    usu: {
      name: "Showa-Shinzan &amp; Mt. Usu", jp: "昭和新山・有珠山",
      photo: "assets/course_usu.jpg",
      level: "Easy · ropeway access", levelClass: "easy",
      difficulty: "Easy", duration: "~3 hrs", access: "Ropeway", elevation: "+150–250 m",
      toilet: true, best: "Active volcano &amp; Lake Toya",
      draft: false,
      tag: "地球の鼓動を仰ぐ道 — gazing up at the earth's pulse",
      desc: "A modern gondola carries you on an aerial walk to the summit. From the observation deck, feel the living energy of an active volcano up close — with sweeping views over Lake Toya.",
      plan: [
        ["9:00", "Meet at the base station"],
        ["9:15", "Board the ropeway"],
        ["9:30", "Stroll the crater-rim trail (外輪山遊歩道)"],
        ["11:45", "Rest at the observation deck"],
        ["12:30", "Finish &amp; dismiss"]
      ],
      meet: "Usuzan Ropeway — Sanroku (base) Station", meetJp: "有珠山ロープウェイ 山麓駅",
      map: "https://maps.app.goo.gl/UhzCs2VUz4qL5h3N6", draftMap: false
    },
    asahi: {
      name: "Asahigaoka", jp: "旭ヶ丘",
      photo: "assets/course_asahi.jpg",
      level: "Easy", levelClass: "easy",
      difficulty: "Easy", duration: "~2 hrs", access: "Forest path", elevation: "+50 m",
      toilet: null, best: "Quiet forest &amp; light",
      draft: true,
      tag: "光の森を歩く — through the forest of light",
      desc: "A short, soft forest walk — dappled light, birdsong, and an easy pace. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    oyachi: {
      name: "Oyachi", jp: "大谷地",
      photo: "assets/course_oyachi.jpg",
      level: "Easy", levelClass: "easy",
      difficulty: "Easy", duration: "~2 hrs", access: "Lakeside", elevation: "+30 m",
      toilet: null, best: "Wetland &amp; lakeshore",
      draft: true,
      tag: "水辺の静けさ — the quiet of the water",
      desc: "Flat wetland paths along a calm lakeshore — the gentlest of all the courses. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },

    /* ---- Hiking — Half Day courses (DRAFT) ---- */
    kagami: {
      name: "Kagami-numa", jp: "鏡沼",
      photo: "assets/course_kagami.jpg",
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~2 hrs", access: "Mountain trail", elevation: "+100–230 m",
      toilet: null, best: "Mirror pond &amp; ridgeline",
      draft: true,
      tag: "鏡のような沼へ — to the mirror pond",
      desc: "A steady climb to a still alpine pond that mirrors the sky. <span class=\"tbc\">DRAFT</span> — copy, plan &amp; figures pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    shirakaba: {
      name: "Shirakaba-yama", jp: "白樺山",
      photo: "assets/course_shirakaba.jpg",
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~2.5 hrs", access: "Ridge trail", elevation: "+225 m",
      toilet: null, best: "Open ridge panorama",
      draft: true,
      tag: "稜線をゆく — along the open ridge",
      desc: "Open ridgeline walking with wide views across the Niseko range. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    annupuri_g: {
      name: "Annupuri Gondola", jp: "アンヌプリ ゴンドラ",
      photo: "assets/course_annupuri.jpg",
      level: "Moderate · gondola", levelClass: "mod",
      difficulty: "Moderate", duration: "~2.5–3 hrs", access: "Gondola", elevation: "+300 m",
      toilet: true, best: "Summit views, less climb",
      draft: true,
      tag: "ゴンドラで稜線へ — gondola to the ridge",
      desc: "Ride the summer gondola most of the way, then walk the ridge to the views. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    }
  };

  // ---- HELPERS -----------------------------------------------------------
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  function planHTML(c) {
    if (!c.plan || !c.plan.length) return "";
    var rows = c.plan.map(function (p) {
      return '<li><span class="t">' + p[0] + '</span><span class="d">' + p[1] + '</span></li>';
    }).join("");
    return '<ul class="cplan">' + rows + '</ul>';
  }

  function meetHTML(c) {
    if (!c.meet) return "";
    var mapLine = c.map
      ? '<a href="' + c.map + '" target="_blank" rel="noopener">View on map ' + IC.ext + '</a>'
      : (c.draftMap ? '<a class="muted-link">Map link <span class="tbc">TBC</span></a>' : "");
    var fac = c.toilet === true
      ? '<div class="fac">' + IC.wc + ' Toilets available</div>'
      : (c.toilet === null ? '<div class="fac">' + IC.wc + ' Toilets <span class="tbc">TBC</span></div>' : "");
    return '<div class="cmeet"><div class="k">Meeting &amp; dismissal</div>' +
      '<div class="place">' + c.meet + ' <span class="jp">' + (c.meetJp || "") + '</span></div>' +
      mapLine + fac + '</div>';
  }

  function detailHTML(c) {
    var ribbon = c.draft ? '<span class="draft-ribbon">Draft content</span>' : "";
    return '' +
      '<div class="os-hd"><img src="' + c.photo + '" alt="">' + ribbon +
        '<button class="os-close" aria-label="Close">&times;</button></div>' +
      '<div class="os-body">' +
        '<h3 class="os-title">' + c.name + ' <span class="jp">' + c.jp + '</span></h3>' +
        '<span class="lvl ' + c.levelClass + '">' + c.level + '</span>' +
        '<p class="ctag">' + c.tag + '</p>' +
        '<p class="cdesc">' + c.desc + '</p>' +
        planHTML(c) +
        meetHTML(c) +
      '</div>';
  }

  // ---- COMPARISON --------------------------------------------------------
  var CMP_ROWS = [
    ["Difficulty", function (c) { return '<span class="lvl ' + c.levelClass + '">' + c.difficulty + '</span>'; }],
    ["Duration",   function (c) { return c.duration; }],
    ["Access",     function (c) { return c.access; }],
    ["Elevation",  function (c) { return c.elevation; }],
    ["Toilets",    function (c) { return c.toilet === true ? IC.check + ' Yes' : '<span class="tbc">TBC</span>'; }],
    ["Best for",   function (c) { return c.best; }]
  ];

  function compareHTML(ids) {
    var cs = ids.map(function (id) { return COURSES[id]; });
    var heads = cs.map(function (c) {
      return '<div class="cmp-col-head"><div class="cmp-photo"><img src="' + c.photo + '" alt=""></div>' +
        '<div class="cmp-name">' + c.name + '<span class="jp">' + c.jp + '</span></div></div>';
    }).join("");
    var rows = CMP_ROWS.map(function (r) {
      var cells = cs.map(function (c) { return '<div class="cmp-cell">' + r[1](c) + '</div>'; }).join("");
      return '<div class="cmp-row"><div class="cmp-lab">' + r[0] + '</div>' + cells + '</div>';
    }).join("");
    var feet = cs.map(function (c, i) {
      return '<div class="cmp-cell"><button class="cbtn cbtn-primary" data-detail="' + ids[i] + '">Full details</button></div>';
    }).join("");
    var cols = "1.1fr 1fr 1fr";
    return '<div class="os-body os-cmp" style="--cmp-cols:' + cols + '">' +
        '<button class="os-close" aria-label="Close">&times;</button>' +
        '<div class="sec-head" style="margin-bottom:20px"><h3>Compare</h3><span class="script">side by side</span></div>' +
        '<div class="cmp"><div class="cmp-row cmp-heads"><div class="cmp-lab"></div>' + heads + '</div>' +
          rows +
          '<div class="cmp-row cmp-feet"><div class="cmp-lab"></div>' + feet + '</div>' +
        '</div></div>';
  }

  // ---- MODAL -------------------------------------------------------------
  var overlay;
  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = el('<div class="os-modal" role="dialog" aria-modal="true"><div class="os-sheet"></div></div>');
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.classList.contains("os-close")) closeModal();
      var d = e.target.closest && e.target.closest("[data-detail]");
      if (d) { openDetail(d.getAttribute("data-detail")); }
    });
    return overlay;
  }
  function openSheet(html, wide) {
    ensureOverlay();
    var sheet = overlay.querySelector(".os-sheet");
    sheet.className = "os-sheet" + (wide ? " wide" : "");
    sheet.innerHTML = html;
    sheet.scrollTop = 0;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  function openDetail(id) {
    var c = COURSES[id]; if (!c) return;
    openSheet(detailHTML(c), false);
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  // ---- COMPARE SELECTION + TRAY -----------------------------------------
  var selected = [];
  var bar;
  function ensureBar() {
    if (bar) return bar;
    bar = el('<div id="os-comparebar"><div class="cb-inner">' +
      '<div class="cb-label">Compare courses</div>' +
      '<div class="cb-chips"></div>' +
      '<div class="cb-actions"><button class="cb-clear">Clear</button>' +
      '<button class="cb-go cbtn cbtn-primary" disabled>Compare</button></div>' +
      '</div></div>');
    document.body.appendChild(bar);
    bar.querySelector(".cb-clear").addEventListener("click", clearCompare);
    bar.querySelector(".cb-go").addEventListener("click", function () {
      if (selected.length === 2) openSheet(compareHTML(selected), true);
    });
    return bar;
  }
  function renderBar() {
    ensureBar();
    var chips = bar.querySelector(".cb-chips");
    chips.innerHTML = selected.map(function (id) {
      return '<span class="cb-chip">' + COURSES[id].name + ' <button data-remove="' + id + '">&times;</button></span>';
    }).join("") + (selected.length < 2 ? '<span class="cb-hint">pick ' + (2 - selected.length) + ' more</span>' : "");
    chips.querySelectorAll("[data-remove]").forEach(function (b) {
      b.addEventListener("click", function () { toggleCompare(b.getAttribute("data-remove")); });
    });
    bar.querySelector(".cb-go").disabled = selected.length !== 2;
    bar.classList.toggle("show", selected.length > 0);
  }
  function syncButtons() {
    document.querySelectorAll("[data-compare]").forEach(function (b) {
      var on = selected.indexOf(b.getAttribute("data-compare")) > -1;
      b.classList.toggle("active", on);
      b.querySelector(".cmpmark") && (b.querySelector(".cmpmark").textContent = on ? "✓" : "+");
    });
  }
  function toggleCompare(id) {
    var i = selected.indexOf(id);
    if (i > -1) selected.splice(i, 1);
    else { if (selected.length >= 2) selected.shift(); selected.push(id); }
    renderBar(); syncButtons();
  }
  function clearCompare() { selected = []; renderBar(); syncButtons(); }

  // ---- WIRE UP -----------------------------------------------------------
  document.addEventListener("click", function (e) {
    var d = e.target.closest("[data-detail]");
    if (d && !e.target.closest(".os-modal")) { e.preventDefault(); openDetail(d.getAttribute("data-detail")); return; }
    var c = e.target.closest("[data-compare]");
    if (c) { e.preventDefault(); toggleCompare(c.getAttribute("data-compare")); }
  });

  window.OUTSCAPE = {
    courses: COURSES,
    openDetail: openDetail,
    openCompare: function (ids) { if (ids && ids.length === 2) openSheet(compareHTML(ids), true); }
  };
})();

/* ---- hero crossfade (kiri dissolve, randomised order) ---- */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var HOLD = 5000; // ms each frame holds before dissolving
  document.querySelectorAll("[data-hero-fade]").forEach(function (h) {
    var slides = Array.prototype.slice.call(h.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;
    // start from whichever slide is active in markup, then shuffle the rest
    var start = 0;
    slides.forEach(function (s, i) { if (s.classList.contains("is-active")) start = i; });
    var rest = [];
    slides.forEach(function (_, i) { if (i !== start) rest.push(i); });
    for (var k = rest.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1));
      var t = rest[k]; rest[k] = rest[j]; rest[j] = t;
    }
    var seq = [start].concat(rest);
    var pos = 0;
    setInterval(function () {
      slides[seq[pos]].classList.remove("is-active");
      pos = (pos + 1) % seq.length;
      slides[seq[pos]].classList.add("is-active");
    }, HOLD);
  });
})();
