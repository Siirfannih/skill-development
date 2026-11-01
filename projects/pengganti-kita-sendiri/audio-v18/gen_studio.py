# Buat lapisan audio Remotion Studio dari mix v8: dialog + 263 cue SFX (props Zod, bisa diedit di Studio).
import json, math, os, shutil, soundfile as sf, numpy as np
R='/home/claude/pks7/remotion'; M='/home/claude/pks8'
TRIM_DB=-11.2   # skala pratinjau: dialog pre-master puncaknya +10 dBFS, diturunkan agar tak clip di browser
d=json.load(open(M+'/editor/media/data.json'))
out=R+'/public/audio/v8'; os.makedirs(out+'/sfx',exist_ok=True)
if os.path.exists(R+'/public/audio/mix_v11.wav'): os.remove(R+'/public/audio/mix_v11.wav')
x,sr=sf.read(M+'/mix/out/audio/dialog_scaled.wav'); x=x*10**(TRIM_DB/20)
print('dialog peak dBFS',20*np.log10(np.abs(x).max())); sf.write(out+'/dialog.wav',x,sr,subtype='PCM_16')
dur={}
for k in d['samples']:
    fn=k.replace('#','-'); src=M+'/mix/out/dump/'+fn+'.wav'; shutil.copy(src,out+'/sfx/'+fn+'.wav')
    dur[fn]=round(sf.info(src).duration,4)
kinds=['tick','hit','whoosh','riser','pop','snap','click','toggle','key','trash','draw','step']
ts=['// Dibuat otomatis oleh gen_studio.py — durasi sampel SFX (detik).',
    'export const SFX_DUR: Record<string, number> = '+json.dumps(dur)+';',
    'export const SFX_KINDS = '+json.dumps(kinds)+' as const;',
    f'export const PREVIEW_TRIM_DB = {TRIM_DB};']
open(R+'/src/audio_sfx_meta.ts','w').write('\n'.join(ts)+'\n')
lines=[]
for c in sorted(d['clips'],key=lambda c:c['start']):
    lab=c['visual'].replace('"',"'")
    lines.append(f'      {{ id: {json.dumps(c["id"])}, label: {json.dumps(lab)}, kind: "{c["kind"]}", sample: "{c["sample"].replace("#","-")}", at: {c["start"]:.3f}, codeAt: {c["t"]:.3f}, gainDb: {20*math.log10(c["gain"]):.1f}, muted: false }},')
lanes=',\n'.join(f'      {{ kind: "{k}", muted: false, gainDb: 0 }}' for k in kinds)
root=f'''import "./index.css";
import React from "react";
import {{ Composition }} from "remotion";
import {{ PKS, pksSchema }} from "./Video";
import {{ Preview }} from "./Preview";
import {{ f, TOTAL_S }} from "./lib/time";

// defaultProps di bawah = timeline suara. Edit di panel kanan Remotion Studio lalu klik Save: file ini ikut berubah.
// at = detik SFX diletakkan; codeAt = frame penanda dari kode (acuan, jangan diubah); gainDb relatif mix v8.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="PenggantiKitaSendiri"
      component={{PKS}}
      schema={{pksSchema}}
      durationInFrames={{f(TOTAL_S)}}
      fps={{30}}
      width={{1920}}
      height={{1080}}
      defaultProps={{{{
    dialogMuted: false,
    dialogGainDb: 0,
    solo: "none",
    lanes: [
{lanes},
    ],
    cues: [
{chr(10).join(lines)}
    ],
  }}}}
    />
    <Composition id="Preview" component={{Preview}} durationInFrames={{f(TOTAL_S)}} fps={{30}} width={{1920}} height={{1080}} defaultProps={{{{ from: 0 }}}} />
  </>
);
'''
open(R+'/src/Root.tsx','w').write(root)
print(len(lines),'cues')
