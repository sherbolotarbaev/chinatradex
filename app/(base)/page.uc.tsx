'use client';

import scss from '@/components/scss/page.module.scss';

export default function HomeClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h2 className={scss.title}>Добро пожаловать 🚀</h2>
        </div>
      </section>
    </>
  );
}
