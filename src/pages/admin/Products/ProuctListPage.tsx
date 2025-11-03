import React, { useEffect, useState } from "react";
import { Table, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getProductDBApi } from "../../../utils/productApi";

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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);

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

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <div className="mr-2">
            <Checkbox
              checked={selectedIds.includes(record.id)}
              onChange={(e) => handleSelect(record.id, e.target.checked)}
            />
          </div>

          <img
            src={record.imageUrl}
            alt={text}
            className="w-10 h-10 rounded-md"
          />
          <div className="flex flex-col">
            <span className="font-medium">{text}</span>
            <span className="text-gray-400 text-sm">{record.categoryName}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        const num = Number(price) || 0; // ép về number, tránh lỗi nếu null hoặc string
        return `$${num.toFixed(2)}`;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <h2 className="text-slate-800 dark:text-white font-bold text-lg mb-4">
        Product List
      </h2>
      <Table<ProductType>
        columns={columns}
        dataSource={dataProduct}
        rowKey="id"
        pagination={false}
        className="bg-transparent"
      />
    </div>
  );
};

export default ProductListPage;
