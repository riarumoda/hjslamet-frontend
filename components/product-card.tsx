"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { getImagePath } from "@/lib/api"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  // Get image path with fallback to placeholder
  const imageSrc = getImagePath(product.image, 400, 400)
  const imageAlt = product.imageAlt || product.name

  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">New</div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="font-medium">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-20">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full shadow-sm"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addToCart(product)
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </div>
    </div>
  )
}
