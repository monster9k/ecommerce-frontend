import { Star } from "lucide-react";

const ProductInfo = () => {
  return (
    <div>
      <h1 className="!text-4xl !font-extrabold mb-2">
        ONE LIFE GRAPHIC T-SHIRT
      </h1>

      <div className="flex items-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400" />
        ))}
        <span className="text-sm text-gray-500">4.5/5</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="!text-2xl !font-bold">$260</span>
        <span className="line-through text-gray-400 !text-2xl">$300</span>
        <span className="text-red-500 !text-sm rounded-2xl px-3 py-1 bg-red-100">
          -40%
        </span>
      </div>

      <p className="text-gray-600 mb-2 border-b pb-3 border-gray-200">
        This graphic t-shirt is perfect for any occasion...
      </p>

      {/* Colors */}
      <div className="mb-2 border-b pb-3  border-gray-200">
        <span className="!text-sm !text-gray-400 !font-normal">
          Select Colors
        </span>
        <div className="flex gap-2 mt-2">
          <span className="w-6 h-6 bg-black rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-115" />
          <span className="w-6 h-6 bg-gray-500 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-115" />
          <span className="w-6 h-6 bg-green-700 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-115" />
        </div>
      </div>

      {/* Size */}
      <div className="mb-2 border-b pb-3  border-gray-200">
        <h4 className="!text-sm !text-gray-400 !font-normal">Choose Size</h4>
        <div className="flex gap-2">
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              className="!text-sm !text-gray-500 bg-gray-200 px-6 py-1 !rounded-4xl hover:!bg-black hover:!text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex gap-4 mt-4">
        <div className="flex items-center bg-gray-200 !rounded-4xl">
          <button className="px-3 !text-2xl">-</button>
          <span className="px-4">1</span>
          <button className="px-3 !text-2xl">+</button>
        </div>

        <button className="w-full bg-black text-white px-6 py-2 !rounded-4xl transform transition-transform duration-300 hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
