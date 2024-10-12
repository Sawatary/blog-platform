import { Button, Tag, Typography, Row, Col, Avatar } from "antd";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import styles from "./Article.module.scss";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Article = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.containerArt}>
      <Row style={{ justifyContent: "space-between" }}>
        <Col span={18}>
          <div className={styles.contentArt}>
            <Link to="ArtDet">
              <Title level={4} style={{ marginRight: "12px" }}>
                Some Article Title
              </Title>
            </Link>
            <Button
              onClick={toggleLike}
              type="text"
              icon={
                <span
                  className={`${styles.like} ${liked ? styles.like__active : ""}`}
                >
                  ♥
                </span>
              }
            />
          </div>
          <div className={styles.tagArt}>
            <Tag>Tag-1</Tag>
          </div>
          <div className={styles.descriptionArt}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
              iusto totam soluta sed accusamus omnis adipisci facilis unde minus
              voluptatum impedit perferendis esse, autem illum molestias nisi
              atque nostrum excepturi?
            </Text>
          </div>
        </Col>
        <Col>
          <Row>
            <Col>
              <div
                className={styles.personInfo}
                style={{ textAlign: "center", marginRight: "10px" }}
              >
                <Text strong>John Doe</Text>
                <Text type="secondary" className={styles.personDate}>
                  March 2, 2020
                </Text>
              </div>
            </Col>
            <Col>
              <Avatar
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                className={styles.avatar}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Article;
