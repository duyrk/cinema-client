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

const data = [
  { link: '/dashboard/movies', label: 'Phim', icon: IconMovie },
  { link: '/dashboard/showtimes', label: 'Xuất chiếu', icon: IconClockPlay },
  { link: '/dashboard/rooms', label: 'Phòng', icon: IconDoorEnter },
  { link: '/dashboard/seats', label: 'Ghế', icon: IconArmchair2 },
  { link: '/home', label: 'User', icon: IconUsers },

];

export function NavbarSimple({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('Billing');

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

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      <ScrollArea className={classes.sectionContainer}>{children}</ScrollArea>
    </div>
  );
}
