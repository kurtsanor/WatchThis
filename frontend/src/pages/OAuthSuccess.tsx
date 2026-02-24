import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // save token
      localStorage.setItem("token", token);
      setToken(token);

      // HARD redirect to homepage
      window.location.replace("/");
      return;
    }

    // fallback
    window.location.replace("/login");
  }, [setToken]);

  return null;
}
