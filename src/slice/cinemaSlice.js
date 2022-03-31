import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";
import { collection, getDocs } from "firebase/firestore";

export const getCinemas = createAsyncThunk(
  "cinemas/getCinemas",
  async (data = null) => {
    const cinemas = [];
    const allCinema = await getDocs(collection(db, "cinema"))
      .then((res) => res.json())
      .then((res) => res);

    let cinemasPromis = await Promise(allCinema);
    console.log(cinemasPromis);

    allCinema.forEach((e) => {
      console.log(e.id, e.data());
      cinemas.push(e.data());
    });

    return cinemas;
  }
);

export const cinemasSlice = createSlice({
  name: "cinemas",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCinemas.pending, (state, action) => {
        console.log("loading", state);
      })
      .addCase(getCinemas.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  }
});

const { actions, reducer } = cinemasSlice;
export const {} = actions;
export default reducer;
