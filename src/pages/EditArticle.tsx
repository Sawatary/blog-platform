/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Flex } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../utils/BackButton";
import styles from "./styles/Content.module.scss";
import { fetchArticleBySlug, updateArticle } from "../api/api";
import { Article } from "../types/types";
import CircularProgress from "@mui/material/CircularProgress";

const { Title } = Typography;

const EditArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const articleData = await fetchArticleBySlug(slug);
        setPost(articleData);
        form.setFieldsValue({
          title: articleData.title,
          text: articleData.description,
          user: {
            introduction: articleData.body,
          },
        });
        setTags(articleData.tagList || []);
      } catch (error: any) {
        console.error("Error fetching article:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, form]);

  const handleFinish = async (values: any) => {
    try {
      await updateArticle(slug!, {
        title: values.title,
        description: values.text,
        body: values.user.introduction,
        tagList: tags.filter((tag) => tag),
      });
      navigate(`/articles/${slug}`);
    } catch (error: any) {
      console.error("Error updating article:", error.message);
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

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );
  if (!post) return <div>Article not found</div>;

  return (
    <div className={styles.artCreateFrom}>
      <Flex>
        <BackButton />
      </Flex>
      <Title level={2} style={{ margin: "0 0 15px 0", fontWeight: "400" }}>
        Edit Article
      </Title>
      <Form
        form={form}
        layout="vertical"
        name="editArticle"
        size="large"
        onFinish={handleFinish}
      >
        <Form.Item label="Title" name="title" style={{ width: "100%" }}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Short description" name="text">
          <Input type="text" placeholder="Short description" />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea placeholder="Text" style={{ height: "150px" }} />
        </Form.Item>
        <Form.Item label="Add Tags" style={{ width: "40%" }}>
          {tags.map((tag, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <Input
                placeholder={`Tag ${index + 1}`}
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                style={{ marginRight: "5px" }}
              />
              <Button
                onClick={() => handleRemoveTag(index)}
                color="danger"
                variant="outlined"
              >
                Remove
              </Button>
            </div>
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
          <Button block type="primary" htmlType="submit">
            Update Article
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditArticle;
