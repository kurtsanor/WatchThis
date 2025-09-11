import { Text, Title } from "@mantine/core";
import { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";

function Favorites() {
  const { favorites } = useMovieContext()!;
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>(
    undefined
  );

  const handleOnClick = (id: number) => {
    open();
    setSelectedMovieId(id);
  };

  return (
    <div>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={selectedMovieId!}
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
