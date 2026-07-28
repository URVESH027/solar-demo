"use client";

import { ReactNode } from "react";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      {children}
    </>
  );
}
