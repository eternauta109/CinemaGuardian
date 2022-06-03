import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCinemas } from "./cinemaSlice";
import { db } from "../config/firebase_config";

import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

import moment from "moment";

import { storage } from "../config/firebase_config";
import { ref, deleteObject } from "firebase/storage";

export const getSingleItem = createAsyncThunk(
  "items/getSingleItem",
  async ({ id }) => {
    /* console.log(id); */
    const docRef = doc(db, "anomalies", id);
    const response = await getDoc(docRef);
    /* console.log("response get single doc", response.data()); */
    return response.data();
  }
);

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ cinemas }) => {
    let items = [];

    for (let index = 0; index < cinemas.length; index++) {
      const cinema = cinemas[index];

      const q = query(
        collection(db, "anomalies"),
        where("cinema", "==", cinema.name)
      );
      const itemsSnap = await getDocs(q);
      itemsSnap.forEach((e) => {
        var given = moment(e.data().stDate, "DD/MM/YYYY");
        var current = moment().startOf("day");

        //Difference in number of days
        var timeLapse = moment.duration(current.diff(given)).asDays();

        /* console.log("moment in slice", timeLapse); */

        const newElement = { id: e.id, ...e.data(), dayWorks: timeLapse };
        items = [...items, newElement];
      });
    }

    return items;
  }
);

export const deleteItem = createAsyncThunk(
  "items/removeItem",
  async ({ id, photos }) => {
    console.log("id delete", id);
    if (photos) {
      photos.map((e) => {
        const photoRef = ref(storage, e.name);
        deleteObject(photoRef)
          .then(() => {
            alert("photo delete");
          })
          .catch((error) => {
            alert("error in deleteItem at itemSlice:", error);
          });
        return e;
      });
    }
    const erase = await deleteDoc(doc(db, "anomalies", id)).catch((e) =>
      alert("error in deleteItem at itemSlice: ", e)
    );
    return erase;
  }
);

export const addItem = createAsyncThunk(
  "items/addItems",
  async ({ item, user }, { dispatch }) => {
    const itemRef = doc(db, "anomalies", `${item.item_ref}`);
    if (!item.category || !item.priority) {
      return alert("devi selezionare una categoria");
    }
    const res = await setDoc(itemRef, {
      ...item
    });

    const cinemaRefNum_increment = doc(db, "cinema", `${item.cinema}`);

    await updateDoc(cinemaRefNum_increment, {
      rif_num: increment(1)
    });

    dispatch(getCinemas({ user }));

    alert(`Document written with ID:  ${itemRef.id}`);

    return res;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItems",
  async ({ item }) => {
    console.log(item);
    const itemRef = doc(db, "anomalies", `${item.item_ref}`);
    const res = await setDoc(itemRef, {
      ...item
    });
    alert(`Document update with ID:  ${itemRef.id}`);
    return res;
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state, action) => {
        /* console.log("loading item", action); */
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state = action.payload;
        /* console.log("get items", state); */
        return state;
      })
      .addCase(addItem.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state = action.payload;
        /*  console.log("state additem", state); */
        return state;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state = action.payload;
        /*  console.log("state additem", state); */
        return state;
      })
      .addCase(getSingleItem.pending, (state, action) => {})
      .addCase(getSingleItem.fulfilled, (state, action) => {
        state = action.payload;
        /* console.log("stato getSingleItem:", state); */
        return state;
      });
  }
});

const { actions, reducer } = itemsSlice;
/* export const { addItem } = actions; */
export default reducer;
