import type { Product, Category, PaymentConfirmation, Member, LoggedInUser } from "@/types"
import { CupSoda, Wheat, Utensils, ChefHat, Scissors, Ellipsis } from "lucide-react"

// Import product images from assets folder
// This makes it easy for developers to replace with real images from backend
const ASSET_PREFIX = "/assets/products"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    price: 129000.0,
    oldPrice: 159000.0,
    image: `${ASSET_PREFIX}/headphones.jpg`,
    imageAlt: "Wireless Bluetooth Headphones",
    isNew: true,
    discount: 20,
    category: "electronics",
    quantity: 123456,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this advanced smart fitness tracker.",
    price: 79000.0,
    oldPrice: 99000.0,
    image: `${ASSET_PREFIX}/fitness-tracker.jpg`,
    imageAlt: "Smart Fitness Tracker",
    isNew: false,
    discount: 15,
    category: "electronics",
    quantity: 123456,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly organic cotton t-shirt.",
    price: 24000.0,
    oldPrice: null,
    image: `${ASSET_PREFIX}/tshirt.jpg`,
    imageAlt: "Organic Cotton T-Shirt",
    isNew: false,
    discount: 0,
    category: "clothing",
    quantity: 123456,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description: "Durable stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34000.0,
    oldPrice: 39000.0,
    image: `${ASSET_PREFIX}/water-bottle.jpg`,
    imageAlt: "Stainless Steel Water Bottle",
    isNew: false,
    discount: 10,
    category: "home",
    quantity: 123456,
  },
  {
    id: "5",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29000.0,
    oldPrice: null,
    image: `${ASSET_PREFIX}/charging-pad.jpg`,
    imageAlt: "Wireless Charging Pad",
    isNew: true,
    discount: 0,
    category: "electronics",
    quantity: 123456,
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    description: "Stylish and practical leather crossbody bag with multiple compartments.",
    price: 59000.0,
    oldPrice: 79000.0,
    image: `${ASSET_PREFIX}/crossbody-bag.jpg`,
    imageAlt: "Leather Crossbody Bag",
    isNew: false,
    discount: 25,
    category: "accessories",
    quantity: 123456,
  },
  {
    id: "7",
    name: "Smart Home Security Camera",
    description: "HD security camera with motion detection and night vision.",
    price: 89000.0,
    oldPrice: 119000.0,
    image: `${ASSET_PREFIX}/security-camera.jpg`,
    imageAlt: "Smart Home Security Camera",
    isNew: false,
    discount: 25,
    category: "electronics",
    quantity: 123456,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 ceramic coffee mugs in assorted colors.",
    price: 24000.0,
    oldPrice: null,
    image: `${ASSET_PREFIX}/mug-set.jpg`,
    imageAlt: "Ceramic Coffee Mug Set",
    isNew: false,
    discount: 0,
    category: "home",
    quantity: 123456,
  },
]

// Mock data for categories
const categories: Category[] = [
  {
    id: "MAKANAN",
    name: "Food",
    description: "Finest Food Products You'll Ever Taste",
    productCount: 42,
    icon: Utensils,
    image: `${ASSET_PREFIX}/categories/electronics.jpg`,
  },
  {
    id: "MINUMAN",
    name: "Beverages",
    description: "Fresh Beverages You'll Ever Find",
    productCount: 56,
    icon: CupSoda,
    image: `${ASSET_PREFIX}/categories/clothing.jpg`,
  },
  {
    id: "BAHAN_BAKU",
    name: "Raw Stockpiles",
    description: "Everything you need for your cooking",
    productCount: 38,
    icon: Wheat,
    image: `${ASSET_PREFIX}/categories/home.jpg`,
  },
  {
    id: "KEBUTUHAN_DAPUR",
    name: "Kitchen Supplies",
    description: "Pepper, salt, and everything in between",
    productCount: 24,
    icon: ChefHat,
    image: `${ASSET_PREFIX}/categories/books.jpg`,
  },
  {
    id: "KOSMETIK",
    name: "Cosmetics",
    description: "Beauty and care products for everyone",
    productCount: 31,
    icon: Scissors,
    image: `${ASSET_PREFIX}/categories/toys.jpg`,
  },
  {
    id: "LAINNYA",
    name: "Others",
    description: "And many more. Go find something you like",
    productCount: 18,
    icon: Ellipsis,
    image: `${ASSET_PREFIX}/categories/wearables.jpg`,
  },
]

// Mock data for members
const membersData: Member[] = [
  {
    name: 'Gita Sekar Andarini',
    pnumber: '081234567890',
    address: 'Jl. Sakura No. 1, Jakarta',
    email: 'gita.andarini@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Angelina Christy',
    pnumber: '081323456789',
    address: 'Jl. Melati No. 5, Jakarta',
    email: 'angelina.christy@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Febriola Sinambela',
    pnumber: '081434567890',
    address: 'Jl. Mawar No. 3, Bandung',
    email: 'febriola.sinambela@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Freya Jayawardana',
    pnumber: '081545678901',
    address: 'Jl. Anggrek No. 10, Bekasi',
    email: 'freya.jayawardana@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Helisma Putri',
    pnumber: '081656789012',
    address: 'Jl. Flamboyan No. 9, Depok',
    email: 'helisma.putri@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Jessica Chandra',
    pnumber: '081767890123',
    address: 'Jl. Teratai No. 4, Tangerang',
    email: 'jessica.chandra@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Mutiara Azzahra',
    pnumber: '081878901234',
    address: 'Jl. Kenanga No. 6, Bogor',
    email: 'mutiara.azzahra@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Cornelia Vanisa',
    pnumber: '081989012345',
    address: 'Jl. Cempaka No. 8, Jakarta',
    email: 'cornelia.vanisa@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Fiony Alveria',
    pnumber: '082190123456',
    address: 'Jl. Bougenville No. 11, Bandung',
    email: 'fiony.alveria@jkt48.com',
    isBanned: false,
  },
  {
    name: 'Lulu Salsabila',
    pnumber: '082201234567',
    address: 'Jl. Kamboja No. 12, Bekasi',
    email: 'lulu.salsabila@jkt48.com',
    isBanned: true,
  },
];

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
  return await fetchProductsFromJavaBackend()
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
    .filter((p) => p.id !== id && (p.category === product.category))
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

export async function getMembers(): Promise<Member[]> {
  // Simulate API call to Java backend
  await delay(300)
  return membersData
}

// Function to connect to Java backend
export async function fetchData(endpoint: string, method = "GET", payload?: any, token?: string) {
  // Replace with your actual Java backend URL
  const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || "http://localhost:8080/api"

  try {
    const response = await fetch(`${JAVA_BACKEND_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { error: true, message: "Unauthorized", status: 401 };
      }
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
    return await fetchData("products")
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return []
  }
}

// Example of how to use the Java backend connection
export async function fetchAuthLoginFromJavaBackend() {
  try {
    // This would be replaced with an actual call to your Java backend
    return await fetchData("auth/login", "POST")
  } catch (error) {
    console.error("Failed to fetch login from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return []
  }
}

// Example of how to use the Java backend connection
export async function fetchAuthRegisterFromJavaBackend() {
  try {
    // This would be replaced with an actual call to your Java backend
    return await fetchData("auth/register", "POST")
  } catch (error) {
    console.error("Failed to fetch register from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return []
  }
}

export const dummyUser: LoggedInUser = {
  userId: "user123",
  name: "Aliya Raya",
  pnumber: "081121234321",
  email: "raliya04@rarea.com",
};

export async function createOrder(orderData: any) {
  try {
    return await fetchData("orders", "POST", orderData)
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
