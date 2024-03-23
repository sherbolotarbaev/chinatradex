'use client';

import { Suspense } from 'react';

import ResetForm from '@/components/ui/form/reset.form';

import scss from '@/components/scss/page.module.scss';

export default function ResetClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <Suspense>
            <ResetForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
