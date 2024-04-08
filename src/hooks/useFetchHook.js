import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../redux/features/thunkSlice";
import { useEffect } from "react";

export const useFetchHook = (action) => {
  const dispatch = useDispatch();
  const myAct = useSelector((state) => state.thunk[action]);
  const { results } = myAct;

  useEffect(() => {
    dispatch(getCountry(action));
  }, [dispatch, action]);
  return results;
};
