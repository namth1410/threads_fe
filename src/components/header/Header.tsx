import { AppDispatch } from "@/store";
import { hideLoader, showLoader } from "@/store/slices/loaderSlice";
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
  Upload,
  UploadFile,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const { Header: HeaderAnt } = Layout;

function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

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

  const handleCreateThread = async () => {
    if (!content.trim() && fileList.length === 0) {
      message.warning(t("thread.empty_warning"));
      return;
    }

    dispatch(showLoader());

    await dispatch(
      createThread({ content, files: fileList.map((f) => f.originFileObj!) })
    )
      .unwrap()
      .then(() => {
        setIsModalVisible(false);
        setContent("");
        setFileList([]);
        message.success(t("thread.created_success"));
      })
      .catch((error) => {
        console.log(error);
        message.error(t("thread.create_error", { error: error.message }));
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  return (
    <HeaderAnt>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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

      <Modal
        title={t("thread.create_title")}
        open={isModalVisible}
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
    </HeaderAnt>
  );
}

export default Header;
