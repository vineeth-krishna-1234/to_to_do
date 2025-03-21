import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import todoReducer from "./slices/todo"
export const store = configureStore({
  reducer: {
    user: userReducer,
    todo:todoReducer
  },
});

export default store;
