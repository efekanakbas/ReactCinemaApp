

import MyNavbar from "./myNavbar";
import MyFooter from "./MyFooter";

const MyLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <MyNavbar />
      <div>{children}</div>
      <MyFooter />
    </div>
  );
};

export default MyLayout;
