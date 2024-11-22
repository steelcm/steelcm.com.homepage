---
title: Generate video sprites using just Ffmpeg
date: 2024-11-22
excerpt: Learn how to create video sprites with just FFmpeg — perfect for seamless web animations, interactive media, and lightweight video previews
draft: true
---

!EXAMPLE SPRITE

-i "$MOVIE" The input file.
-y Override any existing output file.
-frames 1 Tell ffmpeg that output from this command is just a single image (one frame).
-q:v 1 Output quality, 0 is the best.
-vf select= That's where all the magic happens. This is the selector function for video filter.

    not(mod(n\,40)) Select one frame every 40 frames see the documentation.
    scale=-1:120 Resize frames to fit 120px height, and the width is adjusted automatically to keep the correct aspect ratio.
    tile=100x1 Layout captured frames into this grid.

```bash
#! /usr/bin/bash

INPUT=$1
OUTPUT=$2
FRAMES=20

# calculate video duration...
DURATION_S=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $INPUT)

echo $DURATION_S

# calcaulte FPS to generate a total of x frames in your sprite sheet
FPS=$(echo "scale=8; $FRAMES / $DURATION_S" | bc)
echo $FPS

# generate sprite sheet
ffmpeg \
  -y \
  -i $INPUT \
  -frames 1 \
  -q:v 2 \
  -filter_complex "fps=$FPS,pad=width=max(iw\,ih*(16/9)):height=ow/(16/9):x=(ow-iw)/2:y=(oh-ih)/2,scale=-1:135:force_original_aspect_ratio=decrease,tile=1x$FRAMES" \
  $OUTPUT
```
