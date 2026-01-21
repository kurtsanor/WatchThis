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
import { Link } from "react-router-dom";
import classes from "../css/Login.module.css";
import { registerUser } from "../api/authService";

export default function SignUp() {
  return (
    <>
      <SignUpHeader />
      <SignUpForm />
    </>
  );
}

function SignUpHeader() {
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

function SignUpForm() {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"xs"}>
        <SimpleGrid cols={2}>
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
        </SimpleGrid>
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
        >
          Sign Up
        </Button>
        <Text size="sm" ta="center" c="dimmed">
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
