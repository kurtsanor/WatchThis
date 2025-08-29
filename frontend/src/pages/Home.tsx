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
  getMovieTrailerById,
  getPopularMoviesByPage,
  searchMoviesByNameAndPage,
} from "../api/movieApi";
import { useDisclosure } from "@mantine/hooks";
import TrailerModal from "../components/TrailerModal";
import Header from "../components/Header";
import { useCallback, useEffect, useRef, useState } from "react";

function Home() {
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");
  const [opened, { open, close }] = useDisclosure(false);

  const searchInput = useRef<HTMLInputElement>(null);
  const searched = searchParams.get("search");
  const currentPage = searchParams.get("page") || 1;

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
        trailerUrl={trailerUrl}
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
          {movies.results.map((movie: any) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleOnClick(movie.id)}
            ></MovieCard>
          ))}
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
export default Home;
