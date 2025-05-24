"use client";

import NavbarAdmin from "@/components/ui-admin/navbar-admin";
import SidebarAdmin from "@/components/ui-admin/sidebar-admin";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function AdminConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/admin/auth";

  if (isAuthPage) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
        <NavbarAdmin drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        <SidebarAdmin drawerOpen={drawerOpen}/>
        <div className="p-4 sm:ml-64 mt-14">
          <main>
              {children}
          </main>
        </div>
    </>
  );
}   
