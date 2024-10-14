import { useState } from "react";
import { Flex, Typography } from "antd";
import styles from "./styles/LikeButton.module.scss";

const { Text } = Typography;

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(12);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Flex align="center" style={{ marginLeft: "10px", marginBottom: "10px" }}>
      <span
        className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
        onClick={toggleLike}
      >
        ♥
      </span>
      <Text className={styles.likeCount}>{likes}</Text>
    </Flex>
  );
};

export default LikeButton;
