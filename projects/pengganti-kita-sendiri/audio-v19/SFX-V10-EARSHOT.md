# SFX v10 dipilih dengan earshot (2 Nov 12.00–12.30)

Irfan 12.00: hampir semua SFX salah ("seperti starter mobil/motor"). Akar: SFX v9/v10 dipilih dari JUDUL katalog dan hanya diukur level/spektrumnya; plugin `external/earshot` (submodule, belum di-init) tidak pernah dipakai untuk mendengar.

## Yang didengar earshot (describe) pada SFX lama
| file | peran | earshot |
|---|---|---|
| tech-data-transition-10 | whoosh transisi (34×) | record scratch, stutter glitch, tape stop |
| ui-confirm-menu | objek muncul (54×) | error buzz, notification ding |
| low-zap-pop | ganti foto (25×) | error buzz, digital glitch |
| telemetry-data-readout-01 | data (6×) | stutter glitch, keyboard typing |
| menu-select-notif-24 | klik centang (24×) | crisp interface click, microwave beep |

## Pengganti (earshot match "strong" untuk peran, tidak cocok dengan pembanding mesin/motor/buzz)
| peran (folder sfx_v10) | file (Epidemic) | earshot |
|---|---|---|
| whoosh | Swoosh Light, Whoosh Generic Air (bergantian) | quick swipe, fast whoosh, short swish |
| swipe (ganti foto) | UI Motion Whoosh Minimize / Maximize | fast whoosh, whip pan |
| pop (objek muncul) | Bubbly Select, Wobble Bloop, Cute Pops | bubble/cork/mouth pop |
| click (centang) | Simple Select, Dull Menu | kalimba, wooden block |
| hit (kata penting) | Boom Thud Distant, Bass Drop Deep | deep cinematic boom, sub bass drop |
| data | Acceptance Release Code | crisp interface click |
| low_whoosh (kamera) | sub-cinematic-01 dipotong 1,2 s | deep cinematic whoosh (dipertahankan) |

Laporan mentah: `ears_report_2nov.json`. Cue: `cues_all_r5.json`. Gerbang audio: SFX terdengar 91 %, VO median 18,8 dB / p5 2,4 dB, >5 kHz 2,2 %, BGM p50 −29 dBFS, −14,0 LUFS TP −1,3.
