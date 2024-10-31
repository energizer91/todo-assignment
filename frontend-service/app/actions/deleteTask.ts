'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteTask(id: string) {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  revalidatePath('/dashboard');
}