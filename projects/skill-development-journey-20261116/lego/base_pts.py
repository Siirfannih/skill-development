#!/usr/bin/env python3
"""Ukur pts frame DASAR (sebelum overlay) lewat compose.py yang sama: qc/r4/log/base_pts.json. Klip dasar 1 frame (zoom ramp) membuat pts ganda sehingga indeks frame master tertinggal 1-2 frame terhadap waktu;
bangun.py memakainya untuk menempatkan teks/bubble/coretan tepat di frame master yang diinginkan. Jalankan ulang bila dasar() berubah (±3,5 menit)."""
import json, sys, subprocess, os
sys.path.insert(0, os.path.expanduser("~/work/skill-development/claude/motion-graphic/scripts/lego"))
import compose
P=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
L=json.load(open(P+"/lego/lego_master_gambar.json")); L["lapisan"]=[]; L.pop("audio",None)
cmd,out=compose.build_cmd(L, P+"/lego")
fi=cmd.index("-filter_complex"); fc=cmd[fi+1]
fc=fc.replace("[v]","[v]",1)
# sisipkan showinfo sebelum [v]
fc=fc.rsplit("[v]",1)[0]+",showinfo[v]"
cmd[fi+1]=fc
# ganti keluaran: buang semua opsi setelah -map [v]
cmd[cmd.index("-v")+1]="info"
mi=cmd.index("-map")
cmd=cmd[:mi+2]+["-f","null","-"]
r=subprocess.run(cmd,capture_output=True,text=True)
pts=[]
for ln in r.stderr.splitlines():
    if "pts_time:" in ln and "n:" in ln:
        pts.append(float(ln.split("pts_time:")[1].split()[0]))
json.dump(pts,open(P+"/qc/r4/log/base_pts.json","w"))
print(len(pts), pts[:3], pts[-2:])
