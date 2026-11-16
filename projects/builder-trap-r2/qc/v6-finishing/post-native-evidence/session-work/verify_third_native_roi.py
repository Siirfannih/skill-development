#!/usr/bin/env python3
"""Additional caption-ROI check; fixed before third export, never replaces raw whole-frame FAIL."""
import argparse
import hashlib
import json
from pathlib import Path
import time
import numpy as np
from PIL import Image

SESSION = Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery')
BASE = SESSION / 'work/final-native-qa'
P = Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
Q = P / 'qc/v6-finishing'
FINAL = P / 'out/builder-trap-r2_v6.mp4'
CRITERIA = {'schema_version': 1, 'native_roi_xywh': [800, 520, 450, 150],
            'blue_mask': {'b_minus_r_min': 40, 'b_minus_g_min': 25, 'b_min': 80},
            'blue_fraction_min': .8, 'textured_corr_min': .98, 'textured_mae_max': 6.,
            'reference_std_split': 1., 'low_variance_mae_max': 4., 'low_variance_mean_error_max': 4.,
            'low_variance_std_delta_max': 1., 'luminance': 'PIL RGB→L (8bit BT601), native ROI; no rescaling/registration',
            'scope': 'Only blue-caption ROI at1082–1084; additional known-defect sensitivity, not whole-frame equivalence or source cause'}
CRITERIA_PATH = BASE / 'roi-criteria-v1.json'
REFERENCES = {f: BASE / f'repair1083/native-{f}.png' for f in (1082,1083,1084)}
NEGATIVES = [(1083, BASE / 'repair1083/negative-old-1083.png', 'old_first1083'),
             (1084, BASE / 'second-native/native-1084.png', 'second1084')]


def need(ok, message):
    if not ok:
        raise RuntimeError(message)


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def read(path):
    return json.loads(Path(path).read_text())


def pixels(path):
    with Image.open(path) as im:
        need(im.size == (1920,1080), 'ROI input is not actual native dimensions')
        x,y,w,h = CRITERIA['native_roi_xywh']
        crop = im.convert('RGB').crop((x,y,x+w,y+h))
        return np.asarray(crop, dtype=np.int16), np.asarray(crop.convert('L'), dtype=np.float64)


def metrics(reference_path, candidate_path):
    xr, x = pixels(reference_path); yr, y = pixels(candidate_path)
    mask = CRITERIA['blue_mask']
    def count(rgb):
        return int(((rgb[:,:,2]-rgb[:,:,0] >= mask['b_minus_r_min']) &
                    (rgb[:,:,2]-rgb[:,:,1] >= mask['b_minus_g_min']) &
                    (rgb[:,:,2] >= mask['b_min'])).sum())
    expected_blue, actual_blue = count(xr), count(yr)
    need(expected_blue > 0, 'Reference caption has no blue pixels in fixedROI')
    xm,ym,xs,ys = float(x.mean()),float(y.mean()),float(x.std()),float(y.std())
    mae = float(np.abs(x-y).mean())
    corr = float(np.mean((x-xm)*(y-ym))/(xs*ys)) if xs>0 and ys>0 else None
    failures=[]
    if xs>=CRITERIA['reference_std_split']:
        if corr is None or corr<CRITERIA['textured_corr_min']: failures.append('roi_correlation')
        if mae>CRITERIA['textured_mae_max']: failures.append('roi_mae')
    elif mae>4 or abs(xm-ym)>4 or abs(xs-ys)>1:
        failures.append('roi_low_variance_difference')
    ratio=actual_blue/expected_blue
    if ratio<CRITERIA['blue_fraction_min']: failures.append('blue_caption_absent_or_incomplete')
    return {'pass_':not failures,'corr':corr,'mae':mae,'reference_std':xs,'actual_std':ys,
            'reference_mean':xm,'actual_mean':ym,'reference_blue_pixels':expected_blue,'actual_blue_pixels':actual_blue,
            'blue_fraction':ratio,'failures':failures}


def main():
    ap=argparse.ArgumentParser();ap.add_argument('--controls',action='store_true');args=ap.parse_args()
    criteria_record=read(CRITERIA_PATH)
    need(criteria_record['criteria']==CRITERIA and criteria_record['before_third_export_exists'] is True, 'Fixed ROI criteria differ')
    inputs={str(CRITERIA_PATH):sha(CRITERIA_PATH), **{str(p):sha(p) for p in REFERENCES.values()}}
    rows=[]
    for f,path in REFERENCES.items():
        result=metrics(path,path);need(result['pass_'],'Positive reference control failed')
        rows.append({'frame':f,'kind':'positive_native_reference','reference_path':str(path),'candidate_path':str(path),**result})
    for f,path,label in NEGATIVES:
        inputs[str(path)]=sha(path)
        result=metrics(REFERENCES[f],path)
        need(not result['pass_'] and 'blue_caption_absent_or_incomplete' in result['failures'], 'Known missing-caption control was not rejected')
        rows.append({'frame':f,'kind':'negative_'+label,'reference_path':str(REFERENCES[f]),'candidate_path':str(path),**result})
    report={'schema_version':1,'created_ns':time.time_ns(),'creator_sha256':sha(__file__),'criteria':CRITERIA,
            'criteria_sha256':sha(CRITERIA_PATH),'controls':rows,'controls_pass':True,'whole_frame_criteria_unchanged':True}
    if args.controls:
        need(not FINAL.exists(),'Pre-third controls cannot be issued after third export exists')
        report.update(mode='controls_before_third_export',before_third_export_exists=True,final_acceptance_claimed=False)
        output=BASE/'roi-controls-pre-third.json'
    else:
        second=BASE/'third-native';mp=second/'manifest.json';manifest=read(mp)
        digest=sha(FINAL)
        need(manifest['candidate_path']==str(FINAL) and manifest['candidate_sha256']==digest,'Third native manifest candidate differs')
        need([r['frame'] for r in manifest['frames']]==[1082,1083,1084],'Third native frame inventory differs')
        pre=BASE/'roi-controls-pre-third.json'; prior=read(pre)
        need(prior['controls_pass'] is True and prior['before_third_export_exists'] is True and prior['criteria_sha256']==sha(CRITERIA_PATH) and prior['creator_sha256']==sha(__file__), 'Pre-third controls absent or changed')
        inputs[str(pre)]=sha(pre);inputs[str(mp)]=sha(mp)
        results=[]
        for row in manifest['frames']:
            path=Path(row['path']);need(sha(path)==row['sha256'],'Third native image hash differs')
            inputs[str(path)]=row['sha256']
            results.append({'frame':row['frame'],'path':str(path),'sha256':row['sha256'],**metrics(REFERENCES[row['frame']],path)})
        report.update(mode='actual_third_native_roi',candidate_sha256=digest,manifest_sha256=sha(mp),
                      frames=results,pass_=all(r['pass_'] for r in results),final_acceptance_claimed=False)
        need(sha(FINAL)==digest,'Final changed duringROIcheck')
        output=second/'roi-check.json'
    for path,digest in inputs.items():need(sha(path)==digest,'ROI input changed duringcheck')
    report['input_hashes']=inputs
    with output.open('x') as h:json.dump(report,h,indent=2,allow_nan=False);h.write('\n')
    print(json.dumps({'path':str(output),'controls_pass':True,'pass_':report.get('pass_'), 'rows':report.get('frames',rows)}))
    return 0 if report.get('pass_',True) else 1

if __name__=='__main__':raise SystemExit(main())
