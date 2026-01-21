import { Outlet } from "react-router-dom";
import classes from "../css/Login.module.css";

export default function AuthLayout() {
  return (
    <div className={classes.container}>
      <div className={classes.container__form}>
        <Outlet />
      </div>
    </div>
  );
}
