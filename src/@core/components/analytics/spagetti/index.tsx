import Slider from "@mui/material/Slider";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AnalyticsContext from "@components/analytics/detailed";

export default function SpaghettiMap() {
  return (
    <div className="mt-4">
      <Typography variant="h6">Spaghetti Map</Typography>
      <p>Visualization of the walkways</p>

      <AnalyticsContext.Consumer>
        {({spaghetti}) => (
          <div>
            {spaghetti.show && (
              <div className="flex items-center mt-4">
                <Slider
                  className="!w-60 !mr-6"
                  value={spaghetti.lineWidth}
                  onChange={(event: any) => {
                    const value = event.target.value as number;
                    spaghetti.setLineWidth(value);
                  }}
                />

                <TextField
                  type="number"
                  label="Line Width"
                  variant="outlined"
                  inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                  value={spaghetti.lineWidth}
                  onChange={(event: any) => {
                    const value = event.target.value as number;
                    spaghetti.setLineWidth(value);
                  }}
                ></TextField>
              </div>
            )}
            <Button onClick={() => spaghetti.setShow(!spaghetti.show)} className="!mt-4" variant="outlined">Show</Button>
          </div>
        )}
      </AnalyticsContext.Consumer>
    </div>
  )
}
