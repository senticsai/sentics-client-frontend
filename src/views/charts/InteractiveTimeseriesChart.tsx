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
    show: true,
    curve: 'straight',
    width: 1,
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
    opacity: 0,
    type: 'solid'
  },
  tooltip: {
    shared: false
  },

  colors: ['#666CFF', '#6D788D', '#72E128', '#FF4D49', '#FDB528'],
  xaxis: {
    type: "datetime",
    labels: {
      datetimeUTC: false,
      formatter: function (value, timestamp, opts) {
        const timeZoneOffset = new Date().getTimezoneOffset() / 60 * -1;
        const time = (timeZoneOffset * 1000 * 60 * 60) + Number(value);

        return new Date(time).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: false})
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        if (isNaN(Number(val))) {
          return '0';
        }
        if (val < 1 && String(val).length > 4) {
          return (100 - (val * 100)).toFixed(2);
        }

        return Number(val).toFixed(0);
      }
    }
  },
}


type TimeSeriesChartProps = {
  series: Series,
  beforeZoom?(chart: any, options?: any): void
  type: 'area' | 'scatter'
}

type Series = {
  name: string
  data: [[number, number]] | undefined
}[];

const TimeSeriesChart = ({series, beforeZoom, type = 'area'}: TimeSeriesChartProps) => {

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
    <ReactApexcharts options={{...options, chart}} series={series} type={type} height={400}/>
  )
}

export default TimeSeriesChart
