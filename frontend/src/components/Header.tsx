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
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserButton } from "./UserButton";
import { IconLogout, IconSearch } from "@tabler/icons-react";
import { FavoritesContext } from "../contexts/FavoriteContext";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { globalSearch } from "../api/movieApi";

const links = [
  { link: "/", label: "Home" },
  { link: "/movies", label: "Movies" },
  { link: "/tvshows", label: "TV Shows" },
  { link: "/favorites", label: "Favorites" },
];

function Header() {
  const [result, setResult] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [debouncedSearch] = useDebouncedValue(searchQuery, 250);

  const [menuOpened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user, setUser, setToken, isLoading } = useContext(AuthContext);
  const { setFavorites } = useContext(FavoritesContext)!;

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setToken(null);
    setFavorites([]);
    navigate("/login");
  };

  const mockData = result?.results.map((item: any) => (
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
              <Menu>
                <Menu.Target>
                  <UserButton
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    avatar={user.avatar || null}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout size={16} />}
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
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onBlur={() => setResult(null)}
      >
        <Spotlight.Search
          placeholder="Search Movies or TV Shows..."
          leftSection={<IconSearch stroke={1.5} />}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(
                `/search?query=${encodeURIComponent(e.currentTarget.value)}`,
              );
              spotlight.close();
            }
          }}
        />
        <Spotlight.ActionsList style={{ maxHeight: 400, overflowY: "auto" }}>
          {mockData?.length > 0 ? (
            mockData
          ) : (
            <Spotlight.Empty>Nothing found...</Spotlight.Empty>
          )}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </header>
  );
}

export default Header;
