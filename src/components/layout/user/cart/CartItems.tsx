import { Minus, Plus, Trash2 } from "lucide-react";

const CartItems = ({ cartData }: any) => {
  return (
    <div className="md:col-span-2 space-y-4 border !rounded-3xl p-4">
      {cartData.map((item: any) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b border-gray-200 p-4 last:border-b-0"
        >
          <img
            src={item.productVariant.product.images[0].imageUrl}
            className="w-28 h-32 object-cover !rounded-2xl"
          />

          <div className="flex-1">
            <h3 className="font-medium">{item.productVariant.product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {item.productVariant.size} | Color:{" "}
              {item.productVariant.color}
            </p>
            <p className="!text-xl !font-bold mt-1">
              {Number(item.productVariant.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center p-1 bg-gray-200 !rounded-2xl">
            <button className="px-2">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3">{item.quantity}</span>
            <button className="px-2">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove */}
          <button className="text-red-500">
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
