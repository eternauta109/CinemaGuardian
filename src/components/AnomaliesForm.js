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
import PhotoLink from "./section/PhotoLink";
import LinksSlider from "./section/LinksSlider";

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
    console.log("itemChange in anomalies", item);
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

      {item.cinema && (
        <>
          <hr />

          <Title item={item} itemChange={itemChange} />

          <hr />

          <Comments item={item} setItem={setItem} user={user} />

          <hr />

          <Priority item={item} itemChange={itemChange} />

          <hr />

          <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
            <Grid item xs={12} sm={12}>
              <SetCamera
                user={user}
                cinema={cinemaSelected}
                item={item}
                setItem={setItem}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              {item.photos ? <Slider item={item} setItem={setItem} /> : null}
            </Grid>
          </Grid>

          <hr />
          <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
            <Grid item xs={12} sm={12}>
              <PhotoLink item={item} setItem={setItem} />
            </Grid>

            <Grid item xs={12} sm={12}>
              {item.links ? <LinksSlider links={item.links} /> : null}
            </Grid>
          </Grid>

          <hr />

          <Pegaso item={item} itemChange={itemChange} />

          <hr />

          <Quotation item={item} setItem={setItem} itemChange={itemChange} />

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
                {update ? "UPDATE" : "ADD ITEM"}
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
