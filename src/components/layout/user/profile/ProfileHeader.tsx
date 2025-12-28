import React, { useRef } from "react";
import { Mail, Camera } from "lucide-react";

interface ProfileHeaderProps {
  user: {
    username: string;
    email: string;
    avatar: string;
    memberRank: string;
    totalSpent: string;
    // Cần thêm 2 trường này để gửi kèm cho backend (tránh lỗi thiếu field)
    phone?: string;
    address?: string;
  };
  // Thêm prop này để gọi hàm update từ cha
  onUpdateAvatar?: (formData: FormData) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onUpdateAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hàm xử lý khi người dùng chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Chỉ xử lý nếu có file và prop onUpdateAvatar được truyền xuống
    if (file && onUpdateAvatar) {
      const formData = new FormData();

      // 1. Append file ảnh mới
      formData.append("avatar", file);

      // 2. Append lại thông tin cũ (BẮT BUỘC vì backend yêu cầu username/email không được rỗng)
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("phone", user.phone || "");
      formData.append("address", user.address || "");

      // 3. Gọi hàm từ cha để bắn API
      onUpdateAvatar(formData);
    }

    // Reset giá trị input để cho phép chọn lại cùng 1 file nếu muốn
    if (e.target) e.target.value = "";
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="w-24 h-24 !rounded-full p-1 border-2 border-dashed border-gray-300">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full !rounded-full object-cover"
              />
            </div>

            {/* Nút Camera kích hoạt input ẩn */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-black text-white p-2 !rounded-full shadow-lg hover:bg-gray-800 transition-all cursor-pointer z-10"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Input ẩn để chọn file */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*" // Chỉ cho phép chọn ảnh
              onChange={handleFileChange}
            />
          </div>

          {/* Info Section (Giữ nguyên) */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h1>
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2 mt-1">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 !rounded-full flex items-center gap-1">
                👑 {user.memberRank}
              </span>
              <span className="text-gray-400 text-xs">|</span>
              <span className="text-gray-600 text-sm font-medium">
                Chi tiêu: {user.totalSpent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
