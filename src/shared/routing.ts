import {createHistoryRouter, createRoute, createRouterControls} from 'atomic-router';
import {sample} from 'effector';
import {createBrowserHistory} from 'history';

import {appStarted} from '~/shared/config/init';

export const routes = {
  auth: {
    login: createRoute(),
  },
  main: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/login',
      route: routes.auth.login,
    },
    {
      path: '/',
      route: routes.main,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
