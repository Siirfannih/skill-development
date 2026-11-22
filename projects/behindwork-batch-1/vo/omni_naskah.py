"""OmniVoice per frasa dari naskah ber-prosodi (... — KAPITAL), meniru suara rancangan sendiri.
Pakai: python omni_naskah.py <ref.wav> <ref_text> <out.wav>"""
import sys, re, torch, numpy as np, soundfile as sf
torch.set_num_threads(8)
from omnivoice import OmniVoice
from omnivoice.models.omnivoice import OmniVoiceGenerationConfig
ref, ref_text, out = sys.argv[1:4]
TEXT = ("Katanya... sebelum bikin NVIDIA, Jensen Huang pernah jadi tukang cuci mobil. SALAH. "
        "Yang sebenarnya terjadi di balik jaket kulit ini — jauh lebih KERAS. "
        "Untuk lihat awalnya... kita harus putar mundur. Jauh. Ke tahun... sembilan belas tujuh puluh dua. "
        "Tugas hariannya? Membersihkan toilet. Untuk sekitar SERATUS anak laki-laki. Teman sekamarnya... remaja tujuh belas tahun.")
# satu kalimat = satu generate (teks panjang sekaligus rusak); jeda antar kalimat 0,3 dtk
sents = [s.strip() for s in re.split(r"(?<=[.?!])\s+(?=[A-Z])", TEXT) if s.strip()]
m = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map="cpu", dtype=torch.float32)
sr = getattr(m, "sampling_rate", 24000)
cfg = OmniVoiceGenerationConfig(num_step=32)
def arr(a):
    a = a[0] if isinstance(a, (list, tuple)) else a
    return a.squeeze().detach().cpu().numpy() if hasattr(a, "detach") else np.asarray(a).squeeze()
gap = np.zeros(int(0.3 * sr), dtype=np.float32); parts = []
for i, s in enumerate(sents):
    torch.manual_seed(11)
    parts += ([gap] if i else []) + [arr(m.generate(text=s, ref_audio=ref, ref_text=ref_text, language="id", generation_config=cfg))]
    print("frasa", i + 1, "/", len(sents), flush=True)
sf.write(out, np.concatenate(parts), sr); print("ok", out, flush=True)
