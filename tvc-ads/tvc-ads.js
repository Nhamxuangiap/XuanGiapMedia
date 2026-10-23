"use strict";

/* =========================================================
   TVC & ADS — KẾT HỢP GOOGLE SHEET (CHO TVC NGANG) & ADS DỌC
   Sheet: https://docs.google.com/spreadsheets/d/1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY/edit
========================================================= */

const SHEET_ID = "1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Fallback 6 TVC Ngang từ Sheet
const FALLBACK_TVC = [
  { sheetTitle: "Quảng cáo đồng hồ tm", url: "https://youtu.be/xyZ-KslVIyg?si=n6fauan8dsJFtvuF" },
  { sheetTitle: "JW mariot", url: "https://youtu.be/IUSfkf7l8l4?si=WMiXajgn8LF4Zb8V" },
  { sheetTitle: "Unit Fitness", url: "https://youtu.be/NRkY1grW_PA?si=8WiBDLF7aFBMSxwB" },
  { sheetTitle: "Unit Fitness 2", url: "https://youtu.be/_utaretIzKE?si=zVdPkVo8S9PEcCg3" },
  { sheetTitle: "Bội Lam - TVC", url: "https://youtu.be/I15YV8AJw9U?si=ZGSnjpKK7GXGcH54" },
  { sheetTitle: "T-Han Beauty", url: "https://youtu.be/hIlQM4WLjig?si=Jq2EalZP6DqxvTtj" }
];

// Danh sách video ADS Dọc (9:16)
const ADS_VERTICAL_PROJECTS = [
  {
    id: "ads-1",
    format: "vertical",
    categoryLabel: "Video Ads Dọc",
    ratioLabel: "9:16 DỌC",
    title: "Video Ads TikTok / Reels — Chuyển Đổi Nhanh",
    client: "Xuân Giáp Media",
    year: "2026",
    image: "../assets/zap-mobile.png",
    description: "Video quảng cáo 9:16 thiết kế thumbnail dọc bắt mắt, giữ chân 3 giây đầu và đẩy mạnh chuyển đổi.",
    youtube: "https://youtu.be/nhzk1gaBHsY"
  },
  {
    id: "ads-2",
    format: "vertical",
    categoryLabel: "Short-Form Ads",
    ratioLabel: "9:16 DỌC",
    title: "Campaign Ads Dọc — Bắt Trend Nền Tảng",
    client: "Xuân Giáp Media",
    year: "2026",
    image: "../assets/chan dung.png",
    description: "Video Ads dạng dọc tối ưu hiển thị 100% full màn hình điện thoại cho chiến dịch Facebook Reels và TikTok.",
    youtube: "https://youtu.be/-LjA282FEZE"
  }
];

document.addEventListener("DOMContentLoaded", async () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const grid = $("#projectGrid");
  const dialog = $("#videoDialog");
  const dialogVideo = $("#dialogVideo");
  const dialogTitle = $("#dialogTitle");
  const dialogMeta = $("#dialogMeta");
  const youtubeLink = $("#youtubeLink");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");
  const filterTabs = $$(".filter-tab");
  const subcatCards = $$(".subcat-card");

  let currentFilter = window.TVC_FORMAT_FILTER || "all";

  // Check URL hash (#tvc-ngang hoặc #ads-doc) nếu chưa có FILTER cố định
  if (!window.TVC_FORMAT_FILTER) {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes("tvc")) {
      currentFilter = "landscape";
    } else if (hash.includes("ads")) {
      currentFilter = "vertical";
    }
  }

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

  // --- 1. Lấy dữ liệu TVC Ngang từ Google Sheet ---
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
          format: "landscape",
          categoryLabel: "TVC Quảng Cáo Ngang",
          ratioLabel: "16:9 NGANG",
          url: toWatchUrl(id),
          youtube: toWatchUrl(id),
          sheetTitle: sheetTitle || "",
          year: "2026"
        });
      }
    }
    return list;
  }

  let tvcProjects = [];
  try {
    const sheetData = await fetchSheetData();
    if (sheetData.length) tvcProjects = sheetData;
    else throw new Error("empty sheet");
  } catch (e) {
    console.warn("Sheet fetch failed, dùng fallback:", e);
    tvcProjects = FALLBACK_TVC.map(item => {
      const id = getYouTubeId(item.url);
      return {
        id,
        format: "landscape",
        categoryLabel: "TVC Quảng Cáo Ngang",
        ratioLabel: "16:9 NGANG",
        url: toWatchUrl(id),
        youtube: toWatchUrl(id),
        sheetTitle: item.sheetTitle,
        year: "2026"
      };
    });
  }

  // Cập nhật số lượng trên thẻ con TVC
  const tvcCountEl = $("#tvcSheetCount");
  if (tvcCountEl) {
    tvcCountEl.textContent = `${tvcProjects.length} DỰ ÁN TỪ SHEET`;
  }

  // Kết hợp TVC Ngang & ADS Dọc
  const allProjects = [...tvcProjects, ...ADS_VERTICAL_PROJECTS];

  const renderProjects = () => {
    const list = allProjects.filter(p => currentFilter === "all" || p.format === currentFilter);
    grid.innerHTML = list.map((item, i) => {
      const displayTitle = item.sheetTitle ? finalTitle(item.sheetTitle) : (item.title || "TVC Ngang");
      const watchUrl = item.url || item.youtube;
      const imgSrc = item.image || thumb(item.id);

      if (item.format === "landscape") {
        // Render thẻ TVC Ngang giống hệt thẻ wedding
        return `
          <article class="project-card">
            <a class="project-preview" href="${esc(watchUrl)}" target="_blank" rel="noopener" aria-label="Xem ${esc(displayTitle)}">
              <img src="${imgSrc}" alt="${esc(displayTitle)}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${item.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${item.id}/mqdefault.jpg';}">
              <span class="project-no">${String(i + 1).padStart(2, "0")}</span>
              <span class="project-play">PLAY ↗</span>
            </a>
            <div class="project-info">
              <h3><a href="${esc(watchUrl)}" target="_blank" rel="noopener">${esc(displayTitle)}</a></h3>
            </div>
          </article>
        `;
      } else {
        // Render thẻ ADS Dọc (với khung dọc 9:16)
        return `
          <article class="project-card is-vertical" data-format="vertical">
            <a class="project-preview" href="${esc(watchUrl)}" target="_blank" rel="noopener" aria-label="Xem ${esc(displayTitle)}">
              <img src="${imgSrc}" alt="${esc(displayTitle)}" loading="lazy">
              <span class="project-badge-tag">${item.ratioLabel}</span>
              <span class="project-no">${String(i + 1).padStart(2, "0")}</span>
              <span class="project-play">PLAY ↗</span>
            </a>
            <div class="project-info">
              <h3><a href="${esc(watchUrl)}" target="_blank" rel="noopener">${esc(displayTitle)}</a></h3>
              <p>${esc(item.description || "")}</p>
            </div>
          </article>
        `;
      }
    }).join("");

    // Cập nhật tab active
    filterTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.filter === currentFilter);
    });

    // Cập nhật thẻ con active
    subcatCards.forEach(card => {
      const f = card.dataset.filter;
      card.classList.toggle("is-active", currentFilter === f);
    });
  };

  // Click đổi tab lọc
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      currentFilter = tab.dataset.filter;
      renderProjects();
    });
  });

  // Click vào 2 thẻ con ở đầu trang
  subcatCards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Nếu bấm vào nút "Mở chuyên trang ↗" thì để link tự điều hướng
      if (e.target.closest("a.subcat-btn")) return;
      const targetFilter = card.dataset.filter;
      currentFilter = (currentFilter === targetFilter) ? "all" : targetFilter;
      renderProjects();

      const projSec = $("#danh-sach-du-an");
      if (projSec) {
        projSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Menu mobile
  menuBtn?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });

  const yearEl = $("#currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderProjects();
});
