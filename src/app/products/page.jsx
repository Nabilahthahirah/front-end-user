"use client"

import React, { useEffect, useState } from 'react';
import CardProduct from '@/components/products/cardProduct';
import FilterCategory from '@/components/products/filterCategory';
import fetchData from '@/lib/fetch';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

const Page = () => {
  // products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await fetchData('api/products', 'GET', {
          cache: 'no-store',
        });

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  // Category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await fetchData('api/category', 'GET', {
          cache: 'no-store',
        });
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className='m-4'>
      <div className="flex items-center justify-center py-4">
        <header className="text-primary text-3xl font-bold px-5 py-2.5 text-center">All Products</header>
      </div>
      <div className='flex'>
        <div className='flex-none w-1/6 p-4 border border-primary border-2 rounded-lg shadow-xl'>
          <div className="flex justify-between text-primary">
            <h3 className='text-xl font-semibold'>Filter</h3>
            <Link href="/products">
              <p className='hover:underline'>reset</p>
            </Link>
          </div>
          <h4 className='text-primary font-semibold mt-2'>Category</h4>
          <div className='mt-2 pl-4'>
            {categories.map(category => (
              <FilterCategory key={category.id} category={category} />
            ))}
          </div>
        </div>

        <div className='flex-auto w-5/6'>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 mb-8">
            {products.map(product => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
          <div className='flex justify-center text-center'>
            <Pagination />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
