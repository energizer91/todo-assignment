'use server';

import { cookies } from 'next/headers';

export const getProfile = async () => {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/users/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    },
  })

  if (!response.ok) {
    return null;
  }

  const profile = await response.json();

  if (profile?.id) {
    return profile;
  }

  return null;
}