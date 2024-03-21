import type { Metadata } from 'next';

import AboutClient from './page.uc';

export const metadata: Metadata = {
  title: 'О нас',
};

export default async function About() {
  return <AboutClient />;
}
