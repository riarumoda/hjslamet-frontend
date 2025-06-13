import type { LucideIcon } from "lucide-react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice: number | null
  images: string[]
  imageAlt?: string
  isNew: boolean
  discount: number
  category: string
  stock: number
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
  invoiceId: string
  memberId: string
  items: OrderItem[]
  total: number
  status: "PROSES" | "DIKIRIM" | "SELESAI" | "DIBATALKAN"
  createdAt: string
  updatedAt: string
}

export interface CheckoutRequest {
  member: string
  customerAddress: string
  totalAmount: number
  status: "PROSES" | "DIKIRIM" | "SELESAI"
  checkoutDetailRequests: CheckoutDetailRequest[]
}

export interface CheckoutDetailRequest {
  productId: string
  qty: number
  subtotal: number
  notes: string
}

export interface OrderItem {
  productId: string
  productName: string
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

export interface Token {
  token: string;
  refreshToken: string;
  tokenExpiration: number; // Timestamp in milliseconds
}