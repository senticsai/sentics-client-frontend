import React, {useEffect} from "react";

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



function HeatMapV2(props: HeatMapProps) {

  return (
    <div id="heat-map" className={props.className}/>
  )
}

export default HeatMapV2;
