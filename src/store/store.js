import { configureStore } from "@reduxjs/toolkit";
import cinemasReducer from "../slice/cinemaSlice";
import userReducer from "../slice/userSlice";
import itemReducer from "../slice/itemSlice";
import logger from "redux-logger";

const initState = [];

export const store = configureStore({
  initState,
  reducer: {
    cinemas: cinemasReducer,
    user: userReducer,
    items: itemReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
