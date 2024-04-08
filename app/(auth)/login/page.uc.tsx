'use client';

import OtpForm from '@/components/ui/form/otp.form';

import scss from '@/components/scss/auth.module.scss';

export default function LoginClient() {
  return (
    <>
      <div className={scss.container}>
        <OtpForm />
      </div>
    </>
  );
}
