import axiosInstance from "../utilities/axiosInstance";

export const findById = async (id) => {
  const response = axiosInstance.get(`/users/${id}`).then((res) => res.data);
  return response;
};
