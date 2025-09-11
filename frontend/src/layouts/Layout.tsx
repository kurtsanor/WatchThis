import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const inHeroPage = location.pathname === "/";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "101vh",
      }}
    >
      <Header></Header>
      <main style={{ padding: inHeroPage ? 0 : "2rem", flex: 1 }}>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}
export default Layout;
