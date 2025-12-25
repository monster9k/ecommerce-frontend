import React, { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface ProfileSettingsProps {
  initialData: {
    username: string;
    email: string;
    phone: string;
    address: string;
  };
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData);

  return (
    <div className="bg-white !rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
        <button className="px-5 py-2 bg-black text-white text-sm font-medium !rounded-lg hover:bg-gray-800 transition-colors">
          Lưu thay đổi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Email (Disabled) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Địa chỉ giao hàng
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
