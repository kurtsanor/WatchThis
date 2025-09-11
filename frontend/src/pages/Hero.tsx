import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getPlayingNowMovies } from "../api/movieApi";
import { Title } from "@mantine/core";
import MoviesCarousel from "../components/MoviesCarousel";

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

  return (
    <>
      <HeroHeader movie={movies} />
      <main style={{ padding: "2rem" }}>
        <Title order={2} mb="xl" mt="xl">
          Top Rated
        </Title>
        <MoviesCarousel movie={movies}></MoviesCarousel>
      </main>
    </>
  );
}

export default Hero;
