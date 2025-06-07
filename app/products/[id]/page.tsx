"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ProductCard from "@/components/product-card";
import LoginPrompt from "@/components/login-prompt";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { getProductById, getRelatedProducts, getImagePath } from "@/lib/api";
import type { Product } from "@/types";
import { formatRupiah } from "../../../lib/currency";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";
  const { user, isLoading: authLoading, member } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
          const related = await getRelatedProducts(id);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
        richColors: true,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, quantity });
      router.push("/cart");
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="container py-12 text-center">Product not found</div>;
  }

  if (!user && !member) {
    console.log("User: ", user);
    console.log("Member: ", member);
    return <LoginPrompt returnUrl={`/products/${params.id}`} />;
  }

  // Get image paths with fallbacks
  const mainImageSrc = getImagePath(product.images[0], 600, 600);
  const imageAlt = product.imageAlt || product.name;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={mainImageSrc || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={product.images[i] || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${i}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  <span>{product.stock} items left</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {formatRupiah(product.price)}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatRupiah(product.oldPrice)}
                </p>
              )}
            </div>
            <Separator />
            <div>
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <Separator />
            <div>
              <h2 className="font-medium mb-2">Quantity</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
