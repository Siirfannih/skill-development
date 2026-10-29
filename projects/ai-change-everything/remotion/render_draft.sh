#!/bin/bash
# render draft 960x540 di background, log ke file
out=${1:-out/draft.mp4}; mkdir -p out
npx remotion render src/Root.tsx Main $out --scale=0.5 --concurrency=2 --crf=26 --x264-preset=veryfast \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell > out/render.log 2>&1
echo EXIT $? >> out/render.log
