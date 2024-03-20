import type { Metadata } from 'next';

import LoginClient from './page.uc';

export const metadata: Metadata = {
  title: 'Вход',
};

export default async function Login() {
  return <LoginClient />;
}
