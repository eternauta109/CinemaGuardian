import "./styles.css";

import SignIn from "./features/Login";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
/* import Home from "./features/Home"; */
import Anomalies from "./features/Anomalies";
/* import Lists from "./features/Lists"; */
import ListsPrime from "./features/ListsPrime";
import HomeLists from "./features/HomePrime";

import Update from "./features/UpDate";
import RemoveItem from "./features/RemoveItem";
import DashBoard from "./features/DashBoard";
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
    },
    typography: {
      fontFamily: ["Josefin Sans", "cursive"].join(",")
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container
          sx={{
            borderRadius: 5,
            width: "100%",
            p: 2
          }}
        >
          <Router>
            {user.name && <Navbar />}

            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="anomalies" element={<Anomalies />} />

              <Route path="update" element={<Update />} />
              <Route path="removeitem" element={<RemoveItem />} />
              {/* <Route path="lists" element={<Lists />} /> */}
              <Route path="home" element={<ListsPrime />} />
              <Route path="dashboard" element={<DashBoard />} />
              {/*   <Route path="home" element={user.name ? <Lists /> : <SignIn />} /> */}
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
