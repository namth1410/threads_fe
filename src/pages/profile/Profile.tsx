import { AppDispatch, RootState } from "@/store";
import { changePassword } from "@/store/slices/meSlice";
import { Button, Card, Form, Input, message, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";

const { Title } = Typography;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const me = useSelector((state: RootState) => state.me.me);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);

      await dispatch(
        changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
      ).unwrap();

      message.success(t("profile.passwordChanged"));
      form.resetFields();
      setIsModalOpen(false);
    } catch (error: any) {
      // Đây là nơi xử lý lỗi chính
      message.error(error.message || t("profile.changePasswordError"));
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  if (!me) {
    return <div>{t("common.loading")}</div>;
  }

  return (
    <div className={styles.container}>
      <Title level={2}>{t("profile.title")}</Title>

      {/* Profile Information */}
      <Card
        title={t("profile.information")}
        className={styles.section}
        extra={
          <Button type="primary" onClick={showModal}>
            {t("profile.changePassword")}
          </Button>
        }
      >
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <label>{t("profile.username")}</label>
            <p>{me.username}</p>
          </div>
          <div className={styles.infoItem}>
            <label>{t("profile.email")}</label>
            <p>{me.email || "-"}</p>
          </div>
          <div className={styles.infoItem}>
            <label>{t("profile.displayId")}</label>
            <p>{me.displayId}</p>
          </div>
          <div className={styles.infoItem}>
            <label>{t("profile.role")}</label>
            <p>{me.role}</p>
          </div>
        </div>
      </Card>

      {/* Change Password Modal */}
      <Modal
        title={t("profile.changePassword")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleChangePassword}
          requiredMark={false}
        >
          <Form.Item
            name="currentPassword"
            label={t("profile.currentPassword")}
            rules={[{ required: true, message: t("common.required") }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={t("profile.newPassword")}
            rules={[
              { required: true, message: t("common.required") },
              { min: 6, message: t("profile.passwordMinLength") },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={t("profile.confirmPassword")}
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: t("common.required") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("profile.passwordMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className={styles.modalFooter}>
            <Button onClick={handleCancel}>{t("common.cancel")}</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t("profile.updatePassword")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
