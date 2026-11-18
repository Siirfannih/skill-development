# After Effects (alat, dipakai bila diminta atau diperlukan)

After Effects bukan jalur bawaan. Jalur bawaan build video adalah Remotion dan rakit lego (`claude/motion-graphic/references/build.md`). Pakai After Effects hanya bila:
- Irfan memintanya (mis. ia ingin file `.aep` yang bisa ia buka dan setel sendiri), atau
- adegannya butuh hal yang di Remotion tidak tercapai setara: animator teks 3D per huruf dengan kamera AE, motion blur asli AE, atau melanjutkan proyek `.aep` yang sudah ada.

Mutu, gaya, dan cara menilai tetap sama dengan jalur lain: `LANTAI.md`, kartu kiblat, dan `templates/roles/pemeriksa-frame.md`. AE hanya ada di Mac; perintah AE, Homebrew, dan aerender dijalankan di mesin itu.

## Pipeline

**After Effects 2026 lewat ExtendScript** (terbukti di Tuntunly v13–v14). Kelebihannya: animator teks 3D per huruf, kamera AE, motion blur asli, easing influence, dan `.aep` yang bisa Irfan buka dan setel sendiri.
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

## Snippet ExtendScript

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
