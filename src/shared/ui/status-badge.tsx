import {Badge, type BadgeProps} from '@mantine/core';
import React from 'react';

import {StatusType} from '~/shared/api/types';

export interface StatusBadgeProps extends BadgeProps {
  status: StatusType;
}

export const StatusBadge = ({status}: StatusBadgeProps) => {
  return (
    <Badge color={status === 'ACTIVE' ? 'green' : 'red'} fullWidth>
      {status}
    </Badge>
  );
};
