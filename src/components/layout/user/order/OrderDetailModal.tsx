import { Modal } from "antd";
import { MapPin, Phone, CreditCard, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface OrderDetailModalProps {
  visible: boolean;
  onClose: () => void;
  order: any; // Sau này thay bằng Type Order thật
}

const OrderDetailModal = ({
  visible,
  onClose,
  order,
}: OrderDetailModalProps) => {
  if (!order) return null;
  console.log("order:", order);
  return (
    <Modal
      title={
        <span className="!text-xl !font-bold">Order Details #{order.id}</span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className="!rounded-3xl"
    >
      <div className="space-y-6 mt-4">
        {/* 1. Header Info */}
        <div className="flex justify-between items-center bg-gray-50 p-4 !rounded-2xl">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Created At
            </span>
            <span className="font-medium">
              {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-gray-500 text-xs">Status</span>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* 2. List Items */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="flex gap-4 border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="w-16 h-20 bg-gray-100 !rounded-xl overflow-hidden shrink-0">
                <img
                  src={
                    item.productVariant.product.images[0].imageUrl ||
                    "https://placehold.co/100"
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  {item.productVariant.product.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Size: {item.productVariant.size} / Color:{" "}
                  {item.productVariant.color}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 !rounded-lg">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold text-sm">
                    {Number(item.priceAtPurchase).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
          <div className="space-y-2">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Shipping Address
            </h4>
            <p className="text-sm text-gray-600 pl-6">
              {order.shippingAddress}
            </p>
            <p className="text-sm text-gray-600 pl-6 flex items-center gap-2">
              <Phone className="w-3 h-3" /> {order.phone}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment Info
            </h4>
            <div className="pl-6 text-sm">
              <p className="text-gray-600">
                Method:{" "}
                <span className="font-medium text-black">
                  {order.paymentMethod}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">Status: </span>
                <StatusBadge
                  status={order.isPaid ? "true" : "false"}
                  type="payment"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Total Summary */}
        <div className="bg-black text-white p-4 !rounded-2xl flex justify-between items-center">
          <span className="font-medium">Total Amount</span>
          <span className="text-xl font-extrabold">
            {Number(order.totalPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
