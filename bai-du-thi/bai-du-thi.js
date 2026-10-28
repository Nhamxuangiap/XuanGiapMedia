"use strict";
/* =========================================================
   BÀI DỰ THI — TỰ ĐỘNG THEO GOOGLE SHEET (GIỐNG THẺ WEDDING)
   - Tự lấy link cột A của Sheet, thumbnail khi mở trang
   - Tiêu đề = tiêu đề YouTube (noembed/oembed) + " | XUÂN GIÁP MEDIA"
   - Bấm ảnh/tiêu đề = mở YouTube tab mới
   - Bạn chỉ cần dán ID/link Google Sheet vào hằng số SHEET_ID bên dưới
========================================================= */

// Thay ID Google Sheet của bạn vào đây khi có Sheet riêng
const SHEET_ID = ""; // Ví dụ: "19r3mUZXa0hfIoS8gpPqFswLuvTFDJBex7fExUP8OZn0"
const SHEET_CSV_GVIZ = SHEET_ID ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv` : "";
const SHEET_CSV_EXPORT = SHEET_ID ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv` : "";

// Danh sách video bài dự thi mẫu (sẽ tự động thay thế khi có Google Sheet)
const FALLBACK_LINKS = [
  "https://youtu.be/IUSfkf7l8l4",
  "https://youtu.be/NRkY1grW_PA",
  "https://youtu.be/xyZ-KslVIyg",
  "https://youtu.be/_utaretIzKE",
  "https://youtu.be/I15YV8AJw9U",
  "https://youtu.be/hIlQM4WLjig"
];

document.addEventListener("DOMContentLoaded", async () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const grid = $("#projectGrid");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const getYouTubeId = value => {
    if (!value) return "";
    const v = String(value).trim().replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '');
    if (/^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    try {
      const u = new URL(v);
      if (u.hostname.includes("youtu.be")) return u.pathname.split("/").filter(Boolean)[0] || "";
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || "";
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || "";
      return u.searchParams.get("v") || "";
    } catch { return ""; }
  };
  const toWatchUrl = id => `https://www.youtube.com/watch?v=${id}`;
  const thumb = id => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const esc = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  // --- 1. Lấy links từ Google Sheet ---
  async function fetchSheetLinks() {
    if (!SHEET_CSV_GVIZ) return [];
    const tryFetch = async (url) => {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error("http " + r.status);
      return await r.text();
    };
    let csv = "";
    try { csv = await tryFetch(SHEET_CSV_GVIZ); }
    catch (e1) {
      try { csv = await tryFetch(SHEET_CSV_EXPORT); }
      catch (e2) { throw e2; }
    }
    const lines = csv.split(/\r?\n/);
    const links = [];
    for (let raw of lines) {
      raw = raw.trim();
      if (!raw) continue;
      const m = raw.match(/https?:\/\/[^"\s,]+/);
      if (m) {
        const url = m[0].replace(/"+$/, '');
        if (getYouTubeId(url)) links.push(url);
      }
    }
    const seen = new Set();
    const out = [];
    for (const u of links) {
      const id = getYouTubeId(u);
      if (!seen.has(id)) {
        seen.add(id);
        out.push(toWatchUrl(id));
      }
    }
    return out;
  }

  let youtubeUrls = [];
  try {
    const sheetLinks = await fetchSheetLinks();
    if (sheetLinks.length) youtubeUrls = sheetLinks;
    else throw new Error("empty sheet");
  } catch (e) {
    youtubeUrls = FALLBACK_LINKS.map(u => toWatchUrl(getYouTubeId(u)));
  }

  // Khởi tạo danh sách dự án
  const skel = youtubeUrls.map((url, i) => {
    const id = getYouTubeId(url);
    return { index: i + 1, id, url, title: null };
  });

  // Render danh sách dự án
  function render(list) {
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title || 'Bài dự thi ' + p.index)}">
          ${p.id ? `<img src="${thumb(p.id)}" alt="${esc(p.title || 'Bài dự thi')}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`}
          <span class="project-no">${String(p.index).padStart(2, "0")}</span>
          <span class="project-play">PLAY ↗</span>
        </a>
        <div class="project-info">
          <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title || "Đang tải tiêu đề...")}</a></h3>
        </div>
      </article>
    `).join("");
  }
  render(skel);

  // --- 2. Lấy tiêu đề YouTube qua noembed (CORS open), fallback oembed ---
  async function fetchTitle(id, watchUrl) {
    try {
      const r = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(watchUrl)}`, { cache: "force-cache" });
      if (r.ok) {
        const j = await r.json();
        if (j.title) return j.title;
      }
    } catch {}
    try {
      const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`, { cache: "force-cache" });
      if (r.ok) {
        const j = await r.json();
        if (j.title) return j.title;
      }
    } catch {}
    return null;
  }

  const suffix = " | XUÂN GIÁP MEDIA";
  function finalTitle(raw) {
    raw = (raw || "").trim();
    if (!raw) return "Bài Dự Thi" + suffix;
    if (raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  // Tải tiêu đề song song và cập nhật DOM
  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(skel.map(async (p, idx) => {
    const raw = await fetchTitle(p.id, p.url);
    const title = finalTitle(raw || `Bài Dự Thi ${p.index}`);
    p.title = title;
    const h = cards[idx]?.querySelector(".project-info h3 a");
    if (h) h.textContent = title;
    const aPreview = cards[idx]?.querySelector(".project-preview");
    if (aPreview) aPreview.setAttribute("aria-label", "Xem " + title);
    const img = cards[idx]?.querySelector("img");
    if (img) img.alt = title;
  }));

  // Menu mobile & năm bản quyền
  const closeMenu = () => {
    menu?.classList.remove("open");
    menuBtn?.classList.remove("open");
    document.body.classList.remove("menu-open");
  };
  menuBtn && (menuBtn.onclick = () => {
    const open = menu.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });
  $$("a", menu || document).forEach(a => a.onclick = closeMenu);
  addEventListener("resize", () => innerWidth > 800 && closeMenu());

  const y = $("#currentYear");
  if (y) y.textContent = new Date().getFullYear();
});
