import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useTheme } from "../../../components/context/admin.theme.context";

interface DataType {
  id: number;
  username: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

interface EditModalUserProps {
  open: boolean;
  onClose: () => void;
  user?: DataType | null;
  onSave?: (updatedUser: DataType) => void;
}

const ModalUserEdit: React.FC<EditModalUserProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const { theme } = useTheme();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role] = useState(user?.role || "User");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    phone?: string;
    address?: string;
  }>({});

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  const handleSave = () => {
    const newErrors: {
      username?: string;
      email?: string;
      phone?: string;
      address?: string;
    } = {};

    if (!username.trim()) newErrors.username = "Please input username!";
    if (!email.trim()) newErrors.email = "Please input email!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format!";
    if (!phone.trim()) newErrors.phone = "Please input phone!";
    if (!address.trim()) newErrors.address = "Please input address!";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave?.({
      id: user?.id || 0,
      username,
      email,
      role,
      phone,
      address,
    });
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
      rootClassName={theme === "dark" ? "dark-modal" : "light-modal"}
    >
      <form className="flex flex-col gap-4">
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label
            className={`font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className={`rounded-md border px-3 py-2 outline-none transition-all ${
              theme === "dark"
                ? "bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                : "bg-white text-slate-800 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            className={`font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className={`rounded-md border px-3 py-2 outline-none transition-all ${
              theme === "dark"
                ? "bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                : "bg-white text-slate-800 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
          />

          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="phone"
            value={phone}
            placeholder="Enter phone"
            onChange={(e) => setPhone(e.target.value)}
            className={`rounded-md border px-3 py-2 outline-none transition-all ${
              theme === "dark"
                ? "bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                : "bg-white text-slate-800 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            className={`font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="address"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            className={`rounded-md border px-3 py-2 outline-none transition-all ${
              theme === "dark"
                ? "bg-slate-700 text-slate-100 border-slate-600 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                : "bg-white text-slate-800 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalUserEdit;
