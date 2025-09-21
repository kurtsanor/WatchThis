import { Text, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";

interface MovieDetails {
  movieId: number;
  type: string;
}

function Favorites() {
  const [opened, { open, close }] = useDisclosure(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  const { addToFavorites, removeFromFavorites, isFavorite, favorites } =
    useMovieContext()!;

  const handleOnClick = useCallback(
    (movie: any) => {
      open();
      setMovieDetails({ movieId: movie.id, type: movie.name ? "tv" : "movie" });
    },
    [open]
  );

  return (
    <div>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={movieDetails?.movieId!}
        type={movieDetails?.type!}
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
