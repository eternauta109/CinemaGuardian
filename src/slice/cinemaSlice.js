import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc
} from "firebase/firestore";

export const getCinemas = createAsyncThunk(
  "cinemas/getCinemas",
  async ({ user }) => {
    /* console.log("use in get cinema", user); */
    let cinemas = [];
    let cinemasSnap;

    switch (user.role) {
      case "fm": //facilities
        const q = query(
          collection(db, "cinema"),
          where("MaintenanceArea", "==", user.facilityArea)
        );
        cinemasSnap = await getDocs(q);

        break;

      case "am": //area manager
        const qam = query(
          collection(db, "cinema"),
          where("area", "==", user.area)
        );
        cinemasSnap = await getDocs(qam);

        break;

      case "gm": //ops manager
        cinemasSnap = await getDocs(collection(db, "cinema"));

        break;

      case "m": //manager
      case "hm": //head manager
        const qu = query(
          collection(db, "cinema"),
          where("name", "==", user.cinema)
        );
        cinemasSnap = await getDocs(qu);

        break;

      default:
        break;
    }

    cinemasSnap.forEach((e) => {
      cinemas.push(e.data());
    });

    return cinemas;
  }
);

export const addCinema = createAsyncThunk(
  "cinema/newCinema",
  async ({ newCinema }) => {
    console.log("add cinema", newCinema);
    const cinemaSnap = await setDoc(doc(db, "cinema", `${newCinema.name}`), {
      ...newCinema,
      rif_num: 0
    });
    return cinemaSnap;
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
        console.log("loading cinemas", action);
      })
      .addCase(getCinemas.fulfilled, (state, action) => {
        state = action.payload;
        console.log("fullfilled cinemas", state);
        return state;
      });
  }
});

const { actions, reducer } = cinemasSlice;
export const { addCinemas } = actions;
export default reducer;
