import "./styles.css";

import { useContext } from "react";
import SignIn from "./features/Login";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./features/Home";
import Anomalies from "./features/Anomalies";
import NewUser from "./features/NewUser";
import Update from "./features/UpDate";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function App() {
  const user = useSelector((state) => state.user);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff8f00"
      },
      secondary: {
        main: "#7cb342"
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container
          sx={{
            borderRadius: 5,

            p: 2
          }}
        >
          <Router>
            {user.name && <Navbar />}

            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="anomalies" element={<Anomalies />} />
              <Route
                path="newuser"
                element={user.name ? <NewUser /> : <SignIn />}
              />
              <Route path="update" element={<Update />} />
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
