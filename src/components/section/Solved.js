import { useState } from "react";
import moment from "moment";

import { TextField, Grid, FormLabel, Switch } from "@mui/material";

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
        <TextField
          fullWidth
          multiline
          label="solvaed date"
          name="endDate"
          InputLabelProps={{ shrink: true }}
          value={item.endDate ? item.endDate : "in progress"}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          fullWidth
          multiline
          label="day works"
          name="worktime"
          InputLabelProps={{ shrink: true }}
          value={
            item.endDate
              ? moment(item.endDate, "DD/MM/YYYY").fromNow()
              : moment(item.stDate, "DD/MM/YYYY").fromNow()
          }
        />
      </Grid>
    </Grid>
  );
};

export default Solved;
