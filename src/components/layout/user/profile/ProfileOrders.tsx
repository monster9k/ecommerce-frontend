import React from "react";
import { Package, Clock, ChevronRight } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

interface ProfileOrdersProps {
  orders: Order[];
}

const ProfileOrders: React.FC<ProfileOrdersProps> = ({ orders }) => {
  // Helper render badge nằm ngay trong component này
  const renderStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Completed: "bg-green-100 text-green-700 border-green-200",
      Shipping: "bg-blue-100 text-blue-700 border-blue-200",
      Cancelled: "bg-red-50 text-red-600 border-red-100",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          styles[status] || "bg-gray-100"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Đơn hàng gần đây</h2>
        <div className="text-sm text-gray-500">
          Tổng cộng: {orders.length} đơn
        </div>
      </div>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Order ID & Date */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{order.id}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-3 h-3" /> {order.date}
                </div>
              </div>
            </div>

            {/* Status & Price */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                {renderStatusBadge(order.status)}
                <p className="text-sm text-gray-500 mt-2">
                  {order.items} sản phẩm
                </p>
              </div>
              <div className="text-right min-w-[100px]">
                <p className="font-bold text-lg text-gray-900">{order.total}</p>
                <div className="flex items-center justify-end gap-1 text-xs text-blue-600 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem chi tiết <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileOrders;
