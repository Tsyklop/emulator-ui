import {createRoutesView} from 'atomic-router-react';

import {MainRoute} from '~/pages/main';
import {LoginRoute} from './login';

export const Pages = createRoutesView({
  routes: [
    LoginRoute,
    MainRoute,
  ],
});