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
const procurament = { name: "procurament" };
const theSpace = { name: "The Space" };

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async ({ area }) => {
    /*  console.log("supplier slice", area); */
    let supplier = [];
    const q = query(collection(db, "supplier"), where("area", "==", area));
    const supplierSnap = await getDocs(q);

    supplierSnap.forEach((e) => {
      /* console.log("e", e.data()); */
      const newElement = { ...e.data() };
      supplier = [...supplier, newElement];
    });
    supplier.unshift(theSpace, procurament);
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
    })
      .then(alert(`new supplier ${newSupp.name} recorded `))
      .catch((e) => alert("error in addSupplier at userSlice:", e));
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
