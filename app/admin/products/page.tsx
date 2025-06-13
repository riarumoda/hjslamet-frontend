"use client";

import ProductTables from '@/components/ui-admin/product-tables'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Product } from "@/types";
import { fetchData } from '@/lib/api';
import { getAllProducts } from '@/lib/api';
import DeleteConfirmation from '@/components/ui-admin/modal-confirmation';
import { toast } from 'sonner';

export default function ProductsPage() {
  const router = useRouter()
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleDeleteClick = (productId: string,) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProductId) {
      try {
        const result = await fetchData(`products/${selectedProductId}`, true, "DELETE")
        toast.promise(result, {
            position:"top-right",
            loading: 'Loading...',
            success: "Delete product successfully.",
            error: 'Something went wrong!',
        });  
        getAllProducts().then(setProducts)
      } catch (error) {
        toast.error("Something went wrong!", {
          position: "top-right",
        });
      }
      closeModal();
    }
  };

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  return (
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Products</h1>
          <div>
            <button onClick={() => router.push("./products/add")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product</button>
          </div>
        </div>

        {/* card wrapper */}
        <div className='w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-6'>
            {/* card header */}
            <div className='flex justify-between items-center space-x-6 w-full'>              
              <form className="w-full">   
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                      <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  </div>
              </form>
            </div>

            {/* card table */}
            <div className='mt-6'>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <ProductTables products={products} onDeleteProduct={handleDeleteClick}/>
              </div>
            </div>
        </div>

        {isModalOpen && (
        <DeleteConfirmation
          onDeleteConfirm={handleDeleteConfirm}
          onClose={closeModal}
          type={"product"}
        />
      )}
    </div>
  )
}
