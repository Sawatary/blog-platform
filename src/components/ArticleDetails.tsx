import "@fortawesome/fontawesome-free/css/all.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Col, Flex, Row, Space, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { fetchArticleBySlug } from "../api/api";
import { Article } from "../types/types";
import BackButton from "../utils/BackButton";
import styles from "./styles/ArticleDetails.module.scss";
import LikeButton from "../utils/LikeButton";

const { Title, Text, Paragraph } = Typography;

const ArticleDetails = () => {
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

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.articleContainer}>
      <BackButton />
      <Flex justify="space-between" align="start">
        <Col span={18}>
          <Space direction="vertical">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title level={3}>{article?.title}</Title>
              <Flex style={{ marginLeft: "20px" }}>
                <LikeButton />
              </Flex>
            </div>
            <Flex style={{ marginBottom: "20px" }}>
              {article?.tagList &&
                article.tagList.map((elem: string | null, list) => {
                  if (!elem) {
                    return null;
                  }
                  if (list === 7 && !article.opened) {
                    return (
                      <Tag
                        key="more"
                        title={article.tagList.slice(7).join(", ")}
                      >
                        + {article.tagList.length - 7} more
                      </Tag>
                    );
                  }
                  if (list > 7 && !article.opened) {
                    return null;
                  }
                  return (
                    <Tag color="blue" key={`${elem}-${list.toString()}`}>
                      {elem.length > 15 ? `${elem.substring(0, 10)}...` : elem}
                    </Tag>
                  );
                })}
            </Flex>
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
