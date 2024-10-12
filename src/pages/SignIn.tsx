import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title, Text } = Typography;

const SignIn = () => {
  return (
    <div className={styles.signInForm}>
      <BackButton />
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
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "The input is not valid E-mail!" }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign In
          </Button>
          <Form.Item style={{ textAlign: "center", margin: 0 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Don't have an account? <Link to="/signUp">Create Account.</Link>
            </Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
