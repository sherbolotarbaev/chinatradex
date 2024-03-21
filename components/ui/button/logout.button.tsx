'use client';

import Button from './button';

export default function LogOutButton() {
  return (
    <Button redirect={`${process.env.NEXT_PUBLIC_API_URL}/logout`} style="logout">
      Выйти
    </Button>
  );
}
