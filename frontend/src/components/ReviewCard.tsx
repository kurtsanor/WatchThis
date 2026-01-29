import { Avatar, Group, Rating, Stack, Text } from "@mantine/core";
import type { Review } from "../types/review";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Stack>
      <Group>
        <Avatar
          size={30}
          name={`${review.userId.firstName} ${review.userId.lastName}`}
        />
        <Stack gap={0}>
          <Text size="sm">{`${review.userId.firstName} ${review.userId.lastName}`}</Text>
          <Text size="xs" c="dimmed">
            {review.userId.email}
          </Text>
        </Stack>
      </Group>
      <Rating size={"md"} readOnly defaultValue={review.rating} />
      <Text>{review.reviewText}</Text>
    </Stack>
  );
};

export default ReviewCard;
