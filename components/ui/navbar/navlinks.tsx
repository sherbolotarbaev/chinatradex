'use client';

import { usePathname } from 'next/navigation';

import Dropdown, { type TListItem } from './dropdown';
import Link from 'next/link';

import scss from '@/components/scss/navbar.module.scss';

type TLink = {
  name: string;
  path: string;
};

const links: TLink[] = [
  {
    name: 'О компании',
    path: '/about',
  },
  {
    name: 'Товары',
    path: '/products',
  },
  {
    name: 'Доставка',
    path: '/delivery',
  },
];

const dropdownList: TListItem[] = [
  {
    path: '/order/alibaba',
    name: 'Alibaba',
    info: 'Транснациональный конгломерат электронной коммерции',
    tag: 'НОВЫЙ',
  },
  {
    path: '/order/1688',
    name: '1688',
    info: 'Оптовая торговая площадка Alibaba',
  },
  {
    path: '/order/poizon',
    name: 'Poizon',
    info: 'Платформы Alibaba и Poizon',
  },
  {
    path: '/order/taobao',
    name: 'Taobao',
    info: 'Популярная китайская платформа электронной торговли между потребителями платформа',
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  if (!links.length) return null;

  return (
    <div className={scss.links}>
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.path}
          className={pathname === link.path ? `${scss.link} ${scss.active}` : scss.link}
        >
          {link.name}
        </Link>
      ))}

      <Dropdown list={dropdownList} title="Заказать" />
    </div>
  );
}
