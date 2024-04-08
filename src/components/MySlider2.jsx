import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../static/css/mySlider.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    { id: [], name: "Tür Bulunamadı..." },
  ],
};

const SimpleSlider2 = () => {
  const myuse2 = useSelector((state) => state.series["myState2"]);
  const navigate = useNavigate();
  const [isPointMoved2, setIsPointMoved2] = useState(false);
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
  const data = myuse2;
  if (data) {
    return (
      <div>
        <Slider {...settings}>
          {data.length > 1
            ? data?.map((item) => (
                <div
                  onPointerDown={() => {
                    setIsPointMoved2(false);
                  }}
                  onPointerMove={() => {
                    setIsPointMoved2(true);
                  }}
                  onPointerUp={() => {
                    // if point moved, don't do any thing
                    if (isPointMoved2) {
                      setIsPointMoved2(true);
                      return;
                    }
                    // if point haven't moved, handle the click event as you wish
                    navigate(`/tv/${item.id}`);
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
                        id="mySliderCardTitle"
                        className="card-title"
                        title={item.name}
                      >
                        {item.name.length > 15
                          ? item.name.substring(0, 15) + "..."
                          : item.name}
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
  }
};

export default SimpleSlider2;
