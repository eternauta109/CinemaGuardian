import { useState, useEffect } from "react";
import { IconButton, TextField, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const PhotoLink = ({ item, setItem }) => {
  const [link, setLink] = useState();

  const linkChange = (e) => {
    setLink(e.target.value);
  };

  const onClickComment = () => {
    if (item.links) {
      const newArray = [...item.links, link];
      setItem({ ...item, links: newArray });
    } else {
      setItem({ ...item, links: [link] });
    }

    setLink("");
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <Grid container sx={{ mt: 1 }} spacing={1}>
      <Grid item xs={10} sm={10}>
        <TextField
          onChange={linkChange}
          fullWidth
          value={link}
          label="egnyte photo link"
          name="link"
        />
      </Grid>
      <Grid item xs={2} sm={2}>
        <IconButton
          aria-label="delete"
          size="large"
          color="primary"
          onClick={onClickComment}
        >
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PhotoLink;
