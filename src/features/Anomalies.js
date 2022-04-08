import InputAnomalies from "../components/AnomaliesForm";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { addItem } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom";
import { itemInit } from "../config/struttura";

import { useSelector, useDispatch } from "react-redux";

const Anomalies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cinemas = useSelector((store) => store.cinemas);
  console.log("anomalies.js user e cinemaObj", user);
  const [item, setItem] = useState({ ...itemInit });

  const handleSubmit = () => {
    if (item.category === "" || item.priority === "") {
      return alert("devi selezionare una categoria");
    }

    dispatch(addItem({ item, user }));
    navigate("/home");
  };

  useEffect(() => {
    /* let azzeraComments = [];
    let newArrayApp = []; */
    setItem({ ...itemInit, comments: [], photos: [] });
  }, [setItem]);

  return (
    <>
      <Typography variant="h4">insert new anomalie</Typography>
      <InputAnomalies
        update={false}
        cinemas={cinemas}
        item={item}
        setItem={setItem}
        handleSubmit={handleSubmit}
        user={user}
      />
    </>
  );
};

export default Anomalies;
