"use strict";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/vanlongauto3@gmail.com";

// ============================================================================
// GOOGLE SHEET TỰ ĐỘNG CHO MỤC TÀI NGUYÊN (PRESET, LUT, FX, ÂM THANH, APP+PLUGIN)
// - Sheet 1: Âm Thanh (List Nhạc Cưới, SFX...)
// - Sheet 2: App + Plugin (WinRAR, EVKey, Office, MAS...)
// ============================================================================
const RESOURCE_SHEETS = [
  { id: "1KC-d70yzHh7AXXymKGfAoxTMdwfJUleK7QnQXMm_JOA", gid: "0", defaultCategory: "sound" },
  { id: "14_g3zw0qiMAF8RosAvj8tlYk-sZ49T33aBdm0U9GXME", gid: "0", defaultCategory: "app" },
  { id: "14_g3zw0qiMAF8RosAvj8tlYk-sZ49T33aBdm0U9GXME", gid: "1961290079", defaultCategory: "app" } // Trang 2: Full Adobe
];

const resourceGroups = {
  preset: {
    title: "Preset Ảnh",
    category: "preset",
    categoryLabel: "Preset Ảnh",
    description: "Preset Lightroom / Camera Raw — tone film, wedding, du lịch — bấm tên để mở Drive.",
    cover: "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)",
    children: [
      { id: "preset-film", title: "Preset Tone Film", shortTitle: "Tone\nFilm", image: "", driveUrl: "https://drive.google.com/drive/folders/1PLACEHOLDER_PRESET_FILM", cover: "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)", description: "Preset tone film cũ, ấm, hạt mịn cho ảnh chân dung & lookbook." },
      { id: "preset-wedding", title: "Preset Wedding", shortTitle: "Preset\nWedding", image: "", driveUrl: "https://drive.google.com/drive/folders/1PLACEHOLDER_PRESET_WEDDING", cover: "linear-gradient(145deg,#a1c4fd,#c2e9fb 30%,#3a4a6b 58%,#111)", description: "Tone cưới trong trẻo, sáng da — dùng cho Lightroom & Camera Raw." },
      { id: "preset-travel", title: "Preset Du Lịch", shortTitle: "Preset\nDu Lịch", image: "", driveUrl: "https://drive.google.com/drive/folders/1PLACEHOLDER_PRESET_TRAVEL", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#6b3a2a 55%,#111)", description: "Tone rực rỡ, HDR nhẹ cho ảnh du lịch & lifestyle." }
    ]
  },
  lut: {
    title: "LUT Màu Video",
    category: "lut",
    categoryLabel: "LUT Màu Video",
    description: "Kho LUT CapCut & LUT tổng hợp — bấm tên để mở Drive.",
    cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)",
    children: [
      { id: "lut-capcut", title: "LUT CapCut", shortTitle: "LUT\nCapCut", image: "", driveUrl: "https://drive.google.com/drive/folders/1ZI9uw761IQLxjuS5NF00KA8qljiZIsh8?usp=drive_link", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#6b3a2a 55%,#111)", description: "Bộ LUT dựng sẵn cho CapCut: wedding, du lịch, film — tải về dùng ngay." },
      { id: "lut-tonghop", title: "LUT Màu Tổng Hợp", shortTitle: "LUT\nTổng Hợp", image: "", driveUrl: "https://drive.google.com/drive/folders/1UQngPUlbDHo-L4fIOlu95V_MrHW4u3hp?usp=drive_link", cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)", description: "30+ bộ LUT tổng hợp: cinematic, HDR, wedding, drone, fashion..." }
    ]
  },
  fx: {
    title: "FX Video — Hiệu Ứng",
    category: "fx",
    categoryLabel: "FX Video",
    description: "Overlay, transition, background — bấm tên để mở Drive.",
    cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)",
    children: [
      { id: "fx-bg", title: "BackGround Colorful", shortTitle: "BackGround\nColorful", image: "assets/fx-bg/background-colorful.jpg", driveUrl: "https://drive.google.com/drive/folders/1e8OkXH2hP8t-z6WkZKMcz5afuFtl9PVC", cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)", description: "Background màu chuyển động làm nền chữ và intro." },
      { id: "fx-film", title: "Hiệu ứng Film", shortTitle: "Hiệu ứng\nFilm", image: "assets/fx-film/hieu-ung-film.jpg", driveUrl: "https://drive.google.com/drive/folders/1yqr0mXLY2y06_G9AsyVy9-hEVBRAooiB", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#6b3a2a 55%,#111)", description: "Khung Super 8mm, film burn, hạt grain & texture bụi xước cổ điển." },
      { id: "fx-doc", title: "LƯỚI EDIT VIDEO DỌC", shortTitle: "Lưới Edit\nVideo Dọc", image: "assets/fx-doc/luoi-edit-video-doc.jpg", driveUrl: "https://drive.google.com/drive/folders/14Pvzl8gNKtw6ZU108IXDmLN3910P_SyS", cover: "linear-gradient(145deg,#fddb92,#d1fdff 30%,#5b5b5b 60%,#111)", description: "Lưới căn khung video dọc 9:16 cho TikTok / Reels." },
      { id: "fx-text-capcut", title: "Text FX CapCut", shortTitle: "Text FX CapCut", image: "assets/Mẫu8.png", driveUrl: "https://drive.google.com/drive/folders/1A6h-5iVi0T0noG9tiZmNdNGvIq9OjYLW?usp=sharing", cover: "linear-gradient(145deg,#e0c3fc,#8ec5fc 30%,#5b5b5b 60%,#111)", description: "Bộ hiệu ứng chữ cho CapCut — font, animation xuất hiện và biến mất, dùng làm tiêu đề video." }
    ]
  },
  sound: {
    title: "Âm Thanh",
    category: "sound",
    categoryLabel: "Âm Thanh",
    description: "SFX, meme sound, nhạc nền — bấm tên để mở Drive.",
    cover: "linear-gradient(145deg,#cfd9df,#e2ebf0 28%,#5b5b5b 58%,#111)",
    children: [
      { id: "snd-wedding-music", title: "List Nhạc Cưới", shortTitle: "List Nhạc Cưới", image: "assets/list-nhac-cuoi/list-nhac-cuoi.jpg", driveUrl: "https://drive.google.com/drive/folders/1rsc451-0AeeQtjo03PXJMiLkxEWHd2c0?usp=sharing", cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#5b5b5b 60%,#111)", description: "Bao gồm nhạc đón khách, làm lễ, đãi tiệc và dùng làm nhạc nền dựng video kỷ niệm." },
      { id: "snd-meme", title: "MEME SOUND Schannel", shortTitle: "Meme Sound", image: "assets/meme-sound/meme-sound.jpg", driveUrl: "https://drive.google.com/drive/folders/1sxQe7oBMtK2aIr_NKCuj7U4C1pDY9ryd", cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#5b5b5b 60%,#111)", description: "Âm thanh meme vui nhộn cho video giải trí." },
      { id: "snd-wedding", title: "WEDDING SOUND", shortTitle: "Wedding Sound", image: "assets/wedding-sound/wedding-sound.jpg", driveUrl: "https://drive.google.com/drive/folders/1hi9otjKUhIccGD-7ek3jCWhkkGUmp609?usp=sharing", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#6b3a2a 55%,#111)", description: "120 bản ghi âm đám cưới thực tế — tiếng chúc mừng, không gian, cái ôm, pháo hoa — cùng các kết cấu âm thanh sống động." },
      { id: "snd-kitchen", title: "Kitchen & Cooking Sound", shortTitle: "Kitchen & Cooking Sound", image: "assets/kitchen-sound/kitchen-cooking-sound.jpg", driveUrl: "https://drive.google.com/drive/folders/1c6f8VW6BNvyK-VbzZ8KmDMIKQP5C0Zz3?usp=sharing", cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#5b5b5b 60%,#111)", description: "Âm thanh nhà bếp & nấu ăn — tiếng xào, cắt, đổ nước, ambiance bếp." },
      { id: "snd-fighting", title: "Fighting Sound", shortTitle: "Fighting Sound", image: "assets/Hộp DVD Fight Scene Muay Thái.png", driveUrl: "https://drive.google.com/drive/folders/1PLACEHOLDER_FIGHTING_SOUND", cover: "linear-gradient(145deg,#ff9966,#ff5e62 30%,#4a2020 60%,#111)", description: "Âm thanh chiến đấu, đòn đánh, va chạm và hiệu ứng hành động cho video." },
      { id: "snd-ef", title: "SOUND EF", shortTitle: "Sound EF", image: "", driveUrl: "https://drive.google.com/drive/folders/1fh5-xA1HHMRNSO-sCJFLOBoNqnOZEy6i", cover: "linear-gradient(145deg,#cfd9df,#e2ebf0 28%,#4a4a4a 60%,#111)", description: "Hiệu ứng whoosh, hit, riser cho chuyển cảnh." },
      { id: "snd-epi", title: "Nhạc Epidemic", shortTitle: "Nhạc Epidemic", image: "", driveUrl: "https://drive.google.com/drive/folders/115YcOt73tuoKtPcwKWPiAUJI2ZbxkM2D", cover: "linear-gradient(145deg,#e0c3fc,#8ec5fc 30%,#5b5b5b 60%,#111)", description: "Nhạc nền bản quyền cho vlog và quảng cáo." }
    ]
  },
  app: {
    title: "App + Plugin",
    category: "app",
    categoryLabel: "App + Plugin",
    description: "Bộ cài phần mềm, công cụ tiện ích & plugin hỗ trợ edit video, đồ họa — bấm tên để mở link tải.",
    cover: "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)",
    children: [
      { id: "app-activation", title: "Activation Office & Win", shortTitle: "Kích Hoạt Office & Win", image: "assets/app-plugin/activation-office-win.png", driveUrl: "https://massgrave.dev/", cover: "linear-gradient(145deg,#11998e,#38ef7d 30%,#104028 60%,#111)", description: "Công cụ kích hoạt bản quyền Windows và Office vĩnh viễn an toàn." },
      { id: "app-adobe-ae-2020", title: "Adobe After Effects 2020", shortTitle: "After Effects 2020", image: "assets/app-plugin/adobe-after-effects-2020.jpg", driveUrl: "https://drive.google.com/file/d/1B6LCXl9dzU4ITUvnwET48hJgiu1_ag0F/view?usp=drive_link", cover: "linear-gradient(145deg,#9999ff,#00005b 35%,#121035 65%,#111)", description: "Làm kỹ xảo hình ảnh (VFX) và đồ họa chuyển động (Motion Graphics)." },
      { id: "app-adobe-ai-2020", title: "Adobe Illustrator 2020", shortTitle: "Illustrator 2020", image: "assets/app-plugin/adobe-illustrator-2020.png", driveUrl: "https://drive.google.com/file/d/1q0lJ0KTkaUA53LyxzgzSxWEcN_TF9AMN/view?usp=drive_link", cover: "linear-gradient(145deg,#ff9a00,#330000 35%,#2b1200 65%,#111)", description: "Vẽ minh họa, thiết kế logo và đồ họa vector chuyên nghiệp." },
      { id: "app-adobe-ps-2020", title: "Adobe Photoshop 2020", shortTitle: "Photoshop 2020", image: "assets/app-plugin/adobe-photoshop-2020.jpg", driveUrl: "https://drive.google.com/file/d/1pRrjhuOdfN1GzzJkK91TloKvLKBsW9U8/view?usp=drive_link", cover: "linear-gradient(145deg,#31a8ff,#001e36 35%,#051525 65%,#111)", description: "Chỉnh sửa, cắt ghép ảnh và thiết kế đồ họa 2D đỉnh cao." },
      { id: "app-adobe-pr-2020", title: "Adobe Premiere Pro 2020", shortTitle: "Premiere Pro 2020", image: "assets/app-plugin/adobe-premiere-pro-2020.jpg", driveUrl: "https://drive.google.com/file/d/1cBqK65Fwyei9tRDkg314UlNkJJr-D7VM/view?usp=drive_link", cover: "linear-gradient(145deg,#ea77ff,#330033 35%,#220625 65%,#111)", description: "Cắt ghép, biên tập và dựng video chuyên nghiệp chuẩn điện ảnh." },
      { id: "app-alwaysmousewheel", title: "AlwaysMouseWheel", shortTitle: "AlwaysMouseWheel", image: "assets/app-plugin/alwaysmousewheel.png", driveUrl: "https://drive.google.com/file/d/1pM2x15aPxIVRliE_bIHhIu6mBuYGFhYX/view?usp=drive_link", cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#3b4b60 60%,#111)", description: "Tiện ích cuộn chuột thông minh mà không cần nhấp chuột lên cửa sổ." },
      { id: "app-bandicam", title: "Bandicam Recording", shortTitle: "Bandicam Recording", image: "assets/app-plugin/bandicam-recoding.png", driveUrl: "https://drive.google.com/file/d/1yvxsJOp1IT8fDJGDqzH1SPWBiDNVKdN6/view?usp=drive_link", cover: "linear-gradient(145deg,#30cfd0,#330867 30%,#151030 60%,#111)", description: "Quay video màn hình, ghi hình trò chơi và chụp ảnh màn hình chất lượng cao." },
      { id: "app-block-internet", title: "Block Internet", shortTitle: "Block Internet", image: "assets/app-plugin/block-internet.png", driveUrl: "https://drive.google.com/file/d/15mZcd1i6scO9STIY14iJW7hLs0QyuRYD/view?usp=drive_link", cover: "linear-gradient(145deg,#4facfe,#00f2fe 30%,#103550 60%,#111)", description: "Chặn kết nối mạng của các ứng dụng chỉ định qua tường lửa." },
      { id: "app-ccleaner", title: "CCleaner Pro", shortTitle: "CCleaner Pro", image: "assets/app-plugin/ccleanerpro.png", driveUrl: "https://drive.google.com/file/d/1ooKW0gdwRnh5PkIuctaXzIjMakUbUWgJ/view?usp=drive_link", cover: "linear-gradient(145deg,#ff9966,#ff5e62 30%,#5a2020 60%,#111)", description: "Dọn dẹp tệp rác, bộ nhớ đệm và tối ưu hóa hệ thống máy tính mượt mà." },
      { id: "app-evkey", title: "EVKey", shortTitle: "EVKey", image: "assets/app-plugin/ev-key.png", driveUrl: "https://drive.google.com/file/d/1VdfeYAvvF7piwcJQplRiFf5fSZuFWW_D/view?usp=sharing", cover: "linear-gradient(145deg,#f857a6,#ff5858 30%,#4a1525 60%,#111)", description: "Bộ gõ tiếng Việt gọn nhẹ, ổn định, không lỗi gõ phím trên trình duyệt và Photoshop." },
      { id: "app-office2016", title: "Microsoft Office 2016", shortTitle: "Office 2016", image: "assets/app-plugin/microsoft-office-2016.png", driveUrl: "https://drive.google.com/file/d/1taN07G3llEt_nGwxIRCD2ojQauIkwSNF/view?usp=sharing", cover: "linear-gradient(145deg,#ff758c,#ff7eb3 30%,#4a1828 60%,#111)", description: "Bộ ứng dụng văn phòng cơ bản, hoạt động ổn định cho cấu hình máy vừa và nhẹ." },
      { id: "app-office365", title: "Microsoft Office 365", shortTitle: "Office 365", image: "assets/app-plugin/microsoft-office-365.png", driveUrl: "https://drive.google.com/file/d/1WF5EPaqWQFvjoaMvkQ-nWQ5IRdbux3da/view?usp=drive_link", cover: "linear-gradient(145deg,#ff6a00,#ee0979 30%,#4a1020 60%,#111)", description: "Bộ ứng dụng văn phòng (Word, Excel, PowerPoint) tích hợp đám mây và cập nhật liên tục." },
      { id: "app-winrar", title: "WinRAR", shortTitle: "WinRAR", image: "assets/app-plugin/winrar.png", driveUrl: "https://drive.google.com/file/d/155DVLRbGqPpzRwPjgrTEqLRe45W90agk/view?usp=sharing", cover: "linear-gradient(145deg,#00c6ff,#0072ff 30%,#1a365d 60%,#111)", description: "Nén và giải nén tệp tin (RAR, ZIP) nhanh chóng và tối ưu dung lượng." }
    ]
  }
};

const resourceItems = [
  { id: 1, title: "Preset Ảnh", shortTitle: "Preset\nẢnh", category: "preset", categoryLabel: "Preset Ảnh", price: "3 thư mục", format: "LR · DNG · XMP", description: "Bấm để xem các thư mục Preset Lightroom tone film, wedding, du lịch.", cover: "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)", kind: "group", group: "preset", image: "" },
  { id: 2, title: "LUT Màu Video", shortTitle: "LUT\nMàu Video", category: "lut", categoryLabel: "LUT Màu Video", price: "2 thư mục", format: "CapCut · CUBE · LUT", description: "Bấm để xem 2 thư mục: LUT CapCut & LUT Màu Tổng Hợp (30+ bộ).", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)", kind: "group", group: "lut", image: "" },
  { id: 3, title: "FX Video — Hiệu Ứng", shortTitle: "FX\nVideo", category: "fx", categoryLabel: "FX Video", price: "5 thư mục", format: "Overlay · Background · Lưới · Chữ", description: "Bấm để xem các thư mục hiệu ứng & background.", cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)", kind: "group", group: "fx", image: "" },
  { id: 4, title: "Âm Thanh", shortTitle: "Âm Thanh", category: "sound", categoryLabel: "Âm Thanh", price: "7 thư mục", format: "WAV · MP3 · SFX", description: "Bấm để xem các thư mục âm thanh.", cover: "linear-gradient(145deg,#cfd9df,#e2ebf0 28%,#5b5b5b 58%,#111)", kind: "group", group: "sound", image: "" },
  { id: 5, title: "App + Plugin", shortTitle: "App +\nPlugin", category: "app", categoryLabel: "App + Plugin", price: "13 phần mềm", format: "EXE · ZIP · TOOL", description: "Bấm để xem các công cụ, phần mềm & plugin thiết yếu.", cover: "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)", kind: "group", group: "app", image: "" },
];

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Menu và điều hướng
  const header = $("#siteHeader");
  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  const closeMenu = () => {
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  $$("a", menu).forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => innerWidth > 800 && closeMenu(), { passive: true });
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 24), { passive: true });

  if ("IntersectionObserver" in window) {
    const navLinks = $$('a[href^="#"]', menu);
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.hash === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55%" });

    $$("main section[id]").forEach(section => navObserver.observe(section));
  }

  // Bộ đếm thống kê
  const stats = $(".stats");
  let counted = false;

  const animateStats = () => {
    if (counted) return;
    counted = true;

    $$("[data-count]").forEach(element => {
      const target = Number(element.dataset.count);
      const start = performance.now();

      const tick = now => {
        const progress = Math.min((now - start) / 1000, 1);
        element.textContent = Math.floor(target * (1 - (1 - progress) ** 3));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  };

  if (stats && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      animateStats();
      statsObserver.disconnect();
    }, { threshold: .3 });
    statsObserver.observe(stats);
  } else {
    animateStats();
  }

  // Danh mục tài nguyên
  const grid = $("#resourceGrid");
  const filters = $("#filterList");
  const search = $("#resourceSearch");
  const empty = $("#catalogEmpty");
  const dialog = $("#resourceDialog");
  const dialogFields = {
    cover: $("#dialogCover"),
    category: $("#dialogCategory"),
    title: $("#dialogTitle"),
    description: $("#dialogDescription"),
    format: $("#dialogFormat"),
    price: $("#dialogPrice")
  };

  let activeFilter = "preset";
  let keyword = "";
  let currentGroup = "preset";

  const renderResources = () => {
    const query = keyword.trim().toLocaleLowerCase("vi");

    const breadcrumb = document.getElementById("resourceBreadcrumb");
    if (breadcrumb) {
      if (!currentGroup) {
        breadcrumb.innerHTML = "";
        breadcrumb.hidden = true;
      } else {
        const g = resourceGroups[currentGroup];
        breadcrumb.hidden = false;
        breadcrumb.innerHTML = `<strong>${g.title}</strong>`;
      }
    }

    // Trong nhóm: thẻ con giữ form cũ — cover tiêu đề góc dưới + dải đen, body có mô tả. Bấm title/cover là mở Drive.
    if (currentGroup) {
      const g = resourceGroups[currentGroup];
      let children = g.children.filter(c => !query || c.title.toLocaleLowerCase("vi").includes(query));
      if (currentGroup === "app") {
        children = [...children].sort((a, b) => a.title.localeCompare(b.title, "vi", { sensitivity: "base" }));
      }
      grid.innerHTML = children.map(c => `
        <article class="resource-card is-child" data-category="${g.category}" data-group="${currentGroup}">
          <a class="resource-cover" href="${c.driveUrl}" target="_blank" rel="noopener" style="--cover:${c.cover}" aria-label="${c.title}">
            ${c.image ? `<img src="${c.image}" alt="${c.title}" loading="lazy">` : ""}
            <h3>${(c.shortTitle || c.title).replace(/\s*\n\s*/g, " ")}</h3>
          </a>
          <div class="resource-body">
            <p>${c.description || ""}</p>
            <a class="resource-btn" href="${c.driveUrl}" target="_blank" rel="noopener">Tải ngay <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      `).join("");
      empty.hidden = children.length > 0;
      if (!children.length) empty.textContent = "Không tìm thấy mục con.";
      return;
    }

    // Ngoài: 3 thẻ cha giữ form cũ. Bấm title/cover là vào trong.
    const items = resourceItems.filter(item => {
      const matchesCategory = item.category === activeFilter;
      const searchable = `${item.title} ${item.categoryLabel} ${item.description}`.toLocaleLowerCase("vi");
      return matchesCategory && (!query || searchable.includes(query));
    });

    grid.innerHTML = items.map(item => `
      <article class="resource-card is-group" data-group="${item.group}">
        <div class="resource-cover" data-group="${item.group}" role="button" tabindex="0" style="--cover:${item.cover}" aria-label="${item.title}">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ""}
          <h3>${item.shortTitle.replace(/\s*\n\s*/g, " ")}</h3>
        </div>
        <div class="resource-body">
          <h3><a href="#" data-group="${item.group}">${item.title}</a></h3>
          <p>${item.description}</p>
          <button class="resource-btn" type="button" data-group="${item.group}">Tải ngay <span aria-hidden="true">↗</span></button>
        </div>
      </article>
    `).join("");

    empty.hidden = items.length > 0;
    empty.textContent = "Chưa có tài nguyên phù hợp.";
  };

  const openDialog = item => {
    dialogFields.cover.style.background = item.cover;
    dialogFields.category.textContent = item.categoryLabel;
    dialogFields.title.textContent = item.title;
    dialogFields.description.textContent = item.description;
    dialogFields.format.textContent = item.format;
    dialogFields.price.textContent = item.price;
    const dlgLink = document.getElementById("dialogContact");
    if (dlgLink && item.driveUrl) {
      dlgLink.href = item.driveUrl;
      dlgLink.target = "_blank";
      dlgLink.rel = "noopener";
      dlgLink.querySelector("span").textContent = item.driveLabel || "Mở Drive ↗";
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("dialog-open");
  };

  const closeDialog = () => {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  };

  // Cập nhật số lượng thư mục hiển thị trên từng nhóm (ví dụ: "6 thư mục")
  const updateResourceCounts = () => {
    Object.keys(resourceGroups).forEach(cat => {
      const g = resourceGroups[cat];
      const it = resourceItems.find(item => item.group === cat);
      if (it && g && Array.isArray(g.children)) {
        it.price = `${g.children.length} thư mục`;
      }
    });
  };

  // Chuẩn hóa tên danh mục từ Sheet (chấp nhận cả tiếng Anh & tiếng Việt)
  const normalizeCategory = raw => {
    const s = String(raw || "").trim().toLowerCase();
    if (s.includes("preset")) return "preset";
    if (s.includes("lut")) return "lut";
    if (s.includes("fx") || s.includes("hiệu ứng")) return "fx";
    if (s.includes("sound") || s.includes("âm thanh") || s.includes("sfx")) return "sound";
    if (s.includes("app") || s.includes("plugin") || s.includes("phần mềm") || s.includes("ứng dụng")) return "app";
    return "";
  };

  // Tự động chuyển link Google Drive sang định dạng ảnh trực tiếp
  const formatResourceImage = raw => {
    if (!raw) return "";
    const s = String(raw).trim().replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
    if (!s) return "";
    const m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m && m[1]) {
      return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;
    }
    return s;
  };

  const defaultCategoryCover = cat => {
    switch (cat) {
      case "preset": return "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)";
      case "lut": return "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)";
      case "fx": return "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)";
      case "sound": return "linear-gradient(145deg,#cfd9df,#e2ebf0 28%,#5b5b5b 58%,#111)";
      case "app": return "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)";
      default: return "linear-gradient(145deg,#333,#111)";
    }
  };

  const parseCSVRows = csvText => {
    const lines = csvText.split(/\r?\n/);
    const rows = [];
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      const cells = [];
      let cur = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          if (inQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (c === ',' && !inQuotes) {
          cells.push(cur.trim());
          cur = "";
        } else {
          cur += c;
        }
      }
      cells.push(cur.trim());
      rows.push(cells);
    }
    return rows;
  };

  const loadResourcesFromSheet = async () => {
    if (!RESOURCE_SHEETS || !RESOURCE_SHEETS.length) return;

    const tryFetch = async url => {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.text();
    };

    let hasAnyUpdate = false;

    for (const sheetCfg of RESOURCE_SHEETS) {
      const sheetId = typeof sheetCfg === "string" ? sheetCfg : sheetCfg.id;
      const defaultCat = (typeof sheetCfg === "object" && sheetCfg.defaultCategory) || "sound";
      if (!sheetId) continue;

      const gidParam = (sheetCfg.gid !== undefined && sheetCfg.gid !== null) ? `&gid=${sheetCfg.gid}` : "";
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
      const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;

      let csv = "";
      try { csv = await tryFetch(gvizUrl); }
      catch {
        try { csv = await tryFetch(exportUrl); }
        catch (e) {
          console.warn(`Không thể tải Google Sheet ${sheetId}, dùng dữ liệu dự phòng:`, e);
          continue;
        }
      }

      const rows = parseCSVRows(csv);
      if (!rows.length) continue;

      // Nhận diện cột linh hoạt từ dòng tiêu đề
      const headerRow = rows[0].map(h => String(h || "").toLowerCase().trim());
      const colTitle = headerRow.findIndex(h => h.includes("tiêu đề") || h.includes("title") || h.includes("tên"));
      const colDesc = headerRow.findIndex(h => h.includes("mô tả") || h.includes("chức năng") || h.includes("description"));
      const colLink = headerRow.findIndex(h => h.includes("link") || h.includes("url") || h.includes("tải"));
      const colThumb = headerRow.findIndex(h => h.includes("thumb") || h.includes("ảnh") || h.includes("hình") || h.includes("image"));
      const colCat = headerRow.findIndex(h => h.includes("danh mục") || h.includes("category") || h.includes("nhóm"));

      const isHeader = colTitle >= 0 || colDesc >= 0 || colLink >= 0;
      const startIndex = isHeader ? 1 : 0;

      for (let i = startIndex; i < rows.length; i++) {
        const row = rows[i];
        if (!row.some(cell => cell.trim())) continue;

        let title = "";
        let driveUrl = "";
        let image = "";
        let description = "";
        let cat = defaultCat;

        if (isHeader) {
          if (colTitle >= 0 && row[colTitle]) title = row[colTitle].trim();
          if (colDesc >= 0 && row[colDesc]) description = row[colDesc].trim();
          if (colLink >= 0 && row[colLink]) driveUrl = row[colLink].trim();
          if (colThumb >= 0 && row[colThumb]) image = formatResourceImage(row[colThumb]);
          if (colCat >= 0 && row[colCat]) {
            const parsedCat = normalizeCategory(row[colCat]);
            if (parsedCat) cat = parsedCat;
          }
        } else {
          // Fallback dạng không có header
          title = (row[0] || "").trim();
          driveUrl = (row[1] || "").trim();
          image = formatResourceImage(row[2]);
          description = (row[3] || "").trim();
        }

        if (!title) continue;

        // Phân loại tự động nếu chưa có danh mục rõ ràng
        if (!cat || !resourceGroups[cat]) {
          const lower = (title + " " + description).toLowerCase();
          if (lower.includes("preset")) cat = "preset";
          else if (lower.includes("lut")) cat = "lut";
          else if (lower.includes("fx") || lower.includes("hiệu ứng") || lower.includes("background") || lower.includes("lưới")) cat = "fx";
          else if (lower.includes("app") || lower.includes("plugin") || lower.includes("office") || lower.includes("tool") || lower.includes("winrar")) cat = "app";
          else cat = defaultCat;
        }

        if (!resourceGroups[cat]) cat = defaultCat;

        const existingIdx = resourceGroups[cat].children.findIndex(
          c => (driveUrl && c.driveUrl === driveUrl) || c.title.toLowerCase() === title.toLowerCase()
        );

        const sheetItem = {
          id: `${cat}-sheet-${sheetId.substring(0, 4)}-${i}`,
          title,
          shortTitle: title,
          driveUrl,
          image: image,
          cover: defaultCategoryCover(cat),
          description
        };

        if (existingIdx >= 0) {
          const oldItem = resourceGroups[cat].children[existingIdx];
          resourceGroups[cat].children[existingIdx] = {
            ...oldItem,
            ...sheetItem,
            image: oldItem.image || sheetItem.image
          };
        } else {
          resourceGroups[cat].children.push(sheetItem);
        }
        hasAnyUpdate = true;
      }
    }

    if (hasAnyUpdate) {
      if (resourceGroups.app && Array.isArray(resourceGroups.app.children)) {
        resourceGroups.app.children.sort((a, b) => a.title.localeCompare(b.title, "vi", { sensitivity: "base" }));
      }
      updateResourceCounts();
      renderResources();
    }
  };

  renderResources();
  loadResourcesFromSheet();

  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeFilter = button.dataset.filter;
    $$("[data-filter]", filters).forEach(item => {
      item.classList.toggle("active", item === button);
    });
    currentGroup = activeFilter; renderResources();
  });

  if (search) {
    search.addEventListener("input", () => {
      keyword = search.value;
      renderResources();
    });
  }

  grid.addEventListener("click", event => {
    const titleLink = event.target.closest('h3 a[data-group]');
    if (titleLink) {
      event.preventDefault();
      currentGroup = titleLink.dataset.group;
      renderResources();
      document.getElementById("resourceGrid")?.scrollIntoView({behavior:"smooth", block:"start"});
      return;
    }
    if (event.target.closest("a.resource-card, .resource-cover[href], .resource-body h3 a[href^=\"https://\"]")) return;
    const card = event.target.closest("[data-group].resource-cover, [data-group].resource-card");
    const g = card?.dataset?.group || event.target.closest("[data-group]")?.dataset?.group;
    if (!g) return;
    currentGroup = g;
    renderResources();
    document.getElementById("resourceGrid")?.scrollIntoView({behavior:"smooth", block:"start"});
  });
  grid.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest?.("[data-group]");
    if (!card?.dataset?.group) return;
    event.preventDefault();
    currentGroup = card.dataset.group;
    renderResources();
  });

  document.getElementById("resourceBreadcrumb")?.addEventListener("click", e=>{
    const b = e.target.closest("[data-action]");
    if (!b) return;
    if (b.dataset.action==="back") { currentGroup=activeFilter || "preset"; renderResources(); }
  });

  $("#dialogClose").addEventListener("click", closeDialog);
  $("#dialogContact").addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => event.target === dialog && closeDialog());
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

  // Biểu mẫu liên hệ
  const form = $("#contactForm");
  const submit = $("#submitButton");
  const status = $("#formStatus");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    submit.disabled = true;
    status.textContent = "Đang gửi thông tin...";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });
      if (!response.ok) throw new Error();

      form.reset();
      status.textContent = "Đã gửi thành công. Xuân Giáp Media sẽ phản hồi sớm!";
    } catch {
      status.textContent = "Chưa gửi được. Vui lòng gọi hoặc nhắn Zalo trực tiếp.";
    } finally {
      submit.disabled = false;
    }
  });

  // Bộ lọc dự án nổi bật (Video / Photo / Social) & Nút Xem thêm dự án
  const projectFilterContainer = $("#projectFilterList");
  const btnViewMore = $("#btnViewMoreProjects");
  const viewMoreWrapper = $("#viewMoreProjectsWrapper");
  const projectCards = document.querySelectorAll(".featured-card");

  if (projectFilterContainer) {
    const projectFilterBtns = projectFilterContainer.querySelectorAll(".filter-btn");
    let currentFilter = "video";
    let isExpanded = false;

    const updateProjectsDisplay = () => {
      let extraMatchingCount = 0;

      projectCards.forEach(card => {
        const cat = card.dataset.category;
        const isExtra = card.classList.contains("is-extra");
        const matchesFilter = (currentFilter === "all" || cat === currentFilter);

        if (!matchesFilter) {
          card.style.display = "none";
          return;
        }

        if (isExtra) {
          extraMatchingCount++;
          if (isExpanded) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        } else {
          card.style.display = "";
        }
      });

      // Ẩn nút nếu danh mục không có thẻ bổ sung nào
      if (viewMoreWrapper) {
        viewMoreWrapper.style.display = extraMatchingCount > 0 ? "" : "none";
      }

      // Cập nhật trạng thái và nhãn nút bấm
      if (btnViewMore) {
        btnViewMore.setAttribute("aria-expanded", String(isExpanded));
        const btnText = btnViewMore.querySelector(".btn-text");
        if (isExpanded) {
          if (btnText) btnText.textContent = "THU GỌN DỰ ÁN";
        } else {
          if (btnText) btnText.textContent = "XEM THÊM DỰ ÁN";
        }
      }
    };

    projectFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        projectFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter || "video";
        isExpanded = false; // Thu gọn về mặc định khi chuyển tab
        updateProjectsDisplay();
      });
    });

    if (btnViewMore) {
      btnViewMore.addEventListener("click", () => {
        isExpanded = !isExpanded;
        updateProjectsDisplay();

        // Khi bấm thu gọn, cuộn nhẹ về đầu mục Dự án để người dùng dễ theo dõi
        if (!isExpanded) {
          const featuredSection = document.getElementById("san-pham-noi-bat");
          if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    }

    const activeBtn = projectFilterContainer.querySelector(".filter-btn.active") || projectFilterBtns[0];
    if (activeBtn) {
      currentFilter = activeBtn.dataset.filter || "video";
    }
    updateProjectsDisplay();
  }

  $("#currentYear").textContent = new Date().getFullYear();
});

