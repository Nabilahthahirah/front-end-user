import React from 'react'

export default function ProductCart() {

  const options = [];
  // Loop untuk membuat opsi dari 1 hingga 20
  for (let i = 1; i <= 15; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }


  return (
    <div>
      <p>Warna : </p>
      <p className='mb-5'>Berat : </p>
      <p>Qty : </p>
      <select className="select select-bordered select-sm w-full max-w-xs">
        {options}
      </select>
      <button className="btn btn-success mt-5">Add To Cart</button>
    </div>
  )
}
