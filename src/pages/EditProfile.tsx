/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Flex, message, Spin } from "antd";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api/api";

const { Title } = Typography;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response);
        form.setFieldsValue({
          username: response.username,
          email: response.email,
          avatar: response.avatar,
        });
        setLoading(false);
      } catch (error: any) {
        message.error("Failed to load profile");
      }
    };
    loadProfile();
  }, [form]);

  const handleSave = async (values: any) => {
    try {
      await updateUserProfile(values);
      message.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  };

  if (loading) {
    return <Spin size="large" className={styles.loader} />;
  }

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
        name="login"
        style={{ width: "min(24rem, 80vw)" }}
        size="large"
        onFinish={handleSave}
      >
        <Form.Item label="Username" name="username">
          <Input placeholder="Your username" />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          rules={[{ type: "email", message: "The input is not valid E-mail!" }]}
        >
          <Input placeholder="Your email" />
        </Form.Item>
        <Form.Item label="New password" name="password">
          <Input.Password type="password" placeholder="New password" />
        </Form.Item>
        <Form.Item label="Avatar Img(url)" name="Avatar">
          <Input placeholder="Avatar Image" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
