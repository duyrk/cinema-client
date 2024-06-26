'use client';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Popover,
  Notification,
} from '@mantine/core';
import {} from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from '../_styles/HeaderMegaMenu.module.css';
import React from 'react';
import Link from 'next/link';
import AppLogo from './AppLogo';
import { FooterLinks } from './FooterLinks';
import ROUTE from '@constants/routes';
import { useAtom } from 'jotai';
import userAtom, { userInitState } from '@states/atomsStorage/userAtom';
import authAtom, { authInitState } from '@states/atomsStorage/authAtom';
import { AuthService, StorageService, TokenService } from '@services';
import { useRouter } from '@libs/patch-router';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [user, setUser] = useAtom(userAtom);
  const [auth, setAuth] = useAtom(authAtom);
  console.log('user', user);
  console.log('login', auth.isLogin);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  const logoutAPI = async () => {
    try {
      const res = await AuthService.logout({ refreshToken: TokenService.getRefreshToken() ?? '' });
      TokenService.clearTokens();
      setAuth(authInitState);
      setUser(userInitState);
      console.log('Log out successfully!');
    } catch (error) {
      console.log('error' + error);
    }
  };
  return (
    <Box>
      <header className={`${classes.header} ${classes.sticky}`}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}

          <Group>
            <AppLogo width="30px" height="30px" />
            <Text size="24px" fw={700}>
              Cinemax
            </Text>
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            {/* <a href="#" className={classes.link}>
              Home
            </a> */}
            <Link href={'/home'} className={classes.link}>
              Trang chủ
            </Link>
            <Link href={'/movies'} className={classes.link}>
              Lịch chiếu
            </Link>
            {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard> */}
            {/* <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a> */}
          </Group>

          <Group visibleFrom="sm">
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <SunIcon style={{ width: 18, height: 18 }} />
              ) : (
                <MoonIcon style={{ width: 18, height: 18 }} />
              )}
            </ActionIcon>
            {auth.isLogin ? (
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Text className="cursor-pointer">Hello, {user.email}</Text>
                </Popover.Target>
                <Popover.Dropdown>
                  <Button fullWidth variant="filled" color="red" onClick={logoutAPI}>
                    Đăng xuất
                  </Button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <Group>
                {' '}
                <Button variant="default">  <Link href={ROUTE.AUTH.REGISTER}>Đăng ký</Link></Button>
                <Button variant="gradient" gradient={{ from: 'pink', to: 'red', deg: 90 }}>
                  <Link href={ROUTE.AUTH.LOGIN}>Đăng nhập</Link>
                </Button>{' '}
              </Group>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="KMCinema"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link href={'/home'} className={classes.link}>
            Trang chủ
          </Link>

          <Link href={'/movies'} className={classes.link}>
            Lịch chiếu
          </Link>
          {/* <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a> */}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <SunIcon style={{ width: 18, height: 18 }} />
              ) : (
                <MoonIcon style={{ width: 18, height: 18 }} />
              )}
            </ActionIcon>
            {auth.isLogin ? (
              <Group>
                <Text className="cursor-pointer">Hello, {user.email}</Text>
                <Button fullWidth variant="filled" color="red" onClick={logoutAPI}>
                  Đăng xuất
                </Button>
              </Group>
            ) : (
              <Group>
                {' '}
                <Button variant="default">Đăng ký</Button>
                <Button variant="gradient" gradient={{ from: 'pink', to: 'red', deg: 90 }}>
                  <Link href={ROUTE.AUTH.LOGIN}>Đăng nhập</Link>
                </Button>{' '}
              </Group>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
      <section className={classes.sectionContainer}>{children}</section>
      <FooterLinks />
    </Box>
  );
}
