import {
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Grid,
  FormControl
} from "@mui/material";

import { categoryList } from "../../config/struttura";

export const Title = ({ item, itemChange }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <TextField
          onChange={itemChange}
          value={item.title}
          inputProps={{
            maxLength: 30
          }}
          helperText="Max 30 char"
          label="title"
          name="title"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            onChange={(e) => itemChange(e)}
            value={item.category ?? ""}
            labelId="category"
            id="categorySelect"
            label="Category"
            name="category"
          >
            {categoryList.map((e, key) => {
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
          value={item.areaCinema}
          fullWidth
          multiline
          label="cinema area"
          name="areaCinema"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          onChange={itemChange}
          value={item.problem}
          fullWidth
          multiline
          label="Problem description"
          name="problem"
        />
      </Grid>
    </Grid>
  );
};

export default Title;
