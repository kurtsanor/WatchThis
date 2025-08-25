import { Container, SimpleGrid, Skeleton, Space } from "@mantine/core";

function MovieCardSkeleton() {
  return (
    <SimpleGrid cols={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Container w="100%" key={i} p={0}>
          <Skeleton height={200} />
          <Space h="lg"></Space>
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} mt={6} radius="xl" />
          <Skeleton height={10} mt={6} radius="xl" />
          <Skeleton height={10} mt={6} width="70%" radius="xl" />
          <Space h="lg"></Space>
          <Skeleton height={10} mt={6} width="40%" radius="xl" />
        </Container>
      ))}
    </SimpleGrid>
  );
}

export default MovieCardSkeleton;
