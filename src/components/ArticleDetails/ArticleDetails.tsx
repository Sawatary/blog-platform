import { Tag, Typography, Row, Col, Avatar, Space, Flex } from "antd";
import "@fortawesome/fontawesome-free/css/all.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import styles from "./ArticleDetails.module.scss";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Article } from "../../api/types";
import { fetchArticleBySlug } from "../../api/api";

const { Title, Text, Paragraph } = Typography;

const ArticleDetails = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(12);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string | undefined }>();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Article not found.");
      return;
    }

    setLoading(true);
    fetchArticleBySlug(slug)
      .then((response) => {
        setArticle(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.articleContainer}>
      <Flex justify="space-between" align="start">
        <Col span={18}>
          <Space direction="vertical">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title level={3}>{article?.title}</Title>
              <Flex style={{ marginLeft: "20px", marginBottom: "5px" }}>
                <span
                  className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
                  onClick={toggleLike}
                >
                  ♥
                </span>
                <Text className={styles.likeCount}>{likes}</Text>
              </Flex>
            </div>
            <Tag>Tag1</Tag>
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
