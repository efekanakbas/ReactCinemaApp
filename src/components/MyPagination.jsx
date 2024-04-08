import  { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "../static/css/myPagination.css";
import { useNavigate } from "react-router-dom";
import MyNormalCard from "./MyNormalCard";

const { genres } = {
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ],
};

const pageSize = 5;

export default function PaginationLink({ name, myFetch }) {
  const navigate = useNavigate();
  const data = myFetch;
  const param = useParams();
  console.log("param", param);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(page.slice(-1) || "1", 10)
  );

  useEffect(() => {
    setCurrentPage(parseInt(page.slice(-1) || "1", 10));
  }, [page]);

  if (data) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);
    console.log(currentData);
    return (
      <div>
        <p className="text-secondary myPagenationP">
          <a id="MyPaganationA" href="/">
            <i id = "myPaganationI">Ana Sayfa</i> <i className="bi bi-chevron-right"></i>
          </a>
          {name}
        </p>

        {currentData.map((item) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/movie/${item.id}`)}
            key={item.id}
          >
            <MyNormalCard item={item} genres={genres} />
            <hr id="paginationHr" />
          </div>
        ))}

        <div className="d-flex justify-content-center mt-5 pt-5">
          <Pagination
            page={currentPage}
            count={Math.ceil(data.length / pageSize)}
            variant="outlined"
            shape="rounded"
            size="large"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/movies/${name}/${
                  item.page === 1 ? "page=1" : `page=${item.page}`
                }`}
                onClick={() => setCurrentPage(item.page)}
                {...item}
              />
            )}
          />
        </div>
      </div>
    );
  }
}
