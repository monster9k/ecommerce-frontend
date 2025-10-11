import React, { useEffect } from "react";

import { Space, Button, Table } from "antd";
import type { TableProps } from "antd";
interface DataType {
  id: number;
  username: string;
  email: string;
  role: string;
}

import { getUserApi, editUserApi, deleteUserApi } from "../../../utils/api";
import { File } from "lucide-react";

const UserListPage: React.FC = () => {
  const [dataUser, setDataUser] = React.useState<DataType[]>([]);
  const fetchUser = async () => {
    try {
      const res = await getUserApi();
      // console.log("check res:", res);
      if (res?.data) {
        setDataUser(res.data.users); // chỉnh theo đúng format API
      } else {
        // alert("Unathorized");
        console.log("Unathorized");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
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
          <Button type="primary">Edit</Button>

          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl borde border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="p-6 border-b mb-3 border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <div>
          {" "}
          <h3 className=" text-slate-800 dark:!text-white">User Management</h3>
          <p className=" text-slate-500 dark:text-slate-400">All user</p>
        </div>
        <button className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center ">
          <File className="w-4 h-4"></File>
          <span className="ml-2">Export to Excel</span>
        </button>
      </div>

      <div className="antd-table-dark">
        <Table<DataType> columns={columns} dataSource={dataUser} rowKey="id" />
      </div>
    </div>
  );
};

export default UserListPage;
