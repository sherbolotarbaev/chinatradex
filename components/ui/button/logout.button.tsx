'use client';

import Button from './button';

import { LogoutSvg } from '@/public/svg';

export default function LogOutButton() {
  return (
    <Button
      redirect={`${process.env.NEXT_PUBLIC_API_URL}/logout`}
      style="logout"
      icon={{
        svg: <LogoutSvg />,
        position: 'left',
      }}
    >
      Выйти
    </Button>
  );
}
