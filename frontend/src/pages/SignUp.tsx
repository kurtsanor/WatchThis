import {
  useMantineTheme,
  Group,
  Center,
  Stack,
  Text,
  Anchor,
  Button,
  PasswordInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import classes from "../css/Login.module.css";
import { registerUser } from "../api/authService";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function SignUp() {
  return (
    <>
      <SignUpHeader />
      <SignUpForm />
    </>
  );
}

function SignUpHeader() {
  return (
    <Stack align="center" gap={0} mb="xl">
      <Group justify="center" gap={12} mb={5}>
        <img
          src="/wtLogo.png"
          height="60px"
          width="60px"
          alt="WatchThis Logo"
          style={{ objectFit: "contain" }}
        />
        <Text
          c="white"
          fw={700}
          size="32px"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          WatchThis
        </Text>
      </Group>

      <Text
        c="dimmed"
        size="sm"
        fw={400}
        ta="center"
        style={{ fontFamily: "Inter, sans-serif", opacity: 0.8 }}
      >
        Enjoy the world of entertainment
      </Text>
    </Stack>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: {
      firstName: (val) => (val ? null : "First name is required"),
      lastName: (val) => (val.length <= 0 ? "Last name is required" : null),
      email: (val) => (val ? null : "Email is required"),
      password: (val) => (val.length <= 0 ? "Password is required" : null),
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await registerUser(form.values);
      console.log(response);
      notifications.show({
        title: "Success",
        message: response.message,
        color: "teal",
        icon: <IconCheck />,
        position: "top-center",
        withBorder: true,
      });
      navigate("/login");
    } catch (error: any) {
      notifications.show({
        title: "Oops",
        message: error.message,
        color: "red",
        icon: <IconX />,
        position: "top-center",
        withBorder: true,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"xs"}>
        <TextInput
          radius="md"
          label="First Name"
          placeholder="eg., John"
          withAsterisk
          {...form.getInputProps("firstName")}
          disabled={form.submitting}
        />
        <TextInput
          radius="md"
          label="Last Name"
          placeholder="eg., Doe"
          withAsterisk
          {...form.getInputProps("lastName")}
          disabled={form.submitting}
        />

        <TextInput
          radius="md"
          label="Email Address"
          placeholder="eg., example@gmail.com"
          withAsterisk
          {...form.getInputProps("email")}
          disabled={form.submitting}
        />
        <PasswordInput
          radius="md"
          label="Password"
          placeholder="**********"
          withAsterisk
          {...form.getInputProps("password")}
          disabled={form.submitting}
        />
        <Button
          fw={400}
          loading={form.submitting}
          type="submit"
          radius="md"
          mt="xs"
          mb={"sm"}
        >
          Sign Up
        </Button>
        <Text size="sm" ta="center">
          Already have an account?{" "}
          <Anchor
            component={Link}
            to="/login"
            className={classes.link}
            td="underline"
          >
            Log In
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
}
