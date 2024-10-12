import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./Content.module.scss";

const { Title, Text } = Typography;

const SignUp = () => {
  return (
    <div className={styles.signInForm}>
      <Title level={3} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Create New Account
      </Title>
      <Text style={{ fontSize: 14 }} type="secondary">
        Please create new account to continue
      </Text>
      <Form
        layout="vertical"
        name="login"
        style={{ width: "min(24rem, 80vw)" }}
        size="large"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ type: "email", message: "The input is not valid E-mail!" }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>
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
        <Form.Item label="Repeat Password" name="password">
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Create
          </Button>
          <Form.Item style={{ textAlign: "center", margin: 0 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Already have an account? <Link to="/signIn">Sign In.</Link>
            </Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
