"use strict";

/* =========================================================
   BRAND FILM — DANH SÁCH DỰ ÁN VIDEO THƯƠNG HIỆU
========================================================= */

const projects = [
  {
    title: "Khoa QHLĐ 67 (NEU - Hà Nội)",
    url: "https://www.facebook.com/share/v/19g7jGZoXQ/",
    thumbnail: "../assets/BRANDFILM/khoa-qhld-67.jpg"
  },
  {
    title: "LẶNG - PHIM NGẮN TÂM LÝ HỌC ĐƯỜNG",
    youtube: "https://youtu.be/HwXagQNv7bA"
  },
  {
    title: "NGÀY MAI - Ranh Giới Giữa Sự Sống Và Cái Chết | Phim Ngắn Ý Nghĩa Về Sức Khỏe",
    youtube: "https://youtu.be/xG8-qqAaGdI"
  },
  {
    title: "NHÀ - PHIM NGẮN TÂM LÝ TÌNH CẢM GIA ĐÌNH",
    youtube: "https://youtu.be/-LjA282FEZE"
  },
  {
    title: "Phim Ngắn - Người Bạn Bí Ẩn",
    youtube: "https://youtu.be/nhzk1gaBHsY"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const grid = $("#projectGrid");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const getYouTubeId = value => {
    if (!value) return "";
    const v = String(value).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    try {
      const url = new URL(v);
      if (url.hostname.includes("youtu.be")) return url.pathname.split("/").filter(Boolean)[0] || "";
      if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2] || "";
      if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2] || "";
      return url.searchParams.get("v") || "";
    } catch {
      return "";
    }
  };

  const thumb = id => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const esc = str => String(str || "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[m]);

  const list = projects.map((p, i) => {
    const videoUrl = p.url || p.youtube || "";
    const ytid = getYouTubeId(videoUrl);
    const imgSrc = p.thumbnail || (ytid ? thumb(ytid) : "");
    return {
      ...p,
      index: i + 1,
      videoUrl,
      id: ytid,
      imgSrc
    };
  });

  if (grid) {
    grid.innerHTML = list.map(p => `
      <article class="project-card">
        <a class="project-preview" href="${esc(p.videoUrl)}" target="_blank" rel="noopener" aria-label="Xem ${esc(p.title)}">
          ${p.imgSrc
            ? `<img src="${esc(p.imgSrc)}" alt="${esc(p.title)}" loading="lazy" ${p.id ? `onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src='https://img.youtube.com/vi/${p.id}/hqdefault.jpg';}else if(this.dataset.fb==1){this.dataset.fb=2;this.src='https://img.youtube.com/vi/${p.id}/mqdefault.jpg';}"` : ""}>`
            : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">LINK LỖI</div>`
          }
          <span class="project-no">${String(p.index).padStart(2, "0")}</span>
          <span class="project-play">PLAY ↗</span>
        </a>
        <div class="project-info">
          <h3><a href="${esc(p.videoUrl)}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
        </div>
      </article>
    `).join("");
  }

  // Điều khiển menu mobile
  if (menu && menuBtn) {
    const closeMenu = () => {
      menu.classList.remove("open");
      menuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    };

    menuBtn.onclick = () => {
      const open = menu.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    };

    $$("a", menu).forEach(a => a.onclick = closeMenu);
    addEventListener("resize", () => innerWidth > 800 && closeMenu());
  }

  const currentYear = $("#currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
