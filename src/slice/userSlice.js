import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";
import { getCinemas } from "./cinemaSlice";
import { getDoc, doc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username, password }, { dispatch }) => {
    const userRef = doc(db, "user", username);
    //risposta della query
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return console.log("username error");
    }

    if (password !== userSnap.data().password) {
      return console.log("password error");
    }

    const user = userSnap.data();

    dispatch(
      getCinemas({
        role: user.role,
        area: user.area,
        cinema: user.cinema,
        facilityArea: user.facilityArea
      })
    );

    return user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser(state, action) {
      console.log("reducer", state, action);
      state.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  }
});

const { actions, reducer } = userSlice;
export const { addUser } = actions;
export default reducer;
