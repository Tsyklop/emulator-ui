import {chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery} from 'atomic-router';
import {attach, createEffect, createEvent, createStore, Effect, Event, sample, split} from 'effector';

import * as api from '~/shared/api';
import {RoleType, UserDto} from '~/shared/api/types';
import {showErrorNotification} from '~/shared/lib/notification';
import {routes} from '~/shared/routing';
import {interval} from "patronum";

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

interface ChainParams<Params extends RouteParams> {
  otherwise?: Event<void> | Effect<void, any, any>;
}

const logoutLocalFx = attach({effect: api.logoutFx});
const refreshTokenLocalFx = attach({effect: api.refreshTokenFx});

export const sessionRequestFx = attach({effect: api.sessionGetFx});

const sessionResolveDone = createEvent();
const sessionResolveFail = createEvent();

const refreshTokenIntervalStop = createEvent();

const refreshTokenIntervalStart = createEvent();

const { tick: refreshTokenTick, isRunning } = interval({
  timeout: 1800000,
  stop: refreshTokenIntervalStop,
  start: refreshTokenIntervalStart,
});

export const logout = createEvent();

export const $user = createStore<UserDto | null>(null);

$user.on(sessionRequestFx.doneData, (_, user) => user);

$user.reset(logoutLocalFx.done);

export const $role = createStore<RoleType | null>(null);

$role.on(sessionRequestFx.doneData, (_, user) => user?.role ?? null);

export const createRoleBasedRequest = <Params, Done, Fail = Error>(
  config: Partial<Record<RoleType, Effect<Params, Done, Fail>>>,
) => {
  return attach({
    source : $role,
    mapParams: (params: Params, role) => {
      if (role == null) {
        throw new Error('Role is null');
      }
      if (!config[role]) {
        throw new Error(`Effect for role ${role} not found in params list`);
      }
      return {
        params,
        effectToCall: config[role]
      };
    },
    effect: createEffect(({params, effectToCall}: { params: Params, effectToCall: Effect<Params, Done, Fail> | undefined }) => {
      if (!effectToCall) {
        throw new Error('Effect is undefined');
      }
      return effectToCall(params);
    })
  })
};

export const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$authenticationStatus.on(sessionResolveDone, () => AuthStatus.Authenticated);

$authenticationStatus.on([logoutLocalFx.done, sessionResolveFail], () => AuthStatus.Anonymous);

sample({
  clock: sessionRequestFx.done,
  target: [sessionResolveDone, refreshTokenIntervalStart],
});

sample({
  clock: sessionRequestFx.fail,
  target: [sessionResolveFail, refreshTokenIntervalStop],
});

/*sample({
  clock: sessionRequestFx.fail,
  target: refreshTokenLocalFx,
});*/

// REFRESH TOKEN INTERVAL

sample({
  clock: refreshTokenTick,
  target: refreshTokenLocalFx
});

sample({
  clock: refreshTokenLocalFx.fail,
  target: [logout, sessionResolveFail, refreshTokenIntervalStop]
});

// LOGOUT

sample({
  clock: logout,
  target: [logoutLocalFx],
});

sample({
  clock: logoutLocalFx.done,
  target: [refreshTokenIntervalStop, routes.auth.login.open],
});

sample({
  clock: logoutLocalFx.failData,
  fn: () => 'Logout failed!',
  target: showErrorNotification,
});

// REDIRECT AFTER LOGIN DEPENDS ON USER ROLE

split({
  source: sample({
    clock: routes.main.opened,
    source: {
      user: $user,
      status: $authenticationStatus,
    },
    filter: ({user, status}) => user != null && status == AuthStatus.Authenticated,
  }),
  match: ({user, status}) => {
    /*switch (user?.role) {
      case RoleType.ADMIN:
        return 'companies';
      case RoleType.MANAGER:
        return 'employees';
      case RoleType.EMPLOYEE:
        return 'stores';
      default:
        return null;
    }*/
    return 'main';
  },
  cases: {
    main: routes.main.open,
    /*companies: routes.companies.open,
    employees: routes.employees.open,
    stores: routes.stores.open,*/
    __: routes.auth.login.open,
  },
});

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionResolveFail/*sessionRequestFx.fail*/], // TODO
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionResolveDone/*sessionRequestFx.done*/],
    cancelOn: sessionReceivedAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAuthenticated, sessionResolveDone/*sessionRequestFx.done*/],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionResolveFail/*sessionRequestFx.fail*/],
    cancelOn: sessionReceivedAuthenticated,
  });
}
