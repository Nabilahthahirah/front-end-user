import React from 'react'
import Image from 'next/image';

export default function ProductImage({productDetail}) {
  console.log(productDetail);
  return (
    <div className='border-solid border-2 border-sky-500 w-full h-50'>
      <Image src={'https://pixabay.com/get/gc8da1e480dc4172c398424f7d4ad2148305b6170f3e089b0379a4ccd41cca206147b2a724554070a8d63737849d9a345b4cfc308e4a65c07d562451f7778fcab_1920.jpg'}   
        width={500}
        height={500}
        alt={'productDetail'} 
      />
    </div>
  )
}
