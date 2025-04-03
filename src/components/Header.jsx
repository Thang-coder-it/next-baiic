"use client";

import { Layout, Avatar, Dropdown, Input, Badge } from "antd";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";

function Header({ collapsed, setCollapsed }) {
  return (
    <Layout.Header className="bg-white shadow-md px-4 flex justify-between items-center h-16">
      {/* Sidebar Toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={console.log("a")}
          className="text-lg p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        {!collapsed && (
          <span className="text-lg font-semibold hidden md:block text-gray-800">
            Dashboard
          </span>
        )}
      </div>

      {/* Thanh tìm kiếm */}
      <div className="hidden md:flex flex-1 max-w-md relative">
        <Input
          placeholder="Tìm kiếm..."
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
          prefix={<SearchOutlined className="text-gray-500" />}
        />
      </div>

      {/* Thông báo + User */}
      <div className="flex items-center gap-4">
        {/* Icon thông báo */}
        <Badge count={3}>
          <BellOutlined className="text-lg cursor-pointer text-gray-600 hover:text-blue-500 transition" />
        </Badge>

        {/* Avatar + Dropdown */}
        <Dropdown
          menu={{
            items: [
              { key: "profile", label: "Trang cá nhân" },
              { key: "settings", label: "Cài đặt" },
              { type: "divider" },
              { key: "logout", label: "Đăng xuất" },
            ],
          }}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar size="large" icon={<UserOutlined />} />
            <span className="hidden md:block text-gray-800">Người dùng</span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
}

export default Header;
