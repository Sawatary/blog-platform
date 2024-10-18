import { useState } from "react";
import { Flex, message, Typography } from "antd";
import styles from "./styles/LikeButton.module.scss";
import { toggleLikeArticle } from "../api/api";
import { getCookie } from "../api/cookies";

const { Text } = Typography;
interface LikeButtonProps {
  slug: string;
  initialLikes: number;
  initialLiked: boolean;
}

const LikeButton = ({ slug, initialLikes, initialLiked }: LikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    const token = getCookie("token");
    if (!token) {
      message.warning("Пожалуйста, авторизуйтесь, чтобы поставить лайк.");
      return;
    }
    setLoading(true);
    try {
      const updatedArticle = await toggleLikeArticle(slug, liked);
      setLiked(updatedArticle.favorited);
      setLikesCount(updatedArticle.favoritesCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" style={{ marginLeft: "10px", marginBottom: "10px" }}>
      <span
        className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
        onClick={handleToggleLike}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        ♥
      </span>
      <Text className={styles.likeCount}>{likesCount}</Text>
    </Flex>
  );
};

export default LikeButton;
