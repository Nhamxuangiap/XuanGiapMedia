"use strict";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/sweetkid2909@gmail.com";

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
      {
        id: "preset-prs-2025",
        title: "PRS 2025",
        shortTitle: "PRS 2025",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1iJdS4CswnQEkEkAQ7FSVdXeXL1ikCcdd/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)",
        description: "Bộ preset Lightroom & Camera Raw tổng hợp 2025."
      },
      {
        id: "preset-ndk",
        title: "NDK Preset",
        shortTitle: "NDK Preset",
        image: "",
        driveUrl: "https://drive.google.com/file/d/19q04egsyZr5rVi1p9BJn9Og7w88nUAQJ/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#a1c4fd,#c2e9fb 30%,#3a4a6b 58%,#111)",
        description: "Bộ màu preset NDK chuyên nghiệp cho ảnh chân dung & phong cảnh."
      },
      {
        id: "preset-hp-premium",
        title: "PresetHP Premium",
        shortTitle: "PresetHP Premium",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1pRI39bDSe-u-A7bC0S9uQySL9cb2A8-c/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#6b3a2a 55%,#111)",
        description: "Gói preset PresetHP Premium cao cấp dành cho nhiếp ảnh gia."
      },
      {
        id: "preset-phong-su-cuoi-tmv",
        title: "Phóng Sự Cưới - TMV",
        shortTitle: "Phóng Sự Cưới - TMV",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1A2gAOS3-l0TUikDWZRnoDgQMl4JRtkTt/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#ff758c,#ff7eb3 30%,#4a1828 60%,#111)",
        description: "Bộ màu phóng sự cưới TMV trong trẻo, sang trọng và giàu cảm xúc."
      },
      {
        id: "preset-dien-anh-co-dien",
        title: "Màu điện ảnh cổ điển",
        shortTitle: "Màu điện ảnh cổ điển",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1gomB96xlSX4d-KL_ZqsrQ_SfvQgQ-8yj/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#fddb92,#d1fdff 30%,#5b5b5b 60%,#111)",
        description: "Tone màu cinematic vintage cổ điển mang phong cách điện ảnh."
      },
      {
        id: "preset-tong-hop-prs",
        title: "Tổng Hợp PRS",
        shortTitle: "Tổng Hợp PRS",
        image: "",
        driveUrl: "https://drive.google.com/file/d/12HAFidZPqRG6rDcjf7v8gymHMpKTD0j9/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)",
        description: "Tổng hợp đầy đủ các preset đa dụng cho nhiều thể loại chụp."
      },
      {
        id: "preset-film-zunphoto",
        title: "Màu Film ZunPhoto",
        shortTitle: "Màu Film ZunPhoto",
        image: "",
        driveUrl: "https://drive.google.com/file/d/15J6M_dy8_1aMMYCIbQAnIdw2HAvUBWsW/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#3b4b60 60%,#111)",
        description: "Tone màu film đặc trưng phong cách ZunPhoto nghệ thuật và hoài niệm."
      },
      {
        id: "preset-ky-yeu-a-vu",
        title: "BỘ MÀU KỈ YẾU A vũ",
        shortTitle: "BỘ MÀU KỈ YẾU A vũ",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1XMlwNWJzClyx63MbwWFPCO-xobZWMbiF/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#30cfd0,#330867 30%,#151030 60%,#111)",
        description: "Bộ màu chụp ảnh kỷ yếu học sinh, sinh viên tươi sáng và năng động."
      },
      {
        id: "preset-100-chan-dung",
        title: "100 Preset chân dung",
        shortTitle: "100 Preset chân dung",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1SabfV0QdtffY-IgbHgZU_tUNZPrLrxkN/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#4facfe,#00f2fe 30%,#103550 60%,#111)",
        description: "Trọn bộ 100 preset làm đẹp da, cân bằng sáng chuyên cho chụp chân dung."
      },
      {
        id: "preset-mau-tiec",
        title: "MÀU TIỆC",
        shortTitle: "MÀU TIỆC",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1cKdqcLlOxkB1fEB8UuQob8cBVEH0OGvL/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#ff9966,#ff5e62 30%,#5a2020 60%,#111)",
        description: "Bộ màu chụp tiệc sự kiện, tiệc cưới với ánh sáng ấm cúng, nổi bật chủ thể."
      },
      {
        id: "preset-400-anh-cuoi",
        title: "400 preset ảnh cưới",
        shortTitle: "400 preset ảnh cưới",
        image: "",
        driveUrl: "https://drive.google.com/file/d/15K7-UkROTBXgY2XLLnyIpR8ULgDEdAoz/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#fbc2eb,#a6c1ee 30%,#3b4b60 60%,#111)",
        description: "Bộ 400 preset chuyên dụng cho ảnh cưới, tiệc và phóng sự cưới."
      },
      {
        id: "preset-minh-quang-bui",
        title: "MinhQuangBui_Preset.xmp",
        shortTitle: "MinhQuangBui Preset",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1gS5Lqxr_9t4EnijerY-lL0TyCQAjwQNC/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)",
        description: "Bộ preset định dạng XMP phong cách Minh Quang Bùi cho Lightroom & ACR."
      },
      {
        id: "preset-tuho-psc-premium",
        title: "PRESET TUHO PSC PREMIUM",
        shortTitle: "TUHO PSC PREMIUM",
        image: "",
        driveUrl: "https://drive.google.com/file/d/1tAPxb4HRDKZH8ZG4469PNy5u0woccvnP/view?usp=drivesdk",
        cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)",
        description: "Gói preset TuHo phóng sự cưới Premium sang trọng và trong trẻo."
      }
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
      { id: "fx-text-capcut", title: "Text FX CapCut", shortTitle: "Text FX CapCut", image: "assets/Mẫu8.png", driveUrl: "https://drive.google.com/drive/folders/1A6h-5iVi0T0noG9tiZmNdNGvIq9OjYLW?usp=sharing", cover: "linear-gradient(145deg,#e0c3fc,#8ec5fc 30%,#5b5b5b 60%,#111)", description: "Bộ hiệu ứng text animation cho capcut. Bản quyền thuộc Bảo Dạy Edit" }
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
    image: "assets/app-plugin/app-cover.png",
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
      { id: "app-voice-ai", title: "Phần mềm tạo Voice AI", shortTitle: "Tạo Voice AI", image: "assets/app-plugin/voice-ai.png", driveUrl: "https://drive.google.com/file/d/1KIjs_61FarZnuEpgJ90KG-TAhXjz8Xt5/view?usp=sharing", cover: "linear-gradient(145deg,#30cfd0,#330867 30%,#151030 60%,#111)", description: "Chuyển văn bản tiếng Việt thành giọng nói tự nhiên, nhanh chóng và dễ sử dụng trên máy tính." },
      { id: "app-winrar", title: "WinRAR", shortTitle: "WinRAR", image: "assets/app-plugin/winrar.png", driveUrl: "https://drive.google.com/file/d/155DVLRbGqPpzRwPjgrTEqLRe45W90agk/view?usp=sharing", cover: "linear-gradient(145deg,#00c6ff,#0072ff 30%,#1a365d 60%,#111)", description: "Nén và giải nén tệp tin (RAR, ZIP) nhanh chóng và tối ưu dung lượng." }
    ]
  }
};

const resourceItems = [
  { id: 1, title: "Preset Ảnh", shortTitle: "PRESET ẢNH", category: "preset", categoryLabel: "Preset Ảnh", price: "13 tệp tin", format: "LR · DNG · XMP", description: "Bấm để xem 13 bộ Preset Lightroom: tone film, wedding, du lịch, kỷ yếu, chân dung, ảnh cưới...", cover: "linear-gradient(145deg,#ff9a9e,#fecfef 30%,#8a4b3a 55%,#111)", kind: "group", group: "preset", image: "" },
  { id: 2, title: "LUT Màu Video", shortTitle: "LUT MÀU VIDEO", category: "lut", categoryLabel: "LUT Màu Video", price: "2 thư mục", format: "CapCut · CUBE · LUT", description: "Bấm để xem 2 thư mục: LUT CapCut & LUT Màu Tổng Hợp (30+ bộ).", cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)", kind: "group", group: "lut", image: "" },
  { id: 3, title: "FX Video — Hiệu Ứng", shortTitle: "FX VIDEO", category: "fx", categoryLabel: "FX Video", price: "5 thư mục", format: "Overlay · Background · Lưới · Chữ", description: "Bấm để xem các thư mục hiệu ứng & background.", cover: "linear-gradient(145deg,#a8edea,#fed6e3 30%,#6b6b6b 58%,#111)", kind: "group", group: "fx", image: "" },
  { id: 4, title: "Âm Thanh", shortTitle: "ÂM THANH", category: "sound", categoryLabel: "Âm Thanh", price: "7 thư mục", format: "WAV · MP3 · SFX", description: "Bấm để xem các thư mục âm thanh.", cover: "linear-gradient(145deg,#cfd9df,#e2ebf0 28%,#5b5b5b 58%,#111)", kind: "group", group: "sound", image: "" },
  { id: 5, title: "App + Plugin", shortTitle: "APP + PLUGIN", category: "app", categoryLabel: "App + Plugin", price: "14 phần mềm", format: "EXE · ZIP · TOOL", description: "Bấm để xem các công cụ, phần mềm & plugin thiết yếu.", cover: "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)", kind: "group", group: "app", image: "assets/app-plugin/app-cover.png" },
];

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Menu Sidebar và điều hướng 5 mục (Tham chiếu ZunPhoto)
  const sidebar = $("#siteSidebar");
  const backdrop = $("#sidebarBackdrop");
  const menuBtn = $("#menuToggle");
  const closeBtn = $("#sidebarClose");
  const navMenu = $("#mainNav");

  const openMenu = () => {
    if (sidebar) sidebar.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    if (menuBtn) {
      menuBtn.classList.add("open");
      menuBtn.setAttribute("aria-expanded", "true");
    }
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    if (menuBtn) {
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("menu-open");
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = sidebar && sidebar.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  window.addEventListener("keydown", event => {
    if (event.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  }, { passive: true });

  // Điều hướng 5 mục & Submenu Dự Án và Tài Nguyên (Tham chiếu ZunPhoto)
  const sidebarLinks = $$(".sidebar-link", sidebar);

  // Submenu Tài Nguyên
  const submenuItem = $("#sidebarResourcesItem");
  const submenuToggle = $("#sidebarSubmenuToggle");
  const resourcesParentLink = $("#sidebarResourcesLink");

  // Submenu Dự Án
  const projectsSubmenuItem = $("#sidebarProjectsItem");
  const projectsSubmenuToggle = $("#sidebarProjectsToggle");
  const projectsParentLink = $("#sidebarProjectsLink");

  // Nút mũi tên riêng của Tài Nguyên: mở/thu gọn submenu mà không thay đổi nội dung đang xem
  if (submenuToggle) {
    submenuToggle.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
      const isExpanded = submenuToggle.getAttribute("aria-expanded") === "true";
      submenuToggle.setAttribute("aria-expanded", String(!isExpanded));
      if (submenuItem) submenuItem.classList.toggle("open", !isExpanded);
    });
  }

  // Nút mũi tên riêng của Dự Án: mở/thu gọn submenu mà không thay đổi nội dung đang xem
  if (projectsSubmenuToggle) {
    projectsSubmenuToggle.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
      const isExpanded = projectsSubmenuToggle.getAttribute("aria-expanded") === "true";
      projectsSubmenuToggle.setAttribute("aria-expanded", String(!isExpanded));
      if (projectsSubmenuItem) projectsSubmenuItem.classList.toggle("open", !isExpanded);
    });
  }

  // Bấm chữ "Dự Án": mở submenu, cuộn đến #san-pham-noi-bat
  if (projectsParentLink) {
    projectsParentLink.addEventListener("click", event => {
      event.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove("active"));
      projectsParentLink.classList.add("active");
      if (projectsSubmenuItem) projectsSubmenuItem.classList.add("open");
      if (projectsSubmenuToggle) projectsSubmenuToggle.setAttribute("aria-expanded", "true");
      const targetSec = document.getElementById("san-pham-noi-bat");
      if (targetSec) targetSec.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    });
  }

  // Bấm các link cấp 1 khác (Giới Thiệu, Dịch Vụ, Liên Hệ)
  sidebarLinks.forEach(link => {
    if (link.id === "sidebarResourcesLink" || link.id === "sidebarProjectsLink") return;
    link.addEventListener("click", () => {
      sidebarLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      closeMenu();
    });
  });

  // Bấm chữ "Tài Nguyên": mở submenu, hiển thị cấp tổng quan gồm 5 thư mục mẹ, cuộn đến #tai-nguyen
  if (resourcesParentLink) {
    resourcesParentLink.addEventListener("click", event => {
      event.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove("active"));
      resourcesParentLink.classList.add("active");
      if (submenuItem) submenuItem.classList.add("open");
      if (submenuToggle) submenuToggle.setAttribute("aria-expanded", "true");
      selectResourceView(null, true);
      closeMenu();
    });
  }

  // Bấm danh mục con Tài Nguyên trong sidebar: hiển thị ngay tài nguyên thuộc danh mục đó
  $$("#sidebarResourcesSubmenu .sidebar-sublink").forEach(sublink => {
    sublink.addEventListener("click", event => {
      event.preventDefault();
      const groupKey = sublink.dataset.resourceGroup;
      if (groupKey && resourceGroups[groupKey]) {
        selectResourceView(groupKey, true);
        closeMenu();
      }
    });
  });

  // Bấm các trang con của Dự Án trong sidebar: đóng menu drawer
  $$("#sidebarProjectsSubmenu .sidebar-sublink").forEach(sublink => {
    sublink.addEventListener("click", () => {
      closeMenu();
    });
  });

  if ("IntersectionObserver" in window) {
    const sectionIds = ["gioi-thieu", "san-pham-noi-bat", "tai-nguyen", "dich-vu", "lien-he"];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.id;
        sidebarLinks.forEach(link => {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === `#${currentId}`);
        });
      });
    }, { rootMargin: "-25% 0px -45%", threshold: 0.1 });

    sections.forEach(section => navObserver.observe(section));
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
  } else if (stats) {
    animateStats();
  }

  // Bộ đếm lượt truy cập website thực tế (Lưu lượt truy cập online thực tế khi click vào link)
  const initVisitorCounter = () => {
    const counterEl = document.getElementById("visitorCountVal");
    if (!counterEl) return;

    const CACHE_KEY = "xg_real_visitor_count";
    const SESSION_KEY = "xg_real_session_counted";
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);

    // Hiển thị ngay số đã lưu trong cache (nếu có) để giao diện không bị giật
    let currentDisplay = parseInt(localStorage.getItem(CACHE_KEY), 10);
    if (!isNaN(currentDisplay) && currentDisplay > 0) {
      counterEl.textContent = currentDisplay.toLocaleString("vi-VN");
    } else {
      counterEl.textContent = "1";
    }

    // Hiệu ứng tăng số mượt mà
    const animateTo = targetVal => {
      if (typeof targetVal !== "number" || isNaN(targetVal)) return;
      const startVal = parseInt(counterEl.textContent.replace(/\./g, "").replace(/,/g, ""), 10) || 0;
      if (startVal === targetVal) {
        counterEl.textContent = targetVal.toLocaleString("vi-VN");
        return;
      }
      const duration = 1000;
      const startTime = performance.now();
      const frame = now => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const cur = Math.floor(startVal + (targetVal - startVal) * (1 - (1 - progress) ** 3));
        counterEl.textContent = cur.toLocaleString("vi-VN");
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          counterEl.textContent = targetVal.toLocaleString("vi-VN");
        }
      };
      requestAnimationFrame(frame);
    };

    // Gọi API đếm lượt truy cập toàn cầu thực tế (lưu trữ trực tuyến cho tất cả mọi người click vào web)
    const recordAndFetchCount = async () => {
      const action = isNewSession ? "hit" : "get";
      let count = null;

      // 1. Thử dịch vụ Abacus API
      try {
        const res = await fetch(`https://abacus.jasoncameron.dev/${action}/xuangiapmedia.vn/total_visits`, {
          cache: "no-store"
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value === "number") {
            count = data.value;
          }
        }
      } catch (e) {
        // Fallback sang endpoint dự phòng
      }

      // 2. Dự phòng: CountAPI API
      if (count === null) {
        try {
          const endpoint = isNewSession
            ? "https://countapi.mileshilliard.com/api/v1/hit/xuangiapmedia_total_visits"
            : "https://countapi.mileshilliard.com/api/v1/get/xuangiapmedia_total_visits";
          const res = await fetch(endpoint, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data && typeof data.value === "number") {
              count = data.value;
            }
          }
        } catch (e) {
          // Xử lý khi offline
        }
      }

      if (count !== null && count > 0) {
        sessionStorage.setItem(SESSION_KEY, "true");
        localStorage.setItem(CACHE_KEY, String(count));
        animateTo(count);
      } else {
        // Nếu không có mạng hoặc API gặp sự cố, tăng đếm cục bộ đảm bảo luôn hiển thị
        let localTotal = parseInt(localStorage.getItem(CACHE_KEY), 10) || 1;
        if (isNewSession) {
          localTotal += 1;
          sessionStorage.setItem(SESSION_KEY, "true");
          localStorage.setItem(CACHE_KEY, String(localTotal));
        }
        animateTo(localTotal);
      }
    };

    recordAndFetchCount();
  };

  initVisitorCounter();

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

  let activeFilter = "all";
  let keyword = "";
  let currentGroup = null;
  let currentAppFolder = null; // null: 2 thư mục | "apps": danh sách phần mềm | "plugins": danh sách plugin rỗng
  // Danh sách plugin trong mục Plugin (từ Google Drive)
  const pluginItems = [
    {
      id: "plugin-ae",
      title: "Plugin AE",
      shortTitle: "Plugin AE",
      image: "assets/app-plugin/Plugin ae.png",
      driveUrl: "https://drive.google.com/drive/folders/1hz-nD2wbJOsM6Oay3_7OM6r9jMrEpCjZ?usp=sharing",
      cover: "linear-gradient(145deg,#9999ff,#00005b 35%,#121035 65%,#111)",
      description: "Trọn bộ plugin After Effects: Saber, Trapcode Suite, VFX Suite, FXConsole, Camera Shake, Maskit...",
      btnText: "Mở thư mục"
    },
    {
      id: "plugin-pr",
      title: "Plugin PR",
      shortTitle: "Plugin PR",
      image: "assets/app-plugin/plugin pr.png",
      driveUrl: "https://drive.google.com/drive/folders/1PIK8ZuZP6Sl3XgOMLEavXO5H_dvIBUuA?usp=sharing",
      cover: "linear-gradient(145deg,#ea77ff,#330033 35%,#220625 65%,#111)",
      description: "Trọn bộ plugin Premiere Pro: Film Impact, Mocha Pro, Beauty Box, Transitions Pack, Motion Presets...",
      btnText: "Mở thư mục"
    },
    {
      id: "plugin-pts",
      title: "Plugin PTS",
      shortTitle: "Plugin PTS",
      image: "assets/app-plugin/plugin pts.png",
      driveUrl: "https://drive.google.com/drive/folders/1TJki0vyvOJW_Y9OHXd7qZkg7wnCqusK4?usp=sharing",
      cover: "linear-gradient(145deg,#31a8ff,#001e36 35%,#051525 65%,#111)",
      description: "Bảng điều khiển retouch làm đẹp da, action blend màu, Sadesign Panel, TMV Color cho Photoshop...",
      btnText: "Mở thư mục"
    },
    {
      id: "plugin-highres-lut",
      title: "Highres Samples Pointecc CC-LUT",
      shortTitle: "Pointecc CC-LUT",
      image: "",
      driveUrl: "https://drive.google.com/file/d/13djW2CaD52XBu_14ofdbKwe9Gcl-2r2A/view?usp=sharing",
      cover: "linear-gradient(145deg,#f6d365,#fda085 28%,#8a4b3a 55%,#111)",
      description: "Tệp ZIP (.zip) — Bộ LUT màu cao cấp và tài nguyên mẫu phân giải cao hỗ trợ hiệu chỉnh màu sắc.",
      btnText: "Tải ngay"
    },
    {
      id: "plugin-rit-art",
      title: "RIT ART 2023 ONE CLICK",
      shortTitle: "RIT ART 2023",
      image: "",
      driveUrl: "https://drive.google.com/file/d/1iq2gqYh_spPfeHF0FsiIZidt9DBudYbA/view?usp=sharing",
      cover: "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)",
      description: "Tệp RAR (.rar) — Công cụ hậu kỳ ảnh nghệ thuật One-Click nhanh chóng, làm đẹp nước ảnh chuyên nghiệp.",
      btnText: "Tải ngay"
    }
  ];

  // Hàm chuyển đổi trạng thái hiển thị tài nguyên đồng bộ giữa Sidebar, Filter, Card mẹ và Breadcrumb
  function selectResourceView(groupKey, shouldScroll = false, appFolder = null) {
    const validKeys = Object.keys(resourceGroups);
    const isValid = groupKey && validKeys.includes(groupKey);

    const submenuItem = $("#sidebarResourcesItem");
    const submenuToggle = $("#sidebarSubmenuToggle");
    const parentLink = $("#sidebarResourcesLink");
    const sublinks = $$(".sidebar-sublink", sidebar);

    if (isValid) {
      currentGroup = groupKey;
      activeFilter = groupKey;

      if (groupKey === "app") {
        currentAppFolder = appFolder;
      } else {
        currentAppFolder = null;
      }

      if (filters) {
        $$("[data-filter]", filters).forEach(btn => {
          btn.classList.toggle("active", btn.dataset.filter === groupKey);
        });
      }

      if (submenuItem) submenuItem.classList.add("open");
      if (submenuToggle) submenuToggle.setAttribute("aria-expanded", "true");
      if (parentLink) parentLink.classList.add("active");

      sublinks.forEach(link => {
        link.classList.toggle("active", link.dataset.resourceGroup === groupKey);
      });
    } else {
      currentGroup = null;
      currentAppFolder = null;
      activeFilter = "all";

      if (filters) {
        $$("[data-filter]", filters).forEach(btn => btn.classList.remove("active"));
      }

      if (parentLink) parentLink.classList.add("active");
      sublinks.forEach(link => link.classList.remove("active"));
    }

    renderResources();

    if (shouldScroll) {
      const section = document.getElementById("tai-nguyen");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function renderResources() {
    const query = keyword.trim().toLocaleLowerCase("vi");

    const breadcrumb = document.getElementById("resourceBreadcrumb");
    if (breadcrumb) {
      if (!currentGroup || !resourceGroups[currentGroup]) {
        breadcrumb.innerHTML = "";
        breadcrumb.hidden = true;
      } else if (currentGroup === "app") {
        breadcrumb.hidden = false;
        if (currentAppFolder === "apps") {
          breadcrumb.innerHTML = `
            <button class="breadcrumb-link" type="button" data-action="back-to-overview" aria-label="Quay lại danh mục Tài Nguyên">Tài Nguyên</button>
            <span class="breadcrumb-sep">/</span>
            <button class="breadcrumb-link" type="button" data-action="back-to-app-folders" aria-label="Quay lại App + Plugin">App + Plugin</button>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">App</span>
          `;
        } else if (currentAppFolder === "plugins") {
          breadcrumb.innerHTML = `
            <button class="breadcrumb-link" type="button" data-action="back-to-overview" aria-label="Quay lại danh mục Tài Nguyên">Tài Nguyên</button>
            <span class="breadcrumb-sep">/</span>
            <button class="breadcrumb-link" type="button" data-action="back-to-app-folders" aria-label="Quay lại App + Plugin">App + Plugin</button>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">Plugin</span>
          `;
        } else {
          breadcrumb.innerHTML = `
            <button class="breadcrumb-link" type="button" data-action="back-to-overview" aria-label="Quay lại danh mục Tài Nguyên">Tài Nguyên</button>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">App + Plugin</span>
          `;
        }
      } else {
        const g = resourceGroups[currentGroup];
        breadcrumb.hidden = false;
        breadcrumb.innerHTML = `
          <button class="breadcrumb-link" type="button" data-action="back-to-overview" aria-label="Quay lại danh sách thư mục">Tài Nguyên</button>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">${g.title}</span>
        `;
      }
    }

    // Xử lý riêng danh mục "App + Plugin" có cấp 2 thư mục: App và Plugin
    if (currentGroup === "app") {
      // Cấp 1 trong App + Plugin: 2 card thư mục "App" và "Plugin"
      if (currentAppFolder === null) {
        const appCount = (resourceGroups.app && Array.isArray(resourceGroups.app.children))
          ? resourceGroups.app.children.length
          : 0;

        const subFolders = [
          {
            folderId: "apps",
            title: "App",
            shortTitle: "App",
            image: "assets/app-plugin/app-cover.png",
            price: `${appCount} sản phẩm`,
            description: "Toàn bộ bộ cài phần mềm đồ họa, video và công cụ tiện ích máy tính.",
            cover: "linear-gradient(145deg,#00f2fe,#4facfe 30%,#1b3b5f 60%,#111)"
          },
          {
            folderId: "plugins",
            title: "Plugin",
            shortTitle: "Plugin",
            image: "",
            price: `${pluginItems.length} sản phẩm`,
            description: "Kho plugin & preset mở rộng cho Premiere, After Effects, Photoshop, CapCut.",
            cover: "linear-gradient(145deg,#a18cd1,#fbc2eb 30%,#301f4a 60%,#111)"
          }
        ];

        const filteredFolders = subFolders.filter(f => !query || `${f.title} ${f.description}`.toLocaleLowerCase("vi").includes(query));

        grid.innerHTML = filteredFolders.map(f => `
          <article class="resource-card is-group is-app-folder" data-app-folder="${f.folderId}">
            <div class="resource-cover" data-app-folder="${f.folderId}" role="button" tabindex="0" style="--cover:${f.cover}" aria-label="Mở thư mục ${f.title}">
              ${f.image ? `<img src="${f.image}" alt="${f.title}" loading="lazy">` : ""}
              <span class="resource-folder-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>
              <h3>${f.shortTitle}</h3>
            </div>
            <div class="resource-body">
              <h3><a href="#" data-app-folder="${f.folderId}">${f.title}</a></h3>
              <p>${f.description}</p>
              <button class="resource-btn" type="button" data-app-folder="${f.folderId}">Mở thư mục <span aria-hidden="true">↗</span></button>
            </div>
          </article>
        `).join("");

        empty.hidden = filteredFolders.length > 0;
        if (!filteredFolders.length) empty.textContent = "Không tìm thấy thư mục phù hợp.";
        return;
      }

      // Cấp 2: Thư mục "App" - hiển thị toàn bộ phần mềm hiện có
      if (currentAppFolder === "apps") {
        const g = resourceGroups.app;
        let children = g.children.filter(c => !query || c.title.toLocaleLowerCase("vi").includes(query));
        children = [...children].sort((a, b) => a.title.localeCompare(b.title, "vi", { sensitivity: "base" }));

        grid.innerHTML = children.map(c => `
          <article class="resource-card is-child" data-category="app" data-group="app">
            <a class="resource-cover" href="${c.driveUrl}" target="_blank" rel="noopener" style="--cover:${c.cover}" aria-label="${c.title}">
              ${c.image ? `<img src="${c.image}" alt="${c.title}" loading="lazy">` : ""}
              <h3>${(c.shortTitle || c.title).replace(/\s*\n\s*/g, " ")}</h3>
            </a>
            <div class="resource-body">
              <p>${c.description || ""}</p>
              <a class="resource-btn" href="${c.driveUrl}" target="_blank" rel="noopener">${c.btnText || "Tải ngay"} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        `).join("");

        empty.hidden = children.length > 0;
        if (!children.length) empty.textContent = "Không tìm thấy phần mềm phù hợp.";
        return;
      }

      // Cấp 2: Thư mục "Plugin" - danh sách rỗng
      if (currentAppFolder === "plugins") {
        let plugins = pluginItems.filter(p => !query || p.title.toLocaleLowerCase("vi").includes(query));
        if (plugins.length === 0) {
          grid.innerHTML = `
            <div class="empty-plugin-state">
              <div class="empty-plugin-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                </svg>
              </div>
              <p class="empty-plugin-text">Chưa có plugin nào được tải lên.</p>
              <button type="button" class="btn-back-app-plugin" data-action="back-to-app-folders">
                ← Quay lại App + Plugin
              </button>
            </div>
          `;
          empty.hidden = true;
          return;
        }

        grid.innerHTML = plugins.map(c => `
          <article class="resource-card is-child" data-category="app" data-group="app">
            <a class="resource-cover" href="${c.driveUrl}" target="_blank" rel="noopener" style="--cover:${c.cover}" aria-label="${c.title}">
              ${c.image ? `<img src="${c.image}" alt="${c.title}" loading="lazy">` : ""}
              <h3>${(c.shortTitle || c.title).replace(/\s*\n\s*/g, " ")}</h3>
            </a>
            <div class="resource-body">
              <p>${c.description || ""}</p>
              <a class="resource-btn" href="${c.driveUrl}" target="_blank" rel="noopener">${c.btnText || "Tải ngay"} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        `).join("");
        empty.hidden = true;
        return;
      }
    }

    // Các nhóm khác: preset, lut, fx, sound
    if (currentGroup && resourceGroups[currentGroup]) {
      const g = resourceGroups[currentGroup];
      let children = g.children.filter(c => !query || c.title.toLocaleLowerCase("vi").includes(query));
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

    // Cấp tổng quan: hiển thị đủ 5 card thư mục mẹ từ resourceItems
    const items = resourceItems.filter(item => {
      const matchesCategory = activeFilter === "all" || item.category === activeFilter;
      const searchable = `${item.title} ${item.categoryLabel} ${item.description}`.toLocaleLowerCase("vi");
      return matchesCategory && (!query || searchable.includes(query));
    });

    const OVERVIEW_TITLES = {
      preset: "PRESET ẢNH",
      lut: "LUT MÀU VIDEO",
      fx: "FX VIDEO",
      sound: "ÂM THANH",
      app: "APP + PLUGIN"
    };

    grid.innerHTML = items.map(item => {
      const coverTitle = OVERVIEW_TITLES[item.group] || (item.shortTitle || item.title).toUpperCase();
      return `
        <article class="resource-card is-group is-overview-folder" data-group="${item.group}">
          <div class="resource-cover" data-group="${item.group}" role="button" tabindex="0" style="--cover:${item.cover}" aria-label="${item.title}">
            ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ""}
            <h3>${coverTitle}</h3>
          </div>
          <div class="resource-body">
            <p>${item.description}</p>
            <button class="resource-btn" type="button" data-group="${item.group}">Mở thư mục <span aria-hidden="true">↗</span></button>
          </div>
        </article>
      `;
    }).join("");

    empty.hidden = items.length > 0;
    empty.textContent = "Chưa có tài nguyên phù hợp.";
  }

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
          if (colLink >= 0 && row[colLink]) {
            const rawLink = row[colLink].trim();
            if (/^https?:\/\//i.test(rawLink)) {
              driveUrl = rawLink;
            }
          }
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
            driveUrl: sheetItem.driveUrl || oldItem.driveUrl,
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

  if (filters) {
    filters.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      const cat = button.dataset.filter;
      if (cat && resourceGroups[cat]) {
        selectResourceView(cat, false);
      }
    });
  }

  if (search) {
    search.addEventListener("input", () => {
      keyword = search.value;
      renderResources();
    });
  }

  if (grid) {
    grid.addEventListener("click", event => {
      // 1. Cho phép link tải và cover của card con mở tab mới bình thường, không re-render
      if (event.target.closest("a.resource-cover[href], a.resource-btn[href], a[target='_blank']")) {
        return;
      }

      // 2. Nút quay lại từ thông báo của thư mục Plugin
      const backAppBtn = event.target.closest("[data-action='back-to-app-folders']");
      if (backAppBtn) {
        event.preventDefault();
        selectResourceView("app", true, null);
        return;
      }

      // 3. Card thư mục cấp con trong App + Plugin (App / Plugin)
      const folderEl = event.target.closest("[data-app-folder]");
      if (folderEl) {
        const folderId = folderEl.dataset.appFolder;
        if (folderId === "apps" || folderId === "plugins") {
          event.preventDefault();
          selectResourceView("app", true, folderId);
          return;
        }
      }

      // 4. Card mẹ cấp 5 nhóm (Preset, LUT, FX, Sound, App)
      const groupEl = event.target.closest("[data-group]");
      if (groupEl) {
        const groupKey = groupEl.dataset.group;
        if (groupKey && resourceGroups[groupKey]) {
          event.preventDefault();
          selectResourceView(groupKey, true, null);
        }
      }
    });

    grid.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("a[href]")) return;

      const backAppBtn = event.target.closest("[data-action='back-to-app-folders']");
      if (backAppBtn) {
        event.preventDefault();
        selectResourceView("app", true, null);
        return;
      }

      const folderEl = event.target.closest("[data-app-folder]");
      if (folderEl) {
        const folderId = folderEl.dataset.appFolder;
        if (folderId === "apps" || folderId === "plugins") {
          event.preventDefault();
          selectResourceView("app", true, folderId);
          return;
        }
      }

      const groupEl = event.target.closest("[data-group]");
      if (groupEl) {
        const groupKey = groupEl.dataset.group;
        if (groupKey && resourceGroups[groupKey]) {
          event.preventDefault();
          selectResourceView(groupKey, true, null);
        }
      }
    });
  }

  const breadcrumbEl = document.getElementById("resourceBreadcrumb");
  if (breadcrumbEl) {
    breadcrumbEl.addEventListener("click", e => {
      const backToOverview = e.target.closest("[data-action='back-to-overview'], [data-action='back']");
      if (backToOverview) {
        e.preventDefault();
        selectResourceView(null, true);
        return;
      }

      const backToAppFolders = e.target.closest("[data-action='back-to-app-folders']");
      if (backToAppFolders) {
        e.preventDefault();
        selectResourceView("app", true, null);
      }
    });
  }

  $("#dialogClose").addEventListener("click", closeDialog);
  $("#dialogContact").addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => event.target === dialog && closeDialog());
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

  // Biểu mẫu liên hệ sản xuất dự án
  const form = $("#contactForm");
  const submit = $("#submitButton");
  const status = $("#formStatus");

  if (form) {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (!submit) return;

      const originalBtnHtml = submit.innerHTML;
      submit.disabled = true;
      submit.style.opacity = "0.75";
      submit.style.cursor = "wait";
      submit.innerHTML = `<span>ĐANG GỬI YÊU CẦU...</span><b>⏳</b>`;

      if (status) {
        status.className = "form-status is-loading";
        status.textContent = "Đang gửi thông tin dự án về email...";
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        const resData = await response.json().catch(() => ({}));

        if (response.ok && (resData.success === "true" || resData.success === true || response.status === 200)) {
          form.reset();
          if (status) {
            status.className = "form-status is-success";
            status.innerHTML = `<strong>✓ Gửi thành công!</strong> Xuân Giáp Media đã nhận được thông tin dự án qua email và sẽ liên hệ tư vấn, báo giá cho bạn trong thời gian sớm nhất.`;
          }
        } else {
          throw new Error(resData.message || "Lỗi gửi biểu mẫu");
        }
      } catch (err) {
        console.warn("Gửi qua FormSubmit AJAX gặp sự cố:", err);
        if (status) {
          status.className = "form-status is-error";
          status.innerHTML = `⚠️ Chưa thể kết nối máy chủ gửi tự động. Vui lòng liên hệ trực tiếp qua Hotline/Zalo: <a href="tel:0886636338" style="color:#fff;text-decoration:underline;font-weight:700">0886 636 338</a> hoặc gửi email về <a href="mailto:sweetkid2909@gmail.com" style="color:#fff;text-decoration:underline">sweetkid2909@gmail.com</a>.`;
        }
      } finally {
        submit.disabled = false;
        submit.style.opacity = "";
        submit.style.cursor = "";
        submit.innerHTML = originalBtnHtml;
      }
    });
  }

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

  // Xử lý cuộn chính xác đến section theo hash (đặc biệt khi quay lại #san-pham-noi-bat từ trang dự án con)
  const scrollToHashSection = (smooth = true) => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace(/^#/, "");
      const targetSec = document.getElementById(hashId);
      if (targetSec) {
        // Đồng bộ trạng thái active của menu sidebar
        if (hashId === "san-pham-noi-bat") {
          const pLink = document.getElementById("sidebarProjectsLink");
          const pItem = document.getElementById("sidebarProjectsItem");
          document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
          if (pLink) pLink.classList.add("active");
          if (pItem) pItem.classList.add("open");
        }
        targetSec.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      }
    }
  };

  setTimeout(() => scrollToHashSection(true), 120);
  window.addEventListener("load", () => {
    setTimeout(() => scrollToHashSection(false), 60);
  });
});

