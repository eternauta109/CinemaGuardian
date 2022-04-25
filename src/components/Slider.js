import React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Stack from "@mui/material/Stack";
import { storage } from "../config/firebase_config";
import { ref, deleteObject } from "firebase/storage";

function Slider({ item, setItem }) {
  /* console.log("item in proiva", item.photos); */

  const removePhoto = (e, k) => {
    /* console.log("e", e); */
    const desertRef = ref(storage, `${e.name}`);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        let app = item.photos.filter((value) => {
          return value.name !== e.name;
        });
        /* console.log("app", app); */
        setItem({ ...item, photos: app });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Stack container spacing={2}>
      <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
        {item.photos.map((e, k) => (
          <ImageListItem key={k}>
            <img
              src={`${e.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${e.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={e.name}
              loading="lazy"
            />

            <IconButton
              onClick={() => removePhoto(e, k)}
              aria-label="delete"
              size="small"
              sx={{ m: 0 }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  );
}

export default Slider;
