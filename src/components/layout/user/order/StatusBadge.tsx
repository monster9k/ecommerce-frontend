import { Badge } from "antd";

interface StatusBadgeProps {
  status: string;
  type?: "order" | "payment";
}

const StatusBadge = ({ status, type = "order" }: StatusBadgeProps) => {
  let color = "default";
  let text = status;

  if (type === "order") {
    switch (status) {
      case "PENDING":
        color = "warning"; // Vàng
        text = "Pending Processing";
        break;
      case "SHIPPING":
        color = "processing"; // Xanh dương
        text = "Delivering";
        break;
      case "DELIVERED":
        color = "success"; // Xanh lá
        text = "Delivered";
        break;
      case "CANCELLED":
        color = "error"; // Đỏ
        text = "Cancelled";
        break;
      default:
        color = "default";
    }
  } else {
    // Payment Status
    switch (status) {
      case "PAID":
      case "true": // convert boolean string
        color = "success";
        text = "Paid";
        break;
      default:
        color = "default";
        text = "Unpaid";
    }
  }

  // @ts-ignore
  return <Badge status={color} text={text} />;
};

export default StatusBadge;
