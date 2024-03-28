'use client';

import React from 'react';

import { CloseSvg } from '@/public/svg';
import scss from '@/components/scss/modal.module.scss';

interface Props {
  children: React.ReactNode;
  open: boolean;
  handleOpen: () => void;
}

export default function Modal({ children, open, handleOpen }: Readonly<Props>) {
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('disabled');
    }

    return () => {
      document.body.classList.remove('disabled');
    };
  }, [open]);

  return (
    <>
      <div
        className={open ? `${scss.wrapper} ${scss.active}` : scss.wrapper}
        onClick={handleOpen}
      >
        <div className={scss.box} onClick={(e) => e.stopPropagation()}>
          <div className={scss.head}>
            <CloseSvg className={scss.close} onClick={handleOpen} />
          </div>

          <div className={scss.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
