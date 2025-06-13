"use client";
import { toast } from '@/components/ToastContainer';
import ProductForm from '@/components/ui-admin/product-form';
import { useAuth } from '@/hooks/use-auth';
import { fetchData } from '@/lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AddProdcutPage() {
    const router = useRouter()

    const handleCreateProduct = async (formData: any) => {
        try {
            if (formData.category == "") {
                toast({
                    message: "Please select category",
                    type: "error",
                    duration: 4000,
                });
                return;
            }

            await fetchData("products", true, "POST", formData)
            toast({
                message: "Success add product",
                type: "success",
                duration: 4000,
            })            

            router.push("/admin/products")
        } catch (error: any) {
            toast({
                message: "Failed add product",
                type: "error",
                duration: 4000,
            })
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
