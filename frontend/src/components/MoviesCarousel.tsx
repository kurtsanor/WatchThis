import { Carousel } from "@mantine/carousel";
import { Button, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../css/CardsCarousel.module.css";

interface CardProps {
  image: any;
}

function Card({ image }: CardProps) {
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
}

interface CarouselsProps {
  movie: any;
}

function MoviesCarousel({ movie }: CarouselsProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = movie?.results?.map((item: any) => (
    <Carousel.Slide key={item.title}>
      <Card image={item.poster_path} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: "100%", sm: "25%" }}
      slideGap={10}
      emblaOptions={{ align: "start", slidesToScroll: mobile ? 1 : 3 }}
      controlSize={50}
    >
      {slides}
    </Carousel>
  );
}

export default MoviesCarousel;
