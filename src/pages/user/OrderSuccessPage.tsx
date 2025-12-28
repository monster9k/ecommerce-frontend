import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 mt-16">
      <div className="max-w-md w-full text-center">
        {/* Icon Success */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-slow">
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="!text-4xl !font-extrabold mb-4 text-black">
          Thank You!
        </h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          We have sent a confirmation email to your inbox. <br />
          We will contact you as soon as the package is shipped.
        </p>

        {/* Buttons Action */}
        <div className="space-y-4">
          {/* Nút xem đơn hàng */}
          <button
            onClick={() => navigate("/orders")} // Điều hướng về trang lịch sử đơn hàng
            className="w-full bg-black text-white py-4 !rounded-4xl font-bold text-lg 
                       flex items-center justify-center gap-2 transform transition-transform duration-300 hover:scale-105 shadow-xl"
          >
            <ShoppingBag className="w-5 h-5" />
            View My Order
          </button>

          {/* Nút về trang chủ */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-white text-black border-2 border-black py-4 !rounded-4xl font-bold text-lg 
                       flex items-center justify-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-50"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
