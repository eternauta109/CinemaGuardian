import "./styles.css";
import { useEffect } from "react";
//componets
import SignIn from "./features/Login";
import Navbar from "./components/Navbar";
import Anomalies from "./features/Anomalies";
import ListsPrime from "./features/ListsPrime";
import Update from "./features/UpDate";
import RemoveItem from "./features/RemoveItem";
import DashBoard from "./features/DashBoard";
import Home from "./features/Home";
import ScrollTop from "./features/ScrollTop";

import { Route, Routes, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function App() {
  const user = useSelector((state) => state.user);
  const auth = getAuth();
  const navigate = useNavigate();

  const theme = createTheme({
    conatainerStyle: {
      borderRadius: 5,
      width: "100%",
      p: 2,
      backgroundImage: `url(https://rawcdn.githack.com/eternauta109/CinemaGuardian/be3a9792e49c646e7c9f00d09b6f9039d63d9933/src/assets/patterncinema2.jpg)`,
      height: "100%"
    },

    paperContainer: {},
    palette: {
      primary: {
        main: "#ff8f00"
      },
      secondary: {
        main: "#7cb342"
      }
    },
    typography: {
      fontFamily: ["Josefin Sans", "cursive"].join(",")
    }
  });

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container style={theme.conatainerStyle} maxWidth={false}>
          <ScrollTop>
            {auth.currentUser && <Navbar />}

            <Routes>
              <Route path="/" element={<SignIn />} />

              <Route
                path="anomalies"
                element={auth.currentUser ? <Anomalies /> : <SignIn />}
              />

              <Route
                path="update"
                element={auth.currentUser ? <Update /> : <SignIn />}
              />
              <Route
                path="removeitem"
                element={user.name ? <RemoveItem /> : <SignIn />}
              />
              {/* <Route path="lists" element={<Lists />} /> */}
              <Route
                path="lists"
                element={user.name ? <ListsPrime /> : <SignIn />}
              />
              <Route
                path="dashboard"
                element={user.name ? <DashBoard /> : <SignIn />}
              />
              <Route
                path="home"
                element={auth.currentUser ? <Home /> : <SignIn />}
              />
              <Route
                path="anomalies"
                element={user ? <Anomalies /> : <SignIn />}
              />
            </Routes>
          </ScrollTop>
        </Container>
      </div>
    </ThemeProvider>
  );
}
