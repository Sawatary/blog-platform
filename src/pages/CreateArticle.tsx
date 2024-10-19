/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Flex } from "antd";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";
import { createArticle } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;

const CreateArticle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([""]);

  const onFinish = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      const articleData = {
        title: values.title,
        description: values.text,
        body: values.introduction,
        tagList: tags.filter((tag) => tag),
      };

      await createArticle(articleData);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  return (
    <div className={styles.artCreateFrom}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={2} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Create New Article
      </Title>
      <Form
        layout="vertical"
        name="newArticle"
        size="large"
        onFinish={onFinish}
      >
        <Form.Item style={{ width: "100%" }}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Short description"
            name="text"
            rules={[
              { required: true, message: "Please enter a short description!" },
            ]}
          >
            <Input type="text" placeholder="Short description" />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="Introduction"
            rules={[
              { required: true, message: "Please enter the introduction!" },
            ]}
          >
            <Input.TextArea placeholder="Text" style={{ height: "150px" }} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Add Tags" style={{ width: "40%" }}>
          {tags.map((tag, index) => (
            <Form.Item key={index} style={{ marginBottom: "10px" }}>
              <Input
                placeholder={`Tag ${index + 1}`}
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
            </Form.Item>
          ))}
          <Button
            type="dashed"
            onClick={handleAddTag}
            style={{ width: "100%" }}
          >
            Add Tag
          </Button>
        </Form.Item>
        <Form.Item style={{ width: "40%" }}>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Create Article
          </Button>
        </Form.Item>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
};

export default CreateArticle;
