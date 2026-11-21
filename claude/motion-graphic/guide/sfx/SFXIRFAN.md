# Katalog `~/sfx/SFXIrfan` (didengar 13 Nov dengan `earshot describe`)

Sumber pertama untuk SFX (Lantai E24), **bukan allowlist**. Kolom Famili menunjuk `FAMILI.md`: bila famili yang dibutuhkan tidak punya file yang lolos dengar di sini, cari per famili (`GUIDE.md` Cara 3). Nama file adalah fungsi yang Irfan tetapkan; kolom "terdengar" adalah label earshot (z ≥ 2,5 = jelas/plausible). Di Mac: `~/Downloads/SFXIrfan`; di PC: `/home/irfan/sfx/SFXIrfan` (alias `~/work/sfx/SFXIrfan`). `sfx_density.py` tetap menolak kayu/woodblock/thock/felt, koin/logam, kartun/langkah kaki, 8-bit, white/pink noise atau sinus sintetis, `rope-creak`, dan bank `sfx_render`. `Lasertransision.mp3` dan `ES_Scifi…Glitch 02` tetap boleh: fungsinya Irfan yang menetapkan.

| File | Famili | Durasi | Terdengar | Pakai untuk |
|---|---|---|---|---|
| `Pergantianfoto.mp3` | `mekanik` | 13,0 dtk | deretan klik (pen/toggle); klik kuat di 0,05 · 1,25 · 2,41 · 6,06 · 7,21 · 9,61 · 10,84 dtk | foto/gambar berganti (potong satu klik), atau rentetan foto/kartu (satu potongan panjang) |
| `Pergantianfoto:gambarpertama.mp3` | `glitch` | 0,8 | error buzz / digital glitch | gambar pertama dari sebuah montase |
| `Katapertama.mp3` | `glitch` | 0,6 | digital glitch / crisp click | kata pertama yang muncul (pembuka teks) |
| `Kinetictypography(gunakansecaraacak).mp3` | `ui` | 1,2 | tick/scroll lembut | kata kunci kinetik berganti — sesekali (nama: "gunakan secara acak"), bukan per kata |
| `Variasitransisiataucut.mp3` | `ui` | 1,2 | sama dengan file di atas | variasi cut |
| `Cut.mp3` | `glitch` | 0,8 | error buzz / glitch | cut tegas |
| `Cutcontrastransision.mp3` | `mekanik` | 0,3 | pen click / key release | cut kontras (terang ↔ gelap) |
| `Woosh.mp3` | `air` | 2,5 | fast/soft air whoosh (dua lintasan: 0–1,1 dtk dan 1,3–2,4 dtk; ±90 % energi < 60 Hz, pelan di speaker HP) | gerak kamera dan transisi (satu lintasan, ekor alami sampai habis) |
| `Lasertransision.mp3` | `stab` | 0,4 | triangle / glass ting | ting penutup, transisi halus |
| `Scanning dan gerak kurva.mp3` | `glitch` | 2,4 | digital glitch / stutter | garis/kurva bergerak, scan |
| `basmenyebar.mp3` | `impact` | 6,3 | deep cinematic boom / sub | judul, jawaban hook, puncak |
| `documenter.mp3` | `taktil` | 16,6 | kertas/kain bergemerisik (kepakan kuat ±3,1 dtk) | foto/cetakan kertas mendarat, dokumen |
| `Move.mp3` | `impact` | 4,4 | thud / impact | benda besar mendarat |
| `Enter.mp3` | `mekanik` | 0,2 | key press tegas | tombol kirim/Enter/klik penting |
| `Keyboardtyping.mp3` | `mekanik` | 10,1 | keyboard typing fast | teks diketik (potong sesuai panjang teks) |
| `pop up.mp3` | `ui` | 0,3 | bubble pop | kartu/post muncul |
| `Notif.mp3` | `ui` | 0,7 | beep / water drop | notifikasi |
| `Popup user interface : AI.mp3` | `ui` | 1,1 | triangle / success chime | popup AI |
| `ResponAI:AIpopup.mp3` | `ui` | 2,1 | kalimba / success chime | respons AI muncul |
| `Reggaesoundpembuka-…mp3` | — (musik) | 110 | musik | pembuka (awalnya saja, sebelum piano) |
| `ES_Designed, Riser, Transition, Fast, Short, Clean 01` | `riser` | 4,4 | reverse cymbal / riser | menuju twist/jawaban (`align: peak`) |
| `ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz` | `impact` | 3,6 | sub bass drop | twist, punchline |
| `ES_Swooshes, Whoosh, Big, Cinematic` | `air` | 3,5 | whoosh besar | whip pan |
| `ES_User Interface, Glitch, Glitch Databend 04` | `glitch` | 2,2 | digital glitch | transisi mosaik/glitch antarbabak |
| `ES_Scifi, Computer, Short Beeps, Glitch 02` | `glitch` | 0,8 | glitch beep | UI sci-fi |
| `ES_User Interface, Click, Pops, Glass, UI, Pops` | `ui` | 0,7 | glass ting / kalimba | like, pop lembut |
| `ES_User Interface, Click, UI Buttons, Confirm, Menu` | `ui` | 0,6 | ding pendek | konfirmasi UI |
| `ES_User Interface, Alert, Notification, Message, Text` | `ui` | 1,1 | success chime | pesan masuk |
| `ES_User Interface, Click, Button, Double Click, Fast, Phone Tap` | `ui` | 4,0 | block hit / tap | tap ponsel |
| `ES_Ambience, Office, Designed, Busy Office`, `ES_Particle Emission - Soundpembuka` | `ruang` | panjang | ambience / tekstur | latar, pembuka |

**Dilarang (tetap ada di folder, tidak dipakai):** `Wooshcameramovementtransisi.mp3` (serangan mendadak +16 dB dalam 50 ms setelah pra-gulung 0,9 dtk, ekor 1,9 dtk; dipotong di tengah terdengar kering dan kasar) dan `scaningfast.mp3` (desis: 61 % energi di atas 10 kHz, kecerahan 12 kHz, pita 2–10 kHz +4 dB di atas suara). Gerak kamera memakai whoosh lembut dengan serangan ≥ 150 ms dan ekor utuh (`Woosh.mp3`, atau Epidemic `Designed, Whoosh, Soft Airy` bila harus terdengar di speaker HP), atau tanpa bunyi untuk gerak kecil. `sfx_density.py` menolak keduanya.

Tidak ada di folder ini: stab orkestra, snare, hit pendek, shutter, foley kertas pendek; whoosh yang lolos hanya `Woosh.mp3` (pelan di speaker HP). Untuk itu cari per famili (`FAMILI.md` §Sumber): `~/sfx/Epidemic` (`EPIDEMIC.md`: whoosh, riser, impact, shutter, tuts, kertas sudah diperiksa), Kenyset, set v17 `jadisatu-60s/remotion/sfx-el` (`v17_thud_*` punchy hit, `v17_impact_*` sub) dengan alasan tertulis, `scripts/audio/sfx_cari.py` (Freesound CC0 + Mixkit), lalu ElevenLabs SFX (biaya disebut dulu).
