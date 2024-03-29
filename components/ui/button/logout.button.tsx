'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button';

import { LogoutSvg } from '@/public/svg';

export default function LogOutButton() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogout = () => {
    setIsLoading(!isLoading);
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
  };

  return (
    <Button
      style="logout"
      load={isLoading && 'Выход из системы...'}
      disabled={isLoading}
      onClick={handleLogout}
      icon={{
        svg: <LogoutSvg />,
        position: 'left',
      }}
    >
      Выйти
    </Button>
  );
}
