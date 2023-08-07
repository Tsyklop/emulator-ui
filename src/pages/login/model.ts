import {hasLength} from '@mantine/form';
import {attach, createEvent, createStore, sample} from 'effector';
import {and, every, not} from 'patronum';

import * as api from '~/shared/api';
import {createField} from '~/shared/lib/factory/form';
import {routes} from '~/shared/routing';
import {$user, chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.login;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.main.open,
});

const signInFx = attach({effect: api.signInFx});

export const formSubmitted = createEvent();

export const loginField = createField({
  name: 'login',
  defaultValue: '',
  validate: {
    fn: hasLength({min: 2}, 'Value must have 2 or more characters'),
    on: [formSubmitted],
  },
  resetOn: [signInFx.done],
});

export const passwordField = createField({
  name: 'password',
  defaultValue: '',
  validate: {
    fn: hasLength({min: 2}, 'Value must have 2 or more characters'),
    on: [formSubmitted],
  },
  resetOn: [signInFx.done],
});

export const $error = createStore<api.SignInError | null>(null);

$error.reset(formSubmitted);

export const $loading = signInFx.pending;

const $formValid = every({
  stores: [loginField.$error, passwordField.$error],
  predicate: null,
});

sample({
  clock: formSubmitted,
  source: {login: loginField.$value, password: passwordField.$value},
  filter: and(not($loading), $formValid, not($user)),
  target: signInFx,
});

sample({
  clock: signInFx.done,
  target: sessionRequestFx,
});

$error.on(signInFx.failData, (_, error) => error);
