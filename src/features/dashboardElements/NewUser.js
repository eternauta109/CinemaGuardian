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

import { areaSelect, roleSelect } from "../../config/struttura";

import { useSelector, useDispatch } from "react-redux";

import { addUser } from "../../slice/userSlice";

const NewUser = () => {
  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();
  const cinemas = useSelector((state) => state.cinemas);

  const handleSubmit = async (e) => {
    console.log(newUser);
    dispatch(addUser({ newUser }));
  };

  const handleChange = (e) => {
    /* console.log(e.target); */
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    /* console.log(newUser); */
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
      <Typography variant="h5">new user</Typography>
      <TextField
        name="name"
        label="Name"
        value={newUser.name || ""}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="email"
        value={newUser.email || ""}
        onChange={handleChange}
      />
      <FormControl>
        <InputLabel htmlFor="role">Role</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={newUser.role ?? ""}
          labelId="role"
          id="roleSelect"
          label="role"
          name="role"
        >
          {roleSelect.map((e, key) => {
            return (
              <MenuItem key={key} value={e}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="area">Area</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={newUser.area ?? ""}
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

      <FormControl>
        <InputLabel htmlFor="cinema">Cinema</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={newUser.cinema ?? ""}
          labelId="cinema"
          id="cinemaSelect"
          label="cinema"
          name="cinema"
        >
          {cinemas.map((e, key) => {
            return (
              <MenuItem key={key} value={e}>
                {e.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        name="password"
        id="password"
        label="password"
        value={newUser.password || ""}
        onChange={handleChange}
      />

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

export default NewUser;
