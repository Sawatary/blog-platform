/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Flex } from "antd";
import { useState } from "react";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";
import { updateUserProfile } from "../api/api";
import { useAuth } from "../context/AuthProvider";
import { getCookie } from "../api/cookies";

const { Title } = Typography;

const EditProfile = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUserProfile({
        username: values.username,
        email: values.email,
        password: values.password,
        image: values.image,
      });
      const authToken = getCookie("token");
      login(updatedUser, authToken);
    } catch (err: any) {
      setError(err.message);
      if (err.response) {
        console.log("Server error response:", err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signInForm}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={2} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Edit Profile
      </Title>
      <Form
        layout="vertical"
        name="editProfile"
        onFinish={handleFinish}
        style={{ width: "min(24rem, 80vw)" }}
        size="large"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 3, message: "Minimum 6 characters" },
            { max: 20 },
          ]}
        >
          <Input placeholder="Your username" />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 6, message: "Password must be at least 6 characters." },
          ]}
        >
          <Input.Password placeholder="New password" />
        </Form.Item>
        <Form.Item
          label="Avatar Img (URL)"
          name="image"
          rules={[
            { required: true, message: "Please input your avatar image URL!" },
          ]}
        >
          <Input placeholder="Image" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
};

export default EditProfile;
