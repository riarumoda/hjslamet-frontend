import type { Product, Category, PaymentConfirmation, Member, LoggedInUser, CheckoutRequest, Token } from "@/types"
import { CupSoda, Wheat, Utensils, ChefHat, Scissors, Ellipsis } from "lucide-react"
import {toast} from "sonner"

// Import product images from assets folder
// This makes it easy for developers to replace with real images from backend
const ASSET_PREFIX = "/assets"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    price: 129000.0,
    oldPrice: 159000.0,
    images: [`${ASSET_PREFIX}/headphones.jpg`],
    imageAlt: "Wireless Bluetooth Headphones",
    isNew: true,
    discount: 20,
    category: "electronics",
    stock: 123456,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with this advanced smart fitness tracker.",
    price: 79000.0,
    oldPrice: 99000.0,
    images: [`${ASSET_PREFIX}/fitness-tracker.jpg`],
    imageAlt: "Smart Fitness Tracker",
    isNew: false,
    discount: 15,
    category: "electronics",
    stock: 123456,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly organic cotton t-shirt.",
    price: 24000.0,
    oldPrice: null,
    images: [`${ASSET_PREFIX}/tshirt.jpg`],
    imageAlt: "Organic Cotton T-Shirt",
    isNew: false,
    discount: 0,
    category: "clothing",
    stock: 123456,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description: "Durable stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 34000.0,
    oldPrice: 39000.0,
    images: [`${ASSET_PREFIX}/water-bottle.jpg`],
    imageAlt: "Stainless Steel Water Bottle",
    isNew: false,
    discount: 10,
    category: "home",
    stock: 123456,
  },
  {
    id: "5",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29000.0,
    oldPrice: null,
    images: [`${ASSET_PREFIX}/charging-pad.jpg`],
    imageAlt: "Wireless Charging Pad",
    isNew: true,
    discount: 0,
    category: "electronics",
    stock: 123456,
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    description: "Stylish and practical leather crossbody bag with multiple compartments.",
    price: 59000.0,
    oldPrice: 79000.0,
    images: [`${ASSET_PREFIX}/crossbody-bag.jpg`],
    imageAlt: "Leather Crossbody Bag",
    isNew: false,
    discount: 25,
    category: "accessories",
    stock: 123456,
  },
  {
    id: "7",
    name: "Smart Home Security Camera",
    description: "HD security camera with motion detection and night vision.",
    price: 89000.0,
    oldPrice: 119000.0,
    images: [`${ASSET_PREFIX}/security-camera.jpg`],
    imageAlt: "Smart Home Security Camera",
    isNew: false,
    discount: 25,
    category: "electronics",
    stock: 123456,
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 ceramic coffee mugs in assorted colors.",
    price: 24000.0,
    oldPrice: null,
    images: [`${ASSET_PREFIX}/mug-set.jpg`],
    imageAlt: "Ceramic Coffee Mug Set",
    isNew: false,
    discount: 0,
    category: "home",
    stock: 123456,
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
    image: `${ASSET_PREFIX}/Category _ Food.png`,
  },
  {
    id: "MINUMAN",
    name: "Beverages",
    description: "Fresh Beverages You'll Ever Find",
    productCount: 56,
    icon: CupSoda,
    image: `${ASSET_PREFIX}/Category _ Beverages.png`,
  },
  {
    id: "BAHAN_BAKU",
    name: "Raw Stockpiles",
    description: "Everything you need for your cooking",
    productCount: 38,
    icon: Wheat,
    image: `${ASSET_PREFIX}/Category _ Raw Stockpiles.png`,
  },
  {
    id: "KEBUTUHAN_DAPUR",
    name: "Kitchen Supplies",
    description: "Pepper, salt, and everything in between",
    productCount: 24,
    icon: ChefHat,
    image: `${ASSET_PREFIX}/Category _ Kitchen Supplies.png`,
  },
  {
    id: "KOSMETIK",
    name: "Cosmetics",
    description: "Beauty and care products for everyone",
    productCount: 31,
    icon: Scissors,
    image: `${ASSET_PREFIX}/Category _ Cosmetics.png`,
  },
  {
    id: "LAINNYA",
    name: "Others",
    description: "And many more. Go find something you like",
    productCount: 18,
    icon: Ellipsis,
    image: `${ASSET_PREFIX}/Category _ Others.png`,
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
  return await fetchProductsFromJavaBackend()
}

export async function getLandingProducts(): Promise<Product[]> {
  // Simulate API call to Java backend
  return await fetchProductsLandingFromJavaBackend();
}

export async function getLatestProducts(): Promise<Product[]> {
  const allProducts = await getLandingProducts()
  
  return allProducts.filter((product) => product.isNew === true).slice(0, 4);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    return await fetchData("products/one/"+id, false)
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    return undefined
  }
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  const allProducts = await getLandingProducts()
  const product = allProducts.find((p) => p.id === id)
  if (!product) return []

  return allProducts
    .filter((p) => p.id !== id && (p.category === product.category))
    .slice(0, 4)
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API call to Java backend
  await delay(300)
  return categories
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    return await fetchData("products/category/"+categoryId, false)
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    return []
  }
}

export async function getProductsByPriceRange(min: number, max: number): Promise<Product[]> {
  try {
    return await fetchData("products/price/"+min.toString()+"/"+max.toString(), false)
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    return []
  }
}

export async function getProductsByName(name: string): Promise<Product[]> {
  try {
    return await fetchData("products/"+name, false);
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    return []
  }
}

export async function getMembers(): Promise<Member[]> {
  // Simulate API call to Java backend
  try {
    return await fetchData("user/all-member", true);
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    return []
  }
}

// Function to connect to Java backend
export async function fetchData(endpoint: string,  needToken: boolean, method = "GET", payload?: any,) {
  // Replace with your actual Java backend URL
  const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || "http://localhost:8080/api"

  let tokenObj: Token | undefined;
  if (needToken) {
    tokenObj = JSON.parse(localStorage.getItem('token') || '{}') as Token;

    // 1️⃣ cek expired
    if (Date.now() >= tokenObj.tokenExpiration ) {
      const refresh = await fetch('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: tokenObj.refreshToken })
      }).then(r => r.json()).catch(e => {

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('member');
        
        toast.error("Failed to refresh token. Please log in again.", {description: "Your session has expired. Please log in again.", richColors: true});
        return { error: true, message: "Failed to refresh token", status: 500 };
      });
      tokenObj = {
        token: refresh.token,
        refreshToken: refresh.refreshToken,
        tokenExpiration: refresh.expiration
      };
      localStorage.setItem('token', JSON.stringify(tokenObj));
    }
  }
  try {
    const response = await fetch(`${JAVA_BACKEND_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(needToken && tokenObj ? { Authorization: `Bearer ${tokenObj.token}` } : {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { error: true, message: "Unauthorized", status: 401 };
      }
      throw new Error(`Error: ${response.status} - ${response.json().then((data) => data.message || data.details || "Unknown error")}`);
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
    return await fetchData("products/admin", true)
  } catch (error) {
    console.error("Failed to fetch products from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return []
  }
}

export async function fetchProductsLandingFromJavaBackend() {
  try {
    // This would be replaced with an actual call to your Java backend
    return await fetchData("products", false)
  } catch (error) {
    console.error("Failed to fetch landing products from Java backend:", error)
    // Fallback to mock data if Java backend is not available
    return []
  }
}

// Example of how to use the Java backend connection
export async function fetchAuthLoginFromJavaBackend() {
  try {
    // This would be replaced with an actual call to your Java backend
    return await fetchData("auth/login", false, "POST")
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
    return await fetchData("auth/register", false, "POST")
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

export async function createOrder(checkoutData: CheckoutRequest) {
  try {
    return await fetchData("transaction/checkout", true, "POST", checkoutData)
  } catch (error) {
    console.error("Failed to create order:", error)
    throw error
  }
}

export async function getOrderSummaryById(memberId: string) {
  try {
    return await fetchData("transaction/orders/"+memberId, true, "GET", undefined)
  } catch (error) {
    console.error("Failed to fetch order summary:", error)
    throw error
  }
}

