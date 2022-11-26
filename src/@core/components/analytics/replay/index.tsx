import React, {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Analytics from "@components/analytics/detailed";

export default function Replay() {
  return (
    <div className="mt-4">
      <Typography variant="h6">Replay</Typography>
      <p>View Repetition of the live view</p>

      <Analytics.Consumer>
        {({replay, oneHourAgo, currentDate}) => (
          <div>
            {replay.show && (
              <div className="flex gap-x-4 items-center mt-4">
                <TextField
                  type="number"
                  label="Compartment"
                  variant="outlined"
                  inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                  value={replay.compartment}
                  onChange={(event) => {
                    const value = event.target.value;
                    replay.setCompartment(value);
                  }}
                />

                <span>{new Date(replay.time).toLocaleTimeString()}</span>

                <Slider
                  min={0}
                  max={(currentDate.getTime() - oneHourAgo.getTime()) / 1000}
                  onChange={(event: any) => {
                    const value = event.target.value as number;

                    const time = oneHourAgo.getTime() + value * 100;
                    replay.setTime(time);
                  }}
                  className="!w-60"
                />
              </div>
            )}

            <Button onClick={() => {
              replay.setShow(!replay.show);
              if (replay.show) {
                replay.setTime(0);
              }
            }} className="!mt-4" variant="outlined">Show</Button>
          </div>
        )}
      </Analytics.Consumer>
    </div>
  );
}
