import Image from "next/image";
const TableProducts = (props) => {
  const { nameProduct, sizeProduct, colorProduct, price, photoProduct } = props;
  return (
    <table className="w-full m-6 border-gray-300 border-l-0 border-r-0 border-t-0">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b "></th>
          <th className="py-2 px-4 border-b">Product</th>
          <th className="py-2 px-4 border-b">Price</th>
          <th className="py-2 px-4 border-b">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="py-2 border-b justify-center">
            <label>
              <input type="checkbox" className="checkbox bg-orange-600" />
            </label>
          </th>
          <td className="border-b justify-center">
            <div className="flex flex-row items-center ">
              <div className="avatar w-20 h-20">
                <Image src={photoProduct} alt="Avatar Tailwind CSS Component" />
              </div>
              <div className="ml-3">
                <div className="font-bold">{nameProduct}</div>
                <div className="text-sm opacity-50">
                  {sizeProduct}, {colorProduct}
                </div>
              </div>
            </div>
          </td>
          <td className="py-2 border-b text-center">
            Rp{" "}
            {price.toLocaleString("id-ID", {
              styles: "currency",
              currency: "IDR",
            })}
          </td>
          <td className="py-2 border-b text-center">
            <button
              id="decrement"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
            >
              -
            </button>
            <label> 1 </label>
            <button
              id="increment"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-r"
            >
              +
            </button>
          </td>
        </tr>
        <tr>
          <th className="py-2 border-b justify-center">
            <label>
              <input type="checkbox" className="checkbox bg-orange-600" />
            </label>
          </th>
          <td className="border-b justify-center">
            <div className="flex flex-wrap items-center ">
              <div className="avatar w-20 h-20">
                <Image src={photoProduct} alt="Avatar Tailwind CSS Component" />
              </div>
              <div className="ml-3">
                <div className="font-bold">{nameProduct}</div>
                <div className="text-sm opacity-50">
                  {sizeProduct}, {colorProduct}
                </div>
              </div>
            </div>
          </td>
          <td className="py-2 border-b text-center">
            Rp{" "}
            {price.toLocaleString("id-ID", {
              styles: "currency",
              currency: "IDR",
            })}
          </td>
          <td className="py-2 border-b text-center">
            <button
              id="decrement"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
            >
              -
            </button>
            <label> 1 </label>
            <button
              id="increment"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-r"
            >
              +
            </button>
          </td>
        </tr>
        <tr>
          <th className="py-2 border-b justify-center">
            <label>
              <input type="checkbox" className="checkbox bg-orange-600" />
            </label>
          </th>
          <td className="border-b justify-center">
            <div className="flex flex-wrap items-center ">
              <div className="avatar w-20 h-20">
                <Image src={photoProduct} alt="Avatar Tailwind CSS Component" />
              </div>
              <div className="ml-3">
                <div className="font-bold">{nameProduct}</div>
                <div className="text-sm opacity-50">
                  {sizeProduct}, {colorProduct}
                </div>
              </div>
            </div>
          </td>
          <td className="py-2 border-b text-center">
            Rp{" "}
            {price.toLocaleString("id-ID", {
              styles: "currency",
              currency: "IDR",
            })}
          </td>
          <td className="py-2 border-b text-center">
            <button
              id="decrement"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
            >
              -
            </button>
            <label> 1 </label>
            <button
              id="increment"
              className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-r"
            >
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default TableProducts;
