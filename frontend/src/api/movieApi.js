import { axiosInstance } from "../utilities/axiosInstance";

export async function searchByTitleAndPage(title, page) {
  const response = axiosInstance
    .get("/movies/search", {
      params: {
        query: title,
        page,
      },
    })
    .then((res) => res.data);
  return response;
}

export async function findTrailerByTypeAndId(type, id) {
  const response = axiosInstance
    .get(`/movies/trailer/${type}/${id}`)
    .then((res) => res.data);
  return response;
}

export async function findPlayingNow() {
  const response = axiosInstance
    .get("/movies/trending")
    .then((res) => res.data);
  return response;
}

export async function findOnTheAir() {
  const response = axiosInstance
    .get("/movies/on_the_air")
    .then((res) => res.data);
  return response;
}

export async function findByGenreAndPage(genre, page) {
  const response = axiosInstance
    .get("/movies", {
      params: {
        genre,
        page,
      },
    })
    .then((res) => res.data);
  return response;
}

export async function findDetailsById(id) {
  const response = axiosInstance.get(`/movies/${id}`).then((res) => res.data);
  return response;
}

export async function findCreditsById(id) {
  const response = axiosInstance
    .get(`/movies/${id}/credits`)
    .then((res) => res.data);
  return response;
}
