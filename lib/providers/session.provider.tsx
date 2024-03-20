'use client';

import React from 'react';

import { redirect, usePathname } from 'next/navigation';

import { useGetMeQuery } from '@/redux/api/me';

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Readonly<Props>) {
  const pathname = usePathname();

  const { data: me } = useGetMeQuery();

  switch (pathname) {
    case '/login':
      if (me) {
        redirect('/');
      }
      break;

    default:
      break;
  }

  return <>{children}</>;
}
