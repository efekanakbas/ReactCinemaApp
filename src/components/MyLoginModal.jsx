import { useState } from "react";
import MyRegisterModal from "./MyRegisterModal";
import "../static/css/myModal.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authFunc, successFunc } from "../redux/features/mockApiList";
import Modal from "react-bootstrap/Modal";

const MyLoginOModal = ({toggle, setToggle}) => {
  const dispatch = useDispatch();

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

  const [tog, setTog] = useState(false)

  return (
    <div>
      <Modal show={toggle} onHide={() => {setToggle(false)}}>
        
          <Modal.Header className="modal-header">
            <h3 className="modal-title">Giriş Yap</h3>
            <button
              className="btn-close"
              onClick={() => {setToggle(false)}}
            ></button>
          </Modal.Header>
          <Modal.Body>
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
                <label htmlFor="LoginName">Kullanıcı Adınızı Giriniz</label>
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
                <label htmlFor="loginPassword">Parolanızı Giriniz</label>
              </div>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary me-auto"
              onClick={() => {setTog(true)}}
            >
              Kayıt Ol
            </button>

            <button className="btn btn-danger" onClick={() => {setToggle(false)}}>
              Close
            </button>
          </Modal.Footer>
       
      </Modal>
      <MyRegisterModal tog = {tog} setTog = {setTog} />
    </div>
  );
};

export default MyLoginOModal;
