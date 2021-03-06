import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase_config";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Avatar,
  Container,
  Tooltip,
  MenuItem,
  AppBar,
  Box,
  Tab,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Chip
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontFamily: ["Rubik Moonrocks", "cursive"].join(",")
  }
});

const ResponsiveAppBar = () => {
  const user = useSelector((store) => store.user);
  /* console.log("navbar", user); */
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let navigate = useNavigate();

  const Pages = () => {
    return (
      <>
        <MenuItem>
          <Tab
            icon={<HomeIcon />}
            label="home"
            onClick={() => handleClick("home")}
          />
        </MenuItem>
        <MenuItem>
          <Tab
            icon={<AddTaskIcon />}
            label="add item"
            onClick={() => handleClick("Add Anomaly")}
          />
        </MenuItem>
        <MenuItem>
          <Tab
            icon={<FormatListBulletedIcon />}
            label="Lists"
            onClick={() => handleClick("Lists")}
          />
        </MenuItem>
        <MenuItem>
          <Tab
            icon={<PersonIcon />}
            label="DashBoard"
            onClick={() => handleClick("DashBoard")}
          />
        </MenuItem>
      </>
    );
  };

  let settings = [`name: fabio`, `cinema: parco`, `direttore`];

  if (user) {
    switch (user.role) {
      case "gm":
        settings = [`${user.name}`, `${user.role}`];
        break;
      case "fm": //facilities
      case "am": //area manager
        settings = [` ${user.name}`, ` ${user.area}`, ` ${user.role}`];

        break;
      case "m": //manager
      case "hm": //head manager
        settings = [` ${user.name}`, ` ${user.cinema}`, ` ${user.role}`];

        break;
      default:
        break;
    }
  }

  /*  const settings = [{user.name}, "Account", "Dashboard", "Logout"];*/

  const handleOpenNavMenu = (event) => {
    /* console.log(event.currentTarget); */
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClick = (page) => {
    /* console.log(page); */

    handleCloseNavMenu();
    switch (page) {
      case "home":
        navigate("/home");
        break;
      case "Add Anomaly":
        navigate("/anomalies");
        break;

      case "Lists":
        navigate("/lists");
        break;

      case "DashBoard":
        navigate("/dashboard");
        break;

      default:
        break;
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              CineGuardian
            </Typography>
          </ThemeProvider>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {/* qui va pages */}
              <Pages />
            </Menu>
          </Box>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              CineGuardian
            </Typography>
          </ThemeProvider>

          <MenuItem sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tab
              icon={<HomeIcon />}
              label="home"
              onClick={() => handleClick("home")}
            />
          </MenuItem>

          <MenuItem sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tab
              icon={<AddTaskIcon />}
              label="add item"
              onClick={() => handleClick("Add Anomaly")}
            />
          </MenuItem>
          <MenuItem sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tab
              icon={<FormatListBulletedIcon />}
              label="Lists"
              onClick={() => handleClick("Lists")}
            />
          </MenuItem>
          <MenuItem sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tab
              icon={<PersonIcon />}
              label="DashBoard"
              onClick={() => handleClick("DashBoard")}
            />
          </MenuItem>
          <Box sx={{ flexGrow: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Chip
                    sx={{ backgroundColor: "secondary.main", width: "100%" }}
                    label={setting}
                    variant="outlined"
                  />
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Chip
                  sx={{ backgroundColor: "primary.main", width: "100%" }}
                  label="log-out"
                  variant="outlined"
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        navigate("/");
                      })
                      .catch((error) => {
                        alert("error in user log out:", error);
                      });
                  }}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
