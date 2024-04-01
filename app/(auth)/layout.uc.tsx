'use client';

import React from 'react';

import { siteConfig } from '@/config/site';

import Logo from '@/components/ui/logo';

import websiteLogo from '@/public/logo.png';
import scss from '@/components/scss/auth.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function AuthLayoutClient({ children }: Readonly<Props>) {
  React.useEffect(() => {
    document.body.classList.add('disabled');

    return () => {
      document.body.classList.remove('disabled');
    };
  }, []);

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.content}>
          <Logo src={websiteLogo} alt={siteConfig.name} width={60} height={60} />

          {children}
        </div>
      </section>
    </>
  );
}
