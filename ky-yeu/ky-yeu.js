"use strict";

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1CU1zHhNYXVA_SpoN96R3xa-F0GS-a3l8?usp=sharing";

const PHOTOS = [
  "DSC07575.jpg", "DSC07579.jpg", "DSC07580.jpg", "DSC07582.jpg", "DSC07583.jpg",
  "DSC07584.jpg", "DSC07585.jpg", "DSC07586.jpg", "DSC07587.jpg", "DSC07588.jpg",
  "DSC07589.jpg", "DSC07590.jpg", "DSC07591.jpg", "DSC07592.jpg", "DSC07593.jpg",
  "DSC07594.jpg", "DSC07595.jpg", "DSC07596.jpg", "DSC07598.jpg", "DSC07599.jpg",
  "DSC07600.jpg", "DSC07601.jpg", "DSC07602.jpg", "DSC07603.jpg", "DSC07604.jpg",
  "DSC07609.jpg", "DSC07611.jpg", "DSC07614.jpg", "DSC07615.jpg", "DSC07616.jpg",
  "DSC07617.jpg", "DSC07618.jpg", "DSC07622.jpg", "DSC07623.jpg", "DSC07624.jpg",
  "DSC07625.jpg", "DSC07626.jpg", "DSC07627.jpg", "DSC07628.jpg", "DSC07632.jpg",
  "DSC07633.jpg", "DSC07634.jpg", "DSC07639.jpg", "DSC07641.jpg", "DSC07643.jpg",
  "DSC07644.jpg", "DSC07646.jpg", "DSC07647.jpg", "DSC07649.jpg", "DSC07650.jpg"
];

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const grid = $("#photoGrid");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");
  const currentYear = $("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Menu Mobile Toggle
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
      menu.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });
  }

  // Render 50 Photos
  if (grid) {
    grid.innerHTML = PHOTOS.map((file, idx) => {
      const num = String(idx + 1).padStart(2, "0");
      return `
        <article class="photo-item" data-index="${idx}" tabindex="0" role="button" aria-label="Xem ảnh ${num}">
          <img src="../assets/ky-yeu/raw/${file}" alt="Ảnh kỷ yếu #${num}" loading="lazy">
          <span class="photo-idx">#${num}</span>
          <span class="photo-zoom" aria-hidden="true">🔍</span>
        </article>
      `;
    }).join("");
  }

  // Lightbox Modal
  const modal = $("#lightboxModal");
  const imgEl = $("#lightboxImg");
  const counterEl = $("#lightboxCounter");
  const nameEl = $("#lightboxName");
  const closeBtn = $("#lightboxClose");
  const prevBtn = $("#lightboxPrev");
  const nextBtn = $("#lightboxNext");

  let currentIndex = 0;

  const showPhoto = (index) => {
    if (index < 0) index = PHOTOS.length - 1;
    if (index >= PHOTOS.length) index = 0;
    currentIndex = index;

    const file = PHOTOS[currentIndex];
    const num = String(currentIndex + 1).padStart(2, "0");

    imgEl.src = `../assets/ky-yeu/raw/${file}`;
    counterEl.textContent = `${currentIndex + 1} / ${PHOTOS.length}`;
    nameEl.innerHTML = `<strong>Duy Hưng</strong> <span style="opacity:.65;font-weight:400;">(THPT Nguyễn Thị Giang)</span> · Ảnh #${num} (${file})`;
  };

  const openLightbox = (index) => {
    showPhoto(index);
    modal.showModal();
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    modal.close();
    document.body.classList.remove("lightbox-open");
  };

  // Event Listeners for Grid
  if (grid) {
    grid.addEventListener("click", (e) => {
      const item = e.target.closest(".photo-item");
      if (item) {
        const idx = parseInt(item.dataset.index, 10);
        openLightbox(idx);
      }
    });

    grid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const item = e.target.closest(".photo-item");
        if (item) {
          e.preventDefault();
          const idx = parseInt(item.dataset.index, 10);
          openLightbox(idx);
        }
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showPhoto(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showPhoto(currentIndex + 1));

  // Click outside image to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal.open) return;
    if (e.key === "ArrowLeft") {
      showPhoto(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showPhoto(currentIndex + 1);
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  });
});

