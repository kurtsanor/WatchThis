const tmdbAxios = require("../utils/axiosInstance");
const movieService = require("../services/movieService");

//  mock axios instance
jest.mock("../utils/axiosInstance");

describe("Movie Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // searchByTitleAndPageApi
  // ===============================
  it("should search movies by title and page", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["movie1"] } });

    const result = await movieService.searchByTitleAndPageApi("batman", 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/search/movie", {
      params: {
        query: "batman",
        page: 1,
      },
    });

    expect(result).toEqual({ results: ["movie1"] });
  });

  // ===============================
  // findByGenreAndPageApi
  // ===============================
  it("should fetch movies by genre with genre filter", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: [] } });

    await movieService.findByGenreAndPageApi(28, 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/discover/movie", {
      params: {
        page: 1,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 28,
      },
    });
  });

  it("should fetch movies without genre filter if genre is 0", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: [] } });

    await movieService.findByGenreAndPageApi(0, 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/discover/movie", {
      params: {
        page: 1,
        language: "en-US",
        sort_by: "popularity.desc",
      },
    });
  });

  // ===============================
  // findTrailerByTypeAndIdApi
  // ===============================
  it("should fetch trailer by type and id", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["trailer"] } });

    const result = await movieService.findTrailerByTypeAndIdApi("movie", 123);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/movie/123/videos");
    expect(result).toEqual({ results: ["trailer"] });
  });

  // ===============================
  // findPlayingNowApi
  // ===============================
  it("should fetch trending content", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["trend"] } });

    const result = await movieService.findPlayingNowApi();

    expect(tmdbAxios.get).toHaveBeenCalledWith("/trending/all/week");
    expect(result).toEqual({ results: ["trend"] });
  });

  // ===============================
  // findOnTheAirApi
  // ===============================
  it("should fetch on-the-air TV shows", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["tv"] } });

    const result = await movieService.findOnTheAirApi();

    expect(tmdbAxios.get).toHaveBeenCalledWith("/tv/on_the_air");
    expect(result).toEqual({ results: ["tv"] });
  });

  // ===============================
  // findDetailsByIdApi
  // ===============================
  it("should fetch movie details by id", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { id: 1 } });

    const result = await movieService.findDetailsByIdApi(1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/movie/1");
    expect(result).toEqual({ id: 1 });
  });

  // ===============================
  // findCreditsByIdApi
  // ===============================
  it("should fetch credits by id", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { cast: [] } });

    const result = await movieService.findCreditsByIdApi(1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/movie/1/credits");
    expect(result).toEqual({ cast: [] });
  });

  // ===============================
  // globalSearchApi
  // ===============================
  it("should perform global search", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["multi"] } });

    const result = await movieService.globalSearchApi("avengers", 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/search/multi", {
      params: {
        query: "avengers",
        page: 1,
      },
    });

    expect(result).toEqual({ results: ["multi"] });
  });

  // ===============================
  // error handling (example)
  // ===============================
  it("should throw error if API fails", async () => {
    tmdbAxios.get.mockRejectedValue(new Error("API error"));

    await expect(movieService.findPlayingNowApi()).rejects.toThrow("API error");
  });
});
