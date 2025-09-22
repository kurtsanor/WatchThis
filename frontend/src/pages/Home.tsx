import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getPlayingNowMovies } from "../api/movieApi";
import { Skeleton, Title, useMantineTheme } from "@mantine/core";
import MoviesCarousel from "../components/MoviesCarousel";

function Home() {
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const init = async () => {
      try {
        const data = await getPlayingNowMovies();
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
      {isLoading && <Skeleton width="100%" height="92vh"></Skeleton>}
      {!isLoading && (
        <>
          <HeroHeader movie={movies} />
          <main style={{ padding: "3.2rem" }}>
            <div
              style={{
                borderLeft: `solid 5px ${theme.colors.blue[6]}`,
                paddingLeft: "0.5rem",
              }}
            >
              <Title order={2} mb="xl">
                Trending
              </Title>
            </div>

            <MoviesCarousel movie={movies}></MoviesCarousel>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
