import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, message, Select } from "antd";

import type { ProductType } from "./ProductListPage";
import { editProductDBApi } from "../../../utils/productApi";

type EditProductModalProps = {
  open: boolean;
  onClose: () => void;
  record: ProductType | null;
  onUpdated: (updated: ProductType[]) => void;
};

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  record,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
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
      setImageFiles([]);
    } else {
      form.resetFields();
      setImageFiles([]);
    }
  }, [record, open, form]);

  const handleFinish = async (values: any) => {
    if (!record) return;

    try {
      setSubmitting(true);
      const res = await editProductDBApi(
        record.id, // id = variantId ở dashboard
        values,
        imageFiles.length > 0 ? imageFiles : undefined
      );
      console.log("EDIT RES DATA: ", res.data);
      onUpdated(res.data); // array variants

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

export default EditProductModal;
