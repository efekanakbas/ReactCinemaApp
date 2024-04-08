import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  popular: [],
  now_playing: [],
  upcoming: [],
  myState: [],
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
  },
};

export const getCountry = createAsyncThunk("getCountry", async (actionType) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${actionType}`,
    options
  );
  return [data, actionType];
});

export const thunkSlice = createSlice({
  name: "thunk",
  initialState,
  reducers: {
    myClickFunc: (state, action) => {
      const fetchList = action.payload;
      state.myState = [...fetchList];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountry.fulfilled, (state, action) => {
      const [data, actionType] = action.payload;
      state[actionType] = data;
    });
  },
});

export const { myClickFunc } = thunkSlice.actions;

export default thunkSlice.reducer;
