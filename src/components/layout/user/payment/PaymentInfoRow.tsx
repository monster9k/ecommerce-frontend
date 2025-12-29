import React from "react";
import { Copy } from "lucide-react";
import { Tooltip, message } from "antd";

interface PaymentInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isCopyable?: boolean;
  valueClassName?: string; // Để custom màu chữ (VD: màu đỏ cho nội dung, to cho số TK)
  bgColor: string; // Màu nền của icon (VD: bg-blue-50)
  iconColor: string; // Màu của icon (VD: text-blue-600)
}

const PaymentInfoRow = ({
  icon,
  label,
  value,
  isCopyable = false,
  valueClassName = "text-gray-800",
  bgColor,
  iconColor,
}: PaymentInfoRowProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    message.success(`Copied ${label}!`);
  };

  return (
    <div
      className={`flex items-center justify-between group p-3 rounded-xl transition-colors -mx-3 border border-transparent 
      ${
        isCopyable
          ? "hover:bg-gray-50 hover:border-gray-100 cursor-pointer"
          : ""
      }`}
      onClick={isCopyable ? handleCopy : undefined}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor} ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">{label}</p>
          <p className={`font-bold ${valueClassName}`}>{value}</p>
        </div>
      </div>

      {isCopyable && (
        <Tooltip title="Click to Copy">
          <button className="text-gray-400 hover:text-black hover:bg-white p-2 rounded-full shadow-sm transition-all">
            <Copy className="w-5 h-5" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default PaymentInfoRow;
