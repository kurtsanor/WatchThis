import { Button, Container, Overlay, Space, Text, Title } from "@mantine/core";
import classes from "../css/HeroContentLeft.module.css";
import { IconPlayerPlay } from "@tabler/icons-react";
import TrailerModal from "./TrailerModal";
import { useDisclosure } from "@mantine/hooks";
import { memo, useState } from "react";
import { Carousel } from "@mantine/carousel";
import HeroMovie from "./HeroMovie";

interface props {
  movie: any;
}

const randomFeaturedMovie = Math.floor(Math.random() * 4);

function HeroHeader({ movie }: props) {
  const [opened, { open, close }] = useDisclosure(false);

  const slides = movie?.results?.map((movie: any) => (
    <Carousel.Slide key={movie.id}>
      <HeroMovie
        randomFeaturedMovie={randomFeaturedMovie}
        movie={movie}
        open={open}
      ></HeroMovie>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel>{slides}</Carousel>

      <TrailerModal
        opened={opened}
        close={close}
        movieId={movie?.results[randomFeaturedMovie]?.id}
        type={movie?.results[randomFeaturedMovie]?.media_type}
      ></TrailerModal>
    </>
  );
}

export default memo(HeroHeader);
