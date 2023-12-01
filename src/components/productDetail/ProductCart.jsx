'use client'
import React from 'react'

export default function ProductCart({productDetail}) {

  const options = [];
  // Loop untuk membuat opsi dari 1 hingga 20
  for (let i = 1; i <= 10; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }


  return (
    <div>
      <p>Warna : {productDetail.product_detail.map((item, index) => {
        return (
          <div className="badge badge-info gap-2" key={index}>
            {item.color}
          </div>
        )
      })}</p>
      <p className='mb-5'>Berat : {productDetail.product_detail[0].weight} Kg</p>
      <p>Qty : </p>
      <select className="select select-bordered select-sm w-full max-w-xs">
        {options}
      </select>
      <button className="btn btn-success mt-5">Add To Cart</button>
    </div>
  )
}
