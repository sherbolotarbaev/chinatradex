"use client";

import React from "react";

import { siteConfig } from "@/config/site";

import NavLinks from "./navlinks";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";

import websiteLogo from "@/public/logo.png";
import scss from "@/components/scss/navbar.module.scss";

export default function NavBar() {
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

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div className={scss.navbar}>
        <div className={scss.content}>
          <Logo src={websiteLogo} alt={siteConfig.name} />

          <NavLinks />
        </div>

        <div className={scss.right}>
          <Button adaptive redirect="/contact">
            Связаться
          </Button>
        </div>

        <div className={scss.burger_menu} ref={burgerMenuRef}>
          <div
            className={isOpen ? `${scss.icon} ${scss.active}` : scss.icon}
            onClick={handleOpenBurgerMenu}>
            <div>
              <span></span>
              <span></span>
            </div>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className={isOpen ? `${scss.menu} ${scss.active}` : `${scss.menu}`}>
            <div className={scss.label}>Навигация</div>

            <NavLinks />

            <Button adaptive redirect="/contact">
              Связаться
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
