const API_KEY = "368c646199ed46c46b08bced54349719";

export async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${encodeURIComponent(
    API_KEY
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPopularMoviesByPage(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${encodeURIComponent(
    API_KEY
  )}&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchMoviesByName(searchQuery) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    searchQuery
  )}&api_key=${encodeURIComponent(API_KEY)}`;

  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchMoviesByNameAndPage(searchQuery, page) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    searchQuery
  )}&api_key=${encodeURIComponent(API_KEY)}&page=${page}`;

  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieTrailerById(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${encodeURIComponent(
    movieId
  )}/videos?api_key=${encodeURIComponent(API_KEY)}&language=en-US`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
