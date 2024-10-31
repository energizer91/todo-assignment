import { getProfile } from '@/app/actions/getProfile';
import Link from 'next/link';
import { logout } from '@/app/actions/logout';

export const SignUpButton = async () => {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div>
        <Link href="/login">login</Link>
        <Link href="/signup">signup</Link>
      </div>
    )
  }

  return (
    <div>
      <span>hello, {profile.id}</span>{' '}
      <button onClick={logout}>logout</button>
    </div>
  )
}