import React from "react";
import type { MenuProps } from "antd/es/menu";
import {
  BookOutlined,
  HomeOutlined,
  ReconciliationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Typography } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuIcon = {
  fontSize: "20px",
} as React.CSSProperties;

const items: MenuItem[] = [
  getItem(
    <Link to="/home">
      <Typography.Text className="text-normal gray-brown medium-18 opacity-6">
        Trang chủ
      </Typography.Text>
    </Link>,
    "home",
    <HomeOutlined className="opacity-5" style={menuIcon} />
  ),
  getItem(
    <Link to={`/ticket-management`}>
      <Typography.Text className="text-normal gray-brown medium-18 opacity-6">
        Quản lý vé
      </Typography.Text>
    </Link>,
    "ticket-management",
    <BookOutlined className="opacity-5" style={menuIcon} />
  ),
  getItem(
    <Link to="/ticket-check">
      <Typography.Text className="text-normal gray-brown medium-18 opacity-6">
        Đối soát vé
      </Typography.Text>
    </Link>,
    "ticket-check",
    <ReconciliationOutlined className="opacity-5" style={menuIcon} />
  ),
  getItem(
    <Typography.Text className="text-normal gray-brown medium-18 opacity-6">
      Cài đặt
    </Typography.Text>,
    "settings",
    <SettingOutlined className="opacity-5" style={menuIcon} />,
    [
      getItem(
        <Link to="/service-pack">
          <Typography.Text className="text-normal gray-brown medium-18 opacity-6">
            Gói dịch vụ
          </Typography.Text>
        </Link>,
        "service-pack"
      ),
    ]
  ),
];

export default items;
