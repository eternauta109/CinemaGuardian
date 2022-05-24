import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../config/firebase_config";

import { getDoc, doc, setDoc } from "firebase/firestore";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ username, password }) => {
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

    return {
      admin: user.admin ? true : false,
      email: user.email,
      name: user.name,
      area: user.area,
      facilityArea: user.facilityArea,
      cinema: user.cinema,
      role: user.role
    };
  }
);

export const addUser = createAsyncThunk("user/newUser", async ({ newUser }) => {
  const userSnap = await setDoc(doc(db, "user", `${newUser.name}`), {
    ...newUser
  }).then(alert(`new user ${newUser.name} recorded `));
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
        console.log("stato di user", state);
        return state;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        /*  state.push(action.payload); */
      });
  }
});

const { actions, reducer } = userSlice;

export default reducer;
