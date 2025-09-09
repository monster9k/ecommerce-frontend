import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const Header: React.FC = () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      label: <Link to={"/"}>HomePage</Link>,
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: <Link to={"/user"}>Users</Link>,
      key: "user",
      icon: <MailOutlined />,
    },
    {
      label: "Wellcome khoa",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        { label: "Đăng nhập", key: "login" },
        { label: "Đăng xuất", key: "logout" },
      ],
    },
  ];
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
