import type { Metadata } from 'next';

import DeliveryClient from './page.uc';

export const metadata: Metadata = {
  title: 'Доставка',
};

export default async function Delivery() {
  return <DeliveryClient />;
}
