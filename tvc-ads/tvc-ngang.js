"use strict";
/* =========================================================
   TVC NGANG — TỰ ĐỘNG THEO GOOGLE SHEET (GIỐNG THẺ WEDDING)
   Sheet: https://docs.google.com/spreadsheets/d/1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY/edit
   - Cột A: Tên dự án / tiêu đề TVC
   - Cột B: Link YouTube
   - Tự lấy link & tiêu đề khi mở trang
   - Tiêu đề = [Tiêu đề cột A hoặc YouTube] + " | XUÂN GIÁP MEDIA"
   - Bấm ảnh/tiêu đề = mở YouTube tab mới
   - Bạn chỉ cần thêm/xóa/sửa link trong Sheet rồi F5 là web tự cập nhật
========================================================= */

const SHEET_ID = "1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Fallback 6 dự án từ Sheet trang tính 1 (khi offline / Sheet chưa tải xong)
const FALLBACK_TVC = [
  { sheetTitle: "Quảng cáo đồng hồ tm", url: "https://youtu.be/xyZ-KslVIyg?si=n6fauan8dsJFtvuF" },
  { sheetTitle: "JW mariot", url: "https://youtu.be/IUSfkf7l8l4?si=WMiXajgn8LF4Zb8V" },
  { sheetTitle: "Unit Fitness", url: "https://youtu.be/NRkY1grW_PA?si=8WiBDLF7aFBMSxwB" },
  { sheetTitle: "Unit Fitness 2", url: "https://youtu.be/_utaretIzKE?si=zVdPkVo8S9PEcCg3" },
  { sheetTitle: "Bội Lam - TVC", url: "https://youtu.be/I15YV8AJw9U?si=ZGSnjpKK7GXGcH54" },
  { sheetTitle: "T-Han Beauty", url: "https://youtu.be/hIlQM4WLjig?si=Jq2EalZP6DqxvTtj" }
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
    if (!raw) return "TVC Ngang" + suffix;
    if (raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  // --- 1. Lấy dữ liệu từ Google Sheet (Cột A: Title, Cột B: Link) ---
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

      // Regex tách dạng: "Cột 1","Cột 2"
      const matchCols = raw.match(/^"(.*?)","(.*?)"$/);
      if (matchCols) {
        sheetTitle = matchCols[1].trim();
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
    console.warn("Sheet fetch failed, dùng fallback:", e);
    projectList = FALLBACK_TVC.map(item => {
      const id = getYouTubeId(item.url);
      return { id, url: toWatchUrl(id), sheetTitle: item.sheetTitle };
    });
  }

  // Build skeleton ban đầu
  const skel = projectList.map((p, i) => ({
    index: i + 1,
    id: p.id,
    url: p.url,
    title: p.sheetTitle ? finalTitle(p.sheetTitle) : null
  }));

  // Render skeleton (thumbnail + số + PLAY, giống thẻ wedding)
  function render(list) {
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title || 'TVC Ngang ' + p.index)}">
          ${p.id ? `<img src="${thumb(p.id)}" alt="${esc(p.title || 'TVC Ngang video')}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`}
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

  // --- 2. Lấy tiêu đề YouTube bổ sung nếu Sheet chưa có tiêu đề ---
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

  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(skel.map(async (p, idx) => {
    if (!p.title) {
      const raw = await fetchTitle(p.id, p.url);
      p.title = finalTitle(raw || `TVC Quảng Cáo ${p.index}`);
      const h = cards[idx]?.querySelector(".project-info h3 a");
      if (h) h.textContent = p.title;
      const aPreview = cards[idx]?.querySelector(".project-preview");
      if (aPreview) aPreview.setAttribute("aria-label", "Xem " + p.title);
      const img = cards[idx]?.querySelector("img");
      if (img) img.alt = p.title;
    }
  }));

  // Menu + year
  const closeMenu = () => {
    menu?.classList.remove("open");
    menuBtn?.classList.remove("open");
    document.body.classList.remove("menu-open");
  };
  if (menuBtn) {
    menuBtn.onclick = () => {
      const open = menu.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    };
  }
  $$("a", menu || document).forEach(a => a.onclick = closeMenu);
  addEventListener("resize", () => innerWidth > 800 && closeMenu());
  const y = $("#currentYear");
  if (y) y.textContent = new Date().getFullYear();
});
