
import { useParams } from "react-router-dom";
import { useFetchHook2 } from "../hooks/useFetchHook2";
import { useState, useEffect } from "react";
import PaginationLink2 from "../components/MyPagination2";
import MyLayout from "../components/MyLayout";

const Series = () => {
  const param = useParams();
  const [myVar, setMyVar] = useState("airing_today");

  useEffect(() => {
    if (param.var === "Tv Dizileri") {
      setMyVar("airing_today");
    } else if (param.var === "Yakında...") {
      setMyVar("on_the_air");
    } else {
      setMyVar("popular");
    }
  }, []);
  const myFetch = useFetchHook2(myVar);

  if (myFetch) {
    return (
      <MyLayout>
        <section className="d-flex justify-content-center">
          <PaginationLink2 name={param.var} myFetch={myFetch} />
        </section>
      </MyLayout>
    );
  }
};

export default Series;
