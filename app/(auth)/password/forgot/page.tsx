import type { Metadata } from 'next';

import ForgotClient from './page.uc';

export const metadata: Metadata = {
  title: 'Восстановление пароля',
};

export default async function Forgot() {
  return <ForgotClient />;
}
