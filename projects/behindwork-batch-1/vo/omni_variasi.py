"""Variasi suara OmniVoice per kalimat: kalimat 1 dari voice design (instruct), kalimat berikutnya memakai
kalimat 1 sebagai ref_audio supaya suaranya konsisten. Bukan clone orang sungguhan.
Pakai: python omni_variasi.py <out_dir> [nama ...]"""
import sys, os, time, json, torch, numpy as np, soundfile as sf
torch.set_num_threads(8)
from omnivoice import OmniVoice
from omnivoice.models.omnivoice import OmniVoiceGenerationConfig
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
S = ["Katanya, sebelum bikin NVIDIA, Jensen Huang pernah jadi tukang cuci mobil. Salah.",
     "Untuk melihat awalnya, kita harus putar mundur. Jauh. Ke tahun sembilan belas tujuh puluh dua.",
     "Umur sembilan tahun, ia dikirim ke sekolah asrama di Kentucky."]
V = {
 "om1_pria_dewasa_rendah": "male, middle-aged, low pitch",
 "om2_pria_dewasa_sedang": "male, middle-aged, moderate pitch",
 "om3_pria_muda_rendah": "male, young adult, low pitch",
 "om4_pria_muda_sedang": "male, young adult, moderate pitch",
 "om5_wanita_dewasa_rendah": "female, middle-aged, low pitch",
 "om6_wanita_muda_rendah": "female, young adult, low pitch",
}
want = sys.argv[2:] or list(V)
m = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map="cpu", dtype=torch.float32)
sr = getattr(m, "sampling_rate", 24000)
cfg = OmniVoiceGenerationConfig(num_step=16)
def arr(a):
    a = a[0] if isinstance(a, (list, tuple)) else a
    return a.squeeze().detach().cpu().numpy() if hasattr(a, "detach") else np.asarray(a).squeeze()
gap = np.zeros(int(0.35 * sr), dtype=np.float32)
for n in want:
    t = time.time(); parts = []
    torch.manual_seed(7)
    a1 = arr(m.generate(text=S[0], instruct=V[n], language="id", generation_config=cfg))
    sf.write(f"{out}/{n}_ref.wav", a1, sr); parts.append(a1)
    for s in S[1:]:
        parts += [gap, arr(m.generate(text=s, ref_audio=f"{out}/{n}_ref.wav", ref_text=S[0], language="id", generation_config=cfg))]
    sf.write(f"{out}/{n}.wav", np.concatenate(parts), sr)
    json.dump({"instruct": V[n], "kalimat": S, "seed": 7, "num_step": 16}, open(f"{out}/{n}.json", "w"))
    print("ok", n, round(time.time() - t), "dtk", flush=True)
