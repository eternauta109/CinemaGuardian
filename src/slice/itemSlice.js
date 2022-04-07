import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCinemas } from "./cinemaSlice";
import { db } from "../config/firebase_config";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ cinemas }) => {
    let items = [];
    console.log("itemSlice cinemas", cinemas);

    for (let index = 0; index < cinemas.length; index++) {
      const cinema = cinemas[index];

      const q = query(
        collection(db, "anomalies"),
        where("cinema", "==", cinema.name)
      );
      const itemsSnap = await getDocs(q);
      itemsSnap.forEach((e) => {
        const newElement = { id: e.id, ...e.data() };
        items = [...items, newElement];
      });
    }

    return items;
  }
);

export const addItem = createAsyncThunk(
  "items/addItems",
  async ({ item, user }, { dispatch }) => {
    const itemRef = doc(db, "anomalies", `${item.item_ref}`);

    const res = await setDoc(itemRef, {
      ...item
    });

    const cinemaRefNum_increment = doc(db, "cinema", `${item.cinema}`);

    await updateDoc(cinemaRefNum_increment, {
      rif_num: increment(1)
    });

    dispatch(
      getCinemas({ role: user.role, area: user.area, cinema: user.cinema })
    );

    console.log("Document written with ID: ", itemRef.id);

    return res;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItems",
  async ({ item }, { dispatch }) => {
    if (item.category === "" || item.priority === "") {
      return alert("devi selezionare una categoria");
    }
    const itemRef = doc(db, "anomalies", `${item.item_ref}`);
    const res = await setDoc(itemRef, {
      ...item
    });
    console.log("Document written with ID: ", itemRef.id);
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
        console.log("loading");
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addItem.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state = action.payload;
        console.log("state additem", state);
        return state;
      });
  }
});

const { actions, reducer } = itemsSlice;
/* export const { addItem } = actions; */
export default reducer;
