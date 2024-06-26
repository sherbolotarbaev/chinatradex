'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { ArrowSvg } from '@/public/svg';
import scss from '@/components/scss/dropdown.module.scss';

export type TListItem = {
  path: string;
  name: string;
  info?: string;
  tag?: string;
};

interface Props {
  list: TListItem[];
  title: string;
}

export default function Dropdown({ list, title }: Readonly<Props>) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dropdownMenuRef = React.useRef<HTMLDivElement>(null);

  const handleOpenDropdownList = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
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
        className={isOpen ? `${scss.wrapper} ${scss.active}` : scss.wrapper}
        onClick={(e) => e.stopPropagation()}
        ref={dropdownMenuRef}
      >
        <div className={scss.title} onClick={handleOpenDropdownList}>
          {title}

          <ArrowSvg className={scss.icon} />
        </div>

        {list.length > 0 && (
          <div className={scss.menu}>
            <div className={scss.list}>
              {list.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className={
                    pathname === item.path ? `${scss.link} ${scss.active}` : scss.link
                  }
                >
                  <h2 className={scss.name}>
                    {item.name}

                    {item.tag && <span className={scss.tag}>{item.tag}</span>}
                  </h2>

                  {item.info && <span className={scss.info}>{item.info}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
