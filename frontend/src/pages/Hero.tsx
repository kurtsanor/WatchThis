import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getPopularMovies } from "../api/movieApi";

function Hero() {
  const [movies, setMovies] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getPopularMovies();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const formattedUrl = `https://image.tmdb.org/t/p/w500/${encodeURIComponent(
    movies?.results[0]?.backdrop_path
  )}`;

  return <HeroHeader imgUrl={formattedUrl} />;
}

export default Hero;
