# Brief SFX per event visual · v12

## Aturan Irfan (dikoreksi 31 Okt 20:12)
Setiap event visual diskret yang bermakna mendapat SFX sendiri (skill motion-director §14.3, target ≥ 85 %). Event diskret: objek muncul/mendarat, kata kinetik muncul, klik, perubahan state UI, transisi, cut, angka berjalan, kartu menumpuk.

**Setiap SFX wajib punya peran yang jelas.** Untuk setiap cue harus bisa dijawab: "bunyi ini menandai objek/aksi apa di layar, dan kenapa bunyinya seperti ini". Spam dilarang:
- tidak ada bunyi untuk gerak kontinu pelan (drift, push lambat, bob);
- tidak ada dua bunyi untuk satu event;
- tidak ada bunyi tanpa visual.

## Yang sudah ada di mix (jangan digandakan)
Lihat `public/data/cues11.json`:
- boom, whoosh, sweep di batas babak;
- tick di FOUNDER/CEO/SEMALAM (00a/00b/05f);
- tick di enumerasi 02c, 03a, 05c–05g;
- 3 tick agent;
- hiss tekstur.

Event yang sudah punya cue di sana dalam ±0,1 dtk tidak perlu cue baru. Boleh mengusulkan **mengganti** cue lama bila kelasnya salah untuk visualnya; tulis di `replace`.

## Kelas bunyi (bank hangat, sudah dicek: energi 2–6 kHz rendah)
Path dasar `/home/claude/pool/bank/`.

| Kelas | Pakai untuk | File (pilih yang paling cocok, boleh variasi) | dB vs VO | Offset |
|---|---|---|---|---|
| `text_pop` | kata kinetik muncul (rise/pop/flip) | `b_pro_pop_in__round.wav`, `b_pro_pop_in__airy.wav`, `b_pop__2.wav`, `b_ui_pop__soft.wav` | −15 | +0 f di frame kata terlihat |
| `text_slam` | kata slam/besar mendarat | `b_cut_hit__punch.wav` + (opsional) `b_pro_pop_in__deep.wav` | −9 | −1 f, didahului senyap 3–7 f |
| `ui_click` | klik tombol, kirim, chip, toggle | `b_pro_click__mouse.wav`, `b_click__thock.wav`, `b_knock__wood.wav` | −13 | 0 f |
| `ui_pop` | kartu/panel/notif/agent muncul | `b_ui_pop__boop.wav`, `b_ui_pop__wide.wav`, `b_pro_pop_in__double.wav`, `b_pop__0.wav` | −14 | −1…+1 f |
| `type_key` | ketikan di composer (per kata, bukan per huruf) | `b_typing_key__thock.wav`, `b_fit__key__thock.wav`, `b_typing_key__deep.wav` | −16 | 0 f |
| `land_soft` | objek/kartu/tile mendarat | `b_fit__land.light__fingertip_book.wav`, `b_tap__table.wav`, `b_knock__desk.wav` | −12 | di frame mendarat |
| `whoosh_s` | gerak cepat, slide, swap, kursor seret, salip | `b_fit__whoosh.short__bamboo_swish.wav`, `b_cut_hit__air.wav` | −17 | puncak di frame tercepat (`align:"peak"`) |
| `shutter` | ganti foto montase | `b_shutter__film.wav`, `b_shutter__dslr.wav`, `b_shutter__mirror.wav` | −16 | 0 f |
| `paper` | kertas/kartu tugas digeser, masuk Trash | Mixkit (lihat bawah) | −14 | 0 f |
| `step` | langkah piktogram | `b_ui_pop__step.wav` atau Mixkit footsteps | −16 | di kaki menapak |
| `sub_thud` | hantaman cut/pendaratan berat, zoom-through mendarat | `b_cut_hit__sub.wav`, `b_pro_sub_drop__soft.wav`, `b_cut_hit__kick.wav` | −10 | +2 f setelah cut |
| `relay` | lampu/bidang padam atau menyala | `b_toggle__latch.wav` (+LPF 2500) atau `b_knock__wood.wav` | −14 | 0 f |
| `pen` | garis/grafik digambar | Mixkit pen/scratch (lihat bawah) | −18 | sepanjang goresan (`b` = durasi) |
| `riser` | menuju reveal/zoom-through besar | `b_pro_riser__air_gate.wav`, `b_riser__air.wav` | −18 | puncak di landing |

Mixkit: katalog di `/home/claude/sfx_hunt/mixkit_sfx.json` (title, cats). File ada di `/home/claude/sfx_hunt/mk/mk<ID>.mp3`; ID diambil dari URL `.../sfx/<ID>/...`. Cari dengan judul, misalnya paper, page, pen, footsteps, swipe.

Cluster (beberapa elemen muncul bersamaan atau beruntun cepat) memakai satu kelas dengan **nada naik bertahap**: `pitch` dalam semitone, misalnya 0, 2, 4, 7. Jangan berbunyi seperti senapan mesin.

Jarak minimal antar cue 0,08 dtk, dan maksimal 2 lapis di satu frame.

## Output
Tulis `sfx/cues_<kelompok>.json` (array). Kelompok: b1 (01a–02a), b2 (02b–02f), b3 (03a-1–03e), b4 (04a–05b), b5 (05c–05h), b6 (06a–06g). Satu objek per cue:
```json
{"id":"02c_drag1","t":25.42,"class":"whoosh_s","file":"/home/claude/pool/bank/b_fit__whoosh.short__bamboo_swish.wav","db":-17,"lp":5000,"pitch":0,
 "align":"peak","peak":0.12,"a":0,"b":null,"fo":0.05,"panel":"02c","visual":"kursor AI menyeret kartu #1 ke dock","role":"memberi bobot gerak seret"}
```
- `t` = detik absolut. Ambil dari waktu yang dipakai kode adeganmu sendiri, misalnya hitung dengan `word()` atau `panel()` lalu cetak lewat skrip Node/TS kecil. Jangan menebak.
- `lp` default 5000 (wajib ≤ 6000).
- `a`/`b` = trim di file sumber (opsional).
- `peak` = detik puncak dalam file bila `align:"peak"`.

Lampirkan juga `replace` (opsional): array `{"old_id":..., "reason":...}` di field terpisah `sfx/replace_<kelompok>.json`.

**Jangan** mengubah kode visual dan **jangan** merender video. Verifikasi cukup dengan memastikan JSON valid dan setiap cue punya `visual` + `role` yang spesifik.

## Laporan
- Jumlah event diskret di panelmu, berapa yang diberi cue, dan event mana yang sengaja senyap beserta alasannya.
- Daftar `replace` bila ada.
