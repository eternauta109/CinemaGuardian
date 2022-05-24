import InputAnomalies from "../components/AnomaliesForm";
import { useState, useEffect } from "react";

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

  const handleSubmit = () => {
    /* console.log("item in handle submit", item); */
    if (!item.category || !item.priority) {
      return alert("devi selezionare una categoria");
    } else {
      return dispatch(addItem({ item, user })).then(navigate("/home"));
    }
  };

  useEffect(() => {
    /* let azzeraComments = [];
    let newArrayApp = []; */
    setItem({});
  }, [setItem]);

  return (
    <>
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
