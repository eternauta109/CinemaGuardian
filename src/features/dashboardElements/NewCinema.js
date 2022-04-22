import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import {
  TextField,
  FormControl,
  MenuItem,
  Box,
  InputLabel,
  Select,
  Typography
} from "@mui/material";

import { areaSelect } from "../../config/struttura";

import { useDispatch } from "react-redux";

import { addCinema } from "../../slice/cinemaSlice";

const NewCinema = () => {
  const [newCinema, setNewCinema] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    dispatch(addCinema({ newCinema }));
    console.log(newCinema);
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    if (e.target.type === "number") {
      setNewCinema({
        ...newCinema,
        [e.target.name]: e.target.value * 1
      });
    } else {
      setNewCinema({ ...newCinema, [e.target.name]: e.target.value });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">new cinema</Typography>
      <TextField
        name="name"
        label="Name"
        value={newCinema.name || ""}
        onChange={handleChange}
      />
      <TextField
        name="MaintenanceArea"
        label="MaintenanceArea"
        type="number"
        value={newCinema.MaintenanceArea || ""}
        onChange={handleChange}
      />

      <TextField
        name="screens"
        type="number"
        label="screens"
        value={newCinema.screens || ""}
        onChange={handleChange}
      />

      <TextField
        name="abbr"
        label="abbr"
        value={newCinema.abbr || ""}
        onChange={handleChange}
      />

      <FormControl>
        <InputLabel htmlFor="area">Area</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={newCinema.area ?? ""}
          labelId="area"
          id="areaSelect"
          label="area"
          name="area"
        >
          {areaSelect.map((e, key) => {
            return (
              <MenuItem key={key} value={e}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <LoadingButton
        color="secondary"
        onClick={handleSubmit}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        size="large"
      >
        ADD ITEM
      </LoadingButton>
    </Box>
  );
};

export default NewCinema;
