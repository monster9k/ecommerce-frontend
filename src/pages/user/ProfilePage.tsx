import React, { useState } from "react";
import ProfileHeader from "../../components/layout/user/profile/ProfileHeader";
import ProfileSidebar from "../../components/layout/user/profile/ProfileSidebar";
import ProfileSettings from "../../components/layout/user/profile/ProfileSettings";
import ProfileOrders from "../../components/layout/user/profile/ProfileOrders";
// Import các component con (nhớ chỉnh lại đường dẫn import đúng thực tế)

// --- MOCK DATA ---
const MOCK_USER = {
  username: "Nguyễn Văn A",
  email: "nguyenana@gmail.com",
  phone: "0987 654 321",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
  memberRank: "Gold Member",
  totalSpent: "15.000.000 đ",
};

const MOCK_ORDERS = [
  {
    id: "#ORD-001",
    date: "20/12/2024",
    status: "Completed",
    total: "1.200.000 đ",
    items: 3,
  },
  {
    id: "#ORD-002",
    date: "18/12/2024",
    status: "Shipping",
    total: "550.000 đ",
    items: 1,
  },
  {
    id: "#ORD-003",
    date: "10/11/2024",
    status: "Cancelled",
    total: "0 đ",
    items: 2,
  },
  {
    id: "#ORD-004",
    date: "05/10/2024",
    status: "Completed",
    total: "3.400.000 đ",
    items: 4,
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "orders">("settings");

  return (
    <div className="min-h-screen bg-[#F8F9FA] mt-20 pb-20 font-sans">
      {/* 1. Header Banner */}
      <ProfileHeader user={MOCK_USER} />

      {/* 2. Main Layout (Sidebar + Content) */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeTab === "settings" && (
            <ProfileSettings initialData={MOCK_USER} />
          )}

          {activeTab === "orders" && <ProfileOrders orders={MOCK_ORDERS} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
