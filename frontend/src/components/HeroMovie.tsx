import { Button, Container, Overlay, Space, Text, Title } from "@mantine/core";
import classes from "../css/HeroContentLeft.module.css";
import { IconPlayerPlay } from "@tabler/icons-react";
import { memo } from "react";

interface HeroMovieProps {
  movie: any;
  handleClick: (movie: any) => void;
}

function HeroMovie({ movie, handleClick }: HeroMovieProps) {
  return (
    <div
      className={classes.hero}
      style={{
        backgroundImage:
          movie &&
          `url(https://image.tmdb.org/t/p/original/${encodeURIComponent(
            movie?.backdrop_path
          )})`,
      }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="100%" pl="xl" pr="xl">
        <Title className={classes.title}>
          {movie?.title || movie?.original_name}
        </Title>
        <Text
          className={classes.description}
          size="lg"
          mt="xl"
          lineClamp={4}
          c={"dimmed"}
        >
          {movie?.overview}
        </Text>
        <Button
          size="md"
          radius="md"
          className={classes.control}
          variant="white"
          color="dark"
          onClick={() => handleClick(movie)}
        >
          <IconPlayerPlay size={30} fill={""}></IconPlayerPlay>
          <Space w={"sm"}></Space>
          Watch now
        </Button>
      </Container>
    </div>
  );
}

export default memo(HeroMovie);
