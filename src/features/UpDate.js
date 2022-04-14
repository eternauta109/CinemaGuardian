import { useLocation } from "react-router-dom";
import AnomaliesForm from "../components/AnomaliesForm";

import { useSelector, useDispatch } from "react-redux";
import { updateItem } from "../slice/itemSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";

function UpDate() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate("/home");
  };

  useEffect(() => {
    getItemFromLists();
    console.log("update in update", item);
    /* getItem(state.id); */
    return () => {};
  }, []);

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
