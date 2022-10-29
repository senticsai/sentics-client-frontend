import {useEffect, useState} from "react";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import {deepEqual} from "../../@core/utils/deepEqual";
import {Grid} from "@mui/material";
import TimeSeriesChart from "../charts/InteractiveTimeseriesChart";
import {getDetailedAnalytics} from "../../services/ApiService";
import ApexDonutChart from "./charts/ApexDonutChart";

// TODO in safety show scatter in raw

// TODO donut chart about percentage

// DRAW 2D MAP WITH CANVAS AND SHOW HEATMAP
// THEN SHOW REPLAY

const AnalyticsResult = ({
                           query,
                           onDateTimeChange
                         }: { query: AnalyticsQuery | undefined, onDateTimeChange(start, end): void }) => {

  const [timeSeries, setTimeSeries] = useState<any>([]);
  const [oldQuery, setOldQuery] = useState<AnalyticsQuery | undefined>(undefined);
  const [donutChart, setDonutChart] = useState<any>();

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
            {donutChart && <ApexDonutChart series={donutChart.series} labels={donutChart.labels} centerText={donutChart.centerText}/>}
          </Grid>
          <Grid item xs={9}>
            <TimeSeriesChart series={timeSeries as any} beforeZoom={onZoom} type={'area'}/>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsResult
