'use client';
import React, { useState } from 'react';
import { Group, Code, Container, Box, ScrollArea, Text } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconMovie,
  IconClockPlay,
  IconDoorEnter,
  IconArmchair2,
  IconUsers,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../_styles/NavbarSimple.module.css';
import AppLogo from '@app/(user)/_components/AppLogo';
import { AuthService, TokenService } from '@services';
import { useAtom } from 'jotai';
import userAtom, { userInitState } from '@states/atomsStorage/userAtom';
import authAtom, { authInitState } from '@states/atomsStorage/authAtom';
import { useRouter } from '@libs/patch-router';

const data = [
  { link: '/dashboard/movies', label: 'Phim', icon: IconMovie },
  { link: '/dashboard/showtimes', label: 'Xuất chiếu', icon: IconClockPlay },
  { link: '/dashboard/rooms', label: 'Phòng', icon: IconDoorEnter },
  { link: '/dashboard/seats', label: 'Ghế', icon: IconArmchair2 },
  { link: '/home', label: 'User', icon: IconUsers },
];

export function NavbarSimple({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [active, setActive] = useState('Billing');
  const [user, setUser] = useAtom(userAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        // event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  const logoutAPI = async () => {
    try {
      const res = await AuthService.logout({ refreshToken: TokenService.getRefreshToken() ?? '' });
      TokenService.clearTokens();
      setAuth(authInitState);
      setUser(userInitState);
      console.log('Log out successfully!');
      router.push('/home')
    } catch (error) {
      console.log('error' + error);
    }
  };
  return (
    <div className={classes.navbarContainer}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Group>
              <AppLogo width="30px" height="30px" />
              <Text size="24px" fw={700}>
                Cinemax
              </Text>
            </Group>
            <Code fw={700}>v0.0.1</Code>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              logoutAPI();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      <ScrollArea className={classes.sectionContainer}>{children}</ScrollArea>
    </div>
  );
}
