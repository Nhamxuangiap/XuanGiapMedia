"use strict";
/* =========================================================
   WEDDING — TỰ ĐỘNG THEO GOOGLE SHEET (mới nhất → cũ nhất)
   Sheet: https://docs.google.com/spreadsheets/d/19r3mUZXa0hfIoS8gpPqFswLuvTFDJBex7fExUP8OZn0/edit
   - Tự lấy link cột A của Sheet, thumbnail khi mở trang
   - Tiêu đề = tiêu đề YouTube (noembed/oembed) + " | XUÂN GIÁP MEDIA"
   - Bấm ảnh/tiêu đề = mở YouTube tab mới
   - Bạn chỉ cần thêm/xóa/sửa link trong Sheet rồi F5 là web tự cập nhật
========================================================= */
const SHEET_ID = "19r3mUZXa0hfIoS8gpPqFswLuvTFDJBex7fExUP8OZn0";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Fallback 19 link cứng (khi offline / Sheet chưa public) — sẽ bị thay bằng Sheet khi tải được
const FALLBACK_LINKS = [
  "https://youtu.be/DDMa5JEoG6w",
  "https://youtu.be/kpu5wlC6Hf0",
  "https://youtu.be/hgnN0BrwkiU",
  "https://youtu.be/YckVM0ylq-c",
  "https://youtu.be/nHWtAEsqxWg",
  "https://youtu.be/PddzJhCLlb4",
  "https://youtu.be/aDbBlLNj2eQ",
  "https://youtu.be/nBZfoahS5u4",
  "https://youtu.be/4zBSzxy97p8",
  "https://youtu.be/FbhKzgcc08s",
  "https://youtu.be/M6gDRGwXQSI",
  "https://youtu.be/AM-dlsqKyI8",
  "https://youtu.be/vRP0cCLDICc",
  "https://youtu.be/HCBOvH1heeQ",
  "https://youtu.be/eHTRwHdxdcM",
  "https://youtu.be/DtMzUbYIO9Q",
  "https://youtu.be/tnONm0YTJeE",
  "https://youtu.be/dvsQzuOydik",
  "https://youtu.be/daE1XpxcsiU",
];

document.addEventListener("DOMContentLoaded", async () => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const grid = $("#projectGrid");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const getYouTubeId = value => {
    if (!value) return "";
    const v = String(value).trim().replace(/^"+|"+$/g,'').replace(/^'+|'+$/g,'');
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
  const esc = s => String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");

  // --- 1. Lấy links từ Sheet ---
  async function fetchSheetLinks(){
    const tryFetch = async (url) => {
      const r = await fetch(url, {cache:"no-store"});
      if(!r.ok) throw new Error("http "+r.status);
      const t = await r.text();
      return t;
    };
    let csv = "";
    try { csv = await tryFetch(SHEET_CSV_GVIZ); }
    catch(e1) {
      try { csv = await tryFetch(SHEET_CSV_EXPORT); }
      catch(e2) { throw e2; }
    }
    // parse CSV: lấy cột đầu tiên mỗi dòng chứa youtube link
    const lines = csv.split(/\r?\n/);
    const links = [];
    for(let raw of lines){
      raw = raw.trim();
      if(!raw) continue;
      // gviz wraps field in quotes
      // extract first url-looking token
      const m = raw.match(/https?:\/\/[^"\s,]+/);
      if(m){
        const url = m[0].replace(/"+$/,'');
        if(getYouTubeId(url)) links.push(url);
      }
    }
    // dedupe giữ thứ tự Sheet
    const seen = new Set(); const out=[];
    for(const u of links){ const id=getYouTubeId(u); if(!seen.has(id)){ seen.add(id); out.push(toWatchUrl(id)); } }
    return out;
  }

  let youtubeUrls = [];
  try {
    const sheetLinks = await fetchSheetLinks();
    if(sheetLinks.length) youtubeUrls = sheetLinks;
    else throw new Error("empty sheet");
  } catch(e) {
    console.warn("Sheet fetch failed, dùng fallback:", e);
    youtubeUrls = FALLBACK_LINKS.map(u => toWatchUrl(getYouTubeId(u)));
  }

  // Build skeleton ngay để có thumbnail tức thì
  const skel = youtubeUrls.map((url,i) => {
    const id = getYouTubeId(url);
    return { index:i+1, id, url, title: null };
  });

  // Render skeleton (thumbnail + số + PLAY, tiêu đề tạm)
  function render(list){
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title || 'Video wedding '+p.index)}">
          ${p.id ? `<img src="${thumb(p.id)}" alt="${esc(p.title||'Wedding video')}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`}
          <span class="project-no">${String(p.index).padStart(2,"0")}</span>
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
  async function fetchTitle(id, watchUrl){
    // noembed
    try {
      const r = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(watchUrl)}`, {cache:"force-cache"});
      if(r.ok){
        const j = await r.json();
        if(j.title) return j.title;
      }
    } catch{}
    try {
      const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`, {cache:"force-cache"});
      if(r.ok){
        const j = await r.json();
        if(j.title) return j.title;
      }
    } catch{}
    return null;
  }

  const suffix = " | XUÂN GIÁP MEDIA";
  function finalTitle(raw){
    raw = (raw||"").trim();
    if(!raw) return "Wedding Film" + suffix;
    if(raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      // chuẩn hoá các dạng " - Xuân Giáp Media" về " | XUÂN GIÁP MEDIA"
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  // fetch titles parallel, update DOM incremental
  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(skel.map(async (p, idx) => {
    const raw = await fetchTitle(p.id, p.url);
    const title = finalTitle(raw || `Wedding Video ${p.index}`);
    p.title = title;
    const h = cards[idx]?.querySelector(".project-info h3 a");
    if(h) h.textContent = title;
    const aPreview = cards[idx]?.querySelector(".project-preview");
    if(aPreview) aPreview.setAttribute("aria-label", "Xem " + title);
    const img = cards[idx]?.querySelector("img");
    if(img) img.alt = title;
  }));

  // menu + year
  const closeMenu = () => { menu?.classList.remove("open"); menuBtn?.classList.remove("open"); document.body.classList.remove("menu-open"); };
  menuBtn && (menuBtn.onclick = () => {
    const open = menu.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });
  $$("a", menu||document).forEach(a => a.onclick = closeMenu);
  addEventListener("resize", () => innerWidth > 800 && closeMenu());
  const y = $("#currentYear"); if(y) y.textContent = new Date().getFullYear();
});
