import { useEffect } from "react";
import PaginationLink3 from "../components/MyPaginationSearch";
import MyLayout from "../components/MyLayout";
import { useSearchHook } from "../hooks/useSearchHook";
import { useParams } from "react-router-dom";
import { zeroingFunc } from "../redux/features/searchSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const { searchHookFunc, searchState } = useSearchHook();
  const { page, variable } = useParams();
  const dispatch = useDispatch();
  console.log(page);
  useEffect(() => {
    searchHookFunc(variable);
    console.log("SearchSearch", searchState);
    dispatch(zeroingFunc());
  }, [variable]);

  return (
    <MyLayout>
      <section className="d-flex justify-content-center">
        <PaginationLink3 name="Arama" myFetch={searchState} />
      </section>
    </MyLayout>
  );
};

export default Search;
