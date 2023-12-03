import React from 'react'
import Image from 'next/image';

export default function ProductImage({productDetail}) {
  console.log(productDetail.product_detail);
  return (
    <div className='w-full h-full'>
      <Image src={productDetail.product_detail[0].photo}   
        alt={'productDetail'} 
        width={500}
        height={500}
        style={{objectFit: "cover"}}
      />
    </div>
  )
}
