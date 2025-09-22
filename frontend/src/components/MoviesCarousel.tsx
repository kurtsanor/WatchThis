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

interface MovieDetails {
  movieId: number;
  type: string;
}

function MoviesCarousel({ movie }: CarouselsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const handleClick = async (movie: any) => {
    open();
    setMovieDetails({ movieId: movie.id, type: movie.name ? "tv" : "movie" });
  };

  const slides = movie?.results?.map((item: any) => (
    <Carousel.Slide
      key={item.id}
      onClick={() => handleClick(item)}
      className={classes.slides}
    >
      <Card image={item.poster_path} />
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        slideSize={{ base: "70%", sm: "20%" }}
        slideGap={10}
        emblaOptions={{ align: "start", slidesToScroll: mobile ? 1 : 3 }}
        controlSize={50}
      >
        {slides}
      </Carousel>

      <TrailerModal
        opened={opened}
        close={close}
        movieId={movieDetails?.movieId!}
        type={movieDetails?.type!}
      ></TrailerModal>
    </>
  );
}

export default MoviesCarousel;
