"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Download, Eye, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import type { Order } from "@/types"

export default function OrdersPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login?returnUrl=/account/orders")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from your API
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        const mockOrders: Order[] = [
          {
            id: "ORD-12345",
            customerId: "user-1",
            items: [
              { productId: "1", name: "Wireless Bluetooth Headphones", price: 129.99, quantity: 1 },
              { productId: "4", name: "Stainless Steel Water Bottle", price: 34.99, quantity: 1 },
            ],
            total: 164.98,
            status: "delivered",
            createdAt: "2023-05-15T10:30:00Z",
            updatedAt: "2023-05-18T14:20:00Z",
            paymentStatus: "paid",
          },
          {
            id: "ORD-12346",
            customerId: "user-1",
            items: [{ productId: "2", name: "Smart Fitness Tracker", price: 79.99, quantity: 1 }],
            total: 79.99,
            status: "processing",
            createdAt: "2023-05-28T15:45:00Z",
            updatedAt: "2023-05-28T15:45:00Z",
            paymentStatus: "paid",
          },
          {
            id: "ORD-12347",
            customerId: "user-1",
            items: [
              { productId: "3", name: "Organic Cotton T-Shirt", price: 24.99, quantity: 2 },
              { productId: "6", name: "Leather Crossbody Bag", price: 59.99, quantity: 1 },
            ],
            total: 109.97,
            status: "shipped",
            createdAt: "2023-06-10T09:15:00Z",
            updatedAt: "2023-06-11T11:30:00Z",
            paymentStatus: "paid",
          },
          {
            id: "ORD-12348",
            customerId: "user-1",
            items: [{ productId: "8", name: "Ceramic Coffee Mug Set", price: 24.99, quantity: 1 }],
            total: 24.99,
            status: "cancelled",
            createdAt: "2023-06-20T16:20:00Z",
            updatedAt: "2023-06-21T10:15:00Z",
            paymentStatus: "refunded",
          },
        ]

        setOrders(mockOrders)
        setFilteredOrders(mockOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoadingOrders(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  useEffect(() => {
    // Filter orders based on search query and status filter
    let filtered = [...orders]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query)),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchQuery, statusFilter])

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (isLoading || isLoadingOrders) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>Track and manage your purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
                  All Orders
                </TabsTrigger>
                <TabsTrigger value="processing" onClick={() => setStatusFilter("processing")}>
                  Processing
                </TabsTrigger>
                <TabsTrigger value="shipped" onClick={() => setStatusFilter("shipped")}>
                  Shipped
                </TabsTrigger>
                <TabsTrigger value="delivered" onClick={() => setStatusFilter("delivered")}>
                  Delivered
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search orders..."
                    className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No orders found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                order.status,
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/account/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-muted rounded"></div>
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <p className="font-medium">Total</p>
                          <p className="font-bold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* The other tabs will use the same filtered content based on the status filter */}
            <TabsContent value="processing" className="mt-0">
              {/* Content will be filtered by the status filter state */}
            </TabsContent>
            <TabsContent value="shipped" className="mt-0">
              {/* Content will be filtered by the status filter state */}
            </TabsContent>
            <TabsContent value="delivered" className="mt-0">
              {/* Content will be filtered by the status filter state */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}