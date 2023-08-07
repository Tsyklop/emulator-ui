import {
    Flex, Grid,
    Group,
    SegmentedControl,
    SegmentedControlItem,
    Select,
    SelectItem,
    Text,
    TextInput,
} from '@mantine/core';
import {modelView} from 'effector-factorio';
import {useUnit} from 'effector-react';
import React, {FC, memo, PropsWithChildren, useCallback} from 'react';

import {SearchStatusType} from '~/shared/api/types';
import {enumValueToLabel} from '~/shared/lib/utilities';

import {factory} from './factory';

const statusSelectData = Object.values(SearchStatusType).map((type) => {
  return {
    value: type as string,
    label: enumValueToLabel(type),
  } as SegmentedControlItem;
});

export interface TableFilterBarProps extends PropsWithChildren {
  searchByOptions: Array<SelectItem>;
  customFilters?: {
    [name: string]: FC | React.ReactNode;
  };
}

const Component = modelView(
  factory,
  memo<TableFilterBarProps>((props) => {
    const {children, customFilters, searchByOptions} = props;

    const model = factory.useModel();

    const data = useUnit(model.$data);

    const statusChanged = useCallback(
      (value: string | null) => {
        if (value) {
          model.statusChanged(value);
        }
      },
      [model],
    );

    const searchChanged = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        model.searchChanged(e.target.value);
      },
      [model],
    );

    const searchByChanged = useCallback(
      (value: string | null) => {
        if (value) {
          model.searchByChanged(value);
        }
      },
      [model],
    );

    return (
      <Grid className="filter-bar" justify="space-between" align="center">
          <Grid.Col span='content'>
              <Group spacing="xs">
                  <Text>Search:</Text>
                  <TextInput value={data.search} placeholder="Ex: google" onChange={searchChanged} />
                  <Text>in</Text>
                  <Select
                      data={searchByOptions}
                      value={data.searchBy}
                      placeholder="Select search by"
                      onChange={searchByChanged}
                  />
              </Group>
          </Grid.Col>
        <Grid.Col span='auto'>
            <Flex gap='xs'
                  align='center'
                  justify='flex-start'>
                {children}
            </Flex>
        </Grid.Col>
        <Grid.Col span='content'>
            <Group spacing="xs" position='right'>
                <Text>Status:</Text>
                <SegmentedControl data={statusSelectData} value={data.status} onChange={statusChanged} />
            </Group>
        </Grid.Col>
      </Grid>
    );
  }),
);

Component.displayName = 'TableFilterBar';

export const TableFilterBar = {
  factory,
  Component,
};
