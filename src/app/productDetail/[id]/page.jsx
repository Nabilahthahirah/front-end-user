import ProductCart from '@/components/productDetail/ProductCart';
import ProductImage from '@/components/productDetail/ProductImage';
import ProductInfo from '@/components/productDetail/ProductInfo';
import fetchWithTokenClient from '@/lib/fetchWithTokenClient';
import Image from "next/image";

export default async function ProductDetail({params}) {
  const res = await fetchWithTokenClient(`api/products/${params.id}`,  "GET", {cache: "no-store"});
  
  return (
    <>
    <div className='items-center justify-center h-screen'>
      <div className="flex flex-row gap-2 p-5">
        <div className="basis-1/2"><ProductImage productDetail = {res.data} /></div>
        <div className="basis-1/2"><ProductInfo productDetail = {res.data} /></div>
        <div className="basis-1/4"><ProductCart productDetail = {res.data} /></div>
      </div>
    </div>
    </>
  )
}
