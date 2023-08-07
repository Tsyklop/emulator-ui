import {createEvent} from 'effector';

import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';


export const currentRoute = routes.main;
export const authorizedRoute = chainAuthorized(currentRoute, {
    otherwise: routes.auth.login.open,
});

export const pageMounted = createEvent();