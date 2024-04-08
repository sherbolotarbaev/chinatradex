'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { errorNotification } from '@/lib/notification';
import { useLogInOtpMutation, useSendOtpMutation } from '@/redux/api/auth';
import { getCookie } from 'cookies-next';

import Button from '@/components/ui/button';
import GoogleOAuthButton from '@/components/ui/button/google-oauth.button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

type FormData = {
  email: string;
  otp: string;
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

export default function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = decodeURIComponent(searchParams.get('next') ?? '/');
  const error = searchParams.get('error'); // 401 or 403

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [logInOtp, { isLoading }] = useLogInOtpMutation();
  const [sendOtp, { isLoading: isOtpSending }] = useSendOtpMutation();

  const [isOtpSent, setIsOtpSent] = React.useState<boolean>(false);

  const email = watch('email');
  const otp = watch('otp');

  const handleClearInput = (name: keyof FormData) => {
    if (name === 'email') {
      setIsOtpSent(false);
      setValue('otp', '');
    }

    setValue(name, '');
  };

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    if (!isOtpSent) {
      try {
        const data = await sendOtp({
          email: formData.email,
        }).unwrap();

        if (data.email) {
          setIsOtpSent(true);
        }
      } catch (error: any) {
        handleError(error.data.message || 'Что-то пошло не так');
      } finally {
        return;
      }
    }

    try {
      const data = await logInOtp({
        email: formData.email,
        otp: formData.otp,
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

  React.useEffect(() => {
    const getCookieEmail = async () => {
      const cookieEmail = getCookie('email');

      if (cookieEmail) {
        setValue('email', cookieEmail);
      }
    };

    getCookieEmail();
  }, [setValue, getCookie]);

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
                    onChange: () => {
                      setIsOtpSent(false);
                      handleClearInput('otp');
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

            {isOtpSent && (
              <>
                <div className={scss.text}>
                  <span className={scss.info}>
                    Проверьте свой почтовый ящик и введите временный пароль.
                  </span>
                </div>

                <div className={scss.input_container}>
                  {errors.otp ? (
                    <span className={scss.error}>
                      <ErrorSvg className={scss.icon} /> {errors.otp.message}
                    </span>
                  ) : (
                    <span className={scss.label}>Временный пароль</span>
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
                      placeholder="Введите временный пароль"
                      {...register('otp', {
                        required: 'Это поле является обязательным',
                        minLength: {
                          value: 6,
                          message: 'Временный пароль должен состоять ровно из шести цифр',
                        },
                        maxLength: {
                          value: 6,
                          message: 'Временный пароль должен состоять ровно из шести цифр',
                        },
                      })}
                    />

                    <CloseSvg
                      className={scss.clear}
                      onClick={() => handleClearInput('otp')}
                      style={
                        !isLoading && otp && otp.length > 0
                          ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                          : { display: 'none' }
                      }
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              load={isLoading || isOtpSending}
              style={isOtpSent ? 'white' : undefined}
              type="submit"
              disabled={!isValid}
            >
              {isOtpSent ? 'Войти' : 'Продолжить'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
