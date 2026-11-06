"use strict";

/* =========================================================
   TVC & DIGITAL ADS — XUÂN GIÁP MEDIA
   - Trang tính 1: TVC Quảng Cáo Khung Ngang (16:9)
   - Trang tính 2: Video Ads Khung Dọc (9:16, sắp xếp từ cuối lên đầu)
   - Điều hướng trạng thái URL: ?format=landscape | ?format=vertical
========================================================= */

const SHEET_ID = "1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY";
const SHEET1_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const SHEET2_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=56054377`;
const SHEET2_CSV_NAME = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Trang%20t%C3%ADnh2`;

// Fallback TVC Ngang (Trang tính 1) — 6 dự án
const FALLBACK_TVC_NGANG = [
  { sheetTitle: "Quảng cáo đồng hồ tm", url: "https://youtu.be/xyZ-KslVIyg?si=n6fauan8dsJFtvuF" },
  { sheetTitle: "JW mariot", url: "https://youtu.be/IUSfkf7l8l4?si=WMiXajgn8LF4Zb8V" },
  { sheetTitle: "Unit Fitness", url: "https://youtu.be/NRkY1grW_PA?si=8WiBDLF7aFBMSxwB" },
  { sheetTitle: "Unit Fitness 2", url: "https://youtu.be/_utaretIzKE?si=zVdPkVo8S9PEcCg3" },
  { sheetTitle: "Bội Lam - TVC", url: "https://youtu.be/I15YV8AJw9U?si=ZGSnjpKK7GXGcH54" },
  { sheetTitle: "T-Han Beauty", url: "https://youtu.be/hIlQM4WLjig?si=Jq2EalZP6DqxvTtj" }
];

// Fallback TVC Dọc (Trang tính 2) — 11 dự án
const RAW_FALLBACK_TVC_DOC = [
  { rawIndex: 1, sheetTitle: "Quảng Cáo Độ Đèn", url: "https://drive.google.com/file/d/1lsxwkSIkUZlQhcEYuXqTBDg8AqHHWOPL/view?usp=sharing", localThumb: "../assets/tvc-doc/thumb-1.jpg" },
  { rawIndex: 2, sheetTitle: "Quán Nhậu Bất Tử", url: "https://drive.google.com/file/d/1t6gVbMVpkVfMIZwAryj_AnHaOvjSMqeF/view?usp=drive_link", localThumb: "../assets/tvc-doc/thumb-2.jpg" },
  { rawIndex: 3, sheetTitle: "Quảng Cáo PPF", url: "https://drive.google.com/file/d/1COV1YkmrtePmb8GysJ484DHSpcnV7laf/view?usp=sharing", localThumb: "../assets/tvc-doc/thumb-3.jpg" },
  { rawIndex: 4, sheetTitle: "Quảng Cáo Loa I-so ", url: "https://drive.google.com/file/d/1pOClxLUmfhAUMivVHp39oNCGxBz7-ZIh/view?usp=sharing", localThumb: "../assets/tvc-doc/thumb-4.jpg" },
  { rawIndex: 5, sheetTitle: "Quảng Cáo Limo Green Độ Full Combo", url: "https://drive.google.com/file/d/1InawfsqeikWkAeH9Ftzv2ocr7ibtkjNR/view?usp=drive_link", localThumb: "../assets/tvc-doc/thumb-5.jpg" },
  { rawIndex: 6, sheetTitle: "Quảng Cáo Combo Loa Kenner", url: "https://drive.google.com/file/d/1qlre20Mge5O6mxt__5Y_gUd0hsXh0HfF/view?usp=sharing", localThumb: "../assets/tvc-doc/thumb-6.jpg" },
  { rawIndex: 7, sheetTitle: "Quảng Cáo Khóa Điện Limo Greend", url: "https://www.facebook.com/share/r/19kmcqYRxz/", localThumb: "../assets/tvc-doc/thumb-7.jpg" },
  { rawIndex: 8, sheetTitle: "Quảng Cáo Combo 18 Triệu tặng Chống Ồn", url: "https://www.facebook.com/share/r/1MHBotssdn/", localThumb: "../assets/tvc-doc/thumb-8.jpg" },
  { rawIndex: 9, sheetTitle: "Quảng Cáo Loa I-so - Chung Tũn", url: "https://www.facebook.com/share/r/1CQxR1MKry/", localThumb: "../assets/tvc-doc/thumb-9.jpg" },
  { rawIndex: 10, sheetTitle: "Quảng Cáo Loa Vinsub V8 Pro ", url: "https://www.facebook.com/share/r/1ETK7AXrvY/", localThumb: "../assets/tvc-doc/thumb-10.jpg" },
  { rawIndex: 11, sheetTitle: "Lời Cảm Ơn Của Văn Long Auto Tới Anh Vũ Master Tune", url: "https://www.facebook.com/share/r/1KLiLuc2gg/", localThumb: "../assets/tvc-doc/thumb-11.jpg" }
];

document.addEventListener("DOMContentLoaded", async () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const overviewSection = $("#overviewSection");
  const detailSection = $("#detailSection");
  const projectGrid = $("#projectGrid");

  const cardLandscape = $("#cardLandscape");
  const cardVertical = $("#cardVertical");
  const landscapeCount = $("#landscapeCount");
  const verticalCount = $("#verticalCount");
  const thumbLandscapeOverview = $("#thumbLandscapeOverview");
  const thumbVerticalOverview = $("#thumbVerticalOverview");

  const crumbRoot = $("#crumbRoot");
  const crumbCurrent = $("#crumbCurrent");
  const btnBackOverview = $("#btnBackOverview");
  const detailTag = $("#detailTag");
  const detailTitle = $("#detailTitle");
  const detailCountBadge = $("#detailCountBadge");

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

  const getDriveId = url => {
    if (!url) return "";
    const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : "";
  };

  const toWatchUrl = id => `https://www.youtube.com/watch?v=${id}`;
  const thumb = id => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const esc = s => String(s || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  const suffix = " | XUÂN GIÁP MEDIA";
  function finalTitle(raw) {
    raw = (raw || "").trim();
    if (!raw) return "TVC" + suffix;
    if (raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  // --- 1. Tải TVC Ngang (Trang tính 1) ---
  async function fetchTvcNgang() {
    try {
      const r = await fetch(SHEET1_CSV, { cache: "no-store" });
      if (!r.ok) throw new Error();
      const csv = await r.text();
      const lines = csv.split(/\r?\n/);
      const list = [];
      const seen = new Set();
      for (let raw of lines) {
        raw = raw.trim();
        if (!raw) continue;
        const matchCols = raw.match(/^"(.*?)","(.*?)"$/);
        let title = matchCols ? matchCols[1].trim() : "";
        let url = matchCols ? matchCols[2].trim() : "";
        if (!url) {
          const m = raw.match(/https?:\/\/[^"\s,]+/);
          if (m) { url = m[0].replace(/"+$/, ''); title = raw.replace(m[0], '').replace(/["',]/g, '').trim(); }
        }
        const id = getYouTubeId(url);
        if (id && !seen.has(id)) {
          seen.add(id);
          list.push({
            format: "landscape",
            sheetTitle: title || "TVC Ngang",
            url: toWatchUrl(id),
            thumbUrl: thumb(id)
          });
        }
      }
      return list.length ? list : null;
    } catch { return null; }
  }

  // --- 2. Tải TVC Dọc (Trang tính 2 — Sắp xếp TỪ CUỐI LÊN ĐẦU) ---
  async function fetchTvcDoc() {
    try {
      let r = await fetch(SHEET2_CSV, { cache: "no-store" });
      if (!r.ok) r = await fetch(SHEET2_CSV_NAME, { cache: "no-store" });
      if (!r.ok) throw new Error();
      const csv = await r.text();
      const lines = csv.split(/\r?\n/);
      const list = [];
      let idx = 0;
      for (let raw of lines) {
        raw = raw.trim();
        if (!raw) continue;
        const matchCols = raw.match(/^"(.*?)","(.*?)"$/);
        let title = matchCols ? matchCols[1].trim() : "";
        let url = matchCols ? matchCols[2].trim() : "";
        if (!url) {
          const m = raw.match(/https?:\/\/[^"\s,]+/);
          if (m) { url = m[0].replace(/"+$/, ''); title = raw.replace(m[0], '').replace(/["',]/g, '').trim(); }
        }
        if (url) {
          idx++;
          const fbMatch = RAW_FALLBACK_TVC_DOC.find(f => f.url.includes(url.split("?")[0]) || url.includes(f.url.split("?")[0]));
          let thumbUrl = fbMatch ? fbMatch.localThumb : "";
          const driveId = getDriveId(url);
          if (!thumbUrl && driveId) {
            thumbUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
          }
          list.push({
            format: "vertical",
            sheetTitle: title || `TVC Dọc ${idx}`,
            url,
            thumbUrl: thumbUrl || "../assets/zap-mobile.png"
          });
        }
      }
      if (list.length) {
        return list.reverse();
      }
      return null;
    } catch { return null; }
  }

  // Tải dữ liệu 2 trang tính song song
  const [ngangData, docData] = await Promise.all([fetchTvcNgang(), fetchTvcDoc()]);

  const tvcNgangList = ngangData || FALLBACK_TVC_NGANG.map(it => {
    const id = getYouTubeId(it.url);
    return { format: "landscape", sheetTitle: it.sheetTitle, url: toWatchUrl(id), thumbUrl: thumb(id) };
  });

  const tvcDocList = docData || [...RAW_FALLBACK_TVC_DOC].reverse().map(it => ({
    format: "vertical",
    sheetTitle: it.sheetTitle,
    url: it.url,
    thumbUrl: it.localThumb
  }));

  // Cập nhật số lượng trên 2 thẻ trang tổng quan
  if (landscapeCount) landscapeCount.textContent = `${tvcNgangList.length} DỰ ÁN`;
  if (verticalCount) verticalCount.textContent = `${tvcDocList.length} DỰ ÁN`;

  // Cập nhật thumbnail thực tế trên thẻ ngang
  if (thumbLandscapeOverview && tvcNgangList[0]?.thumbUrl) {
    thumbLandscapeOverview.src = tvcNgangList[0].thumbUrl;
    thumbLandscapeOverview.onerror = () => {
      thumbLandscapeOverview.src = "../assets/zap 1.png";
    };
  }

  // Cập nhật 3 thumbnail dọc thực tế trên thẻ dọc
  if (thumbVerticalOverview && tvcDocList.length) {
    const top3 = tvcDocList.slice(0, 3);
    thumbVerticalOverview.innerHTML = top3.map((item, idx) => `
      <img src="${esc(item.thumbUrl)}" alt="Thumbnail ${idx + 1}" loading="lazy" onerror="this.src='../assets/zap-mobile.png'">
    `).join("");
  }

  // Xây dựng card dự án sạch đẹp, không chồng chữ hay badge
  const buildCard = (item, i) => {
    const displayTitle = finalTitle(item.sheetTitle);
    const isVert = item.format === "vertical";
    const driveId = getDriveId(item.url);
    const fbFallback = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w800` : "../assets/zap-mobile.png";

    return `
      <article class="project-card ${isVert ? 'is-vertical' : ''}">
        <a class="project-preview ${isVert ? 'vertical-preview' : ''}" href="${esc(item.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(displayTitle)}" title="${esc(displayTitle)}">
          <img src="${esc(item.thumbUrl)}" alt="${esc(displayTitle)}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fbFallback}';}">
          <span class="project-no">${String(i + 1).padStart(2, "0")}</span>
          <span class="project-play">PLAY ↗</span>
        </a>
        <div class="project-info">
          <h3 title="${esc(displayTitle)}">
            <a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(displayTitle)}</a>
          </h3>
        </div>
      </article>
    `;
  };

  // --- Router: Đọc định dạng từ URL query parameter (?format=landscape | ?format=vertical) hoặc hash ---
  function getFormatFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const fmt = params.get("format");
    if (fmt === "landscape" || fmt === "vertical") return fmt;
    const hash = (window.location.hash || "").toLowerCase();
    if (hash === "#landscape" || hash === "#tvc-ngang") return "landscape";
    if (hash === "#vertical" || hash === "#tvc-doc") return "vertical";
    return null;
  }

  // Cập nhật giao diện theo trạng thái định dạng
  function renderView(format) {
    if (!format) {
      // TRANG TỔNG QUAN: Chỉ hiển thị 2 thẻ lớn
      if (overviewSection) overviewSection.hidden = false;
      if (detailSection) detailSection.hidden = true;
      document.title = "TVC & Digital Ads — Xuân Giáp Media";
      return;
    }

    // TRANG CHI TIẾT DANH MỤC
    if (overviewSection) overviewSection.hidden = true;
    if (detailSection) detailSection.hidden = false;

    if (format === "landscape") {
      document.title = "Quảng Cáo Khung Ngang (16:9) — Xuân Giáp Media";
      if (crumbCurrent) crumbCurrent.textContent = "Quảng Cáo Khung Ngang";
      if (detailTag) detailTag.textContent = "LANDSCAPE ADS · 16:9";
      if (detailTitle) detailTitle.textContent = "Quảng Cáo Khung Ngang";
      if (detailCountBadge) detailCountBadge.textContent = `${tvcNgangList.length} DỰ ÁN`;

      if (projectGrid) {
        projectGrid.className = "project-grid landscape-grid";
        projectGrid.innerHTML = tvcNgangList.map((item, i) => buildCard(item, i)).join("");
      }
    } else if (format === "vertical") {
      document.title = "Quảng Cáo Khung Dọc (9:16) — Xuân Giáp Media";
      if (crumbCurrent) crumbCurrent.textContent = "Quảng Cáo Khung Dọc";
      if (detailTag) detailTag.textContent = "VERTICAL ADS · 9:16";
      if (detailTitle) detailTitle.textContent = "Quảng Cáo Khung Dọc";
      if (detailCountBadge) detailCountBadge.textContent = `${tvcDocList.length} DỰ ÁN`;

      if (projectGrid) {
        projectGrid.className = "project-grid vertical-grid";
        projectGrid.innerHTML = tvcDocList.map((item, i) => buildCard(item, i)).join("");
      }
    }
  }

  // Chuyển hướng trạng thái với history.pushState
  function navigateTo(format, push = true) {
    if (push) {
      const url = format ? `?format=${format}` : window.location.pathname;
      history.pushState({ format }, "", url);
    }
    renderView(format);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Click vào Thẻ 1: Khung Ngang
  if (cardLandscape) {
    cardLandscape.addEventListener("click", () => navigateTo("landscape"));
    cardLandscape.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateTo("landscape");
      }
    });
  }

  // Click vào Thẻ 2: Khung Dọc
  if (cardVertical) {
    cardVertical.addEventListener("click", () => navigateTo("vertical"));
    cardVertical.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateTo("vertical");
      }
    });
  }

  // Click nút Quay lại danh mục & Breadcrumb root
  if (btnBackOverview) {
    btnBackOverview.addEventListener("click", e => {
      e.preventDefault();
      navigateTo(null);
    });
  }
  if (crumbRoot) {
    crumbRoot.addEventListener("click", e => {
      e.preventDefault();
      navigateTo(null);
    });
  }

  // Xử lý nút Back/Forward của trình duyệt
  window.addEventListener("popstate", () => {
    renderView(getFormatFromUrl());
  });

  // Mobile menu
  menuBtn?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });

  const yearEl = $("#currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Khởi tạo hiển thị theo URL ban đầu
  renderView(getFormatFromUrl());
});
