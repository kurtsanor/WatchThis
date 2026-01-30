import {
  useMantineTheme,
  Group,
  Center,
  Stack,
  Text,
  Anchor,
  Button,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconShieldCheckeredFilled, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import classes from "../css/Login.module.css";
import { login } from "../api/authService";
import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  return (
    <>
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </>
  );
}

function LoginHeader() {
  const theme = useMantineTheme();

  return (
    <>
      <Group justify="center" gap={10}>
        <Center>
          <img src="/wtLogo.png" height={"100px"} width={"100px"}></img>
        </Center>
      </Group>
      <Text c="white" size="md" fw={400} ta={"center"} mb="xl">
        Enjoy the world of entertainment
      </Text>
    </>
  );
}
function LoginForm() {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (val ? null : "Email is required"),
      password: (val) => (val.length <= 0 ? "Password is required" : null),
    },
  });

  const handleLogin = async () => {
    try {
      const response = await login(form.values);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      navigate("/");
    } catch (error: any) {
      notifications.show({
        title: "Authentication Failed",
        message: error.response.data.message,
        color: "white",
        icon: <IconX color="black" />,
        position: "top-center",
        withBorder: true,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      <Stack gap="xs">
        <TextInput
          radius="md"
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps("email")}
          disabled={form.submitting}
        />

        <PasswordInput
          radius="md"
          label="Password"
          placeholder="*******"
          {...form.getInputProps("password")}
          disabled={form.submitting}
        />
      </Stack>

      <Group grow mt="md" mb="md">
        <Button fw={400} loading={form.submitting} type="submit" radius="md">
          Log In
        </Button>
      </Group>
      <Text size="sm" ta="center" mb="md" c="dimmed">
        Dont have an account?{" "}
        <Anchor
          component={Link}
          to="/signup"
          td="underline"
          className={classes.link}
        >
          Sign up
        </Anchor>
      </Text>
    </form>
  );
}
function LoginFooter() {
  return (
    <Stack gap={0}>
      <Text size="xs" ta="center" c="dimmed">
        By logging in, you agree to our{" "}
        <Anchor td="underline" c="dimmed">
          Terms of Use
        </Anchor>
      </Text>
      <Text size="xs" mb="xs" ta="center" c="dimmed">
        and acknowledge that you have read our{" "}
        <Anchor td="underline" c="dimmed">
          Privacy Policy
        </Anchor>
        .
      </Text>
      <Text size="xs" ta="center" c="dimmed" mb="xs" mt="md">
        2026 © WatchThis. All Rights Reserved.
      </Text>
    </Stack>
  );
}
