import type { Metadata } from 'next';

import ProductsClient from './page.uc';

export const metadata: Metadata = {
  title: 'Товары',
};

export default async function Products() {
  return <ProductsClient />;
}
