import react, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { CredentialContext } from "../contex/StoreContext";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ResponsiveAppBar = () => {
  const { user } = useContext(CredentialContext);
  /* console.log("navbar", user); */
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let navigate = useNavigate();

  const pages = ["Add Anomaly", "Lists", "User"];

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
    switch (page) {
      case "Add Anomaly":
        navigate("/anomalies");
        break;

      case "Lists":
        navigate("/home");
        break;

      case "User":
        navigate("/newuser");
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            CineGuardian
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" value={page}>
                    <Button
                      key={page}
                      onClick={() => handleClick(page)}
                      sx={{ color: "blue" }}
                    >
                      {page}
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            CineGuardian
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(handleCloseNavMenu, () => handleClick(page))}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
                    navigate("/");
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
