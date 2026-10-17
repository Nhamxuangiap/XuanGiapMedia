"use strict";
/* =========================================================
   MUSIC VIDEO — TỰ ĐỘNG THEO GOOGLE SHEET (mới nhất → cũ nhất)
   Sheet: https://docs.google.com/spreadsheets/d/1OoiJx4l1xEfLyqJmALem4ZWtqtOdiP8eHMlO7i_REPE/edit?usp=sharing
   - Tự lấy link cột A của Sheet, thumbnail khi mở trang
   - Tiêu đề = tiêu đề YouTube (noembed/oembed) + " | XUÂN GIÁP MEDIA"
   - Bấm ảnh/tiêu đề = mở YouTube tab mới
   - Chỉ cần thêm/xóa/sửa link trong Sheet rồi F5 là web tự cập nhật
========================================================= */
const SHEET_ID = "1OoiJx4l1xEfLyqJmALem4ZWtqtOdiP8eHMlO7i_REPE";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Fallback 5 link cứng (khi offline / Sheet chưa public) — sẽ bị thay bằng Sheet khi tải được
const FALLBACK_LINKS = [
  "https://youtu.be/Dbk2aT3fY2I",
  "https://youtu.be/nj6vc4B1M4Q",
  "https://youtu.be/8SYRPmCkQYg",
  "https://youtu.be/hYMcQnf_73g",
  "https://youtu.be/ARF_26Efzfo",
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
    const lines = csv.split(/\r?\n/);
    const links = [];
    for(let raw of lines){
      raw = raw.trim();
      if(!raw) continue;
      const m = raw.match(/https?:\/\/[^"\s,]+/);
      if(m){
        const url = m[0].replace(/"+$/,'');
        if(getYouTubeId(url)) links.push(url);
      }
    }
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

  const skel = youtubeUrls.map((url,i) => {
    const id = getYouTubeId(url);
    return { index:i+1, id, url, title: null };
  });

  function render(list){
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title || 'Music Video '+p.index)}">
          ${p.id ? `<img src="${thumb(p.id)}" alt="${esc(p.title||'Music Video')}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`}
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

  async function fetchTitle(id, watchUrl){
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
    if(!raw) return "Music Video" + suffix;
    if(raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(skel.map(async (p, idx) => {
    const raw = await fetchTitle(p.id, p.url);
    const title = finalTitle(raw || `Music Video ${p.index}`);
    p.title = title;
    const h = cards[idx]?.querySelector(".project-info h3 a");
    if(h) h.textContent = title;
    const aPreview = cards[idx]?.querySelector(".project-preview");
    if(aPreview) aPreview.setAttribute("aria-label", "Xem " + title);
    const img = cards[idx]?.querySelector("img");
    if(img) img.alt = title;
  }));

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
