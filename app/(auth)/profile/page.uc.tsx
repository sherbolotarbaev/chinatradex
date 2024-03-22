'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { errorNotification } from '@/lib/notification';
import { useGetMeQuery } from '@/redux/api/me';
import { useUploadPhotoMutation } from '@/redux/api/upload';

import Image from 'next/image';

import scss from '@/components/scss/profile.module.scss';

export default function ProfileClient() {
  const router = useRouter();

  const { data: me, isLoading } = useGetMeQuery();

  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const [upload, { isLoading: isUploading }] = useUploadPhotoMutation();

  const handleUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && me) {
      try {
        const data = await upload({ file }).unwrap();
        router.refresh();
      } catch (error: any) {
        errorNotification(error.data.message || 'Что-то пошло не так');
        console.error(error);
      }
    }
  };

  if (!me && !isLoading) {
    return null;
  }

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <input
            ref={fileRef}
            accept="image/jpeg,image/png,image/webp"
            type="file"
            hidden
            onChange={handleUploadPhoto}
          />

          <div
            className={
              isUploading ? `${scss.photo_wrapper} ${scss.load}` : scss.photo_wrapper
            }
            onClick={() => fileRef.current?.click()}
          >
            <Image
              src={
                me?.photo
                  ? me.photo
                  : 'https://cdn-icons-png.freepik.com/512/552/552721.png'
              }
              alt={`${me?.firstName} ${me?.lastName}`}
              className={scss.photo}
              width={40}
              height={40}
            />
          </div>

          <h2 className={scss.title}>
            Welcome, {me?.firstName} {me?.lastName}
          </h2>
        </div>
      </section>
    </>
  );
}
