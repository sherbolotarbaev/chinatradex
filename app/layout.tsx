import type { Metadata, Viewport } from 'next';

import { Suspense } from 'react';
import { siteConfig } from '@/config/site';

import Notifications from '@/components/ui/navbar/notifications';
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

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>
        <Notifications />

        <Suspense fallback={<span>Loading...</span>}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
      </body>
    </html>
  );
}
