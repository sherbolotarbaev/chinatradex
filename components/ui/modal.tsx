'use client';

import React from 'react';

import { CloseSvg } from '@/public/svg';
import scss from '@/components/scss/modal.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  handleOpen: () => void;
}

export default function Modal({ children, title, open, handleOpen }: Readonly<Props>) {
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('disabled');
    }

    return () => {
      document.body.classList.remove('disabled');
    };
  }, [open]);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={open ? `${scss.wrapper} ${scss.active}` : scss.wrapper}
        onClick={handleOpen}
      >
        <div className={scss.box} onClick={handleContentClick}>
          <div className={scss.head}>
            {title && <h2 className={scss.title}>{title}</h2>}

            <CloseSvg className={scss.close} onClick={handleOpen} />
          </div>

          <div className={scss.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
