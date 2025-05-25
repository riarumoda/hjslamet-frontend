import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";
import AdminConditionalLayout from "../../components/admin-conditional-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard – H. Slamet",
  description: "Back office interface",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminConditionalLayout>{children}</AdminConditionalLayout> 
  );
}
