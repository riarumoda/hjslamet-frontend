import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { getLatestProducts } from "@/lib/api";

export default async function Home() {
  const featuredProducts = await getLatestProducts();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section
      className="bg-cover bg-no-repeat w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center"
      // style={{ backgroundImage: "url('assets/shop.jpg')" }}
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to H. Slamet’s<br />
                  Where Essentials Meet Great Deals
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From rice to toothpaste 
                  everything your home needs, in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                <img
                  className="relative rounded-lg h-full w-full object-cover text-gray-400"
                  src="assets/GambarPromo.png"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background px-4 py-2 rounded-full shadow-lg bg-red-500 text-white">
                  <p className="font-medium text-center">
                    Crazy Deals! Limited Time Only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Latest Products
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Check out our most latest items handpicked for you
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
