/* CAST — "Digital Design Workspace" stickers. 100% SVG, deterministik.
   Tiga karakter orisinal berupa objek di workspace desain:
     KLIK  — kursor panah biru  (si eksekutor: gerak duluan, gampang panik)
     NOTE  — sticky note lime   (si teknis: kalem, mencatat, kadang pusing)
     NODI  — anchor pen-tool hitam dengan dua handle bezier sebagai tangan (si idealis: melayang, ekspresif)
   Gaya: papercut sticker — outline putih + drop-shadow halus + serat kertas, sudut tajam, tanpa kilap.

   API: <div class="cast" data-cast="klik|note|nodi" data-opt='{...}' style="left;top;width"></div>
   opt: eyes  "dot"|"wide"|"happy"|"line"|"tiny"|"dizzy"|"squeeze"   (default "dot")
        brow  angka derajat (+ marah, - cemas)          look  [dx,dy] geser pupil (px viewBox)
        arms  [kiri,kanan] derajat (0 = turun, 90 = horizontal keluar, 180 = ke atas; negatif = ke dalam)
        tilt  derajat rotasi badan   squash [sx,sy]   flip true = cermin horizontal   sweat true
   viewBox 0 0 240 260, titik pijak kaki di y≈236 (NODI melayang, bawah badan y≈176).
   Lebar elemen = skala; tinggi otomatis (rasio 240:260). */
(function () {
  const INK = "#141518", WHITE = "#FFFFFF";
  const C = {
    klik: { base: "#2563EB", dark: "#163E9E", light: "#4F86F5" },
    note: { base: "#B5F52A", dark: "#7FB012", light: "#CBFA6A", fold: "#93CC1C" },
    nodi: { base: "#141518", dark: "#000000", light: "#2A2C31", handle: "#2563EB" },
  };

  const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <filter id="cast-paper" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" seed="4" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.06  0 0 -0.8 0 0.36" result="g"/>
      <feComposite in="g" in2="SourceAlpha" operator="in" result="gi"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gi"/></feMerge>
    </filter>
    <filter id="cast-sticker" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d"/>
      <feFlood flood-color="#FFFFFF"/><feComposite in2="d" operator="in" result="outline"/>
      <feGaussianBlur in="d" stdDeviation="7" result="b"/><feOffset in="b" dy="9" result="bo"/>
      <feFlood flood-color="#2A1C0E" flood-opacity=".22"/><feComposite in2="bo" operator="in" result="sh"/>
      <feMerge><feMergeNode in="sh"/><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs></svg>`;

  const rr = (x, y, w, h, r, f, ex = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
  const limb = (px, py, w, h, ang, f) => `<g transform="rotate(${ang} ${px} ${py})">${rr(px - w / 2, py - w / 2, w, h, 3, f)}</g>`;

  // mata: sclera putih + pupil (badan gelap/biru) atau titik tinta (badan terang)
  function eyes(o, pts, mode) {
    const st = o.eyes || "dot", [dx, dy] = o.look || [0, 0];
    let s = "";
    pts.forEach(([x, y], i) => {
      const side = i === 0 ? -1 : 1;
      if (mode === "dark" && !["happy", "line", "dizzy", "squeeze"].includes(st)) {
        const r = st === "wide" ? 15 : st === "tiny" ? 12 : 13;
        s += `<ellipse cx="${x}" cy="${y}" rx="${r - 2}" ry="${r + 1}" fill="${WHITE}"/>`;
      }
      const px = x + dx, py = y + dy;
      const stroke = mode === "dark" ? WHITE : INK;
      if (st === "dot") s += `<ellipse cx="${px}" cy="${py}" rx="6" ry="8" fill="${INK}"/>`;
      else if (st === "wide") s += `<ellipse cx="${px}" cy="${py}" rx="7" ry="9.5" fill="${INK}"/><rect x="${px + side - 1.5}" y="${py - 6}" width="3.4" height="3.4" fill="#fff"/>`;
      else if (st === "tiny") s += `<rect x="${px - 3}" y="${py - 3}" width="6" height="6" fill="${INK}"/>`;
      else if (st === "happy") s += `<path d="M${x - 10} ${y + 4} L${x} ${y - 6} L${x + 10} ${y + 4}" fill="none" stroke="${stroke}" stroke-width="5.5" stroke-linecap="square"/>`;
      else if (st === "line") s += rr(x - 11, y - 2.5, 22, 5, 0, stroke);
      else if (st === "squeeze") s += `<path d="M${x - 8 * side} ${y - 8} L${x + 6 * side} ${y} L${x - 8 * side} ${y + 8}" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="square"/>`;
      else if (st === "dizzy") s += i === 0
        ? `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="${stroke}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="2.5" fill="${stroke}"/>`
        : `<path d="M${x - 8} ${y - 8} L${x + 8} ${y + 8} M${x + 8} ${y - 8} L${x - 8} ${y + 8}" stroke="${stroke}" stroke-width="4.5" stroke-linecap="square"/>`;
      if (o.brow != null) {
        const a = o.brow * (i === 0 ? 1 : -1);
        s += `<g transform="rotate(${a} ${x} ${y - 22})">${rr(x - 12, y - 25, 24, 6, 0, stroke)}</g>`;
      }
    });
    return s;
  }

  const sweat = (x, y) => `<path transform="translate(${x} ${y})" d="M0 -16 L10 2 A10.5 10.5 0 1 1 -10 2 Z" fill="#7CC4FF"/>`;

  // papercut: underlayer (tebal kertas) + layer utama
  const paper = (sil, depth = 7) => `<g transform="translate(0 ${depth})">${sil(true)}</g>${sil(false)}`;

  // ---------------- KLIK (kursor) ----------------
  function klik(o) {
    const P = C.klik, [aL, aR] = o.arms || [20, 20];
    const body = "M62 18 L62 196 L104 160 L132 222 L166 207 L139 148 L196 148 Z";
    const sil = (u) => `
      ${limb(58, 120, 18, 44, aL, u ? P.dark : P.base)}${limb(150, 124, 18, 44, -aR, u ? P.dark : P.base)}
      ${rr(66, 190, 20, 40, 3, P.dark)}${rr(134, 212, 20, 22, 3, P.dark)}
      <path d="${body}" fill="${u ? P.dark : P.base}"/>
      ${u ? "" : `<path d="M62 18 L196 148 L170 148 L62 44 Z" fill="${P.light}"/>`}`;
    return paper(sil) + eyes(o, [[88, 118], [118, 128]], "dark") + (o.sweat ? sweat(54, 70) : "");
  }

  // ---------------- NOTE (sticky note) ----------------
  function note(o) {
    const P = C.note, [aL, aR] = o.arms || [16, 16];
    const sq = "M50 52 L190 52 L190 160 L158 192 L50 192 Z";
    const sil = (u) => `
      ${limb(50, 132, 18, 46, aL, u ? P.dark : P.base)}${limb(190, 132, 18, 46, -aR, u ? P.dark : P.base)}
      ${rr(82, 190, 20, 44, 3, P.dark)}${rr(138, 190, 20, 44, 3, P.dark)}
      <path d="${sq}" fill="${u ? P.dark : P.base}"/>
      ${u ? "" : `<path d="M158 192 L158 160 L190 160 Z" fill="${P.fold}"/>
        <g stroke="${P.dark}" stroke-width="2.5" opacity=".55"><line x1="66" y1="160" x2="140" y2="160"/><line x1="66" y1="176" x2="128" y2="176"/></g>
        <rect x="96" y="38" width="48" height="22" fill="#FFFFFF" opacity=".72" transform="rotate(-4 120 49)"/>`}`;
    return paper(sil) + eyes(o, [[100, 112], [140, 112]], "light") + (o.sweat ? sweat(196, 64) : "");
  }

  // ---------------- NODI (anchor pen-tool) ----------------
  function nodi(o) {
    const P = C.nodi, [aL, aR] = o.arms || [70, 70];
    const handle = (px, py, ang, u) => `<g transform="rotate(${ang} ${px} ${py})">
        <rect x="${px - 2.5}" y="${py}" width="5" height="62" fill="${u ? "#0E2A6B" : P.handle}"/>
        <circle cx="${px}" cy="${py + 66}" r="11" fill="${u ? "#0E2A6B" : WHITE}" stroke="${u ? "#0E2A6B" : P.handle}" stroke-width="5"/></g>`;
    const sil = (u) => `
      ${handle(70, 120, aL, u)}${handle(170, 120, -aR, u)}
      ${rr(70, 70, 100, 100, 6, u ? P.dark : P.base)}
      ${u ? "" : rr(80, 80, 80, 80, 3, P.light)}`;
    return paper(sil, 6) + eyes(o, [[103, 118], [137, 118]], "dark") + (o.sweat ? sweat(176, 72) : "");
  }

  const BUILD = { klik, note, nodi };

  function render(el) {
    const kind = el.dataset.cast, o = el.dataset.opt ? JSON.parse(el.dataset.opt) : {};
    let inner = BUILD[kind](o);
    if (o.squash) inner = `<g transform="translate(120 236) scale(${o.squash[0]} ${o.squash[1]}) translate(-120 -236)">${inner}</g>`;
    const flip = o.flip ? "translate(240 0) scale(-1 1)" : "";
    el.innerHTML = `<svg viewBox="0 0 240 260" width="100%" style="display:block;overflow:visible">
      <g filter="url(#cast-sticker)"><g filter="url(#cast-paper)"><g transform="${flip} rotate(${o.tilt || 0} 120 200)">${inner}</g></g></g></svg>`;
  }

  document.body.insertAdjacentHTML("afterbegin", defs);
  document.querySelectorAll("[data-cast]").forEach(render);
  window.CAST = { render };
})();
