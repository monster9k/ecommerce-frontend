import React from "react";
import { Settings, ShoppingBag, CreditCard, LogOut } from "lucide-react";

interface ProfileSidebarProps {
  activeTab: "settings" | "orders";
  setActiveTab: (tab: "settings" | "orders") => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white !rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Tài khoản
          </h3>
        </div>
        <nav className="flex flex-col p-2">
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-3 !rounded-xl text-sm font-medium transition-all ${
              activeTab === "settings"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-4 h-4" /> Cài đặt hồ sơ
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-4 py-3 !rounded-xl text-sm font-medium transition-all ${
              activeTab === "orders"
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Lịch sử đơn hàng
          </button>
          <button className="flex items-center gap-3 px-4 py-3 !rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <CreditCard className="w-4 h-4" /> Phương thức thanh toán
          </button>
        </nav>
      </div>

      <div className="bg-white !rounded-2xl shadow-sm border border-gray-100 p-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 !rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
