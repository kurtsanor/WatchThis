import { IconChevronRight, IconUser } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../css/UserButton.module.css";
import React, { forwardRef } from "react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  firstName: string;
  lastName: string;
  email: string;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ firstName, lastName, email, ...others }: UserButtonProps, ref) => (
    <UnstyledButton ref={ref} className={classes.user} {...others}>
      <Group>
        <Avatar name={firstName + " " + lastName} />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {firstName + " " + lastName}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  ),
);
