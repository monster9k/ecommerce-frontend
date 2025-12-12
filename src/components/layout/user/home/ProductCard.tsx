import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  img: string;
  oldPrice?: number | null;
  badge?: string | null;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-48">
            <img
              src={product.img}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>
        </Link>

        {product.badge && (
          <div className="absolute top-3 right-3 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>

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
          <div className="text-lg font-semibold">${product.price}</div>
          {product.oldPrice && (
            <div className="text-sm text-gray-400 line-through">
              ${product.oldPrice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
