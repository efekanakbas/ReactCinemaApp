import "../static/css/myNavbar.css";
import "../static/css/myModal.css";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

import { useRef, useState } from "react";

import { authFunc } from "../redux/features/mockApiList";
import "../static/css/myModal.css";
import axios from "axios";
import { successFunc } from "../redux/features/mockApiList";

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

  // console.log("auth", isAuthenticated)
  // console.log("successData", successData)

  const [formLoginData, setFormLoginData] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    const newValue = value;

    setFormLoginData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const myLoginModalSubmitFunc = async (e) => {
    e.preventDefault();

    const loginData = await axios.get(
      "https://6512c882b8c6ce52b39631d1.mockapi.io/users"
    );
    console.log("axiosData", loginData.data);
    console.log("formData", formLoginData);

    const successfulItem = loginData.data.find(
      (item) =>
        item.username === formLoginData.loginUsername &&
        item.password === formLoginData.loginPassword
    );

    if (successfulItem) {
      const successUserId = successfulItem.userId;
      const successData = await axios.get(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${successUserId}`
      );
      alert("Giriş Başarılı");
      dispatch(authFunc());
      dispatch(successFunc(successData.data));
      console.log("successData", successData.data);
    } else {
      setFormLoginData({
        loginUsername: "",
        loginPassword: "",
      });
      alert("Kullanıcı adı veya parola hatalı.");
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const handleInputChange = (e) => {
    console.log("e", e.target);
    const { name, value } = e.target;
    const newValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const myModalSubmitFunc = async (e) => {
    e.preventDefault();

    // Parola ve parola tekrar alanlarının değerlerini alın
    const { password, confirmPassword, username, email } = formData;

    // Form öğelerini boş olup olmadığını kontrol et
    if (!username || !email || !password || !confirmPassword) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password === confirmPassword) {
      try {
        delete formData.confirmPassword;
        console.log("Form Verileri:", formData);

        // Kullanıcı adı ve e-posta kontrolü için veriyi getirin
        const response = await axios.get(
          "https://6512c882b8c6ce52b39631d1.mockapi.io/users"
        );

        const isUsernameTaken = response.data.some(
          (item) => item.username === formData.username
        );
        const isEmailTaken = response.data.some(
          (item) => item.email === formData.email
        );

        if (isUsernameTaken) {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            file: null,
          });
          alert("Bu Kullanıcı Adı Zaten Alınmış!");
        } else if (isEmailTaken) {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            file: null,
          });
          alert("Bu E-Posta Zaten Alınmış!");
        } else {
          // Axios ile POST isteği gönderin
          const postResponse = await axios.post(
            "https://6512c882b8c6ce52b39631d1.mockapi.io/users",
            formData
          );
          alert("Kayıt Başarılı");

          console.log("response", postResponse);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        file: null,
      });
      alert("Parola ve Parola Tekrar alanları uyuşmuyor!");
    }
  };

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
                    data-bs-toggle="modal"
                    data-bs-target="#myLoginModal"
                  >
                    <span className="mySpan">Üye Girişi</span>
                  </button>
                  <div>
                    <div
                      className="modal fade"
                      id="myLoginModal"
                      data-bs-scroll="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="modal-title">Giriş Yap</h3>
                            <button
                              className="btn-close"
                              type="button"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <h6 className="mb-3 ms-1 text-secondary text-start">
                              Formu Doldurunuz
                            </h6>
                            <form onSubmit={myLoginModalSubmitFunc}>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="LoginName"
                                  placeholder=""
                                  name="loginUsername"
                                  required
                                  value={formLoginData.loginUsername}
                                  onChange={handleInputChange2}
                                />
                                <label htmlFor="LoginName">
                                  Kullanıcı Adınızı Giriniz
                                </label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="loginPassword"
                                  placeholder=""
                                  name="loginPassword"
                                  required
                                  value={formLoginData.loginPassword}
                                  onChange={handleInputChange2}
                                />
                                <label htmlFor="loginPassword">
                                  Parolanızı Giriniz
                                </label>
                              </div>
                              <button
                                type="submit"
                                data-bs-dismiss="modal"
                                className="btn btn-success"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                          <div className="modal-footer text-end">
                            <button
                              className="btn btn-primary me-auto"
                              data-bs-toggle="modal"
                              data-bs-target="#myRegisterModal"
                            >
                              Kayıt Ol
                            </button>

                            <button
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="modal fade" id="myRegisterModal">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h3 className="modal-title">Kayıt Ol</h3>
                              <button
                                className="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <h6 className="mb-3 ms-1 text-secondary text-start">
                                Lütfen ilgili yerleri doldurun.
                              </h6>
                              <form onSubmit={myModalSubmitFunc} noValidate>
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="registerName"
                                    name="username"
                                    placeholder=""
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                  />
                                  <label htmlFor="registerName">
                                    Kullanıcı Adınız
                                  </label>
                                </div>
                                <div className="form-floating mb-3">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                  />
                                  <label htmlFor="email">E-Postanız</label>
                                </div>
                                <div className="form-floating mb-3">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="registerPassword"
                                    name="password"
                                    placeholder=""
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                  />
                                  <label htmlFor="registerPassword">
                                    Parolanız
                                  </label>
                                </div>
                                <div className="form-floating mb-3">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="password-control"
                                    name="confirmPassword"
                                    placeholder=""
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                  />
                                  <label htmlFor="password-control">
                                    Parola Tekrar
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  data-bs-dismiss="modal"
                                  className="btn btn-primary mt-3"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                            <div className="modal-footer text-end">
                              <button
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {!successData?.picture.includes("picture") ? (
                    <img
                      style={{ border: "2.5px solid orange" }}
                      width={"35px"}
                      className="me-2 mb-1 rounded-4"
                      src={successData?.picture}
                      alt="Kullanıcı"
                    ></img>
                  ) : (
                    <img
                      style={{ border: "2.5px solid orange" }}
                      width={"35px"}
                      className="me-2 mb-1 rounded-4"
                      src="https://simg01.imgsinemalar.com/img/user/no_avatar.jpg"
                      alt="Kullanıcı"
                    ></img>
                  )}
                  <div className="dropdown d-inline">
                    <button
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      id="userBut"
                    >
                      <span className="mySpan">{successData.username}</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href={`/user/${successData.username}`}
                        >
                          Profilim
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          Çıkış
                        </a>
                      </li>
                    </ul>
                  </div>
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
