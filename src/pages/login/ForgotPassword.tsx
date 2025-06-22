import { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const { t } = useTranslation();

  const onFinish = async (values: ForgotPasswordForm) => {
    try {
      await axiosInstance.post<ApiResponse<void>>(
        "/auth/forgot-password",
        values
      );
      message.success(t("login.resetPasswordSuccess"));
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        t("login.resetPasswordError");
      message.error(msg);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.title}>
          <h1>{t("login.resetPasswordTitle")}</h1>
          <p>{t("login.resetPasswordDescription")}</p>
        </div>
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("register.emailRequired") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t("login.email")}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t("login.resetPassword")}
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            <Link to="/login">{t("login.submit")}</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
