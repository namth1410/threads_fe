import Header from "@/components/header/Header";
import { Layout } from "antd";
import React from "react";
const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />

      <Content
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          background: "#fff",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
