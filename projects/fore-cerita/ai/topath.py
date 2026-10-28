import json, re, sys
O = "/Users/igedeirfankusumaputra/flow-mcp-out"
def path(v):
    if not isinstance(v, str) or not v.startswith("asset:"): return v
    t = v[6:]
    m = re.match(r"(fore-[a-z0-9-]+?)-(scene-\d\d(?:-v\d)?)$", t)
    if not m: return v  # e.g. fm-... uploads stay assets
    return f"{O}/{m.group(1)}/{m.group(2)}.jpeg"
def conv(job, keep=None):
    sc = job["scenes"]
    if keep: sc = [sc[i] for i in keep]
    for s in sc:
        for k in ("first_frame", "last_frame"):
            if k in s: s[k] = path(s[k])
        if "reference_images" in s: s["reference_images"] = [path(r) for r in s["reference_images"]]
    job["scenes"] = sc
    return job
if __name__ == "__main__":
    src, dst, proj = sys.argv[1:4]
    keep = [int(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 else None
    j = conv(json.load(open(src)), keep); j["project"] = proj
    json.dump(j, open(dst, "w"), indent=1)
    for s in j["scenes"]: print(s.get("first_frame", ""), s.get("last_frame", ""), s.get("reference_images", ""))
