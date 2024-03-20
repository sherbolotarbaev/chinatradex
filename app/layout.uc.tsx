"use client";

import NavBar from "@/components/ui/navbar/navbar";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: Readonly<Props>) {
  return (
    <>
      <NavBar />

      {children}

      <Toaster richColors />
    </>
  );
}
