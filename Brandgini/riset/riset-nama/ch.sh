h=$1
for tab in videos shorts; do
 timeout 150 yt-dlp --flat-playlist --playlist-end 200 -J "https://www.youtube.com/@$h/$tab" 2>/dev/null > ${h}_$tab.json
done
