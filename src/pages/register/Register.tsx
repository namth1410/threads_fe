import { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  token: string;
}

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterForm) => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<RegisterResponse>>(
        "/auth/register",
        values
      );
      localStorage.setItem("token", data.data.token);
      message.success(t("register.success"));
      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || t("register.error"));
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.title}>
          <h1>{t("register.title")}</h1>
        </div>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: t("register.usernameRequired") },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("register.username")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("register.emailRequired") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t("register.email")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: t("register.passwordRequired") },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("register.password")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("register.confirmPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("register.passwordMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("register.confirmPassword")}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t("register.submit")}
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            {t("register.haveAccount")}{" "}
            <Link to="/login">{t("register.login")}</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
