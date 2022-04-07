import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "./itemSlice";
import { db } from "../config/firebase_config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getCinemas = createAsyncThunk(
  "cinemas/getCinemas",
  async ({ role, area, cinema }, { dispatch }) => {
    let cinemas = [];
    let cinemasSnap;

    switch (role) {
      case "fm": //facilities
      case "am": //area manager
        const q = query(collection(db, "cinema"), where("area", "==", area));
        cinemasSnap = await getDocs(q);

        break;

      case "gm": //ops manager
        cinemasSnap = await getDocs(collection(db, "cinema"));

        break;

      case "m": //manager
      case "hm": //head manager
        console.log("direttore");
        const qu = query(collection(db, "cinema"), where("name", "==", cinema));
        cinemasSnap = await getDocs(qu);

        break;

      default:
        break;
    }

    cinemasSnap.forEach((e) => {
      cinemas.push(e.data());
    });
    dispatch(getItems({ cinemas }));

    return cinemas;
  }
);

export const cinemasSlice = createSlice({
  name: "cinemas",
  initialState: [],
  reducers: {
    /*  addCinemas(state, action) {
      console.log("reducer", state, action);
      state.push(action.payload);
    } */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCinemas.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(getCinemas.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  }
});

const { actions, reducer } = cinemasSlice;
export const { addCinemas } = actions;
export default reducer;
