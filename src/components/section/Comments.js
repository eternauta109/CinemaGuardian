import { useState } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import TimeLine from "../TimeLine";

export const Comments = ({ item, setItem, user }) => {
  const [comment, setComment] = useState();

  const onCommentAdd = (e) => {
    setComment(e.target.value);
  };

  const onClickComment = () => {
    let newComment = {
      name: user.name,
      comment: comment,
      data: moment().format("DD/MM/YYYY")
    };
    const newArray = [...item.comments, newComment];
    setItem({ ...item, comments: newArray });
    setComment("");
  };

  return (
    <div>
      <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
        <Grid item xs={12} sm={12}>
          <TimeLine item={item} />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
        <Grid item xs={10} sm={10}>
          <TextField
            onChange={onCommentAdd}
            value={comment}
            fullWidth
            multiline
            label={`${user.name} comment`}
            name="comments"
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
    </div>
  );
};

export default Comments;
