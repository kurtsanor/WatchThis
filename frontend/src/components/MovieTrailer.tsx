import { Loader, Skeleton, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { findTrailerByTypeAndId } from "../api/movieApi";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";
import "../css/CustomPlayer.css";

interface TrailerProps {
  movieId: number | undefined;
  type: string;
}

function MovieTrailer({ movieId, type }: TrailerProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await findTrailerByTypeAndId(type, movieId);
        const trailer = data.data.results.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        let url;
        if (trailer) {
          url = `https://www.youtube.com/embed/${trailer.key}`;
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
        autoplay: false,
        inactivityTimeout: 5000,
        youtube: {
          modestbranding: 1,
          rel: 0,
          vq: "highres",
        },
      });
    }
  }, [trailerUrl]);

  return (
    <>
      {isLoading && <Skeleton style={{ height: "78vh" }}></Skeleton>}
      {!trailerUrl && !isLoading && (
        <Text ta={"center"}>Trailer unavailable</Text>
      )}
      {trailerUrl && !isLoading && (
        <video
          className="video-js vjs-theme-custom"
          controls
          ref={videoRef}
          width={"100%"}
          style={{ border: "none", borderRadius: "0.30rem", height: "77vh" }}
        ></video>
      )}
    </>
  );
}

export default MovieTrailer;
