import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import type { FormProps } from "antd";

interface DataType {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface EditModalUserProps {
  open: boolean;
  user: DataType | null;
  onClose: () => void;
  onSubmit: (values: DataType) => void;
}

const EditModalUser: React.FC<EditModalUserProps> = ({
  open,
  user,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<DataType>();

  // Load lại dữ liệu khi user thay đổi
  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        email: user.email,
        username: user.username,
      });
    }
  }, [user, open, form]);

  const onFinish: FormProps<DataType>["onFinish"] = (values) => {
    onSubmit({ ...user, ...values } as DataType); // giữ id, role
    onClose();
  };

  return (
    <Modal
      title="Edit user"
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<DataType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<DataType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModalUser;
