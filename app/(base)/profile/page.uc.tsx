'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { errorNotification } from '@/lib/notification';
import { useGetMeQuery } from '@/redux/api/me';
import { useUploadPhotoMutation } from '@/redux/api/upload';

import Image from 'next/image';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import EditForm from '@/components/ui/form/edit.form';

import { PhotoSvg, EditSvg, EmailSvg, LocationSvg, PhoneSvg } from '@/public/svg';
import scss from '@/components/scss/profile.module.scss';

interface Props {
  me?: User;
}

export default function ProfileClient({ me }: Readonly<Props>) {
  const router = useRouter();

  const { refetch } = useGetMeQuery();

  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

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

  if (!me) return null;

  return (
    <>
      <Modal
        title="Редактировать профиль"
        open={isEditModalOpen}
        handleOpen={handleOpenEditModal}
      >
        <EditForm me={me} handleOpen={handleOpenEditModal} />
      </Modal>

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
                isUploading ? `${scss.photo_wrapper} ${scss.load}` : scss.photo_wrapper
              }
            >
              <Image
                src={me.photo || 'https://cdn-icons-png.freepik.com/512/552/552721.png'}
                alt={`${me.firstName} ${me.lastName}`}
                className={scss.photo}
                width={500}
                height={500}
                loading="lazy"
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

          <div className={scss.text}>
            <h2 className={scss.title}>
              {me.firstName} {me.lastName}
              <Button
                width={152}
                style="white"
                size="small"
                onClick={handleOpenEditModal}
                icon={{
                  svg: <EditSvg />,
                  position: 'left',
                }}
              >
                Изменить профиль
              </Button>
            </h2>

            <span className={scss.location}>
              <LocationSvg className={scss.icon} />

              {me.metaData.length && `${me.metaData[0].city}, ${me.metaData[0].country}`}
            </span>

            <span className={scss.email}>
              <EmailSvg className={scss.icon} />
              {me.email}
            </span>

            {me.phone && (
              <span className={scss.phone}>
                <PhoneSvg className={scss.icon} />
                {me.phone}
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
