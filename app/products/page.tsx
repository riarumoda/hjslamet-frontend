import { Suspense } from "react"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import ProductsLoading from "@/components/products-loading"
import { getAllProducts } from "@/lib/api"

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Browse our collection of products</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search products..." className="md:w-[200px] lg:w-[300px]" />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <ProductFilters />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <div className="hidden md:block">
            <ProductFilters />
          </div>
          <div>
            <Suspense fallback={<ProductsLoading />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
