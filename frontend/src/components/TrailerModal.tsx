import { FocusTrap, Modal, TextInput } from "@mantine/core";
import MovieTrailer from "./MovieTrailer";
import { memo } from "react";

function TrailerModal({
  opened,
  close,
  movieId,
}: {
  opened: any;
  close: any;
  movieId: number | undefined;
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
        <FocusTrap.InitialFocus></FocusTrap.InitialFocus>
        <MovieTrailer movieId={movieId}></MovieTrailer>
      </Modal>
    </>
  );
}
export default memo(TrailerModal);
