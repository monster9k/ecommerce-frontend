import { Star } from "lucide-react";
import { useState } from "react";

import type { productDetailType } from "../../../../pages/user/ProductDetailPage"; // Import type từ cha hoặc file types

interface ProductInfoProps {
  product: productDetailType;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // loc mau
  const uniqueColors = [
    ...new Set(product?.variants.map((v) => v.color)),
  ].filter(Boolean);
  const uniqueSizes = [...new Set(product?.variants.map((v) => v.size))].filter(
    Boolean
  );

  return (
    <div>
      <h1 className="!text-4xl !font-extrabold mb-2">{product?.name}</h1>

      <div className="flex items-center gap-2 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400" />
        ))}
        <span className="text-sm text-gray-500">4.5/5</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="!text-2xl !font-bold">
          {Number(product?.variants[0].price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        {/* <span className="line-through text-gray-400 !text-2xl">$300</span>
        <span className="text-red-500 !text-sm rounded-2xl px-3 py-1 bg-red-100">
          -40%
        </span> */}
      </div>

      <p className="text-gray-600 mb-2 border-b pb-3 border-gray-200">
        {product?.description}
      </p>

      {/* Colors */}
      {uniqueColors.length > 0 && (
        <div className="mb-2 border-b pb-3 border-gray-200">
          <span className="!text-sm !text-gray-400 !font-normal">
            Select Colors
          </span>
          <div className="flex gap-2 mt-2">
            {uniqueColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 !rounded-full cursor-pointer border transform transition hover:scale-120 
                  ${
                    selectedColor === color
                      ? "border-2 border-black"
                      : "border-gray-200"
                  }`}
                style={{ backgroundColor: color.toLowerCase() }} // Màu phải chuẩn tên tiếng Anh hoặc mã HEX
                title={color}
              />
            ))}
          </div>
          <div className="mt-1 text-sm font-bold">{selectedColor}</div>
        </div>
      )}

      {/* Size */}
      {uniqueSizes.length > 0 && (
        <div className="mb-2 border-b pb-3  border-gray-200">
          <h4 className="!text-sm !text-gray-400 !font-normal">Choose Size</h4>
          <div className="flex gap-2">
            {uniqueSizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`!text-sm  px-6 py-1 !rounded-4xl hover:!bg-black hover:!text-white
                  ${
                    selectedSize === s
                      ? "bg-black !text-white"
                      : "!text-gray-500 bg-gray-200"
                  }
                  `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity + Add to cart */}
      <div className="flex gap-4 mt-4">
        <div className="flex items-center bg-gray-200 !rounded-4xl px-2">
          <button
            className="px-3 !text-2xl pb-1"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="px-4 font-medium">{quantity}</span>
          <button
            className="px-3 !text-2xl pb-1"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button className="w-full bg-black text-white px-6 py-2 !rounded-4xl transform transition-transform duration-300 hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
