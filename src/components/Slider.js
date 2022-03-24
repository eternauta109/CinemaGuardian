import React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { storage } from "../config/firebase_config";
import { ref, deleteObject } from "firebase/storage";

function Slider({ item, setItem }) {
  console.log("item in proiva", item.photos);

  const removePhoto = (name, k) => {
    console.log(name);
    const desertRef = ref(storage, `${name}`);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("file deleted", k);
        const app = item.photos;
        app.splice(k, 1);
        setItem({ ...item, photos: app });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack spacing={2}>
      {item.photos && (
        <ImageList sx={{ height: 220 }} cols={3} rowHeight={164}>
          {item.photos.map((e, k) => (
            <ImageListItem key={k}>
              <img
                src={`${e.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${e.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={e}
                loading="lazy"
              />
              <IconButton
                onClick={() => removePhoto(e.name, k)}
                aria-label="delete"
                size="small"
                sx={{ m: 0 }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Stack>
  );
}

export default Slider;
