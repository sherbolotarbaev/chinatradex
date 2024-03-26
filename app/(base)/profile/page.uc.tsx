'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { errorNotification } from '@/lib/notification';
import { useGetMeQuery } from '@/redux/api/me';
import { useUploadPhotoMutation } from '@/redux/api/upload';

import Image from 'next/image';
import Button from '@/components/ui/button/button';

import { EditSvg, PhotoSvg } from '@/public/svg';
import scss from '@/components/scss/profile.module.scss';

export default function ProfileClient() {
  const router = useRouter();

  const { data: me, isLoading, refetch } = useGetMeQuery();

  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const [upload, { isLoading: isUploading }] = useUploadPhotoMutation();

  const handleUploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && me) {
      try {
        await upload({ file })
          .unwrap()
          .then(() => refetch());
        router.refresh();
      } catch (error: any) {
        errorNotification(error.data.message || 'Что-то пошло не так');
        console.error(error);
      }
    }
  };

  if (!me && !isLoading) {
    router.push('/login?next=/profile');
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
          <div className={scss.photo_container}>
            <div
              className={
                isUploading || isLoading
                  ? `${scss.photo_wrapper} ${scss.load}`
                  : scss.photo_wrapper
              }
            >
              <Image
                src={me?.photo || 'https://cdn-icons-png.freepik.com/512/552/552721.png'}
                alt={`${me?.firstName} ${me?.lastName}`}
                className={scss.photo}
                width={96}
                height={96}
              />
            </div>

            <Button
              width={128}
              style="white"
              size="small"
              onClick={() => fileRef.current?.click()}
              icon={{
                svg: <PhotoSvg />,
                position: 'left',
              }}
            >
              Изменить фото
            </Button>
          </div>
          <div className={isLoading ? `${scss.text} ${scss.load}` : scss.text}>
            <span className={scss.location}>
              {me?.metaData.length &&
                `${me?.metaData[0].city}, ${me?.metaData[0].country}`}
            </span>

            <h2 className={scss.title}>
              {me?.firstName} {me?.lastName}
              {me && (
                <Button
                  width={152}
                  style="white"
                  size="small"
                  disabled
                  icon={{
                    svg: <EditSvg />,
                    position: 'left',
                  }}
                >
                  Изменить профиль
                </Button>
              )}
            </h2>

            <span className={scss.email}>{me?.email}</span>
          </div>
        </div>
      </section>
    </>
  );
}
