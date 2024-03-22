'use client';

import ForgotForm from '@/components/ui/form/forgot.form';

import scss from '@/components/scss/page.module.scss';

export default function ForgotClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <ForgotForm />
        </div>
      </section>
    </>
  );
}
