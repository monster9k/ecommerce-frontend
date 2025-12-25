import React, { useEffect, useState } from "react";

import { Space, Button, Table, notification } from "antd";
import type { TableProps } from "antd";
import ModalUserEdit from "./ModalUserEdit";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface DataType {
  id: number;
  username: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

import { getUserApi, editUserApi, deleteUserApi } from "../../../utils/api";
import { File } from "lucide-react";

const UserListPage: React.FC = () => {
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
        // alert("Unathorized");
        console.log("Unathorized");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEditUSer = (user: DataType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmitEdit = async (values: DataType) => {
    if (!selectedUser) return;
    try {
      const { username, email, phone, address } = values;
      await editUserApi(selectedUser.id, username, email, phone, address);
      notification.success({ message: "Update success!" });
      setDataUser((prev) => {
        return prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, username: values.username, email: values.email }
            : u
        );
      });
    } catch (err) {
      console.error("Error edit users:", err);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUserApi(userId);
      notification.success({ message: "Delete success!" });
      fetchUser(); // reload list
    } catch (err) {
      console.error("Error delete users:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(dataUser);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "username",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEditUSer(record)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>

          <Button
            danger
            size="small"
            onClick={() => handleDeleteUser(record.id)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
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

      <div>
        <Table<DataType> columns={columns} dataSource={dataUser} rowKey="id" />
      </div>
      {/* Modal Edit User */}
      <ModalUserEdit
        open={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSubmitEdit}
      />
    </div>
  );
};

export default UserListPage;
