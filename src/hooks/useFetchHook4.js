import { useDispatch, useSelector } from "react-redux";
import { getSerieId } from "../redux/features/thunkSlice4";
import { useEffect } from "react";

export const useFetchHook4 = (action) => {
  const dispatch = useDispatch();
  const { myState4 } = useSelector((state) => state.serieId);
  console.log("myState4", myState4);

  useEffect(() => {
    dispatch(getSerieId(action));
  }, [dispatch, action]);
  return myState4;
};
