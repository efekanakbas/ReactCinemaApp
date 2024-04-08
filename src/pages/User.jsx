import { useEffect, useState } from "react";
import MyLayout from "../components/MyLayout";
import "../static/css/myUser.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMovieListFavorited } from "../hooks/useMovieList";
import MyUserAccordion from "../components/MyUserAccordion";
import Dropdown from "react-bootstrap/Dropdown";

const User = () => {
  const [allFav, setAllFav] = useState();
  const { innerFuncGetFav } = useMovieListFavorited();

  const allFavFunc = () => {
    innerFuncGetFav("movies").then((response) => {
      console.log("allFavList", response);
      if (response.length === 0) {
        setAllFav(
          <div className="alert alert-info">
            Henüz herhangi bir film favorilere eklenmemiş...
          </div>
        );
      } else {
        setAllFav(
          <div>
            <hr />
            <div className="my-4 ms-3 fs-5 fw-bolder">
              Favori Filmler ({response.length})
            </div>
            <div id="cardLine" className="row row-cols-md-5">
              {response.map((item) => (
                <div className="col mb-4" key={item.id}>
                  <a id="allFavAnchor" href={`/movie/${item.id}`}>
                    <img
                      id="allFavList"
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt="resim"
                    />
                    <p id="allFavParag">{item.title}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      }
    });
  };

  const myFavFunc = () => {
    innerFuncGetFav("movies").then((response) => {
      axios
        .get(
          `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
        )
        .then((response2) => {
          const filteredItems = response.filter((item) => {
            return response2.data.favoritedMovies.some(
              (item2) => item2.id === item.id
            );
          });

          if (filteredItems.length === 0) {
            setAllFav(
              <div className="alert alert-info">
                Henüz favorilerinize bir film eklememişsiniz...
              </div>
            );
          } else {
            setAllFav(
              <div>
                <hr />
                <div className="my-4 ms-3 fs-5 fw-bolder">
                  Favori Filmlerin ({filteredItems.length})
                </div>
                <div id="cardLine" className="row row-cols-md-5">
                  {filteredItems.map((item) => (
                    <div className="col mb-4" key={item.id}>
                      <a id="allFavAnchor" href={`/movie/${item.id}`}>
                        <img
                          id="allFavList"
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          alt="resim"
                        />
                        <p id="allFavParag">{item.title}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        });
    });
  };

  const userInfoFunc = () => {
    axios
      .get(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
      )
      .then((response) => {
        console.log("userResponse", response.data);
        const myFilms = response.data.favoritedMovies
          .map((item) => item.name)
          .join(", ");
        const mySeries = response.data.favoritedSeries
          .map((item) => item.name)
          .join(", ");
        const myDate = new Date(response.data.date * 1000);
        console.log("myDate", myDate);
        const lastDate =
          myDate.getDate() +
          "." +
          (Number(myDate.getMonth()) + 1) +
          "." +
          myDate.getFullYear();
        console.log("lastDate", lastDate);
        setAllFav(
          <div>
            <hr />
            <div className="ms-1">
              <div className="card text-center ms-md-5 ms-3">
                <div className="card-header">
                  <b>Hakkımda</b>
                </div>
                <div className="card-body">
                  {response.data.ad ? (
                    <p className="card-text text-start">
                      <b>İsim:</b> {response.data.ad} {response.data.soyad}
                    </p>
                  ) : null}
                  <p className="card-text text-start">
                    <b>Kullanıcı Adı:</b> {response.data.username}
                  </p>
                  <p className="card-text text-start">
                    <b>E-Posta:</b> {response.data.email}
                  </p>
                  <p className="card-text text-start">
                    <b>Favori Filmlerim:</b> {myFilms}
                  </p>
                  <p className="card-text text-start">
                    <b>Favori Dizilerim:</b> {mySeries}
                  </p>
                  {response.data.hakkımda ? (
                    <p className="card-text text-start">
                      <b>Hakkımda:</b> {response.data.hakkımda}
                    </p>
                  ) : null}
                </div>
                <div className="card-footer text-body-secondary">
                  <b>Kayıt Tarihi: </b>
                  {lastDate}
                </div>
              </div>
            </div>
          </div>
        );
      });
  };

  const allFavSeriesFunc = () => {
    innerFuncGetFav("tv").then((response) => {
      console.log("allFavList", response);
      if (response.length === 0) {
        setAllFav(
          <div className="alert alert-info">
            Henüz herhangi bir dizi favorilere eklenmemiş...
          </div>
        );
      } else {
        setAllFav(
          <div>
            <hr />
            <div className="my-4 ms-3 fs-5 fw-bolder">
              Favori Diziler ({response.length})
            </div>
            <div id="cardLine" className="row row-cols-md-5">
              {response.map((item) => (
                <div className="col mb-4" key={item.id}>
                  <a id="allFavAnchor" href={`/tv/${item.id}`}>
                    <img
                      id="allFavList"
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt="resim"
                    />
                    <p id="allFavParag">{item.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      }
    });
  };

  const myFavSeriesFunc = () => {
    innerFuncGetFav("tv").then((response) => {
      axios
        .get(
          `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
        )
        .then((response2) => {
          const filteredItems = response.filter((item) => {
            return response2.data.favoritedSeries.some(
              (item2) => item2.id === item.id
            );
          });

          if (filteredItems.length === 0) {
            setAllFav(
              <div className="alert alert-info">
                Henüz favorilerinize bir dizi eklememişsiniz...
              </div>
            );
          } else {
            setAllFav(
              <div>
                <hr />
                <div className="my-4 ms-3 fs-5 fw-bolder">
                  Favori Dizilerin ({filteredItems.length})
                </div>
                <div id="cardLine" className="row row-cols-md-5">
                  {filteredItems.map((item) => (
                    <div className="col mb-4" key={item.id}>
                      <a id="allFavAnchor" href={`/tv/${item.id}`}>
                        <img
                          id="allFavList"
                          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                          alt="resim"
                        />
                        <p id="allFavParag">{item.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        });
    });
  };

  const myUserSettingsFunc = () => {
    axios
      .get("https://6512c882b8c6ce52b39631d1.mockapi.io/users")
      .then((response) => {
        console.log("responseresponse", response);
        axios
          .get(
            `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successData.userId}`
          )
          .then((response2) => {
            console.log("settingResponse", response2);
            setAllFav(
              <div>
                <hr />
                <MyUserAccordion user={response2.data} users={response.data} />
              </div>
            );
          });
      });
  };

  // const {user, isAuthenticated, isLoading} = useAuth0()
  const { isAuthenticated, successData } = useSelector(
    (state) => state.mockApi
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, navigate]);
  console.log("picture", successData?.picture.includes("picture"));

  if (isAuthenticated) {
    return (
      <MyLayout>
        <div className="container">
          <div className="myUserCard">
            <div className="row" style={{ height: "400px" }}>
              <div className="col-9 myUserRelative">
                <div className="myUserRealImgAbsolute">
                  {!successData?.picture.includes("picture") ? (
                    <div className="  ">
                      <img
                        className="myUserRealImg"
                        src={successData?.picture}
                        alt="Kullanıcı"
                      ></img>
                    </div>
                  ) : (
                    <div>
                      <img
                        className="myUserRealImg"
                        src="https://simg01.imgsinemalar.com/img/user/no_avatar.jpg"
                        alt="Kullanıcı"
                      ></img>
                    </div>
                  )}
                </div>
                <section className="myUserAbsolute d-flex justify-content-between row ">
                  <div className="col-4 d-flex align-items-center">
                    <div className="text-light fw-bolder">
                      {successData?.username}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-end col-8 ">
                    <div className="list-group list-group-horizontal mylist-group-horizontal">
                      <button
                        onClick={userInfoFunc}
                        className="list-group-item myUserUl2 btn btn-outline-secondary"
                      >
                        <i className="bi bi-person myUserUlItem"></i>
                      </button>
                      <Dropdown className="">
                        <Dropdown.Toggle className="dropdown-toggle list-group-item myUserUl2 btn btn-outline-secondary">
                          <i className="bi bi-film myUserUlItem"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item disabled>
                            Favori Film Listeleri
                          </Dropdown.Item>
                          <Dropdown.Divider/>
                          <Dropdown.Item>
                            <a
                              onClick={myFavFunc}
                              
                              style={{ cursor: "pointer" }}
                            >
                              Favori Film Listem
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <a
                              onClick={allFavFunc}
                      
                              style={{ cursor: "pointer" }}
                            >
                              Tüm Favori Film Listeleri
                            </a>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown >
                        <Dropdown.Toggle
                          
                          className="dropdown-toggle list-group-item myUserUl2 btn btn-outline-secondary"
                        >
                          <i className="bi bi-camera-reels myUserUlItem"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark" >
                          <Dropdown.Item className="dropdown-item disabled">
                            Favori Dizi Listeleri
                          </Dropdown.Item>
                          <Dropdown.Divider/>
                          <Dropdown.Item>
                            <a
                              onClick={myFavSeriesFunc}
                             
                              style={{ cursor: "pointer" }}
                            >
                              Favori Dizi Listem
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <a
                              onClick={allFavSeriesFunc}
                              
                              style={{ cursor: "pointer" }}
                            >
                              Tüm Favori Dizi Listeleri
                            </a>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <button
                        onClick={myUserSettingsFunc}
                        className="list-group-item myUserUl2 btn btn-outline-secondary"
                      >
                        <i className="bi bi-gear myUserUlItem"></i>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
              <div
                className="col-3 myUserRightMenu "
                style={{
                  maxHeight: "100%",
                  backgroundColor: "#383838",
                  borderRadius: "0 30px 30px 0",
                }}
              >
                <div className="myUserUl ">
                  <div className="myUserLi ms-md-5 ">
                    <div className="  ms-3 ps-md-5 ms-md-5  pt-3">
                      <i className="text-info bi bi-person-badge  display-1"></i>
                    </div>
                    <div
                      style={{ lineHeight: "20px" }}
                      className="pb-4 text-end"
                    >
                      O bir Amatör
                    </div>
                  </div>
                  <span className=" myUserDivider"></span>
                  <div className="myUserLi pt-3 pb-2">
                    <p
                      className="text-end"
                      style={{ lineHeight: "5px", color: "orange" }}
                    >
                      0
                    </p>
                    <p className="text-end" style={{ lineHeight: "5px" }}>
                      Puan
                    </p>
                  </div>

                  <span className="myUserDivider"></span>
                  <div className="myUserLi pt-3 pb-2">
                    <p
                      className="text-end"
                      style={{ lineHeight: "5px", color: "orange" }}
                    >
                      0
                    </p>
                    <p className="text-end" style={{ lineHeight: "15px" }}>
                      Haftalık Puan
                    </p>
                  </div>
                  <span className="myUserDivider"></span>
                  <div className="myUserLi pt-4 mt-2 pb-2">
                    <p
                      className="text-end"
                      style={{ lineHeight: "5px", color: "orange" }}
                    >
                      0
                    </p>
                    <p className="text-end" style={{ lineHeight: "5px" }}>
                      Arkadaş
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">{allFav}</div>
        </div>
      </MyLayout>
    );
  } else {
    return (
      <>
        <MyLayout>
          <div className="text-center alert alert-danger">
            Maalesef giriş hakkınız yok!
          </div>
        </MyLayout>
      </>
    );
  }
};

export default User;
