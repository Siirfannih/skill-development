# Buat kandidat suara baru (voice design, bukan clone orang sungguhan) lalu simpan sebagai referensi tetap.
# Pakai: python design.py <out_dir>
import sys, os, time, torch, soundfile as sf
from omnivoice import OmniVoice

out = sys.argv[1] if len(sys.argv) > 1 else "voices"
os.makedirs(out, exist_ok=True)
dev = "mps" if torch.backends.mps.is_available() else "cpu"
t0 = time.time()
model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map=dev, dtype=torch.float32)
print("model siap", dev, round(time.time() - t0, 1), "dtk", flush=True)
REF_TEXT = "Pompa airmu nggak rusak. Air sumurmu yang terlalu dalam. Yuk kita bedah kenapa."
CANDIDATES = {
    "pria-muda-hangat": "male, young adult, moderate pitch",
    "pria-dewasa-tenang": "male, middle-aged, low pitch",
    "wanita-muda-jelas": "female, young adult, moderate pitch",
}
for name, instruct in CANDIDATES.items():
    t = time.time()
    audio = model.generate(text=REF_TEXT, instruct=instruct)
    a = audio[0] if isinstance(audio, (list, tuple)) else audio
    a = a.squeeze().detach().cpu().numpy() if hasattr(a, "detach") else a
    sf.write(f"{out}/{name}.wav", a, getattr(model, "sampling_rate", 24000))
    open(f"{out}/{name}.txt", "w").write(REF_TEXT)
    print("ok", name, round(time.time() - t, 1), "dtk", flush=True)
