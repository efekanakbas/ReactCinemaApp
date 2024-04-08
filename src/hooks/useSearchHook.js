import { useDispatch, useSelector } from "react-redux";
import { getSeacrh } from "../redux/features/searchSlice";

export const useSearchHook = () => {
  const dispatch = useDispatch();
  const { searchState } = useSelector((state) => state.search);

  const searchHookFunc = (value) => {
    dispatch(getSeacrh(value));
  };
  return { searchState, searchHookFunc };
};
