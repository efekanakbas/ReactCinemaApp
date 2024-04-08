import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  successData: {},
};

export const mockApiListSlice = createSlice({
  name: "mockApi",
  initialState,
  reducers: {
    authFunc: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },

    successFunc: (state, action) => {
      console.log("state", state.successData);
      console.log("action", action.payload);
      Object.assign(state.successData, action.payload);
    },
  },
});

export const { authFunc, successFunc, addFavFunc } = mockApiListSlice.actions;

export default mockApiListSlice.reducer;
