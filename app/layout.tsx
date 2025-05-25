import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import { Sonner } from "@/components/ui/sonner";
import ConditionalLayout from "@/components/conditional-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "H. Slamet - Quality Products",
  description: "Shop quality products at H. Slamet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
              <Sonner />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
