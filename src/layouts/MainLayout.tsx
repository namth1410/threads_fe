import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Reload page and redirect to login
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">{t("navigation.profile")}</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("navigation.logout"),
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000",
              textDecoration: "none",
            }}
          >
            {t("app.name")}
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              style={{ border: "none", background: "transparent" }}
            >
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/">{t("navigation.home")}</Link>
              </Menu.Item>
              <Menu.Item key="/search" icon={<MessageOutlined />}>
                <Link to="/search">{t("navigation.search")}</Link>
              </Menu.Item>
              <Menu.Item key="/notifications" icon={<BellOutlined />}>
                <Link to="/notifications">{t("navigation.notifications")}</Link>
              </Menu.Item>
            </Menu>

            <LanguageSwitcher />

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
            </Dropdown>
          </div>
        </div>
      </Header>

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
