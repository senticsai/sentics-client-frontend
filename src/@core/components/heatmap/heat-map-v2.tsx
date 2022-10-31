import React, {useEffect} from "react";
import simpleheat from "./script/heatmap-v2";

interface IHeatMap {
  round: number;
  round1: number;
  count: string;
}

interface HeatMapProps {
  className?: string;
  canvasId: string;
  data: IHeatMap[];
  polygon: [number, number][];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function configurationHeatMap(canvasId: string, data: IHeatMap[], polygon: [number, number][]) {
  const heat: any = simpleheat(canvasId);
  const canvas: any = document.getElementById(canvasId); // simple-map
  const array: any = [];

  for (let i = 1; i < 80; i++) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    array.push([
      Math.floor(canvasWidth / i + (getRandomArbitrary(20, 780))),
      Math.floor(canvasHeight / i + (getRandomArbitrary(50, 200))),
      0.9
    ]);
  }

  heat.data(array).draw(4)
}


function HeatMapV2(props: HeatMapProps) {
  useEffect(() => {
    configurationHeatMap(props.canvasId, props.data, props.polygon);
  }, [])

  return (
    <div id="heat-map" className={props.className}/>
  )
}

export default HeatMapV2;
