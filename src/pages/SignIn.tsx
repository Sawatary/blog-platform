/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { setCookie } from "../api/cookies";
import { useAuth } from "../context/AuthProvider";
import { UserApiResponse } from "../types/types";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title, Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSignIn = async (values: UserApiResponse) => {
    try {
      const response = await loginUser(values.email, values.password);
      if (auth) {
        auth.login(response.user.username, response.user.token);
        setCookie("username", response.user.username, 7);
      }
      message.success(`Welcome, ${response.user.username}!`);
      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className={styles.signInForm}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={2} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Sign In
      </Title>
      <Text style={{ fontSize: 14 }} type="secondary">
        Welcome user, please sign in to continue
      </Text>
      <Form
        layout="vertical"
        name="login"
        style={{ width: "min(24rem, 80vw)" }}
        size="large"
        onFinish={handleSignIn}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "The input is not valid E-mail!" }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign In
          </Button>
          <Form.Item style={{ textAlign: "center", margin: 0 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Don't have an account? <Link to="/sign-up">Create Account.</Link>
            </Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
