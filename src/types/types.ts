export interface Author {
  username: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  body: string;
  description: string;
  createdAt: string;
  tagList: string[];
  opened?: boolean;
  author: Author;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
