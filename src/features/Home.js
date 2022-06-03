import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebase_config";
import { onSnapshot, doc } from "firebase/firestore";
import ListNotification from "./homeComps/ListNotification";

import {
  Stack,
  ListItem,
  List,
  Container,
  Divider,
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
  /*  const cinemas = useSelector((state) => state.cinemas); */
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [listNotes, setListNotes] = useState([]);

  // console.log(user);
  //console.log("listnotes", listNotes);

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const unsub = onSnapshot(docRef, (snapShot) => {
      let arrayApp = snapShot.data().notifications;
      setListNotes(arrayApp);
    });
    return () => unsub();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ height: "1000px", opacity: 0.95 }}>
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        {listNotes && (
          <Box
            sx={{ backgroundColor: "white", opacity: 0.97, padding: 1, mb: 2 }}
          >
            <Typography>{`LAST ITEM INSERT or UPDATE (${listNotes.length})`}</Typography>
            <List
              dense
              sx={{
                maxHeight: 400,
                position: "relative",
                overflow: "auto",
                width: "100%",
                maxWidth: 360,
                opacity: 0.95,
                bgcolor: "background.paper"
              }}
            >
              <Divider />
              {listNotes
                ? listNotes.map((el, key) => {
                    return (
                      <ListItem key={key}>
                        <ListNotification element={el} user={user} />
                      </ListItem>
                    );
                  })
                : null}
            </List>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
/* {listNotes && listNotes.lenght > 0 ? (
          <div>ciao</div>
        ) : (
          <div>niente</div>
        )} */
