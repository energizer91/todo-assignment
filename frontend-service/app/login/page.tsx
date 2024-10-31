import * as React from 'react';
import { login } from '../actions/login';
import { Page } from '@/app/ui/Page';

export default async function LoginPage() {
  return (
    <Page>
      <h1>Login</h1>
      <form action={login}>
        <label>
          email
          <input type="email" name="email" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <button type="submit">login</button>
      </form>
    </Page>
  );
}