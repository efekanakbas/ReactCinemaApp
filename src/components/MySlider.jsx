import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/mySlider.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

const SimpleSlider = () => {
  const myuse = useSelector((state) => state.thunk["myState"]);
  const navigate = useNavigate();
  const [isPointMoved, setIsPointMoved] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  const data = myuse;
  return (
    <div>
      <Slider {...settings}>
        {data.length > 1
          ? data?.map((item) => (
              <div
                onPointerDown={() => {
                  setIsPointMoved(false);
                }}
                onPointerMove={() => {
                  setIsPointMoved(true);
                }}
                onPointerUp={() => {
                  // if point moved, don't do any thing
                  if (isPointMoved) {
                    setIsPointMoved(true);
                    return;
                  }
                  // if point haven't moved, handle the click event as you wish
                  navigate(`/movie/${item.id}`);
                }}
                key={item.id}
                className="card-group"
              >
                <div
                  className="card"
                  id="mySliderCardHover"
                  style={{ boxShadow: "5px 0 8px 1px rgba(0, 0, 0, .1)" }}
                >
                  <img
                    className="card-image-top mySliderImg"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                        : "/images/poster-notfound.jpg"
                    }
                    alt="poster"
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      title={item.title}
                      id="mySliderCardTitle"
                    >
                      {item.title.length > 15
                        ? item.title.substring(0, 15) + "..."
                        : item.title}
                    </h5>
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
                  </div>
                </div>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
