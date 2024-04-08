import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favoritedList: [],
};

//getFavorited List

const options = {
  method: "GET",
  params: {
    language: "en-US",
    page: "1",
    session_id: "0c7e3c1f8a972a01ae80195d62e78a6bd3b5bc66",
    sort_by: "created_at.asc",
  },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
  },
};

export const getMovieListFavorited = createAsyncThunk(
  "getMovieListFavorited",
  async (type) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/account/20441325/favorite/${type}`,
      options
    );
    console.log("sliceFavList", data);
    console.log("slice çalıştı in slice");
    return [data];
  }
);

//postFavoritedList

export const postMovieListFavorited = createAsyncThunk(
  "postMovieListFavorited",
  async ([type, id, bool]) => {
    const options3 = {
      method: "POST",
      url: "https://api.themoviedb.org/3/account/20441325/favorite",
      params: { session_id: "0c7e3c1f8a972a01ae80195d62e78a6bd3b5bc66" },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
      },
      data: { media_type: `${type}`, media_id: id, favorite: bool },
    };
    console.log("slice moruk", type, id, bool);
    const { data } = await axios.request(options3);
    return [data];
  }
);

//Slice

export const movieListSlice = createSlice({
  name: "movieId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieListFavorited.fulfilled, (state, action) => {
      state.favoritedList = action.payload;
    });

    builder.addCase(postMovieListFavorited.fulfilled, (state, action) => {
      state.favoritedList = action.payload;
    });
  },
});

// export const { setUserData,markUserLoggedOut  } = movieListSlice.actions;

export default movieListSlice.reducer;
