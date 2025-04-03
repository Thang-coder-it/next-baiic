import React, { useState, useMemo, useCallback, useEffect } from "react";
//import Image from "next/image";
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

function Sidebar({ collapsed, setCollapsed }) {
  const { Sider } = Layout;
  const pathname = usePathname();

  const items = useMemo(
    () => [
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
    ],
    []
  );

  // Hàm tìm cha của một menu item
  const findParentKeys = useCallback((items, currentKey, parents = []) => {
    for (let item of items) {
      if (item.key === currentKey) return parents;
      if (item.children) {
        const result = findParentKeys(item.children, currentKey, [
          ...parents,
          item.key,
        ]);
        if (result) return result;
      }
    }
    return [];
  });

  // Xác định menu cha khi trang thay đổi
  const defaultSelectedKey =
    pathname === "/" ? "home" : pathname.split("/").pop();
  const defaultOpenKeys = findParentKeys(items, defaultSelectedKey);

  const [stateOpenKeys, setStateOpenKeys] = useState(defaultOpenKeys);

  // Cập nhật openKeys khi pathname thay đổi
  useEffect(() => {
    setStateOpenKeys(findParentKeys(items, defaultSelectedKey));
  }, [pathname]);

  const getLevelKeys = useCallback((items1) => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  });

  const levelKeys = getLevelKeys(items);

  const onOpenChange = useCallback((openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  });

  return (
    <Sider
      collapsible
      theme="light"
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      collapsedWidth={80}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#fff",
        borderRight: "1px solid #f0f0f0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Ngăn tràn nội dung ra ngoài
        scrollbarWidth: "thin",
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

      <Menu
        selectedKeys={[defaultSelectedKey]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="light"
        items={items}
        style={{
          flex: 1, // Để menu mở rộng chiếm toàn bộ không gian có thể
          overflowY: "auto", // Cho phép cuộn khi danh sách dài
          maxHeight: "calc(100vh - 60px)", // Giới hạn chiều cao menu để không đè lên nút
        }}
      />
      <div
        style={{
          position: "sticky",
          bottom: 0,
          padding: 10,
          textAlign: "center",
          background: "#fff",
          boxShadow: "0px -2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <Button
          type="default"
          shape="circle"
          size="large"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          style={{ transition: "all 0.3s ease" }}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
