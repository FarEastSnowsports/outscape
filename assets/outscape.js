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
      photos: ["assets/courses/shinsen_1.jpg","assets/courses/shinsen_2.jpg","assets/courses/shinsen_3.jpg","assets/courses/shinsen_4.jpg"],
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
      photos: ["assets/courses/hangetsu_1.jpg","assets/courses/hangetsu_2.jpg","assets/courses/hangetsu_3.jpg","assets/courses/hangetsu_4.jpg","assets/courses/hangetsu_5.jpg"],
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
      photos: ["assets/courses/usu_1.jpg","assets/courses/usu_2.jpg","assets/courses/usu_3.jpg","assets/courses/usu_4.jpg"],
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
      photos: ["assets/courses/asahi_1.jpg","assets/courses/asahi_2.jpg","assets/courses/asahi_3.jpg","assets/courses/asahi_4.jpg"],
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
      photos: ["assets/courses/oyachi_1.jpg","assets/courses/oyachi_2.jpg","assets/courses/oyachi_3.jpg"],
      level: "Easy", levelClass: "easy",
      difficulty: "Easy", duration: "~2 hrs", access: "Lakeside", elevation: "+30 m",
      toilet: null, best: "Wetland &amp; lakeshore",
      draft: true,
      tag: "水辺の静けさ — the quiet of the water",
      desc: "Flat wetland paths along a calm lakeshore — the gentlest of all the courses. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },

    /* ---- Premium Hike — Half Day courses (DRAFT) ---- */
    kagami: {
      name: "Kagami-numa", jp: "鏡沼",
      photos: ["assets/courses/kagami_1.jpg","assets/courses/kagami_2.jpg","assets/courses/kagami_3.jpg","assets/courses/kagami_4.jpg"],
      photo: "assets/courses/kagami_2.jpg",
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
      photos: ["assets/courses/shirakaba_1.jpg","assets/courses/shirakaba_2.jpg","assets/courses/shirakaba_3.jpg","assets/courses/shirakaba_4.jpg","assets/courses/shirakaba_5.jpg"],
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
      photos: ["assets/courses/annupuri_g_1.jpg","assets/courses/annupuri_g_2.jpg","assets/courses/annupuri_g_3.jpg","assets/courses/annupuri_g_4.jpg","assets/courses/annupuri_g_5.jpg"],
      photo: "assets/course_annupuri.jpg",
      level: "Moderate · gondola", levelClass: "mod",
      difficulty: "Moderate", duration: "~2.5–3 hrs", access: "Gondola", elevation: "+300 m",
      toilet: true, best: "Summit views, less climb",
      draft: true,
      tag: "ゴンドラで稜線へ — gondola to the ridge",
      desc: "Ride the summer gondola most of the way, then walk the ridge to the views. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    }
    ,
    /* ---- Nature Stroll — Full Day courses (DRAFT) ---- */
    iwao: {
      name: "Iwao-nupuri", jp: "岩雄登",
      photo: "assets/course_iwao.jpg",
      photos: ["assets/courses/iwao_1.jpg","assets/courses/iwao_2.jpg","assets/courses/iwao_3.jpg","assets/courses/iwao_4.jpg"],
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~4 hrs", access: "Volcanic trail", elevation: "+400–440 m",
      toilet: null, best: "Volcanic crater &amp; wide views",
      draft: true,
      tag: "火の山の記憶 — memory of the fire mountain",
      desc: "A steady climb onto a bare volcanic dome, with steam vents and long views across the range. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    iwao_mine: {
      name: "Iwao-nupuri Mine Trail", jp: "岩雄登 鉱山跡コース",
      photo: "assets/course_iwao_mine.jpg",
      photos: ["assets/courses/iwao_1.jpg","assets/courses/iwao_4.jpg","assets/courses/iwao_3.jpg"],
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~4 hrs", access: "Forest &amp; mine trail", elevation: "+250 m",
      toilet: null, best: "Sulphur-mine history &amp; ponds",
      draft: true,
      tag: "黄金の記憶 — golden memory",
      desc: "A longer but gentler line past the old sulphur workings and their green-blue ponds. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },

    /* ---- Premium Hike — Full Day routes (DRAFT) ---- */
    yotei: {
      name: "Mt. Yotei", jp: "羊蹄山",
      photo: "assets/course_yotei.jpg",
      photos: ["assets/courses/yotei_1.jpg","assets/courses/yotei_2.jpg","assets/courses/yotei_3.jpg","assets/courses/yotei_4.jpg","assets/courses/yotei_5.jpg"],
      level: "Challenging", levelClass: "chall",
      difficulty: "Challenging", duration: "~8–9 hrs", access: "Summit trail", elevation: "+1,500–1,600 m",
      toilet: null, best: "The crater rim above the clouds",
      draft: true,
      tag: "蝦夷富士へ — up Ezo-Fuji",
      desc: "The big one: a long, steady ascent of Niseko's landmark volcano to walk its crater rim. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    chise: {
      name: "Chise-nupuri", jp: "チセヌプリ",
      photo: "assets/course_chise.jpg",
      photos: ["assets/courses/chise_1.jpg","assets/courses/chise_2.jpg"],
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~2–4.5 hrs", access: "Mountain trail", elevation: "+300–500 m",
      toilet: null, best: "Quiet inner-range summit",
      draft: true,
      tag: "静かな山へ — into the quiet range",
      desc: "A quieter summit in the heart of the range, often with the lake mirroring the peak below. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    panke: {
      name: "Panke-mekunnai Wetlands", jp: "パンケメクンナイ湿原",
      photo: "assets/course_panke.jpg",
      photos: ["assets/courses/panke_1.jpg","assets/courses/panke_2.jpg","assets/courses/panke_3.jpg","assets/courses/panke_4.jpg"],
      level: "Moderate", levelClass: "mod",
      difficulty: "Moderate", duration: "~4.5 hrs", access: "Wetland &amp; ridge", elevation: "+350 m",
      toilet: null, best: "Remote highland wetland",
      draft: true,
      tag: "秘密の湿原へ — to the hidden marsh",
      desc: "A long, rolling walk out to a remote highland wetland few people ever see. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    mekunnai: {
      name: "Range Traverse ④ Mae-Mekunnai → Mekunnai → Iwanai", jp: "前目国内→目国内→岩内",
      photo: "assets/course_mekunnai.jpg",
      photos: ["assets/courses/mekunnai_1.jpg","assets/courses/mekunnai_2.jpg","assets/courses/mekunnai_3.jpg","assets/courses/mekunnai_4.jpg"],
      level: "Challenging", levelClass: "chall",
      difficulty: "Challenging", duration: "~5–7 hrs", access: "Range traverse", elevation: "+761 m",
      toilet: null, best: "Rolling green summits, one after another",
      draft: true,
      tag: "稜線をつなぐ — linking the summits",
      desc: "A full traverse over rolling green summits with the sea on one side and the range on the other. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
      plan: [], meet: "", meetJp: "", map: "", draftMap: true
    },
    iwanai: {
      name: "Range Traverse ⑤ Iwanai → Raiden", jp: "岩内→雷電",
      photo: "assets/course_iwanai.jpg",
      photos: ["assets/courses/iwanai_1.jpg","assets/courses/iwanai_2.jpg","assets/courses/iwanai_3.jpg","assets/courses/iwanai_4.jpg"],
      level: "Challenging", levelClass: "chall",
      difficulty: "Challenging", duration: "~5–6 hrs", access: "Range traverse", elevation: "+650–750 m",
      toilet: null, best: "Ridgeline above the sea",
      draft: true,
      tag: "海へ落ちる稜線 — the ridge that falls to the sea",
      desc: "The far end of the range, where the ridgeline runs out above the Sea of Japan. <span class=\"tbc\">DRAFT</span> — content pending confirmation.",
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

  // ---- PHOTO GALLERY (lead with images) ---------------------------------
  function galleryHTML(c) {
    var photos = (c.photos && c.photos.length) ? c.photos : [c.photo];
    var ribbon = c.draft ? '<span class="draft-ribbon">Draft content</span>' : "";
    var thumbs = photos.length > 1 ? '<div class="os-gal-thumbs">' + photos.map(function (p, i) {
      return '<button class="os-thumb' + (i === 0 ? ' active' : '') + '" data-thumb="' + p + '" aria-label="Photo ' + (i + 1) + '"><img src="' + p + '" alt="" loading="lazy"></button>';
    }).join("") + '</div>' : "";
    var meta = '<div class="os-meta"><span class="lvl ' + c.levelClass + '">' + c.level + '</span>' +
      '<span class="os-m">' + c.duration + '</span>' +
      '<span class="os-m">' + c.elevation + '</span>' +
      '<span class="os-m">' + c.access + '</span></div>';
    return '' +
      '<button class="os-close" aria-label="Close">&times;</button>' +
      '<div class="os-gal">' +
        '<div class="os-gal-hero"><img class="os-gal-img" src="' + photos[0] + '" alt="' + c.name + '">' + ribbon + '</div>' +
        thumbs +
      '</div>' +
      '<div class="os-body">' +
        '<h3 class="os-title">' + c.name + ' <span class="jp">' + c.jp + '</span></h3>' +
        meta +
        '<p class="ctag">' + c.tag + '</p>' +
        '<p class="cdesc">' + c.desc + '</p>' +
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
      if (e.target === overlay || e.target.classList.contains("os-close")) { closeModal(); return; }
      var th = e.target.closest && e.target.closest("[data-thumb]");
      if (th) {
        var img = overlay.querySelector(".os-gal-img");
        if (img) img.src = th.getAttribute("data-thumb");
        overlay.querySelectorAll(".os-thumb").forEach(function (b) { b.classList.toggle("active", b === th); });
        return;
      }
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
    var hasPhotos = (c.photos && c.photos.length) || c.photo;
    openSheet(hasPhotos ? galleryHTML(c) : detailHTML(c), false);
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
    var cmp = e.target.closest("[data-compare]");
    if (cmp) { e.preventDefault(); toggleCompare(cmp.getAttribute("data-compare")); return; }
    // whole course card opens its photo gallery (id taken from the hidden detail button)
    var card = e.target.closest(".course");
    if (card && !e.target.closest(".os-modal")) {
      var id = card.getAttribute("data-detail") || (card.querySelector("[data-detail]") || {getAttribute:function(){return null;}}).getAttribute("data-detail");
      if (id) { e.preventDefault(); openDetail(id); }
    }
  });

  // mark course cards that have a gallery so they look/act clickable
  function markCards() {
    document.querySelectorAll(".course").forEach(function (card) {
      var id = card.getAttribute("data-detail") || (card.querySelector("[data-detail]") || {getAttribute:function(){return null;}}).getAttribute("data-detail");
      if (!id) return;
      var c = COURSES[id];
      if (c && ((c.photos && c.photos.length) || c.photo)) {
        card.setAttribute("data-hasphotos", "");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
      }
    });
  }
  if (document.readyState !== "loading") markCards();
  else document.addEventListener("DOMContentLoaded", markCards);
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("course")) {
      var el = document.activeElement;
      var id = el.getAttribute("data-detail") || (el.querySelector("[data-detail]") || {getAttribute:function(){return null;}}).getAttribute("data-detail");
      if (id) { e.preventDefault(); openDetail(id); }
    }
  });


  // ---- CARD ↔ SPECTRUM DOT LINKING -------------------------------------
  // Hovering an Example Course lifts its dot on the effort spectrum (and back),
  // so the number badge and the dot read as the same thing.
  function linkSpectrum() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".course"));
    var dots  = Array.prototype.slice.call(document.querySelectorAll(".cspec-dot"));
    if (!dots.length) return;
    function dotFor(card) {
      var badge = card.querySelector(".course-num");
      if (!badge) return null;
      var n = badge.textContent.trim();
      for (var i = 0; i < dots.length; i++) {
        if (dots[i].textContent.trim() === n) return dots[i];
      }
      return null;
    }
    cards.forEach(function (card) {
      var dot = dotFor(card);
      if (!dot) return;
      function on()  { dot.classList.add("is-linked"); card.classList.add("is-linked"); }
      function off() { dot.classList.remove("is-linked"); card.classList.remove("is-linked"); }
      card.addEventListener("mouseenter", on);
      card.addEventListener("mouseleave", off);
      card.addEventListener("focus", on, true);
      card.addEventListener("blur", off, true);
      // and the reverse: hovering a dot lifts its card
      dot.addEventListener("mouseenter", on);
      dot.addEventListener("mouseleave", off);
    });
  }
  if (document.readyState !== "loading") linkSpectrum();
  else document.addEventListener("DOMContentLoaded", linkSpectrum);

  window.OUTSCAPE = {
    courses: COURSES,
    openDetail: openDetail,
    openCompare: function (ids) { if (ids && ids.length === 2) openSheet(compareHTML(ids), true); }
  };
})();

/* ============================================================
   RoomBoss booking embed
   ------------------------------------------------------------
   The engine is never served from outscape.fareastsnowsports.com
   — Vercel already owns that hostname for this site. RoomBoss
   issued us a subdomain of their own instead (2026-07-24); the
   host itself identifies the company, so no uid is needed, and
   it lets OUTSCAPE carry custom CSS separately from the winter
   FES configuration.

   The engine opens in a new tab, NOT in a frame. RoomBoss serves
   it with X-Frame-Options: SAMEORIGIN, so any attempt to embed it
   from this origin renders "refused to connect" — inline or in a
   modal alike. Do not reintroduce an iframe here unless RoomBoss
   confirms they have allowed this domain as a frame ancestor.

   Blanking RB_HOST (and RB_UID) puts every tour page back to the
   "Booking opens soon" panel — the safe way to pull booking if
   something breaks.
   ============================================================ */
(function () {
  "use strict";

  var RB_HOST = "https://outscape.bookfast.jp";

  // Fallback route: the Company ID, used against RoomBoss's shared host
  // below. Only needed if we ever stop using a dedicated subdomain —
  // without it that host answers "Company not found."
  var RB_UID  = "";

  var RB_SHARED_HOST = "https://cw4.roomboss.com";
  var RB_PATH        = "/public/booking/order02.jsf";
  var RB_VID         = "8a80818a9dff380d019e010ada53774b";  // OUTSCAPE by FAR EAST vendor

  // Product IDs — copied from Product Setup, never retyped: stroll-hd's ID
  // differs from the vendor ID by its last character only.
  var RB_PRODUCTS = {
    "stroll-hd": "8a80818a9dff380d019e010ada53774c",
    "stroll-fd": "402810829f60eee3019f6109fe760598",
    "hiking-hd": "402810829f60eee3019f611554ad074f",
    "hiking-fd": "402810829f60eee3019f611b7712080e"
  };

  var slot = document.getElementById("roomboss-embed");
  if (!slot || (!RB_HOST && !RB_UID)) return;

  var pid = RB_PRODUCTS[slot.getAttribute("data-rb-product")];
  if (!pid) return;

  var url = (RB_HOST || RB_SHARED_HOST).replace(/\/+$/, "") + RB_PATH +
    "?vid="    + encodeURIComponent(RB_VID) +
    "&slvid="  + encodeURIComponent(RB_VID) +
    "&slpid="  + encodeURIComponent(pid) +
    "&i18n="   + (document.documentElement.lang === "ja" ? "ja" : "en") +
    (RB_UID ? "&uid=" + encodeURIComponent(RB_UID) : "");

  var ja = document.documentElement.lang === "ja";

  slot.classList.add("is-live");
  slot.innerHTML =
    '<a class="rb-cta" href="' + url + '" target="_blank" rel="noopener">' +
      (ja ? "空き状況を確認する" : "Check availability") +
      '<span class="rb-cta-arrow" aria-hidden="true">↗</span>' +
    '</a>' +
    '<p class="rb-cta-note">' +
      (ja ? "予約フォームは新しいタブで開きます。"
          : "The booking form opens in a new tab.") +
    '</p>';
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
