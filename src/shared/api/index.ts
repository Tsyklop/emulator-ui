import {createEffect} from 'effector';

import {UserDto} from '~/shared/api/types';

import {requestApiFx} from './request';

export type SessionGetError = {
  message: 'unauthorized'
};

export const logoutFx = createEffect<void, void, void>(async () => {
  return requestApiFx({
    path: '/auth/logout',
    method: 'PUT',
  });
});

export const sessionGetFx = createEffect<void, UserDto, SessionGetError>(async () => {
  return requestApiFx({
    path: '/user',
    method: 'GET',
  });
});

export const refreshTokenFx = createEffect<void, void, SessionGetError>(async () => {
  return requestApiFx({
    path: '/user/token/refresh',
    method: 'PUT',
  });
});

export * from './sign-in';