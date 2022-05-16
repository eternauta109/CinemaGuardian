import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteItem } from "../slice/itemSlice";

import { useNavigate } from "react-router-dom";

import { Typography, Button, Box } from "@mui/material";

function RemoveItem() {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* console.log("state", state); */

  const onDelete = async () => {
    dispatch(deleteItem({ id: state.id, photos: state.photos }));
    navigate("/home");
  };

  const reject = () => {
    navigate("/home");
  };

  return (
    <Box container sx={{ mt: 4 }} spacing={2} justifyItems="center">
      <Typography>
        {" "}
        {state ? `Are you sure to delete itm  ${state.id}? ` : null}{" "}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="success" onClick={onDelete}>
          yes
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="error"
          onClick={reject}
        >
          no
        </Button>
      </Box>
    </Box>
  );
}

export default RemoveItem;
