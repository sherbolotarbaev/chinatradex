'use client';

import React from 'react';

import Button from './button';

import { LogoutSvg } from '@/public/svg';

export default function LogOutButton() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <Button
      redirect={`${process.env.NEXT_PUBLIC_API_URL}/logout`}
      style="logout"
      load={isLoading}
      disabled={isLoading}
      onClick={handleLoading}
      icon={{
        svg: <LogoutSvg />,
        position: 'left',
      }}
    >
      Выйти
    </Button>
  );
}
