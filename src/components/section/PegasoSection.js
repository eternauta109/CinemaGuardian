import {
  Select,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormLabel,
  Grid,
  FormControl
} from "@mui/material";

import moment from "moment";

import { useState } from "react";

import { fornitoriList } from "../../config/struttura";

export const Pegaso = ({ item, itemChange, setItem }) => {
  const [orderStr, setString] = useState();
  const mesi = ["gennaio", "febbraio", "marzo"];

  moment.locale();

  let parse = moment(item.stDate, "DD/MM/YYYY");

  const onClickEvent = () => {
    let str = `${item.priority || "..."}-${item.item_ref || "..."}-${
      item.competence || "..."
    }-${item.title || "..."}-${parse.format("MMMM")}`;

    setString(str);
  };

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <FormLabel id="timetable">Pegaso Section</FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="category">Competence</InputLabel>
          <Select
            onChange={(e) => itemChange(e)}
            value={item.competence ?? ""}
            labelId="competence"
            id="competenceSelect"
            label="Competence"
            name="competence"
          >
            {fornitoriList.map((e, key) => {
              return (
                <MenuItem key={key} value={e}>
                  {e}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          onChange={itemChange}
          value={item.orderNumber}
          fullWidth
          multiline
          label="Pegaso order Number"
          name="orderNumber"
        />
      </Grid>

      <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
        <Grid item xs={2} sm={2}>
          <Button variant="contained" color="success" onClick={onClickEvent}>
            GET STRING
          </Button>
        </Grid>

        <Grid item xs={10} sm={10}>
          <TextField
            value={orderStr || ""}
            fullWidth
            multiline
            label="Pegaso order string"
            name="pegasoOrderString"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pegaso;
