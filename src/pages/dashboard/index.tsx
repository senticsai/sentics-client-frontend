// ** MUI Imports
import Grid from '@mui/material/Grid'
import AnalyticsCongratulations from "../../views/dashboards/analytics/AnalyticsCongratulations";

const Dashboard = () => {
  return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AnalyticsCongratulations/>
        </Grid>
      </Grid>
  )
}

export default Dashboard
