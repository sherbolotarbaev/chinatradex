'use client';

import { usePathname, useSearchParams, redirect } from 'next/navigation';

import { useGetMeQuery } from '@/redux/api/me';

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const next = decodeURIComponent(searchParams.get('next') ?? '/');

  const { data: me, isLoading } = useGetMeQuery();

  const isAuth = me !== undefined && !isLoading;

  switch (pathname) {
    case '/login':
      if (isAuth) {
        redirect(`${next}`);
      }
      break;

    case '/password/forgot':
      if (isAuth) {
        redirect(`${next}`);
      }
      break;

    case '/password/reset':
      if (isAuth) {
        redirect(`${next}`);
      }
      break;

    default:
      break;
  }

  return <>{children}</>;
}
