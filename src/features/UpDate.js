import { useLocation } from "react-router-dom";
import AnomaliesForm from "../components/AnomaliesForm";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateItem } from "../slice/itemSlice";
import { useEffect, useState } from "react";

import moment from "moment";

function UpDate() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  console.log("state", state);
  const [item, setItem] = useState();

  const getItemFromLists = async () => {
    const finder = await items.find((e) => e.id === state.id);

    setItem(finder);
  };

  const handleSubmit = async () => {
    setItem({
      ...item,
      lastUpdate: moment().format("DD/MM/YYYY"),
      updateBy: user.name
    });

    dispatch(updateItem({ item }));
  };

  useEffect(() => {
    getItemFromLists();
    console.log("update", item);
    /* getItem(state.id); */
    return () => {};
  }, []);

  return (
    <div>
      <Typography variant="h4">Update item {state.id}</Typography>
      {item && (
        <AnomaliesForm
          update={true}
          item={item}
          setItem={setItem}
          user={user}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default UpDate;
