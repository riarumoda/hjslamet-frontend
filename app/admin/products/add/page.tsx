"use client";

import { toast } from 'sonner'; 
import ProductForm from '@/components/ui-admin/product-form';
import { fetchData } from '@/lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AddProdcutPage() {
    const router = useRouter()

    const handleCreateProduct = async (formData: any) => {
        try {
            if (formData.category == "") {
                toast.error("Please select category", {
                    position:"top-right"
                })
                return;
            }

            const result = await fetchData("products", true, "POST", formData)
            toast.promise(result, {
                position:"top-right",
                loading: 'Loading...',
                success: "Product added successfully.",
                error: 'Error',
            });          
            router.push("/admin/products")
        } catch (error: any) {
            toast.error("Failed add product.", {
            richColors: true,
            position: "top-right",
            });
            console.log(error);
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Add New Product</h1>
            </div>

            <div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-6'>
                <h1 className='text-left text-lg'>Product Information</h1>
                <ProductForm onSubmit={handleCreateProduct} />
            </div>
        </div>
  )
}
