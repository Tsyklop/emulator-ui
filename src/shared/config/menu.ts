import {
    IconBuildingFortress,
    IconBuildingStore,
    IconCompass,
    IconUsersGroup,
    IconWorldWww,
} from '@tabler/icons-react';
import {RouteInstance} from "atomic-router";

import {RoleType} from '~/shared/api/types';
import {routes} from "~/shared/routing";

export interface MenuItem {
    icon: React.FC<any>;
    link: string;
    label: string;
    route: RouteInstance<any>
}

export type MenuItemsByRole = {
    [key in RoleType]: MenuItem[];
};

export const MENU_ITEMS_BY_ROLE: MenuItemsByRole = {
    ADMIN: [
        {
            link: '/managers',
            label: 'Managers',
            icon: IconUsersGroup,
            route: routes.managers
        },
        {
            link: '/companies',
            label: 'Companies',
            icon: IconBuildingStore,
            route: routes.companies
        },
    ],
    MANAGER: [
        {
            link: '/towns',
            label: 'Towns',
            icon: IconBuildingFortress,
            route: routes.towns
        },
        {
            link: '/stores',
            label: 'Stores',
            icon: IconUsersGroup,
            route: routes.stores
        },
        {
            link: '/brands',
            label: 'Brands',
            icon: IconUsersGroup,
            route: routes.brands
        },
        {
            link: '/formats',
            label: 'Formats',
            icon: IconUsersGroup,
            route: routes.formats
        },
        {
            link: '/regions',
            label: 'Regions',
            icon: IconCompass,
            route: routes.regions
        },
        {
            link: '/platforms',
            label: 'Platforms',
            icon: IconWorldWww,
            route: routes.platforms
        },
        {
            link: '/employees',
            label: 'Employees',
            icon: IconUsersGroup,
            route: routes.employees
        },
    ],
    EMPLOYEE: [
        {
            link: '/towns',
            label: 'Towns',
            icon: IconBuildingFortress,
            route: routes.towns
        },
        {
            link: '/stores',
            label: 'Stores',
            icon: IconUsersGroup,
            route: routes.stores
        },
        {
            link: '/formats',
            label: 'Formats',
            icon: IconUsersGroup,
            route: routes.formats
        },
        {
            link: '/regions',
            label: 'Regions',
            icon: IconCompass,
            route: routes.regions
        },
        {
            link: '/platforms',
            label: 'Platforms',
            icon: IconWorldWww,
            route: routes.platforms
        }
    ]
};