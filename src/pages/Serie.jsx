import  { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchHook4 } from "../hooks/useFetchHook4";
import MyLayout from "../components/MyLayout";
import "../static/css/movie.css";
import MyDetailCard from "../components/MyDetailCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMovieListFavoritedPost } from "../hooks/useMovieList";
import MyOffcanvas from "../components/MyOffcanvas";

const Serie = () => {
  const { isAuthenticated, successData } = useSelector(
    (state) => state.mockApi
  );

  const param = useParams();
  const [item] = useFetchHook4(param.id);
  console.log("param", param.id);
  console.log("item", item);
  const progressBarRef = useRef(null);
  const progressLabelRef = useRef(null);
  console.log("myData aslan", item);
  const { innerFunc } = useMovieListFavoritedPost();
  const [toggle, setToggle] = useState(false)

  const buttonSerieFunc = () => {
    axios
      .get(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
      )
      .then((response) => {
        const myFavSerieList = response.data.favoritedSeries;
        console.log("response", myFavSerieList);

        if (!isAuthenticated) {
          alert("Diziyi favorilerinize eklemeden önce giriş yapın!");
        } else {
          if (myFavSerieList.find((serie) => serie.id === item.id)) {
            alert("Bu Dizi Zaten Eklenmiş!");
          } else {
            innerFunc(["tv", item.id, true]);
            console.log("itemName", item.name);
            myFavSerieList.push({ name: item.name, id: item.id });
            // Güncellenmiş favori listesini API'ye gönderin
            axios
              .put(
                `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`,
                {
                  favoritedSeries: myFavSerieList,
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
        alert("Bir hata oluştu");
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
        {" "}
        <i className="bi bi-hourglass-split display-1 d-flex justify-content-center"></i>{" "}
      </MyLayout>
    );
  } else if (item.id == param.id) {
    return (
      <MyLayout>
        <div className="container text-center ">
          <div className="row text-center mb-3  ">
            <h1>{item.title}</h1>
          </div>
          <section>
            <div className="row ">
              <div className="col-md-4 justify-content-center d-flex">
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
                  <div className="col-md-4">
                    <div className=" mb-3" style={{ paddingTop: "1.5px" }}>
                      <span className="me-2 fw-bold">{item.vote_count}</span>
                      <span>Oy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  onClick={() => {setToggle(true)}}
                  className="btn btn-outline-secondary mb-3"
                >
                  <i className="bi bi-star-fill"></i> Puan Ver
                </button>
                <MyOffcanvas
                  type="Diziyi"
                  image={item.poster_path}
                  item={item}
                  fetchType="tv"
                  toggle = {toggle}
                  setToggle = {setToggle}
                />
              </div>
              <div className="col-md-4  ">
                <button
                  onClick={buttonSerieFunc}
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
                    : "/images/poster-notfound.jpg"
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

export default Serie;
