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
  const [state, setState] = useState({
    inProgress: item.stateItem ? item.stateItem.inProgress : true,
    approved: item.stateItem ? item.stateItem.approved : false,
    closed: item.stateItem ? item.stateItem.closed : false
  });
  const [endDate, setEndDate] = useState(moment().format("DD/MM/YYYY"));
  const { inProgress, approved, closed } = state;

  const handleChange = (e) => {
    /* e.preventDefault(); */
    /* setItem({ ...item, solved: !item.solved}); */

    /* console.log(e.target.name); */
    setState({
      ...state,
      [e.target.name]: e.target.checked
    });

    console.log(state);

    switch (e.target.name) {
      case "approved":
        return setItem({
          ...item,
          approvedBy: `${user.name}`
        });
      case "closed":
        console.log("cheked", state.closed);
        if (state.closed) {
          const { endDate, ...newobj } = item;
          return setItem(newobj);
        } else {
          return setItem({
            ...item,
            endDate
          });
        }

      default:
        break;
    }
  };

  const ShowApproved = () => {
    if (user.role === "am" || user.role === "fm" || user.role === "gm") {
      console.log("abi", user.role);
      return (
        <Checkbox checked={approved} onChange={handleChange} name="approved" />
      );
    } else {
      console.log("non abi", user.role);
      return (
        <Checkbox
          disabled
          checked={approved}
          onChange={handleChange}
          name="approved"
        />
      );
    }
  };

  useEffect(() => {
    setItem({
      ...item,
      inProgress: state.inProgress,
      approved: state.approved,
      closed: state.closed
    });
  }, [state]);

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
                  checked={inProgress}
                  onChange={handleChange}
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
                  checked={closed}
                  onChange={handleChange}
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
