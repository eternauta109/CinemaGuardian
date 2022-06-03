import InputAnomalies from "../components/AnomaliesForm";
import { useState, useEffect } from "react";

import { Container } from "@mui/material";
import { notificationUser } from "../slice/userSlice";
import { addItem } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const Anomalies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cinemas = useSelector((store) => store.cinemas);

  /*  console.log("anomalies.js user e cinemaObj", user); */
  const [item, setItem] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log("item in handle submit", item); */
    if (!item.category || !item.priority) {
      return alert("devi selezionare una categoria");
    } else {
      /* console.log("item in add new anomalies", item); */
      dispatch(notificationUser({ item }))
        .then(
          dispatch(addItem({ item, user }))
            .then(navigate("/home"))
            .catch((e) =>
              console.log("error in dispatch addItem in anomalies:", e)
            )
        )
        .catch((e) =>
          alert("error dispatch notifications user in Anomalies:", e)
        );
      /* return dispatch(addItem({ item, user })).then(navigate("/home")); */
    }
  };

  useEffect(() => {
    /* let azzeraComments = [];
    let newArrayApp = []; */
    setItem({});
  }, [setItem]);

  return (
    <Container sx={{ height: 1700 }}>
      <InputAnomalies
        update={false}
        cinemas={cinemas}
        item={item}
        setItem={setItem}
        handleSubmit={(e) => handleSubmit(e)}
        user={user}
      />
    </Container>
  );
};

export default Anomalies;
