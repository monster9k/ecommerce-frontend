import React, { useEffect, useState } from "react";
import PaymentQrSection from "../../components/layout/user/payment/PaymentQrSection";
import PaymentDetailSection from "../../components/layout/user/payment/PaymentDetailSection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const MY_BANK = {
  BANK_ID: "970422", // Mã BIN (Ví dụ MB Bank là 970422)
  ACCOUNT_NO: "0903846809", // Thay số tài khoản của bạn
  ACCOUNT_NAME: "NGUYEN VIET MINH KHOA", // Thay tên chủ tài khoản
};

const PaymentPage = () => {
  // Mock data (Sau này thay bằng data lấy từ API/Location)

  const { id } = useParams(); // Lấy OrderID từ URL
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [qrString, setQrString] = useState("");

  //// Lấy tổng tiền từ state (truyền từ trang checkout) hoặc mặc định 0
  const totalAmount = location.state?.total || 0;
  const content = `DH${id}`; // Nội dung chuyển khoản: DH123

  // console.log("totalAmount, content: ", totalAmount, content);

  const orderInfo = {
    total: totalAmount,
    bankName: "MB BANK", // Tên hiển thị
    accountNo: MY_BANK.ACCOUNT_NO,
    accountName: MY_BANK.ACCOUNT_NAME,
    content: content,
  };

  const generateQR = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.vietqr.io/v2/generate",
        {
          accountNo: MY_BANK.ACCOUNT_NO,
          accountName: MY_BANK.ACCOUNT_NAME,
          acqId: MY_BANK.BANK_ID,
          amount: totalAmount,
          addInfo: content,
          format: "text", // Lấy định dạng text để tự vẽ
          template: "qr_only",
        },
        {
          headers: {
            "x-client-id": import.meta.env.VITE_VIETQR_CLIENT_ID, // Demo Key public của VietQR
            "x-api-key": import.meta.env.VITE_VIETQR_API_KEY,
          },
        }
      );

      if (res.data?.data?.qrCode) {
        setQrString(res.data.data.qrCode);
      }
    } catch (error) {
      console.error("Lỗi tạo QR:", error);
      message.error("Không thể tạo mã QR, vui lòng chuyển khoản thủ công.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQR();
  }, [totalAmount, content]);

  const handleConfirm = () => {
    message.success(
      "Cảm ơn bạn! Chúng tôi sẽ xử lý đơn hàng ngay khi nhận được tiền."
    );
    navigate("/order-success");

    // Xử lý chuyển hướng hoặc gọi API verify ở đây
  };

  // console.log("qrString: ", qrString);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-[32px] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Component Cột Trái */}
        <PaymentQrSection qrString={qrString} loading={loading} />

        {/* Component Cột Phải */}
        <PaymentDetailSection order={orderInfo} onConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default PaymentPage;
