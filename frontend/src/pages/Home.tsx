import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { findOnTheAir, findPlayingNow } from "../api/movieApi";
import { Skeleton, Title, useMantineTheme, Text } from "@mantine/core";
import MoviesCarousel from "../components/MoviesCarousel";

function Home() {
  const [movies, setMovies] = useState<any>(null);
  const [onTheAirShows, setOnTheAirShows] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const init = async () => {
      try {
        const data = await findPlayingNow();
        const shows = await findOnTheAir();
        setMovies(data.data);
        setOnTheAirShows(shows.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  return (
    <>
      {isLoading && <Skeleton width="100%" height="92vh"></Skeleton>}
      {!isLoading && (
        <>
          <HeroHeader movie={movies} />
          <main style={{ padding: "3.2rem", paddingTop: "1rem" }}>
            <Text fw={500} fz={"h3"} mb="xs" c="white">
              Trending
            </Text>

            <MoviesCarousel movie={movies}></MoviesCarousel>

            <Text fw={500} fz={"h3"} mb="xs" mt={"lg"} c="white">
              On The Air
            </Text>

            <MoviesCarousel movie={onTheAirShows}></MoviesCarousel>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
