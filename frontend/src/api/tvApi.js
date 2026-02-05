import axiosInstance from "../utilities/axiosInstance";

export async function findByGenreAndPage(genre, page) {
  const response = axiosInstance
    .get("/tv", {
      params: {
        genre,
        page,
      },
    })
    .then((res) => res.data);
  return response;
}

export async function searchByTitleAndPage(title, page) {
  const response = axiosInstance
    .get("/tv/search", {
      params: {
        query: title,
        page,
      },
    })
    .then((res) => res.data);
  return response;
}

export async function findDetailsById(id) {
  const response = axiosInstance.get(`/tv/${id}`).then((res) => res.data);
  return response;
}

export async function findCreditsById(id) {
  const response = axiosInstance
    .get(`/tv/${id}/credits`)
    .then((res) => res.data);
  return response;
}
