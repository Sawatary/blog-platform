import { Button, Form, Input, Typography, Flex } from "antd";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title } = Typography;

const EditProfile = () => {
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
        <Form.Item label="Avatar Img(url)" name="password">
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
