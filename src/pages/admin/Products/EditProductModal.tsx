import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";

import type { ProductType } from "./ProductListPage";
import { editProductDBApi } from "../../../utils/productApi";

type EditProductModalProps = {
  open: boolean;
  onClose: () => void;
  record: ProductType | null;
  onUpdated: (updated: ProductType) => void;
};

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  record,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Khi mở modal và có record thì fill form
  useEffect(() => {
    if (record && open) {
      form.setFieldsValue({
        productName: record.productName,
        description: record.description,
        size: record.size,
        color: record.color,
        price: record.price,
        stock: record.stock,
      });
      setImageFile(null);
    } else {
      form.resetFields();
      setImageFile(null);
    }
  }, [record, open, form]);

  const handleFinish = async (values: any) => {
    if (!record) return;

    try {
      setSubmitting(true);
      const res = await editProductDBApi(
        record.id, // id = variantId ở dashboard
        values,
        imageFile || undefined
      );
      console.log("EDIT RES DATA: ", res.data);
      const updated = Array.isArray(res.data) ? res.data[0] : res.data;
      onUpdated(updated);
      message.success("Product updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Edit Product"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={submitting}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input />
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
          <div className="border">
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

export default EditProductModal;
