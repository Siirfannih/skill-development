/* UI runtime kecil & deterministik: menempel kursor Figma ke elemen, lalu menandai halaman siap export.
   <div class="fcursor" data-anchor="#slide-1 .sel" data-corner="tr" data-dx="0" data-dy="0">…</div>
   data-corner: tr | br | tl | bl (pojok elemen anchor tempat ujung panah kursor). */
(function () {
  function place() {
    document.querySelectorAll(".fcursor[data-anchor]").forEach((c) => {
      const a = document.querySelector(c.dataset.anchor);
      const sl = c.closest(".slide");
      if (!a || !sl) return;
      const r = a.getBoundingClientRect(), b = sl.getBoundingClientRect();
      const corner = c.dataset.corner || "tr";
      const x = corner.includes("r") ? r.right : r.left;
      const y = corner.includes("t") ? r.top : r.bottom;
      c.style.left = x - b.left - 4 + (+c.dataset.dx || 0) + "px";
      c.style.top = y - b.top - 6 + (+c.dataset.dy || 0) + "px";
    });
    document.body.dataset.ready = "1";
  }
  document.fonts.ready.then(() => requestAnimationFrame(place));
})();
