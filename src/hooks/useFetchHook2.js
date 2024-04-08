import { useDispatch, useSelector } from "react-redux";
import { getSeries } from "../redux/features/thunkSlice2";
import { useEffect } from "react";

export const useFetchHook2 = (action) => {
  const dispatch = useDispatch();
  const myAct = useSelector((state) => state.series[action]);
  const { results } = myAct;
  useEffect(() => {
    dispatch(getSeries(action));
  }, [dispatch, action]);
  return results;
};
