import { Box, Flex, Skeleton } from "@mantine/core";

function MovieDetailsSkeletion() {
  return (
    <>
      <Flex direction="row">
        <Skeleton h="80vh" w="30vw" radius="md" mr="3rem" />
        <Box>
          <Skeleton h="5vh" w="50vw" radius="xl" mb="lg" />
          <Skeleton h="3vh" w="15vw" radius="xl" mb="xl" />
          <Skeleton h="4vh" w="10vw" radius="xl" mb="lg" />

          <Skeleton h="2vh" w="60vw" radius="xl" mb="sm" />
          <Skeleton h="2vh" w="60vw" radius="xl" mb="sm" />
          <Skeleton h="2vh" w="60vw" radius="xl" mb="sm" />
          <Skeleton h="2vh" w="60vw" radius="xl" mb="sm" />
          <Skeleton h="2vh" w="60vw" radius="xl" mb="xl" />
          <Skeleton h="2vh" w="15vw" radius="xl" mb="xl" />
          <Skeleton h="3vh" w="7vw" radius="xl" mb="lg" />
          <Flex direction="row" gap="lg">
            <Skeleton h="100px" circle w="100px" radius="xl" />
            <Skeleton h="100px" circle w="100px" radius="xl" />
            <Skeleton h="100px" circle w="100px" radius="xl" />
            <Skeleton h="100px" circle w="100px" radius="xl" />
            <Skeleton h="100px" circle w="100px" radius="xl" />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default MovieDetailsSkeletion;
