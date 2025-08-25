import { Modal } from "@mantine/core";
import MovieTrailer from "./MovieTrailer";

function TrailerModal({
  opened,
  close,
  trailerUrl,
}: {
  opened: any;
  close: any;
  trailerUrl: any;
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
        <MovieTrailer trailerUrl={trailerUrl}></MovieTrailer>
      </Modal>
    </>
  );
}
export default TrailerModal;
