import { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { LockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Login.module.scss";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    message.error(t("login.resetPasswordError"));
    navigate("/login");
    return null;
  }

  const onFinish = async (values: ResetPasswordForm) => {
    try {
      await axiosInstance.post<ApiResponse<void>>("/auth/reset-password", {
        token,
        newPassword: values.password,
      });
      message.success(t("login.setNewPasswordSuccess"));
      navigate("/login");
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        t("login.setNewPasswordError");
      message.error(msg);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.title}>
          <h1>{t("login.setNewPasswordTitle")}</h1>
          <p>{t("login.setNewPasswordDescription")}</p>
        </div>
        <Form
          name="reset-password"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("login.passwordRequired") },
              { min: 6, message: t("login.passwordMinLength") },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("login.newPassword")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: t("login.passwordRequired") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("login.passwordMismatch")));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("login.confirmNewPassword")}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t("login.setNewPassword")}
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

export default ResetPassword;
