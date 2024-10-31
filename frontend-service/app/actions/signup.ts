'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const signup = async (formData: FormData) => {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/users/signup`, {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const {access_token} = await response.json();

  if (access_token) {
    cookieStore.set('access_token', access_token);
  }

  redirect('/dashboard');
}