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

import { useSelector } from "react-redux";

export const Pegaso = ({ item, itemChange, setItem }) => {
  const [orderStr, setString] = useState();

  const suppliers = useSelector((store) => store.suppliers);
  console.log("supplier", suppliers);
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
            {suppliers &&
              suppliers.map((e, key) => {
                return (
                  <MenuItem key={key} value={e.name}>
                    {e.name}
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

      <Grid item xs={4} sm={4}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={onClickEvent}
        >
          GET STRING FOR PEGASO ORDER
        </Button>
      </Grid>

      <Grid item xs={8} sm={8}>
        <TextField
          value={orderStr || ""}
          fullWidth
          multiline
          label="Pegaso order string"
          name="pegasoOrderString"
        />
      </Grid>
    </Grid>
  );
};

export default Pegaso;
