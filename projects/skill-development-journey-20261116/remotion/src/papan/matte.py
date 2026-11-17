"""Generate still mattes with the official RVM MobileNetV3 TorchScript release."""
from pathlib import Path
import hashlib
import json
import numpy as np
from PIL import Image
import torch
from urllib.request import urlretrieve

root = Path(__file__).resolve().parents[2] / 'public/papan'
torch.set_num_threads(2)
model_path = Path('/tmp/papan-rvm-mobilenetv3.torchscript')
release = 'https://github.com/PeterL1n/RobustVideoMatting/releases/download/v1.0.0/rvm_mobilenetv3_fp32.torchscript'
if not model_path.exists():
    urlretrieve(release, model_path)
model = torch.jit.load(str(model_path), map_location='cpu').eval()
records = []
with torch.inference_mode():
    for name in ['B1', 'B1b', 'B2', 'B3', 'B4', 'B6']:
        rgb = np.asarray(Image.open(root / f'{name}-footage.jpg').convert('RGB')).copy()
        src = torch.from_numpy(rgb).permute(2, 0, 1).unsqueeze(0).float() / 255
        rec = [None] * 4
        # Settle recurrent state on this still; no temporal mismatch between plate and matte.
        for _ in range(5):
            fgr, pha, *rec = model(src, *rec, 0.25)
        alpha = (pha[0, 0].clamp(0, 1).numpy() * 255).round().astype('uint8')
        Image.fromarray(alpha).save(root / f'{name}-alpha.png')
        rgba = np.dstack([rgb, alpha])
        Image.fromarray(rgba).save(root / f'{name}-matte.png')
        records.append({'still': name, 'alpha_range': [int(alpha.min()), int(alpha.max())], 'foreground_fraction': float((alpha > 127).mean())})
        print(name, records[-1], flush=True)
(root / 'matte-provenance.json').write_text(json.dumps({'source': release, 'model_sha256': hashlib.sha256(model_path.read_bytes()).hexdigest(), 'downsample_ratio': .25, 'settle_iterations': 5, 'records': records}, indent=2))
