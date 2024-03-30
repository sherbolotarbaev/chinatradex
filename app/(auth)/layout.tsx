import { siteConfig } from '@/config/site';

import Logo from '@/components/ui/logo';

import websiteLogo from '@/public/logo.png';
import scss from '@/components/scss/auth.module.scss';

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Readonly<Props>) {
  return (
    <>
      <section className={scss.wrapper}>
        <Logo src={websiteLogo} alt={siteConfig.name} width={60} height={60} />

        {children}
      </section>
    </>
  );
}
