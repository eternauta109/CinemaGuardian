import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";

import {
  query,
  doc,
  setDoc,
  collection,
  where,
  getDocs
} from "firebase/firestore";

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async ({ area }) => {
    /* console.log("rea", area); */
    let supplier = [];

    const q = query(collection(db, "supplier"), where("area", "==", area));
    const supplierSnap = await getDocs(q);

    supplierSnap.forEach((e) => {
      /* console.log("e", e.data()); */
      const newElement = { ...e.data() };
      supplier = [...supplier, newElement];
    });
    /*  console.log(supplier); */
    return supplier;
  }
);

export const addSupplier = createAsyncThunk(
  "suppliers/newSupplier",
  async ({ newSupp }) => {
    /*   console.log(newSupp); */
    const userSnap = await setDoc(doc(db, "supplier", `${newSupp.name}`), {
      ...newSupp
    });
    return userSnap;
  }
);

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state, action) => {
        /*   console.log("loading"); */
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        /*  state.push(action.payload); */
        state = action.payload;
        /*    console.log("state additem", state); */
        return state;
      });
  }
});

const { actions, reducer } = suppliersSlice;

export default reducer;
