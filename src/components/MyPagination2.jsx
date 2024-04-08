import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "../static/css/myPagination.css";
import { useNavigate } from "react-router-dom";
import MyNormalCard from "./MyNormalCard";

const { genres } = {
  genres: [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ],
};

const pageSize = 5;

export default function PaginationLink2({ name, myFetch }) {
  const navigate = useNavigate();
  const data = myFetch;
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
        <p></p>
        {currentData.map((item) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/tv/${item.id}`)}
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
                to={`/tv/${name}/${
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
