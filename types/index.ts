import type { LucideIcon } from "lucide-react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice: number | null
  image: string | null
  imageAlt?: string
  isNew: boolean
  discount: number
  category: string
  quantity: number
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  icon: LucideIcon
  image?: string
}

export interface Order {
  id: string
  customerId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
  paymentStatus: "unpaid" | "pending" | "paid" | "failed"
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface Customer {
  id: string
  name: string
  email: string
  address: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  index?: number
}

export interface PaymentConfirmation {
  orderId: string
  bankName: string
  accountName: string
  transferDate: string
  transferAmount: string
  notes?: string
  receiptImage?: File | null
}

export interface Member {
  name: string;
  pnumber: string;
  email: string;
  address: string;
  isBanned: boolean;
}

export interface LoggedInUser {
  userId: string;
  pnumber: string;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}