import axios from "axios";
import  { useState } from "react";
import { authFunc } from "../redux/features/mockApiList";
import { useDispatch } from "react-redux";
import { successFunc } from "../redux/features/mockApiList";
import MyAccordionModal from "./MyAccordionModal";
import Accordion from 'react-bootstrap/Accordion';

const MyUserAccordion = ({ user, users }) => {
  console.log("accordionUser", user);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "",
    about: "",
    myUrl: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("Ad:", formData.name);
    console.log("Soyad:", formData.lastName);
    user.ad = formData.name;
    user.soyad = formData.lastName;
    axios
      .put(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
        user
      )
      .then((response) => {
        console.log("myResponse", response);
        alert("Bilgileriniz Başarıyla Kaydedildi");
      })
      .catch((error) => console.log("error", error));

    setFormData({
      name: "",
      lastName: "",
    });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("Username:", formData.username);
    if (users.find((item) => item.username === formData.username)) {
      alert("Bu Kullanıcı Adı Kullanılıyor!");
    } else {
      user.username = formData.username;
      axios
        .put(
          `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
          user
        )
        .then((response) => {
          console.log("myResponse", response);
          dispatch(successFunc(user));
          alert("Kullanıcı Adınız Başarıyla Değiştirildi");
          window.location.reload();
        })
        .catch((error) => console.log("error", error));
    }

    setFormData({
      username: "",
    });
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("prev:", formData.prevPassword);
    console.log("new:", formData.newPassword);
    console.log("confirm:", formData.confirmPassword);
    if (formData.prevPassword !== user.password) {
      alert("Önceki Parolanız Yanlış!");
    } else if (formData.newPassword !== formData.confirmPassword) {
      alert("Yeni Girdiğiniz Şifreler uyuşmuyor");
    } else {
      user.password = formData.newPassword;
      axios
        .put(
          `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
          user
        )
        .then((response) => {
          console.log("myResponse", response);
          alert("Şifreniz Başarıyla Kaydedildi");
        })
        .catch((error) => console.log("error", error));
    }
    setFormData({
      prevPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit4 = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("Email:", formData.email);
    if (users.find((item) => item.email === formData.email)) {
      alert("Bu E-Posta Kullanılıyor!");
    } else {
      user.email = formData.email;
      axios
        .put(
          `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
          user
        )
        .then((response) => {
          console.log("myResponse", response);
          alert("E-Postanız Başarıyla Değiştirildi");
        })
        .catch((error) => console.log("error", error));
    }
    setFormData({
      email: "",
    });
  };

  const handleSubmit5 = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("About:", formData.about);
    user.hakkımda = formData.about;
    axios
      .put(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
        user
      )
      .then((response) => {
        console.log("myResponse", response);
        alert("E-Postanız Başarıyla Değiştirildi");
      })
      .catch((error) => console.log("error", error));

    setFormData({
      about: "",
    });
  };

  

  const handleSubmit6 = (event) => {
    event.preventDefault();
    // formData içindeki değerleri kullanabilirsiniz (formData.name ve formData.lastName)
    console.log("myUrl:", formData.myUrl);
    user.picture = formData.myUrl;
    axios
      .put(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`,
        user
      )
      .then((response) => {
        console.log("myResponse", response);
        dispatch(successFunc(user));
        alert("Resminiz Başarıyla Değiştirildi");
      })
      .catch((error) => console.log("error", error));

    setFormData({
      myUrl: "",
    });
  };












  const myUserDeleteFunc = () => {
    axios
      .delete(
        `https://6512c882b8c6ce52b39631d1.mockapi.io/users/${user.userId}`
      )
      .then((response) => {
        console.log("deleteResponse", response);
        dispatch(authFunc());
        alert("Hesabınız Başarıyla Silindi...");
        window.location.href = "/";
      });
  };

  

  return (
    <div>
      <Accordion defaultActiveKey="0"  className="ms-md-2" id="myAccordion">
        <Accordion.Item eventKey="0" className="accordion-item">
          <Accordion.Header className="accordion-header">
           
              Profil Resmim
            
          </Accordion.Header>
         
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">
                Mevcut Profil Resminiz:
              </strong>
              <div className="col">
                {!user?.picture.includes("picture") ? (
                  <div className="col">
                    <img width={115} className="" src={user?.picture} alt="Kullanıcı"></img>
                  </div>
                ) : (
                  <div className="col ms-1 ps-2">
                    <img
                      className=""
                      src="https://simg01.imgsinemalar.com/img/user/no_avatar.jpg"
                      alt="Kullanıcı"
                    ></img>
                  </div>
                )}
                <button className="btn btn-success mt-3 ms-3" onClick={() => {setToggle(true)}}>Değiştir!</button>
                <MyAccordionModal toggle = {toggle} setToggle = {setToggle} onSubmit={handleSubmit6}  value={formData.myUrl}  onChange={handleInputChange} />
              </div>
            </Accordion.Body>
          
        </Accordion.Item>
        <Accordion.Item  eventKey="1">
          <Accordion.Header >
          
              Kişisel Bilgilerim
          
          </Accordion.Header>
         
            <Accordion.Body className=" d-flex row">
              <strong className="col align-self-center">
                Kişisel Bilgilerim:
              </strong>
              <div className="col">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="myName"
                      name="name"
                      required
                      placeholder="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myName">Adım:</label>
                  </div>
                  <div className="form-floating">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="mySurName"
                      name="lastName"
                      placeholder="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="mySurName">Soyadım:</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Kaydet
                  </button>
                </form>
              </div>
            </Accordion.Body>
         
        </Accordion.Item>
        <Accordion.Item eventKey="2" >
          <Accordion.Header>
           
              Kullanıcı Adım
            
          </Accordion.Header>
         
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">
                Kullanıcı Adı İşlemlerim:
              </strong>
              <div className="col">
                <form onSubmit={handleSubmit2}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="myuserName"
                      name="username"
                      placeholder="name"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myUsername">Kullanıcı Adım</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Değiştir
                  </button>
                </form>
              </div>
            </Accordion.Body>
         
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
          
              Şifrem
          </Accordion.Header>
        
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">
                Şifre İşlemlerim:
              </strong>
              <div className="col">
                <form onSubmit={handleSubmit3}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="myPrevPassword"
                      name="prevPassword"
                      placeholder="name"
                      value={formData.prevPassword}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myPrevPassword">Eski Parolanız:</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="myNewPassword"
                      name="newPassword"
                      placeholder="lastName"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myNewPassword">Yeni Parolanız:</label>
                  </div>
                  <div className="form-floating">
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="myConfirmPassword"
                      name="confirmPassword"
                      placeholder="lastName"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myConfirmPassword">Parola Tekrar:</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Kaydet
                  </button>
                </form>
              </div>
            </Accordion.Body>
         
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header >
          
              E-Postam
           
          </Accordion.Header>
         
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">
                E-Posta İşlemlerim:
              </strong>
              <div className="col">
                <form onSubmit={handleSubmit4}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="myEmail"
                      name="email"
                      placeholder="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="myEmail">E-Postam</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Değiştir
                  </button>
                </form>
              </div>
            
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header >
            
              Hakkımda
        
          </Accordion.Header>
         
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">Hakkımda:</strong>
              <div className="col">
                <form onSubmit={handleSubmit5}>
                  <div className="form-floating">
                    <textarea
                      required
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="myTextArea"
                    ></textarea>
                    <label htmlFor="myTextArea">Kendinden Bahset</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 float-end"
                  >
                    Ekle
                  </button>
                </form>
              </div>
            </Accordion.Body>
         
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
           
              Hesabı Sil
            
          </Accordion.Header>
         
            <Accordion.Body className="d-flex row">
              <strong className="col align-self-center">Hesap Silme:</strong>
              <div className="col">
                <p>Hesabı gerçekten silmek istiyor musunuz?</p>
                <button onClick={myUserDeleteFunc} className="btn btn-danger">
                  Eminim sil
                </button>
              </div>
            </Accordion.Body>
          
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MyUserAccordion;
