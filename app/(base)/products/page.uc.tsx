'use client';

import scss from '@/components/scss/page.module.scss';

export default function ProductsClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h2 className={scss.title}>Товары 📦</h2>
        </div>
      </section>
    </>
  );
}
