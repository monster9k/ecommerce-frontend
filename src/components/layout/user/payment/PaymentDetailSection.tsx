import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  User,
  FileText,
  CheckCircle2,
} from "lucide-react";
import PaymentInfoRow from "./PaymentInfoRow"; // Import component con

interface OrderInfo {
  total: number;
  bankName: string;
  accountNo: string;
  accountName: string;
  content: string;
}

interface PaymentDetailSectionProps {
  order: OrderInfo;
  onConfirm: () => void;
}

const PaymentDetailSection = ({
  order,
  onConfirm,
}: PaymentDetailSectionProps) => {
  return (
    <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-black flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          Payment Pending
        </span>
      </div>

      {/* Total Amount */}
      <div className="text-center md:text-left mb-8">
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
          Total Amount
        </p>
        <h1 className="text-4xl font-black text-slate-900 mt-1">
          {order.total.toLocaleString("vi-VN")}
          <span className="text-2xl text-gray-400 font-bold ml-1">₫</span>
        </h1>
      </div>

      <div className="h-px bg-gray-100 w-full mb-8"></div>

      {/* Info List - Dùng Component con cho gọn */}
      <div className="space-y-2">
        <PaymentInfoRow
          icon={<CreditCard className="w-5 h-5" />}
          label="Bank"
          value={order.bankName}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <PaymentInfoRow
          icon={<QrCode className="w-5 h-5" />}
          label="Account Number"
          value={order.accountNo}
          isCopyable
          valueClassName="text-lg tracking-wide"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />

        <PaymentInfoRow
          icon={<User className="w-5 h-5" />}
          label="Account Name"
          value={order.accountName}
          valueClassName="uppercase"
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />

        <PaymentInfoRow
          icon={<FileText className="w-5 h-5" />}
          label="Transfer Content"
          value={order.content}
          isCopyable
          valueClassName="text-red-500 text-lg"
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <button
          onClick={onConfirm}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200 cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />I Have Paid
        </button>
        <p className="text-center text-gray-400 text-xs mt-4">
          Click the button above after you have completed the transfer.
        </p>
      </div>
    </div>
  );
};

export default PaymentDetailSection;
