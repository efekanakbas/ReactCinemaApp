import  {  useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';

const MyOffcanvas = ({ type, image, item, fetchType, toggle, setToggle }) => {
  const [value, setValue] = useState();
  console.log("benimFetch", fetchType);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const canvasClick = () => {
    console.log("value", value);
    if (value === undefined || value === null) {
      alert("Lütfen punanınızı yollamadan önce bir değer girin...");
    } else {
      const options = {
        method: "POST",
        url: `https://api.themoviedb.org/3/${fetchType}/${item.id}/rating`,
        params: { session_id: "0c7e3c1f8a972a01ae80195d62e78a6bd3b5bc66" },
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZmMDFmMjVkOWMxMTE2MjM5OTkwZmVjYTQ1ZTc4YyIsInN1YiI6IjY1MDNiZjJhMWJmMjY2MDBlMjVmNzlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33_vnn0Uxz2j-PGEJeZcnrEuMPj1oho1tHkMBtYsDs",
        },
        data: `{"value":${value}}`,
      };

      axios
        .request(options)
        .then(function (response) {
          alert("Oyunuzu Başarıyla Gönderdiniz!");
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Offcanvas 
        show = {toggle}
        onHide = {() => {setToggle(false)}}
        placement="end"
        className="bg-light"
        tabIndex="-1"
        id="myOffcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id="userOffcanvas"
          >{`${type} Puanla`}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {setToggle(false)}}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Puanla!</Typography>
            <Rating
              name="customized-10"
              defaultValue={0}
              max={10}
              onChange={handleRatingChange}
            />
          </Box>
          <button
            data-bs-dismiss="offcanvas"
            onClick={canvasClick}
            className="btn btn-warning mt-3"
          >
            Puanı Yolla!
          </button>
          <div
            className=""
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "center",
              height: "70%",
              width: "100%",
              borderRadius: "20px",
              marginTop: "70px",
              marginBottom: "42px",
            }}
          ></div>
        </div>
      </Offcanvas>
    </div>
  );
};

export default MyOffcanvas;
