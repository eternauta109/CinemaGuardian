import * as React from "react";
/* import Box from "@mui/material/Box"; */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../config/firebase_config";

export default function ListNotification({ element, user }) {
  const navigate = useNavigate();

  const deleteNotification = async (id) => {
    console.log("id itemnot", id, user);
    console.log("cccc", element);
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      notifications: arrayRemove(element)
    })
      .then((res) => console.log("doc update:", res))
      .catch((err) => console.log(err));

    navigate("/update", { state: { id: element.item_ref } });
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",

        backgroundColor: "yellow"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${element.updateBy} had update item: ${element.item_ref}`}
        </Typography>
        <Typography variant="h5" component="div">
          Title: {element.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          priority: {element.priority}
        </Typography>
        <Typography variant="body2">
          description:{element.problem}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            deleteNotification(element.item_ref);
          }}
        >
          See detail
        </Button>
        {/*    <Button size="small" color="text.secondary">
          delete
        </Button> */}
      </CardActions>
    </Card>
  );
}
