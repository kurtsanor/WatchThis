import MovieCard from "../components/MovieCard";
import {
  Button,
  Center,
  Container,
  Group,
  Pagination,
  SegmentedControl,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import TrailerModal from "../components/TrailerModal";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { IconSearch } from "@tabler/icons-react";
import { genreMap, genres } from "../constants/Genre";
import { findByGenreAndPage, searchByTitleAndPage } from "../api/tvApi";

interface tvShowDetails {
  id: number;
  type: string;
}

const type = "tv";

function TvShows() {
  const [tvShows, setTvShows] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [tvShowDetails, setTvShowDetails] = useState<tvShowDetails>();
  const [genreId, setGenreId] = useState<number | null>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const searched = searchParams.get("search");
  const currentPage = searchParams.get("page") || 1;

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useContext(FavoritesContext)!;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const init = async () => {
      try {
        const data = searched
          ? await searchByTitleAndPage(searched, currentPage)
          : await findByGenreAndPage(genreId, currentPage);
        setTvShows(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [searched, currentPage, genreId]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchInput.current?.value.trim() || e.key !== "Enter") return;
    setSearchParams({ search: searchInput.current?.value });
  };

  const handleOnClick = useCallback(
    (movie: any) => {
      open();
      setTvShowDetails({ id: movie.id, type: type });
    },
    [open],
  );

  const handleOnChange = async (page: number) => {
    setSearchParams({
      ...(searched ? { search: searched } : {}),
      page: page.toString(),
    });
  };

  const handleGenreChange = (genre: string) => {
    const id = genreMap[genre as keyof typeof genreMap];
    setGenreId(id);
  };

  return (
    <>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={tvShowDetails?.id!}
        type={tvShowDetails?.type!}
      ></TrailerModal>

      <SegmentedControl
        fullWidth
        data={genres}
        mb="1rem"
        color="blue"
        onChange={handleGenreChange}
      ></SegmentedControl>

      {tvShows?.results.length < 1 && (
        <Text fz="h2" ta={"center"}>
          No results found!
        </Text>
      )}
      {isLoading && <MovieCardSkeleton></MovieCardSkeleton>}
      {tvShows && !isLoading && (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {tvShows.results.map((movie: any) => {
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
      {tvShows?.total_pages > 1 && (
        <Center mt={"xl"}>
          <Pagination
            total={Math.min(tvShows.total_pages, 500)}
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
export default TvShows;
