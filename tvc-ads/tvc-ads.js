"use strict";

/* =========================================================
   DANH SÁCH DỰ ÁN TVC & ADS
   - format: 'landscape' (TVC Ngang 16:9) | 'vertical' (ADS Dọc 9:16)
   - Dán link YouTube vào youtube hoặc link Drive/video
========================================================= */

const projects = [
  // 1. TVC NGANG (16:9)
  {
    id: "tvc-1",
    format: "landscape",
    categoryLabel: "TVC Quảng Cáo Ngang",
    ratioLabel: "16:9 NGANG",
    title: "TVC Giới Thiệu Thương Hiệu Doanh Nghiệp",
    client: "Xuân Giáp Media",
    year: "2026",
    image: "../assets/zap 1.png",
    description: "Sản xuất TVC quảng cáo truyền hình chuẩn điện ảnh, góc quay ấn tượng và âm thanh trau chuốt.",
    youtube: "https://youtu.be/HwXagQNv7bA"
  },
  {
    id: "tvc-2",
    format: "landscape",
    categoryLabel: "TVC Sản Phẩm Ngang",
    ratioLabel: "16:9 NGANG",
    title: "Commercial Film — Ra Mắt Sản Phẩm Mới",
    client: "Xuân Giáp Media",
    year: "2026",
    image: "../assets/BRANDFILM/BRAND FILM 1.png",
    description: "TVC quảng cáo sản phẩm định dạng 16:9 sắc nét, truyền tải trọn vẹn thông điệp thương hiệu.",
    youtube: "https://youtu.be/xG8-qqAaGdI"
  },

  // 2. ADS DỌC (9:16)
  {
    id: "ads-1",
    format: "vertical",
    categoryLabel: "Video Ads Dọc",
    ratioLabel: "9:16 DỌC",
    title: "Video Ads TikTok / Reels — Chuyển Đổi Nhanh",
    client: "Xuân Giáp Media",
    year: "2026",
    image: "../assets/zap-mobile.png",
    description: "Video quảng cáo định dạng 9:16 thiết kế thumbnail dọc bắt mắt, giữ chân 3 giây đầu và đẩy mạnh chuyển đổi.",
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

document.addEventListener("DOMContentLoaded", () => {
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

  let currentFilter = "all";

  // Check URL hash (#tvc-ngang hoặc #ads-doc)
  const hash = window.location.hash.toLowerCase();
  if (hash.includes("tvc")) {
    currentFilter = "landscape";
  } else if (hash.includes("ads")) {
    currentFilter = "vertical";
  }

  const getYouTubeId = value => {
    if (!value) return "";
    const m = value.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return m ? m[1] : "";
  };

  const renderProjects = () => {
    const list = projects.filter(p => currentFilter === "all" || p.format === currentFilter);
    grid.innerHTML = list.map(item => `
      <article class="project-card ${item.format === 'vertical' ? 'is-vertical' : ''}" data-format="${item.format}">
        <div class="project-preview" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="project-badge-tag">${item.ratioLabel}</span>
          <div class="project-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
        <div class="project-info">
          <div class="project-meta">
            <span>${item.categoryLabel}</span>
            <span>${item.year}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");

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
    card.addEventListener("click", () => {
      const targetFilter = card.dataset.filter;
      currentFilter = (currentFilter === targetFilter) ? "all" : targetFilter;
      renderProjects();

      // Cuộn mượt xuống phần danh sách dự án
      const projSec = $("#danh-sach-du-an");
      if (projSec) {
        projSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Mở video dialog
  grid.addEventListener("click", e => {
    const preview = e.target.closest(".project-preview");
    if (!preview) return;
    const item = projects.find(p => p.id === preview.dataset.id);
    if (!item) return;

    const yId = getYouTubeId(item.youtube);
    if (yId && dialog) {
      if (item.format === "vertical") {
        dialog.classList.add("is-vertical-dialog");
      } else {
        dialog.classList.remove("is-vertical-dialog");
      }
      dialogVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${yId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      dialogTitle.textContent = item.title;
      dialogMeta.textContent = `${item.categoryLabel} · ${item.year}`;
      youtubeLink.href = item.youtube;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    }
  });

  // Đóng dialog
  const closeDialog = () => {
    if (!dialog) return;
    dialog.close();
    dialogVideo.innerHTML = "";
    document.body.classList.remove("dialog-open");
  };
  $("#dialogClose")?.addEventListener("click", closeDialog);
  dialog?.addEventListener("click", e => {
    if (e.target === dialog) closeDialog();
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
