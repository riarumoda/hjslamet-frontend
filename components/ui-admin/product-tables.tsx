import { formatRupiah } from '@/lib/currency';
import Link from 'next/link';
import React from 'react'
import { Product } from "@/types";

interface ProductTablesProps {
    products: Product[];
    onDeleteProduct: (productId: string,) => void;
}

const ProductTables: React.FC<ProductTablesProps> = ({ products, onDeleteProduct }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Discount</th>
                <th scope="col" className="px-6 py-3">oldPrice</th>
                <th scope="col" className="px-6 py-3">Stock</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >

                    <td scope="col" className="px-6 py-3 flex justify-center">
                        <img width={68} src={product.images[0]} alt={product.imageAlt}/>
                    </td>
                    <td scope="row" className="px-6 py-4 max-w-[250px] truncate overflow-hidden text-ellipsis font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.name}
                    </td>

                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{formatRupiah(product.price)}</td>
                    <td className="px-6 py-4">{product.discount.toFixed(0)}%</td>
                    <td className="px-6 py-4">{product.oldPrice !== null ? formatRupiah(product.oldPrice) : "-"}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                        <Link href={`./products/edit/${product.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                        <button onClick={() => onDeleteProduct(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                    </td>
                    </tr>
            ))}
            </tbody>
        </table>
  )
}

export default ProductTables