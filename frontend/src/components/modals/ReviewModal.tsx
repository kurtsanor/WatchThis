import { Button, Group, Rating, Stack, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { createReview } from "../../api/reviewService";
import type { Review } from "../../types/review";

const ReviewModal = ({
  id,
  context,
  innerProps,
}: ContextModalProps<{
  mediaId: number;
  addToList: (review: Review) => void;
}>) => {
  const { user } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      mediaId: innerProps?.mediaId,
      userId: user?._id,
      rating: 0,
      reviewText: "",
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
      const response = await createReview(form.values);
      notifications.show({
        title: "Success",
        message: "Your review has been posted",
        color: "teal",
        icon: <IconCheck />,
        position: "top-center",
        withBorder: true,
      });
      context.closeModal(id);
      const createdReview = {
        ...response.data,
        userId: {
          ...response.data.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
      console.log(createdReview);

      innerProps.addToList(createdReview);
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
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ReviewModal;
