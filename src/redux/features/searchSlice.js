import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchState: [],
};

export const getSeacrh = createAsyncThunk("getSearch", async (value) => {
  const options = {
    method: "GET",
    params: {
      query: value,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
    },
  };
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    options
  );
  console.log(data);
  return [data];
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    zeroingFunc: (state) => {
      console.log("kod Çalıştı ustam");
      state.searchState = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSeacrh.fulfilled, (state, action) => {
      state.searchState = action.payload;
    });
  },
});

export const { zeroingFunc } = searchSlice.actions;

export default searchSlice.reducer;
