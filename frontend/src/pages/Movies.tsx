import MovieCard from "../components/MovieCard";
import {
  Button,
  Center,
  Group,
  Pagination,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useSearchParams } from "react-router-dom";
import {
  getPopularMoviesByPage,
  searchMoviesByNameAndPage,
} from "../api/movieApi";
import { useDisclosure } from "@mantine/hooks";
import TrailerModal from "../components/TrailerModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function Movies() {
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>(
    undefined
  );

  const searchInput = useRef<HTMLInputElement>(null);
  const searched = searchParams.get("search");
  const currentPage = searchParams.get("page") || 1;

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useMovieContext()!;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const init = async () => {
      try {
        const data = searched
          ? await searchMoviesByNameAndPage(searched, currentPage)
          : await getPopularMoviesByPage(currentPage);
        setMovies(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [searched, currentPage]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!searchInput.current?.value.trim()) return;
    setSearchParams({ search: searchInput.current?.value });
  };

  const handleOnClick = useCallback(
    (id: number) => {
      open();
      setSelectedMovieId(id);
    },
    [open]
  );

  const handleOnChange = async (page: number) => {
    setSearchParams({
      ...(searched ? { search: searched } : {}),
      page: page.toString(),
    });
  };

  return (
    <>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={selectedMovieId!}
      ></TrailerModal>

      <form onSubmit={handleSearch}>
        <Group justify="center" mb={"2rem"}>
          <TextInput
            placeholder="Search movie name.."
            ref={searchInput}
            required
          ></TextInput>
          <Button type="submit">Search</Button>
        </Group>
      </form>
      {movies?.results.length < 1 && (
        <Text fz="h2" ta={"center"}>
          No results found!
        </Text>
      )}
      {isLoading && <MovieCardSkeleton></MovieCardSkeleton>}
      {movies && !isLoading && (
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {movies.results.map((movie: any) => {
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
      {movies?.total_pages > 1 && (
        <Center mt={"xl"}>
          <Pagination
            total={Math.min(movies.total_pages, 500)}
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
}
export default Movies;
