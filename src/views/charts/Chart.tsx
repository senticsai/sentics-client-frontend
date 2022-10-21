import ReactApexcharts from "../../@core/components/react-apexcharts";
import {ApexOptions} from "apexcharts";

const options: ApexOptions = {
  chart: {
    parentHeightOffset: 0,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: false,
    curve: 'straight'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  fill: {
    opacity: 1,
    type: 'solid'
  },
  tooltip: {
    shared: false
  }
}

type ChartType = "line"
  | "area"
  | "bar"
  | "histogram"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "treemap"
  | "boxPlot"
  | "candlestick"
  | "radar"
  | "polarArea"
  | "rangeBar";


const Chart = ({series, colors, xAxis, type}: {series: ApexAxisChartSeries | ApexNonAxisChartSeries, colors: string[], xAxis: ApexXAxis, type: ChartType}) => {
  return (
    <ReactApexcharts options={{...options, colors, xaxis: xAxis}} series={series} type={type} height={400} />
  )
}

export default Chart
