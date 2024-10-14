/* eslint-disable @typescript-eslint/no-explicit-any */
import CircularProgress from "@mui/material/CircularProgress";
import "@fortawesome/fontawesome-free/css/all.css";
import ReactMarkdown from "react-markdown";
import { Avatar, Col, Flex, Row, Space, Typography } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleBySlug } from "../api/api";
import { Article } from "../types/types";
import BackButton from "../utils/BackButton";
import LikeButton from "../utils/LikeButton";
import ListTags from "../utils/ListTags";
import styles from "./styles/ArticleDetails.module.scss";

const { Text, Paragraph, Title } = Typography;

const ArticleDetails = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setLoading(false);
        setError("Article not found.");
        return;
      }
      setLoading(true);
      try {
        const response = await fetchArticleBySlug(slug);
        setArticle(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );
  if (error) return <p>Error: {error}</p>;
  if (!article || !article.author) return <p>Article not found</p>;

  return (
    <div className={styles.articleContainer}>
      <Flex align="start" style={{ marginBottom: "10px", width: "100%" }}>
        <BackButton />
      </Flex>
      <Flex justify="space-between" align="start">
        <Col span={18}>
          <Space direction="vertical">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title level={3}>{article?.title}</Title>
              <Flex style={{ marginLeft: "10px", marginBottom: "2px" }}>
                <LikeButton />
              </Flex>
            </div>
            <ListTags article={article} />
            <Paragraph style={{ width: "90%", marginTop: "10px" }}>
              <ReactMarkdown>{article?.body}</ReactMarkdown>
            </Paragraph>
          </Space>
        </Col>
        <Flex justify="end">
          <Row align="middle">
            <Col style={{ textAlign: "center" }}>
              <Text strong>{article?.author.username}</Text>
              <br />
              <Text type="secondary" className={styles.personDate}>
                {article?.createdAt &&
                  format(new Date(article?.createdAt), "MMMM d, yyyy")}
              </Text>
            </Col>
            <Col style={{ marginLeft: "15px" }}>
              <Avatar
                size={64}
                src={article?.author.image || "https://via.placeholder.com/150"}
                alt={article?.author.username}
              />
            </Col>
          </Row>
        </Flex>
      </Flex>
    </div>
  );
};

export default ArticleDetails;
