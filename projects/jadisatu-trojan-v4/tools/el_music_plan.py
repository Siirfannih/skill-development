"""Musik ElevenLabs: satu komposisi, seksi per babak dikunci ke vo.json. Pakai: el_music_plan.py out.mp3 [seed-variant]"""
import json,sys,os,urllib.request
P=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY=open(os.path.expanduser(os.environ.get('EL_KEYFILE','~/.secrets-mg/el2.key'))).read().strip()
vo=json.load(open(f'{P}/remotion/src/vo.json')); B={b['b']:b for b in vo['beats']}
END=vo['total']+1.5
ACTS=[
 (0.0,'hook',['playful bright intro, light plucked synth and finger snaps, curious and cheeky, 116 bpm, D major, small and intimate, like a cute chat notification jingle feel'],['vocals','heavy drums']),
 (B['b02']['s']-0.2,'problem',['same 116 bpm groove but muted and slightly tense, palm-muted pluck ostinato, ticking hi-hat, minor colour, light and modern, not dark, building a little'],['vocals','orchestra','epic']),
 (B['b04']['s'],'product',['lift: full bright modern pop groove at 116 bpm, punchy clean kick, round bass, sparkling plucks and claps, optimistic and confident, Apple product video energy, steady and sustained'],['vocals','dubstep','trap hi-hats']),
 (B['b07']['s'],'free',['short warm breakdown, same tempo, filtered drums, warm pad and glassy bells, friendly'],['vocals']),
 (B['b08']['s'],'services',['full groove returns with more energy, driving four-on-the-floor at 116 bpm, bright plucks, claps, uplifting and confident, sustained'],['vocals']),
 (B['b09']['s'],'cta',['warm resolving groove, same tempo, simpler, major, friendly invitation'],['vocals']),
 (B['b10']['s']-0.3,'credit',['gentle resolve, drums out, soft bell motif and warm pad, clean ending with natural decay'],['vocals','drums']),
]
secs=[]
for i,(t0,n,pos,neg) in enumerate(ACTS):
    t1=ACTS[i+1][0] if i+1<len(ACTS) else END
    secs.append({'section_name':n,'positive_local_styles':pos,'negative_local_styles':neg,'duration_ms':int(round((t1-t0)*1000)),'lines':[]})
plan={'positive_global_styles':['instrumental background score for a modern app explainer video','116 bpm','bright airy high-frequency sparkle: crisp shimmering hi-hats, glassy high plucks, bright claps, light thin bass, no heavy low end','clean premium mix, leaves room for a voice-over','one continuous piece with seamless section transitions'],
      'negative_global_styles':['vocals','lyrics','choir','lo-fi hiss','cheesy','silence gaps','dark cinematic','muddy','boomy bass','warm lo-fi'],'sections':secs}
json.dump(plan,open(sys.argv[1].replace('.mp3','_plan.json'),'w'),indent=1)
req=urllib.request.Request('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128',data=json.dumps({'composition_plan':plan,'model_id':'music_v1'}).encode(),headers={'xi-api-key':KEY,'Content-Type':'application/json'})
try:
    open(sys.argv[1],'wb').write(urllib.request.urlopen(req,timeout=400).read()); print('ok',sys.argv[1])
except urllib.error.HTTPError as e: print('ERR',e.code,e.read()[:400])
