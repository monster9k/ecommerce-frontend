import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, App, Select } from "antd";
import { createProductDBApi } from "../../../utils/productApi";

import type { ProductType } from "./ProductListPage";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (newProducts: ProductType[]) => void; // callback cho parent
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  open,
  onClose,
  onCreated,
}) => {
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const handleCreateProduct = async (values: any) => {
    try {
      setLoading(true);
      const res = await createProductDBApi(values, imageFiles);

      message.success("Product created successfully");
      form.resetFields();
      setImageFiles([]);
      onCreated(res.data); // báo cho parent biết có product mới
      console.log("CREATED PRODUCT:", res.data);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Product"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()} // goi ham submit cua form
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
        {" "}
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category ID"
          rules={[{ required: true }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="styles" label="Styles">
          <Select
            mode="multiple"
            placeholder="Select styles"
            options={[
              { label: "Casual", value: 1 },
              { label: "Formal", value: 2 },
              { label: "Party", value: 3 },
              { label: "Gym", value: 4 },
            ]}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="size" label="Size">
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Image">
          <div className="border ">
            {" "}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
            <p className="text-xs text-gray-400">Upload tối đa 3 ảnh</p>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
