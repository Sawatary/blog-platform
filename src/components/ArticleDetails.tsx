/* eslint-disable @typescript-eslint/no-explicit-any */
import CircularProgress from "@mui/material/CircularProgress";
import ReactMarkdown from "react-markdown";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Popconfirm,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleBySlug, deleteArticle } from "../api/api";
import { Article, AuthContextType } from "../types/types";
import BackButton from "../utils/BackButton";
import LikeButton from "../utils/LikeButton";
import ListTags from "../utils/ListTags";
import styles from "./styles/ArticleDetails.module.scss";
import { useAuth } from "../context/AuthProvider";

const { Text, Paragraph, Title } = Typography;

const ArticleDetails = () => {
  const { user, isAuthenticated } = useAuth() as unknown as AuthContextType;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await deleteArticle(slug!);
      message.success("Пост успешно удалён!");
      navigate("/");
    } catch (error: any) {
      message.error("Ошибка при удалении поста.");
    }
  };

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );
  if (error) return <p>Error: {error}</p>;
  if (!article || !article.author) return <p>Article not found</p>;

  const isArticleAuthor = user?.username === article.author.username;

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
                <LikeButton
                  slug={article.slug}
                  initialLikes={article.favoritesCount}
                  initialLiked={article.favorited}
                />
              </Flex>
            </div>
            <ListTags article={article} />
            <Paragraph style={{ width: "90%", marginTop: "10px" }}>
              <ReactMarkdown>{article?.body}</ReactMarkdown>
            </Paragraph>
          </Space>
        </Col>
        <Flex
          justify="end"
          style={{
            position: "relative",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 4px 12px 0px #00000022",
            bottom: "40px",
          }}
        >
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
      {isAuthenticated && isArticleAuthor && (
        <Flex justify="end" style={{ margin: "0px 55px 0px 0px" }}>
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginRight: "10px" }} danger>
              Delete
            </Button>
          </Popconfirm>
          <Button
            onClick={() => navigate(`/edit-article/${article.slug}`)}
            style={{ borderColor: "lime", color: "lime" }}
          >
            Edit
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default ArticleDetails;
