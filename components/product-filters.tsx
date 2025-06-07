"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { formatRupiah } from "@/lib/currency";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [openCategories, setOpenCategories] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Tambahkan state ini

  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { id: "MAKANAN", label: "Food" },
    { id: "MINUMAN", label: "Beverages" },
    { id: "BAHAN_BAKU", label: "Raw Stockpiles" },
    { id: "KEBUTUHAN_DAPUR", label: "Kitchen Supplies" },
    { id: "KOSMETIK", label: "Cosmetics" },
    { id: "LAINNYA", label: "Others" },
  ];

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("min", priceRange[0].toString());
    params.set("max", priceRange[1].toString());
    router.push(`/products?${params.toString()}`);
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => {
            setPriceRange([0, 100000]);
            setSelectedCategory(null);
            router.replace("/products");
          }}
        >
          Clear All Filters
        </Button>
      </div>

      <Collapsible open={openCategories} onOpenChange={setOpenCategories}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Categories
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openCategories ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id.toLowerCase()}`}
                  checked={selectedCategory === category.id}
                  onCheckedChange={(checked) => {
                    setSelectedCategory(checked ? category.id : null);
                    const params = new URLSearchParams(searchParams.toString());
                    checked
                      ? params.set("category", category.id)
                      : params.delete("category");
                    router.push(`/products?${params.toString()}`);
                  }}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openPrice} onOpenChange={setOpenPrice}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
          Price Range
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openPrice ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <div className="space-y-4">
            <Slider
              defaultValue={[0, 100000]}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">{formatRupiah(priceRange[0])}</span>
              <span className="text-sm">{formatRupiah(priceRange[1])}</span>
            </div>
            <Button size="sm" className="w-full" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// function Star(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   )
// }
