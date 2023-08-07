import {Center, Loader} from '@mantine/core';

export function PageLoader() {
  return (
    <Center h="100%">
      <Loader size="xl" variant="bars" />
    </Center>
  );
}
