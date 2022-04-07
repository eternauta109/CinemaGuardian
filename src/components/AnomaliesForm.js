import * as React from "react";
import { useState } from "react";
import { Container, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import SaveIcon from "@mui/icons-material/Save";

//componenti del form
import Slider from "./Slider";
import SetCamera from "./SetCamera";
import Pegaso from "./section/PegasoSection";
import Header from "./section/HeaderSection";
import Title from "./section/Title";
import Quotation from "./section/Quotation";
import Solved from "./section/Solved";
import Priority from "./section/Priority";
import Comments from "./section/Comments";

export default function InputAnomalies({
  update,
  cinemas,
  item,
  setItem,
  handleSubmit,
  user
}) {
  const [cinemaSelected, setCinemaSelected] = useState(null);

  console.log(" item in anomaliesform", item);

  const itemChange = (e) => {
    /* e.preventDefault(); */
    /* console.log("item change", e.target.name, e.target.value); */
    console.log("iten in anomalies", item);
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <Container
      sx={{
        borderRadius: 5,

        p: 2
      }}
    >
      <Header
        update={update}
        item={item}
        setItem={setItem}
        cinemas={cinemas}
        user={user}
        cinemaSelected={cinemaSelected}
        setCinemaSelected={setCinemaSelected}
      />

      <hr />

      <Title item={item} itemChange={itemChange} />

      <hr />

      <Comments item={item} setItem={setItem} user={user} />

      <hr />

      <Priority item={item} itemChange={itemChange} />

      <hr />

      <Grid container sx={{ mt: 4 }} spacing={1} justify="center">
        <SetCamera
          user={user}
          cinema={cinemaSelected}
          item={item}
          setItem={setItem}
        />
        <Slider item={item} setItem={setItem} />
      </Grid>

      <hr />

      <Pegaso item={item} itemChange={itemChange} />

      <hr />

      <Quotation itemChange={itemChange} />

      <hr />

      <Solved item={item} setItem={setItem} />

      <hr />

      <Grid container sx={{ mt: 4 }} spacing={1} justify="center">
        <Grid item xs={12}>
          <LoadingButton
            color="secondary"
            onClick={handleSubmit}
            /* loading={loading} */
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            size="large"
          >
            ADD ITEM
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
}
