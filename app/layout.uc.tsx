'use client';

import NavBar from '@/components/ui/navbar';

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

        {children}
      </ReduxProvider>

      <Toaster richColors />
    </>
  );
}
