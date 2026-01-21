import axios from "axios";

export const registerUser = async (registerRequest) => {
  const response = axios
    .post("http://localhost:3000/auth/register", registerRequest)
    .then((res) => res.data);

  return response;
};

export const login = (loginRequest) => {
  const response = axios
    .post("http://localhost:3000/auth/login", loginRequest)
    .then((res) => res.data);
  return response;
};
