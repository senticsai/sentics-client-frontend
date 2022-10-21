import React, { useState } from "react";
import debounce from "lodash/debounce";
import TextField from "@mui/material/TextField";

export const debouncedInput = (Component, timeout = 500) => ({ onChange, value, ...props }) => {
  const [debouncedValue, setValue] = useState(value);
  const handleTextChange = (e) => {
    setValue(e.target.value);
    sendTextChange(e);
  };
  const sendTextChange = debounce((newValue) => onChange(newValue), timeout);

  return <Component {...props} onChange={handleTextChange} value={debouncedValue} />;
};

export const DebouncedTextField = debouncedInput(TextField, 1000)
