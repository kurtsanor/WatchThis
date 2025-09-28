import { Loader, Skeleton, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { getTrailerByIdAndType } from "../api/movieApi";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

interface TrailerProps {
  movieId: number | undefined;
  type: string;
}

function MovieTrailer({ movieId, type }: TrailerProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getTrailerByIdAndType(movieId, type);
        const trailer = data.results.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        let url;
        if (trailer) {
          url = `https://www.youtube.com/watch?v=${trailer.key}&modestbranding=1&rel=0`;
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

  useEffect(() => {
    // Only initialize if trailerUrl exists AND videoRef.current is not null
    if (trailerUrl && videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        techOrder: ["youtube"],
        sources: [{ type: "video/youtube", src: trailerUrl }],
        controls: true,
        fluid: true,
        autoplay: true,
      });
    }

    // Dispose player on unmount
    // return () => {
    //   if (playerRef.current) {
    //     playerRef.current.dispose();
    //     playerRef.current = null;
    //   }
    // };
  }, [trailerUrl]);

  return (
    <>
      {isLoading && <Skeleton style={{ height: "78vh" }}></Skeleton>}
      {!trailerUrl && !isLoading && (
        <Text ta={"center"}>Trailer unavailable</Text>
      )}
      {trailerUrl && !isLoading && (
        <video
          id="my-video"
          className="video-js vjs-theme-custom"
          controls
          width="640"
          height="360"
          ref={videoRef}
        ></video>
      )}
    </>
  );
}

export default MovieTrailer;
