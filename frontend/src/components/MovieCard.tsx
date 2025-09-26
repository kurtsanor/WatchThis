import { IconHeart, IconInfoCircle, IconPlayerPlay } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Container,
  Group,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import classes from "../css/ArticleCard.module.css";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: any;
  onClick: (movie: any) => void;
  addToFavorites: (movie: any) => void;
  removeFromFavorites: (movieId: number) => void;
  favorite: boolean;
}

function MovieCard({
  movie,
  onClick,
  addToFavorites,
  removeFromFavorites,
  favorite,
}: MovieCardProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleOnClick = () => {
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const handleMoreInfoOnClick = () => {
    navigate(`/${movie.release_date ? "movies" : "tvshows"}/${movie.id}`);
  };

  console.log("movie card render");

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section
        onClick={() => onClick(movie)}
        style={{ cursor: "pointer" }}
      >
        <Container className={classes.img} p={0}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${encodeURIComponent(
              movie.backdrop_path
            )}`}
            height={180}
            className={classes.image}
          />

          <IconPlayerPlay
            className={classes.playIcon}
            size={40}
          ></IconPlayerPlay>
        </Container>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{
          from: `${theme.colors.blue[4]}`,
          to: `${theme.colors.blue[9]}`,
        }}
      >
        Popular
      </Badge>

      <Group gap={0} mb={"sm"}>
        <Text
          ta={"left"}
          className={classes.title}
          fw={500}
          onClick={() => onClick(movie)}
          style={{ cursor: "pointer" }}
        >
          {movie.title || movie.name}
        </Text>
        <Text ta={"left"} fz="sm" c="dimmed" lineClamp={4}>
          {movie.overview}
        </Text>
      </Group>

      <Group justify="space-between" className={classes.footer} mt={"auto"}>
        <Center>
          <Text fz="sm" inline fw={"bold"}>
            {movie.release_date || movie.first_air_date}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <Tooltip label="More Info" color="gray" withArrow>
            <ActionIcon
              className={classes.action}
              onClick={handleMoreInfoOnClick}
            >
              <IconInfoCircle size={20} color={theme.colors.gray[5]} />
            </ActionIcon>
          </Tooltip>

          <Tooltip
            label={favorite ? "Unfavorite" : "Favorite"}
            color="gray"
            withArrow
          >
            <ActionIcon className={classes.action} onClick={handleOnClick}>
              <IconHeart
                size={16}
                color={theme.colors.red[6]}
                fill={favorite ? theme.colors.red[6] : "none"}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
}

export default memo(MovieCard);
