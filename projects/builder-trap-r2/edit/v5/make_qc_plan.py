"""Generate deterministic v5 QC frame plans from the active animation time map.

The scene code is authored on the original PLAN timeline while Remotion renders
the shortened v5 timeline.  QC stills therefore have to use the same inverse
interpolation as ``keBaruSec`` instead of subtracting removed audio duration.
"""
from pathlib import Path
import json
import math


P = Path(__file__).resolve().parents[2]
plan = json.loads((P / "handoff/PLAN.json").read_text())
knots = json.loads((P / "remotion/src/data/knots_v5.json").read_text())["knots"]


def to_new_frame(old_seconds: float) -> int:
    def js_round(value: float) -> int:
        """Match Math.round() for the non-negative timeline values used here."""
        return math.floor(value + 0.5)

    if old_seconds <= knots[0][1]:
        return js_round((knots[0][0] + old_seconds - knots[0][1]) * 30)
    for (new_a, old_a), (new_b, old_b) in zip(knots, knots[1:]):
        if old_a <= old_seconds <= old_b:
            ratio = (old_seconds - old_a) / max(1e-9, old_b - old_a)
            return js_round((new_a + ratio * (new_b - new_a)) * 30)
    new_end, old_end = knots[-1]
    return js_round((new_end + old_seconds - old_end) * 30)


beats = []
for beat in plan["beats"]:
    start, end = beat["t"]
    # Mid-beat is stable for the global visual gate.  The changed scenes also
    # get state-specific stills below so interaction and depth are not hidden.
    old_t = start + (end - start) * 0.5
    beats.append({
        "id": beat["id"],
        "old_seconds": round(old_t, 6),
        "start_frame": to_new_frame(start),
        "end_frame": to_new_frame(end),
        "frame": to_new_frame(old_t),
    })

changed = {
    "B17_post_hover": to_new_frame(1526 / 30),
    "B17_dialog_stable": to_new_frame(1548 / 30),
    "B17_draft_landing": to_new_frame(1570 / 30),
    "B17_late_flight": to_new_frame(1571 / 30),
    "B17_landed": to_new_frame(1572 / 30),
    "B25_modal_open": to_new_frame(2586 / 30),
    "B25_post1": to_new_frame(2606 / 30),
    "B25_post2": to_new_frame(2650 / 30),
}
result = {"beats": beats, "changed_scenes": changed}
out = P / "edit/v5/qc-plan.json"
out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
frame_ranges = " ".join(
    f"{item['id']}:{item['start_frame']}-{item['end_frame']}" for item in beats
)
(P / "handoff/beats_v5_frames.txt").write_text(frame_ranges + "\n")
args = [f"J{item['id']}:{item['frame']}" for item in beats]
args += [f"V5_{name}:{frame}" for name, frame in changed.items()]
print(" ".join(args))
