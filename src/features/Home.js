import {} from "react";

/* import { addItem } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom"; */

import { Stack, Container, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  width: 250,
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px"
}));

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Item elevation={9}>List Item</Item>

        <Item elevation={9}>Add a new Anomalies</Item>

        <Item elevation={9}>Charts analisys</Item>
      </Stack>
    </Container>
  );
};

export default Home;
