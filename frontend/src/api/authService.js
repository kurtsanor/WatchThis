import axiosInstance from "../utilities/axiosInstance";

export const registerUser = async (registerRequest) => {
  const response = axiosInstance
    .post("/auth/register", registerRequest)
    .then((res) => res.data);

  return response;
};

export const login = (loginRequest) => {
  const response = axiosInstance
    .post("/auth/login", loginRequest)
    .then((res) => res.data);
  return response;
};

export const setPassword = (request) => {
  const response = axiosInstance
    .post("/auth/set-password")
    .then((res) => res.data);
  return response;
};
