import {createRouteView} from 'atomic-router-react';

import {PageLayout} from '~/widgets/layout/page-layout';

import {PageLoader} from '~/shared/ui';

import {authorizedRoute, currentRoute} from './model';
import {MainPage} from './page';


export const MainRoute = {
    view: createRouteView({route: authorizedRoute, view: MainPage, otherwise: PageLoader}),
    route: currentRoute,
    layout: PageLayout
};