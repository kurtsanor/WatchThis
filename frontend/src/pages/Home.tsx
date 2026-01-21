import { useEffect, useState } from "react";
import HeroHeader from "../components/HeroHeader";
import { getOnTheAirTvShows, getPlayingNowMovies } from "../api/movieApi";
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
        const data = await getPlayingNowMovies();
        const shows = await getOnTheAirTvShows();
        setMovies(data);
        setOnTheAirShows(shows);
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
            <div
              style={{
                borderLeft: `solid 5px ${theme.colors.blue[6]}`,
                paddingLeft: "0.5rem",
              }}
            >
              <Text fw={500} fz={"h3"} mb="xs" c="white">
                Trending
              </Text>
            </div>

            <MoviesCarousel movie={movies}></MoviesCarousel>

            <div
              style={{
                borderLeft: `solid 5px ${theme.colors.blue[6]}`,
                paddingLeft: "0.5rem",
              }}
            >
              <Text fw={500} fz={"h3"} mb="xs" mt={"lg"} c="white">
                On The Air
              </Text>
            </div>

            <MoviesCarousel movie={onTheAirShows}></MoviesCarousel>
          </main>
        </>
      )}
    </>
  );
}

export default Home;
