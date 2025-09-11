import { Button, Container, Overlay, Space, Text, Title } from "@mantine/core";
import classes from "../css/HeroContentLeft.module.css";
import { IconPlayerPlay } from "@tabler/icons-react";
import TrailerModal from "./TrailerModal";
import { useDisclosure } from "@mantine/hooks";

interface props {
  movie: any;
}

function HeroHeader({ movie }: props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className={classes.hero}
        style={{
          backgroundImage:
            movie &&
            `url(https://image.tmdb.org/t/p/original/${encodeURIComponent(
              movie?.results[0]?.backdrop_path
            )})`,
        }}
      >
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="100%" pl="xl" pr="xl">
          <Title className={classes.title}>{movie?.results[0].title}</Title>
          <Text className={classes.description} size="lg" mt="xl" lineClamp={4}>
            {movie?.results[0]?.overview}
          </Text>
          <Button
            size="lg"
            radius="md"
            className={classes.control}
            variant="white"
            color="dark"
            onClick={open}
          >
            <IconPlayerPlay size={30} fill={""}></IconPlayerPlay>
            <Space w={"sm"}></Space>
            Watch now
          </Button>
        </Container>
      </div>
      <TrailerModal
        opened={opened}
        close={close}
        movieId={movie?.results[0]?.id}
      ></TrailerModal>
    </>
  );
}

export default HeroHeader;
