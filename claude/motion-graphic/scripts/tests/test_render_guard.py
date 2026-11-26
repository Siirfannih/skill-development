#!/usr/bin/env python3
"""render.sh dan tools/tunggu.sh: render tidak bisa hidup lebih lama dari sesinya. Semua tes memakai `npx` palsu di PATH (tanpa render sungguhan):
batas waktu mematikan seluruh grup proses, kunci proyek menyerialkan, INT/TERM mematikan grup, proses chrome yatim hanya diperingatkan,
dan `tunggu.sh hentikan` mematikan grup job."""
import json, os, shutil, signal, subprocess, tempfile, time, unittest
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
RENDER = REPO / "claude/motion-graphic/scripts/juri/render.sh"
TUNGGU = REPO / "tools/tunggu.sh"
GLOBAL_LOCK = "/tmp/remotion-heavy-render.lock"

NPX = r"""#!/bin/bash
# npx palsu: $1=remotion $2=bundle|still|render. Perilaku lewat FAKE_*.
m="$2"; echo "$(date +%s.%N) start $m $$" >> "$FAKE_LOG"
if [ "$m" = bundle ]; then
  for a in "$@"; do case "$a" in --out-dir=*) mkdir -p "${a#--out-dir=}";; esac; done
  sleep "${FAKE_BUNDLE_SLEEP:-0}"; echo "$(date +%s.%N) end $m $$" >> "$FAKE_LOG"; exit 0
fi
if [ -n "${FAKE_ESCAPE:-}" ]; then setsid sleep 300 </dev/null >/dev/null 2>&1 & echo $! > "$FAKE_ESCAPE"; fi
if [ "${FAKE_HANG:-}" = "$m" ]; then
  sleep 300 & echo $! > "$FAKE_CHILD"
  [ -z "${FAKE_IGNORE_TERM:-}" ] || trap '' TERM
  sleep 300
fi
sleep "${FAKE_RUN_SLEEP:-0}"; echo "$(date +%s.%N) end $m $$" >> "$FAKE_LOG"; exit 0
"""
PS_PALSU = """#!/bin/bash
cat "$FAKE_PS" 2>/dev/null
"""


def hidup(pid):
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    try:  # zombie (belum dituai) dianggap sudah mati
        return Path(f"/proc/{pid}/stat").read_text().rsplit(")", 1)[1].split()[0] != "Z"
    except OSError:
        return False


def tunggu_mati(pid, dtk=5):
    t = time.time()
    while time.time() - t < dtk:
        if not hidup(pid):
            return True
        time.sleep(0.1)
    return not hidup(pid)


def tunggu(syarat, dtk=5):
    t = time.time()
    while time.time() - t < dtk:
        if syarat():
            return True
        time.sleep(0.05)
    return syarat()


def tunggu_berkas(p, dtk=10):
    t = time.time()
    while time.time() - t < dtk and not Path(p).exists():
        time.sleep(0.05)
    return Path(p).exists()


class Dasar(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
        self.p = self.d / "proj"; (self.p / "remotion/src").mkdir(parents=True); (self.p / "remotion/src/a.ts").write_text("x")
        self.bin = self.d / "bin"; self.bin.mkdir()
        for nama, isi in (("npx", NPX), ("ps", PS_PALSU)):
            f = self.bin / nama; f.write_text(isi); f.chmod(0o755)
        self.log = self.d / "fake.log"; self.anak = self.d / "anak.pid"; self.fps = self.d / "ps.txt"
        self.env = dict(os.environ, PATH=f"{self.bin}:{os.environ['PATH']}", FAKE_LOG=str(self.log), FAKE_CHILD=str(self.anak),
                        FAKE_PS=str(self.fps), RENDER_PROFILE=str(self.d / "tidak-ada.json"), KILL_SETELAH_DTK="2")

    def tearDown(self):
        if self.anak.exists():
            try: os.kill(int(self.anak.read_text()), signal.SIGKILL)
            except (ProcessLookupError, ValueError): pass
        self.t.cleanup()

    def render(self, *a, env=None, timeout=60, **k):
        return subprocess.run(["bash", str(RENDER), str(self.p), *a], capture_output=True, text=True, env={**self.env, **(env or {})}, timeout=timeout, **k)

    def ledger(self):
        return [json.loads(x) for x in (self.p / "qc/jobs.jsonl").read_text().splitlines()]


class Sintaks(unittest.TestCase):
    def test_bash_n(self):
        for s in (RENDER, TUNGGU):
            r = subprocess.run(["bash", "-n", str(s)], capture_output=True, text=True); self.assertEqual(r.returncode, 0, r.stderr)

    def test_kunci_global_tidak_berubah(self):
        s = RENDER.read_text()
        self.assertEqual(s.count("/tmp/remotion-heavy-render.lock"), 1)
        self.assertIn("exec 9>/tmp/remotion-heavy-render.lock", s); self.assertIn("flock 9", s)

    def test_render_final_memakai_batas_final_yang_longgar(self):
        # render final terlama yang tercatat di PC ini 2248 dtk (behindwork-launch qc/jobs.jsonl); batas bersama 2700 dtk terlalu tipis untuk PC lambat
        s = RENDER.read_text()
        self.assertTrue('FINAL_MAKS="${FINAL_MAKS_DTK:-10800}"' in s)
        final = s[s.index("    heavy_lock\n    bundle; n="):]
        self.assertIn('jalankan "$FINAL_MAKS" "$COMP" npx remotion render', final.split(";;")[0])
        self.assertTrue("FINAL_MAKS_DTK" in s[s.index("jalankan() {"):s.index("proj_lock() {")])  # pesan habis waktu menyebut penggantinya

    def test_batas_job_tunggu_tidak_lebih_ketat_dari_render_final(self):
        s = TUNGGU.read_text()
        self.assertTrue("${MAKS_JOB_DTK:-14400}" in s)


class BatasWaktu(Dasar):
    def test_still_habis_waktu_rc_124_grup_mati_ledger_timeout(self):
        t0 = time.time()
        r = self.render("still", "Komp", "satu:1", env={"FAKE_HANG": "still", "STILL_MAKS_DTK": "1"})
        self.assertEqual(r.returncode, 124, r.stdout + r.stderr); self.assertLess(time.time() - t0, 35)
        self.assertIn("TIMEOUT still satu", r.stdout)
        baris = self.ledger()[-1]; self.assertEqual(baris["rc"], 124); self.assertIn("TIMEOUT still satu", baris["catatan"])
        anak = int(self.anak.read_text()); self.assertTrue(tunggu_mati(anak), "anak npx masih hidup")

    def test_abaikan_term_dimatikan_oleh_kill_after(self):
        r = self.render("still", "Komp", "satu:1", env={"FAKE_HANG": "still", "STILL_MAKS_DTK": "1", "FAKE_IGNORE_TERM": "1"})
        self.assertEqual(r.returncode, 124, r.stdout + r.stderr)
        self.assertTrue(tunggu_mati(int(self.anak.read_text())))

    def test_draft_dan_bundle_memakai_batas_render(self):
        r = self.render("draft", "Komp", env={"FAKE_HANG": "render", "RENDER_MAKS_DTK": "1"})
        self.assertEqual(r.returncode, 124, r.stdout + r.stderr); self.assertIn("TIMEOUT draft Komp", self.ledger()[-1]["catatan"])
        self.assertTrue(tunggu_mati(int(self.anak.read_text())))

    def test_lulus_tanpa_batas_rc_0_dan_ledger_tanpa_catatan(self):
        r = self.render("still", "Komp", "satu:1")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("still satu (frame 1)", r.stdout)
        self.assertNotIn("catatan", self.ledger()[-1]); self.assertEqual(self.ledger()[-1]["rc"], 0)

    def test_anak_yang_lolos_dari_grup_tidak_menahan_pemanggil_tetapi_menahan_kunci(self):
        # Chrome dari Remotion dijalankan detached (grup sendiri). Bila ia yatim: render.sh tetap selesai (stdout pemanggil, fd 7,
        # tidak diwarisi), tetapi kunci proyek dan kunci global tetap tertahan selama ia hidup. Gagal aman: menunggu lebih baik
        # daripada dua render menulis .bundle yang sama (insiden EISDIR); begitu pula bila render.sh di-SIGKILL di tengah render.
        lolos = self.d / "lolos.pid"
        try:
            r = self.render("still", "Komp", "satu:1", env={"FAKE_ESCAPE": str(lolos)})
            self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertTrue(tunggu_berkas(lolos)); self.assertTrue(hidup(int(lolos.read_text())))
            self.assertNotEqual(subprocess.run(["flock", "-n", str(self.p / "qc/.render.lock"), "true"]).returncode, 0)
            os.kill(int(lolos.read_text()), signal.SIGKILL)
            self.assertTrue(tunggu(lambda: subprocess.run(["flock", "-n", str(self.p / "qc/.render.lock"), "true"]).returncode == 0))
        finally:
            if lolos.exists():
                try: os.kill(int(lolos.read_text()), signal.SIGKILL)
                except (ProcessLookupError, ValueError): pass

    def test_kunci_proyek_lepas_setelah_habis_waktu(self):
        self.render("still", "Komp", "satu:1", env={"FAKE_HANG": "still", "STILL_MAKS_DTK": "1"})
        r = subprocess.run(["flock", "-n", str(self.p / "qc/.render.lock"), "true"]); self.assertEqual(r.returncode, 0)

    def test_kunci_global_lepas_setelah_habis_waktu(self):
        if subprocess.run(["flock", "-n", GLOBAL_LOCK, "true"]).returncode != 0:
            self.skipTest("kunci render global sedang dipegang proses lain")
        r = self.render("frames", "Komp", env={"FAKE_HANG": "render", "RENDER_MAKS_DTK": "1"})
        self.assertEqual(r.returncode, 124, r.stdout + r.stderr)
        self.assertEqual(subprocess.run(["flock", "-n", GLOBAL_LOCK, "true"]).returncode, 0)


class KunciProyek(Dasar):
    def test_dua_still_di_proyek_sama_berurutan(self):
        env = {**self.env, "FAKE_RUN_SLEEP": "2"}
        a = subprocess.Popen(["bash", str(RENDER), str(self.p), "still", "K", "a:1"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        time.sleep(0.7)
        b = subprocess.Popen(["bash", str(RENDER), str(self.p), "still", "K", "b:1"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        oa, ob = a.communicate(timeout=60)[0], b.communicate(timeout=60)[0]
        self.assertEqual((a.returncode, b.returncode), (0, 0), oa + ob)
        iv = {}
        for x in self.log.read_text().splitlines():
            t, ap, m, pid = x.split(); iv.setdefault(pid, {})[ap] = (float(t), m)
        sesi = sorted((v["start"][0], v["end"][0]) for v in iv.values() if v["start"][1] == "still")
        self.assertEqual(len(sesi), 2); self.assertGreaterEqual(sesi[1][0], sesi[0][1] - 0.01, "dua still tumpang tindih")
        self.assertIn("kunci proyek", ob)

    def test_bundle_tidak_dibuat_dua_kali_bersamaan(self):
        env = {**self.env, "FAKE_BUNDLE_SLEEP": "2"}
        ps = [subprocess.Popen(["bash", str(RENDER), str(self.p), "still", "K", f"{n}:1"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True) for n in "ab"]
        for x in ps: x.communicate(timeout=60)
        self.assertEqual([x.returncode for x in ps], [0, 0])
        self.assertEqual(sum(1 for l in self.log.read_text().splitlines() if " start bundle " in l), 1)


class Sinyal(Dasar):
    def test_term_mematikan_grup_dan_ledger_tetap_tertulis(self):
        env = {**self.env, "FAKE_HANG": "still"}
        pr = subprocess.Popen(["bash", str(RENDER), str(self.p), "still", "K", "a:1"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        self.assertTrue(tunggu_berkas(self.anak)); time.sleep(0.5)
        pr.send_signal(signal.SIGTERM); pr.communicate(timeout=30)
        self.assertEqual(pr.returncode, 143)
        self.assertTrue(tunggu_mati(int(self.anak.read_text())), "anak npx masih hidup sesudah TERM")
        self.assertEqual(self.ledger()[-1]["rc"], 143)

    def test_int_mematikan_grup(self):
        env = {**self.env, "FAKE_HANG": "still"}
        pr = subprocess.Popen(["bash", str(RENDER), str(self.p), "still", "K", "a:1"], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        self.assertTrue(tunggu_berkas(self.anak)); time.sleep(0.5)
        pr.send_signal(signal.SIGINT); pr.communicate(timeout=30)
        self.assertEqual(pr.returncode, 130); self.assertTrue(tunggu_mati(int(self.anak.read_text())))


class ChromeYatim(Dasar):
    def test_peringatan_tanpa_membunuh(self):
        self.fps.write_text("  901     1 /home/x/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell --a\n"
                            "  902     1 /home/y/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell --b\n"
                            "  903  4000 /home/z/node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell --c\n"
                            "  904     1 /usr/bin/lain\n")
        r = self.render("still", "Komp", "satu:1")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        baris = [x for x in r.stdout.splitlines() if x.startswith("PERINGATAN") and "chrome-headless-shell" in x]
        self.assertEqual(len(baris), 1); self.assertIn("2 proses", baris[0]); self.assertIn("xargs -r kill", baris[0])

    def test_tanpa_yatim_tanpa_peringatan(self):
        self.fps.write_text("  903  4000 /home/z/node_modules/.remotion/chrome-headless-shell/x\n")
        r = self.render("still", "Komp", "satu:1"); self.assertNotIn("chrome-headless-shell", r.stdout)


class Tunggu(unittest.TestCase):
    def setUp(self):
        self.t = tempfile.TemporaryDirectory(); self.d = Path(self.t.name)
        self.env = dict(os.environ, JOBS_DIR=str(self.d / "jobs"), KILL_SETELAH_DTK="2")
        self.anak = self.d / "anak.pid"

    def tearDown(self):
        if self.anak.exists():
            try: os.kill(int(self.anak.read_text()), signal.SIGKILL)
            except (ProcessLookupError, ValueError): pass
        self.t.cleanup()

    def sh(self, *a, env=None, timeout=40):
        return subprocess.run(["bash", str(TUNGGU), *a], capture_output=True, text=True, env={**self.env, **(env or {})}, timeout=timeout, cwd=self.d)

    def test_hentikan_mematikan_seluruh_grup(self):
        r = self.sh("jalan", "j1", "--", "bash", "-c", f"sleep 300 & echo $! > {self.anak}; sleep 300"); self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue(tunggu_berkas(self.anak)); anak = int(self.anak.read_text()); self.assertTrue(hidup(anak))
        self.assertTrue(tunggu_berkas(self.d / "jobs/j1/pgid"))
        r = self.sh("hentikan", "j1"); self.assertEqual(r.returncode, 0, r.stdout + r.stderr); self.assertIn("dihentikan", r.stdout)
        self.assertTrue(tunggu_mati(anak), "anak job masih hidup")
        self.assertIn("j1 dihentikan", self.sh("status", "j1").stdout)
        self.assertTrue((self.d / "jobs/j1/rc").exists())

    def test_hentikan_job_tak_dikenal(self):
        self.assertNotEqual(self.sh("hentikan", "tidak-ada").returncode, 0)

    def test_job_habis_waktu_rc_124(self):
        self.sh("jalan", "j2", "--", "bash", "-c", f"sleep 300 & echo $! > {self.anak}; sleep 300", env={"MAKS_JOB_DTK": "1"})
        self.assertTrue(tunggu_berkas(self.d / "jobs/j2/rc", 30))  # `tunggu` tidur 10 dtk per putaran; menunggu rc dulu tidak mengubah yang diuji
        r = self.sh("tunggu", "j2", "30"); self.assertEqual(r.returncode, 124, r.stdout + r.stderr)
        self.assertTrue(tunggu_mati(int(self.anak.read_text())))
        self.assertIn("MAKS_JOB_DTK", r.stdout)  # baris TIMEOUT di log menyebut cara menaikkan batas

    def test_job_biasa_rc_dan_log_tidak_berubah(self):
        self.sh("jalan", "j3", "--", "bash", "-c", "echo halo; exit 7")
        self.assertTrue(tunggu_berkas(self.d / "jobs/j3/rc"))
        r = self.sh("tunggu", "j3", "30"); self.assertEqual(r.returncode, 7); self.assertIn("job j3 selesai rc=7", r.stdout); self.assertIn("halo", r.stdout)


if __name__ == "__main__":
    unittest.main()
