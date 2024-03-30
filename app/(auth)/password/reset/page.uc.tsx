'use client';

import ResetForm from '@/components/ui/form/reset.form';

import scss from '@/components/scss/auth.module.scss';

export default function ResetClient() {
  return (
    <>
      <div className={scss.container}>
        <ResetForm />
      </div>
    </>
  );
}
