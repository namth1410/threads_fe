import Header from "@/components/header/Header";
import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Header />

      <Content
        style={{
          padding: "24px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
