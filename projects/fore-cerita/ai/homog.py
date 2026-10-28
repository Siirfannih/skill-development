import numpy as np, sys, json
def m3d(w, h, quad):
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    A = []; b = []
    for (x, y), (u, v) in zip(src, quad):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; b += [u, v]
    p = np.linalg.solve(np.array(A, float), np.array(b, float))
    H = np.append(p, 1).reshape(3, 3)
    # CSS matrix3d column-major 4x4
    M = [H[0,0], H[1,0], 0, H[2,0], H[0,1], H[1,1], 0, H[2,1], 0, 0, 1, 0, H[0,2], H[1,2], 0, H[2,2]]
    return "matrix3d(" + ",".join(f"{v:.8f}" for v in M) + ")"
if __name__ == "__main__":
    w, h = float(sys.argv[1]), float(sys.argv[2]); q = json.loads(sys.argv[3])
    print(m3d(w, h, q))
