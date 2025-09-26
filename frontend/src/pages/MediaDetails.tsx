import {
  Box,
  Flex,
  Group,
  Image,
  rem,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import ActorCard from "../components/ActorCard";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { getMovieCreditsById, getMovieDetailsById } from "../api/movieApi";
import {
  formatDecimal,
  formatRuntime,
  getYear,
} from "../utilities/TimeFormatter";
import MovieDetailsSkeletion from "../components/MovieDetailsSkeleton";
import { getShowCreditsById, getShowDetailsById } from "../api/tvApi";
import { IconStarFilled } from "@tabler/icons-react";

interface MediaDetailsProps {
  mediaType: string;
}

function MediaDetails({ mediaType }: MediaDetailsProps) {
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [media, setMedia] = useState<any>(null);
  const [cast, setCast] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data =
          mediaType === "movies"
            ? await getMovieDetailsById(id)
            : await getShowDetailsById(id);
        const castData =
          mediaType === "movies"
            ? await getMovieCreditsById(id)
            : await getShowCreditsById(id);
        setMedia(data);
        setCast(castData.cast.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const genres = (
    <Text>
      {media?.genres?.map((genre: { name: string }) => genre.name).join(" | ")}
    </Text>
  );

  const actors = cast?.map((cast: any) => (
    <Carousel.Slide key={cast.cast_id || cast.id}>
      <ActorCard profile_path={cast.profile_path} name={cast.name}></ActorCard>
    </Carousel.Slide>
  ));

  return (
    <>
      {!media ||
        (!cast && (
          <Text ta="center">
            Oops! We couldn't find that movie or TV show. Try finding another
            one.
          </Text>
        ))}
      {isLoading && <MovieDetailsSkeletion />}
      {!isLoading && media && cast && (
        <Flex direction={isMobile ? "column" : "row"}>
          <Image
            radius="md"
            src={
              media &&
              `https://image.tmdb.org/t/p/original/${media.backdrop_path}`
            }
            w={isMobile ? "100%" : "30vw"}
            h="80vh"
            mr="3rem"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskImage:
                "linear-gradient(to bottom, black 97%, transparent 100%)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></Image>
          <Box miw={0}>
            <Flex justify="space-between">
              <Title order={1} mb="xs">
                {media?.title || media?.name}
              </Title>

              <Tooltip label="Rating" position="bottom" color="gray">
                <Group>
                  <Text fz={"h2"}>{formatDecimal(media.vote_average)}</Text>
                  <IconStarFilled size={30} color="yellow"></IconStarFilled>
                </Group>
              </Tooltip>
            </Flex>

            <Text mb="xl" c="dimmed">
              {getYear(media.release_date || media.first_air_date)} |{" "}
              {formatRuntime(media.runtime) ||
                media.number_of_seasons + " Seasons"}{" "}
              | 16+
            </Text>
            <Title order={3} mb="md">
              Overview
            </Title>
            <Text mb="lg">{media?.overview}</Text>
            <Group mb="xl">
              <Text c="dimmed">Genre</Text>
              {genres}
            </Group>
            <Title order={4} mb="sm" fw="normal">
              Starring
            </Title>
            <Carousel
              slideSize={{ base: "25%", sm: "15%" }}
              slideGap={15}
              emblaOptions={{ align: "start", slidesToScroll: 3 }}
            >
              {actors}
            </Carousel>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default MediaDetails;
