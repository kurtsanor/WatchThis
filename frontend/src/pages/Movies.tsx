import MovieCard from "../components/MovieCard";
import {
  Button,
  Center,
  Container,
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
import { IconSearch } from "@tabler/icons-react";

interface MovieDetails {
  id: number;
  type: string;
}

const type = "movie";

function Movies() {
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchInput.current?.value.trim() || e.key !== "Enter") return;
    setSearchParams({ search: searchInput.current?.value });
  };

  const handleOnClick = useCallback(
    (movie: any) => {
      open();
      setMovieDetails({ id: movie.id, type: type });
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
        movieId={movieDetails?.id!}
        type={movieDetails?.type!}
      ></TrailerModal>

      <Container mb={"2rem"} size="xs" p={0}>
        <TextInput
          placeholder="Enter movie title..."
          ref={searchInput}
          required
          onKeyDown={handleSearch}
          leftSection={<IconSearch></IconSearch>}
        ></TextInput>
      </Container>

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
