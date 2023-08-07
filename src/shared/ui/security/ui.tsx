import {Group, Paper, Text} from '@mantine/core';
import {useUnit} from 'effector-react/effector-react.mjs';
import {FC, PropsWithChildren} from 'react';

import {RoleType} from '~/shared/api/types';
import {$role} from '~/shared/session';

export interface PermissionGuardProps extends PropsWithChildren {
  grantFor: RoleType | RoleType[];
}

export const PermissionGuard: FC<PermissionGuardProps> = (props) => {
  const {grantFor, children} = props;

  const role = useUnit($role);

  if (!role || ((Array.isArray(grantFor) && !grantFor.includes(role)) || grantFor !== role)) {
    return (
        <Paper shadow="md" p="md" withBorder>
          <Group position="center">
            <Text color="red" fw={700}>You dont have permission</Text>
          </Group>
        </Paper>
    );
  }

  return <>{children}</>;
};
