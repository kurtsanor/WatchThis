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

  const { user, setUser } = useContext(AuthContext);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  const handleUserBtnClick = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <Group className={classes.inner}>
        <Group gap={5}>
          <Group gap={10} className={classes.leftGroup}>
            <img src="/wtLogo.png" height={"40px"} width={"40px"}></img>
            <Text>
              <Anchor href="/" fw={"bolder"} size="1.5rem" td={"none"}>
                <span style={{ color: "white" }}>Watch</span>This
              </Anchor>
            </Text>
          </Group>
        </Group>
        <Group visibleFrom="md">{items}</Group>
        <Group visibleFrom="md" className={classes.rightGroup}>
          {user && (
            <>
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
                    onClick={handleUserBtnClick}
                    color="red"
                    leftSection={<IconLogout size={20} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
          {!user && (
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
      </Drawer>
    </header>
  );
}
export default Header;
