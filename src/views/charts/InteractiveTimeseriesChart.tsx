import ReactApexcharts from "../../@core/components/react-apexcharts";
import {ApexOptions} from "apexcharts";

const options: ApexOptions = {
  noData: {
    text: "Loading...",
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: "#000000",
      fontSize: '14px',
      fontFamily: "Helvetica"
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
  },
  colors: ['#666CFF', '#6D788D', '#72E128', '#FF4D49', '#FDB528'],
  xaxis: {type: "datetime"},
  yaxis: {
    labels: {
      formatter: function (val) {
        if (val >= 1000000) {
          return (val / 1000000).toFixed(0) + "M";
        }
        if (val <= 1) {
          return (val * 100).toFixed(2);
        }

        return val.toFixed(0);
      }
    }
  }
}


type TimeSeriesChartProps = {
  series: Series,
  beforeZoom?(chart: any, options?: any): void
}

type Series = {
  name: string
  data: [[number, number]] | undefined
}[];

const TimeSeriesChart = ({series, beforeZoom}: TimeSeriesChartProps) => {

  const chart: ApexChart = {
    parentHeightOffset: 0,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      show: false,
      autoSelected: 'zoom'
    },
    events: {
      beforeZoom: beforeZoom
    }
  };

  return (
    <ReactApexcharts options={{...options, chart}} series={series} type='area' height={400}/>
  )
}

export default TimeSeriesChart
