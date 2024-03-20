'use client';

import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

import Link from 'next/link';
import Image from 'next/image';

import scss from '@/components/scss/logo.module.scss';

interface Props {
  src: string | StaticImport;
  alt: string;
  name?: string;
  color?: string;
  width?: number;
  height?: number;
  outline?: boolean;
}

export default function Logo({ src, alt, name, color, width, height, outline }: Props) {
  return (
    <>
      <Link className={scss.logo_wrapper} href="/">
        <div
          className={
            outline ? `${scss.logo_container} ${scss.outline}` : scss.logo_container
          }
          style={{
            width: width || '40px',
            height: height || '40px',
          }}
        >
          <Image
            src={src}
            alt={alt}
            className={scss.logo}
            width={width}
            height={height}
          />
        </div>

        {name && (
          <span className={scss.name} style={color ? { color } : undefined}>
            {name}
          </span>
        )}
      </Link>
    </>
  );
}
