import { Carousel } from "@mantine/carousel";
import { Button, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import classes from "../css/CardsCarousel.module.css";
import TrailerModal from "./TrailerModal";
import { memo, useState } from "react";

interface CardProps {
  image: any;
}

const Card = memo(function Card({ image }: CardProps) {
  console.log("card render");
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${encodeURIComponent(
          image
        )})`,
      }}
      className={classes.card}
    ></Paper>
  );
});

interface CarouselsProps {
  movie: any;
}

function MoviesCarousel({ movie }: CarouselsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | undefined>(
    undefined
  );

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleClick = async (movieId: number) => {
    open();
    setSelectedMovieId(movieId);
  };

  const slides = movie?.results?.map((item: any) => (
    <Carousel.Slide
      key={item.title}
      onClick={() => handleClick(item.id)}
      className={classes.slides}
    >
      <Card image={item.poster_path} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        slideSize={{ base: "80%", sm: "25%" }}
        slideGap={10}
        emblaOptions={{ align: "start", slidesToScroll: mobile ? 1 : 3 }}
        controlSize={50}
      >
        {slides}
      </Carousel>

      <TrailerModal
        opened={opened}
        close={close}
        movieId={selectedMovieId}
      ></TrailerModal>
    </>
  );
}

export default MoviesCarousel;
