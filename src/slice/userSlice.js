import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  where,
  arrayRemove,
  query,
  collection
} from "firebase/firestore";

import { auth, db } from "../config/firebase_config.js";

import { signInWithEmailAndPassword } from "firebase/auth";

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ email, password }) => {
    let userUid = "";

    await signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        userUid = cred.user.uid;
      })
      .catch((err) => {
        alert("login error", err.message);
      });
    /* console.log(userUid); */
    let userDocRef = doc(db, "users", userUid);

    const res = await getDoc(userDocRef)
      .then((r) => {
        return r.data();
      })
      .catch((e) => alert("error in getDoc-getUser in userSlice:", e));
    return res;
  }
);

export const addUser = createAsyncThunk("user/addUser", async ({ newUser }) => {
  const userSnap = await setDoc(doc(db, "users", `${newUser.name}`), {
    ...newUser
  })
    .then(alert(`new user ${newUser.name} recorded `))
    .catch((e) => console.log("error in add User at userSlice:", e));
  return userSnap;
});

export const notificationUser = createAsyncThunk(
  "user/notificationUser",
  async ({ item, deleted = false }) => {
    const colRef = collection(db, "users");
    console.log("userslice item e user in notificationuser", item, deleted);

    const getPromiseQuery = async () => {
      const q1 = query(colRef, where("role", "==", "gm"));
      const q2 = query(
        colRef,
        where("role", "==", "fm"),
        where("facilityArea", "==", item.facilityArea)
      );

      const q3 = query(
        colRef,
        where("role", "==", "am"),
        where("area", "==", item.area)
      );

      const q4 = query(colRef, where("cinema", "==", item.cinema));

      const [gmRes, fmRes, cinemaRes, amRes] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
        getDocs(q3),
        getDocs(q4)
      ]);
      /*  console.log(gmRes.docs, fmRes.docs, cinemaRes.docs, amRes.docs); */
      const resPromise = gmRes.docs.concat(
        fmRes.docs,
        cinemaRes.docs,
        amRes.docs
      );
      /* console.log("resPromise", resPromise); */
      return resPromise;
    };

    getPromiseQuery()
      .then((els) =>
        els.forEach((el) => {
          if (el.data().name !== item.updateBy) {
            if (deleted) {
              const userRef = doc(db, "users", el.data().uid);

              console.log("userSlice deleted true:", deleted, item, el.data().name);
              updateDoc(userRef, {
                notifications: arrayRemove(item)
              }).catch((e) => console.log(e));
            } else {
              const userRef = doc(db, "users", el.data().uid);
              console.log("userSlice deleted false:", deleted);
              updateDoc(userRef, {
                notifications: arrayUnion(item)
              });
            }
          }
        })
      )
      .catch((e) => alert("error in getPromiseQuery at userSlice:", e));

    /* */
  }
);

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
        /* console.log("stato di user", state, action.payload); */
        return state;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state = action.payload;
        /* console.log("stato di user", state, action.payload); */
        return state;
      })
      .addCase(notificationUser.fulfilled, (state, action) => {
        state = action.payload;
        /* console.log("stato di user", state, action.payload); */
        return state;
      });
  }
});

const { actions, reducer } = userSlice;

export default reducer;
