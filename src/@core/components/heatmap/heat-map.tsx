import React, {useEffect} from "react";
import h337 from "./script/heatmap";

interface HeatMapProps {
  className?: string;
  canvasId: string;
}

function HeatMap(props: HeatMapProps) {

  return (
    <div id="heat-map" className={props.className}>
      test
    </div>
  );
}

export default HeatMap;
