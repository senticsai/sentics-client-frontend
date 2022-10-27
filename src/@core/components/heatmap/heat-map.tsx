import React, {useEffect} from "react";
import h337 from "./script/heatmap";

const styles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
}

function HeatMap() {
  useEffect(() => {
    configurationHeatMap();
  }, [])

  return (
    <div id="heat-map" style={styles}>
      test
    </div>
  );
}

export default HeatMap;

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
