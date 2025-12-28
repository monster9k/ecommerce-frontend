import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Switch, message } from "antd";
import { updateOrderAdminApi } from "../../../utils/orderApi"; // Nhớ trỏ đúng đường dẫn
import type { OrderDataType } from "./OrderListPage"; // Import Interface từ file cha hoặc file types chung

interface EditOrderModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderDataType | null;
  onUpdated: () => void; // Callback để báo cho cha biết là đã sửa xong
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  open,
  onClose,
  order,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mỗi khi "order" thay đổi hoặc modal mở ra -> Điền dữ liệu cũ vào Form
  useEffect(() => {
    if (open && order) {
      form.setFieldsValue({
        status: order.status,
        isPaid: order.isPaid,
      });
    } else {
      form.resetFields();
    }
  }, [open, order, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!order) return;

      setLoading(true);

      // Gọi API Update
      await updateOrderAdminApi(order.id, values);

      message.success(`Updated Order #${order.id} successfully`);

      // 1. Gọi callback để cha refresh lại list
      onUpdated();

      // 2. Đóng modal
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Update Order #${order?.id}`}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Save Changes"
    >
      <Form form={form} layout="vertical" className="mt-4">
        {/* Chọn Status */}
        <Form.Item
          name="status"
          label="Order Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select>
            <Select.Option value="PENDING">PENDING</Select.Option>
            <Select.Option value="SHIPPING">SHIPPING</Select.Option>
            <Select.Option value="DELIVERED">DELIVERED</Select.Option>
            <Select.Option value="CANCELLED">CANCELLED</Select.Option>
          </Select>
        </Form.Item>

        {/* Chọn Payment Status */}
        <Form.Item name="isPaid" label="Payment Status" valuePropName="checked">
          <Switch checkedChildren="PAID" unCheckedChildren="UNPAID" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
