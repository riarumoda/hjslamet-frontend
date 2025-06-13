"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { History, Menu, Moon, Search, ShoppingCart, Sun, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix theme toggle by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col items-center justify-center">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/products" className="text-lg font-semibold">
                Products
              </Link>
              <Link href="/categories" className="text-lg font-semibold">
                Categories
              </Link>
              <Link href="/about" className="text-lg font-semibold">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mx-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">H. Slamet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="font-medium transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          
          {user ? (
            <div className="relative group">
              <Link href="/account/orders">
              <Button variant="ghost" size="icon">
                <History className="h-5 w-5"/>
                <span className="sr-only">Orders</span>
              </Button>
              </Link>
            </div>
          ) : ""}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="relative group">
              <Link href="/account/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              </Link>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
