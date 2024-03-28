'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { errorNotification } from '@/lib/notification';
import { useLogInMutation } from '@/redux/api/auth';

import Link from 'next/link';
import Button from '@/components/ui/button/button';
import GoogleOAuthButton from '@/components/ui/button/google-oauth.button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

type FormData = {
  emailOrUsername: string;
  password: string;
};

type ErrorCode = {
  code: string;
  message: string;
};

const errorCodes: ErrorCode[] = [
  {
    code: '401',
    message: 'Пользователь не найден',
  },
  {
    code: '403',
    message: 'Пользователь был деактивирован',
  },
];

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get('next') ?? '/');
  const error = searchParams.get('error'); // 401 or 403

  const nextUrl = next === '/' ? '/' : `?next=${next}`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [logIn, { isLoading }] = useLogInMutation();

  const emailOrUsername = watch('emailOrUsername');
  const password = watch('password');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      const data = await logIn({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
        next,
      }).unwrap();
      router.push(data.redirectUrl);
    } catch (error: any) {
      handleError(error.data.message || 'Что-то пошло не так');
    }
  };

  React.useEffect(() => {
    if (error) {
      const errorCode = errorCodes.find((item) => item.code === error);

      router.replace('/login');

      if (errorCode) {
        return () => {
          handleError(errorCode.message);
        };
      }
    }
  }, [error]);

  return (
    <>
      <div className={scss.form_wrapper} onSubmit={handleSubmit(handleSubmitForm)}>
        <form className={scss.form}>
          <div className={scss.text}>
            <h2 className={scss.title}>Вход</h2>

            <span className={scss.info}>Войдите в свою учетную запись</span>
          </div>

          <GoogleOAuthButton />

          <div className={scss.devider}>
            <hr />
            <span>или</span>
            <hr />
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.emailOrUsername ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.emailOrUsername.message}
                </span>
              ) : (
                <span className={scss.label}>Электронная почта или имя пользователя</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите адрес электронной почты или имя пользователя"
                  {...register('emailOrUsername', {
                    required: 'Это поле является обязательным',
                    pattern: {
                      value:
                        /^(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[a-zA-Z0-9_-]+)$/,
                      message: 'Неверный адрес электронной почты или имя пользователя',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('emailOrUsername')}
                  style={
                    !isLoading && emailOrUsername && emailOrUsername.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.password ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} /> {errors.password.message}
                </span>
              ) : (
                <span className={scss.label}>Пароль</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  autoComplete="off"
                  className={
                    isLoading
                      ? `${scss.input} ${scss.load} ${scss.password}`
                      : `${scss.input} ${scss.password}`
                  }
                  placeholder="Введите пароль"
                  {...register('password', {
                    required: 'Это поле является обязательным',
                    minLength: {
                      value: 8,
                      message: 'Пароль должен содержать не менее 8 символов',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Пароль не может содержать более 16 символов',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('password')}
                  style={
                    !isLoading && password && password.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button load={isLoading} type="submit" disabled={!isValid}>
              Войти
            </Button>

            <Link className={scss.link} href={`/password/forgot${nextUrl}`}>
              Забыли пароль?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
