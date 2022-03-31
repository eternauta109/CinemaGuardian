import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../reducer/usersReducer.js";

const store = configureStore({
  reducer: {
    users: usersReducer
  }
});

export default store;
