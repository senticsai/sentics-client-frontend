// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {MapComponent} from "../../views/live/3d-map/map";
import {useEffect, useState} from "react";

const Live = () => {
  const [positions, setPositions] = useState<PositionPayload>({
    human: {},
    vehicle: {}
  });

  useEffect(() => {
    console.log("Live page loaded");

    // TODO use react-hooks-sse
    const evtSource = new EventSource("http://localhost:3000/live", { withCredentials: true } );
    evtSource.onmessage = function(e) {
      setPositions(JSON.parse(e.data));
    }
  }, [])



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{height: '572px'}}>
          <CardHeader title='Live Map Here!'></CardHeader>
          <CardContent sx={{height: '500px', pb: '24px'}}>
            <MapComponent positions={positions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Live
