import type { Metadata } from 'next';

import ProfileClient from './page.uc';

export const metadata: Metadata = {
  title: 'Профиль',
};

export default async function Profile() {
  return <ProfileClient />;
}
