import { axiosInstance } from "../utilities/axiosInstance";

export const findFavoritesByUser = async (userId) => {
  const response = axiosInstance
    .get(`/favorites?userId=${userId}`)
    .then((res) => res.data);
  return response;
};

export const addFavorite = (favoriteRequest) => {
  const response = axiosInstance
    .post("/favorites", favoriteRequest)
    .then((res) => res.data);
  return response;
};

export const removeFavorite = (favoriteRequest) => {
  const response = axiosInstance
    .delete("/favorites", {
      params: {
        userId: favoriteRequest.userId,
        mediaId: favoriteRequest.mediaId,
      },
    })
    .then((res) => res.data);
  return response;
};
