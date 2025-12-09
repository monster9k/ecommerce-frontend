import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, App } from "antd";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const handleCreateProduct = async (values: any) => {
    try {
      setLoading(true);
      const res = await createProductDBApi(values, imageFile || undefined);

      message.success("Product created successfully");
      form.resetFields();
      setImageFile(null);
      onCreated(res.data); // báo cho parent biết có product mới
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
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
