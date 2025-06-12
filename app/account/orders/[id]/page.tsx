"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import type { Order } from "@/types";
import { fetchData, getOrderSummaryById } from "@/lib/api";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth/login?returnUrl=/account/orders/${params.id}`);
    }
  }, [user, isLoading, router, params.id]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderSummaryById(user?.id || "");

        const mockOrder: Order = res.find(
          (order: Order) => order.invoiceId === params.id
        );

        setOrder(mockOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoadingOrder(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [user, params.id]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "DIKIRIM":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "PROSES":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading || isLoadingOrder) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !order) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Order not found</p>
        <Link href="/account/orders">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/account/orders">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Order #{order.invoiceId}
          </h1>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items included in your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded"></div>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Track the status of your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l pl-6 pb-6">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="mb-8">
                  <h3 className="font-medium">Order Placed</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="mt-2">
                    Your order has been placed successfully.
                  </p>
                </div>

                <div className="absolute left-0 top-24 w-6 h-6 rounded-full bg-primary flex items-center justify-center -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="mb-8">
                  <h3 className="font-medium">Payment Confirmed</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(
                      new Date(
                        new Date(order.createdAt).getTime() + 1000 * 60 * 30
                      ).toISOString()
                    )}
                  </p>
                  <p className="mt-2">Your payment has been confirmed.</p>
                </div>

                <div className="absolute left-0 top-48 w-6 h-6 rounded-full bg-primary flex items-center justify-center -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="mb-8">
                  <h3 className="font-medium">Order Shipped</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(
                      new Date(
                        new Date(order.createdAt).getTime() +
                          1000 * 60 * 60 * 24
                      ).toISOString()
                    )}
                  </p>
                  <p className="mt-2">
                    Your order has been shipped via Express Delivery.
                  </p>
                  <div className="mt-2 p-3 bg-muted rounded-md flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Tracking Number</p>
                      <p className="text-sm">TRK123456789</p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-96 w-6 h-6 rounded-full bg-primary flex items-center justify-center -translate-x-1/2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="font-medium">Order Delivered</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.updatedAt)}
                  </p>
                  <p className="mt-2">
                    Your order has been delivered successfully.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(order.total - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Included</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">123 Main Street</p>
                <p className="text-muted-foreground">Apt 4B</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <p className="text-muted-foreground">United States</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Card</span>
                  <span>•••• 4242</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-600 dark:text-green-400">
                    Paid
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Need Help? Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
