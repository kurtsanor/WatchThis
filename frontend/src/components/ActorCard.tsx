import { Avatar, Image, Stack, Text } from "@mantine/core";

interface ActorCardProps {
  profile_path: string;
  name: string;
}

function ActorCard({ profile_path, name }: ActorCardProps) {
  return (
    <Stack align="center" maw={100}>
      <Avatar
        src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
        size={100}
      ></Avatar>
      <Text ta="center" size="xs">
        {name}
      </Text>
    </Stack>
  );
}

export default ActorCard;
