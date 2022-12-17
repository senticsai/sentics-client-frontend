// ** MUI Imports
import 'react-datepicker/dist/react-datepicker.css'
import {Button, FormControl, Select} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";

// ** Icon Imports
import Shield from "mdi-material-ui/Shield";
import LightningBolt from "mdi-material-ui/LightningBolt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {uppercaseFirstLetter} from "../../@core/utils/uppercaseFirstLetter";
import {DebouncedTextField} from '../../@core/components/debounced-input/debouncedInput'
import AnalyticsResult from 'src/views/analytics/AnalyticsResult';

const tabs = [
  {
    label: 'Safety',
    icon: Shield,
    children: [
      {
        label: 'Safety Score',
        classFilter: false,
        aggregations: ['avg', 'min']
      },

      // {
      //   label: 'Distance',
      //   classFilter: false,
      //   aggregations: ['avg', 'min', 'max']
      // }
    ]
  },
  {
    label: 'Efficiency',
    icon: LightningBolt,
    children: [
      {
        label: 'Number Of Objects',
        classFilter: true,

        // TODO add none aggregation and optimize the drawing with chunks
        aggregations: ['avg', 'min', 'max']
      }
    ]
  }
]

const aggregations = {
  'none': 'Raw',
  'avg': 'Average',
  'min': 'Min',
  'max': 'Max'
}

const classes = ['human', 'vehicle'];

const Analytics = () => {
  // TODO consider merging all states into one object
  const [startDateTime, setStartDateTime] = useState(new Date(new Date().getTime() - 60 * 60 * 1000));
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedSubTab, setSelectedSubTab] = useState(selectedTab.children[0]);
  const [selectedAggregation, setSelectedAggregation] = useState(selectedSubTab.aggregations[0]);
  const [selectedClasses, setSelectedClasses] = useState(classes);
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(0);

  useEffect(() => {
    if (selectedSubTab.aggregations.includes(selectedAggregation)) {
      return;
    }
    setSelectedAggregation(selectedSubTab.aggregations[0]);

  }, [selectedSubTab]);

  function getQuery(): AnalyticsQuery {
    return {
      analytics: selectedTab.label.toLowerCase() as any,
      metric: selectedSubTab.label.toLowerCase() as any,
      aggregation: selectedAggregation as any,
      classes: selectedClasses as any,
      minThreshold,
      maxThreshold,
      startDateTime: isoDateWithoutTimeZone(startDateTime?.$d as Date),
      endDateTime: isoDateWithoutTimeZone(endDateTime?.$d as Date)
    };
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <div className="flex justify-between mb-6">
          <div className="flex gap-4 items-center">
            {tabs.map((tab, index) => {
              return (
                <Button variant={selectedTab.label === tab.label ? 'contained' : 'outlined'} key={index}
                        onClick={() => {
                          setSelectedTab(tab);
                          setSelectedSubTab(tab.children[0]);
                        }}>
                  <tab.icon className="mr-2"/>
                  {tab.label}
                </Button>
              )
            })}
          </div>


          <div className="flex gap-4">
            <DateTimePicker
              label="Start Time"
              value={startDateTime}
              onChange={(newValue) => {
                setStartDateTime(newValue as Date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Time"
              value={endDateTime}
              onChange={(newValue) => {
                setEndDateTime(newValue as Date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8 items-center">
          <FormControl size="small">
            <InputLabel>Metric</InputLabel>
            <Select
              value={selectedSubTab}
              label="Metric"
              onChange={(event) => {
                setSelectedSubTab(event.target.value as any);
              }}
            >
              {selectedTab.children.map((subTab, index) => {
                return (
                  <MenuItem value={subTab as any} key={index}>{subTab.label}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel>Aggregation</InputLabel>
            <Select
              value={selectedAggregation}
              label="Aggregation"
              onChange={(event) => {
                setSelectedAggregation(event.target.value as any);
              }}
            >
              {selectedSubTab.aggregations.map((aggregation, index) => {
                return (
                  <MenuItem value={aggregation as any} key={index}>{aggregations[aggregation]}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

          {selectedSubTab.classFilter && (
            <FormControl size="small">
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClasses}
                label="Class"
                multiple
                onChange={(event) => {
                  setSelectedClasses(event.target.value as any);
                }}
              >
                {classes.map((className, index) => {
                  return (
                    <MenuItem value={className as any} key={index}>{uppercaseFirstLetter(className)}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )}

          <DebouncedTextField
            className="w-32"
            label="Min Threshold"
            variant="outlined"
            size="small"
            type="number"
            value={minThreshold}
            onChange={(event) => {
              setMinThreshold(Number(event.target.value));
            }}
          />

          <DebouncedTextField
            className="w-32"
            label="Max Threshold"
            variant="outlined"
            size="small"
            type="number"
            value={maxThreshold}
            onChange={(event) => {
              setMaxThreshold(Number(event.target.value));
            }}
          />
        </div>

        <div>
          <AnalyticsResult onDateTimeChange={
            (startDateTime, endDateTime) => {
              const timeZoneOffset = new Date().getTimezoneOffset() / 60 * -1;
              startDateTime = (timeZoneOffset * 1000 * 60 * 60) + Number(startDateTime);
              endDateTime = (timeZoneOffset * 1000 * 60 * 60) + Number(endDateTime);

              setStartDateTime(new Date(startDateTime));
              setEndDateTime(new Date(endDateTime));
            }
          } query={getQuery()}/>
        </div>
      </>
    </LocalizationProvider>
  )
}

export default Analytics

function isoDateWithoutTimeZone(date) {
  if (date == null) return date;
  const timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  const correctDate = new Date(timestamp);

  return correctDate.toISOString();
}
