import {useEffect, useState} from "react";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import {deepEqual} from "../../@core/utils/deepEqual";
import {Grid} from "@mui/material";
import TimeSeriesChart from "../charts/InteractiveTimeseriesChart";
import {getDetailedAnalytics} from "../../services/ApiService";

const AnalyticsResult = ({query, onDateTimeChange}: { query: AnalyticsQuery | undefined, onDateTimeChange(start, end): void }) => {

  const [timeSeries, setTimeSeries] = useState();
  const [oldQuery, setOldQuery] = useState<AnalyticsQuery | undefined>(undefined);

  useEffect(() => {
    if (!query) return;

    if (query.classes.length === 0) return;
    if (query.startDateTime === undefined) return;
    if (query.endDateTime === undefined) return;
    if (query.startDateTime === query.endDateTime) return;

    if (deepEqual(query, oldQuery)) return;

    console.log(query);

    getDetailedAnalytics(query).then((data) => {
      console.log(data);
      setTimeSeries(data.timeSeries);
    });

    setOldQuery(query);
  }, [query]);

  function onZoom(chart: any, options?: any) {
    onDateTimeChange(options.xaxis.min, options.xaxis.max);
  }

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
            {JSON.stringify(timeSeries)}
            <TimeSeriesChart series={timeSeries as any} beforeZoom={onZoom}/>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsResult
