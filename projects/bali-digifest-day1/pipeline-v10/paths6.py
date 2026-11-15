"""Lokasi file sumber v6 dari kode klip EDL: br/ = raw_broll, r02/ = ../raw/02, r01/ = ../raw/01, v6r/ = raw01."""
import glob, os
ROOT = os.path.expanduser('~/work/bdf26')
DIRS = {'br': f'{ROOT}/v6/raw_broll', 'r02': f'{ROOT}/raw/02', 'r01': f'{ROOT}/raw/01', 'v6r': f'{ROOT}/v6/raw01', 'd23': f'{ROOT}/v6/raw23', 'gr': f'{ROOT}/v6/grid'}   # d23 = Day 2/3 (nama DJI_..._KODE_D)
def src_path(clip):
    k, c = clip.split('/'); g = glob.glob(f'{DIRS[k]}/{c}_*.MP4') or glob.glob(f'{DIRS[k]}/*_{c}_D.MP4'); return g[0]
