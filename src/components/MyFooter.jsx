
import "../static/css/myFooter.css";
const MyFooter = () => {
  return (
    <footer className="myFooter  ">
      <div className="container pt-1 pb-4">
        <div className="row pt-2 row-cols-2">
          <div className="col-md-6 align-self-center">
            <div className="row d-flex justify-content-center">
              <img
                src="/images/nokta.png"
                alt="nokta"
                style={{ maxWidth: "150px" }}
              />
            </div>
            <div className="row d-flex justify-content-center mx-auto">
              <p className="myFooterLisance d-flex mx-auto justify-content-center ">
                Telif Hakları © 2023 Efekan Akbaş
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <p className="text-light mt-5">
              <strong>Projelerimiz</strong>
            </p>
            <a
              className="d-block  mb-2 myFooterA"
              href="https://www.doviz.com/"
            >
              Döviz.com
            </a>
            <a
              className="d-block   mb-2 myFooterA"
              href="https://www.izlesene.com/"
            >
              İzlesene.com
            </a>
          </div>
          <div className="col-md-2 mt-5 ">
            <p className="text-light">
              <strong>Destek</strong>
            </p>
            <a className="d-block   mb-2 myFooterA" href="#">
              İletişim
            </a>
            <a className="d-block  mb-2 myFooterA" href="#">
              Yardım
            </a>
            <a className="d-block  mb-2 myFooterA" href="#">
              Sözleşme
            </a>
          </div>
          <div className="col-md-2">
            <p className="text-light mt-5">
              <strong>Politikalarımız</strong>
            </p>
            <a className="d-block   mb-4 myFooterA" href="#">
              Çerez Politikası
            </a>
            <a className="d-block   mb-2 myFooterA" href="#">
              Kişisel Verilerin Korunması
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
