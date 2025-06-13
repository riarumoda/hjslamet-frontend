"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";

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
import { getOrderSummaryById } from "@/lib/api";
import { formatRupiah } from "@/lib/currency";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { user, isLoading, member } = useAuth();
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

  const handleDownloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("------------ H.SLAMET SHOP ------------", 14, 10);

    doc.setFontSize(18);
    doc.text(`INVOICE #${order.invoiceId}`, 14, 18);

    doc.setFontSize(12);
    doc.text(`Date: ${formatDate(order.createdAt)}`, 14, 28);
    doc.text(`Status: ${order.status}`, 14, 36);

    doc.text(`Customer: ${member?.name || ""}`, 14, 46);
    doc.text(`Address: ${member?.address || ""}`, 14, 54);
    doc.text(`Phone: ${member?.pnumber || ""}`, 14, 62);

    doc.setFontSize(14);
    doc.text("Items:", 14, 74);

    let y = 82;
    order.items.forEach((item, idx) => {
      doc.setFontSize(12);
      doc.text(
        `${idx + 1}. ${item.productName} x${item.quantity} @ ${formatRupiah(
          item.price
        )} = ${formatRupiah(item.price * item.quantity)}`,
        16,
        y
      );
      y += 8;
    });

    y += 8;
    doc.setFontSize(14);
    doc.text(`Total: ${formatRupiah(order.total)}`, 14, y);

    doc.save(`invoice-${order.invoiceId}.pdf`);
  };

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
          <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
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
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-5">
                      <p className="font-medium">{formatRupiah(item.price)}</p>
                      <p className="text-sm text-muted-foreground">
                        Subtotal: {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
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
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatRupiah(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{member?.name || ""}</p>
                <p className="text-muted-foreground">{member?.address || ""}</p>
                <p className="text-muted-foreground">{member?.pnumber || ""}</p>
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
