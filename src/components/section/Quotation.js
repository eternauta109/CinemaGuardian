import { TextField, Grid, InputAdornment } from "@mui/material";

export const Quotation = ({ itemChange }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={4} sm={4}>
        <TextField
          label="Quotation"
          type="number"
          variant="standard"
          onChange={itemChange}
          name="quotation"
          id="standard-size-small"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          label="orderCost"
          type="number"
          variant="standard"
          onChange={itemChange}
          name="orderCost"
          id="standard-size-small"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <TextField
          label="finalCost"
          type="number"
          variant="standard"
          onChange={itemChange}
          name="finalCost"
          id="standard-size-small"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Quotation;
