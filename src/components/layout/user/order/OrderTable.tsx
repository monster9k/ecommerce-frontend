import { Table, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

// Interface tạm thời cho Mock Data
interface OrderDataType {
  key: number;
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  shippingAddress: string;
  phone: string;
  items: any[];
}

const OrderTable = ({
  orders,
  loading,
}: {
  orders: any[];
  loading: boolean;
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDataType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetail = (record: OrderDataType) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const columns: ColumnsType<OrderDataType> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="font-bold text-black">#{id}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-500 text-sm">
          {new Date(date).toLocaleDateString("vi-VN")}
        </span>
      ),
      responsive: ["md"],
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => (
        <span className="font-bold text-sm">
          {Number(price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: "Payment",
      key: "payment",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold">{record.paymentMethod}</span>
          <StatusBadge
            status={record.isPaid ? "true" : "false"}
            type="payment"
          />
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          shape="circle"
          icon={<Eye className="w-5 h-5 text-gray-600" />}
          className="hover:!bg-gray-100"
          onClick={() => handleViewDetail(record)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="border !rounded-3xl overflow-hidden shadow-sm">
        <Table
          columns={columns}
          dataSource={orders.map((o) => ({ ...o, key: o.id }))} // Antd cần key
          pagination={{ pageSize: 5 }}
          loading={loading}
          rowClassName="hover:bg-gray-50 transition-colors"
        />
      </div>

      <OrderDetailModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default OrderTable;
