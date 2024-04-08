import { useDispatch, useSelector } from "react-redux";
import { getMovieId } from "../redux/features/thunkSlice3";
import { useEffect } from "react";

export const useFetchHook3 = (action) => {
  const dispatch = useDispatch();
  const { myState3 } = useSelector((state) => state.movieId);

  useEffect(() => {
    dispatch(getMovieId(action));
  }, [dispatch, action]);
  return myState3;
};
