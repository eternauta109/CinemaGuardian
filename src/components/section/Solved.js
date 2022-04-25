import { useState, useEffect } from "react";
import moment from "moment";

import {
  TextField,
  Grid,
  FormLabel,
  Switch,
  Radio,
  Checkbox,
  RadioGroup,
  FormGroup,
  FormHelperText,
  FormControlLabel,
  FormControl
} from "@mui/material";

export const Solved = ({ item, setItem, user }) => {
  const [endDate, setEndDate] = useState(moment().format("DD/MM/YYYY"));

  const approvedChange = (e) => {
    if (e.target.checked) {
      setItem({
        ...item,
        approved: e.target.checked,
        approvedBy: `${user.name}`
      });
    } else {
      const { approvedBy, ...newobj } = item;
      return setItem({ ...newobj, approved: e.target.checked });
    }

    setItem({
      ...item,
      approved: e.target.checked,
      approvedBy: `${user.name}`
    });
  };

  const inprogressChange = (e) => {
    setItem({
      ...item,
      inProgress: e.target.checked
    });
  };

  const closedChange = (e) => {
    /* console.log("aaaa", e.target.checked); */
    if (e.target.checked) {
      setItem({
        ...item,
        closed: e.target.checked,
        inProgress: false,
        endDate
      });
      /* console.log("aaaa", e.target.checked); */
    } else {
      const { endDate, ...newobj } = item;
      return setItem({ ...newobj, closed: e.target.checked });
    }
  };

  const ShowApproved = () => {
    if (user.role === "am" || user.role === "fm" || user.role === "gm") {
      /* console.log("abi", user.role); */
      return (
        <Checkbox
          checked={item.approved}
          onChange={approvedChange}
          name="approved"
        />
      );
    } else {
      /* console.log("non abi", user.role); */
      return (
        <Checkbox
          disabled
          checked={item.approved}
          onChange={approvedChange}
          name="approved"
        />
      );
    }
  };

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <FormLabel>Item State</FormLabel>
      </Grid>

      <Grid item xs={12} sm={4}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">change the state</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.inProgress}
                  onChange={inprogressChange}
                  name="inProgress"
                />
              }
              label="in progress"
            />
            <FormControlLabel control={<ShowApproved />} label="Approved" />
            <FormHelperText>only gm,fm,am</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.closed}
                  onChange={closedChange}
                  name="closed"
                />
              }
              label="Closed"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          fullWidth
          multiline
          label="solved date"
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
          name="dayWorks"
          InputLabelProps={{ shrink: true }}
          value={
            item.endDate
              ? item.dayWorks
              : moment(item.stDate, "DD/MM/YYYY").fromNow()
          }
        />
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          multiline
          label="approvedBy"
          name="approvedBy"
          InputLabelProps={{ shrink: true }}
          value={item.approvedBy || ""}
        />
      </Grid>
    </Grid>
  );
};

export default Solved;
