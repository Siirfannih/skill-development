import json
from earshot import api
A='/home/claude/pks6/audio/assets/'
J=[('ui/es-cad01d18_shutter-canon-5d.wav','a single camera shutter click',3),
   ('ui/es-ccc6c7f4_light-switch.wav','a single light switch click',4),
   ('foley/es-747994e2_footsteps-sneaker.wav','a single soft footstep',8),
   ('ui/es-c7ac1cb5_keyboard-apple-typing.wav','a single laptop key press',14),
   ('impacts/es-3b701b97_hit-thud-dark.wav','a deep cinematic impact hit',2),
   ('ui/pb-290204_mouse-click-15C.wav','a single computer mouse click',2),
   ('motion/es-93505bfe_swish-bright-flyby.wav','a fast bright swish',2)]
out={}
for f,q,n in J:
    r=api.find(A+f,q,top=n); out[f]=r
    print('==',f, '|', r.get('summary','')[:300])
json.dump(out,open('/home/claude/pks6/trims.json','w'),indent=1,default=str)
