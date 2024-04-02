'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { errorNotification } from '@/lib/notification';
import { useLogOutMutation } from '@/redux/api/auth';

import Button from '@/components/ui/button';

import { LogoutSvg } from '@/public/svg';

export default function LogOutButton() {
  const router = useRouter();

  const [logOut, { isLoading }] = useLogOutMutation();

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleLogout = async () => {
    try {
      const data = await logOut().unwrap();
      router.push(data.redirectUrl);
    } catch (error: any) {
      handleError(error.data.message || 'Что-то пошло не так');
    }
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
