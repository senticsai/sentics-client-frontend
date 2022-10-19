// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexDonutChart from "../../views/analytics/charts/ApexDonutChart";
import 'react-datepicker/dist/react-datepicker.css'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import ApexAreaChart from "../../views/analytics/charts/ApexAreaChart";
import ApexLineChart from "../../views/analytics/charts/ApexLineChart";

const Analytics = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ApexDonutChart/>
        </Grid>
        <Grid item xs={12} md={12}>
          <ApexLineChart/>
        </Grid>
        {/*<Grid item xs={12} md={12}>*/}
        {/*  <ApexAreaChart/>*/}
        {/*</Grid>*/}

      </Grid>
    </ApexChartWrapper>

  )
}

export default Analytics
