import { useState } from "react";
import { Button, Flex, Typography } from "antd";
import styles from "./styles/Like.module.scss";
const { Text } = Typography;

const LikeButton = () => {
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <>
      <Flex
        justify="space-between"
        style={{ marginBottom: "5px" }}
        align="center"
      >
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
        <Text className={styles.likeCount} style={{ margin: "0" }}>
          {likes}
        </Text>
      </Flex>
    </>
  );
};

export default LikeButton;
