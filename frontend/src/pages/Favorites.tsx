import { Text, Title } from "@mantine/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { SimpleGrid } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../contexts/FavoriteContext";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";
import { findAllByUserWithDetails } from "../api/favoriteService";
import { AuthContext } from "../contexts/AuthContext";

interface MovieDetails {
  movieId: number;
  type: string;
}

function Favorites() {
  const [opened, { open, close }] = useDisclosure(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [userFavorites, setUserFavorites] = useState<any[]>([]);

  const { addToFavorites, removeFromFavorites, isFavorite, favorites } =
    useContext(FavoritesContext)!;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    findAllByUserWithDetails(user._id)
      .then((res) => {
        console.log(res.data);

        setUserFavorites(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const customDelete = async (id: number) => {
    await removeFromFavorites(id);
    setUserFavorites((prev) => prev.filter((fav) => fav.id != id));
  };

  const handleOnClick = useCallback(
    (movie: any) => {
      open();
      setMovieDetails({ movieId: movie.id, type: movie.name ? "tv" : "movie" });
    },
    [open],
  );

  return (
    <div>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={movieDetails?.movieId!}
        type={movieDetails?.type!}
      ></TrailerModal>

      <Text fz={"h3"} mb={"xl"} c="white">
        Your Favorites
      </Text>

      {userFavorites && (
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {userFavorites?.map((movie: any) => {
            const favorite = isFavorite(movie.id);
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleOnClick}
                addToFavorites={addToFavorites}
                removeFromFavorites={customDelete}
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
