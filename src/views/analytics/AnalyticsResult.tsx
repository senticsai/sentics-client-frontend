import {useEffect, useState} from "react";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import {deepEqual} from "src/@core/utils/deepEqual";
import {Grid} from "@mui/material";
import TimeSeriesChart from "../charts/InteractiveTimeseriesChart";
import {getDetailedAnalytics, getHeatmap} from "../../services/ApiService";
import ApexDonutChart from "./charts/ApexDonutChart";
import Card from "@mui/material/Card";
import SimpleMap from "@components/map/simple-map";
import Button from "@mui/material/Button";
import HeatMap from "@components/heatmap/heat-map";
import HeatMapV2 from "@components/heatmap/heat-map-v2";

// TODO in safety show scatter in raw

// TODO donut chart about percentage

// THEN SHOW REPLAY

const POLYGON: [number, number][] = [
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

const AnalyticsResult = ({
                           query,
                           onDateTimeChange
                         }: { query: AnalyticsQuery | undefined, onDateTimeChange(start, end): void }) => {

  const [timeSeries, setTimeSeries] = useState<any>([]);
  const [oldQuery, setOldQuery] = useState<AnalyticsQuery | undefined>(undefined);
  const [donutChart, setDonutChart] = useState<any>();
  const [heatmap, setHeatmap] = useState<[]>([]);

  useEffect(() => {
    if (!query) return;

    if (query.classes.length === 0) return;
    if (query.startDateTime === undefined) return;
    if (query.endDateTime === undefined) return;
    if (query.startDateTime === query.endDateTime) return;

    if (deepEqual(query, oldQuery)) return;


    getDetailedAnalytics(query).then((data) => {
      const {timeSeries, summary} = data;

      setDonutChart(summary);
      setTimeSeries(timeSeries);
    });
    setOldQuery(query);
  }, [query]);

  function onZoom(chart: any, options?: any) {
    setTimeSeries([]);
    onDateTimeChange(options.xaxis.min, options.xaxis.max);
  }

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={3}>
            {donutChart && <ApexDonutChart series={donutChart.series} labels={donutChart.labels}
                                           centerText={donutChart.centerText}/>}
          </Grid>
          <Grid item xs={9}>
            <TimeSeriesChart series={timeSeries as any} beforeZoom={onZoom} type={'area'}/>
          </Grid>

          <Grid item xs={12} sx={{mb: 6}}>
            <div className="flex flex-row gap-4">
              <Button variant="contained" color="primary">Heatmap</Button>
              <Button variant="contained" color="primary">Replay</Button>
              <Button variant="contained" color="primary">Spaghetti Map</Button>
            </div>

            <Card sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: 4,}}>
             <HeatMapV2 data={heatmap} canvasId="simple-map" polygon={POLYGON} />
             {/* <HeatMap canvasId="simple-map" className="!w-full h-full absolute" />*/}
              <SimpleMap polygon={POLYGON} />
            </Card>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsResult
