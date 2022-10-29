// ** MUI Imports
import Grid from '@mui/material/Grid'
import AnalyticsCongratulations from "../../views/dashboards/analytics/AnalyticsCongratulations";
import ApexChartWrapper from '@core/styles/libs/react-apexcharts';

// import ApexDonutChart from "../../views/analytics/charts/ApexDonutChart";

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AnalyticsCongratulations/>
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <ApexDonutChart/>*/}
        {/*</Grid>*/}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
