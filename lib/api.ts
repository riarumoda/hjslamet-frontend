import type { Product, Category, PaymentConfirmation } from "@/types"
import { Headphones, Shirt, Home, BookOpen, Gamepad, Smartphone, Watch, Laptop } from "lucide-react"

// Import product images from assets folder
// This makes it easy for developers to replace with real images from backend
const ASSET_PREFIX = "/assets/products"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    price: 129.99,
    oldPrice: 159.99,
    image: `${ASSET_PREFIX}/headphones.jpg`,
    imageAlt: "Wireless Bluetooth Headphones",
    isNew: true,
    discount: 20,
    category: "electronics",
    brand: "SoundWave",
    quantity: 123456,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this advanced smart fitness tracker.",
    price: 79.99,
    oldPrice: 99.99,
    image: `${ASSET_PREFIX}/fitness-tracker.jpg`,
    imageAlt: "Smart Fitness Tracker",
    isNew: false,
    discount: 15,
    category: "electronics",
    brand: "FitTech",
    quantity: 123456,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly organic cotton t-shirt.",
    price: 24.99,
    oldPrice: null,
    image: `${ASSET_PREFIX}/tshirt.jpg`,
    imageAlt: "Organic Cotton T-Shirt",
    isNew: false,
    discount: 0,
    category: "clothing",
    brand: "EcoWear",
    quantity: 123456,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description: "Durable stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34.99,
    oldPrice: 39.99,
    image: `${ASSET_PREFIX}/water-bottle.jpg`,
    imageAlt: "Stainless Steel Water Bottle",
    isNew: false,
    discount: 10,
    category: "home",
    brand: "HydroLife",
    quantity: 123456,
  },
  {
    id: "5",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29.99,
    oldPrice: null,
    image: `${ASSET_PREFIX}/charging-pad.jpg`,
    imageAlt: "Wireless Charging Pad",
    isNew: true,
    discount: 0,
    category: "electronics",
    brand: "PowerUp",
    quantity: 123456,
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    description: "Stylish and practical leather crossbody bag with multiple compartments.",
    price: 59.99,
    oldPrice: 79.99,
    image: `${ASSET_PREFIX}/crossbody-bag.jpg`,
    imageAlt: "Leather Crossbody Bag",
    isNew: false,
    discount: 25,
    category: "accessories",
    brand: "LuxStyle",
    quantity: 123456,
  },
  {
    id: "7",
    name: "Smart Home Security Camera",
    description: "HD security camera with motion detection and night vision.",
    price: 89.99,
    oldPrice: 119.99,
    image: `${ASSET_PREFIX}/security-camera.jpg`,
    imageAlt: "Smart Home Security Camera",
    isNew: false,
    discount: 25,
    category: "electronics",
    brand: "SecureTech",
    quantity: 123456,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 ceramic coffee mugs in assorted colors.",
    price: 24.99,
    oldPrice: null,
    image: `${ASSET_PREFIX}/mug-set.jpg`,
    imageAlt: "Ceramic Coffee Mug Set",
    isNew: false,
    discount: 0,
    category: "home",
    brand: "HomeEssentials",
    quantity: 123456,
  },
]

// Mock data for categories
const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    productCount: 42,
    icon: Smartphone,
    image: `${ASSET_PREFIX}/categories/electronics.jpg`,
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Fashionable apparel for all occasions",
    productCount: 56,
    icon: Shirt,
    image: `${ASSET_PREFIX}/categories/clothing.jpg`,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    description: "Everything you need for your home",
    productCount: 38,
    icon: Home,
    image: `${ASSET_PREFIX}/categories/home.jpg`,
  },
  {
    id: "books",
    name: "Books",
    description: "Bestsellers and literary classics",
    productCount: 24,
    icon: BookOpen,
    image: `${ASSET_PREFIX}/categories/books.jpg`,
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun for all ages",
    productCount: 31,
    icon: Gamepad,
    image: `${ASSET_PREFIX}/categories/toys.jpg`,
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart watches and fitness trackers",
    productCount: 18,
    icon: Watch,
    image: `${ASSET_PREFIX}/categories/wearables.jpg`,
  },
  {
    id: "computers",
    name: "Computers & Laptops",
    description: "Powerful computing solutions",
    productCount: 27,
    icon: Laptop,
    image: `${ASSET_PREFIX}/categories/computers.jpg`,
  },
  {
    id: "audio",
    name: "Audio",
    description: "Headphones, speakers, and sound systems",
    productCount: 22,
    icon: Headphones,
    image: `${ASSET_PREFIX}/categories/audio.jpg`,
  },
]

// Helper function to get image path or fallback to placeholder
export function getImagePath(path: string | null, width = 400, height = 400): string {
  if (!path) {
    return `/placeholder.svg?height=${height}&width=${width}`
  }

  // Check if the path is already a full URL or an absolute path
  if (path.startsWith("http") || path.startsWith("/placeholder")) {
    return path
  } 

  // Check if the file exists, if not, return a placeholder
  // In a real app, you'd check if the file exists on the server
  // For now, we'll just assume it exists
  return path
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API functions to fetch data
export async function getAllProducts(): Promise<Product[]> {
  // Simulate API call to Java backend
  await delay(500)
  return products
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API call to Java backend
  await delay(300)
  return products.slice(0, 4)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API call to Java backend
  await delay(200)
  return products.find((product) => product.id === id)
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  // Simulate API call to Java backend
  await delay(300)
  const product = products.find((p) => p.id === id)
  if (!product) return []

  return products
    .filter((p) => p.id !== id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4)
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API call to Java backend
  await delay(300)
  return categories
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  // Simulate API call to Java backend
  await delay(400)
  return products.filter((product) => product.category === categoryId)
}

// Function to connect to Java backend
export async function connectToJavaBackend(endpoint: string, method = "GET", data?: any) {
  // Replace with your actual Java backend URL
  const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || "http://localhost:8080/api"

  try {
    const response = await fetch(`${JAVA_BACKEND_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error connecting to Java backend:", error)
    throw error
  }
}

// Example of how to use the Java backend connection
export async function fetchProductsFromJavaBackend() {
  try {
    // This would be replaced with an actual call to your Java backend
    return await connectToJavaBackend("products")
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return products
  }
}

export async function createOrder(orderData: any) {
  try {
    return await connectToJavaBackend("orders", "POST", orderData)
  } catch (error) {
    console.error("Failed to create order:", error)
    throw error
  }
}

export async function submitPaymentConfirmation(data: PaymentConfirmation) {
  // Simulate API call to Java backend
  await delay(1000)

  // In a real app, this would send the data to your Java backend
  console.log("Payment confirmation submitted:", data)

  // Return a mock response
  return {
    success: true,
    message: "Payment confirmation received",
    confirmationId: "CONF-" + Date.now(),
  }
}
