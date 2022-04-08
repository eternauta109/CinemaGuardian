import { useState } from "react";
import moment from "moment";

import { TextField, Grid, FormLabel, Switch } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const Solved = ({ item, setItem }) => {
  const [solved, setSolved] = useState(false);
  const [endDate, setEndDate] = useState(moment().format("DD/MM/YYYY"));

  const solvedChange = (e, value) => {
    /* e.preventDefault(); */
    /* setItem({ ...item, solved: !item.solved}); */
    setSolved(e.target.checked);

    setItem({ ...item, endDate: endDate, solved: value });
  };

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={4}>
        <Switch
          checked={solved}
          id="solved"
          onChange={solvedChange}
          inputProps={{ "aria-label": "Issues close" }}
        />
        <FormLabel id="solved">Solved</FormLabel>
      </Grid>
      <Grid item xs={6} sm={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            fullWidth
            renderInput={(props) => <TextField {...props} />}
            label="solved date"
            disabled
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              setItem({ ...item, endDate });
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField fullWidth multiline label="day works" name="worktime" />
      </Grid>
    </Grid>
  );
};

export default Solved;
