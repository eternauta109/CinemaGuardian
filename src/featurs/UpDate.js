import { useLocation } from "react-router-dom";
import UpdateFrom from "../components/UpdateFrom";
import { Typography } from "@mui/material";
import { db } from "../config/firebase_config";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { CredentialContext } from "../contex/StoreContext";
import moment from "moment";

function UpDate() {
  const { state } = useLocation();
  const { user, lists } = useContext(CredentialContext);

  console.log("state", state);
  const [item, setItem] = useState();

  const getItemFromLists = () => {
    const finder = lists.find((e) => e.id === state.id);
    setItem(finder);
  };

  const getItem = async (id) => {
    const docRef = doc(db, "anomalies", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setItem(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleSubmit = async () => {
    console.log("item anomalies", item);
    if (item.category === "" || item.priority === "") {
      return alert("devi selezionare una categoria");
    }
    const itemRef = doc(db, "anomalies", `${item.item_ref}`);
    const res = await setDoc(itemRef, {
      ...item,
      lastUpdate: moment().format("DD/MM/YYYY"),
      updateBy: user.name
    });
    console.log("Document written with ID: ", itemRef.id);
    return res;
  };

  useEffect(() => {
    getItemFromLists();
    /* getItem(state.id); */
    return () => {};
  }, []);

  return (
    <div>
      <Typography variant="h4">Update item {state.id}</Typography>

      <UpdateFrom
        item={item}
        setItem={setItem}
        user={user}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default UpDate;
