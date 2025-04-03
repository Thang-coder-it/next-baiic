"use client";

import React, { useState } from "react";
import { Layout, theme } from "antd";

import LayoutContext from "@/contexts";
import { Slidebar, Header } from "@/components";

function LayoutDasboard({ children }) {
  const { Content } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutContext>
      <Layout
        style={{
          minHeight: "100vh",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Slidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.39s ease",
          }}
        >
          <Header />
          <Content
            style={{
              margin: "10px 5px",
              minWidth: 135,
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </LayoutContext>
  );
}
export default LayoutDasboard;
