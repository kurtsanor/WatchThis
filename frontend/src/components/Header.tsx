import {
  ActionIcon,
  Anchor,
  Badge,
  Burger,
  Button,
  Center,
  Drawer,
  Group,
  Image,
  Menu,
  Text,
  Modal,
  TextInput,
  Stack,
  Loader,
} from "@mantine/core";
("@mantine/core");
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserButton } from "./UserButton";
import {
  IconLogout,
  IconSearch,
  IconKey,
  IconX,
  IconCheck,
  IconUser,
} from "@tabler/icons-react";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { globalSearch } from "../api/movieApi";
import { notifications } from "@mantine/notifications";
import { setPassword as setPasswordApi } from "../api/authService";

const links = [
  { link: "/", label: "Home" },
  { link: "/movies", label: "Movies" },
  { link: "/tvshows", label: "TV Shows" },
  { link: "/favorites", label: "Favorites" },
];

function Header() {
  const [result, setResult] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [
    passwordModalOpened,
    { open: openPasswordModal, close: closePasswordModal },
  ] = useDisclosure(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoggingOut, setIsLogginOut] = useState(false);

  const [debouncedSearch] = useDebouncedValue(searchQuery, 250);

  const [menuOpened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user, setUser, setToken, isLoading } = useContext(AuthContext);

  const { setFavorites } = useContext(FavoritesContext)!;

  const handleSetPassword = () => {
    openPasswordModal();
  };

  useEffect(() => {
    if (!searchQuery) return;
    globalSearch(searchQuery).then((res) => {
      setResult(res);
    });
  }, [debouncedSearch]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
      onClick={close} // close drawer on mobile after click
    >
      {link.label}
    </Link>
  ));

  const handleLogout = async () => {
    setIsLogginOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.removeItem("token");
    setUser(undefined);
    setToken(null);
    setFavorites([]);
    navigate("/login");
  };

  const submitPassword = async () => {
    if (password !== confirmPassword) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "white",
        icon: <IconX color="black" />,
        position: "top-center",
        withBorder: true,
      });
      return;
    }

    try {
      setLoadingPassword(true);

      const request = {
        currentPassword: currentPassword,
        password: password,
      };

      await setPasswordApi(request);

      notifications.show({
        title: "Success",
        message: "Password has been set",
        color: "white",
        icon: <IconCheck color="black" />,
        position: "top-center",
        withBorder: true,
      });

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      closePasswordModal();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response.data.message,
        color: "white",
        icon: <IconX color="black" />,
        position: "top-center",
        withBorder: true,
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  const searchResult = result?.results.map((item: any) => (
    <Spotlight.Action
      key={item.id}
      onClick={() => {
        navigate(
          `/${item.media_type == "movie" ? "movies" : "tvshows"}/${item.id}`,
        );
      }}
    >
      <Group wrap="nowrap" w="100%">
        <Center>
          <Image
            src={
              item.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                : "https://placehold.co/600x400?text=Placeholder"
            }
            alt={item.original_title}
            w={60}
            h={60}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Center>

        <div style={{ flex: 1 }}>
          <Text>{item.title || item.name}</Text>

          {item.overview && (
            <Text opacity={0.6} size="xs" lineClamp={2}>
              {item.overview}
            </Text>
          )}
        </div>
      </Group>
    </Spotlight.Action>
  ));

  return (
    <header className={classes.header}>
      <Group className={classes.inner}>
        <Group gap={5}>
          <Group gap={10} className={classes.leftGroup}>
            <img src="/wtLogo.png" height={"40px"} width={"40px"} alt="Logo" />
            <Text>
              <Anchor href="/" fw={"bolder"} size="1.5rem" td={"none"}>
                <span style={{ color: "white" }}>Watch</span>This
              </Anchor>
            </Text>
          </Group>
        </Group>

        <Group visibleFrom="md">{items}</Group>

        <Group visibleFrom="md" className={classes.rightGroup}>
          <ActionIcon
            tabIndex={-1}
            variant="transparent"
            size={35}
            onClick={spotlight.open}
          >
            <IconSearch color="white" />
          </ActionIcon>
          {token ? (
            user ? (
              <Menu
                width={250}
                transitionProps={{ transition: "pop-top-right" }}
              >
                <Menu.Target>
                  <UserButton
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    avatar={user.avatar}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item
                    onClick={() => navigate("/profile")}
                    leftSection={<IconUser size={16} stroke={1.5} />}
                  >
                    My Profile
                  </Menu.Item>
                  <Menu.Item
                    onClick={handleSetPassword}
                    leftSection={<IconKey size={16} stroke={1.5} />}
                  >
                    Set Password
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Session</Menu.Label>
                  <Menu.Item
                    closeMenuOnClick={false}
                    onClick={handleLogout}
                    color="red"
                    leftSection={
                      isLoggingOut ? (
                        <Loader size={16} color="red" />
                      ) : (
                        <IconLogout size={16} stroke={1.5} />
                      )
                    }
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              // Token exists but user is still loading/fetching
              <Text size="sm" c="dimmed">
                {isLoading ? "Loading…" : "Loading…"}
              </Text>
            )
          ) : (
            <>
              <Button
                fw={400}
                radius={"md"}
                variant="default"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button fw={400} radius={"md"} onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </>
          )}
        </Group>

        <Burger
          opened={menuOpened}
          onClick={open}
          hiddenFrom="md"
          size="sm"
          className={classes.rightGroup}
        />
      </Group>

      <Drawer position="right" size={"50%"} opened={menuOpened} onClose={close}>
        {items}

        <Group mt="md" grow>
          {token ? (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="default" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
              <Button onClick={() => navigate("/login")}>Sign In</Button>
            </>
          )}
        </Group>
      </Drawer>
      <Spotlight.Root
        returnFocus={false}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onFocus={() => setResult(null)}
        onBlur={() => setResult(null)}
      >
        <Spotlight.Search
          placeholder="Search Movies or TV Shows..."
          leftSection={<IconSearch stroke={1.5} />}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setResult(null);
              navigate(
                `/search?query=${encodeURIComponent(e.currentTarget.value)}`,
              );
              spotlight.close();
            }
          }}
        />
        <Spotlight.ActionsList style={{ maxHeight: 400, overflowY: "auto" }}>
          {searchResult?.length > 0 ? (
            searchResult
          ) : (
            <Spotlight.Empty>Nothing found...</Spotlight.Empty>
          )}
        </Spotlight.ActionsList>
      </Spotlight.Root>

      <Modal
        opened={passwordModalOpened}
        onClose={closePasswordModal}
        title="Set Password"
        centered
      >
        <Stack>
          {user?.hasPassword && (
            <TextInput
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            />
          )}

          <TextInput
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          <TextInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />

          <Button
            loading={loadingPassword}
            leftSection={<IconKey size={16} />}
            onClick={submitPassword}
            fw={400}
          >
            Save Password
          </Button>
        </Stack>
      </Modal>
    </header>
  );
}

export default Header;
