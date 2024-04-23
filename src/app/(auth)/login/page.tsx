'use client';

import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { joiResolver } from 'mantine-form-joi-resolver';
import { IconLock, IconUserShield } from '@tabler/icons-react';
import { LoginSchema } from './_utils/login.validator';
import { AuthService, DefaultResponse, StorageService, TokenService } from '@services';
import styles from './_styles/login.module.css';
import { useRouter } from '@libs/patch-router';
import AppLogo from '@app/(user)/_components/AppLogo';
import Link from 'next/link';
import ROUTE from '@constants/routes';
import userAtom from '@states/atomsStorage/userAtom';
import { useAtom } from 'jotai';
import authAtom from '@states/atomsStorage/authAtom';
export default function LoginPage() {
  const routes = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [, setUSer] = useAtom(userAtom)
  const [, setIsLogin]= useAtom(authAtom)
  const loginApi = async (body: ILoginRequest) =>{
    try {
      const res = await AuthService.login(body)
      setIsPending(false)
      console.log('success')
      TokenService.setAccessToken(res.data.accessToken)
      TokenService.setRefreshToken(res.data.refreshToken)
      setUSer(res.data.data)
      setIsLogin({isLogin: true})
      routes.push('/home')
    } catch (error) {
      console.log('error' + error)
    }
  }
  const loginForm = useForm({
    name: 'loginForm',
    initialValues: {
      username: '',
      password: '',
    },
    validate: joiResolver(LoginSchema),
  });
  const handleSubmit = (body: ILoginRequest) => {
    setIsPending(true)
    loginApi(body)
  };

  return (
    <Container size={420} pt={30}>
      <Center mb={20}>
        <Image src={'./web-icon.png'} w={120} className={styles.app_logo} />
      </Center>
      <Stack justify="center" align="center">
        <AppLogo width="60px" height="60px" />
        <Title ta="center" fw={'bolder'} c={'white'}>
          Cinemax
        </Title>
      </Stack>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={loginForm.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            leftSection={<IconUserShield strokeWidth={2} />}
            {...loginForm.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            leftSection={<IconLock strokeWidth={2} />}
            mt="md"
            {...loginForm.getInputProps('password')}
          />

          <Box mt={'sm'} className={styles.signUpSection}>
            <Text>Chưa có tài khoản?</Text>
            <Link href={ROUTE.AUTH.REGISTER}>
              <Text c={'yellow.6'} ml={5}>
                Đăng ký
              </Text>
            </Link>
          </Box>
          <Button
            mt="md"
            fullWidth
            type="submit"
            variant={'white'}
            loading={isPending}
            className={'hover:bg-gray-200'}
          >
            <Text c={'black'}>Đăng nhập</Text>
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
