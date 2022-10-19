// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import BellOutline from "mdi-material-ui/BellOutline";
import ChevronDown from "mdi-material-ui/ChevronDown";
import {forwardRef, useState} from "react";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import {DateType} from "../../../types/forms/reactDatepickerTypes";

interface PickerProps {
  start: Date | number
  end: Date | number
}

const ApexLineChart = () => {
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: ['#ff9f43'],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: -10
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      }
    },
    xaxis: {
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12',
        '20/12',
        '21/12'
      ]
    }
  }

  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(new Date())


  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BellOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <ChevronDown />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const series = [
    {
      data: [100, 90, 80, 60, 80, 50, 40, 70, 40, 60, 70, 60, 40, 50, 60]
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Safety Scores'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Safety scores by time'
        subheaderTypographyProps={{ variant: 'caption' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePicker
            selectsRange
            endDate={endDate}
            id='apexchart-area'
            selected={startDate}
            startDate={startDate}
            onChange={handleOnChange}
            placeholderText='Click to select a date'
            customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
          />
        }
      />
      <CardContent>
        <ReactApexcharts options={options} series={series} type='line' height={400} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
