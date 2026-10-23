"use strict";
/* =========================================================
   TVC DỌC — TỰ ĐỘNG THEO GOOGLE SHEET TRANG TÍNH 2
   - Sheet: https://docs.google.com/spreadsheets/d/1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY/edit
   - Trang tính 2 (gid: 56054377 / "Trang tính2")
   - Sắp xếp: TỪ CUỐI LÊN ĐẦU (mới nhất lên đầu)
   - Ảnh bìa: Lấy trực tiếp từ video
   - Giao diện: Chuẩn phong cách thẻ wedding
========================================================= */

const SHEET_ID = "1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY";
const SHEET_GID_2 = "56054377";
const SHEET_CSV_GVIZ = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID_2}`;
const SHEET_CSV_EXPORT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID_2}`;
const SHEET_CSV_BY_NAME = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Trang%20t%C3%ADnh2`;

// 11 dự án ban đầu từ trang tính 2 (thứ tự gốc trong Sheet: 1 -> 11)
// Khi render sẽ tự động đảo ngược từ cuối lên đầu (11 -> 1)
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
  const grid = $("#projectGrid");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const esc = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  const suffix = " | XUÂN GIÁP MEDIA";
  function finalTitle(raw) {
    raw = (raw || "").trim();
    if (!raw) return "TVC Dọc" + suffix;
    if (raw.toUpperCase().includes("XUÂN GIÁP MEDIA")) {
      raw = raw.replace(/\s*-\s*Xuân Giáp Media\s*$/i, "").replace(/\s*\|\s*Xuân Giáp Media\s*$/i, "");
      return raw + suffix;
    }
    return raw + suffix;
  }

  // Trích xuất ID video từ link Google Drive
  const getDriveId = (url) => {
    if (!url) return "";
    const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? m[1] : "";
  };

  // Trích xuất ID video từ link YouTube nếu có
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

  // Tạo URL thumbnail trực tiếp từ video
  function getVideoThumbnail(item) {
    if (item.localThumb) return item.localThumb;
    const driveId = getDriveId(item.url);
    if (driveId) {
      return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
    }
    const ytId = getYouTubeId(item.url);
    if (ytId) {
      return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }
    return "../assets/zap-mobile.png";
  }

  // --- 1. Lấy dữ liệu Trang tính 2 từ Google Sheet ---
  async function fetchSheet2Data() {
    const tryFetch = async (url) => {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error("http " + r.status);
      return await r.text();
    };

    let csv = "";
    try { csv = await tryFetch(SHEET_CSV_GVIZ); }
    catch (e1) {
      try { csv = await tryFetch(SHEET_CSV_BY_NAME); }
      catch (e2) {
        try { csv = await tryFetch(SHEET_CSV_EXPORT); }
        catch (e3) { throw e3; }
      }
    }

    const lines = csv.split(/\r?\n/);
    const list = [];
    let idx = 0;

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

      if (url) {
        idx++;
        // Tìm xem có sẵn local thumb trong danh sách không
        const fbMatch = RAW_FALLBACK_TVC_DOC.find(f => f.url.includes(url.split("?")[0]) || url.includes(f.url.split("?")[0]));
        const localThumb = fbMatch ? fbMatch.localThumb : "";

        list.push({
          rawIndex: idx,
          sheetTitle: sheetTitle || `TVC Dọc ${idx}`,
          url,
          localThumb
        });
      }
    }
    return list;
  }

  let rawList = [];
  try {
    const fetched = await fetchSheet2Data();
    if (fetched.length) rawList = fetched;
    else throw new Error("empty sheet 2");
  } catch (e) {
    console.warn("Sheet 2 fetch failed, dùng fallback:", e);
    rawList = RAW_FALLBACK_TVC_DOC;
  }

  // YÊU CẦU: Sắp xếp theo thứ tự TỪ CUỐI LÊN ĐẦU (Reverse)
  const reversedList = [...rawList].reverse();

  // Render lưới giống thẻ wedding (khung dọc 9:16)
  function render(list) {
    grid.innerHTML = list.map((item, i) => {
      const title = finalTitle(item.sheetTitle);
      const thumbUrl = getVideoThumbnail(item);
      const driveId = getDriveId(item.url);
      const fbFallback = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w800` : "../assets/zap-mobile.png";

      return `
        <article class="project-card is-vertical">
          <a class="project-preview vertical-preview" href="${esc(item.url)}" target="_blank" rel="noopener" aria-label="Xem ${esc(title)}">
            <img src="${esc(thumbUrl)}" alt="${esc(title)}" loading="lazy" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='${fbFallback}';}">
            <span class="project-no">${String(i + 1).padStart(2, "0")}</span>
            <span class="project-play">PLAY ↗</span>
          </a>
          <div class="project-info">
            <h3><a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(title)}</a></h3>
          </div>
        </article>
      `;
    }).join("");
  }

  render(reversedList);

  // Menu mobile + current year
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

