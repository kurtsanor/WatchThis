import {
  IconHeart,
  IconInfoCircle,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
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
import { useNavigate } from "react-router-dom";
import { genreById } from "../constants/Genre";
import { notifications } from "@mantine/notifications";

interface MovieCardProps {
  movie: any;
  onClick: (movie: any) => void;
  addToFavorites: (mediaId: number, mediaType: string) => Promise<void>;
  removeFromFavorites: (movieId: number) => Promise<void>;
  favorite: boolean;
}

function MovieCard({
  movie,
  onClick,
  addToFavorites,
  removeFromFavorites,
  favorite,
}: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      const mediaType = movie.release_date ? "movies" : "tvshows";
      favorite
        ? await removeFromFavorites(movie.id)
        : await addToFavorites(movie.id, mediaType);
    } catch (error: any) {
      notifications.show({
        title: "Oops",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
        position: "top-center",
        withBorder: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoreInfoOnClick = () => {
    navigate(`/${movie.release_date ? "movies" : "tvshows"}/${movie.id}`);
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section
        onClick={() => onClick(movie)}
        style={{ cursor: "pointer" }}
      >
        <Container className={classes.img} p={0}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${encodeURIComponent(
              movie.backdrop_path,
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

      <Badge fw={500} className={classes.rating} variant="gradient">
        {genreById[movie?.genre_ids?.[0] || movie?.genres?.[0]?.id]}
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
          <Text fz="sm" inline c="white">
            {movie.release_date || movie.first_air_date}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <Tooltip label="More Info" color="gray" withArrow>
            <ActionIcon
              className={classes.action}
              onClick={handleMoreInfoOnClick}
            >
              <IconInfoCircle size={20} />
            </ActionIcon>
          </Tooltip>

          <Tooltip
            label={favorite ? "Unfavorite" : "Favorite"}
            color="gray"
            withArrow
          >
            <ActionIcon
              className={classes.action}
              onClick={handleOnClick}
              loading={isLoading}
            >
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
