import {
  Avatar,
  Box,
  Button,
  Divider,
  FileButton,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { updateUserAvatar } from "../api/userService";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const Profile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { user, setUser, isLoading } = useContext(AuthContext);

  const hasToken = localStorage.getItem("token");

  if (!hasToken) {
    navigate("/login");
  }

  useEffect(() => {
    setPreview(user?.avatar);
  }, [user]);

  const handleProfileChange = (file: File | null) => {
    if (!file) return;
    setFile(file);

    if (file.size > 5 * 1024 * 1024) {
      notifications.show({
        title: "File too large",
        message: "Max limit is 5mb",
        color: "white",
        icon: <IconX color="black" />,
        position: "top-center",
        withBorder: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await updateUserAvatar(formData);
      setUser((prev: User) => ({ ...prev, avatar: result.data.avatar }));

      // notify upon successful upload
      notifications.show({
        title: "Upload Successful",
        message: result.message,
        color: "white",
        icon: <IconCheck color="black" />,
        position: "top-center",
        withBorder: true,
      });
    } catch (error: any) {
      notifications.show({
        title: "An error occured",
        message: error.response.data.message,
        color: "white",
        icon: <IconX color="black" />,
        position: "top-center",
        withBorder: true,
      });
    } finally {
      setFile(null);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Box
        h={150}
        style={{
          background:
            "linear-gradient(135deg, #0f2027, #203a43, #2c5364, #00bfff88)",
        }}
      />
      <Stack p={"xl"} gap={0}>
        <Avatar
          src={preview}
          size={150}
          mt={"-120px"}
          mb={"sm"}
          style={{
            border: "3px solid transparent",
            backgroundImage:
              "linear-gradient(#1e1e1e, #1e1e1e), linear-gradient(135deg, #00bfff, #0080ff)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            borderRadius: "50%",
          }}
        />
        <Text c="white" fz={"h2"} fw={500}>
          {`${user?.firstName} ${user?.lastName}`}
        </Text>
        <Text>{user?.email}</Text>
        <Flex justify={"flex-start"} mt="lg" gap={"xs"}>
          <FileButton
            disabled={isSubmitting}
            onChange={handleProfileChange}
            accept="image/png,image/jpeg,image/webp"
          >
            {(props) => (
              <Button
                disabled={isSubmitting}
                {...props}
                variant="default"
                fw={400}
                w={"fit-content"}
                radius={"md"}
              >
                Change Picture
              </Button>
            )}
          </FileButton>
          <Button
            loading={isSubmitting}
            fw={400}
            radius={"md"}
            variant="white"
            disabled={!file}
            onClick={handleSave}
            color="black"
          >
            Save
          </Button>
        </Flex>

        <Divider mt={"lg"} />
      </Stack>
    </>
  );
};

export default Profile;
