import {MantineProvider} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';
import {Notifications} from '@mantine/notifications';
import {RouterProvider} from 'atomic-router-react';

import {Pages} from '~/pages';

import {router} from '~/shared/routing';

export const App = () => {
  return (
    <MantineProvider theme={{colorScheme: 'light'}} withNormalizeCSS withGlobalStyles>
      <ModalsProvider>
        <RouterProvider router={router}>
          <Notifications />
          <Pages />
        </RouterProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};
