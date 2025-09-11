import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Layout from "./layouts/Layout";
import { MovieProvider } from "./contexts/MovieContext";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import Home from "./pages/Home";

function App() {
  return (
    <MovieProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
        </Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </MovieProvider>
  );
}

export default App;
