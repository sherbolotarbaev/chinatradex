'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { successNotification, errorNotification } from '@/lib/notification';
import { useEditMeMutation, useGetMeQuery } from '@/redux/api/me';

import Button from '@/components/ui/button/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

interface Props {
  me: User;
}

type FormData = {
  firstName: string;
  lastName: string;
};

export default function EditForm({ me }: Readonly<Props>) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      firstName: me.firstName,
      lastName: me.lastName,
    },
  });

  const [editMe, { isLoading }] = useEditMeMutation();
  const { refetch } = useGetMeQuery();

  const firstName = watch('firstName');
  const lastName = watch('lastName');

  const handleClearInput = (name: keyof FormData) => {
    setValue(name, '');
  };

  const handleError = (msg: string) => {
    errorNotification(msg);
    console.error(msg);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    try {
      await editMe(formData)
        .unwrap()
        .then(() => refetch());
      router.refresh();
      successNotification('Профиль успешно обновлен');
    } catch (error: any) {
      handleError(error.data.message || 'Что-то пошло не так');
    }
  };

  return (
    <>
      <div className={scss.form_wrapper} style={{ maxWidth: '100%' }}>
        <form className={scss.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={scss.inputs_container}>
            <div className={scss.input_container}>
              {errors.firstName ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.firstName.message}
                </span>
              ) : (
                <span className={scss.label}>Имя</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите имя"
                  {...register('firstName', {
                    required: 'Это поле является обязательным',
                    minLength: {
                      value: 2,
                      message: 'Имя должно содержать не менее 2 символов',
                    },
                    maxLength: {
                      value: 64,
                      message: 'Имя не может быть длиннее 64 символов',
                    },
                    pattern: {
                      value: /^[A-Za-zА-Яа-я]+$/,
                      message: 'Имя может содержать только буквы',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('firstName')}
                  style={
                    !isLoading && firstName && firstName.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <div className={scss.input_container}>
              {errors.lastName ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.lastName.message}
                </span>
              ) : (
                <span className={scss.label}>Фамилия</span>
              )}

              <div className={scss.input_wrapper}>
                <input
                  type="text"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите фамилию"
                  {...register('lastName', {
                    required: 'Это поле является обязательным',
                    minLength: {
                      value: 2,
                      message: 'Фамилия должна содержать не менее 2 символов',
                    },
                    maxLength: {
                      value: 64,
                      message: 'Фамилия не может быть длиннее 64 символов',
                    },
                    pattern: {
                      value: /^[A-Za-zА-Яа-я]+$/,
                      message: 'Фамилия может содержать только буквы',
                    },
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('lastName')}
                  style={
                    !isLoading && lastName && lastName.length > 0
                      ? { fontSize: '1.1rem', fill: 'var(--accent-8)' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>

            <Button type="submit" load={isLoading} disabled={!isValid || !isDirty}>
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
