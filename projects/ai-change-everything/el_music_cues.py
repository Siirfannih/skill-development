import json,urllib.request,urllib.error,sys,concurrent.futures as cf
key=open('/home/claude/ace/.el_key').read().strip()
G_POS=['instrumental cinematic underscore for a serious documentary-style short film about AI and work','modern, premium, restrained, clean mix','full level from the very first beat, no fade-in, no silence']
G_NEG=['vocals','lyrics','choir','cheesy','happy pop','lo-fi','silence','fade in']
CUES={
 'c1_hook':(12000,['cold open, instant tension, tight sub-bass pulse and muted clock-like ticks, 112 bpm, A minor, dark and modern, low cinematic impact on the downbeat'],['piano','vocals','bright']),
 'c2_janji':(12000,['the old promise: calm, clear and hopeful but restrained, soft warm synth pad with a gentle plucked arpeggio at 112 bpm, light and airy, slightly nostalgic'],['vocals','drums heavy','sad']),
 'c3_kenyataan':(20000,['reality hits: driving tense electronic pulse at 120 bpm, pulsing low synth bass, muted hi-hats, ominous minor arpeggio, keeps building and getting denser, mechanical and cold'],['vocals','happy','piano']),
 'c4_visi':(18000,['the vision grows: evolving rising arpeggios over a steady pulse at 120 bpm, ambition and scale, building tension that swells toward a suspended unresolved peak at the end'],['vocals','happy','drop']),
 'c5_sunyi':(30000,['the unseen ones: dark minimal ambient, deep low drone, slow heartbeat-like kick, sparse distant piano notes, vast empty space, heavy and contemplative, sustained at full level all the way to the very last second, no fade out, unresolved'],['vocals','drums busy','happy','uplifting']),
}
def go(item):
    n,(ms,pos,neg)=item
    plan={'positive_global_styles':G_POS,'negative_global_styles':G_NEG,'sections':[{'section_name':n,'positive_local_styles':pos,'negative_local_styles':neg,'duration_ms':ms,'lines':[]}]}
    req=urllib.request.Request('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128',data=json.dumps({'composition_plan':plan,'model_id':'music_v1'}).encode(),headers={'xi-api-key':key,'Content-Type':'application/json'})
    try:
        open(f'music/{n}.mp3','wb').write(urllib.request.urlopen(req,timeout=600).read()); json.dump(plan,open(f'music/{n}_plan.json','w'),indent=1); return 'ok '+n
    except urllib.error.HTTPError as e: return f'ERR {n} {e.code} {e.read()[:300]}'
only=sys.argv[1:]
with cf.ThreadPoolExecutor(2) as ex:
    for r in ex.map(go,[i for i in CUES.items() if not only or i[0] in only]): print(r,flush=True)
