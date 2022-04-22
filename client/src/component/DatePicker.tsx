import { Paper, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { store } from "../utils/store";

export default function DatePicker() {
  const { state, dispatch } = useContext<any>(store);
  const handleChange = (newValue: Date | null) => {
    dispatch({ type: "SET_DATE", payload: dayjs(newValue).format("YYYY-MM-DD") });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper>
        <MobileDatePicker
          InputProps={{
            size: "small",
          }}
          // label="Lookup for"
          inputFormat="DD/MM/YYYY"
          value={state.selectedDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Paper>
    </LocalizationProvider>
  );
}
