import { CreditCard, Loader2, MapPin, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartApi } from "../../utils/cartApi";
import { getAccountApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { createOrderApi } from "../../utils/orderApi";
import { message } from "antd";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const fectchInitialData = async () => {
    try {
      setLoading(true);

      const [cartRes, userRes] = await Promise.all([
        getCartApi(),
        getAccountApi(),
      ]);

      // console.log("res Cart:", cartRes);
      setCartItems(cartRes?.data?.items);

      // console.log("res User:", userRes);
      if (userRes?.data) {
        setFormData({
          fullName: userRes.data.username,
          phone: userRes.data.phone,
          address: userRes.data.address,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fectchInitialData();
  }, []);

  const subtotal =
    cartItems?.reduce((acc: number, item: any) => {
      const price = Number(item.productVariant.price);
      const qty = Number(item.quantity);
      return acc + price * qty;
    }, 0) || 0;
  const discount = subtotal * 0.2; // 20%
  const delivery = subtotal > 0 ? 30000 : 0; // 30k ship, nếu giỏ rỗng thì 0
  const total = subtotal - discount + delivery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // 1. Validate
    if (!formData.fullName || !formData.phone || !formData.address) {
      message.error("Please fill in all shipping information!");
      return;
    }

    if (cartItems.length === 0) {
      message.error("Cart is empty!");
      return;
    }

    try {
      setLoading(true);

      // 2. Chuẩn bị dữ liệu đúng khớp với Backend Controller
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        totalPrice: total, // Tổng tiền cuối cùng
        paymentMethod: paymentMethod, // "COD" hoặc "BANK"
      };

      // 3. Gọi API
      const res = await createOrderApi(payload);
      const newOrderId = res.data?.data?.id;
      // 4. Thành công
      message.success("Order placed successfully! 🎉");

      //ĐIỀU HƯỚNG DỰA TRÊN PAYMENT METHOD
      if (paymentMethod === "COD") {
        navigate("/order-success");
      } else {
        // Nếu là BANK, chuyển sang trang Payment kèm theo OrderID và Số tiền
        navigate(`/payment/${newOrderId}`, {
          state: { total: total },
        });
      }

      // Chuyển trang sau khi đặt hàng
    } catch (error: any) {
      console.error(error);
      // Hiển thị lỗi từ backend trả về (ví dụ: hết hàng)
      const errorMsg = error.response?.data?.message || "Failed to place order";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  // console.log("payment: ", paymentMethod);
  // console.log("cart:", cartItems);
  // console.log("user: ", formData);
  return (
    <div className="min-h-screen bg-white mt-16 pb-20">
      <main className="max-w-6xl mx-auto px-4">
        <h1 className="!text-3xl !font-extrabold !mb-6">CHECKOUT</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG & THANH TOÁN */}
          <div className="md:col-span-2 space-y-8">
            {/* 1. Shipping Information */}
            <div className="border !rounded-3xl p-6">
              <h2 className="!text-xl !font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 p-3 !rounded-2xl outline-none focus:ring-2 focus:ring-black/5"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="0912..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 p-3 !rounded-2xl outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street, Ward, District, City"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 p-3 !rounded-2xl outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="border !rounded-3xl p-6">
              <h2 className="!text-xl !font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Method
              </h2>

              <div className="space-y-3">
                {/* Option 1 */}
                <label
                  className="flex items-center justify-between p-4 border !rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      className="w-5 h-5 accent-black"
                      checked={paymentMethod === "COD"}
                      readOnly
                    />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <Truck className="w-5 h-5 text-gray-500" />
                </label>

                {/* Option 2 */}
                <label
                  className="flex items-center justify-between p-4 border !rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setPaymentMethod("BANK")}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      className="w-5 h-5 accent-black"
                      checked={paymentMethod === "BANK"}
                      readOnly
                    />
                    <span className="font-medium">Bank Transfer / QR Code</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-500" />
                </label>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: ORDER SUMMARY (Tương tự CartSummary nhưng rút gọn) */}
          <div className="h-fit">
            <div className="border !rounded-3xl p-6 sticky top-20">
              <h2 className="!text-lg !font-semibold mb-4">Order Summary</h2>

              {/* List item rút gọn */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item: any) => (
                  <div className="flex gap-3" key={item.id}>
                    <div className="w-16 h-16 bg-gray-200 !rounded-xl overflow-hidden">
                      <img
                        src={item.productVariant.product.images[0].imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="!font-semibold !text-sm">
                        {item.productVariant.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Size: {item.productVariant.size} | Color:{" "}
                        {item.productVariant.color} | Quantity: {item.quantity}
                      </p>

                      <p className="text-sm font-semibold">
                        {" "}
                        {Number(item.productVariant.price).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tính toán tiền */}
              <div className="space-y-2 text-sm mb-4  border-t border-gray-200">
                <div className="flex justify-between text-gray-600 mt-4">
                  <span>Subtotal</span>
                  <span>
                    {Number(subtotal).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>
                    -
                    {Number(discount).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {Number(delivery).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200 my-3 ">
                <span>Total</span>
                <span className="text-xl">
                  {" "}
                  {Number(total).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <button
                className="w-full bg-black text-white py-2  !rounded-4xl font-bold text-lg transform transition-transform duration-300 hover:scale-105 shadow-xl"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
