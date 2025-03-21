import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../../axiosConfig";

const initialState = {
  todos: [],
  filters: {
    page: 0,
    limit: 10,
    sortDirection: 1,
    sortField: "createdAt",
    users: [],
    tags: [],
  },
  sideBar: {
    visible: false,
    data: {},
    status: "idle",
  },
  status: "idle", // 'idle' | 'loading' | 'success' | 'failed'
};

const serializeParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

// Async thunk to fetch users
export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, { getState }) => {
    const { filters } = getState().todo;
    const queryString = serializeParams(filters);
    return api.get(`/todo?${queryString}`);
  }
);

export const fetchTodoData = createAsyncThunk("todo/fetchTodo", async (id) => {
  return api.get(`/todo/${id}`);
});

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoData) => {
    return api.post("/todo", todoData);
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, updatedData }) => {
    return api.put(`/todo/${id}`, updatedData);
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  return api.delete(`/todo/${id}`);
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleSidebar: (state) => {
      state.sideBar.visible = !state.sideBar.visible;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload.data.todos;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchTodoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoData.fulfilled, (state, action) => {
        state.status = "success";
        state.sideBar.data = action.payload.data.todo;
        console.log(action.payload.data.todo);
      })
      .addCase(fetchTodoData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilters, toggleSidebar } = todoSlice.actions;
export default todoSlice.reducer;
