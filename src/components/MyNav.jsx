import "../static/css/myNav.css";
import { useFetchHook } from "../hooks/useFetchHook";
import { useDispatch } from "react-redux";
import { myClickFunc } from "../redux/features/thunkSlice";
import { useNavigate } from "react-router-dom";
const MyNav = ({
  first,
  second,
  third,
  fourth,
  secondFetch,
  thirdFetch,
  fourthFetch,
}) => {
  const navSecond = useFetchHook(secondFetch);
  const navThird = useFetchHook(thirdFetch);
  const navFourth = useFetchHook(fourthFetch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleActiveClass = (elementToToggle, otherElements, myFetch) => {
    dispatch(myClickFunc(myFetch));

    const element = document.getElementById(elementToToggle);
    const leftElement = document.getElementsByClassName("mymymy")[0];
    if (!element) return; // Eğer belirtilen element bulunamazsa işlemi sonlandır.

    // Belirtilen elemente 'active' sınıfı eklenmişse, işlemi sonlandır.
    if (element.classList.contains("active")) return;

    // Diğer elementlerden 'active' sınıfını kaldır.
    otherElements.forEach((otherElementId) => {
      const otherElement = document.getElementById(otherElementId);
      if (otherElement) {
        otherElement.classList.remove("active");
      }
    });

    // Belirtilen elemente 'active' sınıfını ekle.
    element.classList.add("active");
    leftElement.innerHTML =
      element.id + '! <i class="bi bi-chevron-right"></i>';
    leftElement.onclick = () => {
      navigate(`/movies/${element.id}/page=1`);
    };
  };

  return (
    <div id="çeçeçe">
      <ul className="nav nav-tabs mb-5 d-flex myNavUl row">
        <div className="myNavCol col-md-3">
          <li className="nav-item">
            <a
              className="myNava nav-link  text-center  myVision mymymy"
              aria-current="page"
              onClick={() => navigate(`/movies/${second}/page=1`)}
            >
              {first} <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </div>
        <ul className="nav ms-auto row col-md-7">
          <li className="nav-item col-md-4">
            <a
              className="nav-link myNava active"
              id={second}
              onClick={() =>
                toggleActiveClass(second, [third, fourth], navSecond)
              }
            >
              <small>{second}</small>
            </a>
          </li>
          <li className="nav-item col-md-4">
            <a
              className="nav-link myNava "
              id={third}
              onClick={() =>
                toggleActiveClass(third, [second, fourth], navThird)
              }
            >
              <small>{third}</small>
            </a>
          </li>
          <li className="nav-item col-md-4">
            <a
              className="nav-link myNava "
              id={fourth}
              onClick={() =>
                toggleActiveClass(fourth, [second, third], navFourth)
              }
            >
              <small>{fourth}</small>
            </a>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default MyNav;
