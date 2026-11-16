#!/usr/bin/env bash
# ONDO video pipeline — turns raw AI clips into web-ready site videos.
#   usage: scripts/process-videos.sh <raw-dir>
# raw-dir must contain: hero-intro.mp4 hero-scroll.mp4 ch1.mp4 ch2.mp4 ch3.mp4 film.mp4 event.mp4
#
# 1. One shared colour grade for every clip (warm, slightly desaturated, soft grain) = brand consistency.
# 2. Scroll-scrubbed clips -> all-intra H.264 (every frame a keyframe) so seeking on scroll is smooth.
# 3. Looping clips -> ping-pong (forward + reversed) so the loop has no visible seam.
# 4. Brand film -> the clips cut together with short crossfades.
set -euo pipefail
RAW=${1:?raw dir}
OUT=public/videos
mkdir -p "$OUT"
GRADE="scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,eq=saturation=0.86:contrast=1.04:gamma=1.02,colorbalance=rs=0.03:gs=0.01:bs=-0.03:rh=0.02:bh=-0.02,noise=alls=6:allf=t,format=yuv420p"
WEB="-c:v libx264 -preset slow -pix_fmt yuv420p -movflags +faststart -an"

# scroll-scrubbed (all-intra for frame-accurate seeking)
for n in hero-scroll event; do
  ffmpeg -v error -y -i "$RAW/$n.mp4" -vf "$GRADE" $WEB -crf 24 -g 1 -keyint_min 1 "$OUT/$n.mp4"
done

# seamless loops (forward + reverse)
for n in hero-intro ch1 ch2 ch3; do
  ffmpeg -v error -y -i "$RAW/$n.mp4" -filter_complex "[0:v]$GRADE,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" -map "[v]" $WEB -crf 25 "$OUT/$n.mp4"
done

# film teaser (autoplay in the film block)
ffmpeg -v error -y -i "$RAW/film.mp4" -vf "$GRADE" $WEB -crf 24 "$OUT/film-teaser.mp4"

# brand film: morning -> alley -> atelier -> studio -> rooftop, 0.6s crossfades
ORDER=(hero-intro ch1 ch2 ch3 film)
inputs=(); for n in "${ORDER[@]}"; do inputs+=(-i "$RAW/$n.mp4"); done
fc=""; for i in "${!ORDER[@]}"; do fc+="[$i:v]$GRADE,trim=0:4.8,setpts=PTS-STARTPTS,fps=24[v$i];"; done
fc+="[v0][v1]xfade=transition=fade:duration=0.6:offset=4.2[x1];"
fc+="[x1][v2]xfade=transition=fade:duration=0.6:offset=8.4[x2];"
fc+="[x2][v3]xfade=transition=fade:duration=0.6:offset=12.6[x3];"
fc+="[x3][v4]xfade=transition=fade:duration=0.6:offset=16.8,fade=t=in:st=0:d=0.8,fade=t=out:st=20.8:d=0.8[v]"
ffmpeg -v error -y "${inputs[@]}" -filter_complex "$fc" -map "[v]" $WEB -crf 22 "$OUT/film.mp4"

ls -la "$OUT"
