import {
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Grid,
  FormControl,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import moment from "moment";

export const Header = ({
  update,
  item,
  cinemas,
  user,
  setCinemaSelected,
  cinemaSelected,
  setItem,
}) => {
  const stDate = moment().format("DD/MM/YYYY");

  const cinemaSelect = (e) => {
    const res = cinemas.find(({ name }) => name === `${e.target.value}`);
    setCinemaSelected(res);
    console.log(res);
    const numb = (res.rif_num + 1).toString();
    console.log("numb", numb);
    const ref_number = `${res.abbr}-${numb}`;
    console.log("res", cinemaSelected);
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      screens: res.screens,
      area: res.area,
      createdBy: user.name,
      item_ref: ref_number,
      stDate: stDate,
      updateBy: user.name,
      lastUpdate: stDate,
    });
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Rubik Moonrocks", "cursive"].join(","),
    },
  });

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
              onChange={(e) => cinemaSelect(e)}
              value={item.cinema ?? ""}
              labelId="cinema"
              id="cinemaSelect"
              label="cinema"
              name="cinema"
            >
              {cinemas.map((e, key) => {
                return (
                  <MenuItem key={key} value={e.name}>
                    {e.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          <TextField
            value={item.cinema}
            fullWidth
            disabled
            label="cinema"
            name="cinema"
          />
        )}
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          value={item.item_ref}
          fullWidth
          disabled
          label="ref"
          name="ref"
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          value={item.screens}
          fullWidth
          disabled
          label="screens"
          name="screens"
        />
      </Grid>
      <Grid item xs={8} sm={4}>
        <TextField
          value={item.area}
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
          value={user.name}
          fullWidth
          disabled
          label="created by"
          name="createdBy"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          value={user.name}
          fullWidth
          disabled
          label="last update"
          name="updateBy"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          value={item.lastUpdate ? item.lastUpdate : stDate}
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