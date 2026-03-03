import axiosInstance from "../utilities/axiosInstance";

export const findFavoritesByUser = async () => {
  const response = axiosInstance.get(`/favorites`).then((res) => res.data);
  return response;
};

export const addFavorite = (favoriteRequest) => {
  const response = axiosInstance
    .post("/favorites", favoriteRequest)
    .then((res) => res.data);
  return response;
};

export const removeFavorite = (favoriteRequest) => {
  const mediaId = favoriteRequest.mediaId;
  const response = axiosInstance
    .delete(`/favorites/${mediaId}`)
    .then((res) => res.data);
  return response;
};

export const findAllByUserWithDetails = () => {
  const response = axiosInstance
    .get(`/favorites/media`)
    .then((res) => res.data);
  return response;
};
