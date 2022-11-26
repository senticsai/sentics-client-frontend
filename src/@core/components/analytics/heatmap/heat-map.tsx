import React, {useEffect} from "react";
import simpleheat from "./script/heatmap";
import AnalyticsContext from "@components/analytics/detailed";

interface HeatMapProps {
  canvasId: string,
  detailedLevel: number,
  startDateTime?: string,
  endDateTime?: string,
}

interface IConfigurationHeatMap {
  canvasId: string,
  replay: boolean,
  spaghetti: boolean
}

interface IArray {
  [index: number]: number;
}

function configurationHeatMap({canvasId, replay, spaghetti}: IConfigurationHeatMap) {
  const heat: any = simpleheat(canvasId);
  const canvas: any = document.getElementById(canvasId);
  const ctx: any = canvas.getContext('2d');
  const array: IArray[] = [];

  for (let i = 1; i < 80; i++) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    array.push([
      Math.floor(canvasWidth / i),
      Math.floor(canvasHeight / i),
      0.9
    ]);
  }

  if (replay) {
    ctx.beginPath();
    ctx.roundRect(220, 80, 22, 22, [50]);
    ctx.fillStyle = "orange";
    ctx.fill();
  } else if (spaghetti) {
    ctx.beginPath();
    ctx.moveTo(250, 90);
    ctx.lineTo(600, 90);
    ctx.strokeStyle = "orange";
    ctx.stroke();
  }

  if (!replay && !spaghetti)
    heat.data(array).draw(2);
}


function HeatMap(props: HeatMapProps) {
  const context = React.useContext(AnalyticsContext);

  useEffect(() => {
    configurationHeatMap({
      canvasId: props.canvasId,
      replay: context.replay.show,
      spaghetti: context.spaghetti.show
    });
  }, [])

  return (
    <div id="heat-map"/>
  )
}

export default HeatMap;
