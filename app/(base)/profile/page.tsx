import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getMe } from '@/redux/api/me/server';

import ProfileClient from './page.uc';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Профиль',
};

export default async function Profile() {
  const me = await getMe();
  if (me === 401) redirect('/login');
  return <ProfileClient me={me} />;
}
