'use client';

import ForgotForm from '@/components/ui/form/forgot.form';

import scss from '@/components/scss/auth.module.scss';

export default function ForgotClient() {
  return (
    <>
      <div className={scss.container}>
        <ForgotForm />
      </div>
    </>
  );
}
