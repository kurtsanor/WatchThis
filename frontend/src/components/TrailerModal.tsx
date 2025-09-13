import { FocusTrap, Modal, TextInput } from "@mantine/core";
import MovieTrailer from "./MovieTrailer";
import { memo } from "react";
import classes from "../css/Modal.module.css";
import { useMediaQuery } from "@mantine/hooks";

interface TrailerModalProps {
  opened: boolean;
  close: () => void;
  movieId: number;
  type: string;
}

function TrailerModal({ opened, close, movieId, type }: TrailerModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Trailer"
        centered
        size={isMobile ? "xl" : "70%"}
      >
        <FocusTrap.InitialFocus></FocusTrap.InitialFocus>
        <MovieTrailer movieId={movieId} type={type}></MovieTrailer>
      </Modal>
    </>
  );
}

export default memo(TrailerModal);
