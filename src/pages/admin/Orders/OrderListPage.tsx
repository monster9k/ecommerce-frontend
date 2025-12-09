import React, { useEffect, useState } from "react";
import { Table, Checkbox, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getOrderDBApi } from "../../../utils/orderApi";
export interface OrderItemDTO {
  id: number;
  orderId: number;
  productVariantId: number;
  quantity: number;
  priceAtPurchase: string;
}

export interface OrderDTO {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  createdAt: string;
  items: OrderItemDTO[];
}

// -- format --

const formatVND = (v: string | number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    typeof v === "string" ? Number(v) : v
  );

const formatDateTime = (iso: string) => new Date(iso).toLocaleString("vi-VN");

const statusColor = (s: string) => {
  switch (s) {
    case "PENDING":
      return "gold";
    case "PROCESSING":
      return "blue";
    case "COMPLETED":
      return "green";
    case "CANCELED":
    case "CANCELLED":
      return "red";
    default:
      return "default";
  }
};

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]); // chỉ tự mở khi click Products

  const fectOrder = async () => {
    try {
      const res = await getOrderDBApi();
      if (res?.data) {
        // console.log("res", res.data);
        setOrders(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fectOrder();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedRowKeys((keys) =>
      keys.includes(id) ? keys.filter((k) => k !== id) : [...keys, id]
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: number) => `Order #${id}`,
      width: 120,
      align: "center",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      align: "center",
      onCell: (record) => ({
        onClick: (e) => {
          e.stopPropagation(); // đề phòng tương tác khác
          toggleExpand(record.id); // mở/đóng hàng hiện tại
        },
      }),
      render: (_, record) => (
        <div
          className="inline-flex w-fit border border-slate-300 dark:border-slate-700 
                px-2 py-1 rounded-md text-sm bg-slate-50 dark:bg-slate-800 cursor-pointer"
        >
          {" "}
          {record.items.length} sản phẩm
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      render: (v: string) => formatVND(v),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (s: string) => <Tag color={statusColor(s)}>{s}</Tag>,
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (t: string) => formatDateTime(t),
    },
  ];

  const itemColumns: ColumnsType<OrderItemDTO> = [
    {
      title: "#",
      key: "index",
      width: 60,
      align: "center",
      render: (_: any, __: OrderItemDTO, index: number) => index + 1,
    },
    {
      title: "Variants",
      dataIndex: "productVariantId",
      key: "productVariantId",
      align: "center",
      render: (id: number) => (
        <span className="font-medium">Variant #{id}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (q: number) => (
        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100">
          x{q}
        </span>
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "priceAtPurchase",
      key: "priceAtPurchase",
      align: "right",
      render: (v: string | number) => formatVND(v),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      align: "right",
      render: (_, item) => (
        <span className="font-semibold text-emerald-600">
          {formatVND(Number(item.priceAtPurchase) * item.quantity)}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rouded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <h2 className="text-slate-800 dark:text-white font-bold text-lg mb-4">
        Order List
      </h2>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={orders}
        className="bg-transparent"
        expandable={{
          expandRowByClick: false,
          expandIconColumnIndex: -1,
          expandedRowKeys,
          onExpandedRowsChange: (keys) =>
            setExpandedRowKeys(keys as React.Key[]),
          expandedRowRender: (record) => {
            const totalQty = record.items.reduce(
              (sum: any, it: any) => sum + it.quantity,
              0
            );
            const totalAmount = record.items.reduce(
              (sum: any, it: any) =>
                sum + Number(it.priceAtPurchase) * it.quantity,
              0
            );

            return (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mt-1">
                <div className="flex items-center justify-between mb-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    Chi tiết đơn{" "}
                    <span className="font-medium">#{record.id}</span>
                  </span>
                  <span>
                    {totalQty} sản phẩm ·{" "}
                    <span className="font-semibold text-emerald-600">
                      {formatVND(totalAmount)}
                    </span>
                  </span>
                </div>

                <Table<OrderItemDTO>
                  columns={itemColumns}
                  dataSource={record.items}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  bordered
                  className="bg-white dark:bg-slate-900 rounded-md overflow-hidden"
                  summary={(pageData) => {
                    const totalQty = pageData.reduce(
                      (sum, it) => sum + it.quantity,
                      0
                    );
                    const total = pageData.reduce(
                      (sum, it) =>
                        sum + Number(it.priceAtPurchase) * it.quantity,
                      0
                    );
                    return (
                      <Table.Summary>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={3}>
                            <span className="font-medium">Tổng</span>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={3} align="center">
                            x{totalQty}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4} align="right">
                            <span className="font-semibold text-emerald-600">
                              {formatVND(total)}
                            </span>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    );
                  }}
                />
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default OrderListPage;
