import {ActionIcon, Group, Text, Tooltip} from '@mantine/core';
import {modals} from '@mantine/modals';
import {IconCheck, IconPencil, IconX} from '@tabler/icons-react';
import React, {useCallback} from 'react';

import {TableActionProps} from './types';

export function TableActions(props: TableActionProps) {
  const {
    id,
    isActive,
    disabled,
    editTooltipText,
    toggleTooltipText,
    confirmModalTitle,
    confirmModalBodyText,
    editRequested,
    toggleStatusRequested,
  } = props;

  const onEditBtnClicked = useCallback(() => {
    editRequested(id);
  }, [editRequested, id]);

  const onToggleStatusBtnClicked = useCallback(() => {
    if (!id) {
      return;
    }
    modals.openConfirmModal({
      title: confirmModalTitle,
      centered: true,
      children: <Text size="sm">{confirmModalBodyText}</Text>,
      labels: {
        confirm: (isActive ? 'Deactivate' : 'Activate'),
        cancel: `No don't ${isActive ? 'deactivate' : 'activate'} it`,
      },
      confirmProps: {color: isActive ? 'red' : 'green'},
      onConfirm: () => {
        toggleStatusRequested(id);
      },
    });
  }, [id, confirmModalTitle, confirmModalBodyText, isActive, toggleStatusRequested]);

  return (
    <Group position="center">
      <Tooltip label={editTooltipText ?? 'Edit'} withinPortal>
        <ActionIcon color="blue" variant="filled" disabled={disabled} onClick={onEditBtnClicked}>
          <IconPencil size="16" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={toggleTooltipText ?? (isActive ? 'Deactivate' : 'Activate')} withinPortal>
        <ActionIcon
          color={isActive ? 'red' : 'green'}
          variant="filled"
          disabled={disabled}
          onClick={onToggleStatusBtnClicked}
        >
          {isActive ? <IconX size="16" /> : <IconCheck size="16" />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
