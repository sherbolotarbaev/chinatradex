import { siteConfig } from '@/config/site';

import { Suspense } from 'react';
import type { Metadata } from 'next';

import RootLayoutClient from './layout.uc';

import '@/components/scss/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  category: 'cargo',
  keywords: [
    'товары из Китая',
    'бизнес с Китаем',
    'карго',
    'chinatradex',
    'выкуп товаров из Китая',
    'доставка из Китая',
    'Alibaba',
    '1688',
    'Poizon',
    'Taobao',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body>
        <Suspense fallback={<span>Loading...</span>}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
      </body>
    </html>
  );
}
