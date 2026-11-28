q="$1"; enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$q")
u="https://www.youtube.com/results?search_query=$enc&sp=EgQIBRgB"
f=$(echo "$q"|tr ' ' '_')
timeout 90 yt-dlp --flat-playlist --playlist-end 40 -J "$u" 2>/dev/null > s_en_$f.json
timeout 90 yt-dlp --extractor-args "youtube:lang=id" --flat-playlist --playlist-end 40 -J "$u" 2>/dev/null > s_id_$f.json
