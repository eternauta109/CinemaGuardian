import {} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* import { addItem } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom"; */

import {
  Stack,
  Container,
  Paper,
  styled,
  Box,
  Typography,
  Button
} from "@mui/material";

const Item = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  width: 250,
  backgroundColor: "green",
  color: "white",
  opacity: 0.9,
  height: 60,
  lineHeight: "60px"
}));

const Home = () => {
  const cinemas = useSelector((state) => state.cinemas);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(user, cinemas);

  return (
    <Container maxWidth="xl" sx={{ height: "1000px" }}>
      <Box sx={{ backgroundColor: "white", opacity: 0.97, padding: 1, mb: 2 }}>
        <Typography>Welocome {user.name}</Typography>
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Item variant="contained" onClick={() => navigate("/lists")}>
          List Item
        </Item>

        <Item variant="contained" onClick={() => navigate("/anomalies")}>
          Add a new Anomalies
        </Item>

        {/*  <Item elevation={9}>Charts analisys</Item> */}
      </Stack>
    </Container>
  );
};

export default Home;
