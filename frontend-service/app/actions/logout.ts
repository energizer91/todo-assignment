'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const logout = async () => {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  cookieStore.delete('access_token');

  redirect('/');
}