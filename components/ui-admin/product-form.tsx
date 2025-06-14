'use client';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ProductFormProps {
  initialValues?: Product | null;
  onSubmit: (formData: any) => void;
  mode?: 'create' | 'edit';
}

export default function ProductForm({ initialValues, onSubmit, mode = 'create' }: ProductFormProps) {
    const router = useRouter()

    const [name, setName] = useState(initialValues?.name || '');
    const [category, setCategory] = useState(initialValues?.category || '');
    const [price, setPrice] = useState(
        initialValues?.oldPrice != null ? initialValues.oldPrice.toString() : initialValues?.price.toString()
    );
    const [stock, setStock] = useState(initialValues?.stock.toString() || '');
    const [discount, setDiscount] = useState(initialValues?.discount || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [images, setImages] = useState<string[]>(initialValues?.images || []);

    const handleAddImage = () => setImages(prev => [...prev, '']);
    const handleChangeImage = (index: number, url: string) => {
        const updated = [...images];
        updated[index] = url;
        setImages(updated);
    };
    const handleRemoveImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            category,
            price: Number(price),
            stock: Number(stock),
            discount,
            description,
            images,
        });
    };

    return (
        <form className='mt-5' onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="Product-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input 
                        type="text" 
                        id="Product-name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Product Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="Category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select 
                        id="category" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Choose a category</option>
                        <option value="MAKANAN">Food</option>
                        <option value="MINUMAN">Bevarages</option>
                        <option value="BAHAN_BAKU">Raw Stockpiles</option>
                        <option value="KEBUTUHAN_DAPUR">Kitchen Supplies</option>
                        <option value="KOSMETIK">Cosmetic</option>
                        <option value="LAINNYA">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input 
                        type="number" 
                        id="Price" 
                        step={100} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                        placeholder="Price" 
                        value={price ?? ''} 
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                </div>  
                <div>
                    <label htmlFor="Stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input 
                        type="number" 
                        id="Stock" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                        placeholder="Stock" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)}
                        required />
                </div>
            </div>
            <div className='mb-6'>
                <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                <input 
                    type="number" 
                    id="discount" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder='Discount'
                    value={discount} 
                    onChange={(e) => setDiscount(e.target.value)}
                    />
            </div>                    
            <div className='mb-6'>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea 
                    id="message" 
                    rows={4} 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Write product description here..."
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className='mb-6'>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                {images.map((item, index) => (
                    <div key={index} className='flex items-center space-x-4 mb-2'>
                        <img className="h-auto max-w-24 rounded-lg" src="data:image/png;base64,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" alt="image description"/>
                    
                        <input type="text" id="small-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={item} onChange={(e) => handleChangeImage(index, e.target.value)} placeholder='Image URL'/>
                    
                        <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <   path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddImage} className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Image</button>
            </div>
            
            <div className='flex justify-between md:justify-end'>
                <button type="button" onClick={() => router.back()} className="w-40 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                <button type="submit" className="w-40 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
            </div>
        </form>
  );
}
