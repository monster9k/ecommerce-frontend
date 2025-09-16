import React, { useState, useEffect } from "react";
import {
  notification,
  Space,
  Table,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import type { TableProps } from "antd";
import EditModalUser from "./modalUserEdit";
import { getUserApi, editUserApi } from "../utils/api";
interface DataType {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UserPage: React.FC = () => {
  const [dataUser, setDataUser] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const fetchUser = async () => {
    try {
      const res = await getUserApi();
      // console.log("check res:", res);
      if (res?.data) {
        setDataUser(res.data.users); // chỉnh theo đúng format API
      } else {
        notification.error({
          message: "Unathorized",
        });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEditUser = (user: DataType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmitEdit = async (values: DataType) => {
    if (!selectedUser) return;
    try {
      const { username, email } = values;
      console.log("check: ", selectedUser.id, username, email);
      await editUserApi(selectedUser.id, username, email);
      notification.success({ message: "Update success!" });
      setDataUser((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, username: values.username, email: values.email }
            : u
        )
      );
    } catch (e) {
      notification.error({ message: "Update failed!" });
      console.error(e);
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "username",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Edit
          </Button>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="p-3">
        <Table<DataType> columns={columns} dataSource={dataUser} rowKey="id" />
      </div>
      <EditModalUser
        open={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitEdit}
      />
    </>
  );
};

export default UserPage;
