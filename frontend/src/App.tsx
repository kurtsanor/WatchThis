import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Layout from "./layouts/Layout";
import { MovieProvider } from "./contexts/MovieContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MovieProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        </Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </MovieProvider>
  );
}

export default App;
