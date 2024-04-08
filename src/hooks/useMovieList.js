import { useDispatch } from "react-redux";
import { getMovieListFavorited } from "../redux/features/movieListSlice";
import { postMovieListFavorited } from "../redux/features/movieListSlice";

//getFavorited
export const useMovieListFavorited = () => {
  const dispatch = useDispatch();

  const innerFuncGetFav = async (type) => {
    try {
      const response = await dispatch(getMovieListFavorited(type));
      console.log("hook çalıştı ula", response.payload[0].results);
      return response.payload[0].results;
    } catch (error) {
      console.error("Hata oluştu:", error);
      throw error;
    }
  };

  return { innerFuncGetFav };
};

//postFavorited
export const useMovieListFavoritedPost = () => {
  const dispatch = useDispatch();
  // const { favoritedMovies } = useSelector((state) => state.movieList);

  // const results = favoritedMovies;

  const innerFunc = ([type, id, bool]) => {
    dispatch(postMovieListFavorited([type, id, bool]));
  };

  // İç fonksiyonu ve sonucu döndür
  return { innerFunc };
};
