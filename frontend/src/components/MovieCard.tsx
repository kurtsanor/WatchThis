import {
  IconArrowRight,
  IconHeart,
  IconHeartFilled,
  IconPlayerPlay,
} from "@tabler/icons-react";
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
import { memo, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie, onClick }: { movie: any; onClick: any }) {
  const theme = useMantineTheme();
  const [hovered, setHovered] = useState(false);

  const { addToFavorites, removeFromFavorites, isFavorite } =
    useMovieContext()!;

  const favorite = isFavorite(movie.id);

  const handleOnClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section onClick={onClick} style={{ cursor: "pointer" }}>
        <Container
          className={classes.img}
          p={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${encodeURIComponent(
              movie.backdrop_path
            )}`}
            height={180}
          />
          {hovered && (
            <IconPlayerPlay
              className={classes.playIcon}
              size={40}
            ></IconPlayerPlay>
          )}
        </Container>
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        Popular
      </Badge>

      <Group gap={0} mb={"sm"}>
        <Text
          ta={"left"}
          className={classes.title}
          fw={500}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          {movie.title}
        </Text>
        <Text ta={"left"} fz="sm" c="dimmed" lineClamp={4}>
          {movie.overview}
        </Text>
      </Group>

      <Group justify="space-between" className={classes.footer} mt={"auto"}>
        <Center>
          <Text fz="sm" inline fw={"bold"}>
            {movie.release_date}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
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
