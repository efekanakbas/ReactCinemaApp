import { configureStore } from "@reduxjs/toolkit";
import thunkSlice from "../features/thunkSlice";
import thunkSlice2 from "../features/thunkSlice2";
import thunkSlice3 from "../features/thunkSlice3";
import thunkSlice4 from "../features/thunkSlice4";
import movieListSlice from "../features/movieListSlice";
import searchSlice from "../features/searchSlice";
import mockApiList from "../features/mockApiList";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const reducer = combineReducers({
  thunk: thunkSlice,
  series: thunkSlice2,
  movieId: thunkSlice3,
  serieId: thunkSlice4,
  movieList: movieListSlice,
  search: searchSlice,
  mockApi: mockApiList,
});

const peristedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: peristedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bu özelliği devre dışı bırakır
    }),
});
