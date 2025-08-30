import { Text, Title } from "@mantine/core";
import { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import { useCallback } from "react";
import { getMovieTrailerById } from "../api/movieApi";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";

function Favorites() {
  const { favorites } = useMovieContext()!;
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");
  const [opened, { open, close }] = useDisclosure(false);

  const handleOnClick = useCallback((id: number) => {
    const fetchData = async () => {
      const data = await getMovieTrailerById(id);
      const trailer = data.results.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      let url;
      if (trailer) {
        url = `https://www.youtube.com/embed/${trailer.key}?rel=0`;
      }
      open();
      setTrailerUrl(url);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TrailerModal
        opened={opened}
        close={close}
        trailerUrl={trailerUrl}
      ></TrailerModal>

      <Title order={3} mb={"xl"}>
        Your Favorites
      </Title>
      {favorites && (
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {favorites.map((movie: any) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleOnClick(movie.id)}
            ></MovieCard>
          ))}
        </SimpleGrid>
      )}
      {favorites.length < 1 && (
        <Text ta={"center"}>You have no favorites.</Text>
      )}
    </div>
  );
}
export default Favorites;
