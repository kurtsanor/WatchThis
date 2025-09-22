import { Anchor, Burger, Drawer, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import { IconMovie, IconStereoGlasses } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/movies", label: "Movies" },
  { link: "/tvshows", label: "TV Shows" },
  { link: "/favorites", label: "Favorites" },
];

function Header() {
  const [menuOpened, { open, close }] = useDisclosure(false);
  const location = useLocation();

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

  return (
    <header className={classes.header}>
      <Group className={classes.inner}>
        <Group gap={5}>
          <Group gap={0} className={classes.leftGroup}>
            <IconStereoGlasses
              height={"25px"}
              width={"30px"}
            ></IconStereoGlasses>
            <Text>
              <Anchor href="/" fw={"bolder"} size="1.5rem" td={"none"}>
                WatchThis
              </Anchor>
            </Text>
          </Group>
        </Group>
        <Group visibleFrom="md" className={classes.rightGroup}>
          {items}
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
