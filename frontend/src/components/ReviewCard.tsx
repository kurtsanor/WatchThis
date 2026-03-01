import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import type { Review } from "../types/review";
import {
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import classes from "../css/ReviewCard.module.css";

interface ReviewCardProps {
  review: Review;
  onEditClick: () => Promise<void>;
  onDeleteClick: () => Promise<void>;
  isEditable: boolean;
}

const ReviewCard = ({
  review,
  onEditClick,
  onDeleteClick,
  isEditable,
}: ReviewCardProps) => {
  console.log(review);

  return (
    <Stack gap={5} pos={"relative"}>
      <Group>
        <Avatar
          size={30}
          src={review.userId.avatar}
          name={`${review.userId.firstName} ${review.userId.lastName}`}
        />
        <Stack gap={0}>
          <Text size="sm">{`${review.userId.firstName} ${review.userId.lastName}`}</Text>
          <Text size="xs" c="dimmed">
            {review.userId.email}
          </Text>
        </Stack>
      </Group>
      <Rating size={"md"} readOnly value={review.rating} />
      <Text>{review.reviewText}</Text>
      {isEditable && (
        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon
              className={classes.iconDots}
              radius={"lg"}
              variant="default"
            >
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEdit />} onClick={onEditClick}>
              Edit
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash />}
              onClick={onDeleteClick}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Stack>
  );
};

export default ReviewCard;
