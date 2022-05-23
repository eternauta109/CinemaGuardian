import {
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Grid,
  FormControl,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { getSuppliers } from "../../slice/supplierSlice";

import moment from "moment";

export const Header = ({ update, item, cinemas, user, setItem }) => {
  const stDate = moment().format("DD/MM/YYYY");
  const [cinemaSelected, setCinemaSelected] = useState("");
  const dispatch = useDispatch();

  const cinemaSelectOnChange = (e) => {
    /* console.log("e", e.target); */
    const res = cinemas.find(({ name }) => name === `${e.target.value}`);
    /* console.log("res", res); */
    setCinemaSelected(e.target.value);
    const numb = (res.rif_num + 1).toString();
    const ref_number = `${res.abbr}-${numb}`;

    dispatch(getSuppliers({ area: res.area }));

    try {
      setItem({
        ...item,
        cinema: [e.target.value][0] ? [e.target.value][0] : "",
        screens: res.screens ? res.screens : "",
        area: res.area ? res.area : "",
        createdBy: user.name ? user.name : "",
        item_ref: ref_number ? ref_number : "",
        stDate: stDate ? stDate : "",
        updateBy: user.name ? user.name : "",
        lastUpdate: stDate ? stDate : "",
        capex: "Capex",
        inProgress: true
      });
    } catch (error) {
      console.log("errore nel setItem di HeaderSection", error);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Rubik Moonrocks", "cursive"].join(",")
    }
  });

  useEffect(() => {
    if (update) {
      dispatch(getSuppliers({ area: item.area }));
      setItem({
        ...item,
        updateBy: user.name,
        lastUpdate: stDate
      });
    }
  }, []);

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <ThemeProvider theme={theme}>
        <Grid item xs={12} sm={12} sx={{ mb: 3 }}>
          <Typography variant="h6">
            {update ? `update item ${item.id}` : `insert new anomalie`}
          </Typography>
        </Grid>
      </ThemeProvider>

      <Grid item xs={8} sm={4}>
        {!update ? (
          <FormControl fullWidth>
            <InputLabel id="category">Cinema</InputLabel>
            <Select
              onChange={(e) => cinemaSelectOnChange(e)}
              value={cinemaSelected || ""}
              labelId="cinema"
              id="cinemaSelect"
              label="cinema"
              name="cinema"
            >
              {cinemas
                ? cinemas.map((e, key) => {
                    return (
                      <MenuItem key={key} value={e.name}>
                        {e.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        ) : (
          <TextField
            value={item.cinema || ""}
            fullWidth
            disabled
            label="cinema"
            name="cinema"
          />
        )}
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          value={item.item_ref || ""}
          InputLabelProps={{ shrink: item.item_ref ? true : false }}
          fullWidth
          disabled
          label="ref"
          name="ref"
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          value={item.screens || ""}
          InputLabelProps={{ shrink: item.screens ? true : false }}
          fullWidth
          disabled
          label="screens"
          name="screens"
        />
      </Grid>
      <Grid item xs={8} sm={4}>
        <TextField
          value={item.area || ""}
          InputLabelProps={{ shrink: item.area ? true : false }}
          fullWidth
          disabled
          label="area"
          name="area"
        />
      </Grid>

      <Grid container sx={{ mt: 1 }} spacing={1} justify="center"></Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          value={item.stDate ? item.stDate : stDate}
          fullWidth
          disabled
          label="created at"
          name="stDate"
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          value={!update ? user.name : item.createdBy}
          fullWidth
          disabled
          label="created by"
          name="createdBy"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          value={user.name || ""}
          fullWidth
          disabled
          label="last update"
          name="updateBy"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          value={stDate || ""}
          InputLabelProps={{ shrink: item.lastUpdate ? true : false }}
          fullWidth
          disabled
          label="date last update"
          name="lastUpdate"
        />
      </Grid>
    </Grid>
  );
};

export default Header;
