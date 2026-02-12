import {
  Box,
  Button,
  Container,
  Group,
  Overlay,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import classes from "../css/HeroContentLeft.module.css";
import {
  IconInfoCircle,
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconStarFilled,
} from "@tabler/icons-react";
import { memo } from "react";
import {
  formatDecimal,
  formatRuntime,
  getYear,
} from "../utilities/TimeFormatter";
import { genreById } from "../constants/Genre";
import { useNavigate } from "react-router-dom";

interface HeroMovieProps {
  movie: any;
  handleClick: (movie: any) => void;
}

function HeroMovie({ movie, handleClick }: HeroMovieProps) {
  const themes = useMantineTheme();
  const navigate = useNavigate();

  const genres = (
    <Text>
      {movie?.genre_ids
        ?.map((genreId: number) => genreById[genreId])
        .join(" | ")}
    </Text>
  );

  const handleMoreInfoOnClick = () => {
    navigate(`/${movie.release_date ? "movies" : "tvshows"}/${movie.id}`);
  };

  return (
    <div
      className={classes.hero}
      style={{
        backgroundImage:
          movie &&
          `url(https://image.tmdb.org/t/p/original/${encodeURIComponent(
            movie?.backdrop_path,
          )})`,
      }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={0.4}
        zIndex={0}
      />
      <Box className={classes.container}>
        <Text className={classes.title} mb="sm">
          {movie?.title || movie?.original_name}
        </Text>
        <Group>
          <IconStarFilled color={themes.colors.yellow[6]} size={25} />
          <Text>{formatDecimal(movie.vote_average)}</Text>
          <Text>{getYear(movie.release_date || movie.first_air_date)} </Text>
          {genres}
        </Group>
        <Text className={classes.description} mt="xl" lineClamp={4} c={"gray"}>
          {movie?.overview}
        </Text>
        <Group mt={"xl"}>
          <Button
            variant="white"
            c={"black"}
            radius="md"
            onClick={() => handleClick(movie)}
            leftSection={<IconPlayerPlayFilled />}
            fw={500}
          >
            Watch
          </Button>
          <Button
            radius={"md"}
            variant="default"
            fw={500}
            leftSection={<IconInfoCircle />}
            onClick={handleMoreInfoOnClick}
          >
            More Info
          </Button>
        </Group>
      </Box>
    </div>
  );
}

export default memo(HeroMovie);
