'use client';

import { Suspense } from 'react';

import LoginForm from '@/components/ui/form/login.form';

import scss from '@/components/scss/page.module.scss';

export default function LoginClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <Suspense fallback={<span>Loading...</span>}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
