import React, {useEffect} from "react";
import h337 from "./script/heatmap";

interface HeatMapProps {
  className?: string;
  canvasId: string;
}

function configurationHeatMap() {
  const heatmapInstance: any = h337.create({
    container: document.getElementById('heat-map'),
  });

  const points: any = [];
  const max = 100;
  const width = 1400;
  const height = 400;
  let len = 100;

  while (len--) {
    const val = Math.floor(Math.random() * max);
    const point: any = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      value: val
    };
    points.push(point);
  }

  heatmapInstance.setData({
    max: max,
    data: points
  });
}

function HeatMap(props: HeatMapProps) {
  useEffect(() => {
    configurationHeatMap();
  }, [])

  return (
    <div id="heat-map" className={props.className}>
      test
    </div>
  );
}

export default HeatMap;
