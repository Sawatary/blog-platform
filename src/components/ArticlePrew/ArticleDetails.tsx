import { Tag, Typography, Row, Col, Avatar, Space, Flex } from "antd";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import styles from "./ArticleDetails.module.scss";

const { Title, Text, Paragraph } = Typography;

const ArticleDetails = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(12);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className={styles.articleContainer}>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Space direction="vertical">
            <Flex>
              <Title level={3}>Some article title</Title>
              <Flex style={{ marginLeft: "20px", marginTop: "5px" }}>
                <span
                  className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
                  onClick={toggleLike}
                >
                  ♥
                </span>
                <Text className={styles.likeCount}>{likes}</Text>
              </Flex>
            </Flex>
            <Tag>Tag1</Tag>
            <Paragraph style={{ opacity: "0.5", width: "90%" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Paragraph>
            <Title level={5}>Est Ampyciden pater patent</Title>
            <Paragraph>
              Lorem markdownum Stygias neque is referam fudi, breve per. Et
              Achaica tamen: nescia ista occupat, illum se ad potest humum et.
            </Paragraph>
            <Title level={5}>Qua deos has fontibus</Title>
            <Paragraph>
              Recens nec ferro responsaque dedere armenti opes momorderat pisce,
              vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne
              pendentia citus pedum.
            </Paragraph>
            <Title level={5}>Quamvis pronuba</Title>
            <Paragraph>
              Ulli labore facta. Io cervis non nosterque nullae, vides: aethere
              Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata!
              Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo?
              Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia
              uno cernunt Venus draconem, hic, Methymnaeae.
            </Paragraph>
            <ol style={{ marginLeft: "30px" }}>
              <li>Clamoribus haesit tenentem iube Haec munera</li>
              <li>Vincla venae</li>
              <li>Paris includere etiam tamen</li>
              <li>Superi et putria imagine Deianira</li>
              <li>Tremore hoste Esse sed perstat capillis siqua</li>
            </ol>
          </Space>
        </Col>
        <Col span={6} className={styles.userDetails}>
          <Row align="middle" style={{ justifyContent: "end" }}>
            <Col>
              <Text strong>John Doe</Text>
              <br />
              <Text type="secondary" className={styles.personDate}>
                March 5, 2020
              </Text>
            </Col>
            <Col style={{ marginLeft: "15px" }}>
              <Avatar
                size={64}
                src="https://via.placeholder.com/150"
                alt="John Doe"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleDetails;
