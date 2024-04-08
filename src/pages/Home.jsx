import SimpleSlider from "../components/MySlider";
import SimpleSlider2 from "../components/MySlider2";
import { useFetchHook } from "../hooks/useFetchHook";
// import "../static/css/home.css";
import MyNav from "../components/MyNav";
import MyNav2 from "../components/MyNav2";
import { useEffect } from "react";
import { myClickFunc } from "../redux/features/thunkSlice";
import { useDispatch } from "react-redux";
import { useFetchHook2 } from "../hooks/useFetchHook2";
import { myClickFunc2 } from "../redux/features/thunkSlice2";
import MyLayout from "../components/MyLayout";
import "../static/css/home.css";
import { myClickFunc3 } from "../redux/features/thunkSlice3";
import { useMovieListFavorited } from "../hooks/useMovieList";

const Home = () => {
  const nowPlaying = useFetchHook("now_playing");
  const airingToday = useFetchHook2("airing_today");
  const dispatch = useDispatch();
  useMovieListFavorited();
  // useMovieListRated()
  // useMovieListFavoritedPost([550,false])
  // useMovieListRatedPost([235,7])

  useEffect(() => {
    myClickFunc3([]);
    if (airingToday) dispatch(myClickFunc2(airingToday));
    if (nowPlaying) dispatch(myClickFunc(nowPlaying));
  }, [nowPlaying, airingToday, dispatch]);



  

  if (!Array.isArray(nowPlaying) || !Array.isArray(airingToday)) {
    return (
      <MyLayout>
        <i className="bi bi-hourglass-split display-1 d-flex justify-content-center"></i>
      </MyLayout>
    );
  } else {
    return (
      <MyLayout>
        <div>
          <h1
            id="motherHeader"
            style={{
              textAlign: "center",
              fontFamily: "cursive",
            }}
          >
            Türkiye&apos;nin Sinema Sitesi
          </h1>
          <section className="nowPlaying mt-5 pt-5">
            <div className="container-md  text-center">
              <MyNav
                first="Vizyondaki Filmler!"
                second="Vizyondaki Filmler"
                third="Yakında Sinemalarda"
                fourth="En Gözde Filmler"
                secondFetch="now_playing"
                thirdFetch="upcoming"
                fourthFetch="popular"
              />
              <div id="mySimpleSlider">
                <SimpleSlider />
              </div>
            </div>
          </section>
          <hr
            className="d-sm-none "
            style={{ transform: "translate(0,40px)" }}
          />
          <section className="popular pt-5 mt-5">
            <div className="container-md text-center">
              <MyNav2
                first="Tv Dizileri!"
                second="Tv Dizileri"
                third="Yakında..."
                fourth="En Gözde Diziler"
                secondFetch="airing_today"
                thirdFetch="on_the_air"
                fourthFetch="popular"
              />
              <div id="mySimpleSlider">
                <SimpleSlider2 />
              </div>
            </div>
          </section>
        </div>
      </MyLayout>
    );
  }
};

export default Home;
