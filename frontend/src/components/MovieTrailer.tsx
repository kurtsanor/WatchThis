import { Text } from "@mantine/core";

function MovieTrailer({ trailerUrl }: { trailerUrl: string }) {
  return (
    <>
      {!trailerUrl && <Text ta={"center"}>Trailer unavailable</Text>}
      {trailerUrl && (
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
