import React, { useState } from "react";
import Image from "next/image";
import {
  HomeOutlined,
  RightOutlined,
  LeftOutlined,
  ShoppingOutlined,
  TableOutlined,
  UngroupOutlined,
  DragOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const defaultSelectedKey = pathname === "/" ? "home" : pathname.slice(1);

  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link href="/">Trang chủ</Link>,
    },
    { type: "divider" },
    {
      key: "dashboard",
      icon: <PlayCircleOutlined />,
      label: <Link href="/dashboard">Quản lý</Link>,
    },
    {
      key: "table",
      icon: <TableOutlined />,
      label: <Link href="/table">Bảng</Link>,
    },
    {
      key: "flow",
      icon: <DragOutlined />,
      label: <Link href="/flow">Kéo thả</Link>,
    },
    {
      key: "grp1",
      label: "Group",
      icon: <UngroupOutlined />,
      children: [
        { key: "profile", label: <Link href="/profile">Trang cá nhân</Link> },
        { key: "following", label: <Link href="/following">Theo dõi</Link> },
      ],
    },
    {
      key: "product-list",
      label: "Sản phẩm",
      icon: <ShoppingOutlined />,
      children: [
        { key: "product", label: <Link href="/product">Danh sách</Link> },
        {
          key: "product/create",
          label: <Link href="/product/create">Thêm sản phẩm</Link>,
        },
      ],
    },
  ];

  return (
    <Sider
      theme="light"
      collapsed={collapsed}
      width={200}
      collapsedWidth={80}
      style={{
        overflowY: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={collapsed ? 50 : 120}
          height={collapsed ? 50 : 50}
        />
      </div>
       */}

      {/* MENU */}
      <Menu
        defaultSelectedKeys={[defaultSelectedKey]}
        mode="inline"
        theme="light"
        items={items}
        style={{ fontSize: "14px", borderRight: "none" }}
      />

      {/* BUTTON TOGGLE */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "#fff",
          padding: "10px",
          textAlign: "center",
          boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          type="default"
          shape="circle"
          size="large"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          style={{
            transition: "all 0.3s ease",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
