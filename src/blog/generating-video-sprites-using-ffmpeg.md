---
title: Generate video sprites using just Ffmpeg
date: 2024-11-22
excerpt:
  Learn how to create video sprites with just FFmpeg — perfect for lightweight
  video previews.
---

---

The following is an example of a video preview of the
[Big Buck Bunny](http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)
video using a sprite sheet generated from Ffmpeg. Hover over the image to see
the preview change.

<div id="sprite-example"><span id="sprite-timeline"></span></div>
<style>
#sprite-example {
    width: 240px;
    height: 135px;
    background: url(/images/sprite.png);
    display: block;
    margin: 0 auto 1rem auto;
    position: relative;
}
#sprite-timeline {
    width: 2px;
    height: 135px;
    background: red;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
<script>
    const spriteTimeline = document.getElementById("sprite-timeline");
    document.getElementById("sprite-example").addEventListener('mousemove', event => {
        const frame = Math.round((event.offsetX * (20-1)) / 240)
        event.target.style.backgroundPositionY=`${frame * -135}px`
        spriteTimeline.style.left =`${event.offsetX}px`
    })
    document.getElementById("sprite-example").addEventListener('touchmove', event => {
        const rect = event.target.getBoundingClientRect();
        let offsetX = event.targetTouches[0].pageX - rect.left;
        if(offsetX < 0) { offsetX = 0; }
        if(offsetX > 240) { offsetX = 240; }
        const frame = Math.round((offsetX * (20-1)) / 240)
        event.target.style.backgroundPositionY=`${frame * -135}px`
        spriteTimeline.style.left =`${offsetX}px`
    })
    document.getElementById("sprite-example").addEventListener('mouseout', event => {
        event.target.style.backgroundPositionY=`0px`
        spriteTimeline.style.left =`0px`
    })
</script>

Save the following shell script as `sprite.sh`, and update the permissions so
you can execute it (ie. `chmod +x ./sprite.sh`).

```bash
#! /usr/bin/bash

INPUT=$1
OUTPUT=$2
FRAMES=20

# Extract video duration in seconds
DURATION_S=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $INPUT)

# Calculate the FPS if we want to show 20 frames in our sprite sheet
FPS=$(echo "scale=8; $FRAMES / $DURATION_S" | bc)

# Generate the sprite sheet
ffmpeg \
  -y \
  -i "$INPUT" \
  -frames 1 \
  -q:v 2 \
  -filter_complex "fps=$FPS,pad=width=max(iw\,ih*(16/9)):height=ow/(16/9):x=(ow-iw)/2:y=(oh-ih)/2,scale=-1:135:force_original_aspect_ratio=decrease,tile=1x$FRAMES" \
  $OUTPUT
```

You can then run the script as follows:

```sh
./sprite.sh yourvideo.mp4 yourvideospritesheet.png
```

The ffmpeg command can be explained as follows:

- `-y` Override any existing output.
- `-i "$INPUT"` The input file.
- `-frames 1` Only output a single image (one frame).
- `-q:v 2` Ouput quality, 0 is the best.
- `-filter_complex` That's where all the magic happens.

  - `fps=$FPS` Set the desired FPS to extract the 20 frames from the entire
    length of the video.
  - `pad=width=max(iw\,ih*(16/9)):height=ow/(16/9):x=(ow-iw)/2:y=(oh-ih)/2` This
    pads the frame into a 16:9 aspect ratio and centres it.
  - `scale=-1:135:force_original_aspect_ratio=decrease` This scales the frame
    down to 240x135.
  - `tile=1x$FRAMES` Finally we tile our output vertically into this grid, 1
    frame across, 20 frames down.

The final output image look as follows. Once combined with some basic CSS and
JS, the scrubbing preview seen at the start of this article can be achieved.

![sprite](/images/sprite.png)
