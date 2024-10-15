import { useState } from "react";
import { Flex, Typography } from "antd";
import styles from "./styles/LikeButton.module.scss";

const { Text } = Typography;

const LikeButton = () => {
  const DEFAULT_LIKES_COUNT = 12;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(DEFAULT_LIKES_COUNT);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Flex align="center" style={{ marginLeft: "10px", marginBottom: "10px" }}>
      <span
        className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
        onClick={toggleLike}
      >
        ♡
      </span>
      <Text className={styles.likeCount}>{likesCount}</Text>
    </Flex>
  );
};

export default LikeButton;
