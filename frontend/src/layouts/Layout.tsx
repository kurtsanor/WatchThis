import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "101vh",
      }}
    >
      <Header></Header>
      <main style={{ padding: "2rem", flex: 1 }}>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}
export default Layout;
