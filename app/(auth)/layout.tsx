import type { Metadata } from 'next';

import AuthLayoutClient from './layout.uc';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Авторизация',
};

export default async function AuthLayout({ children }: Readonly<Props>) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
