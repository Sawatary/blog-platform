/* eslint-disable @typescript-eslint/no-explicit-any */
import "@fortawesome/fontawesome-free/css/all.css";
import { CircularProgress } from "@mui/material";
import { Alert, Avatar, Col, Flex, Pagination, Row, Typography } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../api/api";
import { Article } from "../types/types";
import LikeButton from "../utils/LikeButton";
import styles from "./styles/ArticleList.module.scss";
import ListTags from "../utils/ListTags";

const { Title, Text } = Typography;

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchArticles(page);
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.articlesCount / 5));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [page]);

  if (loading)
    return (
      <Flex style={{ margin: "50px" }}>
        <CircularProgress size="4rem" />
      </Flex>
    );

  if (error) return <Alert message="Error" description={error} type="error" />;

  return (
    <>
      {articles.map((article) => (
        <div key={article.slug} className={styles.containerArt}>
          <Col span={18}>
            <div className={styles.contentArt}>
              <Link to={`/articles/${article.slug}`}>
                <Title level={4} style={{ marginRight: "12px" }}>
                  {article.title}
                </Title>
              </Link>
              <LikeButton />
            </div>
            <ListTags article={article} />
            <div className={styles.descriptionArt}>
              <Text>{article.description}</Text>
            </div>
          </Col>
          <Col>
            <Row>
              <Col>
                <div
                  className={styles.personInfo}
                  style={{ textAlign: "center", marginRight: "10px" }}
                >
                  <Text strong>{article?.author.username}</Text>
                  <Text type="secondary" className={styles.personDate}>
                    {article?.createdAt &&
                      format(new Date(article?.createdAt), "MMMM d, yyyy")}
                  </Text>
                </div>
              </Col>
              <Col>
                <Avatar
                  style={{
                    width: "50px",
                    height: "50px",
                    marginBottom: "10px",
                  }}
                  src={
                    article?.author.image || "https://via.placeholder.com/150"
                  }
                  alt={article?.author.username}
                  className={styles.avatar}
                />
              </Col>
            </Row>
          </Col>
        </div>
      ))}
      <Pagination
        current={page}
        total={totalPages * 10}
        onChange={(page) => setPage(page)}
        showSizeChanger={false}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      />
    </>
  );
};

export default ArticleList;
