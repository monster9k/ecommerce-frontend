import React, { useState, useEffect } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { getUserApi } from "../utils/api";
interface DataType {
  id: number;
  name: string;
  email: string;
  role: string;
}

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
    render: () => (
      <Space size="middle">
        <a>Edit </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserPage: React.FC = () => {
  const [dataUser, setDataUser] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi();
        console.log("res >> ", res);
        if (res?.data) {
          setDataUser(res.data.users); // chỉnh theo đúng format API
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="p-3">
      <Table<DataType> columns={columns} dataSource={dataUser} rowKey="id" />
    </div>
  );
};

export default UserPage;
