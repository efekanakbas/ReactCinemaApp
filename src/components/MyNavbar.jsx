
import "../static/css/myNavbar.css";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { useRef, useState} from "react";


import MyLoginModal from "./MyLoginModal";
import { authFunc } from "../redux/features/mockApiList";
import Dropdown from 'react-bootstrap/Dropdown';

const MyNavbar = () => {
 
  const dispatch = useDispatch();
  const { isAuthenticated, successData } = useSelector(
    (state) => state.mockApi
  );
  console.log("navbar", isAuthenticated);
  console.log("navbarData", successData);
  console.log("favListNavbar", successData.userId);
  const searchNavbarFunc = (e) => {
    e.preventDefault();

    const myVal = inputRef?.current?.value;
    if (myVal) {
      // Yeni bir URL oluşturun ve navigate edin.
      const newUrl = `/search/${myVal}/page=1`;
      window.location.href = newUrl;
    } else {
      // Eğer input değeri boşsa, inputa odaklanın.
      inputRef.current.focus();
    }

    // Yeni arama yapıldığında sayfanın en üstüne dönün
    window.scrollTo(0, 0);
  };

  const inputRef = useRef();

  const handleLogout = () => {
    dispatch(authFunc());
    alert("Çıkış Başarılı");
    window.location.href = "/";
  };

  window.addEventListener("scroll", function () {
    var navbar = document.getElementById("myNavbarCssStyle");
    if (window.scrollY > 50) {
      if (navbar) {
        navbar.style.opacity = "0";
        navbar.style.transform = "translateY(-100%)"; // Navbar'ı yukarı taşı
      }
    } else {
      if (navbar) {
        navbar.style.opacity = "1";
        navbar.style.transform = "translateY(0)"; // Navbar'ı eski konumuna getir
      }
    }
  });

  const [toggle, setToggle] = useState(false)

  return (
    <div id="myNavbarCssStyle">
      <nav className="fixed-top  myNavbar text-ligh">
        <div className=" text-center container-md">
          <div className="row pt-2">
            <div className="col-md-4 mb-1 mb-md-0 text-md-start">
              <a href="/" className="item1">
                <img
                  src="/images/sinemalarLogo.png"
                  alt="sinemalar"
                  style={{ width: "40px" }}
                />
                <i
                  className="myI"
                  style={{ fontFamily: "cursive", textDecoration: "none" }}
                >
                  EfekanSinema
                </i>
                <i className="text-warning myI">.com</i>
              </a>
            </div>
            <div className="col-md-4 ">
              <form id="search-form" onSubmit={searchNavbarFunc}>
                <div className="input-group mb-3 ">
                  <input
                    type="text"
                    className="form-control rounded-start-5"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    ref={inputRef}
                  />
                  <button
                    className="btn btn-light rounded-end-5"
                    type="submit"
                    id="button-addon1"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 text-md-end">
              {!isAuthenticated ? (
                <div>
                  <button
                    id="userBut"
                    onClick={() => {setToggle(true)}}
                  >
                    <span className="mySpan">Üye Girişi</span>
                  </button>
                  <MyLoginModal toggle = {toggle} setToggle = {setToggle} />
                </div>
              ) : (
                <div>
                   {!successData?.picture.includes("picture") ? (
                 
                    <img style={{border:"2.5px solid orange"}} width={"35px"}  className="me-2 mb-1 rounded-4" src={successData?.picture} alt="Kullanıcı"></img>
                
                ) : (
                 
                    <img
                      style={{border:"2.5px solid orange"}}
                      width={"35px"}
                      className="me-2 mb-1 rounded-4"
                      src="https://simg01.imgsinemalar.com/img/user/no_avatar.jpg"
                      alt="Kullanıcı"
                    ></img>
                
                )}
                  <Dropdown className="d-inline">
                    <Dropdown.Toggle 
                      id="userBut"
                    >
                      <span className="mySpan">{successData.username}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      
                        <Dropdown.Item
                          className="dropdown-item"
                          href={`/user/${successData.username}`}
                        >
                          Profilim
                        </Dropdown.Item>
                      
                      
                        <Dropdown.Item
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          Çıkış
                        </Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  <span className="badge bg-warning ms-2 rounded-4">0</span>
                </div>
              )}
            </div>
          </div>
          <div
            className="row d-flex"
            style={{ height: "25px", transform: "translate(0,-13px)" }}
          >
            <ul className="item4 d-flex justify-content-evenly" id="item4">
              <li className="myLi ">
                <a
                  className=" myA"
                  aria-current="page"
                  href="/movies/Vizyondakiler/page=1"
                >
                  Vizyondakiler
                </a>
              </li>
              <li className="myLi">
                <a className="myA " href="/movies/Yakında Sinemalarda/page=1">
                  Yakında
                </a>
              </li>
              <li className="myLi ">
                <a
                  className="myA "
                  aria-current="page"
                  href="/movies/En Gözde Filmler/page=1"
                >
                  Gözde Filmler
                </a>
              </li>
              <li className="myLi">
                <a className=" myA " href="/tv/Tv Dizileri/page=1">
                  Diziler
                </a>
              </li>
              <li className="myLi ">
                <a
                  className=" myA"
                  aria-current="page"
                  href="/tv/Yakında.../page=1"
                >
                  Yakında
                </a>
              </li>
              <li className="myLi">
                <a className="myA " href="/tv/En Gözde Diziler/page=1">
                  Gözde Diziler
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MyNavbar;
