import { Center, Pagination, SimpleGrid, Text } from "@mantine/core";
import MovieCard from "../components/MovieCard";
import TrailerModal from "../components/TrailerModal";
import { useDisclosure } from "@mantine/hooks";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useCallback, useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { useSearchParams } from "react-router-dom";
import { globalSearch } from "../api/movieApi";

interface MovieDetails {
  id: number;
  type: string;
}

const SearchResults = () => {
  const [contents, setContents] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [opened, { open, close }] = useDisclosure(false);

  const currentPage = searchParams.get("page") || 1;
  const searched = searchParams.get("query");

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext)!;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    globalSearch(searched, currentPage)
      .then((res) => {
        console.log(res);
        setContents(res);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, searched]);

  const handleOnClick = useCallback(
    (movie: any) => {
      open();
      setMovieDetails({ id: movie.id, type: movie.media_type });
    },
    [open],
  );

  const handleOnChange = async (page: number) => {
    setSearchParams({
      ...(searched ? { query: searched } : {}),
      page: page.toString(),
    });
  };

  if (isLoading) {
    return <MovieCardSkeleton />;
  }

  return (
    <>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={movieDetails?.id!}
        type={movieDetails?.type!}
      ></TrailerModal>

      {contents?.results?.length < 1 && (
        <Text fz="h2" ta={"center"}>
          No results found!
        </Text>
      )}

      <Text fz={"h3"} mb={"xl"} c="white">
        Showing {contents?.total_results} results for "{searched}"
      </Text>

      {contents && !isLoading && (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {contents?.results?.map((movie: any) => {
            const favorite = isFavorite(movie.id);
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleOnClick}
                favorite={favorite}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              ></MovieCard>
            );
          })}
        </SimpleGrid>
      )}

      {contents?.total_pages > 1 && (
        <Center mt={"xl"}>
          <Pagination
            disabled={isLoading}
            total={Math.min(contents.total_pages, 500)}
            withControls={false}
            value={
              typeof currentPage !== "number"
                ? parseInt(currentPage)
                : currentPage
            }
            onChange={(val) => handleOnChange(val)}
          ></Pagination>
        </Center>
      )}
    </>
  );
};

export default SearchResults;
