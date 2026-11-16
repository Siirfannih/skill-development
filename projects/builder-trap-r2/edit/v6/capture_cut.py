"""Capture every finding from the unchanged canonical CLI, including hidden rows."""
from pathlib import Path
import json
import runpy
import sys

script = Path(sys.argv[1]).resolve()
destination = Path(sys.argv[2]).resolve()
sys.argv = [str(script), *sys.argv[3:]]

def capture(frame, event, arg):
    if (event == 'exception' and frame.f_code.co_name == 'main'
            and Path(frame.f_code.co_filename).resolve() == script
            and arg[0] is SystemExit and 'found' in frame.f_locals):
        local = frame.f_locals
        result = {key: local[key] for key in ('found', 'hum', 'speech', 'floor', 'thr')}
        result['capture_method'] = 'canonical main locals at SystemExit; script and defaults unchanged'
        destination.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    return capture

sys.settrace(capture)
try:
    runpy.run_path(str(script), run_name='__main__')
finally:
    sys.settrace(None)
