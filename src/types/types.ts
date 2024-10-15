export interface Author {
  username: string;
  image: string;
}

export interface Article {
  slug: string;
  favoritesCount: number
  title: string;
  body: string;
  tagList: string[];
  description: string;
  createdAt: string;
  author: Author;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
