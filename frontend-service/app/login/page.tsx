import * as React from 'react';
import { Page } from '@/app/ui/Page';
import { Form } from '@/app/src/Form';
import { login } from '@/app/actions/login';

export default async function LoginPage() {
  return (
    <Page>
      <h1>Login</h1>
      <Form action={login}>
        <label>
          email
          <input type="email" name="email" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <button type="submit">login</button>
      </Form>
    </Page>
  );
}