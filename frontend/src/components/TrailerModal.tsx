import { FocusTrap, Modal, TextInput } from "@mantine/core";
import MovieTrailer from "./MovieTrailer";
import { memo } from "react";

interface TrailerModalProps {
  opened: boolean;
  close: () => void;
  movieId: number;
  type: string;
}

function TrailerModal({ opened, close, movieId, type }: TrailerModalProps) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Trailer"
        centered
        size={"70%"}
      >
        <FocusTrap.InitialFocus></FocusTrap.InitialFocus>
        <MovieTrailer movieId={movieId} type={type}></MovieTrailer>
      </Modal>
    </>
  );
}

export default memo(TrailerModal);
