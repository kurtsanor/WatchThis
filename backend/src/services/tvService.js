const tmdbAxios = require("../utils/axiosInstance");

const searchByTitleAndPageApi = async (title, page) => {
  const response = tmdbAxios
    .get("/search/tv", {
      params: {
        query: title,
        page: page,
      },
    })
    .then((res) => res.data);
  return response;
};

const findByGenreAndPageApi = async (genre, page) => {
  const params = {
    page,
    language: "en-US",
    sort_by: "popularity.desc",
  };
  if (genre && Number(genre) !== 0) {
    params.with_genres = genre;
  }
  const response = tmdbAxios
    .get("/discover/tv", { params })
    .then((res) => res.data);
  return response;
};

const findDetailsByIdApi = (id) => {
  const response = tmdbAxios.get(`/tv/${id}`).then((res) => res.data);
  return response;
};

const findCreditsByIdApi = async (id) => {
  const response = tmdbAxios.get(`/tv/${id}/credits`).then((res) => res.data);
  return response;
};

module.exports = {
  findByGenreAndPageApi,
  searchByTitleAndPageApi,
  findDetailsByIdApi,
  findCreditsByIdApi,
};
