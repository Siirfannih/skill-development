# matte.py <src.mp4> <outdir>
# Robust Video Matting (ONNX, CPU) -> <outdir>/fg.webm (subjek saja, VP9 + alpha) dan <outdir>/matte_small.npy
# (alpha 270x480 uint8 per frame, untuk melacak kepala/bahu). Recurrent state di-reset di tiap sambungan take (edl_v6).
import json, subprocess, sys, numpy as np, onnxruntime as ort, cv2

src, out = sys.argv[1], sys.argv[2]
EDL = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] != '-' else None
A = int(sys.argv[4]) if len(sys.argv) > 4 else 0      # rentang frame opsional [A, B)
B = int(sys.argv[5]) if len(sys.argv) > 5 else 10**9
NAMA = sys.argv[6] if len(sys.argv) > 6 else 'fg'
MODEL = '/home/irfan/work/behindwork/models/rvm_mobilenetv3_fp32.onnx'
pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate',
                                '-of', 'json', src], capture_output=True, text=True).stdout)['streams'][0]
W, H, fps = pr['width'], pr['height'], pr['r_frame_rate']
cuts = set()
if EDL:
    e = json.load(open(EDL))
    cuts = {round(s['out_in'] * 30) for s in e['segments']}
so = ort.SessionOptions(); so.intra_op_num_threads = 8
sess = ort.InferenceSession(MODEL, so, providers=['CPUExecutionProvider'])
rd = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-vf', f'trim=start_frame={A}:end_frame={B},setpts=PTS-STARTPTS', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{W}x{H}', '-r', fps, '-i', '-',
                       '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '6M', '-deadline', 'realtime', '-cpu-used', '8', '-row-mt', '1',
                       '-auto-alt-ref', '0', f'{out}/{NAMA}.webm'], stdin=subprocess.PIPE)
zero = [np.zeros((1, 1, 1, 1), np.float32)] * 4
rec = list(zero); ds = np.array([0.5], np.float32); n = 0
SW, SH = W // 2, H // 2   # inferensi di setengah resolusi (mesin berbagi CPU), alpha di-upscale
small = []
while True:
    buf = rd.stdout.read(W * H * 3)
    if len(buf) < W * H * 3: break
    if (n + A) in cuts and n > 0:
        rec = list(zero)
    img = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    sm = cv2.resize(img, (SW, SH), interpolation=cv2.INTER_AREA)
    x = (sm.astype(np.float32) / 255).transpose(2, 0, 1)[None]
    fgr, pha, *rec = sess.run(None, {'src': x, 'r1i': rec[0], 'r2i': rec[1], 'r3i': rec[2], 'r4i': rec[3], 'downsample_ratio': ds})
    a = cv2.resize(np.clip(pha[0, 0], 0, 1), (W, H), interpolation=cv2.INTER_LINEAR)
    a = np.where(a < 0.08, 0, a)
    a8 = (a * 255).astype(np.uint8)
    wr.stdin.write(np.dstack([img, a8]).tobytes())
    small.append(a8[::4, ::4].copy())
    n += 1
    if n % 200 == 0: print('frames', n, flush=True)
wr.stdin.close(); wr.wait()
np.save(f'{out}/{NAMA}_small.npy', np.stack(small))
print('done', n, 'frames')
