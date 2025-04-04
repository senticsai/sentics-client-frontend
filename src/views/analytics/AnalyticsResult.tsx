import {useEffect, useState} from "react";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import {deepEqual} from "src/@core/utils/deepEqual";
import {Grid} from "@mui/material";
import TimeSeriesChart from "../charts/InteractiveTimeseriesChart";
import {getDetailedAnalytics} from "@services/ApiService";
import ApexDonutChart from "./charts/ApexDonutChart";
import Card from "@mui/material/Card";
import SimpleMap from "@components/map/simple-map";
import Button from "@mui/material/Button";
import HeatMap from "@components/analytics/heatmap/heat-map";
import Replay from "@components/analytics/replay/index";
import SpaghettiMap from "@components/analytics/spagetti";
import AnalyticsContext, {currentDate, oneHourAgo, POLYGON, replayDate} from "@components/analytics/detailed";

// TODO in safety show scatter in raw

// TODO donut chart about percentage

// THEN SHOW REPLAY

interface IAnalyticsProps {
  query: AnalyticsQuery | undefined,
  onDateTimeChange(start, end): void
}

const AnalyticsResult = ({query, onDateTimeChange}: IAnalyticsProps) => {
  const [timeSeries, setTimeSeries] = useState<any>([]);
  const [oldQuery, setOldQuery] = useState<AnalyticsQuery | undefined>(undefined);
  const [donutChart, setDonutChart] = useState<any>();

  const [tab, setTab] = useState<number>(0);

  // ** Replay
  const [time, setTime] = useState(replayDate);
  const [showReplay, setShowReplay] = useState<boolean>(false);
  const [compartment, setCompartment] = useState<number>(0);

  // ** Spaghetti
  const [showSpaghetti, setShowSpaghetti] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(0);

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

  function handleTabClick(index) {
    setTab(index);
  }

  const replay = {
    setShow: setShowReplay,
    show: showReplay,
    date: replayDate,
    time,
    setTime,
    setCompartment,
    compartment
  };

  const spaghetti = {
    show: showSpaghetti,
    setShow: setShowSpaghetti,
    lineWidth,
    setLineWidth
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
              <Button variant="contained" color="primary" onClick={() => handleTabClick(0)}>Heatmap</Button>
              <Button variant="contained" color="primary" onClick={() => handleTabClick(1)}>Replay</Button>
              <Button variant="contained" color="primary" onClick={() => handleTabClick(2)}>Spaghetti Map</Button>
            </div>


            <AnalyticsContext.Provider value={{replay, spaghetti, oneHourAgo: oneHourAgo, currentDate: currentDate}}>
              {tab === 0 && <Card sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: 4}}>
                <HeatMap
                  canvasId="simple-map"
                  detailedLevel={45}
                  startDateTime={query?.startDateTime}
                  endDateTime={query?.endDateTime}
                />

                <SimpleMap polygon={POLYGON}/>
              </Card>}

              {tab === 1 && <Replay/>}

              {tab === 2 && <SpaghettiMap></SpaghettiMap>}
            </AnalyticsContext.Provider>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsResult
