'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';
import { successNotification, errorNotification } from '@/lib/notification';
import { useEditMeMutation, useGetMeQuery } from '@/redux/api/me';
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import Button from '@/components/ui/button';

import { CloseSvg, ErrorSvg } from '@/public/svg';
import scss from '@/components/scss/form.module.scss';

interface Props {
  me: User;
  handleOpen: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
};

export default function EditForm({ me, handleOpen }: Readonly<Props>) {
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
      phone: me.phone ? me.phone : undefined,
    },
  });

  const [editMe, { isLoading }] = useEditMeMutation();
  const { refetch } = useGetMeQuery();

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const phone = watch('phone');

  const phoneInput = usePhoneInput({
    defaultCountry: 'kg',
    value: phone,
    onChange: (data) => setValue('phone', data.phone),
  });

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
      handleOpen();
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

            <div className={scss.input_container}>
              {errors.phone ? (
                <span className={scss.error}>
                  <ErrorSvg className={scss.icon} />
                  {errors.phone.message}
                </span>
              ) : (
                <span className={scss.label}>Номер телефона</span>
              )}

              <div className={scss.input_wrapper}>
                <CountrySelector
                  selectedCountry={phoneInput.country.iso2}
                  onSelect={(country) => phoneInput.setCountry(country.iso2)}
                  renderButtonWrapper={({ children, rootProps }) => (
                    <button
                      {...rootProps}
                      type="button"
                      className={
                        isLoading
                          ? `${scss.country_selector} ${scss.load}`
                          : scss.country_selector
                      }
                    >
                      {children}
                    </button>
                  )}
                />

                <input
                  type="tel"
                  disabled={isLoading}
                  className={isLoading ? `${scss.input} ${scss.load}` : scss.input}
                  placeholder="Введите номер телефона"
                  {...register('phone', {
                    required: 'Это поле является обязательным',
                    pattern: {
                      value:
                        /^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                      message: 'Неверный номер телефона',
                    },
                    value: phoneInput.phone,
                    onChange: (e) => phoneInput.handlePhoneValueChange(e),
                  })}
                />

                <CloseSvg
                  className={scss.clear}
                  onClick={() => handleClearInput('phone')}
                  style={
                    !isLoading && phone && phone.length > 0
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
