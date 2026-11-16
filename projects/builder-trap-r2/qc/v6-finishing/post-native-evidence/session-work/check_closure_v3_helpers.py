"""Bounded tests of additive receipt validation; never invokes final closure or video decode."""
import copy
import hashlib
import json
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
import build_final_closure_v3 as c
import closure_v3_repair_support as r

checks=[]
def ok(name,fn):
 fn();checks.append({'name':name,'pass_':True})
def rejected(name,fn):
 try:fn()
 except (RuntimeError,KeyError,ValueError,TypeError,StopIteration):checks.append({'name':name,'pass_':True});return
 raise AssertionError('Unexpected acceptance: '+name)
receipt=c.read(c.Q/'single-frame-repair.json')
old_chunks=c.read(c.ARCHIVE/'qc/v6-finishing/chunks.json'); old=next(x for x in old_chunks if x['start']==900)
chunks=[receipt['output_chunk'] if x['start']==900 else x for x in old_chunks]
validate=lambda x:r.validate_raw_repair(x,old,receipt['output_chunk'],c.PINS[c.Q/'source-snapshot.json'],c.PINS[c.Q/'readiness.json'],c.need)
ok('actual accepted repair receipt and logs reproduce',lambda:r.validate_repair(c,chunks,{}))
for name,alter in [
 ('changed unaffected YUV hash',lambda x:x['exact_native_yuv_check']['output_raw_frame_sha256'].__setitem__(182,'0'*64)),
 ('missing frame hash',lambda x:x['exact_native_yuv_check']['output_raw_frame_sha256'].pop()),
 ('replacement hash mismatch',lambda x:x['replacement'].__setitem__('raw_yuv_sha256','0'*64)),
 ('wrong local repair index',lambda x:x['replacement'].__setitem__('local_frame',184)),
 ('wrong source snapshot',lambda x:x.__setitem__('source_snapshot_sha256','0'*64)),
 ('wrong timebase',lambda x:x['output_ffprobe']['streams'][0].__setitem__('time_base','1/15360')),
 ('nonzero start',lambda x:x['output_ffprobe']['streams'][0].__setitem__('start_time','0.033333')),
 ('false success with two changed frames',lambda x:x['exact_native_yuv_check'].__setitem__('changed_indices',[182,183])),
 ('wrong output range',lambda x:x['output_chunk'].__setitem__('end',1200)),
]:
 mutant=copy.deepcopy(receipt);alter(mutant);rejected(name,lambda:validate(mutant))
changed=copy.deepcopy(chunks);changed[0]['sha256']='0'*64
rejected('changed one of eight reused chunks',lambda:r.validate_repair(c,changed,{}))
criteria=c.read(c.SESSION/'work/reports/final-correspondence-criteria-v2.json')['criteria']
oldreport=c.read(c.ARCHIVE/'qc/v6-finishing/final-all-frame-correspondence-additive.json')
oldfail=c.comparison_rows(oldreport,criteria,range(2493))
ok('old2493 rows retain302 failures only1083 in repaired chunk',lambda:c.need(len(oldfail)==302 and [f for f in oldfail if 900<=f<=1199]==[1083],'unexpected old failure set'))
bridge=c.read(c.BASE/'rerender-same-resolution-correspondence.json')
ok('failed whole-frame negative-control sensitivity preserved',lambda:c.need(bridge['pass_'] is False and c.comparison_rows(bridge['known_missing_caption_negative_control'],criteria,[1083])==[],'changed history'))
# Image-only bounded positive/negative controls. No project proof is written.
import verify_third_native_roi as roi
for f in (1082,1083):
 ok('good encoded ROI'+str(f),lambda f=f:c.need(roi.metrics(roi.REFERENCES[f],c.BASE/f'second-native/native-{f}.png')['pass_'],'good ROI failed'))
for f,path,label in roi.NEGATIVES:
 ok('known bad ROI rejected '+label,lambda f=f,path=path:c.need(not roi.metrics(roi.REFERENCES[f],path)['pass_'],'bad ROI passed'))
report={'schema_version':1,'scope':'Receipt/helper tests only; no final acceptance, no decode, no closure execution','checks':checks,'pass_':all(x['pass_'] for x in checks),
'closure_sha256':c.sha(Path(c.__file__)),'support_sha256':c.sha(Path(r.__file__)),'repair_receipt_sha256':c.sha(c.Q/'single-frame-repair.json')}
out=Path(__file__).resolve().parent/'reports/final-closure-v3-helper-checks.json'
with out.open('x') as f:json.dump(report,f,indent=2);f.write('\n')
print(json.dumps({'checks':len(checks),'pass_':report['pass_'],'report':str(out)}))
