import { Button, Group, Rating, Stack, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { createReview, updateReview } from "../../api/reviewService";
import type { Review, UpdateReviewRequest } from "../../types/review";

const ReviewModal = ({
  id,
  context,
  innerProps,
}: ContextModalProps<{
  mediaId: number;
  addToList: (review: Review) => void;
  updateList: (review: Review) => void;
  userReview: Review;
}>) => {
  const { user } = useContext(AuthContext);

  const isEditMode = Boolean(innerProps.userReview);

  const form = useForm({
    initialValues: {
      mediaId: innerProps?.mediaId || innerProps.userReview.mediaId,
      userId: user?._id,
      rating: innerProps?.userReview?.rating || 0,
      reviewText: innerProps?.userReview?.reviewText || "",
    },
    validate: {
      rating: (val) =>
        val > 0
          ? null
          : notifications.show({
              title: "Oops",
              message: "Rating is required",
              color: "red",
              icon: <IconX />,
              position: "top-center",
              withBorder: true,
            }),
      reviewText: (val) => (val ? null : "Review is required"),
    },
  });

  const submitReview = async () => {
    try {
      const updateReviewRequest: UpdateReviewRequest = {
        _id: innerProps?.userReview?._id,
        rating: form.values.rating,
        reviewText: form.values.reviewText,
      };

      const response = isEditMode
        ? await updateReview(updateReviewRequest)
        : await createReview(form.values);

      notifications.show({
        title: "Thanks for sharing!",
        message: `Your review has been ${isEditMode ? "updated" : "posted"}`,
        color: "teal",
        icon: <IconCheck />,
        position: "top-center",
        withBorder: true,
      });
      context.closeModal(id);
      if (isEditMode) {
        innerProps.updateList(response?.data);
      } else {
        const createdReview = {
          ...response.data,
          userId: {
            _id: response.data.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
          },
        };
        innerProps.addToList(createdReview);
        console.log("created: ", createdReview);
      }

      console.log(response.data);
    } catch (error: any) {
      notifications.show({
        title: "Oops",
        message: error.response.data.message,
        color: "red",
        icon: <IconX />,
        position: "top-center",
        withBorder: true,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(submitReview)}>
      <Stack>
        <Stack align="center">
          <Text fz={"h4"} ta={"center"}>
            Choose your rating
          </Text>
          <Rating
            size={"xl"}
            readOnly={form.submitting}
            {...form.getInputProps("rating")}
          />
        </Stack>
        <Textarea
          minRows={3}
          autosize
          radius={"md"}
          placeholder="Write your review here"
          {...form.getInputProps("reviewText")}
          disabled={form.submitting}
        />
        <Group justify="flex-end">
          <Button
            radius={"md"}
            fw={400}
            variant="default"
            onClick={() => context.closeModal(id)}
            disabled={form.submitting}
          >
            Cancel
          </Button>
          <Button
            radius={"md"}
            fw={400}
            type="submit"
            loading={form.submitting}
          >
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ReviewModal;
