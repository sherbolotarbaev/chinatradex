'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { successNotification, errorNotification } from '@/lib/notification';
import { useResetPasswordMutation } from '@/redux/api/auth';

import Link from 'next/link';
import Button from '@/components/ui/button/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identificationToken = searchParams.get('identification_token') ?? '';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return errorNotification('Пароли не совпадают');
    }

    try {
      const data = await resetPassword({
        identificationToken,
        password,
      }).unwrap();
      successNotification(data.message);
      router.push('/login');
    } catch (error: any) {
      handleError(error.data.message || 'Что-то пошло не так');
    }
  };

  React.useEffect(() => {
    if (!identificationToken || identificationToken.length === 0) {
      router.push('/password/forgot');
    }
  }, [identificationToken, router]);

  return (
    <>
      <div className={scss.form_wrapper}>
        <form className={scss.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={scss.text}>
            <h2 className={scss.title}>Сброс пароля</h2>

            <span className={scss.info}>
              Введите новый безопасный пароль и нажмите сохранить, чтобы обновить пароль.
            </span>
          </div>

          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.password ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.password.message}
                </span>
              ) : (
                <span className={scss.label}>Новый пароль</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите новый пароль"
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

            <div className={scss.input_container}>
              {errors.confirmPassword ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <span className={scss.label}>Подтверждение пароля</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="password"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Подтвердите новый пароль"
                  {...register('confirmPassword', {
                    required: 'Подтвердите свой пароль',
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
                  onClick={() => handleClearInput('confirmPassword')}
                  style={
                    !isLoading && confirmPassword && confirmPassword.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid}>
              Сохранить
            </Button>

            <Link className={scss.link} href="/login">
              Назад
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
