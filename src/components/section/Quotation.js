import { TextField, Grid, InputAdornment, FormLabel } from "@mui/material";

export const Quotation = ({ itemChange, item, setItem }) => {
  const finalChange = (e) => {
    const total = e.target.value;
    setItem({
      ...item,
      quotation: Number(total),
      orderCost: Number(total),
      finalCost: Number(total)
    });
  };
  const onNumberChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: Number(e.target.value)
    });
  };

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <FormLabel>Cost</FormLabel>
      </Grid>

      <Grid item xs={4} sm={4}>
        <TextField
          label="Quotation"
          type="number"
          variant="standard"
          value={Number(item.quotation)}
          onChange={onNumberChange}
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
          value={Number(item.orderCost)}
          onChange={onNumberChange}
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
          value={Number(item.finalCost)}
          onChange={finalChange}
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
