import Header from "@/components/header/Header";
import { RootState } from "@/store";
import { Layout, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const globalLoading = useSelector(
    (state: RootState) => state.loader.globalLoading
  );

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

      {globalLoading && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            background: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </Layout>
  );
};

export default MainLayout;
