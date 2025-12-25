import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  img: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <Link to={`/shop/${product.id}`} className="relative">
        <div className="block">
          <div className="bg-white rounded-lg p-6 flex items-center justify-center h-48">
            <img
              src={product.img}
              alt={product.title}
              className="max-h-full object-contain !rounded-2xl"
            />
          </div>
        </div>
      </Link>

      <div className="mt-4 flex-1 flex flex-col">
        <h3
          className="text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-yellow-500 text-sm">
          {/* simple stars */}
          <span>
            <Star className="w-4 h-4" /> {product.rating}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="text-lg font-semibold">
            {Number(product.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
