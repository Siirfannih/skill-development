#!/usr/bin/env python3
"""Detached driver for the frozen v6 validator. Explicit lead launch and bound SHIP are required."""
from pathlib import Path
import argparse
import fcntl
import hashlib
import importlib.util
import json
import os
import subprocess
import sys
import time
import traceback

PROJECT=Path('/home/irfan/.codex/worktrees/builder-trap-r2-audit/skill-development/projects/builder-trap-r2')
WORK=Path('/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/final-v6')
PYTHON=Path('/home/irfan/work/mg-venv/bin/python')
TOOL=PROJECT/'tools/finish_v6.py'
TOOL_SHA='aca84131ae9c4f534fb6a08678b37920a20cceb86f9675f779b7f7fa952d0018'
SOURCE_SHA='4965f416e2deea839d85256419364b562b49721cd996b33fadfa15e16f8834ac'
READY=PROJECT/'qc/v6-finishing/readiness.json'
SHIP=PROJECT/'qc/v6-finishing/SHIP.json'
MIN_FREE=1_500_000_000


def sha(path):
    digest=hashlib.sha256()
    with Path(path).open('rb') as handle:
        for block in iter(lambda:handle.read(1<<20),b''):digest.update(block)
    return digest.hexdigest()


def write(path,data):
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')


def require(ok,message):
    if not ok:raise RuntimeError(message)


def free_bytes():
    stat=os.statvfs(PROJECT)
    return stat.f_bavail*stat.f_frsize


def select_cpus():
    available=sorted(os.sched_getaffinity(0));chosen=[];seen=set()
    for cpu in available:
        path=Path(f'/sys/devices/system/cpu/cpu{cpu}/topology')
        core=((path/'physical_package_id').read_text().strip(),(path/'core_id').read_text().strip())
        if core not in seen:chosen.append(cpu);seen.add(core)
        if len(chosen)==2:break
    require(len(chosen)==2,'two allowed physical cores unavailable')
    return chosen


def frozen_module():
    require(sha(TOOL)==TOOL_SHA,'frozen validator hash changed')
    spec=importlib.util.spec_from_file_location('frozen_finish_v6',TOOL)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    return module


def bound_acceptance(ship_sha,ready_sha):
    require(ship_sha and ready_sha,'explicit SHIP and readiness SHA arguments required')
    require(sha(SHIP)==ship_sha,'SHIP absent or does not match explicit launch authority')
    require(sha(READY)==ready_sha,'readiness absent or changed since launch authorization')
    module=frozen_module()
    require(module.sha(module.Q/'source-snapshot.json')==SOURCE_SHA,'source differs from reviewed4965 seal')
    module.accepted_for_final(SHIP)
    return module


def inspect():
    result=dict(helper_sha256=sha(__file__),tool_sha256=sha(TOOL),expected_tool_sha256=TOOL_SHA,
                source_sha256=sha(PROJECT/'qc/v6-finishing/source-snapshot.json'),expected_source_sha256=SOURCE_SHA,
                free_bytes=free_bytes(),minimum_free_bytes=MIN_FREE,selected_cpu_affinity=select_cpus(),
                ready_exists=READY.is_file(),ship_exists=SHIP.is_file(),final_exists=(PROJECT/'out/builder-trap-r2_v6.mp4').exists(),
                launch_policy='No automatic waiting for SHIP. A later explicit launch with exact SHIP/readiness SHA is required.',
                frozen_command_unchanged=True,gate_monkeypatches=False)
    return result


def preflight(args):
    module=bound_acceptance(args.ship_sha256,args.readiness_sha256)
    require(free_bytes()>=MIN_FREE,'less than1.5GB free before final launch')
    out=PROJECT/'out/builder-trap-r2_v6.mp4'
    require(out.is_file() if args.verify_existing else not out.exists(),
            'verify-existing requires final media' if args.verify_existing else 'final media already exists; inspect then explicitly verify-existing')
    for start in range(0,module.N,300):
        end=min(module.N,start+300)-1
        target=PROJECT/f'out/v6-chunks/f{start:04d}-{end:04d}.mp4'
        if target.exists():
            side=module.read(target.with_suffix('.json'))
            chunk=side['chunk']
            require(side['source_snapshot_sha256']==SOURCE_SHA and side['readiness_sha256']==args.readiness_sha256 and
                    chunk['sha256']==sha(target) and chunk['path']==str(target.relative_to(PROJECT)) and
                    chunk['start']==start and chunk['end']==end and chunk['frames']==end-start+1,
                    f'existing chunk invalid or partial: {target.name}')
    return module


def launch(args):
    preflight(args)
    cpus=select_cpus();stamp=str(time.time_ns());run_dir=WORK/'runs'/stamp;run_dir.mkdir(parents=True)
    command=['taskset','--cpu-list',','.join(map(str,cpus)),'nice','-n','10',str(PYTHON),str(Path(__file__).resolve()),
             'worker','--ship-sha256',args.ship_sha256,'--readiness-sha256',args.readiness_sha256,'--run-dir',str(run_dir)]
    if args.verify_existing:command+=['--verify-existing']
    env=dict(os.environ,TMPDIR='/home/irfan/Documents/Codex/2026-11-16/baca-projects-builder-trap-r2-delivery/work/tmp/finishing-v6',OMP_NUM_THREADS='2',OPENBLAS_NUM_THREADS='2',MKL_NUM_THREADS='2')
    # The frozen tool owns TMPDIR and its existing runtime wrapper in every render subprocess.
    with (run_dir/'supervisor.log').open('w') as log:
        process=subprocess.Popen(command,cwd=PROJECT,env=env,stdin=subprocess.DEVNULL,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
    record=dict(pid=process.pid,command=command,started_ns=time.time_ns(),run_dir=str(run_dir),helper_sha256=sha(__file__),
                tool_sha256=TOOL_SHA,source_snapshot_sha256=SOURCE_SHA,ship_sha256=args.ship_sha256,
                readiness_sha256=args.readiness_sha256,selected_cpu_affinity=cpus,free_bytes_at_launch=free_bytes(),
                explicitly_authorized_launch=True,final_pass_claimed=False)
    write(run_dir/'launch.json',record);write(WORK/'latest-launch.json',record)
    print(json.dumps(record),flush=True)


def worker(args):
    run_dir=Path(args.run_dir)
    require(run_dir.resolve().is_relative_to((WORK/'runs').resolve()),'run directory outside task work')
    state=dict(pid=os.getpid(),started_ns=time.time_ns(),state='preflight',helper_sha256=sha(__file__),
               cpu_affinity=sorted(os.sched_getaffinity(0)),nice=os.getpriority(os.PRIO_PROCESS,0),
               ship_sha256=args.ship_sha256,readiness_sha256=args.readiness_sha256,tool_sha256=TOOL_SHA,
               source_snapshot_sha256=SOURCE_SHA,free_bytes_at_start=free_bytes(),final_pass_claimed=False)
    result_path=run_dir/'result.json';write(result_path,state)
    code=1
    try:
        with (WORK/'launcher.lock').open('a') as lock:
            fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
            require(len(os.sched_getaffinity(0))==2,'worker affinity is not exactly2 allowedCPUs')
            require(os.getpriority(os.PRIO_PROCESS,0)>=10,'worker must run nice10 or lower priority')
            module=preflight(args)
            mode='verify-final' if args.verify_existing else 'final'
            command=[str(PYTHON),str(TOOL),mode,'--ship',str(SHIP)]
            state.update(state='running_frozen_'+mode,command=command);write(result_path,state)
            with (run_dir/'frozen-tool.log').open('w') as log:
                process=subprocess.Popen(command,cwd=PROJECT,stdin=subprocess.DEVNULL,stdout=log,stderr=subprocess.STDOUT)
                state.update(child_pid=process.pid);write(result_path,state)
                code=process.wait()
            state.update(state='frozen_tool_completed' if code==0 else 'frozen_tool_failed',exit_code=code,
                         ended_ns=time.time_ns(),free_bytes_at_end=free_bytes())
            if code==0:
                bound_acceptance(args.ship_sha256,args.readiness_sha256)
                proof=module.Q/'final-verification.json'
                require(proof.is_file(),'frozen tool returned0 without final verification evidence')
                state.update(final_verification_sha256=sha(proof),final_media_sha256=sha(PROJECT/'out/builder-trap-r2_v6.mp4'),
                             final_pass_claimed=False,note='The frozen validator owns project acceptance; launcher records execution and hashes only.')
    except BaseException as error:
        traceback.print_exc();code=1;state.update(state='blocked_or_failed',exit_code=code,error=str(error),ended_ns=time.time_ns())
    finally:write(result_path,state)
    return code


def main():
    parser=argparse.ArgumentParser(description=__doc__);sub=parser.add_subparsers(dest='mode',required=True)
    sub.add_parser('inspect')
    for name in ('launch','worker'):
        child=sub.add_parser(name);child.add_argument('--ship-sha256',required=True);child.add_argument('--readiness-sha256',required=True)
        child.add_argument('--verify-existing',action='store_true')
        if name=='worker':child.add_argument('--run-dir',required=True)
    args=parser.parse_args()
    if args.mode=='inspect':print(json.dumps(inspect(),indent=2));return 0
    if args.mode=='launch':launch(args);return 0
    return worker(args)


if __name__=='__main__':
    try:raise SystemExit(main())
    except (RuntimeError,FileNotFoundError,KeyError) as error:
        print('BLOCKED: '+str(error),file=sys.stderr);raise SystemExit(1)
