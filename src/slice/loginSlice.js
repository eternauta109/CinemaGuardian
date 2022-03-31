import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase_config";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc
  /* addDoc,
  updateDoc,
  doc,
  deleteDoc */
} from "firebase/firestore";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (data = null, { dispatch }) => {
    const userRef = doc(db, "user", `${usernameValue}`);

    let [todos, activeFilter] = await Promise.all([
      todosPromise,
      filterPromise
    ]);
    const filter = activeFilter[0];
    dispatch(filterTodo(filter));
    todos = todos.filter((todo) => {
      if (filter === "ALL") {
        return true;
      }
      if (filter === "COMPLETED") {
        return todo.completed;
      }
      // default TODO
      return !todo.completed;
    });
    return todos;
  }
);
