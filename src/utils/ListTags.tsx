import { Tag } from "antd";
import { Article } from "../types/types";
import styles from "./styles/ListTags.module.scss";

type ArticleProps = {
  article: Article;
};

function ListTags({ article }: ArticleProps) {
  const MAX_LIST = 5;
  return (
    <>
      <div className={styles.tagArt}>
        {article.tagList &&
          article.tagList.map((elem: string | null, i) => {
            if (!elem || i > MAX_LIST) return null;
            if (i === MAX_LIST) {
              return (
                <Tag
                  title={article.tagList.slice(7).join(", ")}
                  style={{ padding: "2px 10px" }}
                >
                  + {article.tagList.length} more
                </Tag>
              );
            }
            return (
              <Tag
                color="blue"
                key={`${elem}-${i.toString()}`}
                title={elem?.substring(MAX_LIST)}
                style={{ padding: "2px 10px" }}
              >
                {elem.length > 15 ? `${elem.substring(0, 10)}...` : elem}
              </Tag>
            );
          })}
      </div>
    </>
  );
}

export default ListTags;
