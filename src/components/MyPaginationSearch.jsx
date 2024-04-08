import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "../static/css/myPagination.css";
import { useNavigate } from "react-router-dom";

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

export default function PaginationLink3({ name, myFetch }) {
  const navigate = useNavigate();
  const data = myFetch[0]?.results;
  console.log("myData", data);
  const { variable } = useParams();
  console.log("param", variable);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(page.slice(-1) || "1", 10)
  );
  const [noResults, setNoResults] = useState(false); // No results state
 
  useEffect(() => {
    setCurrentPage(parseInt(page.slice(-1) || "1", 10));
  }, [page]);

  useEffect(() => {
    // Sonuçları kontrol et ve yükleme durumunu ayarla
    if (data && data.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [data]);

  if (noResults) {
    // Sonuç yok durumunu göster
    return (
      <div className="alert alert-info">
        Maalesef arama sonuçlarınızla eşleşen bir veri yok...
      </div>
    );
  } else {
    if (data) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentData = data.slice(startIndex, endIndex);

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
              onClick={() => navigate(`/movie/${item.id}`)}
              key={item.id}
            >
              <div className="card mb-3 " id="myPagenationCard">
                <div className="row g-0">
                  <div className="col-md-4" id="myPagenationImgDiv">
                    <img
                      className="rounded-4"
                      id="myPagenationImg"
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                          : "/images/poster-notfound.jpg"
                      }
                      width="100%"
                      height="250"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Image"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h1
                        title={item.title}
                        className="card-title fs-2 fw-bold"
                      >
                        {item.title.length > 25
                          ? item.title.substring(0, 25) + "..."
                          : item.title}
                      </h1>
                      <h1 className="card-title fs-5 text-secondary">
                        {item.original_title.length > 50
                          ? item.original_title.substring(0, 50) + "..."
                          : item.original_title}
                      </h1>
                      <p className="card-text myCardText">
                        {item.genre_ids && item.genre_ids.length > 0
                          ? item.genre_ids
                              .map((genreId) => {
                                const matchedGenre = genres.find(
                                  (genre) => genre.id === genreId
                                );
                                return matchedGenre
                                  ? matchedGenre.name
                                  : "Tür Bulunamadı";
                              })
                              .filter(Boolean)
                              .join(", ")
                          : "Tür Bulunamadı"}
                      </p>
                      <p className="card-text" title="Yayınlanma Tarihi">
                        <i className="bi bi-calendar"></i> {item.release_date}
                      </p>

                      <p className="card-text">
                        {item.overview.length > 350
                          ? item.overview.substring(0, 350) + "..."
                          : item.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                  to={`/search/${variable}/${
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
}
