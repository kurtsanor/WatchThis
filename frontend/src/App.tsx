import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Layout from "./layouts/Layout";
import { MovieProvider } from "./contexts/MovieContext";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";
import MediaDetails from "./pages/MediaDetails";

function App() {
  return (
    <MovieProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home></Home>} />
          <Route path="/favorites" element={<Favorites></Favorites>} />

          <Route path="/movies" element={<Movies></Movies>} />
          <Route
            path="/movies/:id"
            element={<MediaDetails mediaType="movies" />}
          />

          <Route path="/tvshows" element={<TvShows />} />
          <Route
            path="/tvshows/:id"
            element={<MediaDetails mediaType="tvshows" />}
          />
        </Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </MovieProvider>
  );
}

export default App;
