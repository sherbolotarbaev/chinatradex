import type { Metadata } from 'next';

import ResetClient from './page.uc';

export const metadata: Metadata = {
  title: 'Сброс пароля',
};

export default async function Reset() {
  return <ResetClient />;
}
