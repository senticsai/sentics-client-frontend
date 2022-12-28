import { useEffect, useRef, useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { deepEqual } from 'src/@core/utils/deepEqual'
import { Grid } from '@mui/material'
import TimeSeriesChart from '../charts/InteractiveTimeseriesChart'
import { getDetailedAnalytics } from '@services/ApiService'
import ApexDonutChart from './charts/ApexDonutChart'
import Card from '@mui/material/Card'
import SimpleMap from '@components/map/simple-map'
import Button from '@mui/material/Button'
import HeatMap from '@components/analytics/heatmap/heat-map'
import Replay from '@components/analytics/replay/index'
import SpaghettiMap from '@components/analytics/spagetti'
import AnalyticsContext, { currentDate, oneHourAgo, POLYGON, replayDate } from '@components/analytics/detailed'
import HM from 'heatmap-ts'
import h337 from 'heatmap.js'

// TODO in safety show scatter in raw

// TODO donut chart about percentage

// THEN SHOW REPLAY

interface IAnalyticsProps {
  query: AnalyticsQuery | undefined
  onDateTimeChange(start, end): void
}

const AnalyticsResult = ({ query, onDateTimeChange }: IAnalyticsProps) => {
  const [timeSeries, setTimeSeries] = useState<any>([])
  const [heatmappoint, setHeatMapPoint] = useState<any>([])
  const [oldQuery, setOldQuery] = useState<AnalyticsQuery | undefined>(undefined)
  const [donutChart, setDonutChart] = useState<any>()

  const [tab, setTab] = useState<number>(0)

  // ** Replay
  const [time, setTime] = useState(replayDate)
  const [showReplay, setShowReplay] = useState<boolean>(false)
  const [compartment, setCompartment] = useState<number>(0)

  // ** Spaghetti
  const [showSpaghetti, setShowSpaghetti] = useState<boolean>(false)
  const [lineWidth, setLineWidth] = useState<number>(0)
  const heatMapRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (!query) return

    if (query.classes.length === 0) return
    if (query.startDateTime === undefined) return
    if (query.endDateTime === undefined) return
    if (query.startDateTime === query.endDateTime) return

    if (deepEqual(query, oldQuery)) return

    getDetailedAnalytics(query).then(data => {
      const { timeSeries, summary, heatmap } = data

      setDonutChart(summary)
      setTimeSeries(timeSeries)
      setHeatMapPoint(heatmap)
      createHeatMap()
    })
    setOldQuery(query)
  }, [query])

  function onZoom(chart: any, options?: any) {
    setTimeSeries([])
    onDateTimeChange(options.xaxis.min, options.xaxis.max)
  }

  function handleTabClick(index) {
    setTab(index)
  }

  const replay = {
    setShow: setShowReplay,
    show: showReplay,
    date: replayDate,
    time,
    setTime,
    setCompartment,
    compartment
  }

  const spaghetti = {
    show: showSpaghetti,
    setShow: setShowSpaghetti,
    lineWidth,
    setLineWidth
  }

  function createHeatMap() {
    if (heatMapRef?.current === null) return
    if (heatMapRef?.current !== null && heatMapRef?.current.children[1]) heatMapRef?.current.children[1].remove()
    const heatmap = h337.create({
      container: heatMapRef?.current
    })
    const data: any[] = []
    heatmappoint.forEach(item => {
      return data.push({ x: Math.trunc(item[0] * 10), y: Math.trunc(item[1] * 10), value: 5 })
    })
    heatmap.setData({
      data: data
    })
  }

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={3}>
            {donutChart && (
              <ApexDonutChart
                series={donutChart.series}
                labels={donutChart.labels}
                centerText={donutChart.centerText}
              />
            )}
          </Grid>
          <Grid item xs={9}>
            <TimeSeriesChart series={timeSeries as any} beforeZoom={onZoom} type={'area'} />
          </Grid>

          <Grid item xs={12} sx={{ mb: 6 }}>
            <div className='flex flex-row gap-4'>
              <Button variant='contained' color='primary' onClick={() => handleTabClick(0)}>
                Heatmap
              </Button>
              <Button variant='contained' color='primary' onClick={() => handleTabClick(1)}>
                Replay
              </Button>
              <Button variant='contained' color='primary' onClick={() => handleTabClick(2)}>
                Spaghetti Map
              </Button>
            </div>

            <AnalyticsContext.Provider value={{ replay, spaghetti, oneHourAgo: oneHourAgo, currentDate: currentDate }}>
              {tab === 0 && (
                <Card ref={heatMapRef} style={{ padding: '1rem', margin: '1rem 0rem' }}>
                  <img src='/images/map.png' alt='map' onLoad={createHeatMap} />
                </Card>
              )}

              {tab === 1 && <Replay />}

              {tab === 2 && (
                <Card style={{ padding: '1rem', margin: '1rem 0rem' }}>
                  <SpaghettiMap heatMapPoint={heatmappoint} />
                </Card>
              )}
            </AnalyticsContext.Provider>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsResult
