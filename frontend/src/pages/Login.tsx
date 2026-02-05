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
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          WatchThis
        </Text>
      </Group>

      <Text c="dimmed" size="sm" fw={400} ta="center">
        Enjoy the world of entertainment
      </Text>
    </Stack>
  );
}

function LoginForm() {
  const { setToken } = useContext(AuthContext);

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
      localStorage.setItem("token", response.token);
      setToken(response.token);
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
      <Text size="sm" ta="center" mb="md">
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
      <Text size="xs" ta="center">
        By logging in, you agree to our{" "}
        <Anchor td="underline">Terms of Use</Anchor>
      </Text>
      <Text size="xs" mb="xs" ta="center">
        and acknowledge that you have read our{" "}
        <Anchor td="underline">Privacy Policy</Anchor>.
      </Text>
      <Text size="xs" ta="center" mb="xs" mt="md">
        2026 © WatchThis. All Rights Reserved.
      </Text>
    </Stack>
  );
}
