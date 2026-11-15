#!/bin/sh
# v10f: Remotion kadang gagal mengambil frame video (f500 hitam di v10f r2, sumber & shot utuh) -> cari frame yang
# jauh lebih gelap dari kedua tetangganya, render ulang frame itu dengan `remotion still`, tempel, encode ulang crf 16.
cd ~/work/bdf26/v6; V=$1; O=$2
F=$(ffmpeg -nostdin -v error -i $V -vf "scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - | grep -o "YAVG=[0-9.]*" | cut -d= -f2 | awk '{y[NR-1]=$1} END{for(i=1;i<NR-1;i++) if ((y[i] < 0.5*y[i-1] && y[i] < 0.5*y[i+1] && y[i-1] > 20) || (y[i]-(y[i-1]+y[i+1])/2 > 3 && (y[i-1]-y[i+1])^2 < 1)) printf "%d ", i}')
echo "frame kedip: ${F:-tidak ada}"
if [ -z "$F" ]; then cp $V $O; exit 0; fi
# v10f: ganti frame dengan frame sebelumnya di stream yang sama (freezeframes, tetap YUV). Overlay PNG mengubah rentang warna
# seluruh video (+4 kecerahan) dan frame `remotion still` +3 lebih terang.
FC=""; L="0:v"; k=0; for f in $F; do FC="${FC}[$L]split[m$k][r$k];[m$k][r$k]freezeframes=first=$f:last=$f:replace=$((f-1))[v$k];"; L="v$k"; k=$((k+1)); done
rm -f $O; ffmpeg -nostdin -v error -y -i $V -filter_complex "${FC%;}" -map "[$L]" -map 0:a -c:v libx264 -crf 16 -preset slow -pix_fmt yuvj420p -color_range pc -colorspace bt470bg -c:a copy $O   # sama dengan keluaran Remotion (yuvj420p, pc)
ffmpeg -nostdin -v error -i $O -vf "scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - | grep -o "YAVG=[0-9.]*" | cut -d= -f2 | awk '{y[NR-1]=$1} END{n=0; for(i=1;i<NR-1;i++) if ((y[i] < 0.5*y[i-1] && y[i] < 0.5*y[i+1] && y[i-1] > 20) || (y[i]-(y[i-1]+y[i+1])/2 > 3 && (y[i-1]-y[i+1])^2 < 1)) n++; print "sisa kedip:", n}'
