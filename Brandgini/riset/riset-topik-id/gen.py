exec(open('topics.py').read())
P={"A":"Mesin uang & transaksi fisik","B":"Kendaraan, BBM & jalan","C":"Rumah & utilitas","D":"Seri \"Kenapa bikin X nggak bisa sembarangan\"","E":"Pabrik & makanan","F":"Bisnis di balik layar","G":"Uang & ekonomi rumah tangga (abstrak)","H":"Infrastruktur & kota","I":"HP & internet","J":"Tubuh & kesehatan ringan","K":"Budaya & fenomena Indonesia","L":"Alam & bencana Indonesia"}
out=[];num={}
n=0
for p in P:
    out.append(f"\n### {p}. {P[p]}\n\n| # | Judul / hook | Views | Alasan skor | Animasi | Risiko kebijakan | Bukti |\n|---|---|---|---|---|---|---|")
    for t in [x for x in T if x[1]==p]:
        n+=1; num[t[0]]=n
        out.append(f"| {n} | {t[0]} | {t[2]} | {t[3]} | {t[4]} | {t[5]} | {t[6]} |")
open('bank.md','w').write('\n'.join(out)+'\n')
top=["Kalau kamu taruh laci uang di tembok, kamu sudah punya ATM","Kenapa Indomaret dan Alfamart selalu berdampingan?","Kenapa bikin SPBU nggak bisa sembarangan?","Gerbang tol tanpa petugas: kok palang tahu saldomu cukup?","Kenapa uang Rp100 ribu susah banget dipalsukan?","Kenapa kamu mabuk di mobil tapi sopirnya nggak?","Kenapa palang kereta turun padahal keretanya masih jauh?","Kenapa bikin septic tank nggak bisa dekat sumur?","Kenapa semburan lumpur Lapindo nggak bisa ditutup?","Kenapa motor matic mogok kena banjir, motor bebek lewat?"]
topn=[num[t] for t in top]
# calendar
pr="ABFDCJHEIKLG"
pool={p:sorted([x for x in T if x[1]==p and x[0] not in top and x[2]>=4 and not x[5].startswith("Tinggi")],key=lambda x:(-x[2],x[4])) for p in pr}
seq=[num[t] for t in top]
while len(seq)<53:
    for p in pr:
        if pool[p] and len(seq)<53: seq.append(num[pool[p].pop(0)[0]])
byn={num[t[0]]:t for t in T}
cal=["| Hari | Slot 1 (YT ±12.00 WIB / 13.00 WITA → FB +2 jam) | Slot 2 (YT ±19.00 WIB / 20.00 WITA → FB +1 jam) |","|---|---|---|"]
i=0
for d in range(1,31):
    if d<=7: s1=seq[i]; i+=1; s2=None
    else: s1=seq[i]; s2=seq[i+1]; i+=2
    f=lambda k: f"#{k} {byn[k][0]} ({byn[k][1]})"
    cal.append(f"| {d} | {f(s1)} | {f(s2) if s2 else '— (minggu 1: 1/hari, fokus QC)'} |")
open('cal.md','w').write('\n'.join(cal)+'\n')
print(topn, len(seq), i, n)
