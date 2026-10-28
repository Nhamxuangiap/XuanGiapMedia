"use strict";
/* =========================================================
   BÀI DỰ THI — TỰ ĐỘNG THEO GOOGLE SHEET (GIỐNG THẺ WEDDING)
   Sheet: https://docs.google.com/spreadsheets/d/1GEOF8EVlnxQrzoLPa272Ed-OcjCL_aSYggetd3FT6uI/edit?usp=sharing
   - Cột A: Tiêu đề bài dự thi
   - Cột B: Link video YouTube
   - Tự động lấy dữ liệu từ Google Sheet, tải ảnh thumbnail & tiêu đề chuẩn
   - Tự động cập nhật khi bạn thêm / sửa / xóa link trong Google Sheet
========================================================= */

const SHEET_ID = "1GEOF8EVlnxQrzoLPa272Ed-OcjCL_aSYggetd3FT6uI";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Dữ liệu dự phòng từ Google Sheet (khi offline hoặc mạng chậm)
const FALLBACK_CONTEST_FILMS = [
  { sheetTitle: "Đại Sứ Văn Hóa Đọc - Tiểu Thuyết Mưa Đỏ (Chu Lai)", url: "https://youtu.be/HCUSyUoNSPI" },
  { sheetTitle: "Thầy Cô Trong Mắt Em 2024", url: "https://youtu.be/s_0LBJP5ddQ" },
  { sheetTitle: 'Tiết mục dự thi "88Hz" Vĩnh Phúc (CLB Dance NTG)', url: "https://youtu.be/eDuFDIiD63s" }
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

  // --- 1. Lấy dữ liệu từ Google Sheet (Cột A: Tên bài thi, Cột B: Link YouTube) ---
  async function fetchSheetData() {
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
    const list = [];
    const seen = new Set();

    for (let raw of lines) {
      raw = raw.trim();
      if (!raw) continue;

      let sheetTitle = "";
      let url = "";

      // Tách dạng CSV: "Cột A (Tiêu đề)","Cột B (Link)"
      const matchCols = raw.match(/^"(.*?)","(.*?)"$/);
      if (matchCols) {
        sheetTitle = matchCols[1].trim().replace(/""/g, '"');
        url = matchCols[2].trim();
      } else {
        const m = raw.match(/https?:\/\/[^"\s,]+/);
        if (m) {
          url = m[0].replace(/"+$/, '');
          sheetTitle = raw.replace(m[0], '').replace(/["',]/g, '').trim();
        }
      }

      const id = getYouTubeId(url);
      if (id && !seen.has(id)) {
        seen.add(id);
        list.push({
          id,
          url: toWatchUrl(id),
          sheetTitle: sheetTitle || ""
        });
      }
    }
    return list;
  }

  let projectList = [];
  try {
    const sheetData = await fetchSheetData();
    if (sheetData.length) projectList = sheetData;
    else throw new Error("empty sheet");
  } catch (e) {
    console.warn("Sheet fetch failed, dùng dữ liệu dự phòng:", e);
    projectList = FALLBACK_CONTEST_FILMS.map(item => {
      const id = getYouTubeId(item.url);
      return { id, url: toWatchUrl(id), sheetTitle: item.sheetTitle };
    });
  }

  // Build danh sách dự án
  const skel = projectList.map((p, i) => ({
    index: i + 1,
    id: p.id,
    url: p.url,
    title: p.sheetTitle ? finalTitle(p.sheetTitle) : null
  }));

  // Render danh sách dự án
  function render(list) {
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title || 'Bài dự thi ' + p.index)}">
          ${p.id ? `<img src="${thumb(p.id)}" alt="${esc(p.title || 'Bài dự thi')}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`}
        </a>
        <div class="project-info">
          <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title || "Đang tải tiêu đề...")}</a></h3>
        </div>
      </article>
    `).join("");
  }
  render(skel);

  // --- 2. Lấy tiêu đề YouTube tự động (nếu Sheet chưa có tên) ---
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

  // Tải tiêu đề song song và cập nhật DOM nếu còn thiếu
  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(skel.map(async (p, idx) => {
    if (p.title) return; // Đã có tiêu đề từ Sheet
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
