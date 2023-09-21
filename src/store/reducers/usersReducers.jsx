import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import siteInfo from "../../../siteInfo";

export const getUsers = createAsyncThunk("users/getUsers", async (path) => {
  const res = await axios.get(`${siteInfo.api + path}`);
  return res.data;
});



const users = createSlice({
  name: "users",
  initialState: {
    pending: false,
    error: null,
    users: [],
    currentUser: {},
  },
  reducers: {
    addUser: (state,action)=>{
      state.users.unshift(action.payload)
    },
    setUser: (state,action)=>{
      state.users = action.payload
    },
    setCurrentUser: (state,action)=>{
      state.currentUser = action.payload
    },
    updateUser: (state,action)=>{
      const itemToEdit = state.users.find(user => user.id === action.payload.id);
      itemToEdit.name = action.payload.name;
      itemToEdit.email = action.payload.email;
      itemToEdit.phone = action.payload.phone;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.pending = true
      state.error = null
      state.users = []
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.pending = false
      state.error = action.error.message
      state.users = []
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.pending = false;
      state.error = null;
      state.users = action.payload;
    });
    
  },
});

export const { addUser, setUser , updateUser, setCurrentUser } = users.actions;

export default users.reducer;
