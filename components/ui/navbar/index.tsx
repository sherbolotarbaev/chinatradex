'use client';

import React from 'react';

import { siteConfig } from '@/config/site';
import { useGetMeQuery } from '@/redux/api/me';

import NavLinks from './navlinks';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';
import Account from './account';

import websiteLogo from '@/public/logo.png';
import scss from '@/components/scss/navbar.module.scss';

export default function NavBar() {
  const { data: me, isLoading } = useGetMeQuery();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const burgerMenuRef = React.useRef<HTMLDivElement>(null);

  const handleOpenBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('disabled');
    }

    return () => {
      document.body.classList.remove('disabled');
    };
  }, [isOpen]);

  return (
    <>
      <div className={scss.navbar}>
        <div className={scss.content}>
          <Logo src={websiteLogo} alt={siteConfig.name} />

          <NavLinks handleOpen={handleOpenBurgerMenu} />
        </div>

        <div className={scss.right}>
          <Account />

          <Button width={120} adaptive redirect="/contact">
            Связаться
          </Button>

          {!me && !isLoading && (
            <Link href="/login" className={scss.auth_link}>
              Войти
            </Link>
          )}
        </div>

        <div className={scss.burger_menu} ref={burgerMenuRef}>
          <div
            className={isOpen ? `${scss.icon} ${scss.active}` : scss.icon}
            onClick={handleOpenBurgerMenu}
          >
            <div>
              <span></span>
              <span></span>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className={isOpen ? `${scss.menu} ${scss.active}` : `${scss.menu}`}
          >
            {me && !isLoading && <div className={scss.label}>Аккаунт</div>}

            <Account />

            <div className={scss.label}>Навигация</div>

            <NavLinks handleOpen={handleOpenBurgerMenu} />

            <Button adaptive redirect="/contact">
              Связаться
            </Button>

            {!me && !isLoading && (
              <Link href="/login" className={scss.auth_link}>
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
