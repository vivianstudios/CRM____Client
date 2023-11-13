import { createSlice, configureStore, } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";
import State from "./state/state";
import leadsReducers from "./reducers/leadsReducers";
import usersReducers from "./reducers/usersReducers";

const Slice = createSlice({
  name: "vite",
  initialState: State,
  reducers: reducers,
});

export const action = Slice.actions;

export const store = configureStore({
  reducer: {
    app:  Slice.reducer,
    leads: leadsReducers,
    users: usersReducers
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
