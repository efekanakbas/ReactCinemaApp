import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  airing_today: [],
  on_the_air: [],
  popular: [],
  myState2: [],
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
  },
};

export const getSeries = createAsyncThunk("getSeries", async (actionType) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${actionType}`,
    options
  );
  return [data, actionType];
});

export const thunkSlice2 = createSlice({
  name: "series",
  initialState,
  reducers: {
    myClickFunc2: (state, action) => {
      const fetchList = action.payload;
      state.myState2 = [...fetchList];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSeries.fulfilled, (state, action) => {
      const [data, actionType] = action.payload;
      state[actionType] = data;
    });
  },
});

export const { myClickFunc2 } = thunkSlice2.actions;

export default thunkSlice2.reducer;
