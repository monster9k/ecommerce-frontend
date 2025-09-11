import React from "react";
import { Button, notification, Alert } from "antd";

const TestAntdEffects: React.FC = () => {
  const handleClick = () => {
    console.log("Đã bấm nút notification");
    notification.success({
      message: "Test Notification",
      description: "Nếu bạn thấy thông báo này, notification đã hoạt động.",
    });
  };

  return (
    <div style={{ padding: 32 }}>
      <Button type="primary" onClick={handleClick}>
        Hiện Notification
      </Button>
      <Alert message="Test Alert" type="success" />
    </div>
  );
};

export default TestAntdEffects;
