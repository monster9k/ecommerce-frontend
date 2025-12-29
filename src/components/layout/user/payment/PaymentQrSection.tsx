import React from "react";
import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Spin } from "antd";
interface PaymentQrSectionProps {
  qrString: string;
  loading: boolean;
}

const PaymentQrSection = ({ qrString, loading }: PaymentQrSectionProps) => {
  return (
    <div className="w-full md:w-5/12 bg-blue-600 p-8 md:p-12 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-extrabold mb-2">Scan to Pay</h2>
        <p className="text-blue-100 text-sm mb-8">
          Open your banking app to scan
        </p>

        {/* QR Box */}
        <div className="bg-white p-4 rounded-2xl shadow-2xl inline-block mb-8 transform transition-transform hover:scale-105 duration-300">
          {loading ? (
            <div className="w-56 h-56 flex items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            /* Component vẽ QR Code */
            <QRCodeCanvas
              id="payment-qr"
              value={qrString}
              size={220} // Kích thước
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"} // Mức độ sửa lỗi cao (để chèn logo ko bị lỗi)
              includeMargin={true}
              imageSettings={{
                // Bạn thay link logo ngân hàng của bạn vào đây
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Img_logo_mbbank.png/1200px-Img_logo_mbbank.png",
                x: undefined,
                y: undefined,
                height: 40,
                width: 100,
                excavate: true,
              }}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all">
            <Download className="w-4 h-4" /> Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentQrSection;
