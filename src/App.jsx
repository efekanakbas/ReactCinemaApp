import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Movie from "./pages/Movie";
import Serie from "./pages/Serie";
import User from "./pages/User";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:var/:page" element={<Movies />} />
          <Route path="/tv/:var/:page" element={<Series />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<Serie />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/search/:variable/:page" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
