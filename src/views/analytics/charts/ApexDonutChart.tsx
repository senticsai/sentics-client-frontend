// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

interface ApexDonutChartProps {
  labels: string[]
  series: number[]
  centerText: string
}

const ApexDonutChart = ({labels, series, centerText}: ApexDonutChartProps) => {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: labels,
    stroke: {width: 0},
    colors: ['#fdd835', '#00d4bd', '#ff5b5b', '#7367f0', '#28c76f', '#ea5455', '#ff9f43', '#1e1e1e', '#9980fa', '#0acf97'],
    dataLabels: {
      enabled: true,
      formatter(val: string) {
        return `${parseInt(val, 10)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val: string) {
                // find the percentage of the value
                const percentage = (parseInt(val, 10) / series.reduce((a, b) => a + b)) * 100

                return percentage.toFixed(1) + '%'
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: centerText,
              formatter() {
                let total = 0;

                const totalSeries = series.reduce((a, b) => a + b, 0);

                if (centerText === 'Total') return totalSeries;

                series.forEach((val: number, index) => {
                  const score = Number(labels[index]);
                  total += score * Number(val);
                })

                return `${(total / totalSeries).toFixed(1)}`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <ReactApexcharts options={options} series={series} type='donut' height={400}/>
  )
}

export default ApexDonutChart
