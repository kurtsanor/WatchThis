import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/favorites" element={<Favorites></Favorites>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
