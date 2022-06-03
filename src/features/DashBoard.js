import { useState } from "react";
import { useSelector } from "react-redux";
/* import { addItem } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom"; */

import { Box, ButtonBase, Typography, styled } from "@mui/material";
import NewUser from "./dashboardElements/NewUser";
import NewCinema from "./dashboardElements/NewCinema";
import NewSupplier from "./dashboardElements/NewSupplier";

const DashBoard = () => {
  const [param, setParam] = useState();
  const user = useSelector((store) => store.user);

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15
      },
      "& .MuiImageMarked-root": {
        opacity: 0
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor"
      }
    }
  }));

  const images = [
    {
      url:
        "https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg",
      title: "user",
      width: "33%"
    },
    {
      url:
        "https://u7.uidownload.com/vector/703/790/vector-free-theater-cinema-building-with-film-reel-vector-eps-svg.jpg",
      title: "cinema",
      width: "34%"
    },
    {
      url: "https://sagitterone.co.uk/wp-content/uploads/2016/11/supplier.jpg",
      title: "supplier",
      width: "33%"
    }
  ];

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }));

  const FormSelect = () => {
    /* console.log("qqqq", user); */
    switch (param) {
      case "user":
        if (user.admin) {
          return <NewUser />;
        } else {
          return <Typography>Only for admin</Typography>;
        }

      case "cinema":
        if (user.admin) {
          return <NewCinema />;
        } else {
          return <Typography>Only for admin</Typography>;
        }

      default:
        return <NewSupplier />;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        opacity: 0.95,
        width: "100%"
      }}
    >
      <Box
        sx={{ display: "flex", flexWrap: "wrap", minWidth: 200, width: "100%" }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          DASHBORAD ADMINISTRATOR
        </Typography>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={() => setParam(image.title)}
            style={{
              width: image.width
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
        <FormSelect />
      </Box>
    </Box>
  );
};

export default DashBoard;
