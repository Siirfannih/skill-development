#!/bin/sh
# v10f: audit per potongan 10 dtk (orkestrasi.md §4). Jalur ChatGPT (codex): isi INFO.md ditempel di prompt (sandbox codex
# gagal membaca file: "bwrap: Operation not permitted"). Jalur Gemini (agy) mati (kosong/timeout 2x) -> diganti subagent Sonnet.
cd ~/work/bdf26/v6
for d in qc10/frame_audit/c*/; do
  ( P="$(cat qc10/prompt.txt)
INFO.md TIDAK perlu dibuka: isinya ditempel di bawah ini.
----- INFO.md -----
$(cat $d/INFO.md)"
    imgs=$(ls $d/s*.jpg | sed 's/^/-i /' | tr '\n' ' ')
    timeout 900 codex exec --skip-git-repo-check -s read-only -C "$d" "$P" $imgs < /dev/null > "$d/VERDICT_gpt.raw" 2>&1
    sed -n '/^[0-9].*|/p;/PUTUSAN/p' "$d/VERDICT_gpt.raw" > "$d/VERDICT_gpt.md" ) &
  while [ $(jobs -p | wc -l) -ge 6 ]; do sleep 5; done
done
wait
for d in qc10/frame_audit/c*/; do echo "$(basename $d) gpt:$(grep -o 'PUTUSAN: [A-Z]*' $d/VERDICT_gpt.md | tail -1)"; done
