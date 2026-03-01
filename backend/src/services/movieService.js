const tmdbAxios = require("../utils/axiosInstance");

const searchByTitleAndPageApi = async (title, page) => {
  const response = tmdbAxios
    .get("/search/movie", {
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
    .get("/discover/movie", { params })
    .then((res) => res.data);
  return response;
};

const findTrailerByTypeAndIdApi = async (type, id) => {
  const response = tmdbAxios
    .get(`/${type}/${id}/videos`)
    .then((res) => res.data);
  return response;
};

const findPlayingNowApi = () => {
  const response = tmdbAxios.get("/trending/all/week").then((res) => res.data);
  return response;
};

const findOnTheAirApi = () => {
  const response = tmdbAxios.get("/tv/on_the_air").then((res) => res.data);
  return response;
};

const findDetailsByIdApi = (id) => {
  const response = tmdbAxios.get(`/movie/${id}`).then((res) => res.data);
  return response;
};

const findCreditsByIdApi = async (id) => {
  const response = tmdbAxios
    .get(`/movie/${id}/credits`)
    .then((res) => res.data);
  return response;
};

const globalSearchApi = (searchQuery, page) => {
  const params = {
    query: searchQuery,
    page,
  };
  const response = tmdbAxios
    .get("/search/multi", { params })
    .then((res) => res.data);
  return response;
};

module.exports = {
  searchByTitleAndPageApi,
  findByGenreAndPageApi,
  findTrailerByTypeAndIdApi,
  findPlayingNowApi,
  findOnTheAirApi,
  findDetailsByIdApi,
  findCreditsByIdApi,
  globalSearchApi,
};
