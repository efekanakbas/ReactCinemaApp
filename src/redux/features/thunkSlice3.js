import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myState3: [],
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
  },
};

export const getMovieId = createAsyncThunk("getMovieId", async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}`,
    options
  );
  console.log(data);
  return [data];
});

export const movieIdSlice = createSlice({
  name: "movieId",
  initialState,
  reducers: {
    myClickFunc3: (state, action) => {
      state.myState3 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieId.fulfilled, (state, action) => {
      state.myState3 = action.payload;
    });
  },
});

export const { myClickFunc3 } = movieIdSlice.actions;

export default movieIdSlice.reducer;
