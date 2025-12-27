import { useState, useEffect } from "react";

import Footer from "../../components/layout/user/home/Footer";
import Newsletter from "../../components/layout/user/home/Newsletter";
import OrderTable from "../../components/layout/user/order/OrderTable";
import { message } from "antd";
import { getMyOrdersApi } from "../../utils/orderApi";

const OrderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const res: any = await getMyOrdersApi();

      console.log(res?.data.data);
      if (res && res.data) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white mt-16">
      <main className="max-w-6xl mx-auto px-4 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="!text-3xl !font-extrabold mb-2">MY ORDERS</h1>
            <p className="text-gray-500">View your order history and status.</p>
          </div>

          {/* Nếu muốn filter nhanh có thể thêm ở đây sau này */}
          {/* <div className="flex gap-2">...</div> */}
        </div>

        {/* Orders Table */}
        <OrderTable orders={orders} loading={loading} />
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default OrderPage;
