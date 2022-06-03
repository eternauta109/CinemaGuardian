import { useLocation } from "react-router-dom";
import AnomaliesForm from "../components/AnomaliesForm";

import { useSelector, useDispatch } from "react-redux";
import { updateItem, getSingleItem } from "../slice/itemSlice";
import { notificationUser } from "../slice/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* import moment from "moment"; */

function UpDate() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  /* const items = useSelector((state) => state.items); */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("state", state.id);
  const [item, setItem] = useState();

  const getItemFromLists = async () => {
    const finder = await dispatch(getSingleItem({ id: state.id }))
      .then((res) => {
        console.log("item", res.payload);
        setItem(res.payload);
      })
      .catch((e) => alert(e));
  };
  /* const momento = moment().format("DD/MM/YYYY"); */
  /* console.log("momento", momento); */

  const handleSubmit = () => {
    /* console.log("item in up dateAAAA", item); */
    dispatch(notificationUser({ item }))
      .then(
        dispatch(updateItem({ item }))
          .then(navigate("/home"))
          .catch((e) => console.log("error dispatch update item in upDate:", e))
      )
      .catch((e) => alert("error dispatch notifications user in upDate:", e));
  };

  useEffect(() => {
    getItemFromLists();
    /* console.log("update in update", item); */
    /* getItem(state.id); */
    return () => {};
  }, [state]);

  return (
    <div>
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
