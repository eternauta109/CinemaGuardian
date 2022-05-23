import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import {
  TextField,
  FormControl,
  MenuItem,
  Box,
  Typography,
  InputLabel,
  Select
} from "@mui/material";

import { areaSelect } from "../../config/struttura";

import { useDispatch } from "react-redux";

import { addSupplier } from "../../slice/supplierSlice";

const NewSupplier = () => {
  const [newSupp, setNewSupplier] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    dispatch(addSupplier({ newSupp }));
  };

  const handleChange = (e) => {
    /* console.log(e.target); */

    setNewSupplier({ ...newSupp, [e.target.name]: e.target.value });
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "80%" }
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">new supplier</Typography>
      <TextField
        name="name"
        label="Name"
        value={newSupp.name || ""}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="email"
        value={newSupp.email || ""}
        onChange={handleChange}
      />
      <TextField
        name="phone"
        type="number"
        id="phone"
        label="phone number"
        value={newSupp.phone || ""}
        onChange={handleChange}
      />

      <FormControl>
        <InputLabel htmlFor="area">Area</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={newSupp.area ?? ""}
          labelId="area"
          id="area"
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

export default NewSupplier;
