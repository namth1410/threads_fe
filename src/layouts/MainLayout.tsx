import LanguageSwitcher from "@/components/language-switcher/LanguageSwitcher";
import { AppDispatch, RootState } from "@/store";
import { createThread } from "@/store/slices/threadSlice";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Spin,
  Upload,
  UploadFile,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isCreating = useSelector(
    (state: RootState) => state.threads.isCreating
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  const handleCreateThread = () => {
    if (!content.trim() && fileList.length === 0) {
      message.warning(t("thread.empty_warning"));
      return;
    }
    dispatch(
      createThread({ content, files: fileList.map((f) => f.originFileObj!) })
    );

    // Xử lý gửi dữ liệu content + media tại đây
    console.log("Thread content:", content);
    console.log("Files:", fileList);

    setIsModalVisible(false);
    setContent("");
    setFileList([]);
    message.success(t("thread.created_success"));
  };

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

          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            {t("thread.create")}
          </Button>

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
      <Spin spinning={isCreating}>
        <Modal
          title={t("thread.create_title")}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleCreateThread}
          okText={t("common.post")}
          cancelText={t("common.cancel")}
        >
          <Input.TextArea
            placeholder={t("thread.placeholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoSize={{ minRows: 3 }}
          />

          <Upload
            multiple
            listType="picture-card"
            beforeUpload={() => false} // Ngăn upload auto
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            accept="image/*,video/*"
          >
            {fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{t("thread.upload")}</div>
              </div>
            )}
          </Upload>
        </Modal>
      </Spin>
    </Layout>
  );
};

export default MainLayout;
