import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myState4: [],
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
  },
};

export const getSerieId = createAsyncThunk("getSerieId", async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}`,
    options
  );
  console.log(data);
  return [data];
});

export const serieIdSlice = createSlice({
  name: "serieId",
  initialState,
  reducers: {
    myClickFunc4: (state, action) => {
      state.myState4 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSerieId.fulfilled, (state, action) => {
      state.myState4 = action.payload;
    });
  },
});

export const { myClickFunc4 } = serieIdSlice.actions;

export default serieIdSlice.reducer;
