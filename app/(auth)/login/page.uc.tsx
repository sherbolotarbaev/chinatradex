'use client';

import React, { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { errorNotification } from '@/lib/notification';

import LoginForm from '@/components/ui/form/login.form';

import scss from '@/components/scss/page.module.scss';

type ErrorCode = {
  code: string;
  message: string;
};

const errorCodes: ErrorCode[] = [
  {
    code: '401',
    message: 'Пользователь не существует',
  },
  {
    code: '403',
    message: 'Пользователь был деактивирован',
  },
];

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // 401 or 403

  React.useEffect(() => {
    const checkErrors = () => {
      // if (error) {
      //   const errorCode = errorCodes.find((item) => item.code === error);

      //   router.replace('/login');

      //   if (errorCode) {
      //     errorNotification(errorCode.message);
      //   }
      // }
    };

    checkErrors();
  }, [error]);

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
