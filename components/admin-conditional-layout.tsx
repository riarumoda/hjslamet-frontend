"use client";

import NavbarAdmin from "@/components/ui-admin/navbar-admin";
import SidebarAdmin from "@/components/ui-admin/sidebar-admin";
import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, admin, isLoading } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/admin/auth";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Redirect ke login jika belum login
  useEffect(() => {
    if (hasMounted && !isLoading && !isAuthPage && !user) {
      router.replace(`/admin/auth?returnUrl=${pathname}`);
    }
  }, [hasMounted, isLoading, isAuthPage, user, pathname, router]);

  // Jangan render apapun sampai mount selesai (hindari SSR mismatch)
  if (!hasMounted) return null;

  // Jika masih loading atau belum login, tampilkan loader
  if (!isAuthPage && (isLoading || (!user && !admin))) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Checking authentication...</span>
      </div>
    );
  }
  
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarAdmin drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <SidebarAdmin drawerOpen={drawerOpen} />
      <div className="p-4 sm:ml-64 mt-14">
        <main>{children}</main>
      </div>
    </>
  );
}
