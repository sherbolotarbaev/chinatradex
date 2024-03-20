'use client';

import React from 'react';

import scss from '@/components/scss/account.module.scss';
import Image from 'next/image';

interface Props {
  me: User;
}

export default function Account({ me }: Readonly<Props>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const accountMenuRef = React.useRef<HTMLDivElement>(null);

  const handleOpenAccountMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={scss.account}
        onClick={(e) => e.stopPropagation()}
        ref={accountMenuRef}
      >
        <div className={scss.user} onClick={handleOpenAccountMenu}>
          {me.photo && (
            <div className={scss.photo_wrapper}>
              <Image
                src={me.photo}
                alt={`${me.firstName} ${me.lastName}`}
                className={scss.photo}
                width={40}
                height={40}
              />
            </div>
          )}

          <span className={scss.display_name}>
            {me.firstName} {me.lastName[0]}.
          </span>
        </div>

        <div className={isOpen ? `${scss.menu} ${scss.active}` : scss.menu}>
          <div className={scss.list}>
            <span className={scss.email}>{me.email}</span>

            <span className={scss.location}>
              📍 {me.metaData[0].city}, {me.metaData[0].country}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
