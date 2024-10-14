import { Button, Form, Input, Typography, Flex } from "antd";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";

const { Title } = Typography;

const CreateArticle = () => {
  return (
    <div className={styles.artCreateFrom}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={2} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Create New Article
      </Title>
      <Form layout="vertical" name="newArticle" size="large">
        <Form.Item style={{ width: "100%" }}>
          <Form.Item label="Title" name="title">
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item label="Short description" name="text">
            <Input type="text" placeholder="Title" />
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Introduction">
            <Input.TextArea placeholder="Text" style={{ height: "150px" }} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Add Tags" style={{ width: "40%" }}>
          <Input placeholder="Tag" style={{ marginBottom: "10px" }} />
          <Input placeholder="Tag" />
        </Form.Item>
        <Form.Item style={{ width: "40%" }}>
          <Button block type="primary" htmlType="submit">
            Create Article
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateArticle;
