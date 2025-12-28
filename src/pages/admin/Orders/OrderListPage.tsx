import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Input, Tooltip, Popconfirm, message } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

// Import API
import {
  getAllOrdersAdminApi,
  deleteOrderAdminApi,
} from "../../../utils/orderApi";

// Import Modal con vừa tách
import EditOrderModal from "./EditOrderModal";

// --- TYPES (Có thể tách ra file types.ts riêng nếu muốn dùng chung) ---
interface UserType {
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface OrderDataType {
  id: number;
  userId: number;
  user: UserType;
  totalPrice: string | number;
  status: "PENDING" | "SHIPPING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  shippingAddress: string;
  phone: string;
  paymentMethod: "COD" | "BANK";
  isPaid: boolean;
  itemCount: number;
}

const OrderListPage: React.FC = () => {
  const [dataOrder, setDataOrder] = useState<OrderDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State quản lý Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderDataType | null>(null);

  // 1. Fetch Data
  const fetchOrders = async (search: string = "") => {
    setLoading(true);
    try {
      const res: any = await getAllOrdersAdminApi(search);
      if (res && res.data) {
        setDataOrder(res.data.data);
      }
    } catch (e) {
      console.error(e);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = () => {
    fetchOrders(searchTerm);
  };

  // 2. Handle Delete
  const handleDelete = async (id: number) => {
    try {
      await deleteOrderAdminApi(id);
      message.success("Deleted order successfully");
      setDataOrder((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      message.error("Failed to delete order");
    }
  };

  // 3. Mở Modal Edit
  const openEditModal = (record: OrderDataType) => {
    setEditingOrder(record); // Lưu record đang chọn vào state
    setIsEditModalOpen(true); // Mở modal
  };

  // 4. Callback khi Modal update xong
  const handleUpdateSuccess = () => {
    // Refresh lại list với từ khóa search hiện tại
    fetchOrders(searchTerm);
  };

  // Helper render tag (Giữ nguyên)
  const renderStatusTag = (status: string) => {
    let color = "default";
    let icon = null;
    switch (status) {
      case "PENDING":
        color = "gold";
        icon = <SyncOutlined spin />;
        break;
      case "SHIPPING":
        color = "blue";
        icon = <SyncOutlined />;
        break;
      case "DELIVERED":
        color = "green";
        icon = <CheckCircleOutlined />;
        break;
      case "CANCELLED":
        color = "red";
        icon = <CloseCircleOutlined />;
        break;
    }
    return (
      <Tag
        color={color}
        icon={icon}
        className="uppercase font-bold text-[10px]"
      >
        {status}
      </Tag>
    );
  };

  // Columns (Giữ nguyên logic render)
  const columns: ColumnsType<OrderDataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id) => <span className="font-bold text-blue-600">#{id}</span>,
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      width: 220,
      render: (user: UserType) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold">{user?.username?.[0]}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-slate-700">
              {user?.username}
            </span>
            <span className="text-[10px] text-gray-400">{user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 120,
      render: (price) => (
        <span className="font-bold">
          {Number(price).toLocaleString("vi-VN")} ₫
        </span>
      ),
    },
    {
      title: "Payment",
      key: "payment",
      width: 120,
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500">
            {record.paymentMethod}
          </span>
          {record.isPaid ? (
            <span className="text-green-600 text-xs font-bold">PAID</span>
          ) : (
            <span className="text-orange-500 text-xs font-bold">UNPAID</span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 140,
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip title="Edit Status">
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              className="bg-blue-500"
              onClick={() => openEditModal(record)} // Gọi hàm mở modal
            />
          </Tooltip>

          <Popconfirm
            title="Delete Order"
            description="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Tooltip title="Delete">
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:!text-white">
            Order Management
          </h3>
          <p className="text-sm text-gray-500">Manage all orders</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search ID, User..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button icon={<FilterOutlined />} onClick={handleSearch}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table<OrderDataType>
        columns={columns}
        dataSource={dataOrder}
        rowKey="id"
        loading={loading}
        className="bg-transparent"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800 }}
      />

      {/* --- NHÚNG MODAL CON VÀO ĐÂY --- */}
      <EditOrderModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={editingOrder}
        onUpdated={handleUpdateSuccess} // Truyền callback
      />
    </div>
  );
};

export default OrderListPage;
