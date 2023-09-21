import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import siteInfo from "../../../siteInfo";

export const fetchData = createAsyncThunk("leads/fetchData", async ({path, pageModel}) => {
  const res = await axios.get(`${siteInfo.api + path}`, {params: {pageModel}});
  return res.data;
});

const leads = createSlice({
  name: "leads",
  initialState: {
    pending: false,
    leadsError: null,
    showLeads: [],
    totalCount: 0,
  },
  reducers: {
    addLead: (state,action)=>{
    state.showLeads.unshift(action.payload)
  },
  setLead: (state,action)=>{
    state.showLeads = action.payload
  },
  setTotalCount: (state,action)=>{
    state.totalCount = action.payload
  },
  updateLead: (state,action)=>{
    const index = state.showLeads.findIndex((lead) => lead.id == action.payload.id)
    state.showLeads[index] = action.payload;
  },
},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.pending = true
      state.leadsError = null
      state.showLeads = []
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.pending = false
      state.leadsError = action.error.message
      state.showLeads = []
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.pending = false;
      state.leadsError = null;
      state.totalCount = action.payload.totalCount;
      state.showLeads = action.payload.data;
    });
  },
});

export const { addLead, setLead , updateLead , setTotalCount } = leads.actions;


export default leads.reducer;
