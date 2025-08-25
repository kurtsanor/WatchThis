import { IconHeart } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import classes from "../css/ArticleCard.module.css";

function MovieCard({ movie, onClick }: { movie: any; onClick: any }) {
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section onClick={onClick} style={{ cursor: "pointer" }}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${encodeURIComponent(
            movie.backdrop_path
          )}`}
          height={180}
        />
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
          <ActionIcon className={classes.action}>
            <IconHeart size={16} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

export default MovieCard;
