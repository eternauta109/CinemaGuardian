import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { auth, db } from "../../config/firebase_config.js";
import { doc, setDoc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
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

const NewUser = () => {
  const [newUser, setNewUser] = useState({});

  const cinemas = useSelector((state) => state.cinemas);
  /* console.log(cinemas); */
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log(newUser); */
    let password = newUser.password;
    let email = newUser.email;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        let userInDb = cred.user;
        const userDocRes = doc(db, "users", `${cred.user.uid}`);
        try {
          setDoc(userDocRes, {
            uid: userInDb.uid,
            name: newUser.name,
            area: newUser.area ? newUser.area : null,
            cinema: newUser.cinema ? newUser.cinema : null,
            role: newUser.role,
            email: newUser.email,
            notifications: []
          })
            .then(console.log("insert user with:", userInDb.uid))
            .catch((error) => console.log("metadati insert error", error));
        } catch (error) {
          console.log("new user insert error:", error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errocode:", errorCode);
        console.log("errormessage:", errorMessage);
        // ..
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    /* console.log("mmm", e.target.value); */
    if (e.target.name === "cinema") {
      setNewUser({ ...newUser, cinema: e.target.value });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
    /*  console.log(newUser); */
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
          labelId="cinema"
          value={newUser.cinema || ""}
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

      <TextField
        name="password"
        id="password"
        type="password"
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
