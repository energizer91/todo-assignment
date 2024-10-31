import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Page } from '@/app/ui/Page';

export default async function Home() {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/users/profile`, {
    headers: {
      Cookie: cookieStore.toString()
    },
  });

  if (response.ok) {
    redirect('/dashboard');
  }

  return (
    <Page>
      <h1>Hello world!</h1>
    </Page>
  )
}
