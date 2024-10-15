import { Button, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title, Text } = Typography;

const SignUp = () => {
  return (
    <form className={styles.signInForm}>
      <Flex>
        <BackButton />
      </Flex>
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
          rules={[
            { min: 3, message: "Minimum 3 characters" },
            {
              max: 20,
              message: "Too many characters",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
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
          rules={[
            { min: 6, message: "Minimum 6 characters" },
            { max: 40, message: "Too many characters" },
            { required: true, message: "Please enter your password" },
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeat password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password type="password" placeholder="Repeat Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Create
          </Button>
          <Form.Item
            style={{ textAlign: "center", margin: 0 }}
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              Already have an account? <Link to="/signIn">Sign In.</Link>
            </Text>
          </Form.Item>
        </Form.Item>
      </Form>
    </form>
  );
};

export default SignUp;
