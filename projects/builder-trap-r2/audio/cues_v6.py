"""v6 event sheet: visual event frames, before audio alignment. Run from project root."""
import json
from pathlib import Path
P=Path(__file__).resolve().parents[1]
# Entries are (frame of visual start, frame for peak, role, description).
E=[]
def add(start,peak,role,obj): E.append(dict(start_frame=start,frame=peak,peran=role,objek=obj))
for f in [0,9,25,43,57,73,88,114]: add(f,f,'footage_change','Arsip: isi bingkai berganti')
add(142,151,'camera','Kamera menembus bingkai arsip')
add(208,208,'title','Judul mempublikasikan masuk')
add(260,260,'mosaic','Mosaik pembuka babak')
add(265,268,'card_motion','Foto cetak masuk dan mendarat')
add(433,433,'screen_entry','B08 dinding dua belas cetakan muncul')
for start,peak in [(442,445),(448,451),(457,460)]: add(start,peak,'card_motion','B08 kelompok cetakan terangkat dan jatuh')
add(433,473,'camera','B08 kamera mundur; puncak kecepatan hasil audit')
add(545,552,'camera','Threads feed menuju kutipan')
add(643,651,'ui_click','Threads like')
add(701,701,'screen_entry','YouTube search muncul')
add(849,849,'ui_click','ChatGPT dock diklik')
add(861,868,'screen_entry','ChatGPT jendela terbuka')
add(989,989,'ui_click','Prompt ChatGPT dipilih')
add(993,996,'camera','ChatGPT punch tunggal ke prompt')
add(1000,1023,'typing','Prompt build something diketik')
add(1051,1051,'mosaic','Transisi prompt ke dinding')
for start, peak in [(1050,1071),(1083,1105),(1113,1132),(1147,1168),(1193,1214)]: add(start,peak,'card_motion','Cetakan dinding bukti terangkat saat disorot')
add(1162,1180,'camera','Kamera mundur ke dinding bukti')
add(1240,1240,'mosaic','Wipe dinding menuju babak gelap')
add(1355,1355,'screen_entry','Composer Threads gelap muncul')
add(1361,1365,'camera','Kamera mengikuti kursor ke Cancel')
add(1369,1369,'ui_click','Cancel di Threads')
add(1390,1390,'ui_click','Save draft di Threads')
add(1407,1407,'screen_entry','Halaman GitHub muncul')
add(1422,1434,'camera','Push ke README')
add(1461,1461,'screen_entry','Form repositori muncul')
add(1468,1475,'typing','Nama repositori diketik')
add(1481,1481,'ui_confirm','Centang nama repositori tersedia')
add(1483,1487,'camera','Kamera bergerak menuju Create repository')
add(1497,1497,'ui_click','Create repository ditekan')
for f in [1535,1555,1575,1594,1615,1635,1650]: add(f,f,'card_motion','B20 gelombang kartu repo')
add(1646,1660,'camera','Punch ke Releases')
add(1646,1672,'impact','Tumpukan repo freeze dan shake')
add(1857,1857,'screen_entry','Profil Threads tanpa post')
add(1904,1919,'camera','Kamera mundur memperlihatkan draft')
add(1994,1994,'mosaic','Wipe terang')
add(2049,2055,'camera','Whip kembali menyusuri dinding')
add(2116,2132,'camera','B24 kamera push ke cetakan pertama')
add(2267,2267,'card_motion','Composer Threads dan tiga lampiran masuk sebagai satu grup')
add(2277,2277,'ui_click','Tombol Post ditekan')
for f in [2284,2301,2335]: add(f,f,'card_motion','Post terbit')
E.sort(key=lambda x:(x['frame'],x['peran']))
objects=[dict(t=e['frame']/30,objek=e['objek'],frame=e['frame'],visual_start_frame=e['start_frame']) for e in E]
# Preserve individual locked cards while assigning each to its synchronized group.
v=json.loads((P/'edit/v6/visual-events.json').read_text())['events']
for e in v:
 group=e.get('group_id')
 if group and group.startswith('wall-'):
  anchor=e['fall_realframe']; objects.append(dict(t=anchor/30,objek=e['objek'],frame=anchor,visual_start_frame=e['realframe'],group_id=group))
 elif group and group.startswith('repo-'):
  anchor=e['realframe'];objects.append(dict(t=anchor/30,objek=e['objek'],frame=anchor,visual_start_frame=anchor,group_id=group))
# Distinct secondary motion intentionally silent: no fresh object impact or user action.
for f,obj,reason in [(712,'YouTube hover 1','Hover tanpa klik'),(750,'YouTube hover 2','Hover tanpa klik'),(746,'YouTube scroll','Gerak halaman mengikuti interaksi; tidak ada impact baru'),(850,'Dock bounce 1','Follow-through satu klik dock'),(859,'Dock bounce 2','Follow-through satu klik dock'),(868,'ChatGPT history','Isi jendela mengikuti pembukaan UI, bukan klik terpisah'),(1028,'Prompt hold','Teks sudah selesai; tidak ada onset baru')]:
 objects.append(dict(t=f/30,objek=obj,frame=f,senyap=True,alasan=reason))
(P/'audio/objects_v6.json').write_text(json.dumps({'objects':objects},indent=2,ensure_ascii=False)+'\n')
(P/'edit/v6/sfx/events.json').write_text(json.dumps({'events':E},indent=2,ensure_ascii=False)+'\n')
print('events',len(E))
