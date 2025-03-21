import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../../axiosConfig";

const initialState = {
  users: [],
  currentUser: null,
  status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return api.get("/users");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        state.currentUser = user;
      }
      localStorage.setItem("authToken",user.id)
      console.log(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload.data.users);

        state.users = action.payload.data.users;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
        console.log("failed");
        
      });
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
