"use client";

import { ReactNode } from "react";
import LenisProvider from "@/components/layout/LenisProvider";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <PageLoader />
      <CustomCursor />
      {children}
    </LenisProvider>
  );
}
