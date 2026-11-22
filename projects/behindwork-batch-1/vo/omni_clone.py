"""Tiru suara rancangan sendiri (ref_audio) per kalimat: python omni_clone.py <ref.wav> <ref_text> <out.wav>"""
import sys, torch, numpy as np, soundfile as sf
torch.set_num_threads(8)
from omnivoice import OmniVoice
from omnivoice.models.omnivoice import OmniVoiceGenerationConfig
ref, ref_text, out = sys.argv[1:4]
S = ["Katanya, sebelum bikin NVIDIA, Jensen Huang pernah jadi tukang cuci mobil. Salah.",
     "Untuk melihat awalnya, kita harus putar mundur. Jauh. Ke tahun sembilan belas tujuh puluh dua.",
     "Umur sembilan tahun, ia dikirim ke sekolah asrama di Kentucky."]
m = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map="cpu", dtype=torch.float32)
sr = getattr(m, "sampling_rate", 24000)
cfg = OmniVoiceGenerationConfig(num_step=32)
def arr(a):
    a = a[0] if isinstance(a, (list, tuple)) else a
    return a.squeeze().detach().cpu().numpy() if hasattr(a, "detach") else np.asarray(a).squeeze()
gap = np.zeros(int(0.35 * sr), dtype=np.float32); parts = []
for i, s in enumerate(S):
    torch.manual_seed(11)
    parts += ([gap] if i else []) + [arr(m.generate(text=s, ref_audio=ref, ref_text=ref_text, language="id", generation_config=cfg))]
    print("kalimat", i + 1, flush=True)
sf.write(out, np.concatenate(parts), sr); print("ok", out, flush=True)
