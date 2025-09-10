import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getPlayingNowMovies } from "../api/movieApi";

function Hero() {
  const [movies, setMovies] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getPlayingNowMovies();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  return <HeroHeader movie={movies} />;
}

export default Hero;
