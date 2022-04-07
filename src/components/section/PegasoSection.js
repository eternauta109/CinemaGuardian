import {
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Grid,
  FormControl
} from "@mui/material";

import { fornitoriList } from "../../config/struttura";

export const Pegaso = ({ item, itemChange }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <Typography>Pegaso section</Typography>
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
    </Grid>
  );
};

export default Pegaso;
