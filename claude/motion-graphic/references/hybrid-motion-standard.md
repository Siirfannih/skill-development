# Standar Hybrid Motion (barrier minimum, bukan nilai absolut)

Diekstrak Irfan (1 Nov 2026) dari video referensi yang selama ini jadi acuan (`GrokAgent/reference-videos/`).
Ini **standar minimum yang wajib dipenuhi**, tetapi angka dan aturannya boleh berubah kapan saja sesuai
situasi dan kondisi proyek. Kalau sebuah adegan sengaja melanggar, catat alasannya di dokumen proyek.

## System role & objective
Bertindak sebagai **Motion Director dan Sound Designer**. Evaluasi naskah dan rancang audio/visual cue
secara ketat memakai parameter produksi Hybrid Motion di bawah.

## Kinetic typography & visual
- **Rule of Extraction**: dilarang teks bergaya subtitle. Hanya ekstrak 1–3 *anchor words* yang memegang
  inti emosi kalimat. Bahasa anchor ikut audio yang sedang terdengar.
- **Motion Dynamics**: extreme bezier — hard snap/whip saat masuk, extreme ease-out saat melambat. Tanpa linear, tanpa fade malas.
- **Spatial Compositing**: teks punya kedalaman ruang — masking (di belakang objek/subjek) atau motion tracking.
- **Frame Manipulation**: posterize time 8–12 fps pada grup tipografi / aset grafis tertentu (bukan seluruh video)
  untuk memecah kehalusan linear dan meniru tekstur taktil.

## Kamera & ritme editing
- **Dynamic Framing**: kamera virtual agresif — snap zoom, whip pan, match-cut spasial antar adegan; hindari pergantian klip statis yang kaku.
- **Beat-Sync Cutting**: transisi masif dan kemunculan anchor words dikunci pada ketukan BGM atau puncak gelombang SFX.

## Tekstur & styling
- **Organic Overlays**: posterize dilengkapi film grain, halftone, atau paper texture supaya vektor tidak terlalu bersih/murah.
- **Depth of Field**: blur selektif (bukan blur statis penuh) pada foreground/background untuk memaksa fokus ke subjek.

## Sound design (SFX)
- **Visual Weight**: low-frequency whoosh (40–80 Hz) dan sub-impact (−12 dB) untuk pergeseran ruang masif / teks raksasa.
- **UI & Data**: sampel high-fidelity pendek (glass ping, telemetry blip, UI modern tap) di −20 dB. Dilarang suara keyboard/mouse usang.
- **Spatial Placement**: wajib instruksi panning L/R untuk SFX elemen UI yang tersebar di layar.

## BGM & mixing
- **Stem Orchestration**: musik bukan satu track statis; arsitektur per babak (mis. sub-bass drone untuk ruang hampa/tensi → arpeggiator untuk akselerasi).
- **Vocal Dominance**: ducking presisi −6 s/d −8 dB saat VO aktif, EQ carving di frekuensi tengah BGM supaya narator tidak tenggelam.

## Catatan penerapan
- Tetap berlaku aturan Irfan lain: no ear-fatigue 2–6 kHz, SFX tidak mendahului objek, 1 event 1 SFX, sumber SFX dari library (bukan sintesis).
- Transisi Apple style mulus: tidak boleh flash putih/radial blow-out yang menutup frame (temuan PKS v8 0:32).
