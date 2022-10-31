import React, {useEffect} from "react";
import Box from "@components/mui/Box";

interface SimpleMapProps {
  className?: string;
  polygon: [number, number][];
}

function writeCanvas(canvas: HTMLCanvasElement, polygon: [number, number][]) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();
  ctx.strokeStyle = '#9AA2A4';
  ctx.lineWidth = 4;
  ctx.translate(700, 22);
  ctx.rotate(90 * Math.PI / 180);

  for (let i = 1; i < polygon.length; i++) {
    ctx.lineTo(
      Math.floor(300 * polygon[i][0] / 36),
      Math.floor(500 * polygon[i][1] / 60)
    )
  }


  ctx.closePath();
  ctx.stroke();
}

function SimpleMap(props: SimpleMapProps) {
  useEffect(() => {
    const canvas = document.getElementById('simple-map') as HTMLCanvasElement;
    if (!canvas) return;

    writeCanvas(canvas, props.polygon);
  }, [])

  return (
    <Box className={props.className}>
      <canvas id="simple-map" width="702" height="242">Your browser does not support the HTML5 canvas
        tag.
      </canvas>
    </Box>
  );
}

export default SimpleMap;
