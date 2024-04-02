'use client';

import { unbounded } from '@/lib/fonts';
import scss from '@/components/scss/page.module.scss';

export default function ContactClient() {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h2 className={scss.title} style={unbounded.style}>
            Свяжитесь с нами 😎
          </h2>
        </div>
      </section>
    </>
  );
}
