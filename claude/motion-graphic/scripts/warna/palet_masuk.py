#!/usr/bin/env python3
"""palet_masuk.py: pembungkus tipis untuk `cek-warna.mjs masuk` (GERBANG MASUK warna (palet HEX nyata + peran dari referensi)).

Satu sumber kebenaran ada di cek-warna.mjs (Node: sharp, node-vibrant, culori, apca-w3, axe-core). Berkas ini hanya meneruskan
argumen dan kode keluar, supaya pemanggil Python (pabrik, tes) tidak perlu tahu jalur Node:

  python3 palet_masuk.py <argumen yang sama dengan: node cek-warna.mjs masuk ...>

Prasyarat sekali pasang: `cd claude/motion-graphic/scripts/warna && npm ci`. Keluar 2 bila node atau node_modules tidak ada.
"""
import os, shutil, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))


def main(argv=None):
    node = shutil.which("node")
    if not node or not os.path.isdir(os.path.join(AQUI, "node_modules")):
        print("node atau node_modules tidak ada: jalankan 'npm ci' di %s" % AQUI, file=sys.stderr)
        return 2
    return subprocess.call([node, os.path.join(AQUI, "cek-warna.mjs"), "masuk", *(sys.argv[1:] if argv is None else argv)])


if __name__ == "__main__":
    sys.exit(main())
