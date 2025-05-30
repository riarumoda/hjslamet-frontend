"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Package, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?returnUrl=/account");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const accountSections = [
    {
      title: "Personal Information",
      description: "View and update your personal information",
      icon: User,
      href: "/account/profile",
    },
    {
      title: "Order History",
      description: "View your past orders and track current orders",
      icon: Package,
      href: "/account/orders",
    },
    {
      title: "Addresses",
      description: "Manage your shipping and billing addresses",
      icon: MapPin,
      href: "/account/addresses",
    },
    {
      title: "Account Settings",
      description: "Update your preferences and security settings",
      icon: Settings,
      href: "/account/settings",
    },
  ];

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {accountSections.map((section) => (
          <Link key={section.href} href={section.href} className="block">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="p-2 bg-primary/10 rounded-md">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Orders</CardTitle>
            <CardDescription>
              Track and manage your recent purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            {[
              {
                id: "ORD-12345",
                date: "May 15, 2023",
                status: "Delivered",
                total: "$129.99",
                items: 2,
              },
              {
                id: "ORD-12346",
                date: "May 28, 2023",
                status: "Processing",
                total: "$79.99",
                items: 1,
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items} items
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <Link href={`/account/orders/${order.id}`}>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/account/orders" className="w-full">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
