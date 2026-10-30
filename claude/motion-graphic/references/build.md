---
status: principle
scope: motion
how_to_use: "Muat saat membangun adegan. Cuplikan teknis, bukan kriteria gaya."
---

# Build — After Effects & engine kode

Baca saat mulai build atau menulis ExtendScript/expression. Nomor § sama dengan motion-director v3 agar rujukan lama tetap berlaku.

## Isi

- 3. Alat & pipeline produksi
- 17. Snippet After Effects

## 3. Alat & pipeline produksi

**Versi Remotion (dicek 25 Okt 2026):** proyek baru memakai Remotion ≥ 4.0.475 (terbaru 4.0.538). Sejak 4.0.475 Studio bisa mengedit keyframe dan props langsung, jadi Irfan bisa menyetel timing sendiri. Proyek Jadisatu lama masih 4.0.380. Saat upgrade, pakai skill `external/remotion-skills/skills/remotion-upgrade`. Resep motion blur, teks, dan kamera ada di `smooth-motion.md`.

**Default: After Effects 2026 lewat ExtendScript** (terbukti di Tuntunly v13–v14). Alasannya: animator teks 3D per huruf, kamera AE, motion blur asli, easing influence, dan `.aep` yang bisa Irfan buka dan setel sendiri.
- **Struktur**:
  - `engine.jsx`: helper, mengikuti kontrak `ENGINE-CONTRACT.md` v14
  - `beats-*.jsx`: satu fungsi `beatNN()` per beat, semua angka frame lokal beat
  - `master.jsx`: merangkai, pre/post-roll 12 f, menangani transisi
  - satu tabel beat di awal; mengubah durasi satu beat tidak boleh memaksa angka di beat lain berubah
- **Helper inti**:
  - layer: `tx`, `rect`, `ell`, `poly`, `curve`, `img`, `prop`
  - animasi: `rise`, `pop`, `slam`, `exit`, `key(... 'snappy'|'smooth'|'accelerate')`
  - kamera: `cam`, `camCut`, `shake`
  - transisi: `transition(type)`
  - audit SFX: `sfxAction(frame, layer, desc)`, mencatat setiap aksi yang butuh bunyi
- **Build**: buka AE, tunggu `Scripting.plugin` termuat (cek `lsof`), lalu `osascript ... DoScriptFile`.
  - **Jangan menimpa proyek AE yang sedang terbuka**: simpan dulu, lalu build di proyek baru.
  - Build wajib gagal bila font tidak ditemukan (`app.fonts` / `fontOK`).
- **Render**: `aerender` per potongan (`render-chunks.sh`), karena aerender kadang mati di render panjang tanpa menulis moov.
- Device_bash bukan Mac. Perintah AE, Homebrew, dan aerender dijalankan lewat Desktop Commander.

**Engine kode (canvas + three.js, `window.seek(t)` deterministik)** dipakai untuk dunia 3D (ruang pixel Irfan, kamera 3D, low-poly) dan plate yang sulit dibuat di AE.
- Render: Playwright → JPEG → ffmpeg; di Mac pakai Chrome for Testing + metal.
- **Hibrida yang dianjurkan**: engine merender plate dunia tanpa teks naratif, AE membangun teks, UI, kamera 2D dan transisi di atasnya.
- Semua aturan desain di file ini berlaku untuk kedua jalur.
- Kontrak render deterministik:
  - tidak ada `Math.random` (pakai seed)
  - tidak ada state antar frame
  - font dimuat eksplisit sebelum render (`document.fonts.load`); kalau tidak, teks hilang di frame pertama worker
  - cek determinisme sekali per proyek: dua render frame yang sama harus identik
- Rincian engine yang terbukti jalan:
  - WebGL headless: `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader`, `preserveDrawingBuffer:true`
  - timing digerakkan timestamp kata VO (`words.js`)
  - motion blur: 5–6 subframe dalam shutter 180°, dirata-rata di linear light
  - **teks di belakang tokoh**: gambar teks di kanvas 2D, lalu potong dengan siluet sprite (`globalCompositeOperation='destination-out'`)
  - **teks di dunia 3D**: posisi dihitung dari titik layar yang dipilih (unproject di kamera tengah-shot) supaya pasti terlihat dan tidak saling tumpuk; skala slam diputar di pusat kata
- Perakitan/edit akhir boleh di invideo (MCP) atau ekspor ke Premiere/DaVinci. Kredit AI invideo hanya untuk generate.

**Audio:** mixer Python. Peta audio dibuat dengan librosa + Demucs (§2). Opsional: ekspor sesi REAPER `.RPP` dari `cues.json` supaya Irfan bisa menggeser SFX sendiri.

**Transfer cloud ↔ Mac:**
- Pakai nama file baru setiap kirim; nama yang sama bisa terkirim versi lama.
- Verifikasi `shasum`. Untuk FLAC: `ffmpeg -f md5`.
- Ekstrak lewat shell host, karena VM tidak bisa menghapus/menimpa.
- Kirim patch kecil bila hanya beberapa file berubah.
- Simpan proyek di `~/Documents/<Proyek>` + `PROJECT_STATE.md`.

Aset gambar: generate lewat Codex/ChatGPT di Mac.
- Sprite pose: latar hijau `#00FF00`, lalu di-key.
- Plate: "dinding saja, tanpa objek utama, tanpa teks".

---

## 17. Snippet After Effects

```javascript
// Teks dengan font role (PostScript name)
function addText(comp, str, font, sizePx, rgb, pos) {
  var l = comp.layers.addText(str), p = l.property("Source Text"), td = p.value;
  td.font = font; td.fontSize = sizePx; td.fillColor = rgb; td.applyFill = true;
  td.justification = ParagraphJustification.LEFT_JUSTIFY; p.setValue(td);
  l.property("Position").setValue(pos); return l;
}
// Easing snappy: key awal out 15 %, key akhir in 90 %
function easeSnappy(prop, k1, k2) {
  var dims = (prop.propertyValueType == PropertyValueType.TwoD_SPATIAL || prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL) ? 1 : (prop.value instanceof Array ? prop.value.length : 1);
  function arr(inf){ var a=[]; for (var i=0;i<dims;i++) a.push(new KeyframeEase(0, inf)); return a; }
  prop.setTemporalEaseAtKey(k1, arr(33), arr(15)); prop.setTemporalEaseAtKey(k2, arr(90), arr(33));
}
// Rig kamera null
var cam = comp.layers.addNull(comp.duration); cam.name = "CAM";
cam.property("Position").setValue([comp.width/2, comp.height/2]);
for (var i = 2; i <= comp.numLayers; i++) { var L = comp.layer(i); if (L.name.indexOf("BG") !== 0 && L.name.indexOf("UI") !== 0) L.parent = cam; }
comp.motionBlur = true; comp.shutterAngle = 180;
// Text Animator per kata (T01); untuk T28 flip-up: layer.threeDLayer = true, aktifkan per-character 3D,
// tambah "ADBE Text Rotation X" (90) + anchor di baseline, Range Based On Words/Characters
var anims = layer.property("ADBE Text Properties").property("ADBE Text Animators");
var a = anims.addProperty("ADBE Text Animator"), props = a.property("ADBE Text Animator Properties");
props.addProperty("ADBE Text Position 3D").setValue([0, 30, 0]);
props.addProperty("ADBE Text Opacity").setValue(0);
var sel = a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
var adv = sel.property("ADBE Text Range Advanced");
adv.property("ADBE Text Range Type2").setValue(3);   // 3 = Words
adv.property("ADBE Text Range Shape").setValue(2);   // 2 = Ramp Up
var off = sel.property("ADBE Text Percent Offset"); off.setValueAtTime(t0, -100); off.setValueAtTime(t0 + 0.6, 100);
```
Jika match name gagal di versi AE tertentu, buat animator manual lalu baca `property(i).matchName`. Satu kata penting = satu layer sendiri.

Expression:
- **Overshoot/inertia**:
  ```javascript
  amp=.06;freq=3;decay=6; n=0; if(numKeys>0){n=nearestKey(time).index; if(key(n).time>time)n--;} t=(n==0)?0:time-key(n).time; if(n>0&&t<1){v=velocityAtTime(key(n).time-thisComp.frameDuration/10); value+v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);} else value;
  ```
- **Impact shake**: `t0=3.2; d=time-t0; d<0?value:wiggle(25,18*Math.exp(-8*d));`
- **Typewriter UI**:
  ```javascript
  cps=30; full=value; n=Math.floor((time-inPoint)*cps); caret=(Math.floor(time*2)%2)?"|":" "; full.substr(0,Math.max(0,n))+caret;
  ```
- **Counter**: `"Rp " + Math.round(effect("Num")("Slider")).toLocaleString("id-ID");` (atau format manual titik ribuan)
