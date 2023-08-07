import { Avatar, createStyles, Group, Menu, Text, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { useUnit } from 'effector-react';
import { useCallback } from 'react';



import { $user, logout } from '~/shared/session';


interface UserButtonProps extends UnstyledButtonProps {
  icon?: React.ReactNode;
  compactMode: boolean
}

const useStyles = createStyles((theme, {compactMode}: {compactMode: boolean}) => ({
  user: {
    width: '100%',
    display: 'block',
    padding: compactMode ? 10 : theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
  inner: {
    width: 'auto',
    overflow: 'hidden',
    maxHeight: '78px',
  },
}));

const UserDetails = ({roleOnRightSide = false} : {roleOnRightSide?: boolean}) => {

  const user = useUnit($user);

  if (!user) {
    return null;
  }

  return (
      <Group position='apart' style={{flex: 1}}>

        <div>

          {!roleOnRightSide && <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {user.role}
          </Text>}

          <Text size="sm" weight={500}>
            {user.fio}
          </Text>

          <Text color="dimmed" size="xs">
            {user.login}
          </Text>
        </div>

        {roleOnRightSide && <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          {user.role}
        </Text>}

      </Group>
  );

};

export const UserNavbarButton = (props: UserButtonProps) => {

  const {icon, compactMode, ...others} = props;

  const {classes} = useStyles({compactMode});

  const user = useUnit($user);

  const onLogoutClicked = useCallback(() => {
    logout();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UnstyledButton component='div' className={classes.user} {...others}>
      <Menu
        withArrow
        width={300}
        position="right-end"
        transitionProps={{transition: 'scale-x'}}
        withinPortal
      >
        <Menu.Target>
          <Group className={classes.inner}>

            <Avatar size={compactMode ? 'sm' : "lg"} color="blue.4" variant="filled" />

            {!compactMode && <UserDetails/>}

            {!compactMode && (icon || <IconChevronRight size="0.9rem" stroke={1.5} />)}

          </Group>
        </Menu.Target>
        <Menu.Dropdown>

          {
            compactMode && (
                  <Menu.Item>
                    <Group>
                      <UserDetails roleOnRightSide={true}/>
                    </Group>
                  </Menu.Item>
              )
          }

          <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={onLogoutClicked}>
            Logout
          </Menu.Item>

        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
};