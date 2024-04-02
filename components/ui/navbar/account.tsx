'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import { useGetMeQuery } from '@/redux/api/me';

import Image from 'next/image';
import Link from 'next/link';
import LogOutButton from '../button/logout.button';

import { ArrowSvg, UserSvg, CartSvg } from '@/public/svg';
import scss from '@/components/scss/account.module.scss';

type TLink = {
  name: string;
  path: string;
  icon?: React.ReactElement;
  count?: number;
};

const links: TLink[] = [
  {
    name: 'Профиль',
    path: '/profile',
    icon: <UserSvg className={scss.icon} />,
  },
  {
    name: 'Корзина',
    path: '/profile/cart',
    icon: <CartSvg className={scss.icon} />,
    count: 99,
  },
];

export default function Account() {
  const pathname = usePathname();

  const { data: me, isLoading } = useGetMeQuery();

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

  return me && !isLoading ? (
    <>
      <div
        className={isOpen ? `${scss.wrapper} ${scss.active}` : scss.wrapper}
        onClick={(e) => e.stopPropagation()}
        ref={accountMenuRef}
      >
        <div className={scss.user} onClick={handleOpenAccountMenu}>
          <div className={scss.photo_wrapper}>
            <Image
              src={me?.photo || 'https://cdn-icons-png.freepik.com/512/552/552721.png'}
              alt={`${me.firstName} ${me.lastName}`}
              className={scss.photo}
              width={250}
              height={250}
              loading="lazy"
            />
          </div>

          <span className={scss.display_name}>
            {me.firstName} {me.lastName[0]}.
          </span>

          <ArrowSvg className={scss.icon} />
        </div>

        <div className={scss.menu}>
          <div className={scss.list}>
            <span className={scss.email}>{me.email}</span>

            {links.length && (
              <div className={scss.links}>
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className={
                      pathname === link.path ? `${scss.link} ${scss.active}` : scss.link
                    }
                  >
                    {link.icon}

                    {link.name}

                    {link.count && <span className={scss.count}>{link.count}</span>}
                  </Link>
                ))}
              </div>
            )}

            <LogOutButton />
          </div>
        </div>
      </div>
    </>
  ) : isLoading ? (
    <>
      <div className={`${scss.wrapper} ${scss.load}`}>
        <div className={scss.user}>
          <div className={scss.photo_wrapper}></div>

          <span className={scss.display_name}></span>

          <ArrowSvg className={scss.icon} />
        </div>

        <div className={scss.menu}>
          <div className={scss.list}>
            <span className={scss.email}></span>

            {links.length && (
              <div className={scss.links}>
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className={
                      pathname === link.path ? `${scss.link} ${scss.active}` : scss.link
                    }
                  >
                    {link.name}

                    {link.count && <span className={scss.count}>{link.count}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
}
