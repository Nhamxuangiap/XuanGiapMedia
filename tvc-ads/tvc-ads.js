"use strict";

/* =========================================================
   TVC & ADS — HUB 2 NHÁNH CON: TVC NGANG & TVC DỌC
   Sheet: https://docs.google.com/spreadsheets/d/1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY/edit
========================================================= */

const SHEET_ID = "1E5dvnU3xtrNjf5P7B1nILpu2AIejsWlMT7RXQ5coikY";
const SHEET1_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
const SHEET2_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=56054377`;
const SHEET2_CSV_NAME = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Trang%20t%C3%ADnh2`;

document.addEventListener("DOMContentLoaded", async () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const menu = $("#mainNav");
  const menuBtn = $("#menuToggle");

  // Menu mobile
  if (menuBtn) {
    menuBtn.onclick = () => {
      const open = menu.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    };
  }
  $$("a", menu || document).forEach(a => a.onclick = () => {
    menu?.classList.remove("open");
    menuBtn?.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
  addEventListener("resize", () => innerWidth > 800 && menu?.classList.remove("open"));

  const yearEl = $("#currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Đếm số lượng từ Sheet 1 (TVC Ngang)
  async function countSheet1() {
    try {
      const r = await fetch(SHEET1_CSV, { cache: "no-store" });
      if (!r.ok) return;
      const csv = await r.text();
      const count = csv.split(/\r?\n/).filter(line => line.trim()).length;
      const tvcCountEl = $("#tvcSheetCount");
      if (tvcCountEl && count > 0) tvcCountEl.textContent = `${count} DỰ ÁN TỪ SHEET 1`;
    } catch {}
  }

  // Đếm số lượng từ Sheet 2 (TVC Dọc)
  async function countSheet2() {
    try {
      let r = await fetch(SHEET2_CSV, { cache: "no-store" });
      if (!r.ok) r = await fetch(SHEET2_CSV_NAME, { cache: "no-store" });
      if (!r.ok) return;
      const csv = await r.text();
      const count = csv.split(/\r?\n/).filter(line => line.trim()).length;
      const docCountEl = $("#tvcDocSheetCount");
      if (docCountEl && count > 0) docCountEl.textContent = `${count} DỰ ÁN TỪ SHEET 2`;
    } catch {}
  }

  countSheet1();
  countSheet2();
});
