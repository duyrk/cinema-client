'use client';

import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Image,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useMemo } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { joiResolver } from 'mantine-form-joi-resolver';
import { IconHome, IconLock, IconMail, IconPhone, IconUserShield } from '@tabler/icons-react';

import { RegisterSchema } from './_utils/register.validator';

import { AuthUtils } from '@utils';
import { ERole } from '@constants/enums';
import styles from './_styles/register.module.css';

import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from '@libs/patch-router';
import AppLogo from '@app/(user)/_components/AppLogo';
import Link from 'next/link';
import ROUTE from '@constants/routes';
import { AuthService } from '@services';


// import { EStorageKey } from '@services/StorageService';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const registerForm = useForm({
    name: 'registerForm',
    initialValues: {
      userName: '',
      passWord: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
    },
    validate: joiResolver(RegisterSchema),
  });
  const registerAPI = async(body: IRegisterRequest)=>{
    try { 
      const res = await AuthService.register(body)
      alert(res.data.message)
      router.push('/login')
    } catch (error) {
      console.log('Register error'+error)
    }
  }
  const handleSubmit = (body: IRegisterRequest) => {
    console.log(body)
    registerAPI(body)
  };

  return (
    <Container size={420} pt={10}>
      <Center mb={20}>
        <Image src={'./web-icon.png'} w={120} className={styles.app_logo} />
      </Center>
      <Stack justify="center" align="center">
        <AppLogo width="60px" height="60px" />
        <Title ta="center" fw={'bolder'} c={'white'}>
         Welcome to Cinemax!
        </Title>
      </Stack>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={registerForm.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            leftSection={<IconUserShield strokeWidth={2} />}
            {...registerForm.getInputProps('userName')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            leftSection={<IconLock strokeWidth={2} />}
            mt="md"
            {...registerForm.getInputProps('passWord')}
          />
          <TextInput
            label="Full name"
            placeholder="Your full name"
            mt="md"
            leftSection={<IconUserShield strokeWidth={2} />}
            {...registerForm.getInputProps('fullName')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Your email"
            leftSection={<IconMail strokeWidth={2} />}
            {...registerForm.getInputProps('email')}
          />
          <TextInput
            mt="md"
            label="Phone"
            placeholder="Your phone number"
            leftSection={<IconPhone strokeWidth={2} />}
            {...registerForm.getInputProps('phone')}
          />
          <TextInput
            mt="md"
            label="Address"
            placeholder="Your address"
            leftSection={<IconHome strokeWidth={2} />}
            {...registerForm.getInputProps('address')}
          />
          <Box mt={'sm'} className={styles.signUpSection}>
            <Text>Đã có tài khoản?</Text>
            <Link href={ROUTE.AUTH.LOGIN}>
              <Text c={'yellow.6'} ml={5}>
                Đăng nhập
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
            <Text c={'black'}>Đăng ký</Text>
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
