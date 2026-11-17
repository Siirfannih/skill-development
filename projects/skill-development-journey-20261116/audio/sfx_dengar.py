import subprocess,json,sys
D='/home/irfan/sfx/SFXIrfan/'
F=["pop up.mp3","Move.mp3","Woosh.mp3","Kinetictypography(gunakansecaraacak).mp3","Cutcontrastransision.mp3","Keyboardtyping.mp3","ES_User Interface, Alert, Notification, Message, Text - Epidemic Sound.mp3","ES_User Interface, Click, UI Buttons, Confirm, Menu - Epidemic Sound.mp3","ES_Scifi, Computer, Short Beeps, Glitch 02 - Epidemic Sound.mp3","ES_User Interface, Glitch, Glitch Databend 04 - Epidemic Sound.mp3","Katapertama.mp3","ES_Designed, Bass Dive, Bass Drop, Deep Sub, 50Hz - Epidemic Sound.mp3","Lasertransision.mp3","Wooshcameramovementtransisi.mp3"]
out={}
for f in F:
    r=subprocess.run(['/home/irfan/work/mg-venv/bin/earshot','describe',D+f],capture_output=True,text=True).stdout
    first=r.strip().splitlines()[0]
    out[f]=first;print(f,'|',first[:230],flush=True)
json.dump(out,open('sfx_dengar.json','w'),ensure_ascii=False,indent=1)
