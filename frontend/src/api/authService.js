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
