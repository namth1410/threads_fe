import { AppDispatch } from "@/store/index";
import { getMe } from "@/store/slices/meSlice";
import { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: LoginForm) => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        values
      );
      localStorage.setItem("token", data.data.access_token);
      message.success(t("login.success"));
      await dispatch(getMe());
      navigate("/");
    } catch (error: any) {
      const msg =
        error.response?.data?.message || error.message || t("register.error");
      message.error(msg);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.title}>
          <h1>{t("login.title")}</h1>
        </div>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t("login.usernameRequired") }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("login.username")}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t("login.passwordRequired") }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("login.password")}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {t("login.submit")}
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            {t("login.noAccount")}{" "}
            <Link to="/register">{t("login.register")}</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
