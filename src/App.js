import "./styles.css";

import SignIn from "./features/Login";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Anomalies from "./features/Anomalies";
import ListsPrime from "./features/ListsPrime";
import Update from "./features/UpDate";
import RemoveItem from "./features/RemoveItem";
import DashBoard from "./features/DashBoard";
import Home from "./features/Home";
import { useSelector } from "react-redux";
import Image from "./assets/patterncinema2.jpg"; // Import using relative path

import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function App() {
  const user = useSelector((state) => state.user);

  const theme = createTheme({
    conatainerStyle: {
      borderRadius: 5,
      width: "100%",
      p: 2,
      backgroundImage: `url(${Image})`,
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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container style={theme.conatainerStyle} maxWidth={false}>
          <Router>
            {user.name && <Navbar />}

            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route
                path="anomalies"
                element={user.name ? <Anomalies /> : <SignIn />}
              />

              <Route
                path="update"
                element={user.name ? <Update /> : <SignIn />}
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
              <Route path="home" element={user.name ? <Home /> : <SignIn />} />
              <Route
                path="anomalies"
                element={user ? <Anomalies /> : <SignIn />}
              />
            </Routes>
          </Router>
        </Container>
      </div>
    </ThemeProvider>
  );
}
