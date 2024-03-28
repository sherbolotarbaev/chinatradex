'use client';

import NavBar from '@/components/ui/navbar/navbar';

// import SessionProvider from '@/lib/providers/session.provider';
import ReduxProvider from '@/redux/provider';

import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Readonly<Props>) {
  return (
    <>
      <ReduxProvider>
        <NavBar />

        {/* <SessionProvider> */}
        {children}
        {/* </SessionProvider> */}
      </ReduxProvider>

      <Toaster richColors />
    </>
  );
}
