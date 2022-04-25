import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";
import { getCinemas } from "./cinemaSlice";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username, password }, { dispatch }) => {
    const userRef = doc(db, "user", username);
    //risposta della query
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return alert("username error");
    }

    if (password !== userSnap.data().password) {
      return alert("password error");
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

export const addUser = createAsyncThunk("user/newUser", async ({ newUser }) => {
  const userSnap = await setDoc(doc(db, "user", `${newUser.name}`), {
    ...newUser
  });
  return userSnap;
});

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        /*  console.log("loading"); */
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        /*  state.push(action.payload); */
      });
  }
});

const { actions, reducer } = userSlice;

export default reducer;
