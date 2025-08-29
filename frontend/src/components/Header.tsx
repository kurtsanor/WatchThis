import { useState, type ReactNode } from "react";
import { Anchor, Burger, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import { IconMovie } from "@tabler/icons-react";

const links = [
  { link: "/", label: "Home" },
  { link: "/pricing", label: "Favorites" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Group className={classes.inner}>
        <Group gap={5}>
          <Group gap={"xs"}>
            <IconMovie height={"30px"} width={"40px"}></IconMovie>
            <Text>
              <Anchor href="/" fw={"bolder"} size="1.5rem" td={"none"}>
                WatchThis
              </Anchor>
            </Text>
          </Group>
        </Group>
        <Group visibleFrom="md">{items}</Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
    </header>
  );
}
export default Header;
