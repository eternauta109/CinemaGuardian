import {
  Select,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Grid,
  FormControl
} from "@mui/material";

export const Priority = ({ item, itemChange }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <FormLabel>Priority</FormLabel>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            onChange={itemChange}
            value={item.priority ?? ""}
            labelId="priority"
            name="priority"
            id="prioritySelect"
            label="Priority"
          >
            <MenuItem value="P1">P1</MenuItem>;
            <MenuItem value="P2">P2</MenuItem>;
            <MenuItem value="P3">P3</MenuItem>;
            <MenuItem value="P4">P4</MenuItem>;
            <MenuItem value="P5">P5</MenuItem>;
            <MenuItem value="P6">P6</MenuItem>;
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel id="capexLabel">Capex/Opex</FormLabel>
          <RadioGroup
            row
            onChange={itemChange}
            aria-labelledby="capexLabel"
            name="capex"
            value={item.capex ? item.capex : "Capex"}
          >
            <FormControlLabel value="Capex" control={<Radio />} label="Capex" />
            <FormControlLabel value="Opex" control={<Radio />} label="Opex" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Priority;
