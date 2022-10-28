import React, {useEffect} from "react";
import {styled} from "@mui/material/styles";

const POLYGON = [
  [1.42, 0.0],
  [1.42, 53.6],
  [0.0, 54.97],
  [0.0, 75.16],
  [-1.53, 75.16],
  [-1.53, 83.46],
  [26.22, 55.49],
  [26.22, 0.0],
  [10.69, 0.0],
  [10.69, 1.037],
  [4.85, 1.037],
  [4.85, 0.0],
  [1.42, 1.037]
]

const CustomCanvas = styled('canvas')(({theme}) => ({
  width: 876
}));

interface SimpleMapProps {
  style?: React.CSSProperties;
}

function SimpleMap(props: SimpleMapProps) {
  useEffect(() => {
    const canvas = document.getElementById('simple-map') as HTMLCanvasElement;
    if (!canvas) return;

    writeCanvas(canvas);
  }, [])

  return (
    <CustomCanvas id="simple-map" style={props.style} width="1400" height="340">Your browser does not support the HTML5 canvas
      tag.</CustomCanvas>
  );
}

export default SimpleMap;

function writeCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.translate(1160, 22);
  ctx.rotate(90 * Math.PI / 180);

  for (let i = 1; i < POLYGON.length; i++) {
    ctx.lineTo(300 * POLYGON[i][0] / 26, 1000 * POLYGON[i][1] / 83);
  }

  ctx.closePath();
  ctx.stroke();
}
