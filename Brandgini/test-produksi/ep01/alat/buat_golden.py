import json
S=json.load(open("shotlist.json"))["beats"]; vt={"b%02d" % b["beat_id"]: b["visual_type"] for b in S}
G=[{"file":k+".png","gaya":"A-kolase","visual_type":vt[k],"disetujui":"SELF-ep01-bukan-persetujuan-Irfan","catatan":"golden darurat dari still ep01 sendiri (golden.json v2 kosong)"} for k in ["b01","b02","b03","b05","b06","b09","b12","b13","b17"]]
json.dump(G,open("golden/golden.json","w"),indent=1,ensure_ascii=False)
