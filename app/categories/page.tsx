import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories, getImagePath } from "@/lib/api"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="flex flex-col min-h-screen flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Browse our product categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {categories.map((category) => {
            // Get image path with fallback
            const imageSrc = category.image
              ? getImagePath(category.image, 400, 300)
              : "/placeholder.svg?height=300&width=400"

            return (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-48 bg-muted rounded-md relative overflow-hidden">
                    {category.image ? (
                      <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <category.icon className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{category.productCount} products available</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/products?category=${category.id}`} className="w-full">
                    <Button className="w-full">
                      Browse {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
