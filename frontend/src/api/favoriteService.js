import axios from "axios";

export const findFavoritesByUser = async (userId) => {
  const response = axios
    .get(`http://localhost:3000/favorites?userId=${userId}`)
    .then((res) => res.data);
  return response;
};

export const addFavorite = (favoriteRequest) => {
  const response = axios
    .post("http://localhost:3000/favorites", favoriteRequest)
    .then((res) => res.data);
  return response;
};

export const removeFavorite = (favoriteRequest) => {
  const response = axios
    .delete("http://localhost:3000/favorites", {
      params: {
        userId: favoriteRequest.userId,
        mediaId: favoriteRequest.mediaId,
      },
    })
    .then((res) => res.data);
  return response;
};
