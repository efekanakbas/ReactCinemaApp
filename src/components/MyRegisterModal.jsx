import axios from "axios";
import { useState } from "react";
import "../static/css/myModal.css";

const MyRegisterModal = () => {
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
                  <label htmlFor="registerName">Kullanıcı Adınız</label>
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
                  <label htmlFor="registerPassword">Parolanız</label>
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
                  <label htmlFor="password-control">Parola Tekrar</label>
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
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRegisterModal;
