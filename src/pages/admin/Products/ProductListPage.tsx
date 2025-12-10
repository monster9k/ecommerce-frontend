import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getProductDBApi, deleteProductDBApi } from "../../../utils/productApi";

import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
export interface ProductType {
  id: number; // id của variant (hoặc product nếu không có variant)
  productId: number;
  productName: string;
  categoryName?: string;
  description?: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  imageUrl?: string;
}
const ProductListPage: React.FC = () => {
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProductType | null>(null);

  const fectchProduct = async () => {
    try {
      const res = await getProductDBApi();
      if (res?.data) {
        console.log("res:", res);
      }
      setDataProduct(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fectchProduct();
  }, []);

  const handleProductCreated = (newProducts: ProductType[]) => {
    setDataProduct((prev) => [...prev, ...newProducts]);

    // Hoặc nếu muốn sync chính xác với DB:
    // fectchProduct();
  };

  const handleProductEdited = (updated: ProductType) => {
    setDataProduct((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleProductDeleted = async (deletedId: number) => {
    try {
      await deleteProductDBApi(deletedId);
      // Cập nhật lại state: remove tất cả item có cùng productId
      setDataProduct((prev) =>
        prev.filter((item) => item.productId !== deletedId)
      );
    } catch (e) {
      console.log(e);
    }
  };
  const columns: ColumnsType<ProductType> = [
    {
      title: "Item",
      dataIndex: "productName",
      key: "productName",
      align: "left",
      width: 300,
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <div className="mr-2"></div>

          <img
            src={record.imageUrl}
            alt={text}
            className="w-10 h-10 rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium">{text}</span>
            <span className="text-gray-400 text-sm">{record.description}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => {
        const num = Number(price) || 0; // ép về number, tránh lỗi nếu null hoặc string
        return `${num.toLocaleString("vi-VN")} VND`;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      render: (stock) => (
        <span>
          {stock} Item Left <br />
          {/* <span className="text-gray-400 text-sm">{recorSoldd.sold} </span> */}
        </span>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          {" "}
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingRecord(record);
              setIsEditOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            okText="Yes"
            cancelText="No"
            okType="danger"
            onConfirm={() => handleProductDeleted(record.productId)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="p-6 border-b mb-3 border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <div>
          {" "}
          <h3 className=" text-slate-800 dark:!text-white">
            Product Management
          </h3>
        </div>
        <button
          className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center  "
          onClick={() => setOpen(true)}
        >
          <span className="ml-2">+ Add product</span>
        </button>
      </div>
      <Table<ProductType>
        columns={columns}
        dataSource={dataProduct}
        rowKey="id"
        className="bg-transparent"
      />

      <CreateProductModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleProductCreated}
      />
      <EditProductModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        record={editingRecord}
        onUpdated={handleProductEdited}
      />
    </div>
  );
};

export default ProductListPage;
