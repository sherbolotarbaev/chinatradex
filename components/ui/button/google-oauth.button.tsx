'use client';

import { useSearchParams } from 'next/navigation';

import Button from './button';

import { GoogleSvg } from '@/public/svg';

export default function GoogleOAuthButton() {
  const searchParams = useSearchParams();

  const OAuthUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/google/callback?${searchParams.toString()}`,
  ).toString();

  return (
    <Button
      redirect={OAuthUrl}
      style="white"
      icon={{
        svg: <GoogleSvg style={{ fontSize: '1.15rem' }} />,
        position: 'left',
      }}
    >
      Продолжить с Google
    </Button>
  );
}
