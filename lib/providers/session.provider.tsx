'use client';

import { redirect, usePathname } from 'next/navigation';

import { useGetMeQuery } from '@/redux/api/me';

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Readonly<Props>) {
  const pathname = usePathname();

  const { data: me, isLoading } = useGetMeQuery();

  const isAuth = me && !isLoading;

  switch (pathname) {
    case '/login':
      if (isAuth) {
        redirect('/');
      }
      break;

    case '/password/forgot':
      if (isAuth) {
        redirect('/');
      }
      break;

    case '/password/reset':
      if (isAuth) {
        redirect('/');
      }
      break;

    case '/profile':
      if (!isAuth) {
        redirect('/login?next=/profile');
      }
      break;

    default:
      break;
  }

  return <>{children}</>;
}
