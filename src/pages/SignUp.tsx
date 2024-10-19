/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import { useAuth } from "../context/AuthProvider";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      message.error("Passwords do not match!");
      return;
    }
    try {
      await registerUser(username, email, password);
      message.success("Account created successfully!");
      const response = await loginUser(email, password);
      if (auth) {
        auth.login(response.user, response.user.token);
      }
      message.success(`Welcome, ${response.user.username}!`);
      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className={styles.signUpForm}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={3} style={{ marginBottom: 15, fontWeight: 400 }}>
        Create New Account
      </Title>
      <Text style={{ fontSize: 14 }} type="secondary">
        Please create new account to continue
      </Text>
      <Form
        onFinish={handleSignUp}
        requiredMark={false}
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { type: "string", required: true },
            { min: 3, message: "Minimum 3 characters" },
            { max: 20, message: "Too many characters" },
          ]}
        >
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true },
          ]}
        >
          <Input
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { type: "string" },
            { min: 6, message: "Minimum 6 characters" },
            { max: 40 },
            { required: true, message: "Please enter your password" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeatPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Repeat Password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Confirm registration on the site"),
                    ),
            },
          ]}
        >
          <Checkbox>I agree to disagree</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Create
          </Button>
          <Text type="secondary" style={{ fontSize: 12, textAlign: "center" }}>
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
