import * as React from 'react';
import { signup } from '@/app/actions/signup';
import { Page } from '@/app/ui/Page';
import { Form } from '@/app/src/Form';

export default async function SignupPage() {
  return (
    <Page>
      <h1>Signup</h1>
      <Form action={signup}>
        <label>
          email
          <input type="email" name="email" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <button type="submit">signup</button>
      </Form>
    </Page>
  );
}