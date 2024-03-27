'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { successNotification, errorNotification } from '@/lib/notification';
import { useForgotPasswordMutation } from '@/redux/api/auth';

import Link from 'next/link';
import Button from '@/components/ui/button/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

type FormData = {
  email: string;
};

export default function ForgotForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get('next') ?? '/');

  const nextUrl = next === '/' ? '/' : `?next=${next}`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const email = watch('email');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      const data = await forgotPassword(formData).unwrap();
      successNotification(data.message);
      router.push(next === '/' ? '/login' : `/login?next=${next}`);
    } catch (error: any) {
      handleError(error.data.message || 'Что-то пошло не так');
    }
  };

  return (
    <>
      <div className={scss.form_wrapper}>
        <form className={scss.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={scss.text}>
            <h2 className={scss.title}>Восстановление пароля</h2>

            <span className={scss.info}>
              Введите адрес электронной почты, и мы вышлем вам ссылку для сброса пароля.
            </span>
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.email ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.email.message}
                </span>
              ) : (
                <span className={scss.label}>Электронная почта</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите адрес электронной почты"
                  {...register('email', {
                    required: 'Это поле является обязательным',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный адрес электронной почты',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('email')}
                  style={
                    !isLoading && email && email.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button type="submit" load={isLoading}>
              Отправить ссылку для сброса пароля
            </Button>

            <Link className={scss.link} href={`/login${nextUrl}`}>
              Назад
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
