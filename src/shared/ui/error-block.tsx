import {Space, Text} from '@mantine/core';
import React from 'react';

export const ErrorBlock = (props: {error: string | null}) => {
  const {error} = props;

  if (!error) {
    return <Space h="xl" />;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз, пожалуйста</Text>;
};
