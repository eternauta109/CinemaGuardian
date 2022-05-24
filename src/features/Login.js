import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

/* import LoginContext from "../contex/LoginContext" */
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slice/userSlice";
import { getCinemas } from "../slice/cinemaSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      marginBottom="40px"
      borderRadius="5px"
      align="center"
      {...props}
      sx={{ bgcolor: "gray", opacity: 0.9, width: "300px" }}
    >
      {"Dev By  "}
      <Link color="inherit" href="#">
        Fabio Conti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// main function

export default function SignIn() {
  const password = useRef(null);
  const username = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  /*  let navigate = useNavigate(); */

  const handleSubmit = async (event) => {
    event.preventDefault();

    let passwordValue = password.current.value;
    let usernameValue = username.current.value;

    if (!passwordValue || !usernameValue) {
      return alert("inserire i campi");
    }
    dispatch(getUser({ username: usernameValue, password: passwordValue }));
  };

  useEffect(() => {
    if (user.name) {
      dispatch(getCinemas({ user })).then(navigate("/home"));
    }
  }, [dispatch, user]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        width: "100%",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          margin: "auto",
          padding: "8px",
          borderRadius: "5px",
          opacity: 0.95,
          bgcolor: "#f9fbe7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            sx={{ input: { backgroundColor: "white" } }}
            /* defaultValue="cupertinod" */
            id="username"
            inputRef={username}
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            sx={{ input: { backgroundColor: "white" } }}
            fullWidth
            inputRef={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
