import { Tag } from "lucide-react";

const CartSummary = ({ cartData }: any) => {
  const subtotal =
    cartData?.reduce((acc: number, item: any) => {
      const price = Number(item.productVariant.price);
      const qty = Number(item.quantity);
      return acc + price * qty;
    }, 0) || 0;
  const discount = subtotal * 0.2; // 20%
  const delivery = subtotal > 0 ? 30000 : 0; // 30k ship, nếu giỏ rỗng thì 0
  const total = subtotal - discount + delivery;

  // console.log("cartData", cartData);
  return (
    <div className="border !rounded-3xl p-6 h-fit">
      <h2 className="!text-lg !font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold">
            {Number(subtotal).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <div className="flex justify-between text-red-500">
          <span className="text-gray-600">Discount (-20%)</span>
          <span className="font-bold">
            -
            {Number(discount).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-bold">
            {Number(delivery).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <hr />

        <div className="flex justify-between  text-base">
          <span>Total</span>
          <span className="font-bold">
            {Number(total).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>

      {/* Promo */}
      <div className="flex gap-2 mt-4">
        <div className="flex items-center gap-3 bg-gray-200 !rounded-4xl px-3 py-2 text-sm flex-1 ">
          <Tag className="w-4 h-4 text-gray-600" />
          <input
            placeholder="Add promo code"
            className="w-full bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        <button className="bg-black text-white px-4 !rounded-4xl transform transition-transform duration-300 hover:scale-110">
          Apply
        </button>
      </div>

      <button className="w-full bg-black text-white py-3 mt-4 !rounded-4xl transform transition-transform duration-300 hover:scale-105">
        Go to Checkout →
      </button>
    </div>
  );
};

export default CartSummary;
