import  { useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useFetchHook3 } from "../hooks/useFetchHook3";
import MyLayout from "../components/MyLayout";
import "../static/css/movie.css";
import { useMovieListFavoritedPost } from "../hooks/useMovieList";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { auth0Func } from "../redux/features/auth0Slice";
import MyDetailCard from "../components/MyDetailCard";
import axios from "axios";
import MyOffcanvas from "../components/MyOffcanvas";
// import { addFavFunc } from "../redux/features/mockApiList";
// import { current } from "@reduxjs/toolkit";

const Movie = () => {
  const { isAuthenticated, successData } = useSelector(
    (state) => state.mockApi
  );
  const param = useParams();
  const [item] = useFetchHook3(param.id);
  const progressBarRef = useRef(null);
  const progressLabelRef = useRef(null);
  const { innerFunc } = useMovieListFavoritedPost();
  console.log("succesid", successData.userId);



  const buttonFunc = () => {
    axios
      .get(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
      )
      .then((response) => {
        const myFavList = response.data.favoritedMovies;
        console.log("response", myFavList);

        if (!isAuthenticated) {
          alert("Filmi favorilerinize eklemeden önce giriş yapın!");
        } else {
          if (myFavList.find((movie) => movie.id === item.id)) {
            alert("Bu Film Zaten Eklenmiş!");
          } else {
            innerFunc(["movie", item.id, true]);
            myFavList.push({ name: item.title, id: item.id });
            // Güncellenmiş favori listesini API'ye gönderin
            axios
              .put(
                `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`,
                {
                  favoritedMovies: myFavList,
                }
              )
              .then(() => {
                alert("Başarıyla Eklendi");
              })
              .catch((error) => {
                console.error("Hata:", error);
                alert("Bir hata oluştu");
              });
          }
        }
      })
      .catch((error) => {
        console.error("Hata:", error);
        alert("Eklemeden Önce Giriş yapın!");
      });
  };

  function wrapNumberWithProgressBar(number) {
    const progressBar = progressBarRef.current;
    const progressLabel = progressLabelRef.current;
    if (progressBar && progressLabel) {
      // Önce DOM öğelerinin varlığını kontrol edin
      progressBar.setAttribute("aria-valuenow", number);
      progressBar.style.width = number * 10 + "%";
      progressLabel.textContent = number.toFixed(1);

      // Renk sınıfını güncelle
      if (number < 3) {
        progressBar.classList.add("red");
      } else if (number < 6) {
        progressBar.classList.remove("red");
        progressBar.classList.add("orange");
      } else if (number < 8) {
        progressBar.classList.remove("orange");
        progressBar.classList.add("yellow");
      } else {
        progressBar.classList.remove("yellow");
        progressBar.classList.add("green");
      }
    }
  }

  useEffect(() => {
    if (item) {
      // Veritabanından gelen sayıya göre ilerleme çubuğunu güncelle
      wrapNumberWithProgressBar(item.vote_average);
    }
  }, [item]);

  if (!item || item.id != param.id) {
    return (
      <MyLayout>
        <i className="bi bi-hourglass-split display-1 d-flex justify-content-center"></i>
      </MyLayout>
    );
  } else if (item.id == param.id) {
    console.log("item", item);
    return (
      <MyLayout>
        <div className="container text-center ">
          <div className="row text-center mb-3  ">
            <h1>{item.title}</h1>
          </div>
          <section>
            <div className="row ">
              <div className="col-md-4 justify-content-center d-flex ">
                <div className="row ">
                  <div className="col-md-8 ">
                    <div className="progress-wrapper">
                      <div
                        className={`progress-bar ${getProgressBarColor(
                          item.vote_average
                        )}`}
                        ref={progressBarRef}
                        role="progressbar"
                        aria-valuenow={item.vote_average}
                        aria-valuemin="0"
                        aria-valuemax="10"
                        style={{ width: item.vote_average * 10 + "%" }}
                      >
                        <span className="progress-label" ref={progressLabelRef}>
                          {item.vote_average}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4  mb-3">
                    <div className=" " style={{ paddingTop: "1.5px" }}>
                      <span className="me-2 fw-bold">{item.vote_count}</span>
                      <span>Oy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4  mb-3">
                <button
                  data-bs-toggle="offcanvas"
                  data-bs-target="#myOffcanvas"
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-star-fill"></i> Puan Ver
                </button>
                <MyOffcanvas
                  type="Filmi"
                  image={item.poster_path}
                  item={item}
                  fetchType="movie"
                />
              </div>
              <div className="col-md-4  ">
                <button
                  onClick={buttonFunc}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-plus-lg"></i> Listeme Ekle
                </button>
              </div>
            </div>
          </section>
          <section>
            <div className="rounded-2" id="movieImgDiv">
              <img
                className="img-fluid movieImg "
                src={
                  item.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                    : "/images/cover-default-new.jpg"
                }
                alt=""
              />
            </div>
          </section>
          <section>
            <MyDetailCard item={item} />
          </section>
        </div>
      </MyLayout>
    );
  }
};

// Sayıya göre ilerleme çubuğu rengini döndüren yardımcı bir fonksiyon
function getProgressBarColor(number) {
  if (number <= 3) {
    return "red";
  } else if (number <= 6) {
    return "orange";
  } else if (number <= 8) {
    return "yellow";
  } else {
    return "green";
  }
}

export default Movie;
