import { useState, type ReactNode } from "react";
import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/pricing", label: "Favorites" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

interface HeaderProps {
  left?: ReactNode;
  right?: ReactNode;
}

function Header({ left, right }: HeaderProps) {
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
        <Group gap={5} visibleFrom="xs">
          <Group>
            {left}
            {items}
          </Group>
        </Group>
        <Group>{right}</Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Group>
    </header>
  );
}
export default Header;
