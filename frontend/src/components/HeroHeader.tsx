import { Button, Container, Overlay, Space, Text, Title } from "@mantine/core";
import classes from "../css/HeroContentLeft.module.css";
import { IconPlayerPlay } from "@tabler/icons-react";
import TrailerModal from "./TrailerModal";
import { useDisclosure } from "@mantine/hooks";
import { memo, useCallback, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import HeroMovie from "./HeroMovie";
import Autoplay from "embla-carousel-autoplay";

interface props {
  movie: any;
}

interface MovieDetails {
  id: number;
  type: string;
}

function HeroHeader({ movie }: props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const autoplay = useRef(Autoplay({ delay: 6000 }));

  const handleClick = useCallback(
    (movie: any) => {
      open();
      setMovieDetails({ id: movie.id, type: movie.media_type });
    },
    [open],
  );

  const slides = movie?.results?.slice(0, 4).map((movie: any) => (
    <Carousel.Slide key={movie.id}>
      <HeroMovie movie={movie} handleClick={handleClick}></HeroMovie>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        withIndicators
        withControls={false}
        emblaOptions={{ loop: true }}
        plugins={[autoplay.current]}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      >
        {slides}
      </Carousel>

      <TrailerModal
        opened={opened}
        close={close}
        movieId={movieDetails?.id!}
        type={movieDetails?.type!}
      ></TrailerModal>
    </>
  );
}

export default memo(HeroHeader);
