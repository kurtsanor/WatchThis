import { Loader, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getMovieTrailerById } from "../api/movieApi";

function MovieTrailer({ movieId }: { movieId: number }) {
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getMovieTrailerById(movieId);
        const trailer = data.results.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        let url;
        if (trailer) {
          url = `https://www.youtube.com/embed/${trailer.key}?rel=0`;
        }
        setTrailerUrl(url);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Skeleton height={"400px"}></Skeleton>}
      {!trailerUrl && !isLoading && (
        <Text ta={"center"}>Trailer unavailable</Text>
      )}
      {trailerUrl && !isLoading && (
        <iframe
          src={trailerUrl}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width={"100%"}
          height={"400px"}
          style={{ border: "none" }}
        />
      )}
    </>
  );
}

export default MovieTrailer;
