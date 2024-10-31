'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addTask(formData: FormData) {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      title: formData.get('title'),
      description: formData.get('description'),
    }),
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString()
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  revalidatePath('/dashboard')
}