import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconAt, IconLock} from '@tabler/icons-react';
import {useUnit} from 'effector-react';
import {FormEventHandler, useCallback} from 'react';

import {$error, $loading, formSubmitted, loginField, passwordField} from './model';


export function LoginPage() {
  const loading = useUnit($loading);

  const onFormSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault();
    formSubmitted();
  }, []);

  return (
    <>
      <Container size={420} my={40} w="100%" h="100vh">
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={onFormSubmit}
        >
          <Login />
          <Password />
          <ErrorView />
          <Button fullWidth mt="xl" type="submit" loading={loading} disabled={loading}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}

function Login() {
  const [login, loginError, loading] = useUnit([loginField.$value, loginField.$error, $loading]);

  return (
    <TextInput
      icon={<IconAt size="0.8rem" />}
      label="Login"
      value={login}
      error={loginError}
      disabled={loading}
      placeholder="Login"
      onChange={(event) => loginField.changed(event.target.value)}
    />
  );
}

function Password() {
  const [password, passwordError, loading] = useUnit([
    passwordField.$value,
    passwordField.$error,
    $loading,
  ]);

  return (
    <PasswordInput
      mt="md"
      icon={<IconLock size="0.8rem" />}
      label="Password"
      value={password}
      error={passwordError}
      disabled={loading}
      placeholder="Your Password"
      onChange={(event) => passwordField.changed(event.target.value)}
    />
  );
}

function ErrorView() {
  const error = useUnit($error);

  if (!error) {
    return <Space h="xl" />;
  }

  if (error?.message === 'key_login_or_password_incorrect') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз, пожалуйста</Text>;
}