import { Modal } from "@mantine/core";
import MovieTrailer from "./MovieTrailer";

function TrailerModal({
  opened,
  close,
  movieId,
}: {
  opened: any;
  close: any;
  movieId: number;
}) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Trailer"
        centered
        size={"xl"}
      >
        <MovieTrailer movieId={movieId}></MovieTrailer>
      </Modal>
    </>
  );
}
export default TrailerModal;
