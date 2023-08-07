import {
    ActionIcon,
    createStyles,
    getStylesRef,
    Group,
    Navbar,
    rem,
    Text,
    Tooltip, Transition,
} from '@mantine/core';
import {IconArrowBarLeft, IconArrowBarRight} from '@tabler/icons-react';
import {RouteInstance} from 'atomic-router';
import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import React, {useState} from 'react';

import {MENU_ITEMS_BY_ROLE} from '~/shared/config/menu';
import {$user} from '~/shared/session';
import {UserNavbarButton} from "~/entities/user";

interface NavbarProps {

}

interface NavbarLinkProps {
    to: string | RouteInstance<any>;
    icon: React.FC<any>;
    label: string;
    active?: boolean;
    onlyIcon?: boolean;

    onClick?(): void;
}

const useStyles = createStyles((theme) => ({
    navbar: {
        transition: 'width .5s ease',
    },

    header: {
        position: 'relative',
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            },
        },
    },

    toggler: {
        right: '0',
        transform: 'translateX(100%)',
        position: 'absolute',

        '&:active': {
            transform: 'translateX(100%)',
        },
    },
}));

function NavbarLink(props: NavbarLinkProps) {
    const {to, icon: Icon, label, active, onlyIcon = false, onClick} = props;

    const {classes, cx} = useStyles();

    const iconClass = !onlyIcon ? classes.linkIcon : '';

    let linkElement;

    if (to === '#') {
        linkElement = (
            <a
                className={classes.link}
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClick) {
                        onClick();
                    }
                }}
            >
                <Icon className={iconClass} stroke={1.5} />
                {!onlyIcon ? <span>{label}</span> : null}
            </a>
        );
    } else {
        linkElement = (
            <Link to={to} className={classes.link} activeClassName={classes.linkActive} onClick={onClick}>
                <Icon className={iconClass} stroke={1.5} />
                {!onlyIcon ? <span>{label}</span> : null}
            </Link>
        );
    }

    if (onlyIcon) {
        return (
            <Tooltip label={label} position="right" transitionProps={{duration: 0}}>
                {linkElement}
            </Tooltip>
        );
    }

    return linkElement;
}

export function NavbarOwn(props: NavbarProps) {

    const user = useUnit($user);

    const {classes, cx} = useStyles();

    const [expanded, setExpanded] = useState(true);

    return (
        <Navbar p="md" height="100vh" width={{base: expanded ? 300 : 80}} className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header}>
                    <Text fz="xl" span>
                        Tablix
                    </Text>
                    <ActionIcon
                        variant="default"
                        className={classes.toggler}
                        onClick={() => {
                            setExpanded((prevState) => !prevState);
                        }}
                    >
                        {expanded ? <IconArrowBarLeft size="1rem" /> : <IconArrowBarRight size="1rem" />}
                    </ActionIcon>
                </Group>
                {user &&
                    MENU_ITEMS_BY_ROLE[user?.role].map((link) => (
                        <NavbarLink
                            key={link.label}
                            to={link.route}
                            icon={link.icon}
                            label={link.label}
                            onlyIcon={!expanded}
                            onClick={() => {}}
                        />
                    ))}
            </Navbar.Section>
            <Navbar.Section className={classes.footer}>
                <UserNavbarButton compactMode={!expanded}/>
            </Navbar.Section>
        </Navbar>
    );
}
