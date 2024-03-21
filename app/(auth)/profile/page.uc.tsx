'use client';

import { useGetMeQuery } from '@/redux/api/me';

import scss from '@/components/scss/page.module.scss';

export default function ProfileClient() {
  const { data: me, isLoading } = useGetMeQuery();

  if (!me && !isLoading) {
    return null;
  }

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h2 className={scss.title}>{me?.firstName} {me?.lastName}</h2>
        </div>
      </section>
    </>
  );
}
