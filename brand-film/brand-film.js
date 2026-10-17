"use strict";

/* =========================================================
   CHỈ SỬA DANH SÁCH PROJECT Ở ĐÂY
   - Dán link YouTube đầy đủ vào youtube
   - Không cần tự lấy ID video
========================================================= */

const projects = [
  {
    title: " LẶNG - PHIM NGẮN TÂM LÝ HỌC ĐƯỜNG ",
    client: "Quay - Dựng bởi Xuân Giáp Media",
    year: "2026",
    description: "Phim Ngắn.",
    youtube: "https://youtu.be/HwXagQNv7bA?si=7Vy8ZwU2v0xPhAXr"
  },
  {
    title: "NGÀY MAI - Ranh Giới Giữa Sự Sống Và Cái Chết | Phim Ngắn Ý Nghĩa Về Sức Khỏe",
    client: "Quay - Dựng bởi Xuân Giáp Media",
    year: "2026",
    description: "Phim Ngắn",
    youtube: "https://youtu.be/xG8-qqAaGdI?si=cTNvgeUiTNBDSPtm"
  },
  {
    title: "NHÀ - PHIM NGẮN TÂM LÝ TÌNH CẢM GIA ĐÌNH",
    client: "Quay - Dựng bởi Xuân Giáp Media",
    year: "2026",
    description: "Phim Ngắn",
    youtube: "https://youtu.be/-LjA282FEZE?si=3LlL19lJVb0Cawnu"
  },
  {
    title: "Phim Ngắn - Người Bạn Bí Ẩn",
    client: "Dựng bởi Xuân Giáp Media",
    year: "2025",
    description: "Commercial / social film.",
    youtube: "https://youtu.be/nhzk1gaBHsY?si=bdkJODTVxnCrYB02"
  }
];
  


/* =========================================================
   PHẦN CHẠY WEBSITE — KHÔNG CẦN SỬA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const grid = $("#projectGrid");
  const dialog = $("#videoDialog");
  const dialogVideo = $("#dialogVideo");
  const dialogTitle = $("#dialogTitle");
  const dialogMeta = $("#dialogMeta");
  const youtubeLink = $("#youtubeLink");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const getYouTubeId = value => {
    if (!value) return "";
    const v = value.trim();

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
  const previewSrc = id =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&playsinline=1`;
  const dialogSrc = id =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1`;

  const list = projects.map((p, i) => ({...p, index:i+1, id:getYouTubeId(p.youtube)}));

  grid.innerHTML = list.map(p => `
    <article class="project-card" data-video="${p.id}">
      <div class="project-preview" tabindex="0" role="button" aria-label="Xem ${p.title}">
        ${p.id
          ? `<img src="${thumb(p.id)}" alt="${p.title}" loading="lazy">`
          : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#777;font-size:.75rem">DÁN LINK YOUTUBE VÀO brand-film.js</div>`
        }
        <span class="project-no">${String(p.index).padStart(2,"0")}</span>
        <span class="project-play">PLAY ↗</span>
      </div>

      <div class="project-info">
        <div class="project-meta">
          <span>${p.client}</span>
          <span>${p.year}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    </article>
  `).join("");

  $$(".project-card").forEach(card => {
    const preview = $(".project-preview", card);
    const id = card.dataset.video;

    const startPreview = () => {
      if (!id || matchMedia("(hover:none)").matches || $("iframe", preview)) return;

      const iframe = document.createElement("iframe");
      iframe.src = previewSrc(id);
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.title = "YouTube preview";
      preview.appendChild(iframe);
      card.classList.add("is-playing");
    };

    const stopPreview = () => {
      $("iframe", preview)?.remove();
      card.classList.remove("is-playing");
    };

    const openProject = () => {
      if (!id) return;

      stopPreview();
      const project = list.find(p => p.id === id);

      dialogVideo.innerHTML = `
        <iframe
          src="${dialogSrc(id)}"
          title="${project.title}"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>`;

      dialogTitle.textContent = project.title;
      dialogMeta.textContent = `${project.client} · ${project.year}`;
      youtubeLink.href = project.youtube;

      dialog.showModal();
      document.body.classList.add("dialog-open");
    };

    preview.addEventListener("mouseenter", startPreview);
    preview.addEventListener("mouseleave", stopPreview);
    preview.addEventListener("click", openProject);
    preview.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProject();
      }
    });
  });

  const closeDialog = () => {
    if (dialog.open) dialog.close();
    dialogVideo.innerHTML = "";
    document.body.classList.remove("dialog-open");
  };

  $("#dialogClose").onclick = closeDialog;
  dialog.addEventListener("click", e => e.target === dialog && closeDialog());
  dialog.addEventListener("close", () => {
    dialogVideo.innerHTML = "";
    document.body.classList.remove("dialog-open");
  });

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

  $("#currentYear").textContent = new Date().getFullYear();
});
