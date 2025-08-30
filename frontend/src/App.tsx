import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
