'use client';

import LoginForm from '@/components/ui/form/login.form';

import scss from '@/components/scss/auth.module.scss';

export default function LoginClient() {
  return (
    <>
      <div className={scss.container}>
        <LoginForm />
      </div>
    </>
  );
}
