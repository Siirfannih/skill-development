---
id: "Q07"
pola: Token & Subagent Discipline
pack: 06-qc-and-verification
kategori: qc
kategori_lain: []
trigger: mendelegasikan adegan ke worker paralel atau melakukan audit frame/still agar biaya token terkendali
fungsi: [qc]
sumber: sintesis forensik anggaran konteks & baca gambar
dilihat_bergerak: ya
diukur: ya
alias: []
vault: []
---
### Q07 · Token & Subagent Discipline
- **Trigger:** mendelegasikan adegan ke worker paralel atau melakukan audit frame/still agar biaya token terkendali
- **Anti-Pattern:** Mengosongkan parameter `model` pada pemanggilan `Agent()` (sehingga subagen diam-diam mewarisi Opus), membiarkan worker memanggil `Read` 25–85 gambar satuan hingga membengkak > 50M token/worker, atau memuat seluruh cookbook mentah.
- **Invariant:** Bila mendelegasikan, isi eksplisit `model: "sonnet"` (pekerja adegan/audio) atau `"haiku"` (pencarian/ringkas log) di setiap panggilan `Agent()`; gabungkan still ke dalam 1 *contact sheet* (`montage`/`ffmpeg tile`) sebelum `Read`; batasi worker `≤ 60 turns` & `≤ 10 image reads` dengan hanya 2–4 kartu hasil `pilih_kartu.py`.
- **Primitives/Ref:** `references/orkestrasi.md`, `templates/handoff-fase.md`, `scripts/juri/sandingkan.py`, `frame_audit.py`. · Vault: `../_vault/01-camera-and-transitions/63-virtual-camera-desktop-stage.md`
- **Gate:** Tidak ada pemanggilan `Agent()` tanpa parameter `model`, dan tidak ada worker tunggal > 60 turns atau > 10 image reads tanpa justifikasi tertulis.
