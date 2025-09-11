import { Text, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";

function Favorites() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>(
    undefined
  );

  const { addToFavorites, removeFromFavorites, isFavorite, favorites } =
    useMovieContext()!;

  const handleOnClick = useCallback(
    (id: number) => {
      open();
      setSelectedMovieId(id);
    },
    [open]
  );

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
          {favorites.map((movie: any) => {
            const favorite = isFavorite(movie.id);
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleOnClick}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                favorite={favorite}
              ></MovieCard>
            );
          })}
        </SimpleGrid>
      )}

      {favorites.length < 1 && (
        <Text ta={"center"}>You have no favorites.</Text>
      )}
    </div>
  );
}
export default Favorites;
