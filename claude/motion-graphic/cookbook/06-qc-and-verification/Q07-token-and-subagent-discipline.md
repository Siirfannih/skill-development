---
id: "Q07"
pola: Token & Subagent Discipline
pack: 06-qc-and-verification
kategori: qc
kategori_lain: []
trigger: mendelegasikan adegan ke worker paralel atau melakukan audit frame/still agar biaya token terkendali
sumber: sintesis forensik anggaran konteks & baca gambar
dilihat_bergerak: ya
diukur: ya
alias: []
vault: [../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md]
---
### Q07 · Token & Subagent Discipline
- **Trigger:** mendelegasikan adegan ke worker paralel atau melakukan audit frame/still agar biaya token terkendali
- **Anti-Pattern:** Membiarkan worker adegan memanggil `Read` 25–85 file gambar satuan hingga membengkak > 50M token/worker, memuat seluruh cookbook mentah, atau memakai model tier atas untuk edit repetitif ber-turn ratusan.
- **Invariant:** Gabungkan still/frame audit ke dalam 1 *contact sheet* (`montage`/`ffmpeg tile`) sebelum memanggil `Read`; batasi worker adegan `≤ 60 turns` & `≤ 10 image reads`, muat hanya 1 Domain Pack relevan + file target kepemilikan terpisah (`orkestrasi.md`), dan pisahkan model Sutradara vs Worker.
- **Primitives/Ref:** `references/orkestrasi.md`, `templates/handoff-fase.md`, `scripts/juri/sandingkan.py`, `frame_audit.py`. · Vault: `../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md`
- **Gate:** Tidak ada worker tunggal > 60 turns atau > 10 image reads tanpa justifikasi tertulis.
