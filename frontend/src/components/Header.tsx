import {
  Anchor,
  Burger,
  Button,
  Drawer,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserButton } from "./UserButton";
import { IconLogout } from "@tabler/icons-react";
import { FavoritesContext } from "../contexts/FavoriteContext";

const links = [
  { link: "/", label: "Home" },
  { link: "/movies", label: "Movies" },
  { link: "/tvshows", label: "TV Shows" },
  { link: "/favorites", label: "Favorites" },
];

function Header() {
  const [menuOpened, { open, close }] = useDisclosure(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user, setUser, setToken, isLoading } = useContext(AuthContext);
  const { setFavorites } = useContext(FavoritesContext)!;

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
          {token ? (
            user ? (
              <Menu>
                <Menu.Target>
                  <UserButton
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
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
    </header>
  );
}

export default Header;
