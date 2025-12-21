import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductDataType } from "../../../../pages/user/ShopPage";

interface ShopProductsProps {
  products: ProductDataType[]; // Nhận vào một MẢNG sản phẩm
}

const ShopProducts = ({ products }: ShopProductsProps) => {
  return (
    <section className="flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Casual</h2>
        <span className="text-sm text-gray-500">
          Showing 1–10 of 100 Products
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 border-b border-gray-200 pb-4   ">
        {products.map((p) => (
          <Link
            to={`/shop/${p.id}`}
            className="block !no-underline !text-inherit"
          >
            <div
              key={p.id}
              className=" p-1 transform transition-transform duration-300  hover:scale-105"
            >
              <img
                src={p.images[0].imageUrl}
                className="w-full h-72 object-cover rounded-2xl"
              />
              <h3 className="mt-2 !text-xl !font-medium">{p.name}</h3>

              <div className="flex items-center gap-1 text-yellow-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} />
                ))}
              </div>

              <p className="!text-xl !font-semibold mt-1">
                {Number(p.variants[0].price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        <button className="border px-4 py-2 !rounded-xl flex items-center justify-between gap-2 !text-sm font-bold hover:!bg-black hover:!text-white">
          <ArrowLeft className="w-4 h-4 " />
          Previous
        </button>
        <div className="">
          <button className="border px-3 py-2 !rounded-xl bg-gray-200 text-black">
            1
          </button>
          <button className=" px-3 py-2  rounded  text-black">2</button>
          <button className=" px-3 py-2  rounded  text-black">3</button>
          <button className=" px-3 py-2  rounded  text-black">4</button>
        </div>

        <button className="border px-4 py-2 !rounded-xl flex items-center justify-between gap-2 !text-sm font-bold  hover:!bg-black hover:!text-white">
          Next
          <ArrowRight className="w-4 h-4 " />
        </button>
      </div>
    </section>
  );
};

export default ShopProducts;
