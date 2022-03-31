import { createReducer } from "@reduxjs/toolkit";

const usersReducer = createReducer([], (builder) => {
  builder
    .addCase("ADD_TODO", (state, action) => {
      // "mutate" the array by calling push()
      state.push(action.payload);
    })
    .addCase("REMOVE_TODO", (state, action) => {
      // Can still return an immutably-updated value if we want to
      return state.filter((todo, i) => i !== action.payload.index);
    });
});
