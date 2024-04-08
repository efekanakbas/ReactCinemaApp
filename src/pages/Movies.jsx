
import { useParams } from "react-router-dom";
import { useFetchHook } from "../hooks/useFetchHook";
import { useState, useEffect } from "react";
import PaginationLink from "../components/MyPagination";
import MyLayout from "../components/MyLayout";

const Movies = () => {
  const param = useParams();
  const [myVar, setMyVar] = useState("now_playing");

  useEffect(() => {
    if (param.var === "Vizyondakiler") {
      setMyVar("now_playing");
    } else if (param.var === "Yakında Sinemalarda") {
      setMyVar("upcoming");
    } else {
      setMyVar("popular");
    }
  }, []);
  const myFetch = useFetchHook(myVar);

  if (myFetch) {
    return (
      <MyLayout>
        <section className="d-flex justify-content-center">
          <PaginationLink name={param.var} myFetch={myFetch} />
        </section>
      </MyLayout>
    );
  }
};

export default Movies;
