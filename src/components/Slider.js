import React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function Slider({ photos }) {
  console.log("item in proiva", photos);

  const removePhoto = (index) => {
    console.log(index);
  };

  return (
    <Stack spacing={2}>
      <ImageList sx={{ height: 220 }} cols={3} rowHeight={164}>
        {photos.map((e, k) => (
          <ImageListItem key={k}>
            <img
              src={`${e}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${e}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={e}
              loading="lazy"
            />
            <IconButton
              onClick={() => removePhoto(k)}
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
