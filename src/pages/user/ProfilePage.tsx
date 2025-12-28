import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../components/layout/user/profile/ProfileHeader";
import ProfileSidebar from "../../components/layout/user/profile/ProfileSidebar";
import ProfileSettings from "../../components/layout/user/profile/ProfileSettings";
import ProfileOrders from "../../components/layout/user/profile/ProfileOrders";
import { Loader2 } from "lucide-react";
import { getAccountApi, updateUserProfileApi } from "../../utils/api";
import { getMyOrdersApi } from "../../utils/orderApi";
import { message } from "antd";
import { AuthContext } from "../../components/context/auth.context";
// Import các component con (nhớ chỉnh lại đường dẫn import đúng thực tế)

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "orders">("settings");
  const [userData, setUserData] = useState<any>(null);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useContext must be used within AuthWrapper");
  }
  const { setAuth } = context;
  const formatCurrency = (amount: number) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Hàm helper: Format ngày tháng
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN"); // ra dạng dd/mm/yyyy
  };

  // Hàm helper: Map status từ Backend sang UI
  const mapStatus = (backendStatus: string) => {
    switch (backendStatus) {
      case "PENDING":
        return "Processing";
      case "SHIPPING":
        return "Shipping";
      case "DELIVERED":
        return "Completed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return backendStatus;
    }
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // 1. Gọi song song 2 API
      const [userRes, orderRes] = await Promise.all([
        getAccountApi(),
        getMyOrdersApi(),
      ]);

      // console.log("userRes:", userRes);
      // console.log("orderRes:", orderRes);
      setAuth((prev: any) => ({
        ...prev,
        user: userRes.data, // Hoặc map từng trường username, email...
      }));
      const rawUser = userRes?.data;
      const rawOrders = orderRes?.data.data || [];

      // 2. Xử lý dữ liệu ORDER (Map từ DB sang UI Order[])
      let totalSpentAmount = 0;

      const formattedOrders = rawOrders.map((order: any) => {
        // Cộng dồn tổng chi tiêu (chỉ tính đơn thành công nếu muốn)
        if (order.status !== "CANCELLED") {
          totalSpentAmount += Number(order.totalPrice);
        }

        return {
          id: `#ORD-${order.id}`, // Format ID: #ORD-123
          date: formatDate(order.createdAt),
          status: mapStatus(order.status),
          total: formatCurrency(order.totalPrice),
          items: order.items?.length || 0, // Đếm số lượng item
        };
      });

      // 3. Xử lý dữ liệu USER (Map từ DB sang UI User)
      const formattedUser = {
        id: rawUser.id,
        username: rawUser.username,
        email: rawUser.email,
        phone: rawUser.phone || "",
        address: rawUser.address || "",
        avatar: rawUser.avatarUrl || "https://github.com/shadcn.png", // Ảnh mặc định nếu null
        memberRank:
          totalSpentAmount > 5000000 ? "Gold Member" : "Silver Member", // Logic giả định rank
        totalSpent: formatCurrency(totalSpentAmount),
      };

      setUserData(formattedUser);
      setOrdersData(formattedOrders);
    } catch (error) {
      console.error("Lỗi tải dữ liệu profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8F9FA]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const handleUpdateUser = async (formData: any) => {
    console.log("1. Bắt đầu hàm update"); // <--- Log 1
    console.log("User Data hiện tại:", userData); // <--- Log 2: Kiểm tra xem có ID không?
    if (!userData?.id) {
      console.error("LỖI: Không tìm thấy userData.id"); // <--- Log báo lỗi
      return;
    } // userData cần map thêm id khi fetch về nhé

    try {
      setLoading(true);

      // GỌI HÀM MỚI Ở ĐÂY

      await updateUserProfileApi(userData.id, formData);
      console.log("da cap nhap");

      message.success("Cập nhật thông tin thành công!");

      await fetchProfileData();
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Cập nhật thất bại";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // console.log("userData:", userData);
  // console.log("ordersData:", ordersData);

  return (
    <div className="min-h-screen bg-[#F8F9FA] mt-20 pb-20 font-sans">
      {/* 1. Header Banner */}
      <ProfileHeader user={userData} onUpdateAvatar={handleUpdateUser} />

      {/* 2. Main Layout (Sidebar + Content) */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeTab === "settings" && (
            <ProfileSettings initialData={userData} onSave={handleUpdateUser} />
          )}

          {activeTab === "orders" && <ProfileOrders orders={ordersData} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
