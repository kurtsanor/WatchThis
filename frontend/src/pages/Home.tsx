import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getPlayingNowMovies } from "../api/movieApi";
import { Skeleton, Title } from "@mantine/core";
import MoviesCarousel from "../components/MoviesCarousel";

function Home() {
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const init = async () => {
      try {
        const data = await getPlayingNowMovies();
        console.log(data);
        setMovies(data);
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
      {isLoading && <Skeleton width="100%" height="85vh"></Skeleton>}
      {!isLoading && (
        <>
          <HeroHeader movie={movies} />
          <main style={{ padding: "2rem" }}>
            <Title order={2} mb="xl" mt="xl">
              Top Rated
            </Title>
            <MoviesCarousel movie={movies}></MoviesCarousel>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
