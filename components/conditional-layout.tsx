"use client";

import { usePathname } from "next/navigation";
import React from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return (
      <main className="">
        {children}
      </main>
    );
  }

  // Default site layout
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
        <SiteHeader />
            <main className="flex flex-col items-center justify-center">
                {children}
            </main>
        <SiteFooter />
    </div>

  );
}
